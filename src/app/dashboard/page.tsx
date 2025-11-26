'use client';

import { useEffect } from 'react';
import { useInterfaceTitle } from '@/contexts/settings/interface-title-context';
import { FloatingAgent } from '@/shared/components/animations/floating-agent';
import AuthGuard from '@/contexts/auth/guards/auth-guard';

export default function DashboardPage() {
  const { setTitle } = useInterfaceTitle();

  useEffect(() => {
    setTitle('Mes Agents');
  }, [setTitle]);

  return (

      <AuthGuard>
        <FloatingAgent />
      </AuthGuard>
  );
}
