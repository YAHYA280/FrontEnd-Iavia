'use client';

import { useEffect, useState, useMemo } from 'react';
import { Box } from '@mui/material';
import { useInterfaceTitle } from '@/contexts/settings/interface-title-context';
import { AgentThemeProvider, agentColors } from '@/contexts/theme/agent-theme-context';
import { GalaxyBackground } from '@/shared/components/backgrounds/galaxy-background';
import { AgentDetailPage } from '@/shared/components/ui/agent-detail-page';
import DarkVeil from '@/shared/components/backgrounds/DarkVeil';
import { MarketplaceAgent } from '@/shared/_mock/marketplace-agents';
import { ItriWizard } from '@/shared/components/wizard/itri-wizard/index';
import type { WizardData } from '@/shared/types/wizard';
import { MarketplaceGrid } from './marketplace-grid';
import ConditionalComponent from '@/shared/components/conditionalComponent';
import { AqalWizard } from '@/shared/components/wizard/aqal-wizard';
import { AqalWizardData } from '@/shared/components/wizard/aqal-wizard/use-aqal-wizard-state';

type ViewState = 'marketplace' | 'detail' | 'wizard';

export const MarketplaceView = () => {
  const { setTitle } = useInterfaceTitle();
  const [selectedAgent, setSelectedAgent] = useState<MarketplaceAgent | null>(null);
  const [viewState, setViewState] = useState<ViewState>('marketplace');

  useEffect(() => {
    setTitle('Marketplace');
  }, [setTitle]);

  // Listen for custom reset event
  useEffect(() => {
    const handleReset = () => {
      setSelectedAgent(null);
      setViewState('marketplace');
    };

    window.addEventListener('marketplace-reset', handleReset);
    return () => window.removeEventListener('marketplace-reset', handleReset);
  }, []);

  // Get agent's primary color
  const agentPrimaryColor = useMemo(() => {
    if (!selectedAgent) return '#A855F7';
    const agentColor =
      agentColors[selectedAgent.id as keyof typeof agentColors] || agentColors.default;
    return agentColor.primary;
  }, [selectedAgent]);

  const handleAgentClick = (agent: MarketplaceAgent) => {
    setSelectedAgent(agent);
    setViewState('detail');
  };

  const handleBack = () => {
    setSelectedAgent(null);
    setViewState('marketplace');
  };

  const handleTryFree = () => {
    if (selectedAgent?.id === 'itri') {
      setViewState('wizard');
    } else if (selectedAgent?.id === 'aqal') {
      setViewState('wizard');
    } 
  };

  const handleWizardBack = () => {
    setViewState('detail');
  };

  const handleItriWizardComplete = (data: WizardData) => {
    setViewState('marketplace');
    setSelectedAgent(null);
  };

  const handleAqalWizardComplete = (data: AqalWizardData) => {
    setViewState('marketplace');
    setSelectedAgent(null);
  };

  return (
    <AgentThemeProvider>
      <Box
        sx={{
          position: 'relative',
          minHeight: '100vh',
          pb: 6,
        }}
      >
        <ConditionalComponent isValid={Boolean(viewState !== 'wizard')}>
          <GalaxyBackground enableParallax />
        </ConditionalComponent>

        <ConditionalComponent isValid={Boolean(selectedAgent) && viewState === 'detail'}>
          <Box
            sx={{
              position: 'fixed',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              zIndex: 0,
              opacity: 0.25,
            }}
          >
            <DarkVeil
              targetColor={agentPrimaryColor}
              speed={1.5}
              warpAmount={0.4}
              noiseIntensity={0.03}
            />
          </Box>
        </ConditionalComponent>

        <ConditionalComponent isValid={viewState === 'marketplace'}>
          <MarketplaceGrid onAgentClick={handleAgentClick} />
        </ConditionalComponent>
        {/* Agent Detail */}
        <ConditionalComponent isValid={viewState === 'detail' && Boolean(selectedAgent)}>
          <Box sx={{ position: 'relative', zIndex: 1 }}>
            <AgentDetailPage
              agentId={selectedAgent?.id || ''}
              agentName={selectedAgent?.name || ''}
              agentTitle={selectedAgent?.title || ''}
              avatar={selectedAgent?.avatar || ''}
              description={selectedAgent?.detailedDescription || selectedAgent?.description || ''}
              features={selectedAgent?.features || []}
              onBack={handleBack}
              onTryFree={handleTryFree}
            />
          </Box>
        </ConditionalComponent>

        <ConditionalComponent isValid={viewState === 'wizard' && selectedAgent?.id === 'itri'}>
          <ItriWizard onBack={handleWizardBack} onComplete={handleItriWizardComplete} />
        </ConditionalComponent>

        {/* Wizard AQAL */}
        <ConditionalComponent isValid={viewState === 'wizard' && selectedAgent?.id === 'aqal'}>
          <AqalWizard onBack={handleWizardBack} onComplete={handleAqalWizardComplete} />
        </ConditionalComponent>
      </Box>
    </AgentThemeProvider>
  );
};