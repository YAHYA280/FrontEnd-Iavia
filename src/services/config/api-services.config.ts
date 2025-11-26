/**
 * Configuration des services API
 * Centralise toutes les routes de l'API User Service
 */

const BASE_URL = '/api/user';
const BASE_FAQ_URL = '/api/customer-care';

export const API_SERVICES = {
  // ========== Authentication ==========
  AUTH: {
    CLIENT_LOGIN: `${BASE_URL}/auth/clientLogin`,
    BO_LOGIN: `${BASE_URL}/auth/boLogin`,
    LOGOUT: `${BASE_URL}/auth/logout`,
    USER_HISTORY: (userUid: string) => `${BASE_URL}/auth/history/${userUid}`,
  },

  // ========== Super Admin ==========
  SUPER_ADMIN: {
    CREATE: `${BASE_URL}/super_admin/addUser`,
    GET_BY_UID: (uid: string) => `${BASE_URL}/super_admin/${uid}`,
    UPDATE: (uid: string) => `${BASE_URL}/super_admin/updateUser/${uid}`,
    DELETE: (uid: string) => `${BASE_URL}/super_admin/deleteUser/${uid}`,
    CHANGE_STATUS: (uid: string) => `${BASE_URL}/super_admin/${uid}/status`,
    UPDATE_LAST_LOGIN: `${BASE_URL}/super_admin/last-login`,
  },

  // ========== Admin ==========
  ADMINS: {
    CREATE: `${BASE_URL}/admins/addAdmin`,
    GET_BY_UID: (uid: string) => `${BASE_URL}/admins/${uid}`,
    GET_BY_STRIPE: (stripeCustomerId: string) => `${BASE_URL}/admins/stripe/${stripeCustomerId}`,
    GET_BY_COLLABORATOR: (uid: string) => `${BASE_URL}/admins/collaborator/${uid}`,
    UPDATE: (uid: string) => `${BASE_URL}/admins/updateAdmin/${uid}`,
    UPDATE_STRIPE: (uid: string) => `${BASE_URL}/admins/${uid}/stripe-customer`,
    GET_IP_ADDRESS: (uid: string) => `${BASE_URL}/admins/${uid}/ipAddress`,
    SEARCH: `${BASE_URL}/admins/search`,
  },

  // ========== Collaborator ==========
  COLLABORATORS: {
    CREATE: `${BASE_URL}/collaborators/addCollaborator`,
    GET_BY_UID: (uid: string) => `${BASE_URL}/collaborators/${uid}`,
    UPDATE: (uid: string) => `${BASE_URL}/collaborators/updateCollaborator/${uid}`,
    ASSIGN_PERMISSIONS: (uid: string) => `${BASE_URL}/collaborators/${uid}/permissions`,
    LINK_TO_AGENT: (uid: string) => `${BASE_URL}/collaborators/link-to-agent/${uid}`,
    UNLINK_FROM_AGENT: (uid: string) => `${BASE_URL}/collaborators/unlink-from-agent/${uid}`,
    IS_LINKED_TO_AGENT: (uid: string) => `${BASE_URL}/collaborators/${uid}/linked-to-agent`,
    SEARCH: `${BASE_URL}/collaborators/search`,
  },
   // ========== FAQ ==========
   FAQ: {
    LIST: `${BASE_FAQ_URL}/faq`,
    CREATE: `${BASE_FAQ_URL}/faq`,
    UPDATE: (faqUid: string) => `${BASE_FAQ_URL}/faq/${faqUid}`,
    DELETE: (faqUid: string) => `${BASE_FAQ_URL}/faq/${faqUid}`,
    FAQ_STATISTIC:(agentUid: string) => `${BASE_FAQ_URL}/faq/statistics/${agentUid}`,
  },
} as const;

export type ApiService = typeof API_SERVICES;