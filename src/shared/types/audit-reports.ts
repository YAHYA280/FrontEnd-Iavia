export interface AuditReport {
  id: number;
  url: string;
  device: 'mobile' | 'computer';
  startDate: string;
  endDate: string;
  score: number;
  reportNumber: string;
  details: AuditDetails;
  insights: AuditInsights;
}

export interface AuditDetails {
  performance: number;
  accessibility: number;
  bestPractices: number;
  seo: number;
  lcp: string;
  inp: string;
  cls: string;
  fcp: string;
  ttfb: string;
}

export interface AuditInsights {
  title: string;
  sections: InsightSection[];
}

export interface InsightSection {
  title: string;
  content: string[];
}

export interface Filters {
  url: string;
  device: string;
  startDate: string;
  endDate: string;
}

export interface Audit {
  id: number;
  url: string;
  nextDate: string;
  device: string;
  frequency: string;
}