'use client';

import { useContext, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { AuthContext } from '@/contexts/auth/jwt/auth-context';
import { paths } from '@/routes/paths';
import { AuthConsumer } from '@/contexts/auth/jwt/auth-consumer';

type Props = {
  children: React.ReactNode;
};

export default function GuestGuard({ children }: Props) {
  return <>{children}</>;
}
