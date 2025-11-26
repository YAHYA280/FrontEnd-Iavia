import { IdeaResponse, IdeaStatus, PlatformType } from '../types/community-manager';
import { Idea } from '../_mock/community-manager-config';

/**
 * Platform metadata configuration
 */
export const PLATFORM_CONFIG: Record<
  PlatformType,
  { name: string; logoSrc: string }
> = {
  // Social Media Platforms
  [PlatformType.INSTAGRAM]: { name: 'Instagram', logoSrc: '/images/platforms/instagram.png' },
  [PlatformType.FACEBOOK]: { name: 'Facebook', logoSrc: '/images/platforms/facebook.png' },
  [PlatformType.TWITTER]: { name: 'Twitter', logoSrc: '/images/platforms/twitter.png' },
  [PlatformType.LINKEDIN]: { name: 'LinkedIn', logoSrc: '/images/platforms/linkedin.png' },
  [PlatformType.TIKTOK]: { name: 'TikTok', logoSrc: '/images/platforms/tiktok.png' },
  [PlatformType.YOUTUBE]: { name: 'YouTube', logoSrc: '/images/platforms/youtube.png' },
  [PlatformType.PINTEREST]: { name: 'Pinterest', logoSrc: '/images/platforms/pinterest.png' },
  [PlatformType.REDDIT]: { name: 'Reddit', logoSrc: '/images/platforms/reddit.png' },
  [PlatformType.SNAPCHAT]: { name: 'Snapchat', logoSrc: '/images/platforms/snapchat.png' },
  [PlatformType.THREADS]: { name: 'Threads', logoSrc: '/images/platforms/threads.png' },
  [PlatformType.TUMBLR]: { name: 'Tumblr', logoSrc: '/images/platforms/tumblr.png' },
  [PlatformType.MEDIUM]: { name: 'Medium', logoSrc: '/images/platforms/medium.png' },

  // Messaging Platforms
  [PlatformType.WHATSAPP]: { name: 'WhatsApp', logoSrc: '/images/platforms/whatsapp.png' },
  [PlatformType.TELEGRAM]: { name: 'Telegram', logoSrc: '/images/platforms/telegram.png' },
  [PlatformType.DISCORD]: { name: 'Discord', logoSrc: '/images/platforms/discord.png' },
  [PlatformType.SLACK]: { name: 'Slack', logoSrc: '/images/platforms/slack.png' },
  [PlatformType.MICROSOFT_TEAMS]: { name: 'Microsoft Teams', logoSrc: '/images/platforms/teams.png' },

  // Email Platforms
  [PlatformType.GMAIL]: { name: 'Gmail', logoSrc: '/images/platforms/gmail.png' },
  [PlatformType.OUTLOOK]: { name: 'Outlook', logoSrc: '/images/platforms/outlook.png' },

  // Business Platforms
  [PlatformType.GOOGLE_BUSINESS]: { name: 'Google Business', logoSrc: '/images/platforms/google-business.png' },
  [PlatformType.WORDPRESS]: { name: 'WordPress', logoSrc: '/images/platforms/wordpress.png' },
  [PlatformType.SUBSTACK]: { name: 'Substack', logoSrc: '/images/platforms/substack.png' },

  // Other
  [PlatformType.MASTODON]: { name: 'Mastodon', logoSrc: '/images/platforms/mastodon.png' },
};

/**
 * Converts IdeaResponse from API to Idea format used by components
 */
export const mapIdeaResponseToIdea = (ideaResponse: IdeaResponse): Idea => {
  const platformConfig = PLATFORM_CONFIG[ideaResponse.platformType];

  return {
    id: ideaResponse.uid,
    platformId: ideaResponse.platformType,
    platformName: platformConfig.name,
    platformLogoSrc: platformConfig.logoSrc,
    imageUrls: ideaResponse.images
      .sort((a, b) => a.displayOrder - b.displayOrder)
      .map((img) => img.imageUrl),
    caption: ideaResponse.caption,
    status: mapIdeaStatusToComponentStatus(ideaResponse.status),
    createdAt: ideaResponse.createdAt,
  };
};

/**
 * Converts IdeaStatus enum to component status format
 */
export const mapIdeaStatusToComponentStatus = (
  status: IdeaStatus
): 'draft' | 'published' => {
  switch (status) {
    case IdeaStatus.PUBLISHED:
      return 'published';
    case IdeaStatus.DRAFT:
    case IdeaStatus.SCHEDULED:
    case IdeaStatus.ARCHIVED:
    default:
      return 'draft';
  }
};

/**
 * Converts image URLs array to IdeaImageRequest format
 */
export const mapImageUrlsToIdeaImageRequests = (imageUrls: string[]) => {
  return imageUrls.map((url, index) => ({
    imageUrl: url,
    displayOrder: index,
    altText: `Image ${index + 1}`,
  }));
};

/**
 * Get platform configuration by platform type
 */
export const getPlatformConfig = (platformType: PlatformType) => {
  return PLATFORM_CONFIG[platformType];
};
