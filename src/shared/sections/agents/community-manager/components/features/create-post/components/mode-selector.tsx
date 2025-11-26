'use client';

import React from 'react';
import { Box, Button } from '@mui/material';
import { FontAwesomeIcon } from '@/shared/components/fontawesome';
import { styles } from '../dialogs/create-post-dialog/create-post-dialog.styles';
import { useTheme } from '@mui/material';

type PostMode = 'manual' | 'automatic';

interface ModeSelectorProps {
  mode: PostMode;
  onModeChange: (mode: PostMode) => void;
}

export const ModeSelector: React.FC<ModeSelectorProps> = ({ mode, onModeChange }) => {
  const theme = useTheme();

  return (
    <Box sx={{ mb: 3 }}>
      <Box sx={{ display: 'flex', gap: 1 }}>
        <Button
          onClick={() => onModeChange('manual')}
          variant={mode === 'manual' ? 'contained' : 'outlined'}
          sx={styles.whenButtonManual(theme, mode === 'manual')}
          startIcon={<FontAwesomeIcon icon="pen" style={{ fontSize: '14px' }} />}
        >
          Créer manuellement
        </Button>
        <Button
          onClick={() => onModeChange('automatic')}
          variant={mode === 'automatic' ? 'contained' : 'outlined'}
          sx={styles.whenButtonAutomatic(theme, mode === 'automatic')}
          startIcon={<FontAwesomeIcon icon="wand-magic-sparkles" style={{ fontSize: '14px' }} />}
        >
          Automatique
        </Button>
      </Box>
    </Box>
  );
};

