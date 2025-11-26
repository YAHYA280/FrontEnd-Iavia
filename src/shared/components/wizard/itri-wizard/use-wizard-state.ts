import { useState, useMemo, useEffect } from 'react';
import type { WizardData, FAQ, Schedule, Notification, NotificationChannels } from './types';
import {
  features,
  communicationIntegrations,
  ticketingIntegrations,
  ecommerceIntegrations,
} from '@/shared/_mock/wizard-data';

export const useWizardState = () => {
  const getDefaultSubFeatures = () => {
    const defaultSubFeatures: string[] = [];
    features.forEach((feature) => {
      if (feature.defaultSelected && feature.subFeatures) {
        feature.subFeatures.forEach((subFeature) => {
          if (subFeature.defaultSelected) {
            defaultSubFeatures.push(subFeature.id);
          }
        });
      }
    });
    return defaultSubFeatures;
  };

  const [wizardData, setWizardData] = useState<WizardData>({
    objectives: [],
    features: features.filter((f) => f.defaultSelected).map((f) => f.id),
    subFeatures: getDefaultSubFeatures(),
    faqs: [
      {
        id: '1',
        question: 'Quels sont vos délais de livraison ?',
        answer: 'Nos délais sont de 24-48h pour les grandes villes et 3-5 jours pour les autres villes.',
        category: 'Livraison',
      },
    ],
    notifications: [],
    languages: ['fr'],
    communicationChannels: [],
    ticketingSystems: [],
    ecommerceTools: [],
  });

  const [expandedFeatures, setExpandedFeatures] = useState<Set<string>>(new Set());

  const [showAddFaq, setShowAddFaq] = useState(false);
  const [newFaq, setNewFaq] = useState({ question: '', answer: '', category: '' });

  const [outOfHoursMessage, setOutOfHoursMessage] = useState(
    'Merci de nous avoir contactés. Nos agents sont actuellement hors ligne. Nous vous répondrons pendant nos heures d\'ouverture.'
  );
  const [timezone, setTimezone] = useState('UTC+1');
  const [startTime, setStartTime] = useState('09:00');
  const [endTime, setEndTime] = useState('18:00');
  const [workingDays, setWorkingDays] = useState({
    monday: true,
    tuesday: true,
    wednesday: true,
    thursday: true,
    friday: true,
    saturday: false,
    sunday: false,
  });

  const [spamKeywords, setSpamKeywords] = useState<string[]>([]);

  // Notifications state
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: 'new-ticket',
      icon: '🎫',
      title: 'Nouveau ticket créé',
      description: 'Alerte immédiate quand un ticket est créé',
      enabled: true,
    },
    {
      id: 'pending-ticket',
      icon: '⏰',
      title: 'Ticket en attente',
      description: 'Ticket sans réponse',
      enabled: true,
      delay: '1 heure',
    },
    {
      id: 'reopened-ticket',
      icon: '🔄',
      title: 'Ticket réouvert',
      description: 'Client répond après fermeture',
      enabled: true,
    },
    {
      id: 'integration-disconnected',
      icon: '⚠️',
      title: 'Intégration déconnectée',
      description: 'Alerte problème intégration',
      enabled: true,
    },
  ]);

  // Global notification channels
  const [notificationChannels, setNotificationChannels] = useState<NotificationChannels>({
    activeChannel: 'email',
    email: 'support@example.com',
    whatsapp: '',
    telegram: '',
  });

  // Integration configuration state
  const [activeIntegrationTab, setActiveIntegrationTab] = useState<string>('');
  const [integrationConfigs, setIntegrationConfigs] = useState<Record<string, any>>({});

  // Get all selected integrations
  const selectedIntegrations = useMemo(() => {
    return [
      ...wizardData.communicationChannels.map(id => {
        const integration = communicationIntegrations.find(i => i.id === id);
        return integration ? { ...integration, category: 'communication' as const } : null;
      }),
      ...wizardData.ticketingSystems.map(id => {
        const integration = ticketingIntegrations.find(i => i.id === id);
        return integration ? { ...integration, category: 'ticketing' as const } : null;
      }),
      ...wizardData.ecommerceTools.map(id => {
        const integration = ecommerceIntegrations.find(i => i.id === id);
        return integration ? { ...integration, category: 'ecommerce' as const } : null;
      })
    ].filter((item): item is NonNullable<typeof item> => item !== null);
  }, [wizardData.communicationChannels, wizardData.ticketingSystems, wizardData.ecommerceTools]);

  // Set the first integration as active when integrations change
  useEffect(() => {
    if (selectedIntegrations.length > 0 && !activeIntegrationTab) {
      setActiveIntegrationTab(selectedIntegrations[0].id);
    }
  }, [selectedIntegrations, activeIntegrationTab]);

  // Handler functions
  const handleObjectiveToggle = (objectiveId: string) => {
    setWizardData((prev) => {
      const isSelected = prev.objectives.includes(objectiveId);
      if (isSelected) {
        return {
          ...prev,
          objectives: prev.objectives.filter((id) => id !== objectiveId),
        };
      } else if (prev.objectives.length < 3) {
        return {
          ...prev,
          objectives: [...prev.objectives, objectiveId],
        };
      }
      return prev;
    });
  };

  const handleFeatureToggle = (featureId: string) => {
    setWizardData((prev) => {
      const isSelected = prev.features.includes(featureId);
      const feature = features.find((f) => f.id === featureId);

      if (isSelected) {
        const subFeatureIds = feature?.subFeatures?.map((sf) => sf.id) || [];
        return {
          ...prev,
          features: prev.features.filter((id) => id !== featureId),
          subFeatures: prev.subFeatures.filter((id) => !subFeatureIds.includes(id)),
        };
      } else {
        const defaultSubFeatureIds =
          feature?.subFeatures?.filter((sf) => sf.defaultSelected).map((sf) => sf.id) || [];
        return {
          ...prev,
          features: [...prev.features, featureId],
          subFeatures: [...prev.subFeatures, ...defaultSubFeatureIds],
        };
      }
    });
  };

  const handleSubFeatureToggle = (parentFeatureId: string, subFeatureId: string) => {
    setWizardData((prev) => {
      const isSelected = prev.subFeatures.includes(subFeatureId);
      if (isSelected) {
        return {
          ...prev,
          subFeatures: prev.subFeatures.filter((id) => id !== subFeatureId),
        };
      } else {
        const parentSelected = prev.features.includes(parentFeatureId);
        return {
          ...prev,
          features: parentSelected ? prev.features : [...prev.features, parentFeatureId],
          subFeatures: [...prev.subFeatures, subFeatureId],
        };
      }
    });
  };

  const handleFeatureExpand = (featureId: string) => {
    setExpandedFeatures((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(featureId)) {
        newSet.delete(featureId);
      } else {
        newSet.add(featureId);
      }
      return newSet;
    });
  };

  const getFeatureCheckboxState = (featureId: string): 'checked' | 'unchecked' | 'indeterminate' => {
    const feature = features.find((f) => f.id === featureId);
    if (!feature?.subFeatures || feature.subFeatures.length === 0) {
      return wizardData.features.includes(featureId) ? 'checked' : 'unchecked';
    }

    const subFeatureIds = feature.subFeatures.map((sf) => sf.id);
    const selectedSubFeatures = subFeatureIds.filter((id) => wizardData.subFeatures.includes(id));

    if (selectedSubFeatures.length === 0) {
      return 'unchecked';
    } else if (selectedSubFeatures.length === subFeatureIds.length) {
      return 'checked';
    } else {
      return 'indeterminate';
    }
  };

  const handleLanguageToggle = (languageId: string) => {
    setWizardData((prev) => {
      const isSelected = prev.languages.includes(languageId);
      if (isSelected) {
        return {
          ...prev,
          languages: prev.languages.filter((id) => id !== languageId),
        };
      } else {
        return {
          ...prev,
          languages: [...prev.languages, languageId],
        };
      }
    });
  };

  const handleAddFaq = () => {
    if (newFaq.question.trim() && newFaq.answer.trim()) {
      const faq: FAQ = {
        id: Date.now().toString(),
        question: newFaq.question,
        answer: newFaq.answer,
        category: newFaq.category || undefined,
      };
      setWizardData((prev) => ({
        ...prev,
        faqs: [...prev.faqs, faq],
      }));
      setNewFaq({ question: '', answer: '', category: '' });
      setShowAddFaq(false);
    }
  };

  const handleDeleteFaq = (faqId: string) => {
    setWizardData((prev) => ({
      ...prev,
      faqs: prev.faqs.filter((f) => f.id !== faqId),
    }));
  };

  const handleIntegrationToggle = (
    category: 'communication' | 'ticketing' | 'ecommerce',
    id: string
  ) => {
    setWizardData((prev) => {
      const key =
        category === 'communication'
          ? 'communicationChannels'
          : category === 'ticketing'
            ? 'ticketingSystems'
            : 'ecommerceTools';

      const isSelected = prev[key].includes(id);
      if (isSelected) {
        return {
          ...prev,
          [key]: prev[key].filter((itemId) => itemId !== id),
        };
      } else {
        return {
          ...prev,
          [key]: [...prev[key], id],
        };
      }
    });
  };

  return {
    // State
    wizardData,
    setWizardData,
    showAddFaq,
    setShowAddFaq,
    newFaq,
    setNewFaq,
    outOfHoursMessage,
    setOutOfHoursMessage,
    timezone,
    setTimezone,
    startTime,
    setStartTime,
    endTime,
    setEndTime,
    workingDays,
    setWorkingDays,
    spamKeywords,
    setSpamKeywords,
    notifications,
    setNotifications,
    notificationChannels,
    setNotificationChannels,
    activeIntegrationTab,
    setActiveIntegrationTab,
    integrationConfigs,
    setIntegrationConfigs,
    selectedIntegrations,
    expandedFeatures,
    setExpandedFeatures,
    // Handlers
    handleObjectiveToggle,
    handleFeatureToggle,
    handleSubFeatureToggle,
    handleFeatureExpand,
    getFeatureCheckboxState,
    handleLanguageToggle,
    handleAddFaq,
    handleDeleteFaq,
    handleIntegrationToggle,
  };
};
