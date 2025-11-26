import { create } from 'zustand';
import axios from '@/config/axios';
import { ideasEndpoints } from '../../endpoints/community-manager-service/ideas-endpoints';
import {
  IdeaResponse,
  UpdateIdeaRequest,
  PublishIdeaRequest,
  GenerateIdeasRequest,
  IdeaStatus,
  PlatformType,
} from '../../../types/community-manager';

interface IdeasStore {
  ideas: IdeaResponse[];
  currentIdea: IdeaResponse | null;
  isLoading: boolean;
  error: string | null;

  // Fetch operations
  fetchAllByAgent: (agentUid: string) => Promise<void>;
  fetchByAgentAndStatus: (agentUid: string, status: IdeaStatus) => Promise<void>;
  fetchByAgentAndPlatform: (agentUid: string, platformType: PlatformType) => Promise<void>;
  fetchByAgentPlatformAndStatus: (
    agentUid: string,
    platformType: PlatformType,
    status: IdeaStatus
  ) => Promise<void>;
  fetchByUid: (ideaUid: string) => Promise<void>;

  // CRUD operations
  updateIdea: (ideaUid: string, request: UpdateIdeaRequest) => Promise<IdeaResponse>;
  publishIdea: (ideaUid: string, request: PublishIdeaRequest) => Promise<IdeaResponse>;
  deleteIdea: (ideaUid: string) => Promise<boolean>;

  // Generate ideas
  generateIdeas: (request: GenerateIdeasRequest) => Promise<IdeaResponse[]>;

  // Utility
  clearError: () => void;
  reset: () => void;
}

export const useIdeasStore = create<IdeasStore>((set, get) => ({
  ideas: [],
  currentIdea: null,
  isLoading: false,
  error: null,

  fetchAllByAgent: async (agentUid: string) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.get<IdeaResponse[]>(
        ideasEndpoints.getAllByAgent(agentUid)
      );
      set({ ideas: response.data, isLoading: false });
    } catch (error: any) {
      set({
        error: error.response?.data?.message || 'Failed to fetch ideas',
        isLoading: false,
      });
    }
  },

  fetchByAgentAndStatus: async (agentUid: string, status: IdeaStatus) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.get<IdeaResponse[]>(
        ideasEndpoints.getByAgentAndStatus(agentUid),
        { params: { status } }
      );
      set({ ideas: response.data, isLoading: false });
    } catch (error: any) {
      set({
        error: error.response?.data?.message || 'Failed to fetch ideas by status',
        isLoading: false,
      });
    }
  },

  fetchByAgentAndPlatform: async (agentUid: string, platformType: PlatformType) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.get<IdeaResponse[]>(
        ideasEndpoints.getByAgentAndPlatform(agentUid),
        { params: { platformType } }
      );
      set({ ideas: response.data, isLoading: false });
    } catch (error: any) {
      set({
        error: error.response?.data?.message || 'Failed to fetch ideas by platform',
        isLoading: false,
      });
    }
  },

  fetchByAgentPlatformAndStatus: async (
    agentUid: string,
    platformType: PlatformType,
    status: IdeaStatus
  ) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.get<IdeaResponse[]>(
        ideasEndpoints.getByAgentPlatformAndStatus(agentUid),
        { params: { platformType, status } }
      );
      set({ ideas: response.data, isLoading: false });
    } catch (error: any) {
      set({
        error: error.response?.data?.message || 'Failed to fetch filtered ideas',
        isLoading: false,
      });
    }
  },

  fetchByUid: async (ideaUid: string) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.get<IdeaResponse>(
        ideasEndpoints.getByUid(ideaUid)
      );
      set({ currentIdea: response.data, isLoading: false });
    } catch (error: any) {
      set({
        error: error.response?.data?.message || 'Failed to fetch idea',
        isLoading: false,
      });
    }
  },

  updateIdea: async (ideaUid: string, request: UpdateIdeaRequest) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.put<IdeaResponse>(
        ideasEndpoints.update(ideaUid),
        request
      );

      // Update the idea in the list
      set((state) => ({
        ideas: state.ideas.map((idea) =>
          idea.uid === ideaUid ? response.data : idea
        ),
        currentIdea: state.currentIdea?.uid === ideaUid ? response.data : state.currentIdea,
        isLoading: false,
      }));

      return response.data;
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || 'Failed to update idea';
      set({ error: errorMessage, isLoading: false });
      throw error;
    }
  },

  publishIdea: async (ideaUid: string, request: PublishIdeaRequest) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.put<IdeaResponse>(
        ideasEndpoints.publish(ideaUid),
        request
      );

      // Update the idea in the list
      set((state) => ({
        ideas: state.ideas.map((idea) =>
          idea.uid === ideaUid ? response.data : idea
        ),
        currentIdea: state.currentIdea?.uid === ideaUid ? response.data : state.currentIdea,
        isLoading: false,
      }));

      return response.data;
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || 'Failed to publish idea';
      set({ error: errorMessage, isLoading: false });
      throw error;
    }
  },

  deleteIdea: async (ideaUid: string) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.delete<boolean>(
        ideasEndpoints.delete(ideaUid)
      );

      // Remove the idea from the list
      set((state) => ({
        ideas: state.ideas.filter((idea) => idea.uid !== ideaUid),
        currentIdea: state.currentIdea?.uid === ideaUid ? null : state.currentIdea,
        isLoading: false,
      }));

      return response.data;
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || 'Failed to delete idea';
      set({ error: errorMessage, isLoading: false });
      throw error;
    }
  },

  generateIdeas: async (request: GenerateIdeasRequest) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.post<IdeaResponse[]>(
        ideasEndpoints.generate,
        request
      );

      // Add generated ideas to the existing list
      set((state) => ({
        ideas: [...response.data, ...state.ideas],
        isLoading: false,
      }));

      return response.data;
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || 'Failed to generate ideas';
      set({ error: errorMessage, isLoading: false });
      throw error;
    }
  },

  clearError: () => set({ error: null }),

  reset: () => set({ ideas: [], currentIdea: null, isLoading: false, error: null }),
}));
