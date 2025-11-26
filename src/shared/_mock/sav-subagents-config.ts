export interface FAQ {
  id: string;
  question: string;
  answer: string;
  category: string;
}

export interface InstructionOption {
  id: string;
  label: string;
  active: boolean;
}

export interface SubInstruction {
  id: string;
  label: string;
  active: boolean;
}

export interface StandardInstruction {
  id: string;
  label: string;
  active: boolean;
  subInstructions: SubInstruction[];
}

export interface SavSubagentConfig {
  id: string;
  name: string;
  platforms: string[]; // IDs des plateformes activées
  languages: string[]; // IDs des langues activées
  tone: string; // Ton sélectionné
  style: string; // Style sélectionné
  blockedKeywords: string[];
  faqs?: FAQ[];
  instructions?: InstructionOption[];
  standardInstructions?: StandardInstruction[];
  prompts?: {
    id: string;
    title: string;
    subtitle: string;
    content: string;
  }[];
  tickets: {
    id: string;
    title: string;
    status: 'en-attente' | 'en-cours' | 'resolu';
    priority: 'basse' | 'moyenne' | 'haute' | 'critique';
    channel: 'whatsapp' | 'instagram' | 'linkedin' | 'telegram' | 'discord' | 'email' | 'telephone' | 'messenger';
    client: string;
    assignedTo?: string;
    date: string;
    description: string;
    timeAgo?: string;
  }[];
  workingHours: {
    outOfHoursMessage: string;
    timezone: string;
    startTime: string;
    endTime: string;
    workingDays: {
      monday: boolean;
      tuesday: boolean;
      wednesday: boolean;
      thursday: boolean;
      friday: boolean;
      saturday: boolean;
      sunday: boolean;
    };
  };
  knowledgeBase?: {
    documents: {
      id: string;
      title: string;
      type: 'pdf' | 'doc' | 'docx' | 'txt' | 'xlsx' | 'pptx' | 'other';
      size: string; // Format: "2.5 MB", "150 KB", etc.
      uploadDate: string;
      category: string;
      description?: string;
    }[];
  };
}

// Données communes
export const commonData = {
  platforms: {
    'whatsapp': { name: 'WhatsApp Business', logoSrc: '/icons/whatsapp.svg' },
    'instagram': { name: 'Instagram', logoSrc: '/icons/instagram.svg' },
    'linkedin': { name: 'LinkedIn', logoSrc: '/icons/linkedin.svg' },
    'telegram': { name: 'Telegram', logoSrc: '/icons/telegram.svg' },
    'discord': { name: 'Discord', logoSrc: '/icons/discord.svg' },
    'tiktok': { name: 'TikTok', logoSrc: '/icons/tiktok.svg' },
    'youtube': { name: 'YouTube', logoSrc: '/icons/youtube.svg' },
    'snapchat': { name: 'Snapchat', logoSrc: '/icons/snapchat.svg' },
    'messenger': { name: 'Facebook - Messenger', logoSrc: '/icons/messenger.svg' },
    'telephone': { name: 'Téléphone', logoSrc: '/icons/phone.svg' },
    'gmail': { name: 'Gmail', logoSrc: '/icons/gmail.svg' },
    'slack': { name: 'Slack', logoSrc: '/icons/slack.svg' },
  },
  languages: {
    'fr': { name: 'Français' },
    'en': { name: 'English' },
    'es': { name: 'Español' },
    'de': { name: 'Deutsch' },
    'it': { name: 'Italiano' },
  },
  toneOptions: ['professionnel', 'formel', 'amical', 'décontracté', 'empathique', 'technique', 'précis', 'méthodique', 'préventif', 'organisé', 'détaillé', 'réactif', 'efficace'],
  styleOptions: ['concise', 'détaillée', 'explicative', 'technique', 'simple', 'solution-oriented'],
  commonPrompts: [
    {
      id: 'support-technique',
      title: 'Support Technique',
      subtitle: 'Dépannage et assistance',
    },
    {
      id: 'service-apres-vente',
      title: 'Service Après-Vente',
      subtitle: 'Support et satisfaction',
    },
    {
      id: 'gestion-reclamations',
      title: 'Gestion des Réclamations',
      subtitle: 'Résolution diplomatique',
    },
    {
      id: 'personnalisation',
      title: 'Personnalisation',
      subtitle: 'Adaptation sur mesure',
    },
  ],
  // Options communes pour les filtres
  priorityOptions: [
    { value: 'basse', label: 'Basse' },
    { value: 'moyenne', label: 'Moyenne' },
    { value: 'haute', label: 'Haute' },
    { value: 'critique', label: 'Critique' },
  ],
  channelOptions: [
    { value: 'whatsapp', label: 'WhatsApp', logoSrc: '/icons/whatsapp.svg' },
    { value: 'instagram', label: 'Instagram', logoSrc: '/icons/instagram.svg' },
    { value: 'linkedin', label: 'LinkedIn', logoSrc: '/icons/linkedin.svg' },
    { value: 'telegram', label: 'Telegram', logoSrc: '/icons/telegram.svg' },
    { value: 'discord', label: 'Discord', logoSrc: '/icons/discord.svg' },
    { value: 'email', label: 'Email', logoSrc: '/icons/email.svg' },
    { value: 'telephone', label: 'Téléphone', logoSrc: '/icons/phone.svg' },
  ],
};

export const savSubagentsConfig: Record<string, SavSubagentConfig> = {
  // Agent principal
  'sav-general': {
    id: 'sav-general',
    name: 'SAV Général',
    platforms: ['whatsapp', 'instagram', 'discord'], // Plateformes activées
    languages: ['fr', 'en'], // Langues activées
    tone: 'professionnel', // Ton sélectionné
    style: 'concise', // Style sélectionné
    blockedKeywords: ['concurrence', 'concurrent', 'rival'],
    standardInstructions: [
      {
        id: 'suivi-commande',
        label: 'Suivi de la commande',
        active: true,
        subInstructions: [
          { id: 'suivi-commande-1', label: 'Recherche de commandes par numéro', active: true },
          { id: 'suivi-commande-2', label: 'Affichage du statut actuel de la commande', active: true },
          { id: 'suivi-commande-3', label: 'Indication de la date de livraison estimée de la commande', active: true },
          { id: 'suivi-commande-4', label: 'Détail complet de chaque commande (produits, quantités, prix, adresse)', active: true },
        ],
      },
      {
        id: 'reclamation',
        label: 'Réclamation',
        active: false,
        subInstructions: [
          { id: 'reclamation-1', label: 'Collecte des détails du problème (nature, commande, description, urgence, actions déjà entreprises)', active: false },
          { id: 'reclamation-2', label: 'Structuration automatique du problème (réclamation) selon un format standardisé', active: false },
          { id: 'reclamation-3', label: 'Création d\'un ticket de réclamation avec résumé complet', active: false },
        ],
      },
      {
        id: 'produits-catalogues',
        label: 'Produits et catalogues',
        active: true,
        subInstructions: [
          { id: 'produits-catalogues-1', label: 'Recherche de produits par nom, mot-clé ou catégorie', active: true },
          { id: 'produits-catalogues-2', label: 'Affichage complet des fiches produits (description, caractéristiques, prix, images)', active: true },
          { id: 'produits-catalogues-3', label: 'Vérification du stock et de la disponibilité par variante (taille, couleur, modèle)', active: true },
          { id: 'produits-catalogues-4', label: 'Comparaison rapide entre plusieurs produits similaires', active: true },
        ],
      },
      {
        id: 'faq-base-connaissance',
        label: 'Réponses aux questions récurrentes enregistrées dans la base de connaissance',
        active: true,
        subInstructions: [],
      },
      {
        id: 'retours-remboursements',
        label: 'Retours et Remboursements',
        active: true,
        subInstructions: [
          { id: 'retours-remboursements-1', label: 'Demande obligatoire du numéro de commande avant toute action', active: true },
          { id: 'retours-remboursements-2', label: 'Vérification de l\'éligibilité au retour selon la date et les conditions de vente', active: true },
          { id: 'retours-remboursements-3', label: 'Collecte des détails du retour : motif, état du produit, photo justificative', active: true },
          { id: 'retours-remboursements-4', label: 'Génération automatique d\'une étiquette de retour', active: true },
        ],
      },
      {
        id: 'transfert-agent-humain',
        label: 'Transfert à un agent humain si l\'IA ne peut pas répondre',
        active: true,
        subInstructions: [],
      },
    ],
    faqs: [
      {
        id: 'faq-1',
        question: 'Comment puis-je retourner un produit ?',
        answer: 'Vous pouvez retourner un produit dans les 30 jours suivant votre achat. Rendez-vous dans votre compte, section "Mes commandes", et suivez les instructions de retour.',
        category: 'Produit',
      },
      {
        id: 'faq-2',
        question: 'Quels sont les délais de livraison ?',
        answer: 'Les délais de livraison varient entre 2 à 5 jours ouvrés selon votre localisation. Les commandes passées avant 14h sont expédiées le jour même.',
        category: 'Produit',
      },
      {
        id: 'faq-3',
        question: 'Comment contacter le service client ?',
        answer: 'Vous pouvez nous contacter par email à support@exemple.com, par téléphone au 01 23 45 67 89, ou via notre chat en ligne disponible 24/7.',
        category: 'Support',
      },
      {
        id: 'faq-4',
        question: 'Puis-je modifier ma commande après validation ?',
        answer: 'Oui, vous pouvez modifier votre commande dans les 2 heures suivant la validation. Au-delà de ce délai, veuillez nous contacter directement.',
        category: 'Commande',
      },
      {
        id: 'faq-5',
        question: 'Quelle est votre politique de remboursement ?',
        answer: 'Nous remboursons intégralement les produits non ouverts et retournés dans leur emballage d\'origine dans les 30 jours. Le remboursement est effectué sous 5 à 10 jours ouvrés.',
        category: 'Remboursement',
      },
    ],
    instructions: [
      { id: 'suggestion-1', label: 'Suivi des commandes en temps réel', active: true },
      { id: 'suggestion-2', label: 'Gestion des retours et remboursements', active: true },
      { id: 'restriction-1', label: 'Ne pas divulguer d\'informations confidentielles', active: false },
      { id: 'suggestion-3', label: 'Support technique et assistance client', active: true },
      { id: 'suggestion-4', label: 'Résolution rapide des problèmes clients', active: true },
      { id: 'restriction-2', label: 'Éviter les promesses non garanties', active: false },
    ],
    prompts: [
      { id: 'support-technique', title: 'Support Technique', subtitle: 'Dépannage et assistance', content: 'Vous êtes un agent de service client professionnel spécialisé dans le support technique général. Répondez de manière claire et empathique aux demandes des clients.' },
      { id: 'service-apres-vente', title: 'Service Après-Vente', subtitle: 'Support et satisfaction', content: 'Vous êtes un agent du service après-vente dédié à la satisfaction client. Soyez à l\'écoute et orienté solutions pour résoudre les problèmes post-achat.' },
      { id: 'gestion-reclamations', title: 'Gestion des Réclamations', subtitle: 'Résolution diplomatique', content: 'Vous êtes un spécialiste de la gestion des réclamations. Gérez les situations délicates avec diplomatie et trouvez des solutions satisfaisantes pour toutes les parties.' },
      { id: 'personnalisation', title: 'Personnalisation', subtitle: 'Adaptation sur mesure', content: 'Vous êtes un agent personnalisé qui s\'adapte aux besoins spécifiques de chaque client. Adaptez votre approche selon le profil et les préférences du client.' },
    ],
    workingHours: {
      outOfHoursMessage: 'Notre équipe de support est actuellement hors ligne, nous vous répondrons pendant nos heures d\'ouverture.',
      timezone: 'UTC+1',
      startTime: '09:00',
      endTime: '18:00',
      workingDays: {
        monday: true,
        tuesday: true,
        wednesday: true,
        thursday: true,
        friday: true,
        saturday: false,
        sunday: false,
      },
    },
    tickets: [
      {
        id: 'T-12477398268',
        title: 'Problème de livraison de commande',
        status: 'en-attente',
        priority: 'haute',
        channel: 'whatsapp',
        client: 'Marie Dubois',
        assignedTo: 'Agent Support',
        date: '2024-01-15',
        description: 'Le client ne peut pas se connecter à son compte',
        timeAgo: 'Il y a 5 minutes'
      },
      {
        id: 'T-12477398269',
        title: 'Demande de remboursement',
        status: 'en-cours',
        priority: 'moyenne',
        channel: 'instagram',
        client: 'Jean Martin',
        assignedTo: 'Agent SAV',
        date: '2024-01-14',
        description: 'Demande de remboursement pour un produit défectueux',
        timeAgo: 'Il y a 2 heures'
      },
      {
        id: 'T-12477398277',
        title: 'Question sur la garantie',
        status: 'resolu',
        priority: 'basse',
        channel: 'discord',
        client: 'Sophie Leroy',
        assignedTo: 'Agent Technique',
        date: '2024-01-13',
        description: 'Information sur la durée de garantie du produit',
        timeAgo: 'Il y a 1 jour'
      },
      {
        id: 'T-12477398266',
        title: 'Demande de remboursement',
        status: 'en-cours',
        priority: 'moyenne',
        channel: 'instagram',
        client: 'Jean Martin',
        assignedTo: 'Agent SAV',
        date: '2024-01-14',
        description: 'Demande de remboursement pour un produit défectueux',
        timeAgo: 'Il y a 2 heures'
      },
      {
        id: 'T-12477398279',
        title: 'Question sur la garantie',
        status: 'resolu',
        priority: 'basse',
        channel: 'discord',
        client: 'Sophie Leroy',
        assignedTo: 'Agent Technique',
        date: '2024-01-13',
        description: 'Information sur la durée de garantie du produit',
        timeAgo: 'Il y a 1 jour'
      },
      {
        id: 'T-12477398261',
        title: 'Demande de remboursement',
        status: 'en-cours',
        priority: 'moyenne',
        channel: 'instagram',
        client: 'Jean Martin',
        assignedTo: 'Agent SAV',
        date: '2024-01-14',
        description: 'Demande de remboursement pour un produit défectueux',
        timeAgo: 'Il y a 2 heures'
      },
      {
        id: 'T-12477398270',
        title: 'Question sur la garantie',
        status: 'resolu',
        priority: 'basse',
        channel: 'discord',
        client: 'Sophie Leroy',
        assignedTo: 'Agent Technique',
        date: '2024-01-13',
        description: 'Information sur la durée de garantie du produit',
        timeAgo: 'Il y a 1 jour'
      }
    ]
  },
  // Sous-agent 1 - Expert Support Technique
  '1': {
    id: '1',
    name: 'Expert support technique',
    platforms: ['linkedin', 'messenger', 'telegram'], // Différentes plateformes
    languages: ['fr', 'en', 'de'], // Différentes langues
    tone: 'technique', // Ton technique
    style: 'technique', // Style technique
    blockedKeywords: ['bug', 'panne', 'dysfonctionnement', 'erreur système', 'crash'],
    standardInstructions: [
      {
        id: 'diagnostic-technique',
        label: 'Diagnostic technique approfondi',
        active: true,
        subInstructions: [
          { id: 'diagnostic-1', label: 'Collecte des informations système (OS, version, logs)', active: true },
          { id: 'diagnostic-2', label: 'Analyse des erreurs et codes d\'erreur système', active: true },
          { id: 'diagnostic-3', label: 'Vérification de la configuration réseau et des paramètres', active: true },
          { id: 'diagnostic-4', label: 'Test de connectivité et de performance système', active: false },
        ],
      },
      {
        id: 'resolution-problemes',
        label: 'Résolution de problèmes techniques',
        active: true,
        subInstructions: [
          { id: 'resolution-1', label: 'Identification de la cause racine du problème', active: true },
          { id: 'resolution-2', label: 'Proposition de solutions étape par étape', active: true },
          { id: 'resolution-3', label: 'Vérification de la résolution et tests de validation', active: false },
        ],
      },
      {
        id: 'support-avance',
        label: 'Support technique avancé',
        active: false,
        subInstructions: [
          { id: 'support-avance-1', label: 'Accès distant et prise de contrôle assistée', active: false },
          { id: 'support-avance-2', label: 'Configuration avancée et personnalisation système', active: false },
        ],
      },
      {
        id: 'documentation-technique',
        label: 'Documentation et guides techniques',
        active: true,
        subInstructions: [
          { id: 'doc-1', label: 'Fourniture de guides techniques détaillés', active: true },
          { id: 'doc-2', label: 'Création de procédures de dépannage personnalisées', active: false },
        ],
      },
      {
        id: 'escalade-expert',
        label: 'Escalade vers expert si problème complexe',
        active: true,
        subInstructions: [],
      },
    ],
    faqs: [
      {
        id: 'faq-tech-1',
        question: 'Comment résoudre les problèmes de connexion ?',
        answer: 'Vérifiez d\'abord votre connexion réseau. Si le problème persiste, redémarrez votre appareil et votre routeur. Contactez-nous si l\'issue persiste.',
        category: 'Technique',
      },
      {
        id: 'faq-tech-2',
        question: 'Comment mettre à jour le système ?',
        answer: 'Allez dans les paramètres > Système > Mise à jour. Assurez-vous d\'avoir une connexion stable et suffisamment d\'espace de stockage.',
        category: 'Technique',
      },
      {
        id: 'faq-tech-3',
        question: 'Comment diagnostiquer un problème technique ?',
        answer: 'Suivez ces étapes : 1) Vérifiez les logs système, 2) Testez en mode sans échec, 3) Vérifiez les mises à jour récentes, 4) Contactez le support si nécessaire.',
        category: 'Diagnostic',
      },
      {
        id: 'faq-tech-4',
        question: 'Quelle est la procédure de dépannage ?',
        answer: 'Notre procédure de dépannage comprend : identification du problème, collecte des informations système, analyse des logs, résolution ou escalade au support technique.',
        category: 'Dépannage',
      },
    ],
    instructions: [
      { id: 'suggestion-tech-1', label: 'Diagnostic technique avancé avec outils spécialisés', active: true },
      { id: 'suggestion-tech-2', label: 'Résolution de bugs et correction de code', active: true },
      { id: 'restriction-tech-1', label: 'Ne pas proposer de solutions non testées', active: false },
      { id: 'suggestion-tech-3', label: 'Mise à jour et maintenance préventive', active: true },
      { id: 'suggestion-tech-4', label: 'Documentation technique complète et détaillée', active: true },
      { id: 'restriction-tech-2', label: 'Éviter les modifications système sans autorisation', active: false },
    ],
    prompts: [
      { id: 'support-technique', title: 'Support Technique', subtitle: 'Dépannage et assistance', content: 'Vous êtes un expert technique spécialisé dans le dépannage avancé. Utilisez votre expertise technique pour diagnostiquer et résoudre des problèmes complexes avec précision et méthode.' },
      { id: 'service-apres-vente', title: 'Service Après-Vente', subtitle: 'Support et satisfaction', content: 'Vous êtes un expert du service après-vente technique. Fournissez un support technique post-vente de haute qualité pour assurer la satisfaction client.' },
    ],
    workingHours: {
      outOfHoursMessage: 'Notre équipe technique est actuellement hors ligne. Nous traiterons votre demande technique dès notre retour.',
      timezone: 'UTC+1',
      startTime: '08:00',
      endTime: '20:00',
      workingDays: {
        monday: true,
        tuesday: true,
        wednesday: true,
        thursday: true,
        friday: true,
        saturday: true,
        sunday: false,
      },
    },
    tickets: [
      {
        id: 'T-TECH-001',
        title: 'Problème de connexion système',
        status: 'en-attente',
        priority: 'haute',
        channel: 'linkedin',
        client: 'TechCorp Solutions',
        assignedTo: 'Agent Technique',
        date: '2024-01-15',
        description: 'Problème de connexion au système de gestion',
        timeAgo: 'Il y a 10 minutes'
      },
      {
        id: 'T-TECH-002',
        title: 'Bug critique dans l\'application',
        status: 'en-cours',
        priority: 'critique',
        channel: 'messenger',
        client: 'DevSoft Inc',
        assignedTo: 'Expert Technique',
        date: '2024-01-14',
        description: 'Bug critique affectant la production',
        timeAgo: 'Il y a 3 heures'
      },
      {
        id: 'T-TECH-003',
        title: 'Mise à jour système requise',
        status: 'resolu',
        priority: 'moyenne',
        channel: 'telegram',
        client: 'CloudTech',
        assignedTo: 'Agent Maintenance',
        date: '2024-01-13',
        description: 'Assistance pour mise à jour système',
        timeAgo: 'Il y a 1 jour'
      }
    ]
  },
  // Sous-agent 2 - Expert Support Commercial
  '2': {
    id: '2',
    name: 'Expert support commercial',
    platforms: ['whatsapp', 'instagram'], // Différentes plateformes
    languages: ['fr', 'en', 'es'], // Différentes langues
    tone: 'amical', // Ton amical
    style: 'solution-oriented', // Style orienté solution
    blockedKeywords: ['concurrence', 'concurrent', 'rival', 'compétiteur'],
    faqs: [
      {
        id: 'faq-com-1',
        question: 'Quels sont vos tarifs ?',
        answer: 'Nos tarifs varient selon le service demandé. Contactez-nous pour obtenir un devis personnalisé adapté à vos besoins spécifiques.',
        category: 'Commercial',
      },
      {
        id: 'faq-com-2',
        question: 'Comment puis-je obtenir un devis ?',
        answer: 'Vous pouvez demander un devis gratuit en nous contactant par email, téléphone ou via notre formulaire en ligne. Nous vous répondrons sous 24h.',
        category: 'Devis',
      },
      {
        id: 'faq-com-3',
        question: 'Quelles sont vos conditions de vente ?',
        answer: 'Nos conditions de vente incluent : paiement à la commande, livraison sous 5-10 jours ouvrés, garantie satisfait ou remboursé sous 30 jours.',
        category: 'Conditions',
      },
    ],
    instructions: [
      { id: '1', label: 'Gestion des ventes', active: true },
      { id: '2', label: 'Relations client', active: true },
      { id: '3', label: 'Négociation commerciale', active: false },
      { id: '4', label: 'Suivi des commandes', active: true },
      { id: '5', label: 'Fidélisation client', active: false },
    ],
    prompts: [
      { id: 'support-technique', title: 'Support Commercial', subtitle: 'Vente et relation client', content: 'Vous êtes un expert commercial spécialisé dans la vente et la relation client. Aidez les clients à trouver les meilleures solutions adaptées à leurs besoins.' },
      { id: 'service-apres-vente', title: 'Service Après-Vente', subtitle: 'Support et satisfaction', content: 'Vous êtes un expert du service après-vente commercial. Assurez un suivi client optimal pour garantir la satisfaction et la fidélisation.' },
    ],
    workingHours: {
      outOfHoursMessage: 'Notre équipe commerciale est actuellement hors ligne. Nous vous répondrons pendant nos heures d\'ouverture.',
      timezone: 'UTC+1',
      startTime: '09:00',
      endTime: '18:00',
      workingDays: {
        monday: true,
        tuesday: true,
        wednesday: true,
        thursday: true,
        friday: true,
        saturday: false,
        sunday: false,
      },
    },
    tickets: [
      {
        id: 'T-COM-001',
        title: 'Demande de devis personnalisé',
        status: 'en-attente',
        priority: 'moyenne',
        channel: 'whatsapp',
        client: 'BusinessCorp',
        assignedTo: 'Agent Commercial',
        date: '2024-01-15',
        description: 'Demande de devis pour solution personnalisée',
        timeAgo: 'Il y a 15 minutes'
      },
      {
        id: 'T-COM-002',
        title: 'Question sur les tarifs',
        status: 'en-cours',
        priority: 'basse',
        channel: 'instagram',
        client: 'StartupTech',
        assignedTo: 'Expert Commercial',
        date: '2024-01-14',
        description: 'Information sur les tarifs et conditions',
        timeAgo: 'Il y a 2 heures'
      },
      {
        id: 'T-COM-003',
        title: 'Suivi de commande',
        status: 'resolu',
        priority: 'moyenne',
        channel: 'whatsapp',
        client: 'ClientPremium',
        assignedTo: 'Agent Suivi',
        date: '2024-01-13',
        description: 'Suivi de commande #12345',
        timeAgo: 'Il y a 1 jour'
      },
      {
        id: 'T-COM-004',
        title: 'Négociation commerciale',
        status: 'en-cours',
        priority: 'haute',
        channel: 'instagram',
        client: 'BigCorp',
        assignedTo: 'Expert Commercial',
        date: '2024-01-14',
        description: 'Négociation de contrat commercial',
        timeAgo: 'Il y a 4 heures'
      }
    ]
  },
  // Sous-agent 3 - Expert Support Premium
  '3': {
    id: '3',
    name: 'Expert support premium',
    platforms: ['whatsapp', 'telegram', 'discord'], // Plus de plateformes
    languages: ['fr', 'en', 'es', 'it'], // Plus de langues
    tone: 'empathique', // Ton empathique
    style: 'détaillée', // Style détaillé
    blockedKeywords: [],
    faqs: [
      {
        id: 'faq-prem-1',
        question: 'Quels sont les avantages du service premium ?',
        answer: 'Le service premium inclut : support prioritaire 24/7, gestionnaire de compte dédié, réponses garanties sous 1h, accès à des fonctionnalités exclusives.',
        category: 'Premium',
      },
      {
        id: 'faq-prem-2',
        question: 'Comment accéder au support premium ?',
        answer: 'Le support premium est disponible pour nos clients VIP. Contactez votre gestionnaire de compte pour plus d\'informations ou accédez à votre espace client premium.',
        category: 'Accès',
      },
      {
        id: 'faq-prem-3',
        question: 'Quelle est la différence avec le service standard ?',
        answer: 'Le service premium offre : temps de réponse 10x plus rapide, support multilingue, accès prioritaire aux nouvelles fonctionnalités, et assistance personnalisée.',
        category: 'Comparaison',
      },
    ],
    instructions: [
      { id: '1', label: 'Support prioritaire', active: true },
      { id: '2', label: 'Gestion de compte VIP', active: true },
      { id: '3', label: 'Assistance personnalisée', active: true },
      { id: '4', label: 'Accès fonctionnalités exclusives', active: true },
      { id: '5', label: 'Suivi proactif', active: false },
    ],
    prompts: [
      { id: 'support-technique', title: 'Support Premium', subtitle: 'Service exclusif VIP', content: 'Vous êtes un expert du support premium dédié aux clients VIP. Offrez un service d\'exception avec une attention personnalisée et des réponses ultra-rapides.' },
      { id: 'service-apres-vente', title: 'Service Après-Vente Premium', subtitle: 'Support exclusif', content: 'Vous êtes un expert du service après-vente premium. Assurez un suivi client d\'exception avec une approche proactive et personnalisée pour garantir la satisfaction maximale.' },
    ],
    workingHours: {
      outOfHoursMessage: 'Notre équipe premium est disponible 24/7 pour vous assister. Un agent sera avec vous dans les plus brefs délais.',
      timezone: 'UTC+1',
      startTime: '00:00',
      endTime: '23:59',
      workingDays: {
        monday: true,
        tuesday: true,
        wednesday: true,
        thursday: true,
        friday: true,
        saturday: true,
        sunday: true,
      },
    },
    tickets: [
      {
        id: 'T-PREM-001',
        title: 'Support VIP urgent',
        status: 'en-attente',
        priority: 'critique',
        channel: 'whatsapp',
        client: 'VIP Client',
        assignedTo: 'Agent Premium',
        date: '2024-01-15',
        description: 'Demande de support prioritaire VIP',
        timeAgo: 'Il y a 5 minutes'
      },
      {
        id: 'T-PREM-002',
        title: 'Gestion de compte VIP',
        status: 'en-cours',
        priority: 'haute',
        channel: 'telegram',
        client: 'PremiumCorp',
        assignedTo: 'Gestionnaire VIP',
        date: '2024-01-14',
        description: 'Configuration compte VIP personnalisé',
        timeAgo: 'Il y a 1 heure'
      },
      {
        id: 'T-PREM-003',
        title: 'Assistance fonctionnalité exclusive',
        status: 'resolu',
        priority: 'moyenne',
        channel: 'discord',
        client: 'EliteClient',
        assignedTo: 'Expert Premium',
        date: '2024-01-13',
        description: 'Configuration fonctionnalité exclusive',
        timeAgo: 'Il y a 1 jour'
      },
      {
        id: 'T-PREM-004',
        title: 'Suivi proactif client VIP',
        status: 'en-cours',
        priority: 'haute',
        channel: 'whatsapp',
        client: 'TopClient',
        assignedTo: 'Agent Premium',
        date: '2024-01-14',
        description: 'Suivi proactif et personnalisé',
        timeAgo: 'Il y a 3 heures'
      },
      {
        id: 'T-PREM-005',
        title: 'Support 24/7 client VIP',
        status: 'resolu',
        priority: 'moyenne',
        channel: 'telegram',
        client: 'VIP Plus',
        assignedTo: 'Support Premium',
        date: '2024-01-13',
        description: 'Support 24/7 pour client VIP',
        timeAgo: 'Il y a 2 jours'
      }
    ]
  },
  'expert-support-technique': {
    id: 'expert-support-technique',
    name: 'Expert Support Technique',
    platforms: ['linkedin', 'messenger'], // Seulement ces 2 plateformes
    languages: ['fr', 'en'], // Seulement ces 2 langues
    tone: 'technique', // Ton technique
    style: 'technique', // Style technique
    blockedKeywords: ['bug', 'panne', 'dysfonctionnement', 'erreur système'],
    faqs: [
      {
        id: 'faq-tech-1',
        question: 'Comment résoudre les problèmes de connexion ?',
        answer: 'Vérifiez d\'abord votre connexion réseau. Si le problème persiste, redémarrez votre appareil et votre routeur. Contactez-nous si l\'issue persiste.',
        category: 'Technique',
      },
      {
        id: 'faq-tech-2',
        question: 'Comment mettre à jour le système ?',
        answer: 'Allez dans les paramètres > Système > Mise à jour. Assurez-vous d\'avoir une connexion stable et suffisamment d\'espace de stockage.',
        category: 'Technique',
      },
    ],
    instructions: [
      { id: '1', label: 'Diagnostic technique avancé', active: true },
      { id: '2', label: 'Résolution de bugs', active: true },
      { id: '3', label: 'Support système', active: false },
      { id: '4', label: 'Mise à jour et maintenance', active: false },
      { id: '5', label: 'Documentation technique', active: true },
    ],
    prompts: [
      { id: 'support-technique', title: 'Support Technique', subtitle: 'Dépannage et assistance', content: 'Vous êtes un expert technique spécialisé dans le dépannage avancé. Utilisez votre expertise technique pour diagnostiquer et résoudre des problèmes complexes avec précision et méthode.' },
      { id: 'service-apres-vente', title: 'Service Après-Vente', subtitle: 'Support et satisfaction', content: 'Vous êtes un expert du service après-vente technique. Fournissez un support technique post-vente de haute qualité pour assurer la satisfaction client.' },
      { id: 'gestion-reclamations', title: 'Gestion des Réclamations', subtitle: 'Résolution diplomatique', content: 'Vous êtes un expert en gestion des réclamations techniques. Résolvez les litiges techniques avec expertise et diplomatie.' },
      { id: 'personnalisation', title: 'Personnalisation', subtitle: 'Adaptation sur mesure', content: 'Vous êtes un expert technique personnalisé. Adaptez vos solutions techniques selon le niveau d\'expertise et les besoins spécifiques de chaque client.' },
    ],
    workingHours: {
      outOfHoursMessage: 'Notre équipe technique est actuellement hors ligne. Nous traiterons votre demande technique dès notre retour.',
      timezone: 'UTC+1',
      startTime: '08:00',
      endTime: '20:00',
      workingDays: {
        monday: true,
        tuesday: true,
        wednesday: true,
        thursday: true,
        friday: true,
        saturday: true,
        sunday: false,
      },
    },
    tickets: [
      {
        id: 'T004',
        title: 'Bug critique système',
        status: 'en-attente',
        priority: 'critique',
        channel: 'linkedin',
        client: 'TechCorp',
        date: '2024-01-15',
        description: 'Bug critique affectant la production'
      },
      {
        id: 'T005',
        title: 'Migration de données',
        status: 'en-cours',
        priority: 'haute',
        channel: 'messenger',
        client: 'DataSoft',
        date: '2024-01-14',
        description: 'Assistance pour migration de données vers nouveau système'
      }
    ]
  },
  'expert-maintenance': {
    id: 'expert-maintenance',
    name: 'Expert Maintenance',
    platforms: ['whatsapp', 'telegram'],
    languages: ['fr', 'en', 'es'],
    tone: 'préventif',
    style: 'détaillée',
    blockedKeywords: ['urgence', 'critique', 'arrêt production'],
    faqs: [],
    instructions: [
      { id: '1', label: 'Maintenance préventive', active: true },
      { id: '2', label: 'Planification des interventions', active: true },
      { id: '3', label: 'Suivi des équipements', active: false },
      { id: '4', label: 'Documentation technique', active: true },
      { id: '5', label: 'Optimisation des performances', active: false },
    ],
    prompts: [
      { id: 'support-technique', title: 'Support Technique', subtitle: 'Dépannage et assistance', content: 'Vous êtes un expert en maintenance préventive. Planifiez et organisez la maintenance des équipements pour éviter les pannes et optimiser les performances.' },
      { id: 'service-apres-vente', title: 'Service Après-Vente', subtitle: 'Support et satisfaction', content: 'Vous êtes un expert du service après-vente en maintenance. Assurez le suivi et la satisfaction client après les interventions de maintenance.' },
      { id: 'gestion-reclamations', title: 'Gestion des Réclamations', subtitle: 'Résolution diplomatique', content: 'Vous êtes un expert en gestion des réclamations de maintenance. Résolvez les litiges liés aux interventions de maintenance avec professionnalisme.' },
      { id: 'personnalisation', title: 'Personnalisation', subtitle: 'Adaptation sur mesure', content: 'Vous êtes un expert en maintenance personnalisée. Adaptez vos plans de maintenance selon les spécificités et contraintes de chaque équipement.' },
    ],
    workingHours: {
      outOfHoursMessage: 'Notre équipe de maintenance est actuellement hors ligne. Les interventions d\'urgence sont traitées 24h/24.',
      timezone: 'UTC+1',
      startTime: '07:00',
      endTime: '19:00',
      workingDays: {
        monday: true,
        tuesday: true,
        wednesday: true,
        thursday: true,
        friday: true,
        saturday: true,
        sunday: true,
      },
    },
    tickets: [
      {
        id: 'T006',
        title: 'Maintenance préventive',
        status: 'en-attente',
        priority: 'moyenne',
        channel: 'whatsapp',
        client: 'IndustriePlus',
        date: '2024-01-15',
        description: 'Planification de maintenance préventive des équipements'
      },
      {
        id: 'T007',
        title: 'Réparation urgente',
        status: 'en-cours',
        priority: 'haute',
        channel: 'telegram',
        client: 'FabriqueTech',
        date: '2024-01-14',
        description: 'Réparation urgente d\'un équipement de production'
      }
    ]
  },
  'expert-depannage': {
    id: 'expert-depannage',
    name: 'Expert Dépannage',
    platforms: ['whatsapp', 'instagram', 'messenger'],
    languages: ['fr', 'en', 'de'],
    tone: 'réactif',
    style: 'solution-oriented',
    blockedKeywords: ['impossible', 'irréparable', 'obsolète'],
    faqs: [],
    instructions: [
      { id: '1', label: 'Dépannage urgent', active: true },
      { id: '2', label: 'Diagnostic rapide', active: true },
      { id: '3', label: 'Intervention express', active: false },
      { id: '4', label: 'Résolution de pannes critiques', active: true },
      { id: '5', label: 'Support 24/7', active: false },
    ],
    prompts: [
      { id: 'support-technique', title: 'Support Technique', subtitle: 'Dépannage et assistance', content: 'Vous êtes un expert en dépannage urgent. Résolvez rapidement et efficacement les problèmes techniques critiques avec une approche méthodique et réactive.' },
      { id: 'service-apres-vente', title: 'Service Après-Vente', subtitle: 'Support et satisfaction', content: 'Vous êtes un expert du service après-vente en dépannage. Assurez un suivi client optimal après les interventions de dépannage pour garantir la satisfaction.' },
      { id: 'gestion-reclamations', title: 'Gestion des Réclamations', subtitle: 'Résolution diplomatique', content: 'Vous êtes un expert en gestion des réclamations de dépannage. Gérez les situations critiques avec diplomatie et trouvez des solutions rapides et satisfaisantes.' },
      { id: 'personnalisation', title: 'Personnalisation', subtitle: 'Adaptation sur mesure', content: 'Vous êtes un expert en dépannage personnalisé. Adaptez vos méthodes de dépannage selon l\'urgence et les contraintes spécifiques de chaque situation.' },
    ],
    workingHours: {
      outOfHoursMessage: 'Notre équipe de dépannage est actuellement hors ligne. Les dépannages urgents sont traités 24h/24.',
      timezone: 'UTC+1',
      startTime: '06:00',
      endTime: '22:00',
      workingDays: {
        monday: true,
        tuesday: true,
        wednesday: true,
        thursday: true,
        friday: true,
        saturday: true,
        sunday: true,
      },
    },
    tickets: [
      {
        id: 'T008',
        title: 'Panne critique',
        status: 'en-attente',
        priority: 'critique',
        channel: 'whatsapp',
        client: 'UrgenceTech',
        date: '2024-01-15',
        description: 'Panne critique nécessitant intervention immédiate'
      },
      {
        id: 'T009',
        title: 'Diagnostic complexe',
        status: 'en-cours',
        priority: 'haute',
        channel: 'instagram',
        client: 'ComplexCorp',
        date: '2024-01-14',
        description: 'Diagnostic d\'un problème technique complexe'
      },
      {
        id: 'T010',
        title: 'Dépannage express',
        status: 'resolu',
        priority: 'moyenne',
        channel: 'messenger',
        client: 'RapideService',
        date: '2024-01-13',
        description: 'Dépannage rapide d\'un équipement'
      }
    ]
  }, 
  'agent-juridique': {
    id: 'agent-juridique',
    name: 'Agent Juridique',
    platforms: ['gmail', 'slack'],
    languages: ['fr', 'en'],
    tone: 'formel',
    style: 'détaillée',
    blockedKeywords: ['illégal', 'fraude', 'contournement'],
    prompts: [
      { 
        id: 'conseil-juridique', 
        title: 'Conseil Juridique', 
        subtitle: 'Avis et recommandations juridiques', 
        content: 'Vous êtes un conseiller juridique professionnel. Fournissez des avis juridiques précis et des recommandations basées sur la législation en vigueur. Restez objectif et mentionnez toujours les limites de vos conseils.' 
      },
      { 
        id: 'redaction-contractuelle', 
        title: 'Rédaction Contractuelle', 
        subtitle: 'Rédaction et révision de contrats', 
        content: 'Vous êtes un expert en rédaction contractuelle. Aidez à la rédaction, révision et analyse de contrats en identifiant les clauses critiques et les risques potentiels.' 
      },
      { 
        id: 'conformite-reglementaire', 
        title: 'Conformité Réglementaire', 
        subtitle: 'Respect des obligations légales', 
        content: 'Vous êtes un spécialiste en conformité réglementaire. Aidez les entreprises à comprendre et respecter leurs obligations légales et réglementaires.' 
      },
      { 
        id: 'litiges-contentieux', 
        title: 'Litiges et Contentieux', 
        subtitle: 'Gestion des conflits juridiques', 
        content: 'Vous êtes un expert en gestion des litiges. Conseillez sur les stratégies de résolution de conflits et les procédures contentieuses.' 
      },
    ],
    workingHours: {
      outOfHoursMessage: 'Notre service juridique est actuellement fermé. Pour les urgences juridiques, veuillez nous contacter par email et nous vous répondrons dès la réouverture.',
      timezone: 'UTC+1',
      startTime: '09:00',
      endTime: '18:00',
      workingDays: {
        monday: true,
        tuesday: true,
        wednesday: true,
        thursday: true,
        friday: true,
        saturday: false,
        sunday: false,
      },
    },
    tickets: [
      {
        id: 'TJ-2024-001',
        title: 'Révision de contrat de partenariat',
        status: 'en-cours',
        priority: 'haute',
        channel: 'email',
        client: 'SARL Innovation Plus',
        assignedTo: 'Maître Dubois',
        date: '2024-01-15',
        description: 'Révision complète d\'un contrat de partenariat commercial',
        timeAgo: 'Il y a 2 heures'
      },
      {
        id: 'TJ-2024-002',
        title: 'Conseil en propriété intellectuelle',
        status: 'en-attente',
        priority: 'moyenne',
        channel: 'linkedin',
        client: 'Startup TechVision',
        assignedTo: 'Maître Martin',
        date: '2024-01-15',
        description: 'Protection des droits d\'auteur sur un logiciel',
        timeAgo: 'Il y a 30 minutes'
      },
      {
        id: 'TJ-2024-003',
        title: 'Conformité RGPD',
        status: 'resolu',
        priority: 'haute',
        channel: 'whatsapp',
        client: 'E-commerce FashionStyle',
        assignedTo: 'Maître Leroy',
        date: '2024-01-14',
        description: 'Audit de conformité au règlement général sur la protection des données',
        timeAgo: 'Il y a 1 jour'
      }
    ],
    // Base de connaissances spécifique à l'agent juridique
    knowledgeBase: {
      documents: [
        {
          id: 'DOC-JUR-001',
          title: 'Guide de conformité RGPD 2024',
          type: 'pdf',
          size: '2.3 MB',
          uploadDate: '2024-01-10',
          category: 'Conformité',
          description: 'Guide complet sur les obligations RGPD pour les entreprises'
        },
        {
          id: 'DOC-JUR-002',
          title: 'Modèle de contrat de travail CDI',
          type: 'docx',
          size: '450 KB',
          uploadDate: '2024-01-08',
          category: 'Ressources Humaines',
          description: 'Modèle type de contrat à durée indéterminée'
        },
        {
          id: 'DOC-JUR-003',
          title: 'Checklist création SASU',
          type: 'pdf',
          size: '1.1 MB',
          uploadDate: '2024-01-05',
          category: 'Droit des sociétés',
          description: 'Checklist des étapes pour créer une SASU'
        },
        {
          id: 'DOC-JUR-004',
          title: 'Convention de confidentialité type',
          type: 'doc',
          size: '320 KB',
          uploadDate: '2024-01-03',
          category: 'Contrats',
          description: 'Modèle de NDA (Non-Disclosure Agreement)'
        },
        {
          id: 'DOC-JUR-005',
          title: 'Notes de jurisprudence droit commercial',
          type: 'txt',
          size: '150 KB',
          uploadDate: '2023-12-28',
          category: 'Jurisprudence',
          description: 'Recueil des décisions importantes en droit commercial'
        },
        {
          id: 'DOC-JUR-006',
          title: 'Guide des mentions légales site web',
          type: 'pdf',
          size: '1.8 MB',
          uploadDate: '2023-12-25',
          category: 'Droit numérique',
          description: 'Obligations légales pour les sites internet professionnels'
        },
        {
          id: 'DOC-JUR-007',
          title: 'Modèle procès-verbal AG',
          type: 'docx',
          size: '280 KB',
          uploadDate: '2023-12-20',
          category: 'Droit des sociétés',
          description: 'Modèle de procès-verbal d\'assemblée générale'
        },
        {
          id: 'DOC-JUR-008',
          title: 'Tableau comparatif statuts juridiques',
          type: 'xlsx',
          size: '520 KB',
          uploadDate: '2023-12-18',
          category: 'Droit des sociétés',
          description: 'Comparatif détaillé des différents statuts juridiques d\'entreprise'
        },
        {
          id: 'DOC-JUR-009',
          title: 'Loi Pacte - modifications 2024',
          type: 'pdf',
          size: '3.2 MB',
          uploadDate: '2023-12-15',
          category: 'Législation',
          description: 'Analyse des modifications apportées par la loi Pacte'
        },
        {
          id: 'DOC-JUR-010',
          title: 'Checklist audit juridique',
          type: 'pdf',
          size: '950 KB',
          uploadDate: '2023-12-10',
          category: 'Audit',
          description: 'Checklist complète pour réaliser un audit juridique d\'entreprise'
        }
      ]
    }
  }
   
};
