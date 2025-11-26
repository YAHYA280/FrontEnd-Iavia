import dayjs from "dayjs";
import { ScheduledPost } from "../types/calendar";

export interface PlatformIntegration {
  id: string;
  name: string;
  logoSrc: string;
  isConnected: boolean;
  showLinkIcon?: boolean;
}

export const defaultPlatforms: PlatformIntegration[] = [
  {
    id: 'whatsapp',
    name: 'WhatsApp',
    logoSrc: '/icons/whatsapp.svg',
    isConnected: false,
  },
  {
    id: 'instagram',
    name: 'Instagram',
    logoSrc: '/icons/instagram.svg',
    isConnected: true,
  },
  {
    id: 'facebook',
    name: 'Facebook',
    logoSrc: '/icons/messenger.svg',
    isConnected: true,
  },
  {
    id: 'telegram',
    name: 'Telegram',
    logoSrc: '/icons/telegram.svg',
    isConnected: false,
  },
  {
    id: 'discord',
    name: 'Discord',
    logoSrc: '/icons/discord.svg',
    isConnected: true,
  },
  {
    id: 'youtube',
    name: 'YouTube',
    logoSrc: '/icons/youtube.svg',
    isConnected: false,
  },
];

export interface MenuOption {
  id: string;
  label: string;
  icon: string;
}

export const menuOptions: MenuOption[] = [
  { id: 'integrations', label: 'Intégrations', icon: 'link' },
  { id: 'configuration', label: 'Configuration', icon: 'cog' },
  { id: 'idees', label: 'Idées', icon: 'lightbulb' },
  { id: 'calendar', label: 'Calendar', icon: 'calendar-days' },
  { id: 'galerie', label: 'Galerie', icon: 'images' },
  { id: 'statistiques', label: 'Statistiques', icon: 'chart-line' },
];

export interface Idea {
  id: string;
  platformId: string;
  platformName: string;
  platformLogoSrc: string;
  imageUrls: string[];
  caption: string;
  status: 'draft' | 'published';
  createdAt: string;
}

export const defaultIdeas: Idea[] = [
  {
    id: '1',
    platformId: 'instagram',
    platformName: 'Instagram',
    platformLogoSrc: '/icons/instagram.svg',
    imageUrls: [
      'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&h=600&fit=crop',
    ],
    caption: 'Découvrez notre nouvelle collection printemps-été ! Des pièces uniques qui allient style et confort pour sublimer votre garde-robe. 🌸✨',
    status: 'draft',
    createdAt: '2024-01-15T10:30:00Z',
  },
  {
    id: '2',
    platformId: 'facebook',
    platformName: 'Facebook',
    platformLogoSrc: '/icons/messenger.svg',
    imageUrls: [
      'https://images.unsplash.com/photo-1551434678-e076c223a692?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1511578314322-379afb476865?w=800&h=600&fit=crop',
    ],
    caption: 'Rejoignez-nous pour un événement exclusif ce samedi ! Au programme : networking, conférences inspirantes et découvertes innovantes. Réservez votre place dès maintenant ! 🎉',
    status: 'draft',
    createdAt: '2024-01-16T14:20:00Z',
  },
  {
    id: '3',
    platformId: 'youtube',
    platformName: 'YouTube',
    platformLogoSrc: '/icons/youtube.svg',
    imageUrls: [
      'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=800&h=600&fit=crop',
    ],
    caption: 'Nouvelle vidéo en ligne ! Apprenez les meilleures pratiques pour optimiser votre productivité au quotidien. Des conseils pratiques et des astuces testées. 👨‍💼',
    status: 'draft',
    createdAt: '2024-01-14T09:15:00Z',
  },
  {
    id: '4',
    platformId: 'instagram',
    platformName: 'Instagram',
    platformLogoSrc: '/icons/instagram.svg',
    imageUrls: [
      'https://images.unsplash.com/photo-1557683316-973673baf926?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=800&h=600&fit=crop',
    ],
    caption: 'Inspiration du jour : "Le succès n\'est pas une destination, c\'est un voyage." Partagez votre propre définition du succès en commentaire ! 💭',
    status: 'draft',
    createdAt: '2024-01-17T11:45:00Z',
  },
  {
    id: '5',
    platformId: 'telegram',
    platformName: 'Telegram',
    platformLogoSrc: '/icons/telegram.svg',
    imageUrls: [
      'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=600&fit=crop',
    ],
    caption: '🚀 Nouvelle fonctionnalité disponible ! Découvrez comment notre dernière mise à jour peut transformer votre façon de travailler. Testez-la gratuitement pendant 30 jours.',
    status: 'draft',
    createdAt: '2024-01-18T16:00:00Z',
  },
  {
    id: '6',
    platformId: 'discord',
    platformName: 'Discord',
    platformLogoSrc: '/icons/discord.svg',
    imageUrls: [
      'https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=600&fit=crop',
    ],
    caption: 'Rejoignez notre communauté Discord pour échanger avec d\'autres passionnés ! Partagez vos projets, obtenez de l\'aide et participez à nos événements exclusifs. 🎮',
    status: 'draft',
    createdAt: '2024-01-19T13:30:00Z',
  },
]

export interface MarketingObjective {
  id: string;
  label: string;
}

export const marketingObjectives: MarketingObjective[] = [
  { id: 'visibility', label: 'Booster la visibilité' },
  { id: 'clients', label: 'Attirer plus de clients' },
  { id: 'content', label: 'Créer du contenu de qualité' },
  { id: 'time', label: 'Gagner du temps sur les tâches répétitives' },
];

export interface PlatformChannelSettings {
  platformId: string;
  platformName: string;
  logoSrc: string;
  settings: {
    tone: { value: string };
    captionLength: { value: string };
    frequency: { value: string };
    postCount: { value: string };
    imagesPerPost: { value: string };
  };
}

export const defaultChannelSettings: PlatformChannelSettings[] = [
  {
    platformId: 'facebook',
    platformName: 'Facebook',
    logoSrc: '/icons/messenger.svg',
    settings: {
      tone: { value: '' },
      captionLength: { value: '' },
      frequency: { value: '' },
      postCount: { value: '' },
      imagesPerPost: { value: '' },
    },
  },
  {
    platformId: 'instagram',
    platformName: 'Instagram',
    logoSrc: '/icons/instagram.svg',
    settings: {
      tone: { value: '' },
      captionLength: { value: '' },
      frequency: { value: '' },
      postCount: { value: '' },
      imagesPerPost: { value: '' },
    },
  },
  {
    platformId: 'twitter',
    platformName: 'Twitter',
    logoSrc: '/icons/tiktok.svg',
    settings: {
      tone: { value: '' },
      captionLength: { value: '' },
      frequency: { value: '' },
      postCount: { value: '' },
      imagesPerPost: { value: '' },
    },
  },
];

// posts
export const mockScheduledPosts: ScheduledPost[] = [
  {
    id: '1',
    title: 'Post Instagram - Nouvelle collection',
    caption: 'Découvrez notre nouvelle collection printemps-été !',
    imageUrls: ['https://images.unsplash.com/photo-1611162617474-5b21e879e113'],
    platformIds: ['instagram'],
    platformLogoSrcs: ['/icons/instagram.svg'],
    status: 'scheduled',
    start: dayjs().add(1, 'day').hour(10).minute(0).toISOString(),
    end: dayjs().add(1, 'day').hour(10).minute(30).toISOString(),
    allDay: false,
    color: '#E1306C',
  },
  {
    id: '2',
    title: 'Post Facebook - Événement',
    caption: 'Rejoignez-nous pour un événement exclusif !',
    imageUrls: ['https://images.unsplash.com/photo-1551434678-e076c223a692'],
    platformIds: ['facebook'],
    platformLogoSrcs: ['/icons/messenger.svg'],
    status: 'scheduled',
    start: dayjs().add(2, 'day').hour(14).minute(0).toISOString(),
    end: dayjs().add(2, 'day').hour(14).minute(30).toISOString(),
    allDay: false,
    color: '#1877F2',
  },
  {
    id: '3',
    title: 'Post LinkedIn - Article',
    caption: 'Nouvel article sur les tendances du marché',
    imageUrls: [],
    platformIds: ['instagram'],
    platformLogoSrcs: ['/icons/instagram.svg'],
    status: 'published',
    start: dayjs().add(1, 'day').hour(12).minute(0).toISOString(),
    end: dayjs().add(1, 'day').hour(12).minute(30).toISOString(),
    allDay: false,
    color: '#1877F2',
  },
  {
    id: '4',
    title: 'Post Twitter - Actualité',
    caption: 'Dernières actualités de notre entreprise',
    imageUrls: [],
    platformIds: ['facebook'],
    platformLogoSrcs: ['/icons/messenger.svg'],
    status: 'scheduled',
    start: dayjs().add(1, 'day').hour(15).minute(0).toISOString(),
    end: dayjs().add(1, 'day').hour(15).minute(30).toISOString(),
    allDay: false,
    color: '#1877F2',
  },
];

export interface GalleryMedia {
  id: string;
  type: 'image' | 'video';
  url: string;
  thumbnailUrl?: string;
  platformId: string;
  platformName: string;
  platformLogoSrc: string;
  caption: string;
  status: 'published' | 'scheduled' | 'draft';
  createdAt: string;
}

export const defaultGalleryMedia: GalleryMedia[] = [
  {
    id: 'media-1',
    type: 'image',
    url: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=800&h=600&fit=crop',
    platformId: 'instagram',
    platformName: 'Instagram',
    platformLogoSrc: '/icons/instagram.svg',
    caption: 'Découvrez notre nouvelle collection printemps-été ! 🌸✨',
    status: 'published',
    createdAt: '2024-01-15T10:30:00Z',
  },
  {
    id: 'media-2',
    type: 'image',
    url: 'https://images.unsplash.com/photo-1551434678-e076c223a692?w=800&h=600&fit=crop',
    platformId: 'facebook',
    platformName: 'Facebook',
    platformLogoSrc: '/icons/messenger.svg',
    caption: 'Rejoignez-nous pour un événement exclusif ce samedi ! 🎉',
    status: 'scheduled',
    createdAt: '2024-01-16T14:20:00Z',
  },
  {
    id: 'media-3',
    type: 'video',
    url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    thumbnailUrl: 'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=800&h=600&fit=crop',
    platformId: 'youtube',
    platformName: 'YouTube',
    platformLogoSrc: '/icons/youtube.svg',
    caption: 'Nouvelle vidéo en ligne ! Optimisez votre productivité 👨‍💼',
    status: 'published',
    createdAt: '2024-01-14T09:15:00Z',
  },
  {
    id: 'media-4',
    type: 'image',
    url: 'https://images.unsplash.com/photo-1557683316-973673baf926?w=800&h=600&fit=crop',
    platformId: 'instagram',
    platformName: 'Instagram',
    platformLogoSrc: '/icons/instagram.svg',
    caption: 'Inspiration du jour : "Le succès est un voyage" 💭',
    status: 'draft',
    createdAt: '2024-01-17T11:45:00Z',
  },
  {
    id: 'media-5',
    type: 'image',
    url: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=800&h=600&fit=crop',
    platformId: 'telegram',
    platformName: 'Telegram',
    platformLogoSrc: '/icons/telegram.svg',
    caption: '🚀 Nouvelle fonctionnalité disponible !',
    status: 'published',
    createdAt: '2024-01-18T16:00:00Z',
  },
  {
    id: 'media-6',
    type: 'image',
    url: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&h=600&fit=crop',
    platformId: 'discord',
    platformName: 'Discord',
    platformLogoSrc: '/icons/discord.svg',
    caption: 'Rejoignez notre communauté Discord ! 🎮',
    status: 'scheduled',
    createdAt: '2024-01-19T13:30:00Z',
  },
  {
    id: 'media-7',
    type: 'image',
    url: 'https://images.unsplash.com/photo-1511578314322-379afb476865?w=800&h=600&fit=crop',
    platformId: 'facebook',
    platformName: 'Facebook',
    platformLogoSrc: '/icons/messenger.svg',
    caption: 'Conférences inspirantes et découvertes innovantes',
    status: 'published',
    createdAt: '2024-01-20T08:30:00Z',
  },
  {
    id: 'media-8',
    type: 'image',
    url: 'https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=800&h=600&fit=crop',
    platformId: 'instagram',
    platformName: 'Instagram',
    platformLogoSrc: '/icons/instagram.svg',
    caption: 'Des moments uniques capturés pour vous',
    status: 'draft',
    createdAt: '2024-01-21T12:15:00Z',
  },
];





export interface StatMetric {
  id: string;
  label: string;
  value: string;
  change: number; // percentage change
  icon: string;
}

export const defaultStatsMetrics: StatMetric[] = [
  {
    id: 'total-posts',
    label: 'Nombre total de publications',
    value: '1,245',
    change: 12.5,
    icon: 'file-lines',
  },
  {
    id: 'engagement-rate',
    label: "Taux d'engagement global",
    value: '8.3%',
    change: 3.2,
    icon: 'heart',
  },
  {
    id: 'audience-growth',
    label: "Croissance de l'audience",
    value: '+2,847',
    change: 15.8,
    icon: 'users',
  },
  {
    id: 'posting-consistency',
    label: 'Taux de publication régulière',
    value: '94%',
    change: -2.1,
    icon: 'calendar-check',
  },
];
export interface ActivityDataPoint {
  date: string;
  instagram?: number;
  facebook?: number;
  youtube?: number;
  telegram?: number;
  discord?: number;
  whatsapp?: number;
}

export const defaultActivityData: ActivityDataPoint[] = [
  { date: '2024-01-01', instagram: 12, facebook: 8, youtube: 3, telegram: 5, discord: 7 },
  { date: '2024-01-02', instagram: 15, facebook: 10, youtube: 2, telegram: 6, discord: 9 },
  { date: '2024-01-03', instagram: 18, facebook: 12, youtube: 4, telegram: 7, discord: 11 },
  { date: '2024-01-04', instagram: 14, facebook: 9, youtube: 3, telegram: 8, discord: 10 },
  { date: '2024-01-05', instagram: 20, facebook: 15, youtube: 5, telegram: 9, discord: 12 },
  { date: '2024-01-06', instagram: 16, facebook: 11, youtube: 4, telegram: 7, discord: 8 },
  { date: '2024-01-07', instagram: 22, facebook: 14, youtube: 6, telegram: 10, discord: 13 },
  { date: '2024-01-08', instagram: 19, facebook: 13, youtube: 5, telegram: 8, discord: 11 },
  { date: '2024-01-09', instagram: 25, facebook: 16, youtube: 7, telegram: 11, discord: 14 },
  { date: '2024-01-10', instagram: 21, facebook: 14, youtube: 6, telegram: 9, discord: 12 },
  { date: '2024-01-11', instagram: 24, facebook: 17, youtube: 8, telegram: 12, discord: 15 },
  { date: '2024-01-12', instagram: 20, facebook: 15, youtube: 7, telegram: 10, discord: 13 },
  { date: '2024-01-13', instagram: 26, facebook: 18, youtube: 9, telegram: 13, discord: 16 },
  { date: '2024-01-14', instagram: 23, facebook: 16, youtube: 8, telegram: 11, discord: 14 },
];

export interface PlatformPerformance {
  platformId: string;
  platformName: string;
  engagement: number;
  reach: number;
  clicks: number;
}

export const defaultPlatformPerformance: PlatformPerformance[] = [
  {
    platformId: 'instagram',
    platformName: 'Instagram',
    engagement: 8500,
    reach: 45000,
    clicks: 3200,
  },
  {
    platformId: 'facebook',
    platformName: 'Facebook',
    engagement: 6200,
    reach: 38000,
    clicks: 2800,
  },
  {
    platformId: 'youtube',
    platformName: 'YouTube',
    engagement: 12000,
    reach: 95000,
    clicks: 8500,
  },
  {
    platformId: 'telegram',
    platformName: 'Telegram',
    engagement: 4800,
    reach: 28000,
    clicks: 2100,
  },
  {
    platformId: 'discord',
    platformName: 'Discord',
    engagement: 5500,
    reach: 32000,
    clicks: 2400,
  },
];

export interface AudienceGrowthPoint {
  date: string;
  instagram?: number;
  facebook?: number;
  youtube?: number;
  telegram?: number;
  discord?: number;
}

export const defaultAudienceGrowth: AudienceGrowthPoint[] = [
  { date: '2024-01-01', instagram: 4500, facebook: 3200, youtube: 2800, telegram: 1500, discord: 1200 },
  { date: '2024-01-02', instagram: 4620, facebook: 3280, youtube: 2850, telegram: 1540, discord: 1230 },
  { date: '2024-01-03', instagram: 4750, facebook: 3350, youtube: 2900, telegram: 1580, discord: 1260 },
  { date: '2024-01-04', instagram: 4880, facebook: 3420, youtube: 2950, telegram: 1620, discord: 1290 },
  { date: '2024-01-05', instagram: 5020, facebook: 3500, youtube: 3000, telegram: 1660, discord: 1320 },
  { date: '2024-01-06', instagram: 5150, facebook: 3570, youtube: 3050, telegram: 1700, discord: 1350 },
  { date: '2024-01-07', instagram: 5280, facebook: 3640, youtube: 3100, telegram: 1740, discord: 1380 },
  { date: '2024-01-08', instagram: 5420, facebook: 3720, youtube: 3150, telegram: 1780, discord: 1410 },
  { date: '2024-01-09', instagram: 5560, facebook: 3800, youtube: 3200, telegram: 1820, discord: 1440 },
  { date: '2024-01-10', instagram: 5700, facebook: 3880, youtube: 3250, telegram: 1860, discord: 1470 },
  { date: '2024-01-11', instagram: 5850, facebook: 3960, youtube: 3300, telegram: 1900, discord: 1500 },
  { date: '2024-01-12', instagram: 6000, facebook: 4040, youtube: 3350, telegram: 1940, discord: 1530 },
  { date: '2024-01-13', instagram: 6150, facebook: 4120, youtube: 3400, telegram: 1980, discord: 1560 },
  { date: '2024-01-14', instagram: 6300, facebook: 4200, youtube: 3450, telegram: 2020, discord: 1590 },
];

export interface TopPost {
  id: string;
  imageUrl: string;
  caption: string;
  platformId: string;
  platformName: string;
  platformLogoSrc: string;
  likes: number;
  comments: number;
  shares: number;
  reach: number;
  engagement: number;
}

export const defaultTopPosts: TopPost[] = [
  {
    id: 'top-1',
    imageUrl: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=800&h=600&fit=crop',
    caption: 'Summer collection launch',
    platformId: 'instagram',
    platformName: 'Instagram',
    platformLogoSrc: '/icons/instagram.svg',
    likes: 1240,
    comments: 89,
    shares: 45,
    reach: 15600,
    engagement: 8.8,
  },
  {
    id: 'top-2',
    imageUrl: 'https://images.unsplash.com/photo-1551434678-e076c223a692?w=800&h=600&fit=crop',
    caption: 'Exclusive event highlights',
    platformId: 'facebook',
    platformName: 'Facebook',
    platformLogoSrc: '/icons/messenger.svg',
    likes: 987,
    comments: 67,
    shares: 123,
    reach: 22400,
    engagement: 5.3,
  },
  {
    id: 'top-3',
    imageUrl: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=800&h=600&fit=crop',
    caption: 'Product launch announcement',
    platformId: 'telegram',
    platformName: 'Telegram',
    platformLogoSrc: '/icons/telegram.svg',
    likes: 756,
    comments: 42,
    shares: 89,
    reach: 12300,
    engagement: 7.2,
  },
  {
    id: 'top-4',
    imageUrl: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&h=600&fit=crop',
    caption: 'Community spotlight',
    platformId: 'discord',
    platformName: 'Discord',
    platformLogoSrc: '/icons/discord.svg',
    likes: 654,
    comments: 31,
    shares: 56,
    reach: 9800,
    engagement: 7.5,
  },
];



