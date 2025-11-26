import React from 'react';
import {
  Box,
  Typography,
  FormControl,
  Select,
  MenuItem,
  TextField,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import { PlatformChannelSettings } from '@/shared/_mock/community-manager-config';

const toneOptions = ['Professionnel', 'Décontracté', 'Amical', 'Informatif'];
const captionLengthOptions = ['Court (50-100 mots)', 'Moyen (100-200 mots)', 'Long (200+ mots)'];
const frequencyOptions = ['Quotidien', '2-3 fois/semaine', 'Hebdomadaire', 'Mensuel'];

export interface PlatformSettingsBoxProps {
  platform: PlatformChannelSettings;
  onSettingChange: (
    platformId: string,
    settingKey: string,
    value: string
  ) => void;
}

export const PlatformSettingsBox: React.FC<PlatformSettingsBoxProps> = ({
  platform,
  onSettingChange,
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const settingLabels: Record<string, string> = {
    tone: 'Tonalité du post',
    captionLength: 'Longueur de la légende',
    frequency: 'Fréquence de publication',
    postCount: 'Nombre de posts',
    imagesPerPost: 'Nombre d\'images par post',
  };

  return (
    <Box
      sx={{
        p: 3,
        backgroundColor: 'rgb(11, 86, 136)',
        borderRadius: '16px',
        border: '1px solid rgba(6, 158, 255, 0.2)',
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
        <Box
          component="img"
          src={platform.logoSrc}
          alt={platform.platformName}
          sx={{
            width: 32,
            height: 32,
            objectFit: 'contain',
          }}
        />
        <Typography
          sx={{
            color: '#FFF',
            fontFamily: theme.typography.fontFamily,
            fontSize: '18px',
            fontWeight: 600,
          }}
        >
          {platform.platformName}
        </Typography>
      </Box>

      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: {
            xs: '1fr',
            sm: '1fr 1fr',
            md: '1fr 1fr 1fr 1fr 1fr',
          },
          gap: 2,
        }}
      >
        <Box>
          <Typography
            sx={{
              color: '#EDEDED',
              fontFamily: theme.typography.fontFamily,
              fontSize: '14px',
              fontWeight: 500,
              mb: 1,
            }}
          >
            {settingLabels.tone}
          </Typography>
          <FormControl fullWidth>
            <Select
              value={platform.settings.tone.value}
              onChange={(e) => onSettingChange(platform.platformId, 'tone', e.target.value)}
              displayEmpty
              renderValue={(selected) => {
                if (!selected) {
                  return (
                    <Typography
                      sx={{
                        color: 'rgba(255, 255, 255, 0.5)',
                        fontFamily: theme.typography.fontFamily,
                        fontSize: '14px',
                      }}
                    >
                      Sélectionnez
                    </Typography>
                  );
                }
                return selected;
              }}
              MenuProps={{
                PaperProps: {
                  sx: {
                    background: '#1A1D25',
                    borderRadius: '12px',
                    border: '1px solid rgba(6, 158, 255, 0.3)',
                    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.3)',
                    '& .MuiMenuItem-root': {
                      color: '#FFF',
                      fontFamily: theme.typography.fontFamily,
                      fontSize: '14px',
                      '&:hover': {
                        background: 'rgba(6, 158, 255, 0.1)',
                      },
                      '&.Mui-selected': {
                        background: 'rgba(6, 158, 255, 0.2)',
                        '&:hover': {
                          background: 'rgba(6, 158, 255, 0.3)',
                        },
                      },
                    },
                  },
                },
              }}
              sx={{
                background: 'rgb(12, 68, 106)',
                borderRadius: '12px',
                color: '#FFF',
                '& .MuiOutlinedInput-notchedOutline': {
                  borderColor: 'rgba(6, 158, 255, 0.3)',
                },
                '&:hover .MuiOutlinedInput-notchedOutline': {
                  borderColor: 'rgba(6, 158, 255, 0.5)',
                },
                '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                  borderColor: '#069eff',
                },
                '& .MuiSelect-icon': {
                  color: '#FFF',
                },
              }}
            >
              {toneOptions.map((option) => (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>

        <Box>
          <Typography
            sx={{
              color: '#EDEDED',
              fontFamily: theme.typography.fontFamily,
              fontSize: '14px',
              fontWeight: 500,
              mb: 1,
            }}
          >
            {settingLabels.captionLength}
          </Typography>
          <FormControl fullWidth>
            <Select
              value={platform.settings.captionLength.value}
              onChange={(e) => onSettingChange(platform.platformId, 'captionLength', e.target.value)}
              displayEmpty
              renderValue={(selected) => {
                if (!selected) {
                  return (
                    <Typography
                      sx={{
                        color: 'rgba(255, 255, 255, 0.5)',
                        fontFamily: theme.typography.fontFamily,
                        fontSize: '14px',
                      }}
                    >
                      Sélectionnez
                    </Typography>
                  );
                }
                return selected;
              }}
              MenuProps={{
                PaperProps: {
                  sx: {
                    background: '#1A1D25',
                    borderRadius: '12px',
                    border: '1px solid rgba(6, 158, 255, 0.3)',
                    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.3)',
                    '& .MuiMenuItem-root': {
                      color: '#FFF',
                      fontFamily: theme.typography.fontFamily,
                      fontSize: '14px',
                      '&:hover': {
                        background: 'rgba(6, 158, 255, 0.1)',
                      },
                      '&.Mui-selected': {
                        background: 'rgba(6, 158, 255, 0.2)',
                        '&:hover': {
                          background: 'rgba(6, 158, 255, 0.3)',
                        },
                      },
                    },
                  },
                },
              }}
              sx={{
                background: 'rgb(12, 68, 106)',
                borderRadius: '12px',
                color: '#FFF',
                '& .MuiOutlinedInput-notchedOutline': {
                  borderColor: 'rgba(6, 158, 255, 0.3)',
                },
                '&:hover .MuiOutlinedInput-notchedOutline': {
                  borderColor: 'rgba(6, 158, 255, 0.5)',
                },
                '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                  borderColor: '#069eff',
                },
                '& .MuiSelect-icon': {
                  color: '#FFF',
                },
              }}
            >
              {captionLengthOptions.map((option) => (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>

        <Box>
          <Typography
            sx={{
              color: '#EDEDED',
              fontFamily: theme.typography.fontFamily,
              fontSize: '14px',
              fontWeight: 500,
              mb: 1,
            }}
          >
            {settingLabels.frequency}
          </Typography>
          <FormControl fullWidth>
            <Select
              value={platform.settings.frequency.value}
              onChange={(e) => onSettingChange(platform.platformId, 'frequency', e.target.value)}
              displayEmpty
              renderValue={(selected) => {
                if (!selected) {
                  return (
                    <Typography
                      sx={{
                        color: 'rgba(255, 255, 255, 0.5)',
                        fontFamily: theme.typography.fontFamily,
                        fontSize: '14px',
                      }}
                    >
                      Sélectionnez
                    </Typography>
                  );
                }
                return selected;
              }}
              MenuProps={{
                PaperProps: {
                  sx: {
                    background: '#1A1D25',
                    borderRadius: '12px',
                    border: '1px solid rgba(6, 158, 255, 0.3)',
                    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.3)',
                    '& .MuiMenuItem-root': {
                      color: '#FFF',
                      fontFamily: theme.typography.fontFamily,
                      fontSize: '14px',
                      '&:hover': {
                        background: 'rgba(6, 158, 255, 0.1)',
                      },
                      '&.Mui-selected': {
                        background: 'rgba(6, 158, 255, 0.2)',
                        '&:hover': {
                          background: 'rgba(6, 158, 255, 0.3)',
                        },
                      },
                    },
                  },
                },
              }}
              sx={{
                background: 'rgb(12, 68, 106)',
                borderRadius: '12px',
                color: '#FFF',
                '& .MuiOutlinedInput-notchedOutline': {
                  borderColor: 'rgba(6, 158, 255, 0.3)',
                },
                '&:hover .MuiOutlinedInput-notchedOutline': {
                  borderColor: 'rgba(6, 158, 255, 0.5)',
                },
                '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                  borderColor: '#069eff',
                },
                '& .MuiSelect-icon': {
                  color: '#FFF',
                },
              }}
            >
              {frequencyOptions.map((option) => (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>

        <Box>
          <Typography
            sx={{
              color: '#EDEDED',
              fontFamily: theme.typography.fontFamily,
              fontSize: '14px',
              fontWeight: 500,
              mb: 1,
            }}
          >
            {settingLabels.postCount}
          </Typography>
          <TextField
            fullWidth
            type="number"
            value={platform.settings.postCount.value}
            onChange={(e) => onSettingChange(platform.platformId, 'postCount', e.target.value)}
            placeholder="Entrez un nombre"
            inputProps={{
              min: 0,
              step: 1,
            }}
            sx={{
              '& .MuiOutlinedInput-root': {
                color: '#FFF',
                fontFamily: theme.typography.fontFamily,
                fontSize: '14px',
                background: 'rgb(12, 68, 106)',
                borderRadius: '12px',
                '& .MuiOutlinedInput-notchedOutline': {
                  borderColor: 'rgba(6, 158, 255, 0.3)',
                },
                '&:hover .MuiOutlinedInput-notchedOutline': {
                  borderColor: 'rgba(6, 158, 255, 0.5)',
                },
                '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                  borderColor: '#069eff',
                },
              },
              '& .MuiInputBase-input::placeholder': {
                color: 'rgba(255, 255, 255, 0.5)',
                opacity: 1,
              },
              '& input[type=number]': {
                MozAppearance: 'textfield',
              },
              '& input[type=number]::-webkit-outer-spin-button': {
                WebkitAppearance: 'none',
                margin: 0,
              },
              '& input[type=number]::-webkit-inner-spin-button': {
                WebkitAppearance: 'none',
                margin: 0,
              },
            }}
          />
        </Box>

        <Box>
          <Typography
            sx={{
              color: '#EDEDED',
              fontFamily: theme.typography.fontFamily,
              fontSize: '14px',
              fontWeight: 500,
              mb: 1,
            }}
          >
            {settingLabels.imagesPerPost}
          </Typography>
          <TextField
            fullWidth
            type="number"
            value={platform.settings.imagesPerPost.value}
            onChange={(e) => onSettingChange(platform.platformId, 'imagesPerPost', e.target.value)}
            placeholder="Entrez un nombre"
            inputProps={{
              min: 0,
              step: 1,
            }}
            sx={{
              '& .MuiOutlinedInput-root': {
                color: '#FFF',
                fontFamily: theme.typography.fontFamily,
                fontSize: '14px',
                background: 'rgb(12, 68, 106)',
                borderRadius: '12px',
                '& .MuiOutlinedInput-notchedOutline': {
                  borderColor: 'rgba(6, 158, 255, 0.3)',
                },
                '&:hover .MuiOutlinedInput-notchedOutline': {
                  borderColor: 'rgba(6, 158, 255, 0.5)',
                },
                '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                  borderColor: '#069eff',
                },
              },
              '& .MuiInputBase-input::placeholder': {
                color: 'rgba(255, 255, 255, 0.5)',
                opacity: 1,
              },
              '& input[type=number]': {
                MozAppearance: 'textfield',
              },
              '& input[type=number]::-webkit-outer-spin-button': {
                WebkitAppearance: 'none',
                margin: 0,
              },
              '& input[type=number]::-webkit-inner-spin-button': {
                WebkitAppearance: 'none',
                margin: 0,
              },
            }}
          />
        </Box>
      </Box>
    </Box>
  );
};

