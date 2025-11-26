import { SxProps, Theme } from '@mui/material';

export const styles = {
  dialogPaper: {
    borderRadius: '16px',
    background: 'rgba(13, 45, 69, 0.95)',
    backdropFilter: 'blur(12px)',
    border: '1px solid rgba(6, 158, 255, 0.2)',
    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
    maxWidth: '800px',
  } as SxProps<Theme>,

  dialogBackdrop: {
    '& .MuiBackdrop-root': {
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      backdropFilter: 'blur(4px)',
    },
  } as SxProps<Theme>,

  dialogTitle: (theme: Theme): SxProps<Theme> => ({
    color: '#EDEDED',
    fontFamily: theme.typography.fontFamily,
    fontSize: '20px',
    fontWeight: 600,
    padding: theme.spacing(3, 3, 2),
  }),

  sectionTitle: (theme: Theme): SxProps<Theme> => ({
    color: '#EDEDED',
    fontFamily: theme.typography.fontFamily,
    fontSize: '14px',
    fontWeight: 600,
    marginBottom: theme.spacing(1.5),
  }),

  toggleButtonGroup: {
    display: 'flex',
    gap: 1,
    marginBottom: 3,
  } as SxProps<Theme>,

  whenButtonManual: (theme: Theme, isSelected: boolean): SxProps<Theme> => ({
    flex: 1,
    height: '44px',
    borderRadius: '12px',
    ...(!isSelected
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
      ...(!isSelected
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

  whenButtonAutomatic: (theme: Theme, isSelected: boolean): SxProps<Theme> => ({
    flex: 1,
    height: '44px',
    borderRadius: '12px',
    ...(!isSelected
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
      ...(!isSelected
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

  gradientTextField: (theme: Theme): SxProps<Theme> => ({
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

  outlinedBlueBtn: (theme: Theme): SxProps<Theme> => ({
    borderColor: 'rgba(6, 158, 255, 0.5)',
    color: '#069EFF',
    fontFamily: theme.typography.fontFamily,
    fontSize: '12px',
    fontWeight: 500,
    textTransform: 'none',
    '&:hover': {
      borderColor: '#069EFF',
      backgroundColor: 'rgba(6, 158, 255, 0.1)',
    },
  }),

  actionsPrimaryBtn: (theme: Theme): SxProps<Theme> => ({
    height: { xs: '44px', sm: '48px' },
    padding: { xs: '12px 16px', sm: '14px 24px' },
    borderRadius: '16px',
    backgroundColor: '#069EFF',
    background: '#069EFF',
    backgroundImage: 'none',
    color: '#FFF',
    fontFamily: theme.typography.fontFamily,
    fontSize: { xs: '14px', sm: '16px' },
    fontWeight: 600,
    textTransform: 'none',
    boxShadow: '0 4px 12px rgba(6, 158, 255, 0.3)',
    '&:hover': {
      backgroundColor: '#0588d6',
      background: '#0588d6',
      backgroundImage: 'none',
      boxShadow: '0 6px 16px rgba(6, 158, 255, 0.4)',
    },
    '&.Mui-disabled': {
      backgroundColor: 'rgba(6, 158, 255, 0.3)',
      color: 'rgba(255, 255, 255, 0.5)',
    },
  }),

  cancelButton: (theme: Theme): SxProps<Theme> => ({
    color: '#9CA3AF',
    fontFamily: theme.typography.fontFamily,
    textTransform: 'none',
    fontSize: '14px',
    fontWeight: 500,
    borderColor: 'rgba(255, 255, 255, 0.2)',
    '&:hover': {
      borderColor: 'rgba(255, 255, 255, 0.3)',
      backgroundColor: 'rgba(255, 255, 255, 0.05)',
    },
  }),

  uploadArea: {
    border: '2px dashed rgba(6, 158, 255, 0.3)',
    borderRadius: '12px',
    padding: 3,
    textAlign: 'center',
    cursor: 'pointer',
    transition: 'all 0.2s',
    backgroundColor: 'rgba(6, 158, 255, 0.05)',
    '&:hover': {
      borderColor: '#069EFF',
      backgroundColor: 'rgba(6, 158, 255, 0.1)',
    },
  } as SxProps<Theme>,

  platformCard: (theme: Theme, isSelected: boolean): SxProps<Theme> => ({
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    gap: 1.5,
    padding: '12px 16px',
    borderRadius: '12px',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    backgroundColor: isSelected ? 'rgba(6, 158, 255, 0.15)' : 'rgba(6, 158, 255, 0.05)',
    border: isSelected ? '2px solid #069EFF' : '2px solid rgba(6, 158, 255, 0.3)',
    '&:hover': {
      backgroundColor: isSelected ? 'rgba(6, 158, 255, 0.25)' : 'rgba(6, 158, 255, 0.1)',
      borderColor: '#069EFF',
    },
  }),

  platformCheckmark: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: '#069EFF',
    borderRadius: '50%',
    width: '20px',
    height: '20px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  } as SxProps<Theme>,

  imageContainer: {
    position: 'relative',
    width: '100%',
    aspectRatio: '16/9',
    borderRadius: '12px',
    overflow: 'hidden',
    border: '1px solid rgba(6, 158, 255, 0.3)',
    backgroundColor: '#1A1D25',
    mb: 2,
  } as SxProps<Theme>,

  imagePreview: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    transition: 'opacity 0.3s ease',
  } as SxProps<Theme>,

  navigationIconButton: (canNavigate: boolean): SxProps<Theme> => ({
    position: 'absolute',
    top: '50%',
    transform: 'translateY(-50%)',
    width: '36px',
    height: '36px',
    backgroundColor: canNavigate ? 'rgba(13, 45, 69, 0.9)' : 'rgba(13, 45, 69, 0.3)',
    backdropFilter: 'blur(4px)',
    color: canNavigate ? '#FFF' : 'rgba(255, 255, 255, 0.3)',
    border: '1px solid rgba(6, 158, 255, 0.3)',
    zIndex: 2,
    cursor: canNavigate ? 'pointer' : 'not-allowed',
    '&:hover': {
      backgroundColor: canNavigate ? 'rgba(13, 45, 69, 1)' : 'rgba(13, 45, 69, 0.3)',
      borderColor: canNavigate ? 'rgba(6, 158, 255, 0.5)' : 'rgba(6, 158, 255, 0.3)',
    },
    '&.Mui-disabled': {
      backgroundColor: 'rgba(13, 45, 69, 0.3)',
      color: 'rgba(255, 255, 255, 0.3)',
    },
  }),

  imageCounterBox: {
    position: 'absolute',
    bottom: 12,
    right: 12,
    backgroundColor: 'rgba(13, 45, 69, 0.9)',
    backdropFilter: 'blur(4px)',
    borderRadius: '8px',
    padding: '4px 12px',
    zIndex: 2,
  } as SxProps<Theme>,

  imageCounterText: (theme: Theme): SxProps<Theme> => ({
    color: '#FFF',
    fontFamily: theme.typography.fontFamily,
    fontSize: '12px',
    fontWeight: 600,
  }),

  changeImageButton: (theme: Theme): SxProps<Theme> => ({
    backgroundColor: 'rgba(13, 45, 69, 0.9)',
    backdropFilter: 'blur(4px)',
    color: '#FFF',
    border: '1px solid rgba(6, 158, 255, 0.3)',
    fontFamily: theme.typography.fontFamily,
    fontSize: '12px',
    fontWeight: 600,
    textTransform: 'none',
    zIndex: 2,
    '&:hover': {
      backgroundColor: 'rgba(13, 45, 69, 1)',
      borderColor: 'rgba(6, 158, 255, 0.5)',
    },
  }),

  thumbnailContainer: {
    display: 'flex',
    gap: 1,
    overflowX: 'auto',
    pb: 1,
    '&::-webkit-scrollbar': {
      height: '6px',
    },
    '&::-webkit-scrollbar-track': {
      background: 'rgba(6, 158, 255, 0.1)',
      borderRadius: '3px',
    },
    '&::-webkit-scrollbar-thumb': {
      background: 'rgba(6, 158, 255, 0.3)',
      borderRadius: '3px',
      '&:hover': {
        background: 'rgba(6, 158, 255, 0.5)',
      },
    },
  } as SxProps<Theme>,

  thumbnailItem: (isCurrent: boolean, isDragging: boolean): SxProps<Theme> => ({
    position: 'relative',
    width: '80px',
    height: '80px',
    flexShrink: 0,
    borderRadius: '8px',
    overflow: 'hidden',
    border: isCurrent ? '2px solid #069eff' : '2px solid rgba(6, 158, 255, 0.2)',
    cursor: isDragging ? 'grabbing' : 'pointer',
    transition: 'all 0.2s ease',
    opacity: isDragging ? 0.8 : 1,
    transform: isDragging ? 'scale(1.05)' : 'scale(1)',
    '&:hover': {
      borderColor: isCurrent ? '#069eff' : 'rgba(6, 158, 255, 0.4)',
      '& .delete-overlay': {
        opacity: 1,
      },
    },
  }),

  addImageBox: {
    position: 'relative',
    width: '80px',
    height: '80px',
    flexShrink: 0,
    borderRadius: '8px',
    border: '2px dashed rgba(6, 158, 255, 0.4)',
    backgroundColor: 'rgba(6, 158, 255, 0.05)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    '&:hover': {
      borderColor: '#069eff',
      backgroundColor: 'rgba(6, 158, 255, 0.1)',
    },
  } as SxProps<Theme>,

  emptyImageBox: {
    width: '100%',
    aspectRatio: '16/9',
    borderRadius: '12px',
    border: '2px dashed rgba(6, 158, 255, 0.4)',
    backgroundColor: 'rgba(6, 158, 255, 0.05)',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    mb: 3,
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    '&:hover': {
      borderColor: '#069eff',
      backgroundColor: 'rgba(6, 158, 255, 0.1)',
    },
  } as SxProps<Theme>,

  deleteOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    opacity: 0,
    transition: 'opacity 0.2s ease',
    pointerEvents: 'none',
  } as SxProps<Theme>,

  currentImageIndicator: {
    position: 'absolute',
    top: 4,
    right: 4,
    backgroundColor: '#069eff',
    borderRadius: '50%',
    width: '20px',
    height: '20px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    pointerEvents: 'none',
  } as SxProps<Theme>,

  thumbnailLabel: (theme: Theme): SxProps<Theme> => ({
    color: '#9CA3AF',
    fontFamily: theme.typography.fontFamily,
    fontSize: '12px',
    fontWeight: 600,
    mb: 1,
  }),

  draftButton: (theme: Theme): SxProps<Theme> => ({
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
  }),

  deleteButton: (theme: Theme): SxProps<Theme> => ({
    backgroundColor: '#E04343',
    background: '#E04343',
    backgroundImage: 'none',
    color: '#FFF',
    fontFamily: theme.typography.fontFamily,
    textTransform: 'none',
    '&:hover': {
      backgroundColor: '#C03939',
      background: '#C03939',
      backgroundImage: 'none',
    },
  }),

  captionCounter: (theme: Theme): SxProps<Theme> => ({
    color: '#9CA3AF',
    fontFamily: theme.typography.fontFamily,
    fontSize: '12px',
    mt: 1,
    textAlign: 'left',
  }),

  autoPreviewCta: (theme: Theme): SxProps<Theme> => ({
    borderRadius: '16px',
    padding: theme.spacing(2),
    border: '1px solid rgba(6, 158, 255, 0.2)',
    background: 'rgba(6, 158, 255, 0.05)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: theme.spacing(1.5),
    flexWrap: 'wrap',
  }),

  autoPreviewInfo: (theme: Theme): SxProps<Theme> => ({
    color: '#9CA3AF',
    fontFamily: theme.typography.fontFamily,
    fontSize: '13px',
  }),

  autoPreviewHint: (theme: Theme): SxProps<Theme> => ({
    color: '#9CA3AF',
    fontFamily: theme.typography.fontFamily,
    fontSize: '12px',
    marginTop: theme.spacing(1.5),
  }),

  autoPreviewCard: (theme: Theme): SxProps<Theme> => ({
    borderRadius: '16px',
    padding: theme.spacing(2),
    border: '1px solid rgba(6, 158, 255, 0.3)',
    background: 'rgba(6, 158, 255, 0.08)',
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing(2),
  }),

  autoPreviewHeader: (theme: Theme): SxProps<Theme> => ({
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: theme.spacing(1),
  }),

  autoPreviewBadge: (theme: Theme): SxProps<Theme> => ({
    display: 'inline-flex',
    alignItems: 'center',
    gap: theme.spacing(0.8),
    borderRadius: '999px',
    padding: theme.spacing(0.5, 1.5),
    background: 'rgba(6, 158, 255, 0.2)',
    color: '#069EFF',
  }),

  autoPreviewBadgeText: (theme: Theme): SxProps<Theme> => ({
    fontFamily: theme.typography.fontFamily,
    fontSize: '12px',
    fontWeight: 600,
  }),

  autoPreviewSubInfo: (theme: Theme): SxProps<Theme> => ({
    color: '#9CA3AF',
    fontFamily: theme.typography.fontFamily,
    fontSize: '12px',
  }),

  autoPreviewMediaGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))',
    gap: '12px',
  } as SxProps<Theme>,

  autoPreviewMedia: {
    width: '100%',
    height: '120px',
    borderRadius: '12px',
    objectFit: 'cover',
  } as SxProps<Theme>,

  autoPreviewCaption: (theme: Theme): SxProps<Theme> => ({
    color: '#EDEDED',
    fontFamily: theme.typography.fontFamily,
    fontSize: '14px',
    lineHeight: 1.5,
  }),

  autoPreviewPlatforms: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '8px',
  } as SxProps<Theme>,

  autoPreviewPlatformChip: (theme: Theme): SxProps<Theme> => ({
    display: 'inline-flex',
    alignItems: 'center',
    gap: theme.spacing(0.8),
    padding: theme.spacing(0.5, 1.2),
    borderRadius: '999px',
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    border: '1px solid rgba(255, 255, 255, 0.12)',
  }),

  autoPreviewPlatformText: (theme: Theme): SxProps<Theme> => ({
    color: '#EDEDED',
    fontFamily: theme.typography.fontFamily,
    fontSize: '12px',
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

