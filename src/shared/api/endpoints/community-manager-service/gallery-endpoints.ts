const endpointPrefix = '/api/community-manager/gallery';

export const galleryEndpoints = {
  // Get all gallery media by agent
  getByAgent: (agentUid: string) => `${endpointPrefix}/agent/${agentUid}`,

  // Search gallery media
  search: (agentUid: string) => `${endpointPrefix}/agent/${agentUid}/search`,

  // Regenerate image
  regenerateImage: (imageUid: string) => `${endpointPrefix}/${imageUid}/regenerate`,
};
