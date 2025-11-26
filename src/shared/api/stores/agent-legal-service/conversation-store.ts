import { create } from 'zustand';
import axiosInstance from '@/utils/axios';
import { conversationEndpoints } from '../../endpoints/agent-legal-service/conversation-endpoints';
import type {
  ConversationSessionResponseDTO,
  CreateConversationRequestDTO,
  ConversationListResponseDTO,
  ConversationStatsDTO,
  ConversationSearchParams,
  SessionStatus,
} from '@/shared/types/legal-conversation';
import { MessageChannel } from '@/shared/types/legal-conversation';

// ============================================================
// Store Type Definition
// ============================================================

type ConversationStore = {
  // State
  conversations: ConversationSessionResponseDTO[];
  currentConversation: ConversationSessionResponseDTO | null;
  loading: boolean;
  error: string | null;
  totalConversations: number;
  currentPage: number;
  totalPages: number;
  hasMore: boolean;

  // Actions
  createConversation: (params: CreateConversationRequestDTO) => Promise<ConversationSessionResponseDTO>;
  getOrCreateActiveConversation: (params: {
    userUid: string;
    agentUid: string;
    channel?: MessageChannel;
  }) => Promise<ConversationSessionResponseDTO>;
  getConversation: (conversationUid: string) => Promise<ConversationSessionResponseDTO>;
  getUserConversations: (params: ConversationSearchParams) => Promise<ConversationListResponseDTO>;
  getUserConversationsByStatus: (params: ConversationSearchParams & { status: SessionStatus }) => Promise<ConversationListResponseDTO>;
  endConversation: (conversationUid: string) => Promise<ConversationSessionResponseDTO>;
  deleteConversation: (conversationUid: string) => Promise<void>;
  getConversationStats: (userUid: string) => Promise<ConversationStatsDTO>;
  setCurrentConversation: (conversation: ConversationSessionResponseDTO | null) => void;
  clearError: () => void;
  reset: () => void;
};

// ============================================================
// Initial State
// ============================================================

const initialState = {
  conversations: [],
  currentConversation: null,
  loading: false,
  error: null,
  totalConversations: 0,
  currentPage: 0,
  totalPages: 0,
  hasMore: false,
};

// ============================================================
// Store Implementation
// ============================================================

export const useConversationStore = create<ConversationStore>((set) => ({
  ...initialState,

  // Create new conversation
  createConversation: async (params) => {
    set({ loading: true, error: null });
    try {
      const { data } = await axiosInstance.post<ConversationSessionResponseDTO>(
        conversationEndpoints.create,
        params
      );
      set((state) => ({
        conversations: [data, ...state.conversations],
        currentConversation: data,
        totalConversations: state.totalConversations + 1,
        loading: false,
      }));
      return data;
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || error.message || 'Failed to create conversation';
      set({ error: errorMessage, loading: false });
      throw new Error(errorMessage);
    }
  },

  // Get or create active conversation
  getOrCreateActiveConversation: async (params) => {
    set({ loading: true, error: null });
    try {
      const channel = params.channel || MessageChannel.IAVIA_INTERFACE_CHAT;
      const { data } = await axiosInstance.get<ConversationSessionResponseDTO>(
        conversationEndpoints.getOrCreateActive(params.userUid, params.agentUid, channel)
      );
      set({
        currentConversation: data,
        loading: false,
      });
      return data;
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || error.message || 'Failed to get or create conversation';
      set({ error: errorMessage, loading: false });
      throw new Error(errorMessage);
    }
  },

  // Get conversation by UID
  getConversation: async (conversationUid) => {
    set({ loading: true, error: null });
    try {
      const { data } = await axiosInstance.get<ConversationSessionResponseDTO>(
        conversationEndpoints.getByUid(conversationUid)
      );
      set({
        currentConversation: data,
        loading: false,
      });
      return data;
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || error.message || 'Failed to get conversation';
      set({ error: errorMessage, loading: false });
      throw new Error(errorMessage);
    }
  },

  // Get user conversations
  getUserConversations: async (params) => {
    set({ loading: true, error: null });
    try {
      const { data } = await axiosInstance.get<ConversationListResponseDTO>(
        conversationEndpoints.getUserConversations(params.userUid),
        {
          params: {
            page: params.page || 0,
            size: params.size || 20,
          },
        }
      );
      set({
        conversations: data.conversations,
        totalConversations: data.totalElements,
        currentPage: data.currentPage,
        totalPages: data.totalPages,
        hasMore: data.hasNext,
        loading: false,
      });
      return data;
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || error.message || 'Failed to fetch conversations';
      set({ error: errorMessage, loading: false });
      throw new Error(errorMessage);
    }
  },

  // Get user conversations by status
  getUserConversationsByStatus: async (params) => {
    set({ loading: true, error: null });
    try {
      const { data } = await axiosInstance.get<ConversationListResponseDTO>(
        conversationEndpoints.getUserConversationsByStatus(params.userUid, params.status),
        {
          params: {
            page: params.page || 0,
            size: params.size || 20,
          },
        }
      );
      set({
        conversations: data.conversations,
        totalConversations: data.totalElements,
        currentPage: data.currentPage,
        totalPages: data.totalPages,
        hasMore: data.hasNext,
        loading: false,
      });
      return data;
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || error.message || 'Failed to fetch conversations by status';
      set({ error: errorMessage, loading: false });
      throw new Error(errorMessage);
    }
  },

  // End conversation
  endConversation: async (conversationUid) => {
    set({ loading: true, error: null });
    try {
      const { data } = await axiosInstance.put<ConversationSessionResponseDTO>(
        conversationEndpoints.endConversation(conversationUid)
      );
      set((state) => ({
        conversations: state.conversations.map((conv) =>
          conv.uid === conversationUid ? data : conv
        ),
        currentConversation: state.currentConversation?.uid === conversationUid ? data : state.currentConversation,
        loading: false,
      }));
      return data;
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || error.message || 'Failed to end conversation';
      set({ error: errorMessage, loading: false });
      throw new Error(errorMessage);
    }
  },

  // Delete conversation
  deleteConversation: async (conversationUid) => {
    set({ loading: true, error: null });
    try {
      await axiosInstance.delete(conversationEndpoints.delete(conversationUid));
      set((state) => ({
        conversations: state.conversations.filter((conv) => conv.uid !== conversationUid),
        currentConversation: state.currentConversation?.uid === conversationUid ? null : state.currentConversation,
        totalConversations: state.totalConversations - 1,
        loading: false,
      }));
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || error.message || 'Failed to delete conversation';
      set({ error: errorMessage, loading: false });
      throw new Error(errorMessage);
    }
  },

  // Get conversation statistics
  getConversationStats: async (userUid) => {
    set({ loading: true, error: null });
    try {
      const { data} = await axiosInstance.get<ConversationStatsDTO>(
        conversationEndpoints.getStats(userUid)
      );
      set({ loading: false });
      return data;
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || error.message || 'Failed to fetch conversation stats';
      set({ error: errorMessage, loading: false });
      throw new Error(errorMessage);
    }
  },

  // Set current conversation
  setCurrentConversation: (conversation) => {
    set({ currentConversation: conversation });
  },

  // Clear error
  clearError: () => {
    set({ error: null });
  },

  // Reset store
  reset: () => {
    set(initialState);
  },
}));
