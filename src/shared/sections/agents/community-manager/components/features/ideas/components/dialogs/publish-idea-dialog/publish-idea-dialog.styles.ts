import { SxProps, Theme } from '@mui/material';

export const styles = {
  dialogPaper: {
    borderRadius: '16px',
    background: 'rgba(13, 45, 69, 0.95)',
    backdropFilter: 'blur(12px)',
    border: '1px solid rgba(6, 158, 255, 0.2)',
    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
  } as SxProps<Theme>,

  dialogBackdrop: {
    '& .MuiBackdrop-root': {
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      backdropFilter: 'blur(4px)',
    },
  } as SxProps<Theme>,

  sectionTitle: (theme: Theme): SxProps<Theme> => ({
    color: '#EDEDED',
    fontFamily: theme.typography.fontFamily,
    fontSize: '14px',
    fontWeight: 600,
  }),

  selectedPlatformsBox: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: 1,
    p: 2,
    borderRadius: '12px',
    background: 'rgba(6, 158, 255, 0.05)',
    border: '1px solid rgba(6, 158, 255, 0.2)',
    minHeight: '60px',
    alignItems: 'center',
  } as SxProps<Theme>,

  selectedChip: (isCurrent: boolean): SxProps<Theme> => ({
    backgroundColor: isCurrent ? 'rgba(6, 158, 255, 0.3)' : 'rgba(6, 158, 255, 0.2)',
    border: isCurrent ? '1px solid #069EFF' : '1px solid rgba(6, 158, 255, 0.5)',
    borderRadius: '16px',
    '& .MuiChip-deleteIcon': {
      color: '#EDEDED',
      '&:hover': { color: '#FF6B6B' },
    },
    '&:hover': {
      backgroundColor: isCurrent ? 'rgba(6, 158, 255, 0.4)' : 'rgba(6, 158, 255, 0.3)',
    },
  }),

  platformOptionLabel: (theme: Theme, isCurrent: boolean): SxProps<Theme> => ({
    color: isCurrent ? '#069EFF' : '#EDEDED',
    fontFamily: theme.typography.fontFamily,
    fontSize: '13px',
    fontWeight: isCurrent ? 600 : 400,
  }),

  platformOptionRow: {
    margin: 0,
    padding: '6px 8px',
    borderRadius: '6px',
    transition: 'background-color 0.2s',
    '&:hover': { backgroundColor: 'rgba(6, 158, 255, 0.1)' },
  } as SxProps<Theme>,

  checkboxPrimary: {
    color: 'rgba(6, 158, 255, 0.5)',
    '&.Mui-checked': { color: '#069EFF' },
    '&.Mui-disabled': { color: 'rgba(6, 158, 255, 0.8)' },
  } as SxProps<Theme>,

  actionsPrimaryBtn: (theme: Theme): SxProps<Theme> => ({
    backgroundColor: '#069EFF',
    background: '#069EFF',
    backgroundImage: 'none',
    color: '#FFF',
    fontFamily: theme.typography.fontFamily,
    textTransform: 'none',
    fontSize: '14px',
    fontWeight: 600,
    px: 3,
    '&:hover': {
      backgroundColor: '#0588d6',
      background: '#0588d6',
      backgroundImage: 'none',
    },
    '&.Mui-disabled': {
      backgroundColor: 'rgba(6, 158, 255, 0.3)',
      background: 'rgba(6, 158, 255, 0.3)',
      color: 'rgba(255, 255, 255, 0.5)',
    },
  }),

  whenButtonNow: (theme: Theme, isScheduled: boolean): SxProps<Theme> => ({
    flex: 1,
    height: '44px',
    borderRadius: '12px',
    ...(isScheduled
      ? {
          borderColor: 'rgba(6, 158, 255, 0.5)',
          backgroundColor: 'transparent',
          color: '#069eff',
        }
      : {
          backgroundColor: '#069EFF',
          background: '#069EFF',
          backgroundImage: 'none',
          color: '#FFF',
          border: 'none',
        }),
    fontFamily: theme.typography.fontFamily,
    textTransform: 'none',
    fontSize: '14px',
    fontWeight: 600,
    '&:hover': {
      ...(isScheduled
        ? {
            backgroundColor: 'rgba(6, 158, 255, 0.1)',
            borderColor: '#069eff',
          }
        : {
            backgroundColor: '#0588d6',
            background: '#0588d6',
            backgroundImage: 'none',
          }),
    },
  }),

  whenButtonPlan: (theme: Theme, isScheduled: boolean): SxProps<Theme> => ({
    flex: 1,
    height: '44px',
    borderRadius: '12px',
    ...(!isScheduled
      ? {
          borderColor: 'rgba(6, 158, 255, 0.5)',
          backgroundColor: 'transparent',
          color: '#069eff',
        }
      : {
          backgroundColor: '#069EFF',
          background: '#069EFF',
          backgroundImage: 'none',
          color: '#FFF',
          border: 'none',
        }),
    fontFamily: theme.typography.fontFamily,
    textTransform: 'none',
    fontSize: '14px',
    fontWeight: 600,
    '&:hover': {
      ...(!isScheduled
        ? {
            backgroundColor: 'rgba(6, 158, 255, 0.1)',
            borderColor: '#069eff',
          }
        : {
            backgroundColor: '#0588d6',
            background: '#0588d6',
            backgroundImage: 'none',
          }),
    },
  }),

  pickerTextFieldSx: (theme: Theme): SxProps<Theme> => ({
    '& .MuiOutlinedInput-root': {
      color: '#FFF',
      fontFamily: theme.typography.fontFamily,
      fontSize: '14px',
      background: '#1A1D25',
      borderRadius: '24px',
      border: '2px solid transparent',
      backgroundImage:
        'linear-gradient(#1A1D25, #1A1D25), linear-gradient(180deg, #BE30FF 0.66%, #5D31F8 51.44%, #00A3FF 100%)',
      backgroundOrigin: 'border-box',
      backgroundClip: 'padding-box, border-box',
      boxShadow: '0 0 2px 0 rgba(0, 0, 0, 0.28), 0 16px 64px 0 rgba(0, 0, 0, 0.16)',
      '& fieldset': { border: 'none' },
      '&:hover fieldset': { border: 'none' },
      '&.Mui-focused fieldset': { border: 'none' },
      '& .MuiInputBase-input': {
        color: '#FFF',
        '&::placeholder': {
          color: 'rgba(255, 255, 255, 0.5)',
          opacity: 1,
        },
      },
      '& .MuiInputAdornment-root .MuiIconButton-root': {
        color: '#FFF',
        '&:hover': { backgroundColor: 'rgba(6, 158, 255, 0.1)' },
      },
    },
  }),

  getCalendarStyles: (fontFamily: string): string => `
    /* Styles pour le calendar popup Material-UI */
    .MuiPickersPopper-root .MuiPaper-root {
      background: #1A1D25 !important;
      border: 1px solid rgba(6, 158, 255, 0.3) !important;
      color: #FFF !important;
      border-radius: 16px !important;
    }
    
    /* Styles pour les jours du calendar */
    .MuiPickersDay-root {
      color: #FFF !important;
      font-family: ${fontFamily} !important;
    }
    
    .MuiPickersDay-root:hover {
      background-color: rgba(6, 158, 255, 0.2) !important;
      color: #FFF !important;
    }
    
    .MuiPickersDay-root.Mui-selected {
      background-color: #069EFF !important;
      color: #FFF !important;
    }
    
    .MuiPickersDay-root.Mui-selected:hover {
      background-color: #0588d6 !important;
    }
    
    .MuiPickersDay-root.Mui-disabled {
      color: rgba(255, 255, 255, 0.3) !important;
    }
    
    /* Styles pour les en-têtes du calendar */
    .MuiPickersCalendarHeader-root {
      color: #FFF !important;
      background: #1A1D25 !important;
    }
    
    .MuiPickersCalendarHeader-label {
      color: #FFF !important;
      font-family: ${fontFamily} !important;
    }
    
    .MuiPickersArrowSwitcher-button {
      color: #069EFF !important;
    }
    
    .MuiPickersArrowSwitcher-button:hover {
      background-color: rgba(6, 158, 255, 0.1) !important;
    }
    
    /* Styles pour le time picker */
    .MuiClock-root {
      background: #1A1D25 !important;
    }
    
    .MuiClockNumber-root {
      color: #FFF !important;
    }
    
    .MuiClockNumber-root:hover {
      background-color: rgba(6, 158, 255, 0.2) !important;
      color: #FFF !important;
    }
    
    .MuiClockNumber-root.Mui-selected {
      background-color: #069EFF !important;
      color: #FFF !important;
    }
    
    .MuiClockNumber-root.Mui-selected:hover {
      background-color: #0588d6 !important;
      color: #FFF !important;
    }
    
    .MuiClock-pin {
      background-color: #069EFF !important;
    }
    
    .MuiClockPointer-root {
      background-color: #069EFF !important;
    }
    
    .MuiClockPointer-thumb {
      background-color: #069EFF !important;
      border-color: #069EFF !important;
    }
    
    /* Styles pour les boutons du time picker */
    .MuiPickersToolbar-root {
      background: #1A1D25 !important;
    }
    
    .MuiPickersToolbar-text {
      color: #FFF !important;
    }
    
    .MuiPickersToolbarButton-root {
      color: #069EFF !important;
    }
    
    .MuiPickersToolbarButton-root:hover {
      background-color: rgba(6, 158, 255, 0.1) !important;
    }
    
    .MuiPickersToolbarButton-root.Mui-selected {
      color: #069EFF !important;
    }
    
    /* Styles pour le bouton OK et autres actions */
    .MuiPickersActionBar-root {
      background: #1A1D25 !important;
    }
    
    .MuiPickersActionBar-actionButton {
      color: #069EFF !important;
    }
    
    .MuiPickersActionBar-actionButton:hover {
      background-color: rgba(6, 158, 255, 0.1) !important;
    }
    
    .MuiPickersActionBar-actionButton.MuiButton-contained {
      background-color: #069EFF !important;
      color: #FFF !important;
    }
    
    .MuiPickersActionBar-actionButton.MuiButton-contained:hover {
      background-color: #0588d6 !important;
    }
    
    /* Styles pour les tabs du time picker (AM/PM) */
    .MuiTabs-root {
      background: #1A1D25 !important;
    }
    
    .MuiTab-root {
      color: rgba(255, 255, 255, 0.7) !important;
    }
    
    .MuiTab-root:hover {
      color: #069EFF !important;
    }
    
    .MuiTab-root.Mui-selected {
      color: #069EFF !important;
    }
    
    .MuiTabs-indicator {
      background-color: #069EFF !important;
    }
    
    /* Styles généraux pour tous les boutons dans le time picker */
    .MuiPickersPopper-root .MuiButton-root {
      color: #069EFF !important;
    }
    
    .MuiPickersPopper-root .MuiButton-root:hover {
      background-color: rgba(6, 158, 255, 0.1) !important;
    }
    
    .MuiPickersPopper-root .MuiButton-contained {
      background-color: #069EFF !important;
      color: #FFF !important;
    }
    
    .MuiPickersPopper-root .MuiButton-contained:hover {
      background-color: #0588d6 !important;
    }
    
    /* Styles pour les éléments actifs/focus dans le time picker */
    .MuiPickersPopper-root .Mui-focusVisible {
      background-color: rgba(6, 158, 255, 0.2) !important;
    }
    
    .MuiPickersPopper-root .Mui-selected {
      background-color: #069EFF !important;
      color: #FFF !important;
    }
    
    /* Forcer la couleur primaire en bleu pour tous les éléments du time picker */
    .MuiPickersPopper-root .MuiButton-primary,
    .MuiPickersPopper-root .MuiButton-containedPrimary,
    .MuiPickersPopper-root .MuiIconButton-colorPrimary,
    .MuiPickersPopper-root .MuiTab-textColorPrimary.Mui-selected,
    .MuiPickersPopper-root .MuiTabs-indicator {
      color: #069EFF !important;
      background-color: #069EFF !important;
    }
    
    .MuiPickersPopper-root .MuiButton-containedPrimary:hover {
      background-color: #0588d6 !important;
    }
    
    /* Override des couleurs violettes par défaut */
    .MuiPickersPopper-root [class*="MuiButton-colorPrimary"],
    .MuiPickersPopper-root [class*="MuiIconButton-colorPrimary"],
    .MuiPickersPopper-root [class*="primary"] {
      color: #069EFF !important;
    }
    
    .MuiPickersPopper-root [class*="MuiButton-containedPrimary"],
    .MuiPickersPopper-root [class*="containedPrimary"] {
      background-color: #069EFF !important;
      color: #FFF !important;
    }
    
    .MuiPickersPopper-root [class*="MuiButton-containedPrimary"]:hover,
    .MuiPickersPopper-root [class*="containedPrimary"]:hover {
      background-color: #0588d6 !important;
    }
  `,
};


