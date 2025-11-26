import { Chat, Message, convertMessageDTOtoMessage, convertConversationDTOtoChat } from '@/shared/types/chat';
import { useState, useCallback, useEffect } from 'react';
import { useConversationStore, useMessageStore, MessageType, MessageChannel } from '@/shared/api';

// Constants - Replace with actual user and agent UIDs
// Using a temporary UUID for testing - should be replaced with auth context user ID
const USER_UID = 'a1b2c3d4-e5f6-7890-abcd-ef1234567890'; // TODO: Get from auth context
const AGENT_UID = '24c8a5a5-e75f-4857-be8f-0b80ec8e7a1c';

export const useChat = () => {
  const [chats, setChats] = useState<Chat[]>([]);
  const [currentChat, setCurrentChat] = useState<Chat | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);

  // Zustand stores
  const {
    conversations,
    currentConversation,
    getUserConversations,
    getOrCreateActiveConversation,
    getConversation,
    deleteConversation: deleteConv,
    setCurrentConversation: setCurrentConv,
    endConversation,
  } = useConversationStore();

  const {
    messages: storeMessages,
    sendMessage: sendMsg,
    getConversationMessages,
    clearMessages,
  } = useMessageStore();

  // Load user conversations on mount
  useEffect(() => {
    getUserConversations({ userUid: USER_UID })
      .then((result) => {
        console.log('Loaded conversations:', result?.conversations);
      })
      .catch((error) => {
        console.error('Failed to load conversations:', error);
      });
  }, [getUserConversations]);

  // Convert backend conversations to chats
  useEffect(() => {
    const convertedChats = conversations.map(convertConversationDTOtoChat);
    setChats(convertedChats);
  }, [conversations]);

  // Convert backend messages to frontend messages
  useEffect(() => {
    const convertedMessages = storeMessages.map(convertMessageDTOtoMessage);
    setMessages(convertedMessages);
  }, [storeMessages]);

  // Update current chat when conversation changes
  useEffect(() => {
    if (currentConversation) {
      setCurrentChat(convertConversationDTOtoChat(currentConversation));
    }
  }, [currentConversation]);

  const startNewChat = useCallback(async () => {
    // End current active conversation if exists
    if (currentConversation) {
      try {
        await endConversation(currentConversation.uid);
      } catch (error) {
        console.error('Failed to end conversation:', error);
      }
    }

    // Clear current conversation and messages
    setCurrentConv(null);
    clearMessages();
    setMessages([]);
    setCurrentChat(null);

    return '';
  }, [currentConversation, endConversation, setCurrentConv, clearMessages]);

  const sendMessage = useCallback(async (content: string, files: File[] = []) => {
    if (!content.trim() && files.length === 0) return;

    // Optimistically add user message to UI immediately
    const tempUserMessage: Message = {
      id: `temp-${Date.now()}`,
      content: content.trim(),
      sender: 'user',
      timestamp: new Date(),
      type: files.length > 0 ? 'file' : 'text',
      files: files.length > 0 ? files : undefined,
    };

    // Add thinking/loading message
    const tempLoadingMessage: Message = {
      id: `loading-${Date.now()}`,
      content: 'Réflexion en cours...',
      sender: 'agent',
      timestamp: new Date(),
      type: 'text',
    };

    setMessages(prev => [...prev, tempUserMessage, tempLoadingMessage]);

    try {
      // Get or create active conversation
      let conversation = currentConversation;
      if (!conversation) {
        conversation = await getOrCreateActiveConversation({
          userUid: USER_UID,
          agentUid: AGENT_UID,
          channel: MessageChannel.IAVIA_INTERFACE_CHAT,
        });
      }

      // Send message to backend
      const messageType = files.length > 0 ? MessageType.FILE : MessageType.TEXT;
      const response = await sendMsg({
        conversationSessionUid: conversation.uid,
        content: content.trim(),
        type: messageType,
        files: files.length > 0 ? files : undefined,
      });

      // Remove loading message
      setMessages(prev => prev.filter(msg => msg.id !== tempLoadingMessage.id && msg.id !== tempUserMessage.id));

      // Reload conversation messages to get both user and agent messages
      await getConversationMessages({
        conversationUid: conversation.uid,
        page: 0,
        size: 50,
      });

      // Refresh conversations list to update last message
      await getUserConversations({ userUid: USER_UID });

      return response.uid;
    } catch (error: any) {
      // Remove loading message on error
      setMessages(prev => prev.filter(msg => msg.id !== tempLoadingMessage.id));

      console.error('Failed to send message:', error);
      console.error('Error details:', {
        message: error.message,
        response: error.response?.data,
        status: error.response?.status,
      });
      throw error;
    }
  }, [currentConversation, getOrCreateActiveConversation, sendMsg, getUserConversations, getConversationMessages]);

  const loadChat = useCallback(async (chatId: string) => {
    try {
      // Load conversation details
      await getConversation(chatId);

      // Load messages for this conversation
      await getConversationMessages({
        conversationUid: chatId,
        page: 0,
        size: 50,
      });
    } catch (error) {
      console.error('Failed to load chat:', error);
    }
  }, [getConversation, getConversationMessages]);

  const renameChat = useCallback((chatId: string, newTitle: string) => {
    // Update local state only (backend doesn't support rename yet)
    setChats(prev => prev.map(chat =>
      chat.id === chatId
        ? { ...chat, title: newTitle, updatedAt: new Date() }
        : chat
    ));
  }, []);

  const deleteChat = useCallback(async (chatId: string) => {
    try {
      await deleteConv(chatId);
      if (currentChat?.id === chatId) {
        setCurrentChat(null);
        setMessages([]);
        setCurrentConv(null);
        clearMessages();
      }
    } catch (error) {
      console.error('Failed to delete chat:', error);
    }
  }, [deleteConv, currentChat, setCurrentConv, clearMessages]);

  return {
    chats,
    currentChat,
    messages,
    startNewChat,
    sendMessage,
    loadChat,
    renameChat,
    deleteChat
  };
};
