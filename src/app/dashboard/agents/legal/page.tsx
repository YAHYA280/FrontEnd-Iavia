'use client';

import { useEffect } from 'react';
import { useInterfaceTitle } from '@/contexts/settings/interface-title-context';
import LegalAgentView from '@/shared/sections/agents/legal/view';

export default function LegalPage() {
  const { setTitle } = useInterfaceTitle();

  useEffect(() => {
    setTitle('AQAL: Votre Assistant Juridique');
  }, [setTitle]);

  return (
    <LegalAgentView />
  );
}
