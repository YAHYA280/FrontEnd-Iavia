// Message Endpoints for Legal Agent Service

const messageEndpointPrefix = '/api/izemx-agent-legal/messages';

export const messageEndpoints = {
  // Send message in conversation
  send: `${messageEndpointPrefix}/send`,

  // Get message by UID
  getByUid: (messageUid: string) => `${messageEndpointPrefix}/${messageUid}`,

  // Get conversation messages (paginated)
  getConversationMessages: (conversationUid: string) =>
    `${messageEndpointPrefix}/conversation/${conversationUid}`,

  // Search messages in conversation
  searchMessages: (conversationUid: string) =>
    `${messageEndpointPrefix}/conversation/${conversationUid}/search`,

  // Delete message
  delete: (messageUid: string) => `${messageEndpointPrefix}/detail/${messageUid}`,

  // Get message statistics
  getStats: (conversationUid: string) =>
    `${messageEndpointPrefix}/conversation/${conversationUid}/stats`,
};
