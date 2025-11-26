import { PlatformType } from '../types/community-manager';

export interface PlatformInfo {
  name: string;
  logoSrc: string;
}

/**
 * Maps PlatformType enum to display information
 */
export const getPlatformInfo = (platformType: PlatformType): PlatformInfo => {
  const platformMap: Record<string, PlatformInfo> = {
    INSTAGRAM: { name: 'Instagram', logoSrc: '/icons/instagram.svg' },
    FACEBOOK: { name: 'Facebook', logoSrc: '/icons/messenger.svg' },
    TWITTER: { name: 'Twitter', logoSrc: '/icons/twitter.svg' },
    LINKEDIN: { name: 'LinkedIn', logoSrc: '/icons/linkedin.svg' },
    TIKTOK: { name: 'TikTok', logoSrc: '/icons/tiktok.svg' },
    YOUTUBE: { name: 'YouTube', logoSrc: '/icons/youtube.svg' },
    WHATSAPP: { name: 'WhatsApp', logoSrc: '/icons/whatsapp.svg' },
    TELEGRAM: { name: 'Telegram', logoSrc: '/icons/telegram.svg' },
    DISCORD: { name: 'Discord', logoSrc: '/icons/discord.svg' },
    PINTEREST: { name: 'Pinterest', logoSrc: '/icons/pinterest.svg' },
    REDDIT: { name: 'Reddit', logoSrc: '/icons/reddit.svg' },
    SNAPCHAT: { name: 'Snapchat', logoSrc: '/icons/snapchat.svg' },
    THREADS: { name: 'Threads', logoSrc: '/icons/threads.svg' },
    TUMBLR: { name: 'Tumblr', logoSrc: '/icons/tumblr.svg' },
    MEDIUM: { name: 'Medium', logoSrc: '/icons/medium.svg' },
    SLACK: { name: 'Slack', logoSrc: '/icons/slack.svg' },
    MICROSOFT_TEAMS: { name: 'Microsoft Teams', logoSrc: '/icons/teams.svg' },
    GMAIL: { name: 'Gmail', logoSrc: '/icons/gmail.svg' },
    OUTLOOK: { name: 'Outlook', logoSrc: '/icons/outlook.svg' },
    GOOGLE_BUSINESS: { name: 'Google Business', logoSrc: '/icons/google-business.svg' },
    WORDPRESS: { name: 'WordPress', logoSrc: '/icons/wordpress.svg' },
    SUBSTACK: { name: 'Substack', logoSrc: '/icons/substack.svg' },
    MASTODON: { name: 'Mastodon', logoSrc: '/icons/mastodon.svg' },
  };

  return platformMap[platformType] || { name: platformType, logoSrc: '/icons/default.svg' };
};

/**
 * Converts PlatformType enum to lowercase ID for filtering
 */
export const getPlatformId = (platformType: PlatformType): string => {
  return platformType.toLowerCase();
};
