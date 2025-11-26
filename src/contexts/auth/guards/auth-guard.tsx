'use client';

import { useContext, useEffect } from 'react';
import { useRouter } from '@/hooks';
import { AuthContext } from '@/contexts/auth/jwt/auth-context';
import { paths } from '@/routes/paths';
import { AuthConsumer } from '@/contexts/auth/jwt/auth-consumer';

type Props = {
  children: React.ReactNode;
};

export default function AuthGuard({ children }: Props) {
  return <>{children}</>;
}
