import { create } from 'zustand';
import axiosInstance from '@/utils/axios';
import { knowledgeBaseEndpoints, knowledgeBaseTextEndpoints } from '../../endpoints/agent-legal-service/knowledge-base-endpoints';
import type {
  FileMetadataDTO,
  FileUploadResultDTO,
  BulkDeleteResultDTO,
  FileSearchParams,
  KnowledgeBaseTextRequestDTO,
  KnowledgeBaseTextResponseDTO,
} from '@/shared/types/knowledge-base';

// ============================================================
// Store Type Definition
// ============================================================

type KnowledgeBaseStore = {
  // State
  files: FileMetadataDTO[];
  selectedFile: FileMetadataDTO | null;
  loading: boolean;
  uploadProgress: number;
  error: string | null;
  totalFiles: number;

  // Knowledge base text state
  knowledgeBaseText: string;
  textCharacterCount: number;
  textLoading: boolean;

  // File listing and search actions
  fetchFilesByAgent: (params: {
    adminUid: string;
    agentUid: string;
    displayName?: string;
    userUid: string;
  }) => Promise<void>;

  fetchFilesByUploader: (uploadedBy: string) => Promise<void>;

  searchFiles: (displayName: string) => Promise<void>;

  getFileMetadata: (fileUid: string) => Promise<FileMetadataDTO>;

  // File upload actions
  uploadFiles: (params: {
    files: File[];
    uploadedBy: string;
  }) => Promise<FileUploadResultDTO>;

  uploadAgentFiles: (params: {
    files: File[];
    adminUid: string;
    agentUid: string;
    uploadedBy: string;
  }) => Promise<FileUploadResultDTO>;

  // File modification actions
  renameFile: (params: {
    fileUid: string;
    newDisplayName: string;
    userUid: string;
  }) => Promise<FileMetadataDTO>;

  // File deletion actions
  deleteFile: (params: {
    fileUid: string;
    userUid: string;
  }) => Promise<void>;

  bulkDeleteFiles: (params: {
    fileUids: string[];
    userUid: string;
  }) => Promise<BulkDeleteResultDTO>;

  // File download action
  downloadFile: (params: {
    fileUid: string;
    userUid: string;
  }) => Promise<Blob>;

  // Knowledge base text actions
  fetchKnowledgeBaseText: (agentUid: string) => Promise<KnowledgeBaseTextResponseDTO>;
  updateKnowledgeBaseText: (params: {
    agentUid: string;
    text: string;
  }) => Promise<KnowledgeBaseTextResponseDTO>;

  // Utility actions
  setSelectedFile: (file: FileMetadataDTO | null) => void;
  clearError: () => void;
  reset: () => void;
};

// ============================================================
// Initial State
// ============================================================

const initialState = {
  files: [],
  selectedFile: null,
  loading: false,
  uploadProgress: 0,
  error: null,
  totalFiles: 0,
  knowledgeBaseText: '',
  textCharacterCount: 0,
  textLoading: false,
};

// ============================================================
// Store Implementation
// ============================================================

export const useKnowledgeBaseStore = create<KnowledgeBaseStore>((set, get) => ({
  ...initialState,

  // ========== FILE LISTING AND SEARCH ==========

  /**
   * Fetch files by agent UID
   */
  fetchFilesByAgent: async (params) => {
    set({ loading: true, error: null });
    try {
      const { data } = await axiosInstance.get<FileMetadataDTO[]>(
        knowledgeBaseEndpoints.getByAgent,
        {
          params: {
            adminUid: params.adminUid,
            agentUid: params.agentUid,
            displayName: params.displayName,
          },
          headers: {
            'X-User-UID': params.userUid,
          },
        }
      );

      set({
        files: data,
        totalFiles: data.length,
        loading: false,
      });
    } catch (error: any) {
      set({
        error: error?.message || 'Failed to fetch files',
        loading: false,
      });
      throw error;
    }
  },

  /**
   * Fetch files by uploader
   */
  fetchFilesByUploader: async (uploadedBy) => {
    set({ loading: true, error: null });
    try {
      const { data } = await axiosInstance.get<FileMetadataDTO[]>(
        knowledgeBaseEndpoints.getByUploader,
        {
          params: { uploadedBy },
        }
      );
      set({
        files: data,
        totalFiles: data.length,
        loading: false,
      });
    } catch (error: any) {
      set({
        error: error?.message || 'Failed to fetch files',
        loading: false,
      });
      throw error;
    }
  },

  /**
   * Search files by display name
   */
  searchFiles: async (displayName) => {
    set({ loading: true, error: null });
    try {
      const { data } = await axiosInstance.get<FileMetadataDTO[]>(
        knowledgeBaseEndpoints.search,
        {
          params: { displayName },
        }
      );
      set({
        files: data,
        totalFiles: data.length,
        loading: false,
      });
    } catch (error: any) {
      set({
        error: error?.message || 'Failed to search files',
        loading: false,
      });
      throw error;
    }
  },

  /**
   * Get file metadata by UID
   */
  getFileMetadata: async (fileUid) => {
    set({ loading: true, error: null });
    try {
      const { data } = await axiosInstance.get<FileMetadataDTO>(
        knowledgeBaseEndpoints.getMetadata(fileUid)
      );
      set({ loading: false });
      return data;
    } catch (error: any) {
      set({
        error: error?.message || 'Failed to get file metadata',
        loading: false,
      });
      throw error;
    }
  },

  // ========== FILE UPLOAD ==========

  /**
   * Upload files (family-level knowledge base)
   */
  uploadFiles: async (params) => {
    set({ loading: true, uploadProgress: 0, error: null });
    try {
      const formData = new FormData();
      params.files.forEach((file) => {
        formData.append('files', file);
      });

      const { data } = await axiosInstance.post<FileUploadResultDTO>(
        knowledgeBaseEndpoints.upload,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            uploadedBy: params.uploadedBy,
          },
          onUploadProgress: (progressEvent) => {
            const percentCompleted = progressEvent.total
              ? Math.round((progressEvent.loaded * 100) / progressEvent.total)
              : 0;
            set({ uploadProgress: percentCompleted });
          },
        }
      );

      // Add uploaded files to the store
      set((state) => ({
        files: [...state.files, ...data.uploadedFiles],
        totalFiles: state.totalFiles + data.successCount,
        loading: false,
        uploadProgress: 100,
      }));

      return data;
    } catch (error: any) {
      set({
        error: error?.message || 'Failed to upload files',
        loading: false,
        uploadProgress: 0,
      });
      throw error;
    }
  },

  /**
   * Upload agent-specific knowledge files
   */
  uploadAgentFiles: async (params) => {
    set({ loading: true, uploadProgress: 0, error: null });
    try {
      const formData = new FormData();
      params.files.forEach((file) => {
        formData.append('files', file);
      });
      formData.append('adminUid', params.adminUid);
      formData.append('agentUid', params.agentUid);

      const response = await axiosInstance.post<FileUploadResultDTO>(
        knowledgeBaseEndpoints.uploadAgent,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            uploadedBy: params.uploadedBy,
          },
          onUploadProgress: (progressEvent) => {
            const percentCompleted = progressEvent.total
              ? Math.round((progressEvent.loaded * 100) / progressEvent.total)
              : 0;
            set({ uploadProgress: percentCompleted });
          },
        }
      );

      const data = response.data;

      // Validate response structure
      if (!data || typeof data !== 'object') {
        throw new Error('Invalid response format from server');
      }

      // Ensure uploadedFiles is an array
      const uploadedFiles = Array.isArray(data.uploadedFiles) ? data.uploadedFiles : [];
      const successCount = data.successCount ?? uploadedFiles.length;

      // Add uploaded files to the store (optimistic update)
      set((state) => ({
        files: [...state.files, ...uploadedFiles],
        totalFiles: state.totalFiles + successCount,
        loading: false,
        uploadProgress: 100,
        error: null,
      }));

      return {
        ...data,
        uploadedFiles,
        successCount,
      };
    } catch (error: any) {
      const errorMessage = error?.response?.data?.message || error?.message || 'Failed to upload agent files';
      set({
        error: errorMessage,
        loading: false,
        uploadProgress: 0,
      });
      throw new Error(errorMessage);
    }
  },

  // ========== FILE MODIFICATION ==========

  /**
   * Rename a file
   */
  renameFile: async (params) => {
    set({ loading: true, error: null });
    try {
      const { data } = await axiosInstance.post<FileMetadataDTO>(
        knowledgeBaseEndpoints.rename(params.fileUid),
        null,
        {
          params: {
            newDisplayName: params.newDisplayName,
          },
          headers: {
            'X-User-UID': params.userUid,
          },
        }
      );

      // Update the file in the store
      set((state) => ({
        files: state.files.map((file) =>
          file.uid === params.fileUid ? data : file
        ),
        selectedFile:
          state.selectedFile?.uid === params.fileUid
            ? data
            : state.selectedFile,
        loading: false,
      }));

      return data;
    } catch (error: any) {
      set({
        error: error?.message || 'Failed to rename file',
        loading: false,
      });
      throw error;
    }
  },

  // ========== FILE DELETION ==========

  /**
   * Delete a single file
   */
  deleteFile: async (params) => {
    set({ loading: true, error: null });
    try {
      await axiosInstance.post(
        knowledgeBaseEndpoints.delete(params.fileUid),
        null,
        {
          headers: {
            'X-User-UID': params.userUid,
          },
        }
      );

      // Remove the file from the store
      set((state) => ({
        files: state.files.filter((file) => file.uid !== params.fileUid),
        totalFiles: state.totalFiles - 1,
        selectedFile:
          state.selectedFile?.uid === params.fileUid
            ? null
            : state.selectedFile,
        loading: false,
      }));
    } catch (error: any) {
      set({
        error: error?.message || 'Failed to delete file',
        loading: false,
      });
      throw error;
    }
  },

  /**
   * Bulk delete files
   */
  bulkDeleteFiles: async (params) => {
    set({ loading: true, error: null });
    try {
      const { data } = await axiosInstance.delete<BulkDeleteResultDTO>(
        knowledgeBaseEndpoints.bulkDelete,
        {
          data: params.fileUids,
          headers: {
            'X-User-UID': params.userUid,
          },
        }
      );

      // Remove deleted files from the store
      set((state) => ({
        files: state.files.filter(
          (file) => !data.deletedFileUids.includes(file.uid)
        ),
        totalFiles: state.totalFiles - data.successCount,
        selectedFile: data.deletedFileUids.includes(
          state.selectedFile?.uid || ''
        )
          ? null
          : state.selectedFile,
        loading: false,
      }));

      return data;
    } catch (error: any) {
      set({
        error: error?.message || 'Failed to bulk delete files',
        loading: false,
      });
      throw error;
    }
  },

  // ========== FILE DOWNLOAD ==========

  /**
   * Download a file
   */
  downloadFile: async (params) => {
    set({ loading: true, error: null });
    try {
      const { data } = await axiosInstance.get(
        knowledgeBaseEndpoints.download(params.fileUid),
        {
          headers: {
            'X-User-UID': params.userUid,
          },
          responseType: 'blob',
        }
      );
      set({ loading: false });
      return data;
    } catch (error: any) {
      set({
        error: error?.message || 'Failed to download file',
        loading: false,
      });
      throw error;
    }
  },

  // ========== KNOWLEDGE BASE TEXT ACTIONS ==========

  /**
   * Fetch knowledge base text for an agent
   */
  fetchKnowledgeBaseText: async (agentUid) => {
    set({ textLoading: true, error: null });
    try {
      const { data } = await axiosInstance.get<KnowledgeBaseTextResponseDTO>(
        knowledgeBaseTextEndpoints.getText(agentUid)
      );

      set({
        knowledgeBaseText: data.text || '',
        textCharacterCount: data.characterCount,
        textLoading: false,
      });

      return data;
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || error.message || 'Failed to fetch knowledge base text';
      set({
        error: errorMessage,
        textLoading: false,
      });
      throw new Error(errorMessage);
    }
  },

  /**
   * Update knowledge base text for an agent
   */
  updateKnowledgeBaseText: async (params) => {
    set({ textLoading: true, error: null });
    try {
      const requestBody: KnowledgeBaseTextRequestDTO = {
        text: params.text,
      };

      const { data } = await axiosInstance.post<KnowledgeBaseTextResponseDTO>(
        knowledgeBaseTextEndpoints.updateText(params.agentUid),
        requestBody
      );

      set({
        knowledgeBaseText: data.text || '',
        textCharacterCount: data.characterCount,
        textLoading: false,
      });

      return data;
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || error.message || 'Failed to update knowledge base text';
      set({
        error: errorMessage,
        textLoading: false,
      });
      throw new Error(errorMessage);
    }
  },

  // ========== UTILITY ACTIONS ==========

  /**
   * Set the selected file
   */
  setSelectedFile: (file) => {
    set({ selectedFile: file });
  },

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
