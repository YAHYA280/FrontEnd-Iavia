// ============================================================
// Knowledge Base File Management Endpoints
// ============================================================

const endpointPrefix = '/api/izemx-agent-legal/knowledge-base';

/**
 * All knowledge base file management endpoints
 * Based on: KnowledgeBaseFileController.java
 */
export const knowledgeBaseEndpoints = {
  /**
   * Upload files (family-level knowledge base)
   * POST /api/izemx-agent-legal/knowledge-base/upload
   * Content-Type: multipart/form-data
   * Headers: uploadedBy (required)
   * Body: files (List<MultipartFile>)
   */
  upload: `${endpointPrefix}/upload`,

  /**
   * Upload agent-specific knowledge files
   * POST /api/izemx-agent-legal/knowledge-base/upload-agent
   * Content-Type: multipart/form-data
   * Headers: uploadedBy (required)
   * Body: files, adminUid, agentUid
   */
  uploadAgent: `${endpointPrefix}/upload-agent`,

  /**
   * Get files by agent UID
   * GET /api/izemx-agent-legal/knowledge-base/by-agent
   * Headers: X-User-UID (required)
   * Params: adminUid, agentUid, displayName (optional)
   */
  getByAgent: `${endpointPrefix}/by-agent`,

  /**
   * Get files by uploader
   * GET /api/izemx-agent-legal/knowledge-base/by-uploader
   * Params: uploadedBy (required)
   */
  getByUploader: `${endpointPrefix}/by-uploader`,

  /**
   * Get file metadata by file UID
   * GET /api/izemx-agent-legal/knowledge-base/{fileUid}/metadata
   * Path: fileUid
   */
  getMetadata: (fileUid: string) => `${endpointPrefix}/${fileUid}/metadata`,

  /**
   * Search files by display name
   * GET /api/izemx-agent-legal/knowledge-base/search
   * Params: displayName (required)
   */
  search: `${endpointPrefix}/search`,

  /**
   * Download file
   * GET /api/izemx-agent-legal/knowledge-base/{fileUid}/download
   * Headers: X-User-UID (required)
   * Path: fileUid
   */
  download: (fileUid: string) => `${endpointPrefix}/${fileUid}/download`,

  /**
   * Rename file
   * POST /api/izemx-agent-legal/knowledge-base/{fileUid}/rename
   * Headers: X-User-UID (required)
   * Path: fileUid
   * Params: newDisplayName (required)
   */
  rename: (fileUid: string) => `${endpointPrefix}/${fileUid}/rename`,

  /**
   * Delete single file
   * POST /api/izemx-agent-legal/knowledge-base/{fileUid}
   * Headers: X-User-UID (required)
   * Path: fileUid
   */
  delete: (fileUid: string) => `${endpointPrefix}/${fileUid}`,

  /**
   * Bulk delete files
   * DELETE /api/izemx-agent-legal/knowledge-base/bulk-delete
   * Headers: X-User-UID (required)
   * Body: List<String> (fileUids)
   */
  bulkDelete: `${endpointPrefix}/bulk-delete`,
};

// ============================================================
// Knowledge Base Text Management Endpoints
// ============================================================

const textEndpointPrefix = '/api/izemx-agent-legal/knowledge-base-text';

/**
 * Knowledge base text management endpoints
 * Based on: KnowledgeBaseTextController.java
 */
export const knowledgeBaseTextEndpoints = {
  /**
   * Get knowledge base text for an agent
   * GET /api/izemx-agent-legal/knowledge-base-text/{agentUid}
   * Path: agentUid (required)
   */
  getText: (agentUid: string) => `${textEndpointPrefix}/${agentUid}`,

  /**
   * Update/Create knowledge base text for an agent
   * POST /api/izemx-agent-legal/knowledge-base-text/{agentUid}
   * Path: agentUid (required)
   * Body: KnowledgeBaseTextRequestDTO { text: string }
   */
  updateText: (agentUid: string) => `${textEndpointPrefix}/${agentUid}`,
};
