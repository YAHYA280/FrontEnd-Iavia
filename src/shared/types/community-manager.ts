/**
 * Community Manager Types - Matching backend DTOs
 */

// ==================== ENUMS ====================

export enum ActivitySector {
  TECHNOLOGY = 'TECHNOLOGY',
  E_COMMERCE = 'E_COMMERCE',
  FINANCE = 'FINANCE',
  HEALTH = 'HEALTH',
  EDUCATION = 'EDUCATION',
  REAL_ESTATE = 'REAL_ESTATE',
  RESTAURANT = 'RESTAURANT',
  FASHION = 'FASHION',
  AUTOMOTIVE = 'AUTOMOTIVE',
  MEDIA = 'MEDIA',
  TRAVEL = 'TRAVEL',
  ENTERTAINMENT = 'ENTERTAINMENT',
  SPORTS = 'SPORTS',
  BEAUTY = 'BEAUTY',
  CONSULTING = 'CONSULTING',
  OTHER = 'OTHER',
}

export enum MarketingObjectiveType {
  BOOST_VISIBILITY = 'BOOST_VISIBILITY',
  ATTRACT_CLIENTS = 'ATTRACT_CLIENTS',
  CREATE_QUALITY_CONTENT = 'CREATE_QUALITY_CONTENT',
  SAVE_TIME = 'SAVE_TIME',
  INCREASE_ENGAGEMENT = 'INCREASE_ENGAGEMENT',
  BUILD_COMMUNITY = 'BUILD_COMMUNITY',
  BRAND_AWARENESS = 'BRAND_AWARENESS',
}

export enum ContentTone {
  PROFESSIONAL = 'PROFESSIONAL',
  FRIENDLY = 'FRIENDLY',
  CASUAL = 'CASUAL',
  ENTHUSIASTIC = 'ENTHUSIASTIC',
  INSPIRATIONAL = 'INSPIRATIONAL',
  HUMOROUS = 'HUMOROUS',
  EDUCATIONAL = 'EDUCATIONAL',
  EMPATHETIC = 'EMPATHETIC',
}

export enum CaptionLength {
  SHORT = 'SHORT',
  MEDIUM = 'MEDIUM',
  LONG = 'LONG',
}

export enum PostingFrequency {
  DAILY = 'DAILY',
  TWICE_DAILY = 'TWICE_DAILY',
  THREE_TIMES_DAILY = 'THREE_TIMES_DAILY',
  EVERY_TWO_DAYS = 'EVERY_TWO_DAYS',
  WEEKLY = 'WEEKLY',
  TWICE_WEEKLY = 'TWICE_WEEKLY',
  THREE_TIMES_WEEKLY = 'THREE_TIMES_WEEKLY',
  MONTHLY = 'MONTHLY',
  CUSTOM = 'CUSTOM',
}

export enum PlatformType {
  // Social Media Platforms
  INSTAGRAM = 'INSTAGRAM',
  FACEBOOK = 'FACEBOOK',
  TWITTER = 'TWITTER',
  LINKEDIN = 'LINKEDIN',
  TIKTOK = 'TIKTOK',
  YOUTUBE = 'YOUTUBE',
  PINTEREST = 'PINTEREST',
  REDDIT = 'REDDIT',
  SNAPCHAT = 'SNAPCHAT',
  THREADS = 'THREADS',
  TUMBLR = 'TUMBLR',
  MEDIUM = 'MEDIUM',

  // Messaging Platforms
  WHATSAPP = 'WHATSAPP',
  TELEGRAM = 'TELEGRAM',
  DISCORD = 'DISCORD',
  SLACK = 'SLACK',
  MICROSOFT_TEAMS = 'MICROSOFT_TEAMS',

  // Email Platforms
  GMAIL = 'GMAIL',
  OUTLOOK = 'OUTLOOK',

  // Business Platforms
  GOOGLE_BUSINESS = 'GOOGLE_BUSINESS',
  WORDPRESS = 'WORDPRESS',
  SUBSTACK = 'SUBSTACK',

  // Other
  MASTODON = 'MASTODON',
}

export enum IdeaStatus {
  DRAFT = 'DRAFT',
  SCHEDULED = 'SCHEDULED',
  PUBLISHED = 'PUBLISHED',
  ARCHIVED = 'ARCHIVED',
}

// ==================== REQUEST DTOs ====================

export interface CompanyInfoRequest {
  activitySector: ActivitySector;
  productsServices?: string;
  websiteUrl?: string;
}

export interface MarketingObjectiveRequest {
  objectiveType: MarketingObjectiveType;
}

export interface PlatformConfigurationRequest {
  platformType: PlatformType;
  contentTone?: ContentTone;
  captionLength?: CaptionLength;
  postingFrequency?: PostingFrequency;
  postCountPerCycle?: number;
  imagesPerIdea?: number;
  customFrequencyDays?: number;
}

export interface PlatformIntegrationRequest {
  platformType: PlatformType;
  accessToken?: string;
  refreshToken?: string;
  isActive?: boolean;
}

export interface CommunityManagerConfigurationRequest {
  agentUid: string;
  companyInfo: CompanyInfoRequest;
  marketingObjectives?: MarketingObjectiveRequest[];
  channelSettings?: PlatformConfigurationRequest[];
  platformIntegrations?: PlatformIntegrationRequest[];
}

// ==================== RESPONSE DTOs ====================

export interface CompanyInfoResponse {
  uid: string;
  activitySector: ActivitySector;
  productsServices?: string;
  websiteUrl?: string;
}

export interface MarketingObjectiveResponse {
  uid: string;
  objectiveType: MarketingObjectiveType;
}

export interface PlatformConfigurationResponse {
  uid: string;
  platformType: PlatformType;
  contentTone?: ContentTone;
  captionLength?: CaptionLength;
  postingFrequency?: PostingFrequency;
  postCountPerCycle?: number;
  imagesPerIdea?: number;
  customFrequencyDays?: number;
}

export interface PlatformIntegrationResponse {
  uid: string;
  platformType: PlatformType;
  isActive: boolean;
}

export interface CommunityManagerConfigurationResponse {
  agentUid: string;
  companyInfo?: CompanyInfoResponse;
  marketingObjectives?: MarketingObjectiveResponse[];
  channelSettings?: PlatformConfigurationResponse[];
  platformIntegrations?: PlatformIntegrationResponse[];
}

// ==================== UI HELPERS ====================

export interface ActivitySectorOption {
  value: ActivitySector;
  label: string;
}

export interface MarketingObjectiveOption {
  value: MarketingObjectiveType;
  label: string;
}

export interface ContentToneOption {
  value: ContentTone;
  label: string;
}

export interface CaptionLengthOption {
  value: CaptionLength;
  label: string;
}

export interface PostingFrequencyOption {
  value: PostingFrequency;
  label: string;
}

export interface IdeaImageResponse {
  uid: string;
  imageUrl: string;
  displayOrder: number;
  altText?: string;
}

export interface IdeaResponse {
  uid: string;
  platformType: PlatformType;
  caption: string;
  numberOfImages?: number;
  status: IdeaStatus;
  publishDateTime?: string;
  publishedAt?: string;
  platformPostId?: string;
  platformPostUrl?: string;
  images: IdeaImageResponse[];
  createdAt: string;
  updatedAt?: string;
}

export interface IdeaImageRequest {
  imageUrl: string;
  displayOrder: number;
  altText?: string;
}

export interface UpdateIdeaRequest {
  caption: string;
  images?: IdeaImageRequest[];
}

export interface PublishIdeaRequest {
  publishDateTime?: string;
  publishNow?: boolean;
}

export interface GenerateIdeasRequest {
  agentUid: string;
  platformTypes?: PlatformType[];
  numberOfIdeas?: number;
}

// ==================== AGENT ====================

export enum AgentType {
  COMMUNITY_MANAGER = 'COMMUNITY_MANAGER',
  CUSTOMER_CARE = 'CUSTOMER_CARE',
  LEGAL = 'LEGAL',
  SEO = 'SEO',
}

export interface AgentResponse {
  uid: string;
  name: string;
  type: AgentType;
  ownerAdminUid: string;
  createdBy: string;
  active: boolean;
  autoLanguageDetection: boolean;
  createdAt: string;
  updatedAt?: string;
}

export interface CreateAgentRequest {
  name: string;
  agentType: AgentType;
  ownerAdminUid: string;
  createdBy: string;
}

// ==================== GALLERY ====================

export interface GalleryMediaResponse {
  uid: string;
  type: 'image' | 'video';
  url: string;
  thumbnailUrl?: string;
  platformType: PlatformType;
  platformName: string;
  caption: string;
  status: IdeaStatus;
  ideaUid: string;
  createdAt: string;
}

export interface RegenerateImageRequest {
  prompt: string;
}
