import React from 'react';
import { Box, Typography } from '@mui/material';
import {
  objectives,
  features,
  languages,
  toneOptions,
  businessModels,
  teamSizes,
  requestVolumes,
  communicationIntegrations,
  ticketingIntegrations,
  ecommerceIntegrations,
} from '@/shared/_mock/wizard-data';
import ConditionalComponent from '@/shared/components/conditionalComponent';
import type { ResumeStepProps } from './types';

export const StepResume: React.FC<ResumeStepProps> = ({
  wizardData,
  notifications,
  notificationChannels,
  agentColor,
}) => {
  const getSelectedItems = (ids: string[], items: any[]) => {
    return ids.map(id => items.find(item => item.id === id)).filter(Boolean);
  };

  const selectedObjectives = getSelectedItems(wizardData.objectives, objectives);
  const selectedFeatures = getSelectedItems(wizardData.features, features);
  const selectedLanguages = getSelectedItems(wizardData.languages, languages);
  const selectedCommunication = getSelectedItems(wizardData.communicationChannels, communicationIntegrations);
  const selectedTicketing = getSelectedItems(wizardData.ticketingSystems, ticketingIntegrations);
  const selectedEcommerce = getSelectedItems(wizardData.ecommerceTools, ecommerceIntegrations);

  const allIntegrations = [...selectedCommunication, ...selectedTicketing, ...selectedEcommerce];

  // Helper component for summary cards with glass effect
  const SummaryCard = ({ icon, title, children }: { icon: string; title: string; children: React.ReactNode }) => (
    <Box
      sx={{
        position: 'relative',
        overflow: 'hidden',
        background: 'rgba(255, 255, 255, 0.03)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        border: '2px solid rgba(255, 255, 255, 0.08)',
        borderRadius: '16px',
        padding: 2.5,
        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        isolation: 'isolate',
        '&:hover': {
          borderColor: `${agentColor.primary}66`,
          transform: 'translateY(-4px)',
          boxShadow: `0 8px 24px ${agentColor.glow}`,
          '& .shine-effect': {
            transform: 'translateX(100%)',
          },
        },
      }}
    >
      {/* Shine effect */}
      <Box
        className="shine-effect"
        sx={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.15), transparent)',
          transform: 'translateX(-100%)',
          transition: 'transform 0.7s ease-out',
          pointerEvents: 'none',
        }}
      />
      <Box sx={{ position: 'relative', zIndex: 1 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 2 }}>
          <Box sx={{ fontSize: '24px' }}>{icon}</Box>
          <Typography sx={{ fontSize: '17px', fontWeight: 700, color: '#FFF' }}>
            {title}
          </Typography>
        </Box>
        {children}
      </Box>
    </Box>
  );

  return (
    <Box sx={{ maxWidth: '950px', margin: '0 auto' }}>
      {/* 2 Column Grid - Card per Step */}
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', md: 'repeat(2, 1fr)' },
          gap: 2.5,
          mb: 3,
        }}
      >
        {/* Step 1: Context */}
        <ConditionalComponent isValid={!!wizardData.businessModel}>
          <SummaryCard icon="👥" title="Contexte">
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
              <Typography sx={{ fontSize: '14px', color: 'rgba(255, 255, 255, 0.85)' }}>
                <strong style={{ color: '#FFF' }}>Modèle:</strong> {businessModels.find(b => b.id === wizardData.businessModel)?.title}
              </Typography>
              <ConditionalComponent isValid={!!wizardData.teamSize}>
                <Typography sx={{ fontSize: '14px', color: 'rgba(255, 255, 255, 0.85)' }}>
                  <strong style={{ color: '#FFF' }}>Équipe:</strong> {teamSizes.find(t => t.id === wizardData.teamSize)?.title}
                </Typography>
              </ConditionalComponent>
              <ConditionalComponent isValid={!!wizardData.requestVolume}>
                <Typography sx={{ fontSize: '14px', color: 'rgba(255, 255, 255, 0.85)' }}>
                  <strong style={{ color: '#FFF' }}>Volume:</strong> {requestVolumes.find(r => r.id === wizardData.requestVolume)?.title}/jour
                </Typography>
              </ConditionalComponent>
            </Box>
          </SummaryCard>
        </ConditionalComponent>

        {/* Step 2: Objectives */}
        <ConditionalComponent isValid={selectedObjectives.length > 0}>
          <SummaryCard icon="🎯" title="Objectifs">
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
              {selectedObjectives.slice(0, 4).map(obj => (
                <Box
                  key={obj.id}
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 0.5,
                    padding: '5px 12px',
                    background: `${agentColor.primary}15`,
                    border: `1px solid ${agentColor.primary}33`,
                    borderRadius: '8px',
                  }}
                >
                  <Box sx={{ fontSize: '16px' }}>{obj.icon}</Box>
                  <Typography sx={{ fontSize: '13px', fontWeight: 600, color: '#FFF' }}>
                    {obj.title}
                  </Typography>
                </Box>
              ))}
              <ConditionalComponent isValid={selectedObjectives.length > 4}>
                <Box
                  sx={{
                    padding: '5px 12px',
                    background: 'rgba(255, 255, 255, 0.05)',
                    borderRadius: '8px',
                  }}
                >
                  <Typography sx={{ fontSize: '13px', fontWeight: 600, color: 'rgba(255, 255, 255, 0.6)' }}>
                    +{selectedObjectives.length - 4}
                  </Typography>
                </Box>
              </ConditionalComponent>
            </Box>
          </SummaryCard>
        </ConditionalComponent>

        {/* Step 3: Features */}
        <ConditionalComponent isValid={selectedFeatures.length > 0}>
          <SummaryCard icon="⚙️" title="Fonctionnalités">
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
              {selectedFeatures.slice(0, 5).map(feature => (
                <Box
                  key={feature.id}
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 0.5,
                    padding: '5px 12px',
                    background: `${agentColor.primary}15`,
                    border: `1px solid ${agentColor.primary}33`,
                    borderRadius: '8px',
                  }}
                >
                  <Box sx={{ fontSize: '14px' }}>{feature.icon}</Box>
                  <Typography sx={{ fontSize: '12px', fontWeight: 600, color: '#FFF' }}>
                    {feature.title}
                  </Typography>
                </Box>
              ))}
              <ConditionalComponent isValid={selectedFeatures.length > 5}>
                <Box
                  sx={{
                    padding: '5px 12px',
                    background: 'rgba(255, 255, 255, 0.05)',
                    borderRadius: '8px',
                  }}
                >
                  <Typography sx={{ fontSize: '12px', fontWeight: 600, color: 'rgba(255, 255, 255, 0.6)' }}>
                    +{selectedFeatures.length - 5}
                  </Typography>
                </Box>
              </ConditionalComponent>
            </Box>
          </SummaryCard>
        </ConditionalComponent>

        {/* Step 4: Identity - Tone */}
        <ConditionalComponent isValid={!!wizardData.tone}>
          <SummaryCard icon="💬" title="Identité">
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
              <Box
                sx={{
                  padding: '8px 16px',
                  background: `${agentColor.primary}15`,
                  border: `1px solid ${agentColor.primary}33`,
                  borderRadius: '10px',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 1,
                }}
              >
                <Box sx={{ fontSize: '20px' }}>🎭</Box>
                <Typography sx={{ fontSize: '14px', fontWeight: 600, color: '#FFF' }}>
                  {toneOptions.find(t => t.id === wizardData.tone)?.title}
                </Typography>
              </Box>
            </Box>
          </SummaryCard>
        </ConditionalComponent>

        {/* Step 5: Languages */}
        <ConditionalComponent isValid={selectedLanguages.length > 0}>
          <SummaryCard icon="🌐" title="Langues">
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
              {selectedLanguages.map(lang => (
                <Box
                  key={lang.id}
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 0.5,
                    padding: '5px 12px',
                    background: `${agentColor.primary}15`,
                    border: `1px solid ${agentColor.primary}33`,
                    borderRadius: '8px',
                  }}
                >
                  <Box sx={{ fontSize: '16px' }}>{lang.icon}</Box>
                  <Typography sx={{ fontSize: '13px', fontWeight: 600, color: '#FFF' }}>
                    {lang.title}
                  </Typography>
                </Box>
              ))}
            </Box>
          </SummaryCard>
        </ConditionalComponent>

        {/* Step 6: Notifications */}
        <ConditionalComponent isValid={notifications.some(n => n.enabled)}>
          <SummaryCard icon="🔔" title="Notifications">
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
              <Typography sx={{ fontSize: '14px', color: 'rgba(255, 255, 255, 0.85)' }}>
                <strong style={{ color: '#FFF' }}>Canal:</strong>{' '}
                {notificationChannels.activeChannel === 'email' ? '📧 Email' :
                 notificationChannels.activeChannel === 'whatsapp' ? '💬 WhatsApp' :
                 '📱 Telegram'}
              </Typography>
              <Typography sx={{ fontSize: '13px', color: 'rgba(255, 255, 255, 0.7)' }}>
                {notifications.filter(n => n.enabled).length} types activés
              </Typography>
            </Box>
          </SummaryCard>
        </ConditionalComponent>

        {/* Step 7: Integrations - Full Width */}
        <ConditionalComponent isValid={allIntegrations.length > 0}>
          <Box sx={{ gridColumn: { xs: '1', md: 'span 2' } }}>
            <SummaryCard icon="🔗" title="Intégrations">
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1.5 }}>
                {allIntegrations.map(integration => (
                  <Box
                    key={integration.id}
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 1,
                      padding: '6px 14px',
                      background: `${agentColor.primary}15`,
                      border: `1px solid ${agentColor.primary}33`,
                      borderRadius: '10px',
                    }}
                  >
                    <Box sx={{ fontSize: '18px' }}>{integration.icon}</Box>
                    <Typography sx={{ fontSize: '13px', fontWeight: 600, color: '#FFF' }}>
                      {integration.title}
                    </Typography>
                  </Box>
                ))}
              </Box>
            </SummaryCard>
          </Box>
        </ConditionalComponent>
      </Box>

      {/* Final CTA */}
      <Box
        sx={{
          position: 'relative',
          overflow: 'hidden',
          background: `linear-gradient(135deg, ${agentColor.primary}15, ${agentColor.primary}08)`,
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          border: `2px solid ${agentColor.primary}`,
          borderRadius: '20px',
          padding: 4,
          textAlign: 'center',
          isolation: 'isolate',
        }}
      >
        <Box sx={{ fontSize: '56px', mb: 2 }}>🚀</Box>
        <Typography sx={{ fontSize: '24px', fontWeight: 700, mb: 1, color: '#FFF' }}>
          Tout est prêt !
        </Typography>
        <Typography sx={{ fontSize: '15px', color: 'rgba(255, 255, 255, 0.8)', lineHeight: 1.6 }}>
          Cliquez sur &quot;Créer l&apos;agent&quot; pour déployer votre assistant intelligent
        </Typography>
      </Box>
    </Box>
  );
};
