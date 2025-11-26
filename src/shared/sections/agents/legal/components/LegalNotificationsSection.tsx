import { useState, ChangeEvent } from "react";
import {
  Card,
  Button,
  TextField,
  FormControlLabel,
  Checkbox,
  Slider,
  Typography,
  Box,
  Grid,
  FormControl,
  Select,
  MenuItem,
  Chip,
  Stack,
  useTheme,
} from "@mui/material";
import {
  Email,
  Chat,
  Send,
  Refresh,
  Notifications,
  Language,
  ArrowDropDown,
} from "@mui/icons-material";
import { styles } from "./LegalNotificationsSection.style";
import { ChannelConfig, ChannelNotifications } from "@/shared/types/configuration";

export const LegalNotificationConfig = () => {
  const theme = useTheme();
  const [selectedChannel, setSelectedChannel] = useState<string | null>(null);
  const [reminderCount, setReminderCount] = useState(3);
  const [excludeWeekends, setExcludeWeekends] = useState(false);
  
  const [channelsConfig, setChannelsConfig] = useState<Record<string, ChannelConfig>>({
    whatsapp: {
      id: "whatsapp",
      name: "WhatsApp",
      icon: Chat,
      placeholder: "+212 6XX XXX XXX",
      info: "",
      notifications: {
        tva: false,
        tvaFrequency: "mensuelle",
        payment: false,
        deadline: false,
        attestation: false,
        cnss: false,
      },
      language: "fr"
    },
    mail: {
      id: "mail",
      name: "Mail",
      icon: Email,
      placeholder: "email@exemple.com",
      info: "",
      notifications: {
        tva: false,
        tvaFrequency: "mensuelle",
        payment: false,
        deadline: false,
        attestation: false,
        cnss: false,
      },
      language: "fr"
    },
    telegram: {
      id: "telegram",
      name: "Telegram",
      icon: Send,
      placeholder: "@username",
      info: "",
      notifications: {
        tva: false,
        tvaFrequency: "mensuelle",
        payment: false,
        deadline: false,
        attestation: false,
        cnss: false,
      },
      language: "fr"
    },
  });

  const channels = [
    { id: "whatsapp", name: "WhatsApp", icon: Chat, placeholder: "+212 6XX XXX XXX" },
    { id: "mail", name: "Mail", icon: Email, placeholder: "email@exemple.com" },
    { id: "telegram", name: "Telegram", icon: Send, placeholder: "@username" },
  ];

  const notificationTypes = [
    { id: "tva", label: "Déclaration de TVA à déposer" },
    { id: "payment", label: "Paiement d'impôt à effectuer (IS, IR, taxe pro, etc.)" },
    { id: "deadline", label: "Échéance fiscale imminente" },
    { id: "attestation", label: "Attestation fiscale à renouveler" },
    { id: "cnss", label: "Déclaration des salariés dans la CNSS" },
  ];

  const languages = [
    { value: "fr", label: "Français", native: "Français" },
    { value: "ar", label: "العربية", native: "العربية" },
    { value: "en", label: "English", native: "English" },
  ];

  const handleSave = () => void 0;

  const handleChannelInfoChange = (channelId: string, value: string) => {
    setChannelsConfig(prev => ({
      ...prev,
      [channelId]: {
        ...prev[channelId],
        info: value
      }
    }));
  };

  const handleNotificationToggle = (channelId: string, notificationId: keyof ChannelNotifications) => 
    (event: ChangeEvent<HTMLInputElement>) => {
      setChannelsConfig(prev => ({
        ...prev,
        [channelId]: {
          ...prev[channelId],
          notifications: {
            ...prev[channelId].notifications,
            [notificationId]: event.target.checked
          }
        }
      }));
  };

  const handleTvaFrequencyChange = (channelId: string, value: string) => {
    setChannelsConfig(prev => ({
      ...prev,
      [channelId]: {
        ...prev[channelId],
        notifications: {
          ...prev[channelId].notifications,
          tvaFrequency: value
        }
      }
    }));
  };

  const handleLanguageChange = (channelId: string, value: string) => {
    setChannelsConfig(prev => ({
      ...prev,
      [channelId]: {
        ...prev[channelId],
        language: value
      }
    }));
  };

  const getCurrentChannel = () => {
    return selectedChannel ? channelsConfig[selectedChannel] : null;
  };

  return (
    <Box sx={styles.container}>
      <Box sx={{ mb: 4 }}>
        <Typography sx={styles.titleStyle}>
          Configuration de notification
        </Typography>
        <Typography sx={{ ...styles.textStyle, opacity: 0.8, fontSize: '16px' }}>
          Configurez vos notifications et rappels
        </Typography>
      </Box>

      <Box sx={{ maxWidth: "lg", mx: "auto" }}>
        <Card sx={styles.cardStyle}>
          <Typography sx={styles.titleStyle}>
            Canal de notification
          </Typography>
          <Grid container spacing={2}>
            {channels.map((channel) => (
              <Grid item xs={12} md={4} key={channel.id}>
                <Card
                  sx={selectedChannel === channel.id ? styles.selectedCardStyle : styles.innerCardStyle}
                  onClick={() => setSelectedChannel(channel.id)}
                >
                  <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 1 }}>
                    <channel.icon sx={{ fontSize: 32, color: '#FFF' }} />
                    <Typography sx={{ ...styles.textStyle, fontSize: '16px', fontWeight: 500 }}>
                      {channel.name}
                    </Typography>
                  </Box>
                </Card>
              </Grid>
            ))}
          </Grid>
          
          {selectedChannel && (
            <Box sx={{ mt: 3 }}>
              <Typography sx={styles.labelStyle}>
                Informations de contact ({channels.find(c => c.id === selectedChannel)?.name})
              </Typography>
              <TextField
                fullWidth
                value={channelsConfig[selectedChannel].info}
                onChange={(e) => handleChannelInfoChange(selectedChannel, e.target.value)}
                placeholder={channels.find(c => c.id === selectedChannel)?.placeholder}
                sx={styles.textFieldStyle(theme)}
                variant="outlined"
              />
            </Box>
          )}
        </Card>

        {selectedChannel && (
          <Card sx={styles.cardStyle}>
            <Typography sx={styles.titleStyle}>
              Types de notifications - {getCurrentChannel()?.name}
            </Typography>
            <Stack spacing={2}>
              {notificationTypes.map((type) => (
                <Box key={type.id}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={channelsConfig[selectedChannel].notifications[type.id as keyof ChannelNotifications] as boolean}
                        onChange={handleNotificationToggle(selectedChannel, type.id as keyof ChannelNotifications)}
                        sx={styles.checkboxStyle}
                      />
                    }
                    label={<Typography sx={{ ...styles.textStyle, fontSize: '15px' }}>{type.label}</Typography>}
                  />
                  {type.id === 'tva' && channelsConfig[selectedChannel].notifications.tva && (
                    <Box sx={{ ml: 4, mt: 1 }}>
                      <FormControl size="small" sx={styles.tvaFrequencySelectStyle}>
                        <Select
                          value={channelsConfig[selectedChannel].notifications.tvaFrequency}
                          onChange={(e) => handleTvaFrequencyChange(selectedChannel, e.target.value)}
                          MenuProps={styles.menuProps}
                        >
                          <MenuItem value="mensuelle">Mensuelle</MenuItem>
                          <MenuItem value="trimestrielle">Trimestrielle</MenuItem>
                        </Select>
                      </FormControl>
                    </Box>
                  )}
                </Box>
              ))}
            </Stack>

            <Box sx={{ mt: 4 }}>
              <Box sx={{ display: 'flex',  gap: 2, mb: 2 }}>
                <Language sx={{ color: 'rgba(111, 78, 255, 0.9)', fontSize: 24 }} />
                <Typography sx={styles.languageLabelStyle}>
                  Langue des notifications
                </Typography>
              </Box>
             
              <FormControl fullWidth>
                <Select
                  value={channelsConfig[selectedChannel].language}
                  onChange={(e) => handleLanguageChange(selectedChannel, e.target.value)}
                  sx={styles.selectStyle}
                  MenuProps={styles.menuProps}
                  IconComponent={ArrowDropDown}
                  displayEmpty={false}
                  renderValue={(value) => {
                    const selectedLanguage = languages.find(lang => lang.value === value);
                    return (
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                        <Box sx={{ 
                          width: 24, 
                          height: 24, 
                          borderRadius: '4px',
                          background: 'rgba(111, 78, 255, 0.8)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontSize: '12px',
                          fontWeight: 'bold',
                          color: '#FFF'
                        }}>
                          {value.toUpperCase()}
                        </Box>
                        <Typography sx={styles.languageSelectRenderValueStyle}>
                          {selectedLanguage?.native || value}
                        </Typography>
                      </Box>
                    );
                  }}
                >
                  {languages.map((language) => (
                    <MenuItem 
                      key={language.value} 
                      value={language.value}
                      sx={styles.languageMenuItemStyle(selectedChannel, channelsConfig, language)}
                    >
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                        <Box sx={styles.languageFlagBoxStyle(selectedChannel, channelsConfig, language)}>
                          {language.value.toUpperCase()}
                        </Box>
                        <Box>
                          <Typography sx={{ 
                            ...styles.textStyle,
                            fontSize: '16px', 
                            fontWeight: selectedChannel && channelsConfig[selectedChannel].language === language.value ? 600 : 500 
                          }}>
                            {language.native}
                          </Typography>
                          <Typography sx={{ 
                            ...styles.textStyle,
                            fontSize: '12px', 
                            opacity: 0.6,
                            fontWeight: 400 
                          }}>
                            {language.label}
                          </Typography>
                        </Box>
                      </Box>
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>
          </Card>
        )}

        <Card sx={styles.cardStyle}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 3 }}>
            <Refresh sx={{ color: '#FFF', fontSize: 28 }} />
            <Typography sx={styles.titleStyle}>
              Fréquence des rappels
            </Typography>
          </Box>
          
          <Stack spacing={4}>
            <Box>
              <Typography sx={{ ...styles.labelStyle, mb: 2, fontSize: '18px' }}>
                Nombre de rappels avant échéance
              </Typography>
              <Box sx={{ display: "flex", alignItems: "center", gap: 2, mt: 2 }}>
                <Typography sx={{ ...styles.textStyle, opacity: 0.7, minWidth: 60, fontSize: '14px' }}>
                  1 rappel
                </Typography>
                <Slider
                  value={reminderCount}
                  onChange={(_, value) => setReminderCount(value as number)}
                  min={1}
                  max={5}
                  step={1}
                  sx={styles.sliderStyle}
                />
                <Typography sx={{ ...styles.textStyle, opacity: 0.7, minWidth: 60, fontSize: '14px' }}>
                  5 rappels
                </Typography>
              </Box>
              <Box sx={{ textAlign: "center", mt: 2 }}>
                <Chip
                  label={`${reminderCount} rappel${reminderCount > 1 ? "s" : ""}`}
                  sx={styles.chipStyle}
                />
              </Box>
            </Box>

            <FormControlLabel
              control={
                <Checkbox
                  checked={excludeWeekends}
                  onChange={(e) => setExcludeWeekends(e.target.checked)}
                  sx={styles.checkboxStyle}
                />
              }
              label={<Typography sx={{ ...styles.textStyle, fontSize: '15px' }}>Exclure les week-ends</Typography>}
            />
          </Stack>
        </Card>
      </Box>

      <Box sx={{ display: "flex", justifyContent: "flex-end", maxWidth: "lg", mx: "auto", pt: 6.25, mt: 6.25 }}>
        <Button
          variant="contained"
          onClick={handleSave}
          startIcon={<Notifications />}
          size="large"
          sx={styles.saveButtonStyle}
        >
          Enregistrer la configuration
        </Button>
      </Box>
    </Box>
  );
};