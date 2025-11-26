/**
 * Central export point for all API-related modules
 */

// Stores
export { useKnowledgeBaseStore } from './stores/agent-legal-service/knowledge-base-store';
export { useBlockedKeywordsStore } from './stores/agent-legal-service/blocked-keywords-store';
export { useConversationStore } from './stores/agent-legal-service/conversation-store';
export { useMessageStore } from './stores/agent-legal-service/message-store';
export { useConfigurationStore } from './stores/community-manager-service/configuration-store';
export { useIdeasStore } from './stores/community-manager-service/ideas-store';
export { useAgentStore } from './stores/community-manager-service/agent-store';
export { useGalleryStore } from './stores/community-manager-service/gallery-store';

// Endpoints
export { knowledgeBaseEndpoints, knowledgeBaseTextEndpoints } from './endpoints/agent-legal-service/knowledge-base-endpoints';
export { blockedKeywordsEndpoints } from './endpoints/agent-legal-service/blocked-keywords-endpoints';
export { conversationEndpoints } from './endpoints/agent-legal-service/conversation-endpoints';
export { messageEndpoints } from './endpoints/agent-legal-service/message-endpoints';
export { communityManagerConfigurationEndpoints } from './endpoints/community-manager-service/configuration-endpoints';
export { ideasEndpoints } from './endpoints/community-manager-service/ideas-endpoints';
export { agentEndpoints } from './endpoints/community-manager-service/agent-endpoints';
export { galleryEndpoints } from './endpoints/community-manager-service/gallery-endpoints';

// Types
export type {
  FileMetadataDTO,
  FileUploadResultDTO,
  BulkDeleteResultDTO,
  Paginated,
  FileSearchParams,
  KnowledgeBaseTextRequestDTO,
  KnowledgeBaseTextResponseDTO,
  BlockedKeywordsRequestDTO,
  BlockedKeywordsResponseDTO,
} from '../types/knowledge-base';

export type {
  ConversationSessionResponseDTO,
  CreateConversationRequestDTO,
  ConversationListResponseDTO,
  ConversationStatsDTO,
  ConversationSearchParams,
  AgentMessageResponseDTO,
  SendMessageRequestDTO,
  MessageListResponseDTO,
  MessageStatsDTO,
  MessageSearchParams,
  FileAttachmentInfo,
} from '../types/legal-conversation';

export { SessionStatus, MessageChannel, MessageType, MessageDirection } from '../types/legal-conversation';

export type {
  ActivitySector,
  MarketingObjectiveType,
  ContentTone,
  CaptionLength,
  PostingFrequency,
  PlatformType,
  IdeaStatus,
  CompanyInfoRequest,
  MarketingObjectiveRequest,
  PlatformConfigurationRequest,
  PlatformIntegrationRequest,
  CommunityManagerConfigurationRequest,
  CompanyInfoResponse,
  MarketingObjectiveResponse,
  PlatformConfigurationResponse,
  PlatformIntegrationResponse,
  CommunityManagerConfigurationResponse,
  IdeaResponse,
  IdeaImageResponse,
  IdeaImageRequest,
  UpdateIdeaRequest,
  PublishIdeaRequest,
  GenerateIdeasRequest,
  AgentResponse,
  CreateAgentRequest,
  AgentType,
  GalleryMediaResponse,
  RegenerateImageRequest,
} from '../types/community-manager';
