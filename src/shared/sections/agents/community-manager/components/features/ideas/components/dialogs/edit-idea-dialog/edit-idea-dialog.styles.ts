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

  outlinedBlueBtn: (theme: Theme): SxProps<Theme> => ({
    border: '1px solid rgba(6, 158, 255, 0.5)',
    backgroundColor: 'transparent',
    color: '#069eff',
    fontFamily: theme.typography.fontFamily,
    textTransform: 'none',
    fontSize: '12px',
    fontWeight: 600,
    '&:hover': {
      backgroundColor: 'rgba(6, 158, 255, 0.1)',
      borderColor: '#069eff',
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
    },
    '& .MuiInputBase-input::placeholder': {
      color: 'rgba(255, 255, 255, 0.5)',
      opacity: 1,
    },
  }),

  regenerateButton: (theme: Theme): SxProps<Theme> => ({
    backgroundColor: '#069EFF',
    background: '#069EFF',
    backgroundImage: 'none',
    color: '#FFF',
    fontFamily: theme.typography.fontFamily,
    fontSize: '14px',
    fontWeight: 600,
    textTransform: 'none',
    px: 3,
    '&:hover': {
      backgroundColor: '#0588d6',
      background: '#0588d6',
      backgroundImage: 'none',
    },
  }),

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

  dialogTitle: (theme: Theme): SxProps<Theme> => ({
    color: '#FFF',
    fontFamily: theme.typography.fontFamily,
    fontSize: '24px',
    fontWeight: 700,
    pb: 1,
  }),

  loadingText: (theme: Theme): SxProps<Theme> => ({
    color: '#9CA3AF',
    fontFamily: theme.typography.fontFamily,
    fontSize: '16px',
    textAlign: 'center',
    py: 4,
  }),

  descriptionText: (theme: Theme): SxProps<Theme> => ({
    color: '#9CA3AF',
    fontFamily: theme.typography.fontFamily,
    fontSize: '16px',
    mb: 3,
  }),

  sectionTitle: (theme: Theme): SxProps<Theme> => ({
    color: '#EDEDED',
    fontFamily: theme.typography.fontFamily,
    fontSize: '14px',
    fontWeight: 600,
    mb: 1.5,
  }),

  cancelButton: (theme: Theme): SxProps<Theme> => ({
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
    cursor: isDragging ? 'grabbing' : 'grab',
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

  captionCounter: (theme: Theme): SxProps<Theme> => ({
    color: '#9CA3AF',
    fontFamily: theme.typography.fontFamily,
    fontSize: '12px',
    mt: 1,
    textAlign: 'left',
  }),

  aiGenerateTextField: (theme: Theme): SxProps<Theme> => ({
    '& .MuiOutlinedInput-root': {
      color: '#FFF',
      fontFamily: theme.typography.fontFamily,
      fontSize: '14px',
      background: '#1A1D25',
      borderRadius: '16px',
      border: '2px solid transparent',
      backgroundImage: 'linear-gradient(#1A1D25, #1A1D25), linear-gradient(180deg, #BE30FF 0.66%, #5D31F8 51.44%, #00A3FF 100%)',
      backgroundOrigin: 'border-box',
      backgroundClip: 'padding-box, border-box',
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
  }),

};