import { create } from 'zustand';
import axios from '@/config/axios';
import { communityManagerConfigurationEndpoints } from '../../endpoints/community-manager-service/configuration-endpoints';
import {
  CommunityManagerConfigurationRequest,
  CommunityManagerConfigurationResponse,
} from '../../../types/community-manager';

interface ConfigurationStore {
  configuration: CommunityManagerConfigurationResponse | null;
  isLoading: boolean;
  error: string | null;

  fetchConfiguration: (agentUid: string) => Promise<void>;
  saveConfiguration: (request: CommunityManagerConfigurationRequest) => Promise<CommunityManagerConfigurationResponse>;
  updateConfiguration: (agentUid: string, request: CommunityManagerConfigurationRequest) => Promise<CommunityManagerConfigurationResponse>;
  clearError: () => void;
  reset: () => void;
}

export const useConfigurationStore = create<ConfigurationStore>((set) => ({
  configuration: null,
  isLoading: false,
  error: null,

  fetchConfiguration: async (agentUid: string) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.get<CommunityManagerConfigurationResponse>(
        communityManagerConfigurationEndpoints.getByAgentUid(agentUid)
      );
      set({ configuration: response.data, isLoading: false });
    } catch (error: any) {
      set({
        error: error.response?.data?.message || 'Failed to fetch configuration',
        isLoading: false,
      });
    }
  },

  saveConfiguration: async (request: CommunityManagerConfigurationRequest) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.post<CommunityManagerConfigurationResponse>(
        communityManagerConfigurationEndpoints.save,
        request
      );
      set({ configuration: response.data, isLoading: false });
      return response.data;
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || 'Failed to save configuration';
      set({ error: errorMessage, isLoading: false });
      throw error;
    }
  },

  updateConfiguration: async (agentUid: string, request: CommunityManagerConfigurationRequest) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.put<CommunityManagerConfigurationResponse>(
        communityManagerConfigurationEndpoints.update(agentUid),
        request
      );
      set({ configuration: response.data, isLoading: false });
      return response.data;
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || 'Failed to update configuration';
      set({ error: errorMessage, isLoading: false });
      throw error;
    }
  },

  clearError: () => set({ error: null }),

  reset: () => set({ configuration: null, isLoading: false, error: null }),
}));
