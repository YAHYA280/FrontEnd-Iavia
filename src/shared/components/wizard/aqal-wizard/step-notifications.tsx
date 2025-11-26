import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  TextField,
  Slider,
  FormControlLabel,
  Checkbox,
  Card,
  CardContent,
  Radio,
  RadioGroup,
  FormLabel,
  FormControl,
  Switch,
} from '@mui/material';
import ConditionalComponent from '@/shared/components/conditionalComponent';
import type { AgentColor } from './types';

export interface NotificationConfigProps {
  agentColor: AgentColor;
  onConfigSubmit?: (config: any) => void;
  initialConfig?: any;
}

interface NotificationType {
  enabled: boolean;
  frequency: string;
}

interface ChannelConfig {
  id: string;
  name: string;
  icon: string;
  placeholder: string;
  info: string;
  language: string;
  reminderCount: number;
  excludeWeekends: boolean;
  notificationTypes: {
    tva: NotificationType;
    is: NotificationType;
    ir: NotificationType;
    taxePro: NotificationType;
    cnss: NotificationType;
  };
}

export const StepNotificationConfig: React.FC<NotificationConfigProps> = ({
  agentColor,
  onConfigSubmit,
  initialConfig,
}) => {
  const [selectedChannel, setSelectedChannel] = useState<string | null>(null);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);

  const getInitialChannelsConfig = (): Record<string, ChannelConfig> => {
    const defaultConfig = {
      slack: {
        id: 'slack',
        name: 'Slack',
        icon: '💬',
        placeholder: 'Nom du canal Slack',
        info: '',
        language: 'fr',
        reminderCount: 3,
        excludeWeekends: false,
        notificationTypes: {
          tva: { enabled: false, frequency: 'mensuelle' },
          is: { enabled: false, frequency: 'trimestrielle' },
          ir: { enabled: false, frequency: 'annuelle' },
          taxePro: { enabled: false, frequency: 'annuelle' },
          cnss: { enabled: false, frequency: 'mensuelle' },
        },
      },
      mail: {
        id: 'mail',
        name: 'Email',
        icon: '📧',
        placeholder: 'email@exemple.com',
        info: '',
        language: 'fr',
        reminderCount: 3,
        excludeWeekends: false,
        notificationTypes: {
          tva: { enabled: false, frequency: 'mensuelle' },
          is: { enabled: false, frequency: 'trimestrielle' },
          ir: { enabled: false, frequency: 'annuelle' },
          taxePro: { enabled: false, frequency: 'annuelle' },
          cnss: { enabled: false, frequency: 'mensuelle' },
        },
      },
      teams: {
        id: 'teams',
        name: 'Microsoft Teams',
        icon: '🏢',
        placeholder: 'Nom du canal Teams',
        info: '',
        language: 'fr',
        reminderCount: 3,
        excludeWeekends: false,
        notificationTypes: {
          tva: { enabled: false, frequency: 'mensuelle' },
          is: { enabled: false, frequency: 'trimestrielle' },
          ir: { enabled: false, frequency: 'annuelle' },
          taxePro: { enabled: false, frequency: 'annuelle' },
          cnss: { enabled: false, frequency: 'mensuelle' },
        },
      },
    };

    if (initialConfig) {
      return {
        ...defaultConfig,
        ...initialConfig,
      };
    }

    return defaultConfig;
  };

  const [channelsConfig, setChannelsConfig] =
    useState<Record<string, ChannelConfig>>(getInitialChannelsConfig);

  const languages = [
    { id: 'fr', title: 'Français', icon: '🇫🇷' },
    { id: 'ar', title: 'العربية', icon: '🇲🇦' },
    { id: 'en', title: 'English', icon: '🇺🇸' },
  ];

  const notificationConfigs = [
    {
      id: 'tva' as const,
      label: 'Déclaration de TVA à déposer',
      deadline: 'Avant le 20 du mois suivant',
      frequencies: [
        { value: 'mensuelle', label: 'Mensuelle' },
        { value: 'trimestrielle', label: 'Trimestrielle' },
      ],
    },
    {
      id: 'is' as const,
      label: "Paiement d'impôt à effectuer - IS",
      deadline: 'Avant le 31 mars, 30 juin, 30 sept, 31 déc',
      frequencies: [{ value: 'trimestrielle', label: 'Trimestrielle' }],
    },
    {
      id: 'ir' as const,
      label: "Paiement d'impôt à effectuer - IR",
      deadline: 'Avant le 1er mars N+1',
      frequencies: [{ value: 'annuelle', label: 'Annuelle' }],
    },
    {
      id: 'taxePro' as const,
      label: "Paiement d'impôt à effectuer - Taxe pro",
      deadline: 'Avant le 31 janvier',
      frequencies: [{ value: 'annuelle', label: 'Annuelle' }],
    },
    {
      id: 'cnss' as const,
      label: 'Déclaration des salariés dans la CNSS',
      deadline: 'Avant le 10 du mois suivant',
      frequencies: [{ value: 'mensuelle', label: 'Mensuelle' }],
    },
  ];

  useEffect(() => {
    if (hasUnsavedChanges && selectedChannel) {
      const currentConfig = channelsConfig[selectedChannel];

      const isConfigValid = currentConfig.info && currentConfig.info.trim() !== '';

      if (isConfigValid && onConfigSubmit) {
        onConfigSubmit({
          channel: selectedChannel,
          channelInfo: currentConfig.info,
          language: currentConfig.language,
          reminderCount: currentConfig.reminderCount,
          excludeWeekends: currentConfig.excludeWeekends,
          notifications: currentConfig.notificationTypes,
        });

        setHasUnsavedChanges(false);
      }
    }
  }, [channelsConfig, selectedChannel, hasUnsavedChanges, onConfigSubmit]);

  const updateChannelConfig = (channelId: string, updates: Partial<ChannelConfig>) => {
    setChannelsConfig((prev) => ({
      ...prev,
      [channelId]: { ...prev[channelId], ...updates },
    }));
    setHasUnsavedChanges(true);
  };

  const handleChannelInfoChange = (channelId: string, info: string) => {
    updateChannelConfig(channelId, { info });
  };

  const handleLanguageChange = (channelId: string, language: string) => {
    updateChannelConfig(channelId, { language });
  };

  const handleReminderCountChange = (channelId: string, count: number) => {
    updateChannelConfig(channelId, { reminderCount: count });
  };

  const handleExcludeWeekendsChange = (channelId: string, exclude: boolean) => {
    updateChannelConfig(channelId, { excludeWeekends: exclude });
  };

  const handleNotificationChange = (
    channelId: string,
    notificationId: keyof ChannelConfig['notificationTypes'],
    enabled: boolean
  ) => {
    setChannelsConfig((prev) => ({
      ...prev,
      [channelId]: {
        ...prev[channelId],
        notificationTypes: {
          ...prev[channelId].notificationTypes,
          [notificationId]: {
            ...prev[channelId].notificationTypes[notificationId],
            enabled,
          },
        },
      },
    }));
    setHasUnsavedChanges(true);
  };

  const handleFrequencyChange = (
    channelId: string,
    notificationId: keyof ChannelConfig['notificationTypes'],
    frequency: string
  ) => {
    setChannelsConfig((prev) => ({
      ...prev,
      [channelId]: {
        ...prev[channelId],
        notificationTypes: {
          ...prev[channelId].notificationTypes,
          [notificationId]: {
            ...prev[channelId].notificationTypes[notificationId],
            frequency,
          },
        },
      },
    }));
    setHasUnsavedChanges(true);
  };

  const handleLanguageToggle = (channelId: string, languageId: string) => {
    handleLanguageChange(channelId, languageId);
  };

  const handleChannelSelect = (channelId: string) => {
    setSelectedChannel(channelId);
  };

  const getCurrentChannelConfig = (): ChannelConfig | null => {
    return selectedChannel ? channelsConfig[selectedChannel] : null;
  };

  const getConfigurationProgress = () => {
    if (!selectedChannel) return { percentage: 0, completed: 0, total: 6 };

    const config = channelsConfig[selectedChannel];
    let completed = 0;
    const total = 6;

    if (config.info && config.info.trim() !== '') completed++;
    if (config.language) completed++;
    if (config.reminderCount > 0) completed++;
    completed++;
    const hasActiveNotifications = Object.values(config.notificationTypes).some(
      (notif) => notif.enabled
    );
    if (hasActiveNotifications) completed += 2;

    const percentage = Math.round((completed / total) * 100);

    return { percentage, completed, total };
  };

  const currentConfig = getCurrentChannelConfig();
  const progress = getConfigurationProgress();

  return (
    <Box sx={{ maxWidth: '900px', margin: '0 auto' }}>
      {/* Canal de notification */}
      <Box
        sx={{
          background: 'rgba(255, 255, 255, 0.03)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          border: '2px solid rgba(255, 255, 255, 0.08)',
          borderRadius: '20px',
          padding: 3.5,
          mb: 4,
        }}
      >
        <Typography
          sx={{
            fontSize: '16px',
            fontWeight: 700,
            mb: 3,
            color: '#FFF',
            fontFamily: 'var(--font-primary)',
          }}
        >
          🔔 Canaux de notification
        </Typography>

        {/* Channel Tabs */}
        <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', mb: 3 }}>
          {Object.values(channelsConfig).map((channel) => {
            const isSelected = selectedChannel === channel.id;
            const isConfigured = channel.info && channel.info.trim() !== '';

            return (
              <Box
                key={channel.id} 
                onClick={() => handleChannelSelect(channel.id)}
                sx={{
                  position: 'relative',
                  overflow: 'hidden',
                  padding: '18px 36px',
                  background: isSelected
                    ? `linear-gradient(135deg, ${agentColor.primary}, ${agentColor.primary}dd)`
                    : isConfigured
                      ? `linear-gradient(135deg, ${agentColor.primary}33, ${agentColor.primary}22)`
                      : 'rgba(0, 0, 0, 0.3)',
                  backdropFilter: 'blur(20px)',
                  WebkitBackdropFilter: 'blur(20px)',
                  border: `2px solid ${
                    isSelected
                      ? agentColor.primary
                      : isConfigured
                        ? `${agentColor.primary}66`
                        : 'rgba(255, 255, 255, 0.1)'
                  }`,
                  borderRadius: '16px',
                  cursor: 'pointer',
                  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                  fontWeight: 700,
                  fontSize: '16px',
                  color: '#FFF',
                  fontFamily: 'var(--font-primary)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1.5,
                  minHeight: '60px',
                  flex: 1,
                  justifyContent: 'center',
                  isolation: 'isolate',
                  willChange: 'transform',
                  '&:hover': {
                    borderColor: `${agentColor.primary}66`,
                    transform: 'translateY(-2px) scale(1.02)',
                    boxShadow: `0 8px 24px ${agentColor.glow}33`,
                    '& .shine-effect': {
                      transform: 'translateX(100%)',
                    },
                  },
                }}
              >
                {/* Shine effect */}
                <Box
                  className="shine-effect"
                  sx={{
                    position: 'absolute',
                    inset: 0,
                    background:
                      'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.15), transparent)',
                    transform: 'translateX(-100%)',
                    transition: 'transform 0.7s ease-out',
                    pointerEvents: 'none',
                  }}
                />
                <Box
                  sx={{
                    position: 'relative',
                    zIndex: 1,
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1.5,
                  }}
                >
                  <Box sx={{ fontSize: '24px' }}>{channel.icon}</Box>
                  <Typography sx={{ fontSize: '16px', fontWeight: 700 }}>{channel.name}</Typography>

                  <ConditionalComponent isValid={!!isConfigured}>
                    <Box
                      sx={{
                        width: '8px',
                        height: '8px',
                        borderRadius: '50%',
                        background: agentColor.primary,
                        boxShadow: `0 0 8px ${agentColor.glow}`,
                      }}
                    />
                  </ConditionalComponent>
                </Box>
              </Box>
            );
          })}
        </Box>

        {/* Channel Configuration */}
        <ConditionalComponent isValid={selectedChannel !== null && currentConfig !== null}>
          <Box>
            <Typography
              sx={{
                fontSize: '13px',
                fontWeight: 600,
                mb: 1.5,
                color: 'rgba(255, 255, 255, 0.8)',
                fontFamily: 'var(--font-primary)',
              }}
            >
              {selectedChannel === 'mail'
                ? 'Adresse email'
                : selectedChannel === 'slack'
                  ? 'Nom du canal Slack'
                  : 'Nom du canal Teams'}
            </Typography>
            <TextField
              fullWidth
              value={currentConfig?.info || ''}
              onChange={(e) => handleChannelInfoChange(selectedChannel!, e.target.value)}
              placeholder={currentConfig?.placeholder}
              sx={{
                '& .MuiOutlinedInput-root': {
                  background: 'rgba(0, 0, 0, 0.3)',
                  backdropFilter: 'blur(10px)',
                  color: '#FFF',
                  borderRadius: '12px',
                  fontFamily: 'var(--font-primary)',
                  '& fieldset': {
                    borderColor: agentColor.primary,
                    borderWidth: '2px',
                  },
                  '&:hover fieldset': {
                    borderColor: `${agentColor.primary}66`,
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: agentColor.primary,
                  },
                },
              }}
            />
          </Box>
        </ConditionalComponent>
      </Box>

      {/* Configuration spécifique au canal sélectionné */}
      <ConditionalComponent isValid={selectedChannel !== null && currentConfig !== null}>
        <>
          {/* Types de notifications fiscales */}
          <Box
            sx={{
              background: 'rgba(255, 255, 255, 0.03)',
              backdropFilter: 'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)',
              border: '2px solid rgba(255, 255, 255, 0.08)',
              borderRadius: '20px',
              padding: 3.5,
              mb: 4,
            }}
          >
            <Typography
              sx={{
                fontSize: '16px',
                fontWeight: 700,
                mb: 3,
                color: '#FFF',
                fontFamily: 'var(--font-primary)',
              }}
            >
              📋 Types de notifications fiscales - {currentConfig?.name}
            </Typography>

            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              {notificationConfigs.map((config) => {
                const notificationType = currentConfig?.notificationTypes[config.id];

                return (
                  <Card
                    key={config.id} 
                    sx={{
                      position: 'relative',
                      overflow: 'hidden',
                      background: notificationType?.enabled
                        ? `linear-gradient(135deg, ${agentColor.primary}12, ${agentColor.primary}06)`
                        : 'rgba(0, 0, 0, 0.2)',
                      backdropFilter: 'blur(20px)',
                      WebkitBackdropFilter: 'blur(20px)',
                      border: `2px solid ${notificationType?.enabled ? agentColor.primary : 'rgba(255, 255, 255, 0.1)'}`,
                      borderRadius: '12px',
                      transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                      cursor: 'pointer',
                      isolation: 'isolate',
                      willChange: 'transform',
                      '&:hover': {
                        background: notificationType?.enabled
                          ? `linear-gradient(135deg, ${agentColor.primary}18, ${agentColor.primary}10)`
                          : 'rgba(255, 255, 255, 0.05)',
                        borderColor: `${agentColor.primary}66`,
                        transform: 'translateY(-2px)',
                        boxShadow: notificationType?.enabled
                          ? `0 6px 20px ${agentColor.glow}33`
                          : `0 6px 20px ${agentColor.glow}22`,
                        '& .shine-effect': {
                          transform: 'translateX(100%)',
                        },
                      },
                    }}
                  >
                    {/* Shine effect */}
                    <Box
                      className="shine-effect"
                      sx={{
                        position: 'absolute',
                        inset: 0,
                        background:
                          'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.15), transparent)',
                        transform: 'translateX(-100%)',
                        transition: 'transform 0.7s ease-out',
                        pointerEvents: 'none',
                      }}
                    />

                    <CardContent
                      sx={{ p: 2.5, '&:last-child': { pb: 2.5 }, position: 'relative', zIndex: 1 }}
                    >
                      <Box
                        sx={{
                          display: 'flex',
                          alignItems: 'flex-start',
                          justifyContent: 'space-between',
                          gap: 2,
                        }}
                      >
                        {/* Contenu texte */}
                        <Box
                          sx={{ flex: 1 }}
                          onClick={() =>
                            handleNotificationChange(
                              selectedChannel!,
                              config.id,
                              !notificationType?.enabled
                            )
                          }
                        >
                          <Typography
                            sx={{
                              fontSize: '15px',
                              fontWeight: 600,
                              color: '#FFF',
                              fontFamily: 'var(--font-primary)',
                              mb: 0.5,
                            }}
                          >
                            {config.label}
                          </Typography>
                          <Typography
                            sx={{
                              fontSize: '12px',
                              color: 'rgba(255, 255, 255, 0.6)',
                              fontFamily: 'var(--font-primary)',
                              mb: 1,
                            }}
                          >
                            {config.deadline}
                          </Typography>

                          {/* Fréquence - Radio Buttons */}
                          <ConditionalComponent isValid={notificationType?.enabled === true}>
                            <Box sx={{ mt: 2 }} onClick={(e) => e.stopPropagation()}>
                              <FormControl component="fieldset" fullWidth>
                                <FormLabel
                                  component="legend"
                                  sx={{
                                    fontSize: '13px',
                                    fontWeight: 600,
                                    mb: 1,
                                    color: 'rgba(255, 255, 255, 0.8)',
                                    fontFamily: 'var(--font-primary)',
                                    '&.Mui-focused': { color: 'rgba(255, 255, 255, 0.8)' },
                                  }}
                                >
                                  Fréquence :
                                </FormLabel>
                                <RadioGroup
                                  value={notificationType?.frequency || ''}
                                  onChange={(e) => {
                                    e.stopPropagation();
                                    handleFrequencyChange(
                                      selectedChannel!,
                                      config.id,
                                      e.target.value
                                    );
                                  }}
                                >
                                  {config.frequencies.map((freq) => (
                                    <FormControlLabel
                                      key={freq.value} 
                                      value={freq.value}
                                      control={
                                        <Radio
                                          sx={{
                                            color: 'rgba(255, 255, 255, 0.6)',
                                            '&.Mui-checked': { color: agentColor.primary },
                                          }}
                                        />
                                      }
                                      label={
                                        <Typography
                                          sx={{
                                            color: '#FFF',
                                            fontWeight: 600,
                                            fontSize: '13px',
                                            fontFamily: 'var(--font-primary)',
                                          }}
                                        >
                                          {freq.label}
                                        </Typography>
                                      }
                                      sx={{
                                        alignItems: 'center',
                                        mb: 0.5,
                                        padding: '4px 8px',
                                        background: 'rgba(255, 255, 255, 0.02)',
                                        borderRadius: '8px',
                                        '&:hover': { background: 'rgba(255, 255, 255, 0.05)' },
                                      }}
                                    />
                                  ))}
                                </RadioGroup>
                              </FormControl>
                            </Box>
                          </ConditionalComponent>
                        </Box>

                        <Box
                          sx={{
                            display: 'flex',
                            alignItems: 'center',
                            height: '100%',
                            minHeight: '56px',
                          }}
                          onClick={(e) => e.stopPropagation()}
                        >
                          <Switch
                            checked={notificationType?.enabled || false}
                            onChange={(e) =>
                              handleNotificationChange(
                                selectedChannel!,
                                config.id,
                                e.target.checked
                              )
                            }
                            sx={{
                              '& .MuiSwitch-switchBase.Mui-checked': {
                                color: agentColor.primary,
                                '&:hover': {
                                  backgroundColor: 'rgba(25, 118, 210, 0.04)',
                                },
                              },
                              '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
                                backgroundColor: agentColor.primary,
                              },
                              '& .MuiSwitch-track': {
                                backgroundColor: 'rgba(255, 255, 255, 0.3)',
                              },
                            }}
                          />
                        </Box>
                      </Box>
                    </CardContent>
                  </Card>
                );
              })}
            </Box>

            {/* Langue des notifications */}
            <Box sx={{ mt: 5 }}>
              <Typography
                sx={{
                  fontSize: '15px',
                  fontWeight: 700,
                  mb: 3,
                  color: 'rgba(255, 255, 255, 0.85)',
                  fontFamily: 'var(--font-primary)',
                }}
              >
                Langue des notifications <span style={{ color: '#ef4444' }}>*</span>
              </Typography>
              <Box
                sx={{
                  display: 'grid',
                  gridTemplateColumns: { xs: 'repeat(2, 1fr)', sm: 'repeat(3, 1fr)' },
                  gap: 2,
                }}
              >
                {languages.map((language) => {
                  const isSelected = currentConfig?.language === language.id;
                  return (
                    <Box
                      key={language.id} 
                      onClick={() => handleLanguageToggle(selectedChannel!, language.id)}
                      sx={{
                        position: 'relative',
                        overflow: 'hidden',
                        background: isSelected
                          ? `linear-gradient(135deg, ${agentColor.primary}12, ${agentColor.primary}06)`
                          : 'rgba(255, 255, 255, 0.02)',
                        backdropFilter: 'blur(20px)',
                        WebkitBackdropFilter: 'blur(20px)',
                        border: isSelected
                          ? `2px solid ${agentColor.primary}`
                          : '2px solid rgba(255, 255, 255, 0.06)',
                        borderRadius: '12px',
                        padding: '16px',
                        textAlign: 'center',
                        cursor: 'pointer',
                        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                        fontWeight: 600,
                        fontSize: '15px',
                        color: '#FFF',
                        fontFamily: 'var(--font-primary)',
                        isolation: 'isolate',
                        willChange: 'transform',
                        boxShadow: isSelected ? `0 4px 16px ${agentColor.glow}` : 'none',
                        '&:hover': {
                          background: isSelected
                            ? `linear-gradient(135deg, ${agentColor.primary}18, ${agentColor.primary}10)`
                            : 'rgba(255, 255, 255, 0.04)',
                          borderColor: `${agentColor.primary}66`,
                          transform: 'translateY(-2px) scale(1.02)',
                          boxShadow: isSelected
                            ? `0 6px 20px ${agentColor.glow}33`
                            : `0 6px 20px ${agentColor.glow}22`,
                          '& .shine-effect': {
                            transform: 'translateX(100%)',
                          },
                        },
                      }}
                    >
                      {/* Shine effect */}
                      <Box
                        className="shine-effect"
                        sx={{
                          position: 'absolute',
                          inset: 0,
                          background:
                            'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.15), transparent)',
                          transform: 'translateX(-100%)',
                          transition: 'transform 0.7s ease-out',
                          pointerEvents: 'none',
                        }}
                      />
                      <Box sx={{ position: 'relative', zIndex: 1 }}>
                        {language.icon} {language.title}
                      </Box>
                    </Box>
                  );
                })}
              </Box>
            </Box>
          </Box>

          {/* Fréquence des rappels */}
          <Box
            sx={{
              background: 'rgba(255, 255, 255, 0.03)',
              backdropFilter: 'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)',
              border: '2px solid rgba(255, 255, 255, 0.08)',
              borderRadius: '20px',
              padding: 3.5,
              mb: 4,
            }}
          >
            <Typography
              sx={{
                fontSize: '16px',
                fontWeight: 700,
                mb: 3,
                color: '#FFF',
                fontFamily: 'var(--font-primary)',
              }}
            >
              ⏰ Fréquence des rappels - {currentConfig?.name}
            </Typography>

            <Box sx={{ mb: 3 }}>
              <Typography
                sx={{
                  fontSize: '13px',
                  fontWeight: 600,
                  mb: 2,
                  color: 'rgba(255, 255, 255, 0.8)',
                  fontFamily: 'var(--font-primary)',
                }}
              >
                Nombre de rappels avant échéance
              </Typography>

              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                <Typography
                  sx={{ fontSize: '12px', color: 'rgba(255, 255, 255, 0.6)', minWidth: '60px' }}
                >
                  1 rappel
                </Typography>
                <Slider
                  value={currentConfig?.reminderCount || 3}
                  onChange={(_, value) =>
                    handleReminderCountChange(selectedChannel!, value as number)
                  }
                  min={1}
                  max={5}
                  step={1}
                  sx={{
                    flex: 1,
                    color: agentColor.primary,
                    '& .MuiSlider-track': {
                      background: agentColor.primary,
                    },
                    '& .MuiSlider-thumb': {
                      background: '#FFF',
                      '&:hover, &.Mui-focusVisible': {
                        boxShadow: `0 0 0 8px ${agentColor.glow}`,
                      },
                    },
                  }}
                />
                <Typography
                  sx={{ fontSize: '12px', color: 'rgba(255, 255, 255, 0.6)', minWidth: '60px' }}
                >
                  5 rappels
                </Typography>
              </Box>

              <Box sx={{ textAlign: 'center' }}>
                <Typography
                  sx={{
                    fontSize: '18px',
                    fontWeight: 700,
                    color: agentColor.primary,
                    textShadow: `0 0 10px ${agentColor.glow}`,
                    fontFamily: 'var(--font-primary)',
                  }}
                >
                  {currentConfig?.reminderCount || 3} rappel
                  {(currentConfig?.reminderCount || 3) > 1 ? 's' : ''}
                </Typography>
              </Box>
            </Box>

            <FormControlLabel
              control={
                <Checkbox
                  checked={currentConfig?.excludeWeekends || false}
                  onChange={(e) => handleExcludeWeekendsChange(selectedChannel!, e.target.checked)}
                  sx={{
                    color: agentColor.primary,
                    '&.Mui-checked': {
                      color: agentColor.primary,
                    },
                  }}
                />
              }
              sx={{
                color: 'rgba(255, 255, 255, 0.8)',
                fontFamily: 'var(--font-primary)',
              }}
              label="Exclure les week-ends du calcul des rappels"
            />
          </Box>
        </>
      </ConditionalComponent>
    </Box>
  );
};