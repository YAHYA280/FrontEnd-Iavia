import { faCheckCircle, faSearch, faSearchPlus, faUserCircle } from '@fortawesome/free-solid-svg-icons';
import { AuditReport } from '../types/audit-reports';
import { MenuOption } from './community-manager-config';

export const seoMenuOptions: MenuOption[] = [
  { id: 'integrations', label: 'Intégrations', icon: 'link' },
  { id: 'audit', label: 'Audit SEO', icon: 'chart-line' },
  { id: 'article_generator', label: "Générateur d'article", icon: 'edit' },
];

export const auditReports: AuditReport[] = [
  {
    id: 1,
    url: 'https://blog.example.com',
    device: 'mobile',
    startDate: '09/10/2025',
    endDate: '09/10/2025',
    score: 88,
    reportNumber: '#0008',
    // Données détaillées pour le popup
    details: {
      performance: 12,
      accessibility: 100,
      bestPractices: 100,
      seo: 100,
      lcp: '1.2 s',
      inp: '160 ms',
      cls: '0.10',
      fcp: '160 ms',
      ttfb: '160 ms',
    },
    // Insights générés automatiquement
    insights: {
      title: 'Les 3 piliers du SEO',
      sections: [
        {
          title: '1. Le SEO technique',
          content: [
            "C'est la base. Il concerne la structure du site, la vitesse de chargement, l'indexation, la sécurité (HTTPS) et la compatibilité mobile.",
            'Un site rapide et bien organisé est mieux compris et donc mieux classé par les moteurs de recherche.',
          ],
        },
        {
          title: '2. Le contenu (SEO on-page)',
          content: [
            'Le contenu est le cœur du référencement.',
            'Google privilégie les pages riches, pertinentes et bien structurées.',
          ],
        },
        {
          title: '3. La popularité (SEO off-page)',
          content: [
            'La notoriété de votre site est cruciale.',
            'Elle se mesure par le nombre et la qualité des backlinks pointant vers votre site.',
          ],
        },
      ],
    },
  },
  {
    id: 2,
    url: 'https://test-site.com',
    device: 'computer',
    startDate: '07/10/2024',
    endDate: '07/10/2024',
    score: 92,
    reportNumber: '#0007',
    details: {
      performance: 85,
      accessibility: 95,
      bestPractices: 90,
      seo: 92,
      lcp: '1.5 s',
      inp: '120 ms',
      cls: '0.05',
      fcp: '140 ms',
      ttfb: '110 ms',
    },
    insights: {
      title: 'Optimisation des Performances',
      sections: [
        {
          title: '1. Temps de chargement',
          content: [
            "Votre site affiche d'excellentes performances avec un LCP de 1.5s.",
            'Maintenez cette vitesse pour une expérience utilisateur optimale.',
          ],
        },
        {
          title: '2. Accessibilité',
          content: [
            "Score d'accessibilité exceptionnel de 95%.",
            'Votre site est bien adapté aux utilisateurs avec handicaps.',
          ],
        },
      ],
    },
  },
  {
    id: 3,
    url: 'https://demo-site.com',
    device: 'mobile',
    startDate: '05/10/2024',
    endDate: '05/10/2024',
    score: 76,
    reportNumber: '#0006',
    details: {
      performance: 65,
      accessibility: 80,
      bestPractices: 75,
      seo: 78,
      lcp: '2.8 s',
      inp: '300 ms',
      cls: '0.25',
      fcp: '280 ms',
      ttfb: '200 ms',
    },
    insights: {
      title: "Points d'Amélioration Critique",
      sections: [
        {
          title: '1. Performance à optimiser',
          content: [
            'Le LCP de 2.8s dépasse le seuil recommandé de 2.5s.',
            'Optimisez les images et réduisez le JavaScript bloquant.',
          ],
        },
        {
          title: '2. Stabilité visuelle',
          content: [
            'Le CLS de 0.25 indique des décalages de mise en page.',
            'Définissez des dimensions fixes pour les images et les médias.',
          ],
        },
      ],
    },
  },
];

 // Configuration des métriques
export const metricConfig = {
    performance: { 
      label: 'Performance', 
      icon: faSearchPlus, 
      unit: '',
      value: '82'
    },
    accessibility: { 
      label: 'Accessibilité', 
      icon: faUserCircle, 
      unit: '/5',
      value: '4.1'
    },
    bestPractices: { 
      label: 'Bonnes pratiques', 
      icon: faCheckCircle, 
      unit: '',
      value: '95'
    },
    seo: { 
      label: 'SEO', 
      icon: faSearch, 
      unit: '',
      value: '88'
    }
  };


export   // Données simulées pour le graphique
  const chartData = [
    { 
      name: 'Jan', 
      performance: 65,
      accessibility: 3.8,
      bestPractices: 68,
      seo: 75,
      date: 'Jan 13, 08:57 PM',
      reportNumber: 1,
      url: 'example.com',
      device: 'Mobile'
    },
    { 
      name: 'Fév', 
      performance: 70,
      accessibility: 4.0,
      bestPractices: 72,
      seo: 78,
      date: 'Fév 13, 08:57 PM',
      reportNumber: 2,
      url: 'example.com',
      device: 'Mobile'
    },
    { 
      name: 'Mar', 
      performance: 68,
      accessibility: 4.1,
      bestPractices: 70,
      seo: 80,
      date: 'Mar 13, 08:57 PM',
      reportNumber: 3,
      url: 'example.com',
      device: 'Desktop'
    },
    { 
      name: 'Avr', 
      performance: 75,
      accessibility: 4.2,
      bestPractices: 75,
      seo: 82,
      date: 'Avr 13, 08:57 PM',
      reportNumber: 4,
      url: 'example.com',
      device: 'Mobile'
    },
    { 
      name: 'Mai', 
      performance: 80,
      accessibility: 4.3,
      bestPractices: 78,
      seo: 85,
      date: 'Mai 13, 08:57 PM',
      reportNumber: 5,
      url: 'example.com',
      device: 'Desktop'
    },
    { 
      name: 'Juin', 
      performance: 78,
      accessibility: 4.4,
      bestPractices: 80,
      seo: 88,
      date: 'Juin 13, 08:57 PM',
      reportNumber: 6,
      url: 'example.com',
      device: 'Mobile'
    },
    { 
      name: 'Juil', 
      performance: 82,
      accessibility: 4.5,
      bestPractices: 82,
      seo: 90,
      date: 'Juil 13, 08:57 PM',
      reportNumber: 7,
      url: 'example.com',
      device: 'Desktop'
    },
    { 
      name: 'Aoû', 
      performance: 85,
      accessibility: 4.4,
      bestPractices: 85,
      seo: 88,
      date: 'Aoû 13, 08:57 PM',
      reportNumber: 8,
      url: 'example.com',
      device: 'Mobile'
    },
    { 
      name: 'Sep', 
      performance: 88,
      accessibility: 4.6,
      bestPractices: 88,
      seo: 92,
      date: 'Sep 13, 08:57 PM',
      reportNumber: 9,
      url: 'example.com',
      device: 'Desktop'
    },
    { 
      name: 'Oct', 
      performance: 90,
      accessibility: 4.7,
      bestPractices: 90,
      seo: 95,
      date: 'Oct 13, 08:57 PM',
      reportNumber: 10,
      url: 'example.com',
      device: 'Mobile'
    },
    { 
      name: 'Nov', 
      performance: 92,
      accessibility: 4.8,
      bestPractices: 88,
      seo: 92,
      date: 'Nov 13, 08:57 PM',
      reportNumber: 11,
      url: 'example.com',
      device: 'Desktop'
    },
    { 
      name: 'Déc', 
      performance: 95,
      accessibility: 4.9,
      bestPractices: 92,
      seo: 90,
      date: 'Déc 13, 08:57 PM',
      reportNumber: 12,
      url: 'example.com',
      device: 'Mobile'
    }
];

export const scheduledAudits = [
  { id: 1, url: 'https://example.com', nextDate: '08/10/2025, 08:47:23', device: 'computer', frequency: 'chaque jour' },
  { id: 2, url: 'https://example.com', nextDate: '08/10/2025, 08:47:23', device: 'mobile', frequency: 'chaque semaine' },
  { id: 3, url: 'https://example.com', nextDate: '08/10/2025, 08:47:23', device: 'computer', frequency: 'chaque semaine' },
  { id: 4, url: 'https://example.com', nextDate: '08/10/2025, 08:47:23', device: 'mobile', frequency: 'chaque jour' },
  { id: 5, url: 'https://example.com', nextDate: '08/10/2025, 08:47:23', device: 'computer', frequency: 'chaque semaine' },
  { id: 6, url: 'https://example.com', nextDate: '08/10/2025, 08:47:23', device: 'mobile', frequency: 'chaque jour' },
];