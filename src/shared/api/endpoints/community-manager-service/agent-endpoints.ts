const endpointPrefix = '/api/community-manager/agents';

export const agentEndpoints = {
  // Create a new agent
  create: `${endpointPrefix}`,

  // Get agent by UID
  getByUid: (agentUid: string) => `${endpointPrefix}/${agentUid}`,

  // Get all agents by owner
  getAllByOwner: (ownerAdminUid: string) => `${endpointPrefix}/owner/${ownerAdminUid}`,

  // Delete agent
  delete: (agentUid: string) => `${endpointPrefix}/${agentUid}`,

  // Activate agent
  activate: (agentUid: string) => `${endpointPrefix}/${agentUid}/activate`,

  // Deactivate agent
  deactivate: (agentUid: string) => `${endpointPrefix}/${agentUid}/deactivate`,

  // Toggle agent status
  toggleStatus: (agentUid: string) => `${endpointPrefix}/${agentUid}/toggle-status`,
};
