import React from 'react';
import { Box } from '@mui/material';
import { FontAwesomeIcon } from '@/shared/components/fontawesome';
import type { AgentColor } from './types';
import ConditionalComponent from '../../conditionalComponent';

interface NavigationButtonsProps {
  currentStep: number;
  totalSteps: number;
  agentColor: AgentColor;
  onBack: () => void;
  onNext: () => void;
}

export const NavigationButtons: React.FC<NavigationButtonsProps> = ({
  currentStep,
  totalSteps,
  agentColor,
  onBack,
  onNext,
}) => (
  <Box
    sx={{
      display: 'flex',
      justifyContent: 'space-between',
      gap: 3,
      mt: 8,
      pt: 6,
      borderTop: '1px solid rgba(255, 255, 255, 0.06)',
    }}
  >
    <Box
      component="button"
      onClick={onBack}
      sx={{
        position: 'relative',
        overflow: 'hidden',
        padding: { xs: '14px 28px', md: '16px 36px' },
        borderRadius: '16px',
        background: 'rgba(255, 255, 255, 0.02)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        color: '#FFF',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        cursor: 'pointer',
        fontWeight: 700,
        fontSize: { xs: '14px', md: '16px' },
        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        display: 'inline-flex',
        alignItems: 'center',
        gap: 1.5,
        fontFamily: 'var(--font-primary)',
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
        '&:hover': {
          background: 'rgba(255, 255, 255, 0.08)',
          backdropFilter: 'blur(16px)',
          WebkitBackdropFilter: 'blur(16px)',
          borderColor: `${agentColor.primary}66`,
          transform: 'scale(1.05) translateX(-4px)',
          boxShadow: `0 6px 20px ${agentColor.glow}`,
          '& .shine-effect': {
            transform: 'translateX(100%)',
          },
        },
        '&:active': {
          transform: 'scale(0.98)',
        },
      }}
    >
      {/* Shine animation effect */}
      <Box
        className="shine-effect"
        sx={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent)',
          transform: 'translateX(-100%)',
          transition: 'transform 0.7s ease-out',
          pointerEvents: 'none',
        }}
      />
      <Box
        sx={{ position: 'relative', zIndex: 1, display: 'flex', alignItems: 'center', gap: 1.5 }}
      >
        <FontAwesomeIcon icon="chevron-left" />
        {currentStep === 1 ? 'Retour' : 'Précédent'}
      </Box>
    </Box>
    <Box
      component="button"
      onClick={onNext}
      sx={{
        position: 'relative',
        overflow: 'hidden',
        padding: { xs: '14px 28px', md: '16px 36px' },
        borderRadius: '16px',
        background: `linear-gradient(135deg, ${agentColor.primary}, ${agentColor.primary}dd)`,
        color: '#FFF',
        border: 'none',
        cursor: 'pointer',
        fontWeight: 700,
        fontSize: { xs: '14px', md: '16px' },
        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        boxShadow: `0 4px 20px ${agentColor.glow}`,
        display: 'inline-flex',
        alignItems: 'center',
        gap: 1.5,
        fontFamily: 'var(--font-primary)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        '&:hover': {
          transform: 'scale(1.05) translateX(4px)',
          boxShadow: `0 6px 28px ${agentColor.glow}`,
          backdropFilter: 'blur(16px)',
          WebkitBackdropFilter: 'blur(16px)',
          '& .shine-effect': {
            transform: 'translateX(100%)',
          },
        },
        '&:active': {
          transform: 'scale(0.98)',
        },
      }}
    >
      {/* Shine animation effect */}
      <Box
        className="shine-effect"
        sx={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent)',
          transform: 'translateX(-100%)',
          transition: 'transform 0.7s ease-out',
          pointerEvents: 'none',
        }}
      />
      <Box
        sx={{ position: 'relative', zIndex: 1, display: 'flex', alignItems: 'center', gap: 1.5 }}
      >
        <ConditionalComponent isValid={Boolean(currentStep === totalSteps)}>
          (<>🎉 Créer l&apos;agent</>) : (
          <>
            Suivant
            <FontAwesomeIcon icon="chevron-right" />
          </>
          )
        </ConditionalComponent>
      </Box>
    </Box>
  </Box>
);
