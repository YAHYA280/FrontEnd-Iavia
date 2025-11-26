import { useState, useMemo, useEffect } from 'react';

export interface CompanyInfo {
  country: 'morocco' | 'france' | null;
  data: Record<string, string>;
}

export interface Document {
  name: string;
  file?: File;
  required: boolean;
}

export interface NotificationConfig {
  channel: 'slack' | 'mail' | 'teams' | null;
  channelInfo: string;
  language: string;
  reminderCount: number;
  excludeWeekends: boolean;
  notifications: Record<string, string>;
}

export interface IntegrationConfig {
  slack: boolean;
  gmail: boolean;
  selectedAccounts: Record<string, string>;
  completed: boolean;
}

export interface AqalWizardData {
  // Step 1: Country Selection
  country: 'morocco' | 'france' | null;

  // Step 2: Company Information
  companyInfo: CompanyInfo | null;

  // Step 3: Document Upload
  documents: Record<string, Document>;

  // Step 4: Notification Configuration
  notificationConfig: NotificationConfig | null;

  // Step 5: Integrations
  integrations: IntegrationConfig | null;

  // Step 6: Integration Configuration
  integrationConfig: {
    selectedAccounts: {
      slack: string;
      gmail: string;
    };
    completed: boolean;
  };

  businessModel?: string;
  teamSize?: string;
  requestVolume?: string;
  objectives: string[];
  features: string[];
  tone?: string;
  faqs: FAQ[];
  notifications: NotificationConfigLegacy[];
  languages: string[];
  communicationChannels: string[];
  ticketingSystems: string[];
  ecommerceTools: string[];
}

export interface FAQ {
  id: string;
  question: string;
  answer: string;
  category?: string;
}

export interface NotificationConfigLegacy {
  id: string;
  icon: string;
  title: string;
  description: string;
  enabled: boolean;
  channels: NotificationChannel[];
  activeChannel: string;
  delay?: string;
}

export interface NotificationChannel {
  id: string;
  name: string;
  icon: string;
  placeholder: string;
  value: string;
}

const moroccoDocuments = [
  { name: 'Extrait de Registre de Commerce', required: true },
  { name: 'Statuts', required: false },
  { name: "Identifiant Commun de l'Entreprise", required: false },
  { name: 'Bilan comptable', required: false },
  { name: 'Attestation fiscale', required: false },
  { name: 'Convention collective', required: false },
];

const franceDocuments = [
  { name: 'Extrait Kbis', required: true },
  { name: 'Statuts', required: false },
  { name: "SIREN (ou SIRET pour l'établissement)", required: false },
  { name: 'Bilan comptable', required: false },
  { name: 'Attestation fiscale', required: false },
  { name: 'Convention collective nationale (CCN)', required: false },
];

export const useWizardState = () => {
  const [wizardData, setWizardData] = useState<AqalWizardData>({
    country: null,
    companyInfo: null,
    documents: {},
    notificationConfig: null,
    integrations: null,
    integrationConfig: {
      selectedAccounts: {
        slack: '',
        gmail: '',
      },
      completed: false,
    },
    objectives: [],
    features: [],
    faqs: [],
    notifications: [],
    languages: [],
    communicationChannels: [],
    ticketingSystems: [],
    ecommerceTools: [],
  });

  const [currentStep, setCurrentStep] = useState(0);

  const defaultNotificationConfig: NotificationConfig = {
    channel: null,
    channelInfo: '',
    language: 'fr',
    reminderCount: 3,
    excludeWeekends: false,
    notifications: {},
  };

  const defaultIntegrationConfig: IntegrationConfig = {
    slack: false,
    gmail: false,
    selectedAccounts: {
      slack: '',
      gmail: '',
    },
    completed: false,
  };

  const handleCountrySelect = (country: 'morocco' | 'france') => {
    setWizardData((prev) => ({
      ...prev,
      country,
      documents: (country === 'morocco' ? moroccoDocuments : franceDocuments).reduce(
        (acc, doc) => ({
          ...acc,
          [doc.name]: { ...doc, file: undefined },
        }),
        {}
      ),
    }));
  };

  const handleCompanyInfoSubmit = (data: Record<string, string>) => {
    if (!wizardData.country) {
      console.warn('Cannot save company info: no country selected');
      return;
    }

    setWizardData((prev) => {
      const newData = {
        ...prev,
        companyInfo: {
          country: prev.country!,
          data,
        },
      };
      return newData;
    });
  };

  const handleDocumentsSubmit = (documents: Record<string, File | undefined>) => {
    setWizardData((prev) => {
      const updatedDocuments = { ...prev.documents };

      Object.entries(documents).forEach(([name, file]) => {
        if (updatedDocuments[name]) {
          updatedDocuments[name] = {
            ...updatedDocuments[name],
            file,
          };
        }
      });

      return {
        ...prev,
        documents: updatedDocuments,
      };
    });
  };

  const handleNotificationConfigSubmit = (config: Partial<NotificationConfig>) => {
    setWizardData((prev) => ({
      ...prev,
      notificationConfig: {
        ...defaultNotificationConfig,
        ...prev.notificationConfig,
        ...config,
      },
    }));
  };

  const handleIntegrationsSubmit = (integrations: { slack: boolean; gmail: boolean }) => {
    setWizardData((prev) => ({
      ...prev,
      integrations: {
        ...defaultIntegrationConfig,
        ...prev.integrations,
        ...integrations,
      },
    }));
  };

  const handleIntegrationConfigSubmit = (config: {
    selectedAccounts: Record<string, string>;
    completed: boolean;
  }) => {
    setWizardData((prev) => ({
      ...prev,
      integrationConfig: {
        selectedAccounts: {
          slack: config.selectedAccounts.slack || '',
          gmail: config.selectedAccounts.gmail || '',
        },
        completed: config.completed,
      },
    }));
  };

  const handleNext = () => {
    setCurrentStep((prev) => prev + 1);
  };

  const handleBack = () => {
    setCurrentStep((prev) => Math.max(0, prev - 1));
  };

  const handleStepChange = (step: number) => {
    setCurrentStep(step);
  };

  const isStepValid = (step: number): boolean => {
    switch (step) {
      case 0:
        return true;

      case 1:
        return wizardData.country !== null;

      case 2:
        return (
          wizardData.companyInfo !== null && Object.keys(wizardData.companyInfo.data).length > 0
        );

      case 3:
        const requiredDocuments = Object.values(wizardData.documents).filter((doc) => doc.required);
        const uploadedRequired = requiredDocuments.filter((doc) => doc.file !== undefined);
        return uploadedRequired.length === requiredDocuments.length;

      case 4:
        return true;

      case 5:
        return true;

      case 6:
        const hasIntegrations =
          wizardData.integrations &&
          (wizardData.integrations.slack || wizardData.integrations.gmail);

        if (!hasIntegrations) {
          return true;
        }

        return wizardData.integrations?.completed === true;

      case 7:
        return true;

      default:
        return false;
    }
  };

  const completionPercentage = useMemo(() => {
    const totalSteps = 8;
    const completedSteps = Array.from({ length: totalSteps }, (_, step) =>
      isStepValid(step)
    ).filter((valid) => valid).length;

    return Math.round((completedSteps / totalSteps) * 100);
  }, [wizardData]);

  const resetWizard = () => {
    setWizardData({
      country: null,
      companyInfo: null,
      documents: {},
      notificationConfig: null,
      integrations: null,
      integrationConfig: {
        selectedAccounts: {
          slack: '',
          gmail: '',
        },
        completed: false,
      },
      objectives: [],
      features: [],
      faqs: [],
      notifications: [],
      languages: [],
      communicationChannels: [],
      ticketingSystems: [],
      ecommerceTools: [],
    });
    setCurrentStep(0);
  };

  const handleFinish = () => {
    resetWizard();
  };

  return {
    wizardData,
    currentStep,
    setWizardData,
    handleCountrySelect,
    handleCompanyInfoSubmit,
    handleDocumentsSubmit,
    handleNotificationConfigSubmit,
    handleIntegrationsSubmit,
    handleIntegrationConfigSubmit,
    handleNext,
    handleBack,
    handleStepChange,
    handleFinish,
    resetWizard,
    isStepValid,
    completionPercentage,
    selectedCountry: wizardData.country,
    companyInfo: wizardData.companyInfo,
    uploadedDocuments: wizardData.documents,
    notificationConfig: wizardData.notificationConfig,
    integrationConfig: wizardData.integrations,
  };
};
