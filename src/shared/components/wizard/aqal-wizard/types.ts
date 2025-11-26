import { AqalWizardData } from './use-aqal-wizard-state';

export interface AqalWizardProps {
  onBack: () => void;
  onComplete: (data: AqalWizardData) => void;
}

export interface AgentColor {
  primary: string;
  glow: string;
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

export interface IntegrationsStepProps {
  wizardData: AqalWizardData;
  handleIntegrationToggle: (
    category: 'communication' | 'ticketing' | 'ecommerce',
    id: string
  ) => void;
  agentColor: AgentColor;
}

export interface StepDocumentProps {
  country: 'morocco' | 'france';
  agentColor: AgentColor;
  onValidationChange?: (isValid: boolean) => void;
  onSubmit?: (documents: Record<string, File | undefined>) => void;
}

export interface StepCountryProps {
  agentColor: AgentColor;
  onSelect: (country: 'morocco' | 'france') => void;
}

export interface StepCompanyInfoProps {
  agentColor: AgentColor;
  country: 'morocco' | 'france';
  wizardData: AqalWizardData;
  onCompleted?: (data: Record<string, string>) => void;
  onValidationChange?: (isValid: boolean) => void;
  handleCompanyInfoSubmit: (data: Record<string, string>) => void;
}

export interface StepNotificationConfigProps {
  onNext: (config: any) => void;
  onBack: () => void;
  agentColor: AgentColor;
}

export interface StepResumeLegalProps {
  wizardData: AqalWizardData;
  integrationConfigs: Record<string, any>;
  agentColor: AgentColor;
}

export interface StepWelcomeProps {
  agentColor: AgentColor;
}

export type { AqalWizardData };
