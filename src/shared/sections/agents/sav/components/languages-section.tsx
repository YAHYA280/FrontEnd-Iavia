import { Box, Typography, TextField, Switch, FormControl, Select, MenuItem, IconButton, useMediaQuery, useTheme } from '@mui/material';
import { useState, useEffect } from 'react';
import { Language, Search } from '@mui/icons-material';
import { useAgentStore } from '@/services/stores/agents/customer-care/agent.store';

interface LanguageItem {
  languageName: string;
  languageIsoCode: string;
  isDefault: boolean;
  active: boolean;
}

export interface LanguagesSectionProps {
  subagentId?: string;
}

export const LanguagesSection: React.FC<LanguagesSectionProps> = ({ subagentId = 'sav-general' }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  subagentId = '10db104c-ce6f-4937-8a13-02ce50b96a3b';

  const {
    languageConfig,
    getLanguageConfig,
    updateLanguageConfig,
    isLoading,
    error
  } = useAgentStore();

  const [autoDetection, setAutoDetection] = useState(
    languageConfig?.autoLanguageDetection ?? true
  );

  const [defaultLanguage, setDefaultLanguage] = useState(
    languageConfig?.defaultLanguage || 'fr'
  );

  const [supportedLanguages, setSupportedLanguages] = useState<LanguageItem[]>(
    languageConfig?.languages.map(lang => ({
      languageName: lang.languageName,
      languageIsoCode: lang.languageIsoCode,
      isDefault: lang.isDefault,
      active: lang.active ?? true
    })) || []
  );

  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    if (subagentId) {
      getLanguageConfig(subagentId);
    }
  }, [subagentId]);

  useEffect(() => {
    if (languageConfig) {
      setAutoDetection(languageConfig.autoLanguageDetection);
      setDefaultLanguage(languageConfig.defaultLanguage);
      setSupportedLanguages(languageConfig.languages);
    }
  }, [languageConfig]);

  const handleToggleLanguage = async (languageIsoCode: string) => {
    const currentLang = supportedLanguages.find(lang => lang.languageIsoCode === languageIsoCode);

    if (languageIsoCode === defaultLanguage && currentLang?.active) {
      return;
    }

    const updatedLanguages = supportedLanguages.map(lang =>
      lang.languageIsoCode === languageIsoCode
        ? { ...lang, active: !lang.active }
        : lang
    );

    setSupportedLanguages(updatedLanguages);

    if (subagentId) {
      try {
        await updateLanguageConfig(subagentId, {
          autoLanguageDetection: autoDetection,
          defaultLanguageIsoCode: defaultLanguage,
          languages: updatedLanguages.map(lang => ({
            languageIsoCode: lang.languageIsoCode,
            active: lang.active ?? false
          }))
        });
      } catch (error) {
        setSupportedLanguages(supportedLanguages);
        console.error('Erreur lors de la mise à jour de la langue:', error);
      }
    }
  };

  const filteredLanguages = supportedLanguages.filter(lang =>
    lang.languageName.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
        Langues
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
        Configurez les langues supportées par votre agent.
      </Typography>

      <Box sx={{ mt: 3 }}>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: { xs: 1, sm: 2 },
            mb: 4,
            padding: { xs: '12px', sm: '16px' },
            background: '#4C2086',
            borderRadius: '12px',
            border: '1px solid rgba(141, 49, 251, 0.3)',
            flexDirection: { xs: 'column', sm: 'row' },
          }}
        >
          <IconButton
            sx={{
              color: '#BE30FF',
              padding: { xs: '6px', sm: '8px' },
              '&:hover': {
                color: '#8D31FB',
                backgroundColor: 'rgba(190, 48, 255, 0.1)',
              },
            }}
          >
            <Language sx={{ fontSize: { xs: '20px', sm: '24px' } }} />
          </IconButton>
          <Box sx={{ flex: 1, textAlign: { xs: 'center', sm: 'left' } }}>
            <Typography
              sx={{
                color: '#FFF',
                fontFamily: theme.typography.fontFamily,
                fontSize: { xs: '14px', sm: '16px' },
                fontWeight: 600,
                mb: 0.5,
              }}
            >
              Détection automatique de la langue du client
            </Typography>
            <Typography
              sx={{
                color: 'rgba(255, 255, 255, 0.7)',
                fontFamily: theme.typography.fontFamily,
                fontSize: { xs: '12px', sm: '14px' },
                fontWeight: 400,
              }}
            >
              Détecter et répondre automatiquement dans la langue du client
            </Typography>
          </Box>
          <Switch
            checked={autoDetection}
            onChange={async (e) => {
              const newAutoDetection = e.target.checked;
              setAutoDetection(newAutoDetection);

              if (subagentId) {
                try {
                  await updateLanguageConfig(subagentId, {
                    autoLanguageDetection: newAutoDetection,
                    defaultLanguageIsoCode: defaultLanguage,
                    languages: supportedLanguages.map(lang => ({
                      languageIsoCode: lang.languageIsoCode,
                      active: lang.active
                    }))
                  });
                } catch (error) {
                  setAutoDetection(!newAutoDetection);
                  console.error('Erreur lors de la mise à jour:', error);
                }
              }
            }}
            sx={{
              '& .MuiSwitch-switchBase.Mui-checked': {
                color: '#8D31FB',
                '& + .MuiSwitch-track': {
                  backgroundColor: '#8D31FB',
                },
              },
            }}
          />
        </Box>

        <Box sx={{ height: '40px' }} />

        {!autoDetection && (
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
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
                Langue par défaut
              </Typography>
              <FormControl fullWidth>
                <Select
                  value={defaultLanguage}
                  onChange={async (e) => {
                    const newDefaultLang = e.target.value;
                    setDefaultLanguage(newDefaultLang);

                    if (subagentId) {
                      try {
                        await updateLanguageConfig(subagentId, {
                          autoLanguageDetection: autoDetection,
                          defaultLanguageIsoCode: newDefaultLang,
                          languages: supportedLanguages.map(lang => ({
                            languageIsoCode: lang.languageIsoCode,
                            active: lang.active
                          }))
                        });
                      } catch (error) {
                        setDefaultLanguage(defaultLanguage);
                        console.error('Erreur lors de la mise à jour:', error);
                      }
                    }
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
                >
                  {supportedLanguages.map((lang) => (
                    <MenuItem
                      key={lang.languageIsoCode}
                      value={lang.languageIsoCode}
                      disabled={!lang.active}
                    >
                      {lang.languageName}
                      {!lang.active}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>

            <Box>
              <Box sx={{
                display: 'flex',
                flexDirection: { xs: 'column', sm: 'row' },
                justifyContent: 'space-between',
                alignItems: { xs: 'stretch', sm: 'center' },
                gap: { xs: 2, sm: 0 },
                mb: 2
              }}>
                <Typography
                  sx={{
                    color: '#FFF',
                    fontFamily: theme.typography.fontFamily,
                    fontSize: { xs: '16px', sm: '18px' },
                    fontWeight: 600,
                  }}
                >
                  Langues supportées
                </Typography>
                <Box sx={{ width: { xs: '100%', sm: '300px' } }}>
                  <TextField
                    fullWidth
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Rechercher une langue..."
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        color: '#FFF',
                        fontFamily: theme.typography.fontFamily,
                        fontSize: '14px',
                        background: '#1A1D25',
                        borderRadius: '24px',
                        border: '2px solid transparent',
                        backgroundImage: 'linear-gradient(#1A1D25, #1A1D25), linear-gradient(180deg, #BE30FF 0.66%, #5D31F8 51.44%, #00A3FF 100%)',
                        backgroundOrigin: 'border-box',
                        backgroundClip: 'padding-box, border-box',
                        boxShadow: '0 0 2px 0 rgba(0, 0, 0, 0.28), 0 16px 64px 0 rgba(0, 0, 0, 0.16)',
                        '& fieldset': {
                          border: 'none',
                        },
                        '&:hover fieldset': {
                          border: 'none',
                        },
                        '&.Mui-focused fieldset': {
                          border: 'none',
                        },
                      },
                      '& .MuiInputBase-input::placeholder': {
                        color: 'rgba(255, 255, 255, 0.5)',
                        opacity: 1,
                      },
                    }}
                    InputProps={{
                      endAdornment: (
                        <IconButton
                          sx={{
                            color: '#BE30FF',
                            padding: '4px',
                            '&:hover': {
                              color: '#8D31FB',
                              backgroundColor: 'rgba(190, 48, 255, 0.1)',
                            },
                          }}
                        >
                          <Search sx={{ fontSize: '20px' }} />
                        </IconButton>
                      ),
                    }}
                  />
                </Box>
              </Box>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                {filteredLanguages.map((language) => (
                  <Box
                    key={language.languageIsoCode}
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: { xs: '10px 12px', sm: '12px 16px' },
                      background: '#4C2086',
                      borderRadius: '12px',
                      border: '1px solid rgba(141, 49, 251, 0.3)',
                      flexDirection: { xs: 'column', sm: 'row' },
                      gap: { xs: 1, sm: 0 },
                    }}
                  >
                    <Box sx={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 1,
                      flexDirection: { xs: 'column', sm: 'row' },
                      textAlign: { xs: 'center', sm: 'left' }
                    }}>
                      <Typography
                        sx={{
                          color: '#FFF',
                          fontFamily: theme.typography.fontFamily,
                          fontSize: { xs: '14px', sm: '16px' },
                          fontWeight: 500,
                        }}
                      >
                        {language.languageName}
                      </Typography>
                      {language.languageIsoCode === defaultLanguage && (
                        <Typography
                          sx={{
                            color: '#8D31FB',
                            fontFamily: theme.typography.fontFamily,
                            fontSize: { xs: '10px', sm: '12px' },
                            fontWeight: 600,
                            backgroundColor: 'rgba(141, 49, 251, 0.2)',
                            padding: { xs: '1px 6px', sm: '2px 8px' },
                            borderRadius: '12px',
                            border: '1px solid rgba(141, 49, 251, 0.3)',
                          }}
                        >
                          Par défaut
                        </Typography>
                      )}
                    </Box>
                    <Switch
                      checked={language.active}
                      disabled={language.languageIsoCode === defaultLanguage && language.active}
                      onChange={() => handleToggleLanguage(language.languageIsoCode)}
                      sx={{
                        '& .MuiSwitch-switchBase.Mui-checked': {
                          color: '#8D31FB',
                          '& + .MuiSwitch-track': {
                            backgroundColor: '#8D31FB',
                          },
                        },
                        '& .MuiSwitch-switchBase.Mui-disabled': {
                          color: '#8D31FB',
                          '& + .MuiSwitch-track': {
                            backgroundColor: '#8D31FB',
                            opacity: 0.7,
                          },
                        },
                      }}
                    />
                  </Box>
                ))}
              </Box>
            </Box>
          </Box>
        )}
      </Box>

    </Box>
  );
};
