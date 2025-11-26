import React from 'react';
import {
  Box,
  Typography,
  TextField,
  Switch,
  FormControlLabel,
  Grid,
  Tooltip,
  IconButton,
} from '@mui/material';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import 'dayjs/locale/fr';
import { CustomSelect } from '@/shared/components/ui/custom-select';
import { TagInput } from '@/shared/components/ui/tag-input';
import type { AgentColor } from './types';

interface WorkingDays {
  monday: boolean;
  tuesday: boolean;
  wednesday: boolean;
  thursday: boolean;
  friday: boolean;
  saturday: boolean;
  sunday: boolean;
}

interface AvailabilitySectionProps {
  outOfHoursMessage: string;
  setOutOfHoursMessage: React.Dispatch<React.SetStateAction<string>>;
  timezone: string;
  setTimezone: React.Dispatch<React.SetStateAction<string>>;
  startTime: string;
  setStartTime: React.Dispatch<React.SetStateAction<string>>;
  endTime: string;
  setEndTime: React.Dispatch<React.SetStateAction<string>>;
  workingDays: WorkingDays;
  setWorkingDays: React.Dispatch<React.SetStateAction<WorkingDays>>;
  spamKeywords: string[];
  setSpamKeywords: React.Dispatch<React.SetStateAction<string[]>>;
  agentColor: AgentColor;
}

export const AvailabilitySection: React.FC<AvailabilitySectionProps> = ({
  outOfHoursMessage,
  setOutOfHoursMessage,
  timezone,
  setTimezone,
  startTime,
  setStartTime,
  endTime,
  setEndTime,
  workingDays,
  setWorkingDays,
  spamKeywords,
  setSpamKeywords,
  agentColor,
}) => {
  const timezones = [
    { id: 'UTC-12', title: 'UTC-12 (Pacific/Baker_Island)' },
    { id: 'UTC-11', title: 'UTC-11 (Pacific/Midway)' },
    { id: 'UTC-10', title: 'UTC-10 (Pacific/Honolulu)' },
    { id: 'UTC-9', title: 'UTC-9 (America/Anchorage)' },
    { id: 'UTC-8', title: 'UTC-8 (America/Los_Angeles)' },
    { id: 'UTC-7', title: 'UTC-7 (America/Denver)' },
    { id: 'UTC-6', title: 'UTC-6 (America/Chicago)' },
    { id: 'UTC-5', title: 'UTC-5 (America/New_York)' },
    { id: 'UTC-4', title: 'UTC-4 (America/Halifax)' },
    { id: 'UTC-3', title: 'UTC-3 (America/Sao_Paulo)' },
    { id: 'UTC-2', title: 'UTC-2 (Atlantic/South_Georgia)' },
    { id: 'UTC-1', title: 'UTC-1 (Atlantic/Azores)' },
    { id: 'UTC+0', title: 'UTC+0 (Europe/London)' },
    { id: 'UTC+1', title: 'UTC+1 (Europe/Paris)' },
    { id: 'UTC+2', title: 'UTC+2 (Europe/Athens)' },
    { id: 'UTC+3', title: 'UTC+3 (Europe/Moscow)' },
    { id: 'UTC+4', title: 'UTC+4 (Asia/Dubai)' },
    { id: 'UTC+5', title: 'UTC+5 (Asia/Karachi)' },
    { id: 'UTC+5:30', title: 'UTC+5:30 (Asia/Kolkata)' },
    { id: 'UTC+6', title: 'UTC+6 (Asia/Dhaka)' },
    { id: 'UTC+7', title: 'UTC+7 (Asia/Bangkok)' },
    { id: 'UTC+8', title: 'UTC+8 (Asia/Shanghai)' },
    { id: 'UTC+9', title: 'UTC+9 (Asia/Tokyo)' },
    { id: 'UTC+9:30', title: 'UTC+9:30 (Australia/Adelaide)' },
    { id: 'UTC+10', title: 'UTC+10 (Australia/Sydney)' },
    { id: 'UTC+11', title: 'UTC+11 (Pacific/Noumea)' },
    { id: 'UTC+12', title: 'UTC+12 (Pacific/Auckland)' },
    { id: 'UTC+13', title: 'UTC+13 (Pacific/Tongatapu)' },
    { id: 'UTC+14', title: 'UTC+14 (Pacific/Kiritimati)' },
  ];

  const daysOfWeek = [
    { key: 'monday', label: 'Lundi' },
    { key: 'tuesday', label: 'Mardi' },
    { key: 'wednesday', label: 'Mercredi' },
    { key: 'thursday', label: 'Jeudi' },
    { key: 'friday', label: 'Vendredi' },
    { key: 'saturday', label: 'Samedi' },
    { key: 'sunday', label: 'Dimanche' },
  ];

  const handleDayToggle = (day: string) => {
    setWorkingDays((prev) => ({
      ...prev,
      [day]: !prev[day as keyof typeof prev],
    }));
  };

  return (
    <Box sx={{ mb: 6 }}>
      <Typography
        sx={{
          fontSize: '15px',
          fontWeight: 700,
          mb: 3,
          color: 'rgba(255, 255, 255, 0.85)',
          fontFamily: 'var(--font-primary)',
        }}
      >
        Horaire de disponibilité <span style={{ color: '#ef4444' }}>*</span>
      </Typography>

      <Box sx={{ mb: 4 }}>
        <Typography
          sx={{
            fontSize: '14px',
            fontWeight: 600,
            mb: 2,
            color: 'rgba(255, 255, 255, 0.8)',
            fontFamily: 'var(--font-primary)',
          }}
        >
          Message en dehors des heures d&apos;ouverture
        </Typography>
        <TextField
          fullWidth
          multiline
          rows={3}
          value={outOfHoursMessage}
          onChange={(e) => setOutOfHoursMessage(e.target.value)}
          placeholder="Ex: Merci de nous avoir contactés. Nos agents sont actuellement hors ligne. Nous vous répondrons pendant nos heures d'ouverture."
          sx={{
            '& .MuiOutlinedInput-root': {
              color: '#FFF',
              fontFamily: 'var(--font-primary)',
              fontSize: '14px',
              background: 'rgba(255, 255, 255, 0.03)',
              backdropFilter: 'blur(10px)',
              WebkitBackdropFilter: 'blur(10px)',
              borderRadius: '16px',
              border: '2px solid rgba(255, 255, 255, 0.08)',
              transition: 'border-color 0.3s ease, background 0.3s ease',
              isolation: 'isolate',
              '& fieldset': {
                border: 'none',
              },
              '&:hover': {
                borderColor: `${agentColor.primary}44`,
                background: 'rgba(255, 255, 255, 0.05)',
              },
              '&.Mui-focused': {
                borderColor: agentColor.primary,
                boxShadow: `0 0 0 2px ${agentColor.glow}`,
              },
            },
            '& .MuiInputBase-input::placeholder': {
              color: 'rgba(255, 255, 255, 0.4)',
              opacity: 1,
            },
          }}
        />
      </Box>

      <Box sx={{ mb: 4 }}>
        <Typography
          sx={{
            fontSize: '14px',
            fontWeight: 600,
            mb: 2,
            color: 'rgba(255, 255, 255, 0.8)',
            fontFamily: 'var(--font-primary)',
          }}
        >
          Fuseau horaire
        </Typography>
        <CustomSelect
          value={timezone}
          onChange={(value) => setTimezone(value)}
          options={timezones}
          placeholder="Sélectionnez un fuseau horaire"
          primaryColor={agentColor.primary}
          glowColor={agentColor.glow}
        />
      </Box>

      <Box sx={{ mb: 4 }}>
        <Typography
          sx={{
            fontSize: '14px',
            fontWeight: 600,
            mb: 2,
            color: 'rgba(255, 255, 255, 0.8)',
            fontFamily: 'var(--font-primary)',
          }}
        >
          Heures d&apos;ouverture
        </Typography>
        <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="fr">
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <Typography
                sx={{
                  color: 'rgba(255, 255, 255, 0.6)',
                  fontFamily: 'var(--font-primary)',
                  fontSize: '12px',
                  fontWeight: 500,
                  mb: 1,
                }}
              >
                Heure de début
              </Typography>
              <TimePicker
                value={dayjs(startTime, 'HH:mm')}
                onChange={(newValue) => {
                  if (newValue) {
                    setStartTime(newValue.format('HH:mm'));
                  }
                }}
                ampm={false}
                slotProps={{
                  textField: {
                    fullWidth: true,
                    sx: {
                      '& .MuiOutlinedInput-root': {
                        background: `linear-gradient(135deg, ${agentColor.primary}12, ${agentColor.primary}06)`,
                        backdropFilter: 'blur(10px)',
                        WebkitBackdropFilter: 'blur(10px)',
                        borderRadius: '12px',
                        color: '#FFF',
                        border: `2px solid ${agentColor.primary}33`,
                        transition:
                          'border-color 0.3s ease, background 0.3s ease, transform 0.3s ease',
                        isolation: 'isolate',
                        '& fieldset': {
                          border: 'none',
                        },
                        '&:hover': {
                          background: `linear-gradient(135deg, ${agentColor.primary}18, ${agentColor.primary}10)`,
                          borderColor: `${agentColor.primary}66`,
                          boxShadow: `0 4px 16px ${agentColor.glow}`,
                          transform: 'translateY(-2px)',
                        },
                        '&.Mui-focused': {
                          background: `linear-gradient(135deg, ${agentColor.primary}20, ${agentColor.primary}12)`,
                          borderColor: agentColor.primary,
                          boxShadow: `0 4px 20px ${agentColor.glow}, 0 0 0 3px ${agentColor.glow}33`,
                        },
                      },
                      '& .MuiInputBase-input': {
                        color: '#FFF',
                        fontFamily: 'var(--font-primary)',
                        fontSize: '14px',
                        fontWeight: 500,
                      },
                      '& .MuiSvgIcon-root': {
                        color: '#FFF',
                        opacity: 0.8,
                      },
                    },
                  },
                  popper: {
                    sx: {
                      '& .MuiPaper-root': {
                        background: `linear-gradient(135deg, ${agentColor.primary}08, rgba(0, 0, 0, 0.92))`,
                        backdropFilter: 'blur(24px)',
                        WebkitBackdropFilter: 'blur(24px)',
                        borderRadius: '16px',
                        border: `1px solid ${agentColor.primary}44`,
                        boxShadow: `0 8px 32px ${agentColor.glow}, 0 4px 20px rgba(0, 0, 0, 0.5)`,
                        color: '#FFF',
                      },
                      '& .MuiClockNumber-root': {
                        color: '#FFF',
                        '&.Mui-selected': {
                          background: agentColor.primary,
                          color: '#FFF',
                        },
                      },
                      '& .MuiClock-pin': {
                        background: agentColor.primary,
                      },
                      '& .MuiClockPointer-root': {
                        background: agentColor.primary,
                      },
                      '& .MuiClockPointer-thumb': {
                        background: agentColor.primary,
                        border: `2px solid ${agentColor.primary}`,
                      },
                      '& .MuiMultiSectionDigitalClock-root': {
                        '& .MuiMenuItem-root': {
                          color: '#FFF',
                          fontFamily: 'var(--font-primary)',
                          '&:hover': {
                            background: `linear-gradient(135deg, ${agentColor.primary}18, ${agentColor.primary}08)`,
                          },
                          '&.Mui-selected': {
                            background: `linear-gradient(135deg, ${agentColor.primary}22, ${agentColor.primary}10)`,
                            '&:hover': {
                              background: `linear-gradient(135deg, ${agentColor.primary}28, ${agentColor.primary}14)`,
                            },
                          },
                        },
                      },
                      '& .MuiPickersToolbar-root': {
                        background: `linear-gradient(135deg, ${agentColor.primary}15, ${agentColor.primary}08)`,
                        color: '#FFF',
                      },
                      '& .MuiDialogActions-root button': {
                        color: agentColor.primary,
                        fontWeight: 600,
                      },
                    },
                  },
                }}
              />
            </Grid>
            <Grid item xs={6}>
              <Typography
                sx={{
                  color: 'rgba(255, 255, 255, 0.6)',
                  fontFamily: 'var(--font-primary)',
                  fontSize: '12px',
                  fontWeight: 500,
                  mb: 1,
                }}
              >
                Heure de fin
              </Typography>
              <TimePicker
                value={dayjs(endTime, 'HH:mm')}
                onChange={(newValue) => {
                  if (newValue) {
                    setEndTime(newValue.format('HH:mm'));
                  }
                }}
                ampm={false}
                slotProps={{
                  textField: {
                    fullWidth: true,
                    sx: {
                      '& .MuiOutlinedInput-root': {
                        background: `linear-gradient(135deg, ${agentColor.primary}12, ${agentColor.primary}06)`,
                        backdropFilter: 'blur(10px)',
                        WebkitBackdropFilter: 'blur(10px)',
                        borderRadius: '12px',
                        color: '#FFF',
                        border: `2px solid ${agentColor.primary}33`,
                        transition:
                          'border-color 0.3s ease, background 0.3s ease, transform 0.3s ease',
                        isolation: 'isolate',
                        '& fieldset': {
                          border: 'none',
                        },
                        '&:hover': {
                          background: `linear-gradient(135deg, ${agentColor.primary}18, ${agentColor.primary}10)`,
                          borderColor: `${agentColor.primary}66`,
                          boxShadow: `0 4px 16px ${agentColor.glow}`,
                          transform: 'translateY(-2px)',
                        },
                        '&.Mui-focused': {
                          background: `linear-gradient(135deg, ${agentColor.primary}20, ${agentColor.primary}12)`,
                          borderColor: agentColor.primary,
                          boxShadow: `0 4px 20px ${agentColor.glow}, 0 0 0 3px ${agentColor.glow}33`,
                        },
                      },
                      '& .MuiInputBase-input': {
                        color: '#FFF',
                        fontFamily: 'var(--font-primary)',
                        fontSize: '14px',
                        fontWeight: 500,
                      },
                      '& .MuiSvgIcon-root': {
                        color: '#FFF',
                        opacity: 0.8,
                      },
                    },
                  },
                  popper: {
                    sx: {
                      '& .MuiPaper-root': {
                        background: `linear-gradient(135deg, ${agentColor.primary}08, rgba(0, 0, 0, 0.92))`,
                        backdropFilter: 'blur(24px)',
                        WebkitBackdropFilter: 'blur(24px)',
                        borderRadius: '16px',
                        border: `1px solid ${agentColor.primary}44`,
                        boxShadow: `0 8px 32px ${agentColor.glow}, 0 4px 20px rgba(0, 0, 0, 0.5)`,
                        color: '#FFF',
                      },
                      '& .MuiClockNumber-root': {
                        color: '#FFF',
                        '&.Mui-selected': {
                          background: agentColor.primary,
                          color: '#FFF',
                        },
                      },
                      '& .MuiClock-pin': {
                        background: agentColor.primary,
                      },
                      '& .MuiClockPointer-root': {
                        background: agentColor.primary,
                      },
                      '& .MuiClockPointer-thumb': {
                        background: agentColor.primary,
                        border: `2px solid ${agentColor.primary}`,
                      },
                      '& .MuiMultiSectionDigitalClock-root': {
                        '& .MuiMenuItem-root': {
                          color: '#FFF',
                          fontFamily: 'var(--font-primary)',
                          '&:hover': {
                            background: `linear-gradient(135deg, ${agentColor.primary}18, ${agentColor.primary}08)`,
                          },
                          '&.Mui-selected': {
                            background: `linear-gradient(135deg, ${agentColor.primary}22, ${agentColor.primary}10)`,
                            '&:hover': {
                              background: `linear-gradient(135deg, ${agentColor.primary}28, ${agentColor.primary}14)`,
                            },
                          },
                        },
                      },
                      '& .MuiPickersToolbar-root': {
                        background: `linear-gradient(135deg, ${agentColor.primary}15, ${agentColor.primary}08)`,
                        color: '#FFF',
                      },
                      '& .MuiDialogActions-root button': {
                        color: agentColor.primary,
                        fontWeight: 600,
                      },
                    },
                  },
                }}
              />
            </Grid>
          </Grid>
        </LocalizationProvider>
      </Box>

      <Box sx={{ mb: 4 }}>
        <Typography
          sx={{
            fontSize: '14px',
            fontWeight: 600,
            mb: 2,
            color: 'rgba(255, 255, 255, 0.8)',
            fontFamily: 'var(--font-primary)',
          }}
        >
          Jours de travail
        </Typography>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
          {daysOfWeek.map((day) => (
            <FormControlLabel
              key={day.key}
              control={
                <Switch
                  checked={workingDays[day.key as keyof typeof workingDays]}
                  onChange={() => handleDayToggle(day.key)}
                  disableRipple
                  sx={{
                    '& .MuiSwitch-switchBase.Mui-checked': {
                      color: agentColor.primary,
                      '& + .MuiSwitch-track': {
                        backgroundColor: agentColor.primary,
                      },
                    },
                    '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
                      backgroundColor: agentColor.primary,
                    },
                  }}
                />
              }
              label={
                <Typography
                  sx={{
                    color: '#EDEDED',
                    fontFamily: 'var(--font-primary)',
                    fontSize: '14px',
                    fontWeight: 500,
                  }}
                >
                  {day.label}
                </Typography>
              }
              sx={{ ml: 0, minWidth: '120px' }}
            />
          ))}
        </Box>
      </Box>

      <Box>
        <Typography
          sx={{
            fontSize: '14px',
            fontWeight: 600,
            mb: 2,
            color: 'rgba(255, 255, 255, 0.8)',
            fontFamily: 'var(--font-primary)',
          }}
        >
          Filtrage indésirable
        </Typography>
        <Typography
          sx={{
            fontSize: '12px',
            color: 'rgba(255, 255, 255, 0.6)',
            mb: 2,
            fontFamily: 'var(--font-primary)',
          }}
        >
          Ajoutez des mots-clés pour filtrer automatiquement les messages indésirables. Appuyez sur
          Entrée pour ajouter un mot-clé.
        </Typography>
        <TagInput
          tags={spamKeywords}
          onChange={setSpamKeywords}
          placeholder="Ex: spam, publicité, arnaque..."
          primaryColor={agentColor.primary}
          glowColor={agentColor.glow}
        />
      </Box>
    </Box>
  );
};
