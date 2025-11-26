import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

import type {
  AdminDto,
  CollaboratorDto,
  AuthRequest,
  AuthenticationResponse,
  PageAdminDto,
  PageCollaboratorDto,
  AdminSearchParams,
  CollaboratorSearchParams,
} from '@/types/user-service.types';

import { UserRole, PermissionType } from '@/types/user-service.types';
import userServiceApi from '@/services/api/user-service.api';

interface UserState {
  // État
  currentUser: AdminDto | CollaboratorDto | null;
  authToken: string | null;
  userRole: UserRole | null;
  isLoading: boolean;
  error: string | null;

  // Listes paginées
  admins: PageAdminDto | null;
  collaborators: PageCollaboratorDto | null;

  // Actions - Authentication
  login: (data: AuthRequest) => Promise<void>;
  logout: (connectionHistoryUid: string) => Promise<void>;
  setCurrentUser: (user: AdminDto | CollaboratorDto | null) => void;

  // Actions - Admin
  createAdmin: (data: AdminDto) => Promise<AdminDto>;
  getAdminByUid: (uid: string) => Promise<AdminDto>;
  updateAdmin: (uid: string, data: AdminDto) => Promise<AdminDto>;
  searchAdmins: (params: AdminSearchParams) => Promise<void>;
  updateStripeCustomerId: (uid: string, stripeCustomerId: string) => Promise<void>;

  // Actions - Collaborator
  createCollaborator: (data: CollaboratorDto) => Promise<CollaboratorDto>;
  getCollaboratorByUid: (uid: string) => Promise<CollaboratorDto>;
  updateCollaborator: (uid: string, data: CollaboratorDto) => Promise<CollaboratorDto>;
  assignPermissions: (uid: string, permissions: PermissionType[]) => Promise<void>;
  linkToAgent: (uid: string, agentUid: string) => Promise<void>;
  unlinkFromAgent: (uid: string, agentUid: string) => Promise<void>;
  searchCollaborators: (params: CollaboratorSearchParams) => Promise<void>;

  // Actions utilitaires
  setError: (error: string | null) => void;
  clearError: () => void;
  setLoading: (loading: boolean) => void;
}

export const useUserStore = create<UserState>()(
  devtools(
    persist(
      (set, get) => ({
        // État initial
        currentUser: null,
        authToken: null,
        userRole: null,
        isLoading: false,
        error: null,
        admins: null,
        collaborators: null,

        // ========== Authentication ==========
        login: async (data) => {
          set({ isLoading: true, error: null });
          try {
            const response = await userServiceApi.auth.login(data);

            // Stocker les informations de base dans le localStorage
            localStorage.setItem('authToken', response.token);
            localStorage.setItem('refreshToken', response.refreshToken);
            localStorage.setItem('email', response.email);
            localStorage.setItem(
              'expirationDurationInSec',
              response.expirationDurationInSec.toString()
            );
            localStorage.setItem('userConnectionHistoryUid', response.userConnectionHistoryUid);
            localStorage.setItem('userUid', response.userUid);

            // Récupérer l'utilisateur pour déterminer son rôle
            let user: AdminDto | CollaboratorDto;
            let userRole: UserRole;

            // Essayer d'abord de récupérer comme Admin
            try {
              user = await userServiceApi.admins.getByUid(response.userUid);
              userRole = UserRole.ADMIN;
            } catch (adminError) {
              // Si ce n'est pas un Admin, essayer comme Collaborator
              try {
                user = await userServiceApi.collaborators.getByUid(response.userUid);
                userRole = UserRole.COLLABORATOR;
              } catch (collaboratorError) {
                throw new Error('Utilisateur non trouvé');
              }
            }

            // Vérifier si c'est un Super Admin
            if (user.role === UserRole.SUPER_ADMIN) {
              set({
                error: 'Les Super Admins ne peuvent pas se connecter à cette application.',
                isLoading: false,
              });
              throw new Error('Les Super Admins ne peuvent pas se connecter à cette application.');
            }

            // Utiliser le rôle de l'utilisateur récupéré
            const finalRole = user.role || userRole;
            
            localStorage.setItem('userRole', finalRole);
            localStorage.setItem('currentUser', JSON.stringify(user));

            set({
              authToken: response.token,
              userRole: finalRole,
              currentUser: user,
              isLoading: false,
            });
          } catch (error: any) {
            set({
              error: error.response?.data?.message || error.message || 'Erreur lors de la connexion',
              isLoading: false,
            });
            throw error;
          }
        },

        logout: async (connectionHistoryUid: string) => {
          set({ isLoading: true, error: null });
          try {
            await userServiceApi.auth.logout(connectionHistoryUid);

            localStorage.removeItem('authToken');
            localStorage.removeItem('refreshToken');
            localStorage.removeItem('email');
            localStorage.removeItem('expirationDurationInSec');
            localStorage.removeItem('userConnectionHistoryUid');
            localStorage.removeItem('userUid');
            localStorage.removeItem('userRole');
            localStorage.removeItem('currentUser');

            set({
              currentUser: null,
              authToken: null,
              userRole: null,
              isLoading: false,
            });
          } catch (error: any) {
            set({
              error: error.response?.data?.message || 'Erreur lors de la déconnexion',
              isLoading: false,
            });
            throw error;
          }
        },

        setCurrentUser: (user) => set({ currentUser: user }),

        // ========== Admin Operations ==========
        createAdmin: async (data) => {
          set({ isLoading: true, error: null });
          try {
            const admin = await userServiceApi.admins.create(data);
            set({ isLoading: false });
            return admin;
          } catch (error: any) {
            set({
              error: error.response?.data?.message || 'Erreur lors de la création',
              isLoading: false,
            });
            throw error;
          }
        },

        getAdminByUid: async (uid) => {
          set({ isLoading: true, error: null });
          try {
            const admin = await userServiceApi.admins.getByUid(uid);
            set({ isLoading: false });
            return admin;
          } catch (error: any) {
            set({
              error: error.response?.data?.message || 'Admin non trouvé',
              isLoading: false,
            });
            throw error;
          }
        },

        updateAdmin: async (uid, data) => {
          set({ isLoading: true, error: null });
          try {
            const admin = await userServiceApi.admins.update(uid, data);
            set({ isLoading: false });
            return admin;
          } catch (error: any) {
            set({
              error: error.response?.data?.message || 'Erreur lors de la mise à jour',
              isLoading: false,
            });
            throw error;
          }
        },

        searchAdmins: async (params) => {
          set({ isLoading: true, error: null });
          try {
            const admins = await userServiceApi.admins.search(params);
            set({ admins, isLoading: false });
          } catch (error: any) {
            set({
              error: error.response?.data?.message || 'Erreur lors de la recherche',
              isLoading: false,
            });
            throw error;
          }
        },

        updateStripeCustomerId: async (uid, stripeCustomerId) => {
          set({ isLoading: true, error: null });
          try {
            await userServiceApi.admins.updateStripeCustomerId(uid, stripeCustomerId);
            set({ isLoading: false });
          } catch (error: any) {
            set({
              error: error.response?.data?.message || 'Erreur lors de la mise à jour',
              isLoading: false,
            });
            throw error;
          }
        },

        // ========== Collaborator Operations ==========
        createCollaborator: async (data) => {
          set({ isLoading: true, error: null });
          try {
            const collaborator = await userServiceApi.collaborators.create(data);
            set({ isLoading: false });
            return collaborator;
          } catch (error: any) {
            set({
              error: error.response?.data?.message || 'Erreur lors de la création',
              isLoading: false,
            });
            throw error;
          }
        },

        getCollaboratorByUid: async (uid) => {
          set({ isLoading: true, error: null });
          try {
            const collaborator = await userServiceApi.collaborators.getByUid(uid);
            set({ isLoading: false });
            return collaborator;
          } catch (error: any) {
            set({
              error: error.response?.data?.message || 'Collaborateur non trouvé',
              isLoading: false,
            });
            throw error;
          }
        },

        updateCollaborator: async (uid, data) => {
          set({ isLoading: true, error: null });
          try {
            const collaborator = await userServiceApi.collaborators.update(uid, data);
            set({ isLoading: false });
            return collaborator;
          } catch (error: any) {
            set({
              error: error.response?.data?.message || 'Erreur lors de la mise à jour',
              isLoading: false,
            });
            throw error;
          }
        },

        assignPermissions: async (uid, permissions) => {
          set({ isLoading: true, error: null });
          try {
            await userServiceApi.collaborators.assignPermissions(uid, permissions);
            set({ isLoading: false });
          } catch (error: any) {
            set({
              error: error.response?.data?.message || "Erreur lors de l'assignation",
              isLoading: false,
            });
            throw error;
          }
        },

        linkToAgent: async (uid, agentUid) => {
          set({ isLoading: true, error: null });
          try {
            await userServiceApi.collaborators.linkToAgent(uid, agentUid);
            set({ isLoading: false });
          } catch (error: any) {
            set({
              error: error.response?.data?.message || 'Erreur lors de la liaison',
              isLoading: false,
            });
            throw error;
          }
        },

        unlinkFromAgent: async (uid, agentUid) => {
          set({ isLoading: true, error: null });
          try {
            await userServiceApi.collaborators.unlinkFromAgent(uid, agentUid);
            set({ isLoading: false });
          } catch (error: any) {
            set({
              error: error.response?.data?.message || 'Erreur lors de la déliaison',
              isLoading: false,
            });
            throw error;
          }
        },

        searchCollaborators: async (params) => {
          set({ isLoading: true, error: null });
          try {
            const collaborators = await userServiceApi.collaborators.search(params);
            set({ collaborators, isLoading: false });
          } catch (error: any) {
            set({
              error: error.response?.data?.message || 'Erreur lors de la recherche',
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
      {
        name: 'user-storage',
        partialize: (state) => ({
          currentUser: state.currentUser,
          authToken: state.authToken,
          userRole: state.userRole,
        }),
      }
    ),
    { name: 'UserStore' }
  )
);