import type { AdminDto, CollaboratorDto, UserRole } from '@/types/user-service.types';

// ----------------------------------------------------------------------

export type User = AdminDto | CollaboratorDto | null;

// ----------------------------------------------------------------------

export interface AuthStateType {
  user: User;
  loading: boolean;
}

// ----------------------------------------------------------------------

export enum Types {
  INITIAL = 'INITIAL',
  LOGIN = 'LOGIN',
  LOGOUT = 'LOGOUT',
}

// ----------------------------------------------------------------------

export interface ActionsType {
  type: Types;
  payload?: {
    user?: User;
  };
}

