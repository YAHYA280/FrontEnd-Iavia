import React from 'react';
import { Box, Typography } from '@mui/material';
import { CustomSelect } from '@/shared/components/ui/custom-select';
import { businessModels, teamSizes, requestVolumes } from '@/shared/_mock/wizard-data';
import type { WizardStepProps } from './types';

export const StepContext: React.FC<WizardStepProps> = ({
  wizardData,
  setWizardData,
  agentColor,
}) => (
  <Box sx={{ maxWidth: '700px', margin: '0 auto' }}>
    {/* Business Model */}
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
        Modèle commercial <span style={{ color: '#ef4444' }}>*</span>
      </Typography>
      <CustomSelect
        value={wizardData.businessModel || ''}
        onChange={(value) => setWizardData({ ...wizardData, businessModel: value })}
        options={businessModels}
        placeholder="Sélectionnez votre modèle commercial"
        primaryColor={agentColor.primary}
        glowColor={agentColor.glow}
      />
    </Box>

    {/* Team Size */}
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
        Taille d&apos;équipe <span style={{ color: '#ef4444' }}>*</span>
      </Typography>
      <CustomSelect
        value={wizardData.teamSize || ''}
        onChange={(value) => setWizardData({ ...wizardData, teamSize: value })}
        options={teamSizes}
        placeholder="Sélectionnez la taille de votre équipe"
        primaryColor={agentColor.primary}
        glowColor={agentColor.glow}
      />
    </Box>

    {/* Request Volume */}
    <Box>
      <Typography
        sx={{
          fontSize: '15px',
          fontWeight: 700,
          mb: 2,
          color: 'rgba(255, 255, 255, 0.85)',
          fontFamily: 'var(--font-primary)',
        }}
      >
        Volume de demandes par jour <span style={{ color: '#ef4444' }}>*</span>
      </Typography>
      <CustomSelect
        value={wizardData.requestVolume || ''}
        onChange={(value) => setWizardData({ ...wizardData, requestVolume: value })}
        options={requestVolumes}
        placeholder="Sélectionnez le volume de demandes"
        primaryColor={agentColor.primary}
        glowColor={agentColor.glow}
      />
    </Box>
  </Box>
);
