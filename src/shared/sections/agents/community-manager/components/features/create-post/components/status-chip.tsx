'use client';

import React from 'react';
import { Box, Typography, Chip, useTheme } from '@mui/material';
import { PostStatus } from '@/shared/types/calendar';
import { styles } from '../dialogs/create-post-dialog/create-post-dialog.styles';

interface StatusChipProps {
  status: PostStatus;
}

export const StatusChip: React.FC<StatusChipProps> = ({ status }) => {
  const theme = useTheme();

  const getStatusLabel = () => {
    switch (status) {
      case 'scheduled':
        return 'Planifié';
      case 'published':
        return 'Publié';
      default:
        return 'Brouillon';
    }
  };

  const getStatusStyles = () => {
    switch (status) {
      case 'scheduled':
        return {
          backgroundColor: 'rgba(245, 158, 11, 0.2)',
          color: '#F59E0B',
          border: '1px solid rgba(245, 158, 11, 0.4)',
        };
      case 'published':
        return {
          backgroundColor: 'rgba(16, 185, 129, 0.2)',
          color: '#10B981',
          border: '1px solid rgba(16, 185, 129, 0.4)',
        };
      default:
        return {
          backgroundColor: 'rgba(107, 114, 128, 0.2)',
          color: '#6B7280',
          border: '1px solid rgba(107, 114, 128, 0.4)',
        };
    }
  };

  const statusStyles = getStatusStyles();

  return (
    <Box sx={{ mb: 3 }}>
      <Typography sx={styles.sectionTitle(theme)}>Statut</Typography>
      <Chip
        label={getStatusLabel()}
        sx={{
          ...statusStyles,
          fontFamily: theme.typography.fontFamily,
          fontSize: '13px',
          fontWeight: 600,
        }}
      />
    </Box>
  );
};

