'use client';

import { useContext } from 'react';
import { AuthContext } from './auth-context';
import { SplashScreen } from '@/shared/components/loading-screen';

// ----------------------------------------------------------------------

type Props = {
  children: React.ReactNode;
};

// ----------------------------------------------------------------------

export function AuthConsumer({ children }: Props) {
  const auth = useContext(AuthContext);
  
  return auth.loading ? <SplashScreen /> : <>{children}</>;
}

