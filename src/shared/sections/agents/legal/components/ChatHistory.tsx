import React from 'react';
import { Box } from '@mui/material';
import { ChatHistoryItem } from './ChatHistoryItem';
import { styles } from '../view.styles';

interface ChatHistoryProps {
  chats: Array<{
    id: string;
    title: string;
  }>;
  selectedChatId?: string;
  onChatSelect: (chatId: string) => void;
  onChatRename: (chatId: string, newTitle: string) => void;
  onChatDelete: (chatId: string) => void;
}

export const ChatHistory: React.FC<ChatHistoryProps> = ({
  chats,
  selectedChatId,
  onChatSelect,
  onChatRename,
  onChatDelete,
}) => {
  return (
    <Box sx={styles.historyContainer}>
      {chats.map((chat) => (
        <ChatHistoryItem
          key={chat.id}
          id={chat.id}
          title={chat.title}
          isActive={selectedChatId === chat.id}
          onSelect={onChatSelect}
          onRename={onChatRename}
          onDelete={onChatDelete}
        />
      ))}
    </Box>
  );
};