import type { WizardData, FAQ } from '@/shared/types/wizard';

export interface ItriWizardProps {
  onBack: () => void;
  onComplete: (data: WizardData) => void;
}

export interface Schedule {
  id: number;
  days: string[];
  startTime: string;
  endTime: string;
}

export interface Notification {
  id: string;
  icon: string;
  title: string;
  description: string;
  enabled: boolean;
  delay?: string;
}

export interface NotificationChannels {
  activeChannel: string;
  email: string;
  whatsapp: string;
  telegram: string;
}

export interface AgentColor {
  primary: string;
  glow: string;
}

export interface WizardStepProps {
  wizardData: WizardData;
  setWizardData: React.Dispatch<React.SetStateAction<WizardData>>;
  agentColor: AgentColor;
}

export interface IdentityStepProps extends WizardStepProps {
  outOfHoursMessage: string;
  setOutOfHoursMessage: React.Dispatch<React.SetStateAction<string>>;
  timezone: string;
  setTimezone: React.Dispatch<React.SetStateAction<string>>;
  startTime: string;
  setStartTime: React.Dispatch<React.SetStateAction<string>>;
  endTime: string;
  setEndTime: React.Dispatch<React.SetStateAction<string>>;
  workingDays: {
    monday: boolean;
    tuesday: boolean;
    wednesday: boolean;
    thursday: boolean;
    friday: boolean;
    saturday: boolean;
    sunday: boolean;
  };
  setWorkingDays: React.Dispatch<React.SetStateAction<{
    monday: boolean;
    tuesday: boolean;
    wednesday: boolean;
    thursday: boolean;
    friday: boolean;
    saturday: boolean;
    sunday: boolean;
  }>>;
  spamKeywords: string[];
  setSpamKeywords: React.Dispatch<React.SetStateAction<string[]>>;
  handleLanguageToggle: (languageId: string) => void;
}

export interface NotificationsStepProps {
  notifications: Notification[];
  setNotifications: React.Dispatch<React.SetStateAction<Notification[]>>;
  notificationChannels: NotificationChannels;
  setNotificationChannels: React.Dispatch<React.SetStateAction<NotificationChannels>>;
  agentColor: AgentColor;
}

export interface IntegrationsStepProps extends WizardStepProps {
  handleIntegrationToggle: (
    category: 'communication' | 'ticketing' | 'ecommerce',
    id: string
  ) => void;
}

export interface IntegrationConfigStepProps {
  selectedIntegrations: Array<{
    id: string;
    title: string;
    icon: string;
    description: string;
    category: 'communication' | 'ticketing' | 'ecommerce';
  }>;
  activeIntegrationTab: string;
  setActiveIntegrationTab: React.Dispatch<React.SetStateAction<string>>;
  integrationConfigs: Record<string, any>;
  setIntegrationConfigs: React.Dispatch<React.SetStateAction<Record<string, any>>>;
  agentColor: AgentColor;
}

export interface ResumeStepProps {
  wizardData: WizardData;
  notifications: Notification[];
  notificationChannels: NotificationChannels;
  agentColor: AgentColor;
}

export type { WizardData, FAQ };
