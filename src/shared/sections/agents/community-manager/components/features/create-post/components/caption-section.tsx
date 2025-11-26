'use client';

import React from 'react';
import { Box, Typography, Button, TextField, useTheme } from '@mui/material';
import { FontAwesomeIcon } from '@/shared/components/fontawesome';
import ConditionalComponent from '@/shared/components/conditionalComponent';
import { styles } from '../dialogs/create-post-dialog/create-post-dialog.styles';

interface CaptionSectionProps {
  caption: string;
  onCaptionChange: (value: string) => void;
  onAutoGenerate?: () => void;
  showAutoGenerate?: boolean;
}

export const CaptionSection: React.FC<CaptionSectionProps> = ({
  caption,
  onCaptionChange,
  onAutoGenerate,
  showAutoGenerate = true,
}) => {
  const theme = useTheme();

  return (
    <Box sx={{ mb: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1.5 }}>
        <Typography sx={styles.sectionTitle(theme)}>Légende</Typography>
        <ConditionalComponent isValid={!!(showAutoGenerate && onAutoGenerate)}>
          <Button
            onClick={onAutoGenerate}
            variant="outlined"
            size="small"
            startIcon={<FontAwesomeIcon icon="wand-magic-sparkles" style={{ fontSize: '12px' }} />}
            sx={styles.outlinedBlueBtn(theme)}
          >
            Auto-générer
          </Button>
        </ConditionalComponent>
      </Box>
      <TextField
        fullWidth
        multiline
        rows={4}
        value={caption}
        onChange={(e) => onCaptionChange(e.target.value)}
        placeholder="Entrez la légende de votre post..."
        sx={styles.gradientTextField(theme)}
      />
      <Typography sx={styles.captionCounter(theme)}>
        {caption.length} caractères
      </Typography>
    </Box>
  );
};

