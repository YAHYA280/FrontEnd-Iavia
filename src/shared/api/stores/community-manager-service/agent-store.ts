import { create } from 'zustand';
import axios from '@/config/axios';
import { agentEndpoints } from '../../endpoints/community-manager-service/agent-endpoints';
import { AgentResponse, CreateAgentRequest } from '../../../types/community-manager';

interface AgentStore {
  agent: AgentResponse | null;
  agents: AgentResponse[];
  isLoading: boolean;
  error: string | null;

  // Fetch operations
  fetchByUid: (agentUid: string) => Promise<void>;
  fetchAllByOwner: (ownerAdminUid: string) => Promise<void>;

  // CRUD operations
  createAgent: (request: CreateAgentRequest) => Promise<AgentResponse>;
  deleteAgent: (agentUid: string) => Promise<boolean>;

  // Status operations
  activateAgent: (agentUid: string) => Promise<AgentResponse>;
  deactivateAgent: (agentUid: string) => Promise<AgentResponse>;
  toggleAgentStatus: (agentUid: string) => Promise<AgentResponse>;

  // Utility
  clearError: () => void;
  reset: () => void;
}

export const useAgentStore = create<AgentStore>((set, get) => ({
  agent: null,
  agents: [],
  isLoading: false,
  error: null,

  fetchByUid: async (agentUid: string) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.get<AgentResponse>(agentEndpoints.getByUid(agentUid));
      set({ agent: response.data, isLoading: false });
    } catch (error: any) {
      set({
        error: error.response?.data?.message || 'Failed to fetch agent',
        isLoading: false,
      });
    }
  },

  fetchAllByOwner: async (ownerAdminUid: string) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.get<AgentResponse[]>(agentEndpoints.getAllByOwner(ownerAdminUid));
      set({ agents: response.data, isLoading: false });
    } catch (error: any) {
      set({
        error: error.response?.data?.message || 'Failed to fetch agents',
        isLoading: false,
      });
    }
  },

  createAgent: async (request: CreateAgentRequest) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.post<AgentResponse>(agentEndpoints.create, request);
      set({ agent: response.data, isLoading: false });
      return response.data;
    } catch (error: any) {
      set({
        error: error.response?.data?.message || 'Failed to create agent',
        isLoading: false,
      });
      throw error;
    }
  },

  deleteAgent: async (agentUid: string) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.delete<boolean>(agentEndpoints.delete(agentUid));

      // Remove agent from the store
      const { agents } = get();
      set({
        agents: agents.filter((a) => a.uid !== agentUid),
        agent: get().agent?.uid === agentUid ? null : get().agent,
        isLoading: false,
      });

      return response.data;
    } catch (error: any) {
      set({
        error: error.response?.data?.message || 'Failed to delete agent',
        isLoading: false,
      });
      throw error;
    }
  },

  activateAgent: async (agentUid: string) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.put<AgentResponse>(agentEndpoints.activate(agentUid));

      // Update agent in store
      const { agent, agents } = get();
      set({
        agent: agent?.uid === agentUid ? response.data : agent,
        agents: agents.map((a) => (a.uid === agentUid ? response.data : a)),
        isLoading: false,
      });

      return response.data;
    } catch (error: any) {
      set({
        error: error.response?.data?.message || 'Failed to activate agent',
        isLoading: false,
      });
      throw error;
    }
  },

  deactivateAgent: async (agentUid: string) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.put<AgentResponse>(agentEndpoints.deactivate(agentUid));

      // Update agent in store
      const { agent, agents } = get();
      set({
        agent: agent?.uid === agentUid ? response.data : agent,
        agents: agents.map((a) => (a.uid === agentUid ? response.data : a)),
        isLoading: false,
      });

      return response.data;
    } catch (error: any) {
      set({
        error: error.response?.data?.message || 'Failed to deactivate agent',
        isLoading: false,
      });
      throw error;
    }
  },

  toggleAgentStatus: async (agentUid: string) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.put<AgentResponse>(agentEndpoints.toggleStatus(agentUid));

      // Update agent in store
      const { agent, agents } = get();
      set({
        agent: agent?.uid === agentUid ? response.data : agent,
        agents: agents.map((a) => (a.uid === agentUid ? response.data : a)),
        isLoading: false,
      });

      return response.data;
    } catch (error: any) {
      set({
        error: error.response?.data?.message || 'Failed to toggle agent status',
        isLoading: false,
      });
      throw error;
    }
  },

  clearError: () => set({ error: null }),

  reset: () => set({ agent: null, agents: [], isLoading: false, error: null }),
}));
