import { create } from 'zustand';
import axiosInstance from '@/utils/axios';
import { blockedKeywordsEndpoints } from '../../endpoints/agent-legal-service/blocked-keywords-endpoints';
import type {
  BlockedKeywordsRequestDTO,
  BlockedKeywordsResponseDTO,
} from '@/shared/types/knowledge-base';

// ============================================================
// Store Type Definition
// ============================================================

type BlockedKeywordsStore = {
  // State
  blockedKeywords: string[];
  totalCount: number;
  loading: boolean;
  error: string | null;

  // Actions
  fetchBlockedKeywords: (agentUid: string) => Promise<BlockedKeywordsResponseDTO>;
  addKeywords: (params: {
    agentUid: string;
    keywords: string[];
  }) => Promise<BlockedKeywordsResponseDTO>;
  removeKeywords: (params: {
    agentUid: string;
    keywords: string[];
  }) => Promise<BlockedKeywordsResponseDTO>;
  clearAllKeywords: (agentUid: string) => Promise<BlockedKeywordsResponseDTO>;

  // Utility actions
  clearError: () => void;
  reset: () => void;
};

// ============================================================
// Initial State
// ============================================================

const initialState = {
  blockedKeywords: [],
  totalCount: 0,
  loading: false,
  error: null,
};

// ============================================================
// Store Implementation
// ============================================================

export const useBlockedKeywordsStore = create<BlockedKeywordsStore>((set, get) => ({
  ...initialState,

  // ========== FETCH BLOCKED KEYWORDS ==========

  /**
   * Fetch blocked keywords for an agent
   */
  fetchBlockedKeywords: async (agentUid) => {
    set({ loading: true, error: null });
    try {
      const { data } = await axiosInstance.get<BlockedKeywordsResponseDTO>(
        blockedKeywordsEndpoints.getKeywords(agentUid)
      );

      set({
        blockedKeywords: data.blockedKeywords,
        totalCount: data.totalCount,
        loading: false,
      });

      return data;
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || error.message || 'Failed to fetch blocked keywords';
      set({
        error: errorMessage,
        loading: false,
      });
      throw new Error(errorMessage);
    }
  },

  // ========== ADD KEYWORDS ==========

  /**
   * Add keywords to the blocked list
   */
  addKeywords: async (params) => {
    set({ loading: true, error: null });
    try {
      const requestBody: BlockedKeywordsRequestDTO = {
        keywords: params.keywords,
      };

      const { data } = await axiosInstance.post<BlockedKeywordsResponseDTO>(
        blockedKeywordsEndpoints.addKeywords(params.agentUid),
        requestBody
      );

      set({
        blockedKeywords: data.blockedKeywords,
        totalCount: data.totalCount,
        loading: false,
      });

      return data;
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || error.message || 'Failed to add keywords';
      set({
        error: errorMessage,
        loading: false,
      });
      throw new Error(errorMessage);
    }
  },

  // ========== REMOVE KEYWORDS ==========

  /**
   * Remove keywords from the blocked list
   */
  removeKeywords: async (params) => {
    set({ loading: true, error: null });
    try {
      const requestBody: BlockedKeywordsRequestDTO = {
        keywords: params.keywords,
      };

      const { data } = await axiosInstance.post<BlockedKeywordsResponseDTO>(
        blockedKeywordsEndpoints.removeKeywords(params.agentUid),
        requestBody
      );

      set({
        blockedKeywords: data.blockedKeywords,
        totalCount: data.totalCount,
        loading: false,
      });

      return data;
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || error.message || 'Failed to remove keywords';
      set({
        error: errorMessage,
        loading: false,
      });
      throw new Error(errorMessage);
    }
  },

  // ========== CLEAR ALL KEYWORDS ==========

  /**
   * Clear all blocked keywords for an agent
   */
  clearAllKeywords: async (agentUid) => {
    set({ loading: true, error: null });
    try {
      const { data } = await axiosInstance.post<BlockedKeywordsResponseDTO>(
        blockedKeywordsEndpoints.clearAllKeywords(agentUid)
      );

      set({
        blockedKeywords: [],
        totalCount: 0,
        loading: false,
      });

      return data;
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || error.message || 'Failed to clear keywords';
      set({
        error: errorMessage,
        loading: false,
      });
      throw new Error(errorMessage);
    }
  },

  // ========== UTILITY ACTIONS ==========

  /**
   * Clear error message
   */
  clearError: () => {
    set({ error: null });
  },

  /**
   * Reset store to initial state
   */
  reset: () => {
    set(initialState);
  },
}));
