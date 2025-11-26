import { create } from 'zustand';
import axios from '@/config/axios';
import { galleryEndpoints } from '../../endpoints/community-manager-service/gallery-endpoints';
import { GalleryMediaResponse, RegenerateImageRequest } from '../../../types/community-manager';

interface GalleryStore {
  media: GalleryMediaResponse[];
  isLoading: boolean;
  error: string | null;

  // Fetch operations
  fetchByAgent: (agentUid: string) => Promise<void>;
  searchMedia: (agentUid: string, query: string) => Promise<void>;

  // Regenerate image
  regenerateImage: (imageUid: string, request: RegenerateImageRequest) => Promise<GalleryMediaResponse>;

  // Utility
  clearError: () => void;
  reset: () => void;
}

export const useGalleryStore = create<GalleryStore>((set, get) => ({
  media: [],
  isLoading: false,
  error: null,

  fetchByAgent: async (agentUid: string) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.get<GalleryMediaResponse[]>(
        galleryEndpoints.getByAgent(agentUid)
      );
      set({ media: response.data, isLoading: false });
    } catch (error: any) {
      set({
        error: error.response?.data?.message || 'Failed to fetch gallery media',
        isLoading: false,
      });
    }
  },

  searchMedia: async (agentUid: string, query: string) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.get<GalleryMediaResponse[]>(
        galleryEndpoints.search(agentUid),
        { params: { query } }
      );
      set({ media: response.data, isLoading: false });
    } catch (error: any) {
      set({
        error: error.response?.data?.message || 'Failed to search gallery media',
        isLoading: false,
      });
    }
  },

  regenerateImage: async (imageUid: string, request: RegenerateImageRequest) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.post<GalleryMediaResponse>(
        galleryEndpoints.regenerateImage(imageUid),
        request
      );

      // Update the media item in the list
      set((state) => ({
        media: state.media.map((item) =>
          item.uid === imageUid ? response.data : item
        ),
        isLoading: false,
      }));

      return response.data;
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || 'Failed to regenerate image';
      set({ error: errorMessage, isLoading: false });
      throw error;
    }
  },

  clearError: () => set({ error: null }),

  reset: () => set({ media: [], isLoading: false, error: null }),
}));
