import React from 'react';
import { Box, Button, Typography } from '@mui/material';
import { FontAwesomeIcon } from '@/shared/components/fontawesome';
import ConditionalComponent from '@/shared/components/conditionalComponent';
import type { IntegrationsStepProps } from './types';
import { legalCommunicationIntegrations } from '@/shared/_mock/aqal-wizard-data';

export const StepIntegrationsLegal: React.FC<IntegrationsStepProps> = ({
  wizardData,
  handleIntegrationToggle,
  agentColor,
}) => {
  const allIntegrations = legalCommunicationIntegrations.map((i) => ({
    ...i,
    category: 'communication' as const,
  }));

  return (
    <Box sx={{ maxWidth: '900px', margin: '0 auto' }}>
      <Box
        sx={{
          background: `linear-gradient(135deg, ${agentColor.primary}08, ${agentColor.primary}03)`,
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          border: `1px solid ${agentColor.primary}33`,
          borderRadius: '16px',
          padding: 2.5,
          mb: 4,
          display: 'flex',
          alignItems: 'center',
          gap: 2,
        }}
      >
        <Box sx={{ fontSize: '24px' }}>🔗</Box>
        <Typography sx={{ fontSize: '14px', color: 'rgba(255, 255, 255, 0.8)', lineHeight: 1.6 }}>
          Sélectionnez les plateformes que vous souhaitez intégrer (optionnel)
        </Typography>
      </Box>

      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: 2.5,
          width: '100%',
        }}
      >
        {allIntegrations.map((integration) => {
          const isSelected = wizardData.communicationChannels?.includes(integration.id) || false;

          return (
            <Box
              key={integration.id}
              onClick={() => handleIntegrationToggle('communication', integration.id)}
              sx={{
                position: 'relative',
                overflow: 'hidden',
                display: 'flex',
                alignItems: 'center',
                gap: 2,
                padding: '20px 24px',
                background: isSelected
                  ? `linear-gradient(135deg, ${agentColor.primary}12, ${agentColor.primary}06)`
                  : 'rgba(255, 255, 255, 0.03)',
                backdropFilter: 'blur(20px)',
                WebkitBackdropFilter: 'blur(20px)',
                borderRadius: '16px',
                cursor: 'pointer',
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                border: isSelected
                  ? `2px solid ${agentColor.primary}`
                  : '2px solid rgba(255, 255, 255, 0.08)',
                boxShadow: isSelected ? `0 4px 16px ${agentColor.glow}` : 'none',
                isolation: 'isolate',
                willChange: 'transform',
                width: '100%',
                '&:hover': {
                  background: isSelected
                    ? `linear-gradient(135deg, ${agentColor.primary}18, ${agentColor.primary}08)`
                    : 'rgba(255, 255, 255, 0.06)',
                  borderColor: `${agentColor.primary}66`,
                  transform: 'translateY(-2px)',
                  boxShadow: `0 6px 20px ${agentColor.glow}`,
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
                  background:
                    'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.15), transparent)',
                  transform: 'translateX(-100%)',
                  transition: 'transform 0.7s ease-out',
                  pointerEvents: 'none',
                }}
              />

              {/* Checkbox */}
              <Box
                sx={{
                  width: '22px',
                  height: '22px',
                  borderRadius: '6px',
                  border: `2px solid ${isSelected ? agentColor.primary : 'rgba(255, 255, 255, 0.3)'}`,
                  background: isSelected ? agentColor.primary : 'transparent',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                  transition: 'all 0.3s ease',
                  position: 'relative',
                  zIndex: 1,
                }}
              >
                <ConditionalComponent isValid={isSelected}>
                  <FontAwesomeIcon icon="check" style={{ fontSize: '11px', color: '#FFF' }} />
                </ConditionalComponent>
              </Box>

              {/* Icône */}
              <Box
                sx={{
                  fontSize: '32px',
                  flexShrink: 0,
                  position: 'relative',
                  zIndex: 1,
                  width: '50px',
                  display: 'flex',
                  justifyContent: 'center',
                }}
              >
                {integration.icon}
              </Box>

              {/* Contenu texte */}
              <Box
                sx={{
                  flex: 1,
                  position: 'relative',
                  zIndex: 1,
                  minWidth: 0,
                }}
              >
                <Typography
                  sx={{
                    fontSize: '16px',
                    fontWeight: 700,
                    mb: 0.5,
                    color: '#FFF',
                    fontFamily: 'var(--font-primary)',
                    lineHeight: 1.3,
                  }}
                >
                  {integration.title}
                </Typography>
                <Typography
                  sx={{
                    fontSize: '14px',
                    color: 'rgba(255, 255, 255, 0.65)',
                    lineHeight: 1.4,
                    fontFamily: 'var(--font-primary)',
                  }}
                >
                  {integration.description}
                </Typography>
              </Box>
            </Box>
          );
        })}
      </Box>

      <Box
        sx={{
          mt: 4,
          p: 3,
          background: 'rgba(255, 255, 255, 0.02)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          borderRadius: '12px',
          textAlign: 'center',
          width: '100%',
        }}
      >
        <Typography
          sx={{
            color: 'rgba(255, 255, 255, 0.7)',
            fontSize: '14px',
            lineHeight: 1.5,
          }}
        >
          💡 Ces intégrations sont optionnelles. Vous pourrez les configurer à l&apos;étape suivante si
          vous les sélectionnez.
        </Typography>
      </Box>
    </Box>
  );
};
