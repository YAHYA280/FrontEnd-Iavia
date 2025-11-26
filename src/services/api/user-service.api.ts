
import axiosInstance from '@/config/axios';
import type {
  UserDto,
  AdminDto,
  CollaboratorDto,
  UserConnectionHistoryDto,
  AuthRequest,
  AuthenticationResponse,
  PageAdminDto,
  PageCollaboratorDto,
  PageUserConnectionHistoryDto,
  AdminSearchParams,
  CollaboratorSearchParams,
  PermissionType,
  UserStatus,
  IpAddressDto,
} from '@/types/user-service.types';
import { API_SERVICES } from '../config/api-services.config';

/**
 * API User Service
 * Gestion des utilisateurs (Super Admin, Admin, Collaborators)
 */
export const userServiceApi = {
  // ========== Authentication ==========
  auth: {
    /**
     * Connexion client
     */
    login: async (data: AuthRequest): Promise<AuthenticationResponse> => {
      const response = await axiosInstance.post(API_SERVICES.AUTH.CLIENT_LOGIN, data);
      return response.data;
    },


    /**
     * Déconnexion
     */
    logout: async (connectionHistoryUid: string): Promise<void> => {
      await axiosInstance.post(API_SERVICES.AUTH.LOGOUT, null, {
        params: { connectionHistoryUid },
      });
    },

    /**
     * Récupérer l'historique de connexion d'un utilisateur
     */
    getUserHistory: async (
      userUid: string,
      page: number = 0,
      size: number = 10,
      sortBy: string = 'loginDateTime',
      direction: string = 'desc'
    ): Promise<PageUserConnectionHistoryDto> => {
      const response = await axiosInstance.get(API_SERVICES.AUTH.USER_HISTORY(userUid), {
        params: { page, size, sortBy, direction },
      });
      return response.data;
    },
  },

  // ========== Super Admin Operations ==========
  superAdmin: {
    /**
     * Créer un super admin
     */
    create: async (data: UserDto): Promise<UserDto> => {
      const response = await axiosInstance.post(API_SERVICES.SUPER_ADMIN.CREATE, data);
      return response.data;
    },

    /**
     * Récupérer un utilisateur par UID
     */
    getByUid: async (uid: string): Promise<UserDto> => {
      const response = await axiosInstance.get(API_SERVICES.SUPER_ADMIN.GET_BY_UID(uid));
      return response.data;
    },

    /**
     * Mettre à jour un utilisateur
     */
    update: async (uid: string, data: UserDto): Promise<UserDto> => {
      const response = await axiosInstance.put(API_SERVICES.SUPER_ADMIN.UPDATE(uid), data);
      return response.data;
    },

    /**
     * Supprimer un utilisateur
     */
    delete: async (uid: string): Promise<UserDto> => {
      const response = await axiosInstance.put(API_SERVICES.SUPER_ADMIN.DELETE(uid));
      return response.data;
    },

    /**
     * Changer le statut d'un utilisateur
     */
    changeStatus: async (uid: string, status: UserStatus): Promise<UserDto> => {
      const response = await axiosInstance.patch(API_SERVICES.SUPER_ADMIN.CHANGE_STATUS(uid), null, {
        params: { status },
      });
      return response.data;
    },

    /**
     * Mettre à jour la dernière connexion
     */
    updateLastLogin: async (email: string): Promise<UserDto> => {
      const response = await axiosInstance.patch(API_SERVICES.SUPER_ADMIN.UPDATE_LAST_LOGIN, null, {
        params: { email },
      });
      return response.data;
    },
  },

  // ========== Admin Operations ==========
  admins: {
    /**
     * Créer un admin
     */
    create: async (data: AdminDto): Promise<AdminDto> => {
      const response = await axiosInstance.post(API_SERVICES.ADMINS.CREATE, data);
      return response.data;
    },

    /**
     * Récupérer un admin par UID
     */
    getByUid: async (uid: string): Promise<AdminDto> => {
      const response = await axiosInstance.get(API_SERVICES.ADMINS.GET_BY_UID(uid));
      return response.data;
    },

    /**
     * Récupérer un admin par Stripe Customer ID
     */
    getByStripeCustomerId: async (stripeCustomerId: string): Promise<AdminDto> => {
      const response = await axiosInstance.get(API_SERVICES.ADMINS.GET_BY_STRIPE(stripeCustomerId));
      return response.data;
    },

    /**
     * Récupérer un admin par collaborator UID
     */
    getByCollaboratorUid: async (uid: string): Promise<AdminDto> => {
      const response = await axiosInstance.get(API_SERVICES.ADMINS.GET_BY_COLLABORATOR(uid));
      return response.data;
    },

    /**
     * Mettre à jour un admin
     */
    update: async (uid: string, data: AdminDto): Promise<AdminDto> => {
      const response = await axiosInstance.put(API_SERVICES.ADMINS.UPDATE(uid), data);
      return response.data;
    },

    /**
     * Mettre à jour le Stripe Customer ID
     */
    updateStripeCustomerId: async (uid: string, stripeCustomerId: string): Promise<AdminDto> => {
      const response = await axiosInstance.put(API_SERVICES.ADMINS.UPDATE_STRIPE(uid), null, {
        params: { stripeCustomerId },
      });
      return response.data;
    },

    /**
     * Récupérer l'adresse IP d'un admin
     */
    getIpAddress: async (uid: string): Promise<IpAddressDto> => {
      const response = await axiosInstance.get(API_SERVICES.ADMINS.GET_IP_ADDRESS(uid));
      return response.data;
    },

    /**
     * Rechercher des admins avec filtres
     */
    search: async (params: AdminSearchParams): Promise<PageAdminDto> => {
      const response = await axiosInstance.get(API_SERVICES.ADMINS.SEARCH, { params });
      return response.data;
    },
  },

  // ========== Collaborator Operations ==========
  collaborators: {
    /**
     * Créer un collaborateur
     */
    create: async (data: CollaboratorDto): Promise<CollaboratorDto> => {
      const response = await axiosInstance.post(API_SERVICES.COLLABORATORS.CREATE, data);
      return response.data;
    },

    /**
     * Récupérer un collaborateur par UID
     */
    getByUid: async (uid: string): Promise<CollaboratorDto> => {
      const response = await axiosInstance.get(API_SERVICES.COLLABORATORS.GET_BY_UID(uid));
      return response.data;
    },

    /**
     * Mettre à jour un collaborateur
     */
    update: async (uid: string, data: CollaboratorDto): Promise<CollaboratorDto> => {
      const response = await axiosInstance.put(API_SERVICES.COLLABORATORS.UPDATE(uid), data);
      return response.data;
    },

    /**
     * Assigner des permissions à un collaborateur
     */
    assignPermissions: async (uid: string, permissions: PermissionType[]): Promise<CollaboratorDto> => {
      const response = await axiosInstance.put(API_SERVICES.COLLABORATORS.ASSIGN_PERMISSIONS(uid), permissions);
      return response.data;
    },

    /**
     * Lier un collaborateur à un agent
     */
    linkToAgent: async (uid: string, agentUid: string): Promise<CollaboratorDto> => {
      const response = await axiosInstance.put(API_SERVICES.COLLABORATORS.LINK_TO_AGENT(uid), null, {
        params: { agentUid },
      });
      return response.data;
    },

    /**
     * Délier un collaborateur d'un agent
     */
    unlinkFromAgent: async (uid: string, agentUid: string): Promise<CollaboratorDto> => {
      const response = await axiosInstance.put(API_SERVICES.COLLABORATORS.UNLINK_FROM_AGENT(uid), null, {
        params: { agentUid },
      });
      return response.data;
    },

    /**
     * Vérifier si un collaborateur est lié à un admin
     */
    isLinkedToAgent: async (uid: string): Promise<boolean> => {
      const response = await axiosInstance.get(API_SERVICES.COLLABORATORS.IS_LINKED_TO_AGENT(uid));
      return response.data;
    },

    /**
     * Rechercher des collaborateurs avec filtres
     */
    search: async (params: CollaboratorSearchParams): Promise<PageCollaboratorDto> => {
      const response = await axiosInstance.get(API_SERVICES.COLLABORATORS.SEARCH, { params });
      return response.data;
    },
  },
};

export default userServiceApi;