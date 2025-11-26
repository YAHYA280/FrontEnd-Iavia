const BASE_URL = '/api/customer-care';

export const CUSTOMER_CARE_AGENT_API_SERVICES = {
  AGENTS: {
    
    // Configurations
    GET_TONE_STYLE: (agentUid: string) => `${BASE_URL}/agents/${agentUid}/tone-style-config`,
    UPDATE_TONE_STYLE: (agentUid: string) => `${BASE_URL}/agents/${agentUid}/tone-style-config`,
    
    GET_BLOCKED_KEYWORDS: (agentUid: string) => `${BASE_URL}/agents/${agentUid}/blocked-keywords-config`,
    UPDATE_BLOCKED_KEYWORDS: (agentUid: string) => `${BASE_URL}/agents/${agentUid}/blocked-keywords-config`,
    
    GET_LANGUAGE_CONFIG: (agentUid: string) => `${BASE_URL}/agents/${agentUid}/language-config`,
    UPDATE_LANGUAGE_CONFIG: (agentUid: string) => `${BASE_URL}/agents/${agentUid}/language-config`,
  },
} as const;

export type ApiService = typeof CUSTOMER_CARE_AGENT_API_SERVICES;