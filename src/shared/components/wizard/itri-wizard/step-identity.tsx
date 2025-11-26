import React from 'react';
import { Box, Typography } from '@mui/material';
import { CustomSelect } from '@/shared/components/ui/custom-select';
import { toneOptions, languages } from '@/shared/_mock/wizard-data';
import { AvailabilitySection } from './step-identity-availability';
import type { IdentityStepProps } from './types';

export const StepIdentity: React.FC<IdentityStepProps> = ({
  wizardData,
  setWizardData,
  agentColor,
  outOfHoursMessage,
  setOutOfHoursMessage,
  timezone,
  setTimezone,
  startTime,
  setStartTime,
  endTime,
  setEndTime,
  workingDays,
  setWorkingDays,
  spamKeywords,
  setSpamKeywords,
  handleLanguageToggle,
}) => (
  <Box sx={{ maxWidth: '800px', margin: '0 auto' }}>
    {/* Tone Selection */}
    <Box sx={{ mb: 5 }}>
      <Typography
        sx={{
          fontSize: '15px',
          fontWeight: 700,
          mb: 2,
          color: 'rgba(255, 255, 255, 0.85)',
          fontFamily: 'var(--font-primary)',
        }}
      >
        Tonalité de communication <span style={{ color: '#ef4444' }}>*</span>
      </Typography>
      <CustomSelect
        value={wizardData.tone || ''}
        onChange={(value) => setWizardData({ ...wizardData, tone: value })}
        options={toneOptions}
        placeholder="Sélectionnez le ton de communication"
        primaryColor={agentColor.primary}
        glowColor={agentColor.glow}
      />
    </Box>

    {/* Languages Selection */}
    <Box sx={{ mb: 5 }}>
      <Typography
        sx={{
          fontSize: '15px',
          fontWeight: 700,
          mb: 3,
          color: 'rgba(255, 255, 255, 0.85)',
          fontFamily: 'var(--font-primary)',
        }}
      >
        Langues supportées <span style={{ color: '#ef4444' }}>*</span>
      </Typography>
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: { xs: 'repeat(2, 1fr)', sm: 'repeat(3, 1fr)' },
          gap: 2,
        }}
      >
        {languages.map((language) => {
          const isSelected = wizardData.languages.includes(language.id);
          return (
            <Box
              key={language.id}
              onClick={() => handleLanguageToggle(language.id)}
              sx={{
                position: 'relative',
                overflow: 'hidden',
                background: 'rgba(255, 255, 255, 0.02)',
                backdropFilter: 'blur(10px)',
                WebkitBackdropFilter: 'blur(10px)',
                border: isSelected
                  ? `2px solid ${agentColor.primary}`
                  : '2px solid rgba(255, 255, 255, 0.06)',
                borderRadius: '12px',
                padding: '16px',
                textAlign: 'center',
                cursor: 'pointer',
                transition: 'border-color 0.3s ease, background 0.3s ease, transform 0.3s ease',
                fontWeight: 600,
                fontSize: '15px',
                color: '#FFF',
                fontFamily: 'var(--font-primary)',
                boxShadow: isSelected ? `0 4px 16px ${agentColor.glow}` : 'none',
                isolation: 'isolate',
                '&:hover': {
                  background: 'rgba(255, 255, 255, 0.04)',
                  borderColor: `${agentColor.primary}66`,
                  transform: 'scale(1.05) translateY(-2px)',
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
              <Box sx={{ position: 'relative', zIndex: 1 }}>
                {language.icon} {language.title}
              </Box>
            </Box>
          );
        })}
      </Box>
    </Box>

    {/* Availability Schedule */}
    <AvailabilitySection
      outOfHoursMessage={outOfHoursMessage}
      setOutOfHoursMessage={setOutOfHoursMessage}
      timezone={timezone}
      setTimezone={setTimezone}
      startTime={startTime}
      setStartTime={setStartTime}
      endTime={endTime}
      setEndTime={setEndTime}
      workingDays={workingDays}
      setWorkingDays={setWorkingDays}
      spamKeywords={spamKeywords}
      setSpamKeywords={setSpamKeywords}
      agentColor={agentColor}
    />
  </Box>
);
