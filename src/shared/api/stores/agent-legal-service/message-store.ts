import { create } from 'zustand';
import axiosInstance from '@/utils/axios';
import { messageEndpoints } from '../../endpoints/agent-legal-service/message-endpoints';
import type {
  AgentMessageResponseDTO,
  SendMessageRequestDTO,
  MessageListResponseDTO,
  MessageStatsDTO,
  MessageSearchParams,
} from '@/shared/types/legal-conversation';
import { MessageType } from '@/shared/types/legal-conversation';

// ============================================================
// Store Type Definition
// ============================================================

type MessageStore = {
  // State
  messages: AgentMessageResponseDTO[];
  loading: boolean;
  sendingMessage: boolean;
  error: string | null;
  totalMessages: number;
  currentPage: number;
  totalPages: number;
  hasMore: boolean;

  // Actions
  sendMessage: (params: SendMessageRequestDTO) => Promise<AgentMessageResponseDTO>;
  getMessage: (messageUid: string) => Promise<AgentMessageResponseDTO>;
  getConversationMessages: (params: MessageSearchParams) => Promise<MessageListResponseDTO>;
  searchMessages: (params: MessageSearchParams & { searchTerm: string }) => Promise<MessageListResponseDTO>;
  deleteMessage: (messageUid: string) => Promise<void>;
  getMessageStats: (conversationUid: string) => Promise<MessageStatsDTO>;
  addMessageToStore: (message: AgentMessageResponseDTO) => void;
  clearMessages: () => void;
  clearError: () => void;
  reset: () => void;
};

// ============================================================
// Initial State
// ============================================================

const initialState = {
  messages: [],
  loading: false,
  sendingMessage: false,
  error: null,
  totalMessages: 0,
  currentPage: 0,
  totalPages: 0,
  hasMore: false,
};

// ============================================================
// Store Implementation
// ============================================================

export const useMessageStore = create<MessageStore>((set) => ({
  ...initialState,

  // Send message in conversation
  sendMessage: async (params) => {
    set({ sendingMessage: true, error: null });
    try {
      const formData = new FormData();
      formData.append('conversationSessionUid', params.conversationSessionUid);
      formData.append('content', params.content);
      formData.append('type', params.type);

      if (params.files && params.files.length > 0) {
        params.files.forEach((file) => {
          formData.append('files', file);
        });
      }

      if (params.metadata) {
        formData.append('metadata', params.metadata);
      }

      const { data } = await axiosInstance.post<AgentMessageResponseDTO>(
        messageEndpoints.send,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );

      // The backend returns the agent's response message
      // We need to fetch all messages to get both user and agent messages
      // For now, just add the agent response to the store
      set((state) => ({
        messages: [...state.messages, data],
        totalMessages: state.totalMessages + 1,
        sendingMessage: false,
      }));

      return data;
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || error.message || 'Failed to send message';
      set({ error: errorMessage, sendingMessage: false });
      throw new Error(errorMessage);
    }
  },

  // Get message by UID
  getMessage: async (messageUid) => {
    set({ loading: true, error: null });
    try {
      const { data } = await axiosInstance.get<AgentMessageResponseDTO>(
        messageEndpoints.getByUid(messageUid)
      );
      set({ loading: false });
      return data;
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || error.message || 'Failed to get message';
      set({ error: errorMessage, loading: false });
      throw new Error(errorMessage);
    }
  },

  // Get conversation messages (paginated)
  getConversationMessages: async (params) => {
    set({ loading: true, error: null });
    try {
      const { data } = await axiosInstance.get<MessageListResponseDTO>(
        messageEndpoints.getConversationMessages(params.conversationUid),
        {
          params: {
            page: params.page || 0,
            size: params.size || 50,
          },
        }
      );
      set({
        messages: data.messages,
        totalMessages: data.totalElements,
        currentPage: data.currentPage,
        totalPages: data.totalPages,
        hasMore: data.hasNext,
        loading: false,
      });
      return data;
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || error.message || 'Failed to fetch messages';
      set({ error: errorMessage, loading: false });
      throw new Error(errorMessage);
    }
  },

  // Search messages in conversation
  searchMessages: async (params) => {
    set({ loading: true, error: null });
    try {
      const { data } = await axiosInstance.get<MessageListResponseDTO>(
        messageEndpoints.searchMessages(params.conversationUid),
        {
          params: {
            searchTerm: params.searchTerm,
          },
        }
      );
      set({
        messages: data.messages,
        totalMessages: data.totalElements,
        currentPage: data.currentPage,
        totalPages: data.totalPages,
        hasMore: data.hasNext,
        loading: false,
      });
      return data;
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || error.message || 'Failed to search messages';
      set({ error: errorMessage, loading: false });
      throw new Error(errorMessage);
    }
  },

  // Delete message
  deleteMessage: async (messageUid) => {
    set({ loading: true, error: null });
    try {
      await axiosInstance.delete(messageEndpoints.delete(messageUid));
      set((state) => ({
        messages: state.messages.filter((msg) => msg.uid !== messageUid),
        totalMessages: state.totalMessages - 1,
        loading: false,
      }));
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || error.message || 'Failed to delete message';
      set({ error: errorMessage, loading: false });
      throw new Error(errorMessage);
    }
  },

  // Get message statistics
  getMessageStats: async (conversationUid) => {
    set({ loading: true, error: null });
    try {
      const { data } = await axiosInstance.get<MessageStatsDTO>(
        messageEndpoints.getStats(conversationUid)
      );
      set({ loading: false });
      return data;
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || error.message || 'Failed to fetch message stats';
      set({ error: errorMessage, loading: false });
      throw new Error(errorMessage);
    }
  },

  // Add message to store (for optimistic updates)
  addMessageToStore: (message) => {
    set((state) => ({
      messages: [...state.messages, message],
      totalMessages: state.totalMessages + 1,
    }));
  },

  // Clear messages
  clearMessages: () => {
    set({ messages: [], totalMessages: 0 });
  },

  // Clear error
  clearError: () => {
    set({ error: null });
  },

  // Reset store
  reset: () => {
    set(initialState);
  },
}));
