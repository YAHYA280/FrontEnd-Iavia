const endpointPrefix = '/api/community-manager/configuration';

export const communityManagerConfigurationEndpoints = {
  save: `${endpointPrefix}`,
  getByAgentUid: (agentUid: string) => `${endpointPrefix}/${agentUid}`,
  update: (agentUid: string) => `${endpointPrefix}/${agentUid}`,
};
