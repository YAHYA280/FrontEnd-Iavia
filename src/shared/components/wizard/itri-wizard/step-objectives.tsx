import React from 'react';
import { Box, Typography } from '@mui/material';
import { FontAwesomeIcon } from '@/shared/components/fontawesome';
import { objectives } from '@/shared/_mock/wizard-data';
import ConditionalComponent from '@/shared/components/conditionalComponent';
import type { WizardData, AgentColor } from './types';

interface StepObjectivesProps {
  wizardData: WizardData;
  handleObjectiveToggle: (objectiveId: string) => void;
  agentColor: AgentColor;
}

export const StepObjectives: React.FC<StepObjectivesProps> = ({
  wizardData,
  handleObjectiveToggle,
  agentColor,
}) => (
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
      <Box sx={{ fontSize: '24px' }}>💡</Box>
      <Typography sx={{ fontSize: '14px', color: 'rgba(255, 255, 255, 0.8)', lineHeight: 1.6 }}>
        Sélectionnez jusqu&apos;à 3 objectifs qui correspondent le mieux à vos priorités actuelles
      </Typography>
    </Box>

    <Box
      sx={{
        display: 'grid',
        gridTemplateColumns: { xs: '1fr', md: 'repeat(2, 1fr)' },
        gap: 2.5,
      }}
    >
      {objectives.map((objective) => {
        const isSelected = wizardData.objectives.includes(objective.id);
        return (
          <Box
            key={objective.id}
            onClick={() => handleObjectiveToggle(objective.id)}
            sx={{
              position: 'relative',
              overflow: 'hidden',
              display: 'flex',
              alignItems: 'center',
              gap: 2,
              padding: '16px 20px',
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
                background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.15), transparent)',
                transform: 'translateX(-100%)',
                transition: 'transform 0.7s ease-out',
                pointerEvents: 'none',
              }}
            />

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
            <Box sx={{ fontSize: '28px', flexShrink: 0, position: 'relative', zIndex: 1 }}>
              {objective.icon}
            </Box>
            <Box sx={{ flex: 1, position: 'relative', zIndex: 1 }}>
              <Typography
                sx={{
                  fontSize: '15px',
                  fontWeight: 700,
                  mb: 0.5,
                  color: '#FFF',
                  fontFamily: 'var(--font-primary)',
                  lineHeight: 1.3,
                }}
              >
                {objective.title}
              </Typography>
              <Typography
                sx={{
                  fontSize: '13px',
                  color: 'rgba(255, 255, 255, 0.65)',
                  lineHeight: 1.4,
                  fontFamily: 'var(--font-primary)',
                }}
              >
                {objective.description}
              </Typography>
            </Box>
          </Box>
        );
      })}
    </Box>
  </Box>
);
