/**
 * Community Manager Enum Mappings and Translations
 */

import {
  ActivitySector,
  ActivitySectorOption,
  MarketingObjectiveType,
  MarketingObjectiveOption,
  ContentTone,
  ContentToneOption,
  CaptionLength,
  CaptionLengthOption,
  PostingFrequency,
  PostingFrequencyOption,
} from '../types/community-manager';

// ==================== ACTIVITY SECTOR ====================

export const activitySectorOptions: ActivitySectorOption[] = [
  { value: ActivitySector.TECHNOLOGY, label: 'Technologie' },
  { value: ActivitySector.E_COMMERCE, label: 'E-commerce' },
  { value: ActivitySector.FINANCE, label: 'Finance' },
  { value: ActivitySector.HEALTH, label: 'Santé' },
  { value: ActivitySector.EDUCATION, label: 'Éducation' },
  { value: ActivitySector.REAL_ESTATE, label: 'Immobilier' },
  { value: ActivitySector.RESTAURANT, label: 'Restauration' },
  { value: ActivitySector.FASHION, label: 'Mode' },
  { value: ActivitySector.AUTOMOTIVE, label: 'Automobile' },
  { value: ActivitySector.MEDIA, label: 'Média' },
  { value: ActivitySector.TRAVEL, label: 'Voyage' },
  { value: ActivitySector.ENTERTAINMENT, label: 'Divertissement' },
  { value: ActivitySector.SPORTS, label: 'Sports' },
  { value: ActivitySector.BEAUTY, label: 'Beauté' },
  { value: ActivitySector.CONSULTING, label: 'Conseil' },
  { value: ActivitySector.OTHER, label: 'Autre' },
];

export const getActivitySectorLabel = (sector: ActivitySector): string => {
  return activitySectorOptions.find(option => option.value === sector)?.label || sector;
};

// ==================== MARKETING OBJECTIVES ====================

export const marketingObjectiveOptions: MarketingObjectiveOption[] = [
  { value: MarketingObjectiveType.BOOST_VISIBILITY, label: 'Booster la visibilité' },
  { value: MarketingObjectiveType.ATTRACT_CLIENTS, label: 'Attirer plus de clients' },
  { value: MarketingObjectiveType.CREATE_QUALITY_CONTENT, label: 'Créer du contenu de qualité' },
  { value: MarketingObjectiveType.SAVE_TIME, label: 'Gagner du temps sur les tâches répétitives' },
  { value: MarketingObjectiveType.INCREASE_ENGAGEMENT, label: 'Augmenter l\'engagement' },
  { value: MarketingObjectiveType.BUILD_COMMUNITY, label: 'Construire une communauté' },
  { value: MarketingObjectiveType.BRAND_AWARENESS, label: 'Renforcer la notoriété de la marque' },
];

export const getMarketingObjectiveLabel = (objective: MarketingObjectiveType): string => {
  return marketingObjectiveOptions.find(option => option.value === objective)?.label || objective;
};

// ==================== CONTENT TONE ====================

export const contentToneOptions: ContentToneOption[] = [
  { value: ContentTone.PROFESSIONAL, label: 'Professionnel' },
  { value: ContentTone.FRIENDLY, label: 'Amical' },
  { value: ContentTone.CASUAL, label: 'Décontracté' },
  { value: ContentTone.ENTHUSIASTIC, label: 'Enthousiaste' },
  { value: ContentTone.INSPIRATIONAL, label: 'Inspirant' },
  { value: ContentTone.HUMOROUS, label: 'Humoristique' },
  { value: ContentTone.EDUCATIONAL, label: 'Éducatif' },
  { value: ContentTone.EMPATHETIC, label: 'Empathique' },
];

export const getContentToneLabel = (tone: ContentTone): string => {
  return contentToneOptions.find(option => option.value === tone)?.label || tone;
};

// ==================== CAPTION LENGTH ====================

export const captionLengthOptions: CaptionLengthOption[] = [
  { value: CaptionLength.SHORT, label: 'Court (50-100 caractères)' },
  { value: CaptionLength.MEDIUM, label: 'Moyen (100-200 caractères)' },
  { value: CaptionLength.LONG, label: 'Long (200+ caractères)' },
];

export const getCaptionLengthLabel = (length: CaptionLength): string => {
  return captionLengthOptions.find(option => option.value === length)?.label || length;
};

// ==================== POSTING FREQUENCY ====================

export const postingFrequencyOptions: PostingFrequencyOption[] = [
  { value: PostingFrequency.DAILY, label: 'Quotidien' },
  { value: PostingFrequency.TWICE_DAILY, label: 'Deux fois par jour' },
  { value: PostingFrequency.THREE_TIMES_DAILY, label: 'Trois fois par jour' },
  { value: PostingFrequency.EVERY_TWO_DAYS, label: 'Tous les deux jours' },
  { value: PostingFrequency.WEEKLY, label: 'Hebdomadaire' },
  { value: PostingFrequency.TWICE_WEEKLY, label: 'Deux fois par semaine' },
  { value: PostingFrequency.THREE_TIMES_WEEKLY, label: 'Trois fois par semaine' },
  { value: PostingFrequency.MONTHLY, label: 'Mensuel' },
  { value: PostingFrequency.CUSTOM, label: 'Personnalisé' },
];

export const getPostingFrequencyLabel = (frequency: PostingFrequency): string => {
  return postingFrequencyOptions.find(option => option.value === frequency)?.label || frequency;
};
