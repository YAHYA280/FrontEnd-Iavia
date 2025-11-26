import React, { useState, useEffect, useImperativeHandle, forwardRef } from 'react';
import {
  Box,
  Typography,
  useTheme,
} from '@mui/material';
import { defaultChannelSettings, PlatformChannelSettings } from '@/shared/_mock/community-manager-config';
import { PlatformSettingsBox } from './platform-settings';

export interface ChannelSettingsSectionProps {
  resetTrigger?: number;
}

export interface ChannelSettingsSectionRef {
  getPlatforms: () => PlatformChannelSettings[];
}

export const ChannelSettingsSection = forwardRef<ChannelSettingsSectionRef, ChannelSettingsSectionProps>(
  ({ resetTrigger = 0 }, ref) => {
    const theme = useTheme();
    const [platforms, setPlatforms] = useState<PlatformChannelSettings[]>(defaultChannelSettings);

    useImperativeHandle(ref, () => ({
      getPlatforms: () => platforms,
    }));

    useEffect(() => {
      if (resetTrigger > 0) {
        setPlatforms(defaultChannelSettings.map(platform => ({
          ...platform,
          settings: {
            tone: { value: '' },
            captionLength: { value: '' },
            frequency: { value: '' },
            postCount: { value: '' },
            imagesPerPost: { value: '' },
          },
        })));
      }
    }, [resetTrigger]);

    const handleSettingChange = (
      platformId: string,
      settingKey: string,
      value: string
    ) => {
      setPlatforms((prev) =>
        prev.map((platform) =>
          platform.platformId === platformId
            ? {
              ...platform,
              settings: {
                ...platform.settings,
                [settingKey]: {
                  value,
                },
              },
            }
            : platform
        )
      );
    };

    return (
      <Box
        sx={{
          mt: 4,
          p: 3,
          backgroundColor: 'rgb(12, 68, 106)',
          borderRadius: '24px',
          border: 'none',
        }}
      >
        <Typography
          variant="h6"
          sx={{
            color: '#FFF',
            fontFamily: theme.typography.fontFamily,
            fontSize: '20px',
            fontWeight: 600,
            mb: 1,
          }}
        >
          Paramètres par canal de communication
        </Typography>
        <Typography
          sx={{
            color: '#9CA3AF',
            fontFamily: theme.typography.fontFamily,
            fontSize: '16px',
            fontStyle: 'normal',
            fontWeight: 500,
            lineHeight: '121.331%',
            mb: 4,
          }}
        >
          Configurez les préférences pour chaque plateforme
        </Typography>

        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
          {platforms.map((platform) => (
            <PlatformSettingsBox
              key={platform.platformId}
              platform={platform}
              onSettingChange={handleSettingChange}
            />
          ))}
        </Box>
      </Box>
    );
  }
);

ChannelSettingsSection.displayName = 'ChannelSettingsSection';

