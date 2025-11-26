'use client';

import React from 'react';
import { Popover, Box, Typography, useTheme } from '@mui/material';
import ConditionalComponent from '@/shared/components/conditionalComponent';
import { styles } from './platforms-popover.styles';

interface Platform {
  id: string;
  name: string;
  logoSrc: string;
}

interface PlatformsPopoverProps {
  open: boolean;
  anchorEl: HTMLElement | null;
  onClose: () => void;
  platforms: Platform[];
}

export const PlatformsPopover: React.FC<PlatformsPopoverProps> = ({
  open,
  anchorEl,
  onClose,
  platforms,
}) => {
  const theme = useTheme();

  return (
    <Popover
      open={open}
      anchorEl={anchorEl}
      onClose={onClose}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'left',
      }}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'left',
      }}
      slotProps={{
        paper: {
          sx: styles.paper,
        },
      }}
    >
      <Box sx={styles.container}>
        {platforms.map((platform, index) => (
          <ConditionalComponent key={`${platform.id}-${index}`} isValid={!!platform}>
            <Box sx={styles.platformItem}>
              <Box
                component="img"
                src={platform.logoSrc}
                alt={platform.name}
                sx={styles.platformLogo}
              />
              <Typography sx={styles.platformName(theme)}>
                {platform.name}
              </Typography>
            </Box>
          </ConditionalComponent>
        ))}
      </Box>
    </Popover>
  );
};

