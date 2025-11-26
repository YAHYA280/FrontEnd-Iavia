// Conversation Endpoints for Legal Agent Service

const conversationEndpointPrefix = '/api/izemx-agent-legal/conversations';

export const conversationEndpoints = {
  // Create new conversation
  create: conversationEndpointPrefix,

  // Get or create active conversation for user-agent pair
  getOrCreateActive: (userUid: string, agentUid: string, channel: string = 'IAVIA_INTERFACE_CHAT') =>
    `${conversationEndpointPrefix}/user/${userUid}/agent/${agentUid}/active?channel=${channel}`,

  // Get conversation by UID
  getByUid: (conversationUid: string) => `${conversationEndpointPrefix}/${conversationUid}`,

  // Get user conversations (paginated)
  getUserConversations: (userUid: string) => `${conversationEndpointPrefix}/user/${userUid}`,

  // Get user conversations by status (paginated)
  getUserConversationsByStatus: (userUid: string, status: string) =>
    `${conversationEndpointPrefix}/user/${userUid}/status/${status}`,

  // End/close conversation
  endConversation: (conversationUid: string) => `${conversationEndpointPrefix}/${conversationUid}/end`,

  // Delete conversation
  delete: (conversationUid: string) => `${conversationEndpointPrefix}/${conversationUid}`,

  // Get conversation statistics
  getStats: (userUid: string) => `${conversationEndpointPrefix}/user/${userUid}/stats`,
};
