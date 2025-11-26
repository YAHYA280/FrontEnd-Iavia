import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import agentServiceApi from '@/services/api/agents/customer-care/agent.service.api';
import { BlockedKeywordsResponse, LanguageConfigResponse, ToneStyleResponse, UpdateBlockedKeywordsRequest, UpdateLanguageConfigRequest, UpdateToneStyleRequest } from '@/types/agents/customer-care/agent.types';

interface AgentState {

  isLoading: boolean;
  error: string | null;

  // Configurations
  toneStyleConfig: ToneStyleResponse | null;
  blockedKeywords: BlockedKeywordsResponse | null;
  languageConfig: LanguageConfigResponse | null;

  // Actions - Tone & Style
  getToneStyleConfig: (agentUid: string) => Promise<void>;
  updateToneStyleConfig: (agentUid: string, data: UpdateToneStyleRequest) => Promise<void>;

  // Actions - Blocked Keywords
  getBlockedKeywords: (agentUid: string) => Promise<void>;
  updateBlockedKeywords: (agentUid: string, data: UpdateBlockedKeywordsRequest) => Promise<void>;

  // Actions - Language Config
  getLanguageConfig: (agentUid: string) => Promise<void>;
  updateLanguageConfig: (agentUid: string, data: UpdateLanguageConfigRequest) => Promise<void>;

  // Actions utilitaires
  setError: (error: string | null) => void;
  clearError: () => void;
  setLoading: (loading: boolean) => void;
}

export const useAgentStore = create<AgentState>()(
  devtools(
    (set) => ({
      isLoading: false,
      error: null,
      toneStyleConfig: null,
      blockedKeywords: null,
      languageConfig: null,

      // ========== Tone & Style Configuration ==========
      getToneStyleConfig: async (agentUid) => {
        set({ isLoading: true, error: null });
        try {
          const config = await agentServiceApi.getToneStyle(agentUid);
          set({ toneStyleConfig: config, isLoading: false });
        } catch (error: any) {
          set({
            error: error.response?.data?.message || 'Erreur lors de la récupération de la configuration',
            isLoading: false,
          });
          throw error;
        }
      },

      updateToneStyleConfig: async (agentUid, data) => {
        set({ isLoading: true, error: null });
        try {
          const config = await agentServiceApi.updateToneStyle(agentUid, data);
          set({ toneStyleConfig: config, isLoading: false });
        } catch (error: any) {
          set({
            error: error.response?.data?.message || 'Erreur lors de la mise à jour de la configuration',
            isLoading: false,
          });
          throw error;
        }
      },

      // ========== Blocked Keywords ==========
      getBlockedKeywords: async (agentUid) => {
        set({ isLoading: true, error: null });
        try {
          const keywords = await agentServiceApi.getBlockedKeywords(agentUid);
          set({ blockedKeywords: keywords, isLoading: false });
        } catch (error: any) {
          set({
            error: error.response?.data?.message || 'Erreur lors de la récupération des mots-clés bloqués',
            isLoading: false,
          });
          throw error;
        }
      },

      updateBlockedKeywords: async (agentUid, data) => {
        set({ isLoading: true, error: null });
        try {
          const keywords = await agentServiceApi.updateBlockedKeywords(agentUid, data);
          set({ blockedKeywords: keywords, isLoading: false });
        } catch (error: any) {
          set({
            error: error.response?.data?.message || 'Erreur lors de la mise à jour des mots-clés bloqués',
            isLoading: false,
          });
          throw error;
        }
      },

      // ========== Language Configuration ==========
      getLanguageConfig: async (agentUid) => {
        set({ isLoading: true, error: null });
        try {
          const config = await agentServiceApi.getLanguageConfig(agentUid);
          set({ languageConfig: config, isLoading: false });
        } catch (error: any) {
          set({
            error: error.response?.data?.message || 'Erreur lors de la récupération de la configuration de langue',
            isLoading: false,
          });
          throw error;
        }
      },

      updateLanguageConfig: async (agentUid, data) => {
        set({ isLoading: true, error: null });
        try {
          const config = await agentServiceApi.updateLanguageConfig(agentUid, data);
          set({ languageConfig: config, isLoading: false });
        } catch (error: any) {
          set({
            error: error.response?.data?.message || 'Erreur lors de la mise à jour de la configuration de langue',
            isLoading: false,
          });
          throw error;
        }
      },

      // ========== Utilitaires ==========
      setError: (error) => set({ error }),
      clearError: () => set({ error: null }),
      setLoading: (loading) => set({ isLoading: loading }),
    }),
    { name: 'AgentStore' }
  )
);