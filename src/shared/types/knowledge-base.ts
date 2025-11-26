// ============================================================
// Knowledge Base File Management Types
// ============================================================

/**
 * File metadata returned from the backend
 * Matches the actual backend response structure
 */
export interface FileMetadataDTO {
  uid: string;
  displayName: string;
  storedName: string;
  size: number;
  fileType: string;
  fileUsageType: string;
  path: string;
  s3FolderPath: string;
  fullS3Url: string;
  uploadedBy: string;
  visibility: string;
  createdAt: string;
  updatedAt: string;

  // Aliases for backward compatibility
  fileUid?: string;
  fileSize?: number;
  mimeType?: string;
  uploadedAt?: string;
  originalFileName?: string;
}

/**
 * Result of file upload operation
 */
export interface FileUploadResultDTO {
  successCount: number;
  failureCount: number;
  uploadedFiles: FileMetadataDTO[];
  failedFiles: {
    fileName: string;
    reason: string;
  }[];
  message: string;
}

/**
 * Result of bulk delete operation
 */
export interface BulkDeleteResultDTO {
  successCount: number;
  failureCount: number;
  deletedFileUids: string[];
  failedFileUids: {
    fileUid: string;
    reason: string;
  }[];
  message: string;
}

/**
 * Paginated response structure
 */
export interface Paginated<T> {
  content: T[];
  pageable: {
    pageNumber: number;
    pageSize: number;
  };
  totalElements: number;
  totalPages: number;
  hasNext?: boolean;
  hasPrevious?: boolean;
}

/**
 * Search parameters for file queries
 */
export interface FileSearchParams {
  adminUid?: string;
  agentUid?: string;
  displayName?: string;
  uploadedBy?: string;
}

// ============================================================
// Knowledge Base Text Management Types
// ============================================================

/**
 * Request to update knowledge base text
 */
export interface KnowledgeBaseTextRequestDTO {
  text: string;
}

/**
 * Knowledge base text response from backend
 */
export interface KnowledgeBaseTextResponseDTO {
  agentUid: string;
  text: string;
  characterCount: number;
  hasText: boolean;
}

// ============================================================
// Blocked Keywords Management Types
// ============================================================

/**
 * Request to add/remove blocked keywords
 */
export interface BlockedKeywordsRequestDTO {
  keywords: string[];
}

/**
 * Blocked keywords response from backend
 */
export interface BlockedKeywordsResponseDTO {
  agentUid: string;
  blockedKeywords: string[];
  totalCount: number;
}
