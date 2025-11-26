'use client';

import { createContext } from 'react';
import type { AdminDto, CollaboratorDto, UserRole } from '@/types/user-service.types';

// ----------------------------------------------------------------------

export type User = AdminDto | CollaboratorDto | null;

// ----------------------------------------------------------------------

export interface AuthContextType {
  authenticated: boolean;
  loading: boolean;
  user: User;
  userRole: UserRole | null;
  error: string | null;
  login: (username: string, password: string, ipAddress?: string) => Promise<void>;
  logout: () => Promise<void>;
  setAuthenticated: (auth: boolean) => void;
  initialize: () => Promise<void>;
}

// ----------------------------------------------------------------------

export const AuthContext = createContext<AuthContextType>({} as AuthContextType);

