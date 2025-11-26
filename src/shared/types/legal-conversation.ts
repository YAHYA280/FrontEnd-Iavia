// Conversation and Message Management Types for Legal Agent

// ============================================================
// ENUMS
// ============================================================

export enum SessionStatus {
  ACTIVE = 'ACTIVE',
  COMPLETED = 'COMPLETED',
}

export enum MessageChannel {
  IAVIA_INTERFACE_CHAT = 'IAVIA_INTERFACE_CHAT',
}

export enum MessageType {
  TEXT = 'TEXT',
  FILE = 'FILE',
  IMAGE = 'IMAGE',
}

export enum MessageDirection {
  INBOUND = 'INBOUND',   // User to Agent
  OUTBOUND = 'OUTBOUND', // Agent to User
}

// ============================================================
// FILE ATTACHMENT
// ============================================================

export interface FileAttachmentInfo {
  fileMetadataUid: string;
  fileName: string;
  fileUrl: string;
  fileSize?: number;
  contentType?: string;
}

// ============================================================
// MESSAGE DTOs
// ============================================================

export interface AgentMessageResponseDTO {
  uid: string;
  conversationSessionUid: string;
  direction: MessageDirection;
  type: MessageType;
  content: string;
  agentAnswer?: string;
  metadata?: string;
  timestamp: string; // ISO date string
  tokensUsed: number;
  fileMetadataUids: string[];
  attachments: FileAttachmentInfo[];
}

export interface SendMessageRequestDTO {
  conversationSessionUid: string;
  content: string;
  type: MessageType;
  files?: File[];
  metadata?: string;
}

export interface MessageListResponseDTO {
  messages: AgentMessageResponseDTO[];
  currentPage: number;
  totalPages: number;
  totalElements: number;
  pageSize: number;
  hasNext: boolean;
  hasPrevious: boolean;
  conversationSessionUid: string;
}

export interface MessageStatsDTO {
  totalMessages: number;
  inboundMessages: number;
  outboundMessages: number;
  messagesWithAttachments: number;
  totalTokensUsed: number;
}

// ============================================================
// CONVERSATION DTOs
// ============================================================

export interface ConversationSessionResponseDTO {
  uid: string;
  userUid: string;
  agentUid: string;
  agentName: string;
  channel: MessageChannel;
  status: SessionStatus;
  startedAt: string; // ISO date string
  endedAt?: string;  // ISO date string
  title?: string;
  messageCount: number;
  totalTokensUsed: number;
  lastMessage?: AgentMessageResponseDTO;
}

export interface CreateConversationRequestDTO {
  userUid: string;
  agentUid: string;
  channel: MessageChannel;
  initialMessage?: string;
}

export interface ConversationListResponseDTO {
  conversations: ConversationSessionResponseDTO[];
  currentPage: number;
  totalPages: number;
  totalElements: number;
  pageSize: number;
  hasNext: boolean;
  hasPrevious: boolean;
}

export interface ConversationStatsDTO {
  totalConversations: number;
  activeConversations: number;
  completedConversations: number;
  totalMessages: number;
  totalTokensUsed: number;
}

// ============================================================
// SEARCH & FILTER PARAMS
// ============================================================

export interface ConversationSearchParams {
  userUid: string;
  page?: number;
  size?: number;
  status?: SessionStatus;
}

export interface MessageSearchParams {
  conversationUid: string;
  page?: number;
  size?: number;
  searchTerm?: string;
}
