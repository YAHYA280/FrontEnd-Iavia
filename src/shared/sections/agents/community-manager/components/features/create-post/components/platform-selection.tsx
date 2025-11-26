'use client';

import React from 'react';
import { Box, Typography, useTheme } from '@mui/material';
import { FontAwesomeIcon } from '@/shared/components/fontawesome';
import ConditionalComponent from '@/shared/components/conditionalComponent';
import { defaultPlatforms } from '@/shared/_mock/community-manager-config';
import { styles } from '../dialogs/create-post-dialog/create-post-dialog.styles';

interface PlatformSelectionProps {
  selectedPlatforms: string[];
  onPlatformToggle: (platformId: string) => void;
}

export const PlatformSelection: React.FC<PlatformSelectionProps> = ({
  selectedPlatforms,
  onPlatformToggle,
}) => {
  const theme = useTheme();

  return (
    <Box sx={{ mb: 3 }}>
      <Typography sx={styles.sectionTitle(theme)}>Plateformes *</Typography>
      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1.5 }}>
        {defaultPlatforms.map((platform) => (
          <Box
            key={platform.id}
            onClick={() => onPlatformToggle(platform.id)}
            sx={styles.platformCard(theme, selectedPlatforms.includes(platform.id))}
          >
            <Box
              component="img"
              src={platform.logoSrc}
              alt={platform.name}
              sx={{ width: 24, height: 24, objectFit: 'contain' }}
            />
            <Typography
              sx={{
                color: '#EDEDED',
                fontFamily: theme.typography.fontFamily,
                fontSize: '14px',
                fontWeight: 500,
              }}
            >
              {platform.name}
            </Typography>
            <ConditionalComponent isValid={selectedPlatforms.includes(platform.id)}>
              <Box sx={styles.platformCheckmark}>
                <FontAwesomeIcon icon="check" style={{ fontSize: '12px', color: '#FFF' }} />
              </Box>
            </ConditionalComponent>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

