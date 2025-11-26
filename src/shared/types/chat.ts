import type { AgentMessageResponseDTO, ConversationSessionResponseDTO } from './legal-conversation';
import { MessageDirection } from './legal-conversation';

export interface Message {
    id: string;
    content: string;
    sender: 'user' | 'agent';
    timestamp: Date;
    type: 'text' | 'file';
    files?: File[];
  }

  export interface Chat {
    id: string;
    title: string;
    messages: Message[];
    createdAt: Date;
    updatedAt: Date;
    isRenaming?: boolean;
  }

// Utility functions to convert between backend DTOs and frontend types
export const convertMessageDTOtoMessage = (dto: AgentMessageResponseDTO): Message => {
  return {
    id: dto.uid,
    content: dto.direction === MessageDirection.INBOUND ? dto.content : (dto.agentAnswer || dto.content),
    sender: dto.direction === MessageDirection.INBOUND ? 'user' : 'agent',
    timestamp: new Date(dto.timestamp),
    type: dto.attachments.length > 0 ? 'file' : 'text',
    files: undefined, // Files are handled as attachments in DTO
  };
};

export const convertConversationDTOtoChat = (dto: ConversationSessionResponseDTO): Chat => {
  // Use the title from backend, fallback to default if not available
  const title = dto.title && dto.title.trim().length > 0
    ? dto.title
    : 'Nouvelle conversation';

  return {
    id: dto.uid,
    title,
    messages: [], // Messages are loaded separately
    createdAt: new Date(dto.startedAt),
    updatedAt: dto.endedAt ? new Date(dto.endedAt) : new Date(dto.startedAt),
    isRenaming: false,
  };
};