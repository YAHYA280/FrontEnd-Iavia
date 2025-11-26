'use client';

import { useMemo, useEffect, useReducer, useCallback, useState } from 'react';
import { useRouter } from '@/hooks';
import { AuthContext } from './auth-context';
import { paths } from '@/routes/paths';
import { Types, type AuthStateType, type ActionsType } from './types';
import { useUserStore } from '@/services/stores/user-store';
import { getTokenInfo } from '@/utils/token';
import { UserRole } from '@/types/user-service.types';
import userServiceApi from '@/services/api/user-service.api';
import type { AdminDto, CollaboratorDto } from '@/types/user-service.types';

// ----------------------------------------------------------------------

const STORAGE_KEY = 'authToken';

// ----------------------------------------------------------------------

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [authenticated, setAuthenticated] = useState(false);
  const { login: storeLogin, logout: storeLogout, setCurrentUser } = useUserStore();
  const router = useRouter();

  const initialState: AuthStateType = {
    user: null,
    loading: true,
  };

  const reducer = (state: AuthStateType, action: ActionsType): AuthStateType => {
    switch (action.type) {
      case Types.INITIAL:
        return { ...state, user: action.payload?.user || null, loading: false };
      case Types.LOGIN:
        return { ...state, user: action.payload?.user || null };
      case Types.LOGOUT:
        return { ...state, user: null };
      default:
        return state;
    }
  };

  const [state, dispatch] = useReducer(reducer, initialState);

  const fetchUser = useCallback(async (userUid: string): Promise<AdminDto | CollaboratorDto | null> => {
    try {
      try {
        const admin = await userServiceApi.admins.getByUid(userUid);
        return admin;
      } catch (adminError) {
        try {
          const collaborator = await userServiceApi.collaborators.getByUid(userUid);
          return collaborator;
        } catch (collaboratorError) {
          console.error('Utilisateur non trouvé:', collaboratorError);
          return null;
        }
      }
    } catch (error) {
      console.error('Erreur lors de la récupération de l\'utilisateur:', error);
      return null;
    }
  }, []);

  const handleLogout = useCallback(async () => {
    try {
      const connectionHistoryUid = localStorage.getItem('userConnectionHistoryUid');
      if (connectionHistoryUid) {
        await storeLogout(connectionHistoryUid);
      } else {
        localStorage.removeItem(STORAGE_KEY);
        localStorage.removeItem('refreshToken');
        localStorage.removeItem('email');
        localStorage.removeItem('expirationDurationInSec');
        localStorage.removeItem('userConnectionHistoryUid');
        localStorage.removeItem('userUid');
        localStorage.removeItem('userRole');
        localStorage.removeItem('currentUser');
      }
    } catch (error) {
      console.error('Erreur lors de la déconnexion:', error);
      localStorage.removeItem(STORAGE_KEY);
      localStorage.removeItem('refreshToken');
      localStorage.removeItem('email');
      localStorage.removeItem('expirationDurationInSec');
      localStorage.removeItem('userConnectionHistoryUid');
      localStorage.removeItem('userUid');
      localStorage.removeItem('userRole');
      localStorage.removeItem('currentUser');
    }
  }, [storeLogout]);

  const initialize = useCallback(async () => {
    try {
      const token = localStorage.getItem(STORAGE_KEY);
      const userUid = localStorage.getItem('userUid');
      const storedUser = localStorage.getItem('currentUser');

      if (token && userUid) {
        const tokenInfo = getTokenInfo(token);
        
        if (tokenInfo.isValid) {
          let user: AdminDto | CollaboratorDto | null = null;

          if (storedUser) {
            try {
              user = JSON.parse(storedUser);
            } catch (parseError) {
              console.error('Erreur lors du parsing de l\'utilisateur stocké:', parseError);
            }
          }

          if (!user) {
            user = await fetchUser(userUid);
            if (user) {
              localStorage.setItem('currentUser', JSON.stringify(user));
              setCurrentUser(user);
            }
          } else {
            setCurrentUser(user);
          }

          if (user?.role === UserRole.SUPER_ADMIN) {
            setAuthenticated(false);
            dispatch({ type: Types.INITIAL, payload: { user: null } });
            localStorage.removeItem(STORAGE_KEY);
            localStorage.removeItem('refreshToken');
            localStorage.removeItem('email');
            localStorage.removeItem('expirationDurationInSec');
            localStorage.removeItem('userConnectionHistoryUid');
            localStorage.removeItem('userUid');
            localStorage.removeItem('userRole');
            localStorage.removeItem('currentUser');
            return;
          }

          setAuthenticated(true);
          dispatch({ type: Types.INITIAL, payload: { user } });
        } else {
          setAuthenticated(false);
          dispatch({ type: Types.INITIAL, payload: { user: null } });
          await handleLogout();
        }
      } else {
        // Pas de token
        setAuthenticated(false);
        dispatch({ type: Types.INITIAL, payload: { user: null } });
      }
    } catch (error) {
      console.error('Erreur lors de l\'initialisation:', error);
      setAuthenticated(false);
      dispatch({ type: Types.INITIAL, payload: { user: null } });
    }
  }, [fetchUser, setCurrentUser, handleLogout]);

  useEffect(() => {
    initialize();
  }, [initialize]);

  useEffect(() => {
    const checkTokenValidity = () => {
      const token = localStorage.getItem(STORAGE_KEY);
      if (token) {
        const tokenInfo = getTokenInfo(token);
        if (!tokenInfo.isValid && authenticated) {
          handleLogout();
          setAuthenticated(false);
          dispatch({ type: Types.LOGOUT });
          router.push(paths.auth.login);
        }
      } else if (authenticated) {
        handleLogout();
        setAuthenticated(false);
        dispatch({ type: Types.LOGOUT });
        router.push(paths.auth.login);
      }
    };

    // Vérifier immédiatement
    checkTokenValidity();

    // Vérifier périodiquement (toutes les 30 secondes)
    const interval = setInterval(checkTokenValidity, 30000);

    // Vérifier lors des changements de visibilité de la page
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible') {
        checkTokenValidity();
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      clearInterval(interval);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [authenticated, handleLogout, router]);

  // Fonction de connexion
  const login = useCallback(
    async (username: string, password: string, ipAddress?: string) => {
      try {
        await storeLogin({
          username,
          password,
          ipAddress: ipAddress || '',
        });

        // Récupérer l'utilisateur depuis le store
        const userUid = localStorage.getItem('userUid');
        if (userUid) {
          const user = await fetchUser(userUid);
          if (user) {
            setAuthenticated(true);
            dispatch({ type: Types.LOGIN, payload: { user } });
            setCurrentUser(user);
          }
        }
      } catch (error) {
        setAuthenticated(false);
        dispatch({ type: Types.LOGOUT });
        throw error;
      }
    },
    [storeLogin, fetchUser, setCurrentUser]
  );

  // Fonction de déconnexion publique
  const logout = useCallback(async () => {
    await handleLogout();
    setAuthenticated(false);
    dispatch({ type: Types.LOGOUT });
    router.push(paths.auth.login);
  }, [handleLogout, router]);

  // Récupérer l'erreur du store
  const { error: storeError } = useUserStore();

  // Valeur mémorisée du contexte
  const memoizedValue = useMemo(
    () => ({
      user: state.user,
      authenticated,
      setAuthenticated,
      login,
      logout,
      loading: state.loading,
      userRole: state.user?.role || null,
      error: storeError,
      initialize,
    }),
    [state.user, state.loading, authenticated, login, logout, initialize, storeError]
  );

  return (
    <AuthContext.Provider value={memoizedValue}>
      {children}
    </AuthContext.Provider>
  );
}

