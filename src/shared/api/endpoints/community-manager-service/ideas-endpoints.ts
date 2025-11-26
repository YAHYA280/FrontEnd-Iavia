const endpointPrefix = '/api/community-manager/ideas';

export const ideasEndpoints = {
  // Create a new idea
  create: `${endpointPrefix}`,

  // Get idea by UID
  getByUid: (ideaUid: string) => `${endpointPrefix}/${ideaUid}`,

  // Get all ideas by agent
  getAllByAgent: (agentUid: string) => `${endpointPrefix}/agent/${agentUid}`,

  // Get ideas by agent and status
  getByAgentAndStatus: (agentUid: string) => `${endpointPrefix}/agent/${agentUid}/status`,

  // Get ideas by agent and platform
  getByAgentAndPlatform: (agentUid: string) => `${endpointPrefix}/agent/${agentUid}/platform`,

  // Get ideas by agent, platform and status
  getByAgentPlatformAndStatus: (agentUid: string) => `${endpointPrefix}/agent/${agentUid}/filter`,

  // Update idea
  update: (ideaUid: string) => `${endpointPrefix}/${ideaUid}`,

  // Publish idea
  publish: (ideaUid: string) => `${endpointPrefix}/${ideaUid}/publish`,

  // Delete idea
  delete: (ideaUid: string) => `${endpointPrefix}/${ideaUid}`,

  // Generate ideas
  generate: `${endpointPrefix}/generate`,
};
