import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Box,
  Typography,
  Button,
  useTheme,
  Checkbox,
  FormControlLabel,
  Divider,
  IconButton,
  Tooltip,
  Chip,
  Collapse,
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs, { Dayjs } from 'dayjs';
import 'dayjs/locale/fr';
import { FontAwesomeIcon } from '@/shared/components/fontawesome';
import { defaultPlatforms } from '@/shared/_mock/community-manager-config';
import { styles } from './publish-idea-dialog.styles';

export interface PublishIdeaDialogProps {
  open: boolean;
  ideaId: string | null;
  currentPlatformId: string;
  onClose: () => void;
  onConfirm: (ideaId: string, publishDate: string | null, publishTime: string | null, platformIds: string[]) => void;
}

export const PublishIdeaDialog: React.FC<PublishIdeaDialogProps> = ({
  open,
  ideaId,
  currentPlatformId,
  onClose,
  onConfirm,
}) => {
  const theme = useTheme();
  const [publishDate, setPublishDate] = useState<Dayjs | null>(null);
  const [publishTime, setPublishTime] = useState<Dayjs | null>(null);
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>([]);
  const [isScheduled, setIsScheduled] = useState(false);
  const [showPlatformOptions, setShowPlatformOptions] = useState(false);

  React.useEffect(() => {
    if (open) {
      const today = dayjs();
      setPublishDate(today);

      const oneHourLater = today.add(1, 'hour');
      setPublishTime(oneHourLater);

      setSelectedPlatforms([currentPlatformId]);

      setIsScheduled(true);

      setShowPlatformOptions(false);
    }
  }, [open, currentPlatformId]);

  useEffect(() => {
    if (open) {
      const fontFamily = theme.typography.fontFamily || 'inherit';
      const style = document.createElement('style');
      style.id = 'publish-dialog-calendar-styles';
      style.textContent = styles.getCalendarStyles(fontFamily);
      document.head.appendChild(style);

      return () => {
        const existingStyle = document.getElementById('publish-dialog-calendar-styles');
        if (existingStyle) {
          document.head.removeChild(existingStyle);
        }
      };
    }
  }, [open, theme]);

  const getPlatformById = (platformId: string) => {
    return defaultPlatforms.find(platform => platform.id === platformId);
  };

  const handleTogglePlatformOptions = () => {
    setShowPlatformOptions(!showPlatformOptions);
  };

  const handlePlatformToggle = (platformId: string) => {
    setSelectedPlatforms((prev) => {
      if (prev.includes(platformId)) {
        if (prev.length === 1) return prev;
        return prev.filter((id) => id !== platformId);
      } else {
        return [...prev, platformId];
      }
    });
  };

  const handleRemovePlatform = (platformId: string) => {
    if (selectedPlatforms.length === 1) return;

    setSelectedPlatforms((prev) => prev.filter((id) => id !== platformId));
  };

  const handlePublishNow = () => {
    if (ideaId && selectedPlatforms.length > 0) {
      onConfirm(ideaId, null, null, selectedPlatforms);
      handleClose();
    }
  };

  const handleSchedulePublish = () => {
    if (ideaId && publishDate && publishTime && selectedPlatforms.length > 0) {
      const dateStr = publishDate.format('YYYY-MM-DD');
      const timeStr = publishTime.format('HH:mm');
      onConfirm(ideaId, dateStr, timeStr, selectedPlatforms);
      handleClose();
    }
  };

  const handleClose = () => {
    onClose();
    setPublishDate(null);
    setPublishTime(null);
    setSelectedPlatforms([]);
    setIsScheduled(true);
    setShowPlatformOptions(false);
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="fr">
      <Dialog
        open={open}
        onClose={handleClose}
        maxWidth="sm"
        fullWidth
        disableEscapeKeyDown={false}
        PaperProps={{
          sx: styles.dialogPaper,
        }}
        sx={styles.dialogBackdrop}
      >
        <DialogTitle
          sx={{
            color: '#FFF',
            fontFamily: theme.typography.fontFamily,
            fontSize: '24px',
            fontWeight: 700,
            pb: 1,
          }}
        >
          Publier le post
        </DialogTitle>
        <DialogContent>
          <Typography
            sx={{
              color: '#9CA3AF',
              fontFamily: theme.typography.fontFamily,
              fontSize: '16px',
              mb: 3,
            }}
          >
            Choisissez les plateformes et planifiez votre publication
          </Typography>

          <Box sx={{ mb: 4 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
              <Typography sx={styles.sectionTitle(theme)}>
                Plateformes de publication
              </Typography>


              <Tooltip
                title={showPlatformOptions ? "Masquer les plateformes" : "Ajouter d'autres plateformes"}
                arrow
              >
                <IconButton
                  onClick={handleTogglePlatformOptions}
                  sx={{
                    width: 32,
                    height: 32,
                    backgroundColor: showPlatformOptions ? 'rgba(6, 158, 255, 0.2)' : 'rgba(6, 158, 255, 0.1)',
                    border: '1px solid rgba(6, 158, 255, 0.5)',
                    borderRadius: '8px',
                    '&:hover': {
                      backgroundColor: 'rgba(6, 158, 255, 0.3)',
                      borderColor: '#069EFF',
                    },
                  }}
                >
                  <FontAwesomeIcon
                    icon={showPlatformOptions ? "chevron-up" : "plus"}
                    style={{
                      fontSize: '14px',
                      color: '#069EFF'
                    }}
                  />
                </IconButton>
              </Tooltip>
            </Box>

            <Box sx={{ ...styles.selectedPlatformsBox, mb: showPlatformOptions ? 2 : 0 }}>
              {selectedPlatforms.map((platformId) => {
                const platform = getPlatformById(platformId);
                if (!platform) return null;

                return (
                  <Chip
                    key={platformId}
                    label={
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Box
                          component="img"
                          src={platform.logoSrc}
                          alt={platform.name}
                          sx={{ width: 16, height: 16, objectFit: 'contain' }}
                        />
                        <Typography
                          sx={{ color: '#EDEDED', fontFamily: theme.typography.fontFamily, fontSize: '12px', fontWeight: 500 }}
                        >
                          {platform.name}
                        </Typography>
                      </Box>
                    }
                    onDelete={
                      selectedPlatforms.length > 1
                        ? () => handleRemovePlatform(platformId)
                        : undefined
                    }
                    deleteIcon={
                      <FontAwesomeIcon
                        icon="times"
                        style={{ fontSize: '10px', color: '#EDEDED' }}
                      />
                    }
                    sx={styles.selectedChip(platformId === currentPlatformId)}
                  />
                );
              })}

              {selectedPlatforms.length === 0 && (
                <Typography
                  sx={{
                    color: '#9CA3AF',
                    fontFamily: theme.typography.fontFamily,
                    fontSize: '12px',
                    fontStyle: 'italic',
                  }}
                >
                  Aucune plateforme sélectionnée
                </Typography>
              )}
            </Box>

            <Collapse in={showPlatformOptions}>
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 1,
                  p: 2,
                  borderRadius: '12px',
                  background: 'rgba(255, 255, 255, 0.05)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  mt: 1,
                }}
              >
                <Typography
                  sx={{
                    color: '#EDEDED',
                    fontFamily: theme.typography.fontFamily,
                    fontSize: '12px',
                    fontWeight: 600,
                    mb: 1,
                  }}
                >
                  Sélectionnez les plateformes supplémentaires:
                </Typography>

                {defaultPlatforms.map((platform) => (
                  <FormControlLabel
                    key={platform.id}
                    control={
                      <Checkbox
                        checked={selectedPlatforms.includes(platform.id)}
                        onChange={() => handlePlatformToggle(platform.id)}
                        disabled={platform.id === currentPlatformId}
                        sx={styles.checkboxPrimary}
                      />
                    }
                    label={
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                        <Box
                          component="img"
                          src={platform.logoSrc}
                          alt={platform.name}
                          sx={{
                            width: 20,
                            height: 20,
                            objectFit: 'contain',
                            opacity: platform.id === currentPlatformId ? 1 : 0.8,
                          }}
                        />
                        <Typography sx={styles.platformOptionLabel(theme, platform.id === currentPlatformId)}>
                          {platform.name}
                          {platform.id === currentPlatformId && ' (actuel)'}
                        </Typography>
                      </Box>
                    }
                    sx={styles.platformOptionRow}
                  />
                ))}
              </Box>
            </Collapse>

            <Typography
              sx={{
                color: '#9CA3AF',
                fontFamily: theme.typography.fontFamily,
                fontSize: '12px',
                mt: 1,
                fontStyle: 'italic',
              }}
            >
              {selectedPlatforms.length === 1
                ? '1 plateforme sélectionnée'
                : `${selectedPlatforms.length} plateformes sélectionnées`}
            </Typography>
          </Box>

          <Divider sx={{ my: 3, borderColor: 'rgba(6, 158, 255, 0.2)' }} />

          <Box sx={{ mb: 3 }}>
            <Typography sx={{ ...styles.sectionTitle(theme), mb: 2 }}>
              Quand publier ?
            </Typography>
            <Box sx={{ display: 'flex', gap: 1 }}>
              <Button
                onClick={() => setIsScheduled(false)}
                variant={!isScheduled ? 'contained' : 'outlined'}
                sx={styles.whenButtonNow(theme, isScheduled)}
              >
                Maintenant
              </Button>
              <Button
                onClick={() => setIsScheduled(true)}
                variant={isScheduled ? 'contained' : 'outlined'}
                sx={styles.whenButtonPlan(theme, isScheduled)}
              >
                Planifier
              </Button>
            </Box>
          </Box>

          {isScheduled && (
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
              <Box>
                <Typography sx={{ ...styles.sectionTitle(theme), mb: 1.5 }}>
                  Date de publication
                </Typography>
                <DatePicker
                  value={publishDate}
                  onChange={(newValue) => setPublishDate(newValue)}
                  slotProps={{
                    textField: {
                      fullWidth: true,
                      placeholder: 'Sélectionnez une date',
                      sx: styles.pickerTextFieldSx(theme),
                    },
                    popper: {
                      sx: {
                        '& .MuiPaper-root': {
                          background: '#1A1D25',
                          border: '1px solid rgba(6, 158, 255, 0.3)',
                        },
                      },
                    },
                  }}
                />
              </Box>

              <Box>
                <Typography sx={{ ...styles.sectionTitle(theme), mb: 1.5 }}>
                  Heure de publication
                </Typography>
                <TimePicker
                  value={publishTime}
                  onChange={(newValue) => setPublishTime(newValue)}
                  slotProps={{
                    textField: {
                      fullWidth: true,
                      placeholder: 'Sélectionnez une heure',
                      sx: styles.pickerTextFieldSx(theme),
                    },
                    actionBar: {
                      actions: ['cancel', 'accept'],
                      sx: {
                        '& .MuiButton-root': {
                          color: '#069EFF',
                          '&.MuiButton-contained': {
                            backgroundColor: '#069EFF',
                            color: '#FFF',
                            '&:hover': {
                              backgroundColor: '#0588d6',
                            },
                          },
                        },
                      },
                    },
                    popper: {
                      sx: {
                        '& .MuiPaper-root': {
                          background: '#1A1D25',
                          border: '1px solid rgba(6, 158, 255, 0.3)',
                        },
                      },
                    },
                  }}
                />
              </Box>
            </Box>
          )}
        </DialogContent>
        <DialogActions sx={{ p: 3, gap: 1.5 }}>
          <Button
            onClick={handleClose}
            variant="outlined"
            sx={{
              borderColor: 'rgba(6, 158, 255, 0.5)',
              backgroundColor: 'transparent',
              color: '#069eff',
              fontFamily: theme.typography.fontFamily,
              textTransform: 'none',
              fontSize: '14px',
              fontWeight: 600,
              '&:hover': {
                backgroundColor: 'rgba(6, 158, 255, 0.1)',
                borderColor: '#069eff',
              },
            }}
          >
            Annuler
          </Button>
          <Button
            onClick={isScheduled ? handleSchedulePublish : handlePublishNow}
            variant="contained"
            disabled={
              !ideaId ||
              selectedPlatforms.length === 0 ||
              (isScheduled && (!publishDate || !publishTime))
            }
            startIcon={
              <FontAwesomeIcon
                icon={isScheduled ? 'clock' : 'paper-plane'}
                style={{ fontSize: '14px' }}
              />
            }
            sx={styles.actionsPrimaryBtn(theme)}
          >
            {isScheduled ? 'Planifier la publication' : 'Publier maintenant'}
          </Button>
        </DialogActions>
      </Dialog>
    </LocalizationProvider>
  );
};