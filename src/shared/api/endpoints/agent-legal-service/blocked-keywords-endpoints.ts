// ============================================================
// Blocked Keywords Management Endpoints
// ============================================================

const endpointPrefix = '/api/izemx-agent-legal/blocked-keywords';

/**
 * Blocked keywords management endpoints
 * Based on: BlockedKeywordsController.java
 */
export const blockedKeywordsEndpoints = {
  /**
   * Get blocked keywords for an agent
   * GET /api/izemx-agent-legal/blocked-keywords/{agentUid}
   * Path: agentUid (required)
   */
  getKeywords: (agentUid: string) => `${endpointPrefix}/${agentUid}`,

  /**
   * Add blocked keywords to an agent
   * POST /api/izemx-agent-legal/blocked-keywords/{agentUid}/add
   * Path: agentUid (required)
   * Body: BlockedKeywordsRequestDTO { keywords: string[] }
   */
  addKeywords: (agentUid: string) => `${endpointPrefix}/${agentUid}/add`,

  /**
   * Remove blocked keywords from an agent
   * POST /api/izemx-agent-legal/blocked-keywords/{agentUid}/remove
   * Path: agentUid (required)
   * Body: BlockedKeywordsRequestDTO { keywords: string[] }
   */
  removeKeywords: (agentUid: string) => `${endpointPrefix}/${agentUid}/remove`,

  /**
   * Clear all blocked keywords for an agent
   * POST /api/izemx-agent-legal/blocked-keywords/{agentUid}/clear
   * Path: agentUid (required)
   */
  clearAllKeywords: (agentUid: string) => `${endpointPrefix}/${agentUid}/clear`,
};
