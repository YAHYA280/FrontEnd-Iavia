// legal-wizard-data.ts
import type {
  WizardStep,
  WizardOption,
  WizardObjective,
  WizardFeature,
} from '@/shared/types/wizard';

export const wizardSteps: WizardStep[] = [
  {
    id: 1,
    label: 'Bienvenue',
    title: '👋 Bienvenue dans la configuration d\'AQAL',
    subtitle: 'Votre assistant intelligent personnalisé en quelques étapes',
  },
  {
    id: 2,
    label: 'Pays',
    title: '🌍 Sélectionnez votre pays',
    subtitle: 'Cette information nous aide à adapter le contenu à votre région',
  },
  {
    id: 3,
    label: 'Documents',
    title: '📄 Importez vos documents',
    subtitle: 'Ajoutez les fichiers qui constitueront la base de connaissances de votre agent',
  },
  {
    id: 4,
    label: 'Informations',
    title: '🏢 Informations sur votre entreprise',
    subtitle: 'Renseignez les détails de votre organisation pour personnaliser l\'expérience',
  },
  {
    id: 5,
    label: 'Intégrations',
    title: '🔗 Configurez vos intégrations',
    subtitle: 'Connectez les outils et services que votre agent utilisera',
  },
  {
    id: 6,
    label: 'Configurations',
    title: '🔧 Configuration des intégrations',
    subtitle: 'Configurez les intégrations que vous avez sélectionnées',
  },
  {
    id: 7,
    label: 'Notifications',
    title: '🔔 Préférences de notifications',
    subtitle: 'Définissez comment et quand vous souhaitez être notifié',
  },
  {
    id: 8,
    label: 'Résumé',
    title: '📋 Résumé de votre configuration',
    subtitle: 'Vérifiez tous les paramètres avant de finaliser la création de votre agent',
  },
];



// Options de pays
export const countryOptions: WizardOption[] = [
  { 
    id: 'morocco', 
    icon: '🇲🇦', 
    title: 'Maroc', 
    description: 'Configuration pour les entreprises marocaines' 
  },
  { 
    id: 'france', 
    icon: '🇫🇷', 
    title: 'France', 
    description: 'Configuration pour les entreprises françaises' 
  },
];

// Objectifs pour l'agent juridique
export const legalObjectives: WizardObjective[] = [
  {
    id: 'tax-deadlines',
    icon: '⏰',
    title: 'Respect des délais fiscaux',
    description: 'Ne jamais manquer une échéance de déclaration ou de paiement',
  },
  {
    id: 'compliance',
    icon: '✅',
    title: 'Conformité réglementaire',
    description: 'Rester conforme avec les dernières réglementations fiscales',
  },
  {
    id: 'penalty-avoidance',
    icon: '🚫',
    title: 'Éviter les pénalités',
    description: 'Prévenir les sanctions et amendes pour non-conformité',
  },
  {
    id: 'document-management',
    icon: '📋',
    title: 'Gestion documentaire',
    description: 'Centraliser et organiser tous vos documents juridiques',
  },
  {
    id: 'alert-system',
    icon: '🔔',
    title: 'Système d\'alertes intelligent',
    description: 'Recevoir des notifications proactives pour vos obligations',
  },
  {
    id: 'reporting',
    icon: '📊',
    title: 'Reporting automatique',
    description: 'Générer automatiquement les rapports et états requis',
  },
];

// Fonctionnalités spécifiques à l'agent juridique
export const legalFeatures: WizardFeature[] = [
  {
    id: 'tva-declaration',
    icon: '🧾',
    title: 'Déclaration de TVA',
    description: 'Suivi et rappels pour les déclarations de TVA mensuelles/trimestrielles',
    defaultSelected: true,
  },
  {
    id: 'is-declaration',
    icon: '💼',
    title: 'Impôt sur les Sociétés',
    description: 'Gestion des échéances et paiements de l\'IS',
    defaultSelected: true,
  },
  {
    id: 'ir-declaration',
    icon: '👤',
    title: 'Impôt sur le Revenu',
    description: 'Suivi des déclarations et paiements de l\'IR',
    defaultSelected: true,
  },
  {
    id: 'cnss-management',
    icon: '🏛️',
    title: 'Gestion CNSS',
    description: 'Déclarations sociales et suivis des cotisations',
    defaultSelected: true,
  },
  {
    id: 'taxe-pro',
    icon: '⚖️',
    title: 'Taxe Professionnelle',
    description: 'Suivi de la taxe professionnelle et autres impôts locaux',
    defaultSelected: true,
  },
  {
    id: 'legal-calendar',
    icon: '📅',
    title: 'Calendrier juridique',
    description: 'Calendrier intégré avec toutes les échéances légales',
    defaultSelected: true,
  },
  {
    id: 'document-reminder',
    icon: '⏰',
    title: 'Rappels documentaires',
    description: 'Notifications pour les documents à fournir aux autorités',
    defaultSelected: true,
  },
  {
    id: 'compliance-check',
    icon: '🔍',
    title: 'Vérification de conformité',
    description: 'Analyse automatique de votre conformité réglementaire',
    defaultSelected: true,
  },
];

// Options de ton pour l'agent juridique
export const legalToneOptions: WizardOption[] = [
  { 
    id: 'professional', 
    icon: '👔', 
    title: 'Professionnel', 
    description: 'Formel et technique' 
  },
  { 
    id: 'pedagogical', 
    icon: '🎓', 
    title: 'Pédagogue', 
    description: 'Explicatif et détaillé' 
  },
  { 
    id: 'precise', 
    icon: '🎯', 
    title: 'Précis', 
    description: 'Concis et technique' 
  },
  { 
    id: 'reassuring', 
    icon: '🛡️', 
    title: 'Rassurant', 
    description: 'Apaisant et confident' 
  },
];

// Langues pour l'agent juridique
export const legalLanguages: WizardOption[] = [
  { id: 'fr', icon: '🇫🇷', title: 'Français' },
  { id: 'ar', icon: '🇲🇦', title: 'العربية' },
  { id: 'en', icon: '🇬🇧', title: 'English' },
];

// Intégrations spécifiques pour l'agent juridique
export const legalCommunicationIntegrations = [
  {
    id: 'slack',
    icon: '💬',
    title: 'Slack',
    description: 'Recevez les notifications directement dans vos canaux Slack',
  },
  {
    id: 'teams',
    icon: '🏢',
    title: 'Microsoft Teams',
    description: 'Intégration avec Microsoft Teams pour les alertes importantes',
  },
];

// Types de notifications fiscales
export const taxNotificationTypes = [
  { 
    id: 'tva', 
    label: 'Déclaration de TVA à déposer', 
    deadline: 'Avant le 20 du mois suivant',
    frequencies: [
      { value: 'mensuelle', label: 'Mensuelle' },
      { value: 'trimestrielle', label: 'Trimestrielle' }
    ]
  },
  { 
    id: 'is', 
    label: 'Paiement d\'impôt à effectuer - IS', 
    deadline: 'Avant le 31 mars, 30 juin, 30 sept, 31 déc',
    frequencies: [
      { value: 'trimestrielle', label: 'Trimestrielle' }
    ]
  },
  { 
    id: 'ir', 
    label: 'Paiement d\'impôt à effectuer - IR', 
    deadline: 'Avant le 1er mars N+1',
    frequencies: [
      { value: 'annuelle', label: 'Annuelle' }
    ]
  },
  { 
    id: 'taxePro', 
    label: 'Paiement d\'impôt à effectuer - Taxe pro', 
    deadline: 'Avant le 31 janvier',
    frequencies: [
      { value: 'annuelle', label: 'Annuelle' }
    ]
  },
  { 
    id: 'cnss', 
    label: 'Déclaration des salariés dans la CNSS', 
    deadline: 'Avant le 10 du mois suivant',
    frequencies: [
      { value: 'mensuelle', label: 'Mensuelle' }
    ]
  },
];

// Canaux de notification
export const notificationChannels = [
  { 
    id: 'slack', 
    name: 'Slack', 
    icon: '💬', 
    placeholder: 'Nom du canal Slack' 
  },
  { 
    id: 'mail', 
    name: 'Email', 
    icon: '📧', 
    placeholder: 'email@exemple.com' 
  },
  { 
    id: 'teams', 
    name: 'Microsoft Teams', 
    icon: '🏢', 
    placeholder: 'email@exemple.com' 
  },
];

// Documents par pays
export const moroccoDocuments = [
  { name: 'Extrait de Registre de Commerce', required: true },
  { name: 'Statuts', required: false },
  { name: 'Identifiant Commun de l\'Entreprise', required: false },
  { name: 'Bilan comptable', required: false },
  { name: 'Attestation fiscale', required: false },
  { name: 'Convention collective', required: false },
];

export const franceDocuments = [
  { name: 'Extrait Kbis', required: true },
  { name: 'Statuts', required: false },
  { name: 'SIREN (ou SIRET pour l\'établissement)', required: false },
  { name: 'Bilan comptable', required: false },
  { name: 'Attestation fiscale', required: false },
  { name: 'Convention collective nationale (CCN)', required: false },
];

// Champs d'information par pays
export const moroccoCompanyFields = [
  { id: 'rc', label: 'Numéro du Registre de Commerce (RC)', defaultValue: '123456' },
  { id: 'raisonSociale', label: 'Raison sociale / Nom commercial', defaultValue: 'Entreprise XYZ' },
  { id: 'formeJuridique', label: 'Forme juridique', defaultValue: 'SARL' },
  { id: 'activite', label: 'Activité principale', defaultValue: 'Commerce' },
  { id: 'adresse', label: 'Adresse du siège social', defaultValue: 'Casablanca, Maroc' },
  { id: 'capital', label: 'Capital social', defaultValue: '100 000 MAD' },
  { id: 'gerants', label: 'Nom et prénom du ou des gérants / dirigeants', defaultValue: 'Ahmed Benali' },
  { id: 'dateImmatriculation', label: 'Date d\'immatriculation au RC', defaultValue: '01/01/2020' },
  { id: 'patente', label: 'Numéro de patente', defaultValue: 'P123456' },
  { id: 'if', label: 'Numéro IF (Identifiant Fiscal)', defaultValue: '12345678' },
  { id: 'ice', label: 'Identifiant Commun de l\'Entreprise (ICE)', defaultValue: '001234567890123' },
  { id: 'dateCreation', label: 'Date de création', defaultValue: '01/01/2020' },
];

export const franceCompanyFields = [
  { id: 'denomination', label: 'Dénomination sociale / Nom commercial', defaultValue: 'Société ABC' },
  { id: 'siren', label: 'Numéro SIREN', defaultValue: '123 456 789' },
  { id: 'naf', label: 'Code NAF / APE', defaultValue: '6201Z' },
  { id: 'formeJuridique', label: 'Forme juridique', defaultValue: 'SAS' },
  { id: 'capital', label: 'Capital social', defaultValue: '50 000 EUR' },
  { id: 'adresse', label: 'Adresse du siège social', defaultValue: 'Paris, France' },
  { id: 'duree', label: 'Durée de la société', defaultValue: '99 ans' },
  { id: 'dateImmatriculation', label: 'Date d\'immatriculation au RCS', defaultValue: '01/01/2020' },
  { id: 'greffe', label: 'Greffe d\'immatriculation', defaultValue: 'Paris' },
  { id: 'activite', label: 'Activité déclarée', defaultValue: 'Services informatiques' },
  { id: 'dirigeants', label: 'Dirigeants', defaultValue: 'Jean Dupont' },
  { id: 'mentionRcs', label: 'Mention RCS', defaultValue: 'Paris B 123 456 789' },
];


export const legalIntegrations = [
      {
        id: 'slack',
        title: 'Slack',
        icon: '💬',
        description: 'Recevez les notifications directement dans vos canaux Slack',
        category: 'communication' as const
      },
      {
        id: 'teams',
        title: 'Microsoft Teams',
        icon: '🏢',
        description: 'Intégration avec Microsoft Teams pour les alertes importantes',
        category: 'communication' as const
      }
    ];