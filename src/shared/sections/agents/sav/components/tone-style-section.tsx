import { Box, Typography, Select, MenuItem, FormControl, useTheme } from '@mui/material';
import { useState, useEffect } from 'react';
import { useAgentStore } from '@/services/stores/agents/customer-care/agent.store';
import { ResponseStyle, ResponseStyleOptions, ToneVoice, ToneVoiceOptions } from '@/types/agents/customer-care/agent.types';

export interface ToneStyleSectionProps {
  subagentId?: string;
}

export const ToneStyleSection: React.FC<ToneStyleSectionProps> = ({ subagentId = 'sav-general' }) => {
  const theme = useTheme();

  subagentId = '10db104c-ce6f-4937-8a13-02ce50b96a3b'

  const {
    toneStyleConfig,
    getToneStyleConfig,
    updateToneStyleConfig,
    isLoading
  } = useAgentStore();

  const [selectedTone, setSelectedTone] = useState<ToneVoice>(
    toneStyleConfig?.toneVoice || ToneVoice.PROFESSIONAL
  );
  const [selectedStyle, setSelectedStyle] = useState<ResponseStyle>(
    toneStyleConfig?.responseStyle || ResponseStyle.CONVERSATIONAL
  );

  useEffect(() => {
    if (subagentId) {
      getToneStyleConfig(subagentId);
    }
  }, [subagentId]);

  useEffect(() => {
    if (toneStyleConfig) {
      setSelectedTone(toneStyleConfig.toneVoice);
      setSelectedStyle(toneStyleConfig.responseStyle);
    }
  }, [toneStyleConfig]);

  return (
    <Box>
      <Typography
        variant="h6"
        sx={{
          color: '#FFF',
          fontFamily: theme.typography.fontFamily,
          fontSize: '24px',
          fontWeight: 600,
          mb: 1,
        }}
      >
        Définir le ton et le style
      </Typography>
      <Typography
        variant="body1"
        sx={{
          maxWidth: '1038px',
          color: '#9CA3AF',
          fontFamily: theme.typography.fontFamily,
          fontSize: '18px',
          fontStyle: 'normal',
          fontWeight: 500,
          lineHeight: '121.331%',
          mb: 4,
        }}
      >
        Configurez la manière dont votre agent communique et répond aux clients.
      </Typography>

      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4, mt: 3 }}>
        <Box>
          <Typography
            sx={{
              color: '#FFF',
              fontFamily: theme.typography.fontFamily,
              fontSize: '18px',
              fontWeight: 600,
              mb: 2,
            }}
          >
            Ton de voix
          </Typography>
          <FormControl fullWidth>
            <Select
              value={selectedTone}
              onChange={(e) => {
                const newTone = e.target.value as ToneVoice;
                setSelectedTone(newTone);
                if (subagentId) {
                  updateToneStyleConfig(subagentId, {
                    toneVoice: newTone,
                    responseStyle: selectedStyle
                  });
                }
              }}
              MenuProps={{
                PaperProps: {
                  sx: {
                    background: '#1A1D25',
                    borderRadius: '12px',
                    border: '1px solid rgba(141, 49, 251, 0.3)',
                    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.3)',
                    '& .MuiMenuItem-root': {
                      color: '#FFF',
                      fontFamily: theme.typography.fontFamily,
                      fontSize: '14px',
                      '&:hover': {
                        background: 'rgba(141, 49, 251, 0.1)',
                      },
                      '&.Mui-selected': {
                        background: 'rgba(141, 49, 251, 0.2)',
                        '&:hover': {
                          background: 'rgba(141, 49, 251, 0.3)',
                        },
                      },
                    },
                  },
                },
              }}
              sx={{
                background: '#4C2086',
                borderRadius: '12px',
                color: '#FFF',
                '& .MuiOutlinedInput-notchedOutline': {
                  borderColor: 'rgba(141, 49, 251, 0.3)',
                },
                '&:hover .MuiOutlinedInput-notchedOutline': {
                  borderColor: 'rgba(141, 49, 251, 0.5)',
                },
                '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                  borderColor: '#8D31FB',
                },
                '& .MuiSelect-icon': {
                  color: '#FFF',
                },
              }}
            >
              {ToneVoiceOptions.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>

        <Box>
          <Typography
            sx={{
              color: '#FFF',
              fontFamily: theme.typography.fontFamily,
              fontSize: '18px',
              fontWeight: 600,
              mb: 2,
            }}
          >
            Style de réponse
          </Typography>
          <FormControl fullWidth>
            <Select
              value={selectedStyle}
              onChange={(e) => {
                const newStyle = e.target.value as ResponseStyle;
                setSelectedStyle(newStyle);
                if (subagentId) {
                  updateToneStyleConfig(subagentId, {
                    toneVoice: selectedTone,
                    responseStyle: newStyle
                  });
                }
              }}
              MenuProps={{
                PaperProps: {
                  sx: {
                    background: '#1A1D25',
                    borderRadius: '12px',
                    border: '1px solid rgba(141, 49, 251, 0.3)',
                    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.3)',
                    '& .MuiMenuItem-root': {
                      color: '#FFF',
                      fontFamily: theme.typography.fontFamily,
                      fontSize: '14px',
                      '&:hover': {
                        background: 'rgba(141, 49, 251, 0.1)',
                      },
                      '&.Mui-selected': {
                        background: 'rgba(141, 49, 251, 0.2)',
                        '&:hover': {
                          background: 'rgba(141, 49, 251, 0.3)',
                        },
                      },
                    },
                  },
                },
              }}
              sx={{
                background: '#4C2086',
                borderRadius: '12px',
                color: '#FFF',
                '& .MuiOutlinedInput-notchedOutline': {
                  borderColor: 'rgba(141, 49, 251, 0.3)',
                },
                '&:hover .MuiOutlinedInput-notchedOutline': {
                  borderColor: 'rgba(141, 49, 251, 0.5)',
                },
                '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                  borderColor: '#8D31FB',
                },
                '& .MuiSelect-icon': {
                  color: '#FFF',
                },
              }}
            >
              {ResponseStyleOptions.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
      </Box>
    </Box>
  );
};