import React from 'react';
import { Box, Typography, Container } from '@mui/material';
import { wizardSteps } from '@/shared/_mock/wizard-data';
import type { AgentColor } from './types';

interface ProgressBarProps {
  currentStep: number;
  totalSteps: number;
  agentColor: AgentColor;
  onGoToStep: (step: number) => void;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({
  currentStep,
  totalSteps,
  agentColor,
  onGoToStep,
}) => {
  const progress = ((currentStep - 1) / (totalSteps - 1)) * 100;

  return (
    <Box
      sx={{
        position: 'sticky',
        top: 0,
        zIndex: 100,
        background: 'rgba(10, 14, 39, 0.85)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        borderBottom: `1px solid ${agentColor.primary}22`,
        padding: { xs: '20px 16px', md: '24px 32px' },
      }}
    >
      <Container maxWidth="lg">
        {/* Progress Line */}
        <Box
          sx={{
            position: 'relative',
            mb: 2,
          }}
        >
          <Box
            sx={{
              height: '2px',
              background: 'rgba(255, 255, 255, 0.08)',
            }}
          >
            <Box
              sx={{
                height: '100%',
                background: `linear-gradient(90deg, ${agentColor.primary}, ${agentColor.primary}aa)`,
                width: `${progress}%`,
                transition: 'width 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
                boxShadow: `0 0 12px ${agentColor.glow}`,
              }}
            />
          </Box>
        </Box>

        {/* Steps Counter */}
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            overflowX: 'auto',
            gap: 2,
            '&::-webkit-scrollbar': {
              display: 'none',
            },
          }}
        >
          {wizardSteps.map((step) => (
            <Box
              key={step.id}
              onClick={() => onGoToStep(step.id)}
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: 1,
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                minWidth: { xs: '70px', md: 'auto' },
                flex: 1,
              }}
            >
              <Box
                sx={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '50%',
                  background:
                    step.id === currentStep
                      ? `linear-gradient(135deg, ${agentColor.primary}, ${agentColor.primary}dd)`
                      : step.id < currentStep
                      ? '#10b981'
                      : 'transparent',
                  border: `2px solid ${
                    step.id === currentStep
                      ? agentColor.primary
                      : step.id < currentStep
                      ? '#10b981'
                      : 'rgba(255, 255, 255, 0.2)'
                  }`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: 700,
                  fontSize: '14px',
                  color: '#FFF',
                  transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                  boxShadow:
                    step.id === currentStep
                      ? `0 4px 20px ${agentColor.glow}`
                      : step.id < currentStep
                      ? '0 4px 12px rgba(16, 185, 129, 0.4)'
                      : 'none',
                  '&:hover': {
                    transform: 'scale(1.1)',
                  },
                }}
              >
                {step.id < currentStep ? '✓' : step.id}
              </Box>
              <Typography
                sx={{
                  fontSize: { xs: '10px', md: '11px' },
                  fontWeight: 600,
                  color:
                    step.id === currentStep
                      ? agentColor.primary
                      : step.id < currentStep
                      ? '#10b981'
                      : 'rgba(255, 255, 255, 0.5)',
                  textAlign: 'center',
                  maxWidth: '80px',
                  transition: 'color 0.3s ease',
                  fontFamily: 'var(--font-primary)',
                }}
              >
                {step.label}
              </Typography>
            </Box>
          ))}
        </Box>
      </Container>
    </Box>
  );
};
