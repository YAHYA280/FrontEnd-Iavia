import { SxProps, Theme } from '@mui/material/styles';

export const styles = {
  modalOverlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 1500,
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'center',
    paddingTop: '8vh',
    pointerEvents: 'auto',
    overflowY: 'auto',
  } as SxProps<Theme>,

  modalContainer: {
    backgroundColor: 'rgb(12, 68, 106)',
    borderRadius: '16px',
    border: '1px solid rgba(6, 158, 255, 0.3)',
    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.4)',
    width: '90%',
    maxWidth: '900px',
    maxHeight: '85vh',
    display: 'flex',
    flexDirection: 'column',
    position: 'relative',
    margin: '0 auto',
    zIndex: 1501,
    pointerEvents: 'auto',
  } as SxProps<Theme>,

  modalHeader: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '24px',
    borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
    flexShrink: 0,
  } as SxProps<Theme>,

  closeButton: {
    color: '#9CA3AF',
    '&:hover': {
      backgroundColor: 'rgba(6, 158, 255, 0.1)',
      color: '#FFF',
    },
  } as SxProps<Theme>,

  dialogTitle: (theme: Theme): SxProps<Theme> => ({
    color: '#EDEDED',
    fontFamily: theme.typography.fontFamily,
    fontSize: '20px',
    fontWeight: 600,
    pb: 2,
    borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
  }),

  dialogContent: {
    padding: '24px',
    overflowY: 'auto',
    flex: 1,
    '&::-webkit-scrollbar': {
      width: '8px',
    },
    '&::-webkit-scrollbar-track': {
      background: 'rgba(6, 158, 255, 0.1)',
      borderRadius: '4px',
    },
    '&::-webkit-scrollbar-thumb': {
      background: 'rgba(6, 158, 255, 0.3)',
      borderRadius: '4px',
      '&:hover': {
        background: 'rgba(6, 158, 255, 0.5)',
      },
    },
  } as SxProps<Theme>,

  modalActions: {
    display: 'flex',
    gap: '12px',
    padding: '24px',
    borderTop: '1px solid rgba(255, 255, 255, 0.1)',
    flexShrink: 0,
    justifyContent: 'flex-end',
  } as SxProps<Theme>,

  searchInput: (theme: Theme): SxProps<Theme> => ({
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

  emptyStateBox: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    py: 6,
    px: 3,
  } as SxProps<Theme>,

  emptyTitle: (theme: Theme): SxProps<Theme> => ({
    color: '#EDEDED',
    fontFamily: theme.typography.fontFamily,
    fontSize: '16px',
    fontWeight: 600,
    mb: 1,
  }),

  emptySubtitle: (theme: Theme): SxProps<Theme> => ({
    color: '#9CA3AF',
    fontFamily: theme.typography.fontFamily,
    fontSize: '14px',
    textAlign: 'center',
  }),

  galleryItem: (isSelected: boolean): SxProps<Theme> => ({
    position: 'relative',
    width: '100%',
    aspectRatio: '1',
    borderRadius: '12px',
    overflow: 'hidden',
    cursor: 'pointer',
    border: isSelected ? '2px solid #069eff' : '2px solid rgba(6, 158, 255, 0.2)',
    backgroundColor: '#1A1D25',
    transition: 'all 0.2s ease',
    '&:hover': {
      borderColor: isSelected ? '#069eff' : 'rgba(6, 158, 255, 0.5)',
      transform: 'scale(1.02)',
      boxShadow: '0 4px 12px rgba(6, 158, 255, 0.3)',
    },
  }),

  galleryImage: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  } as SxProps<Theme>,

  selectedOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(6, 158, 255, 0.3)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 2,
  } as SxProps<Theme>,

  selectedCheck: {
    width: '48px',
    height: '48px',
    borderRadius: '50%',
    backgroundColor: '#069eff',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    boxShadow: '0 4px 12px rgba(6, 158, 255, 0.5)',
  } as SxProps<Theme>,

  selectionIndicator: (isSelected: boolean): SxProps<Theme> => ({
    position: 'absolute',
    top: 8,
    right: 8,
    zIndex: 3,
    backgroundColor: isSelected ? 'rgba(6, 158, 255, 0.9)' : 'rgba(13, 45, 69, 0.9)',
    borderRadius: '50%',
    width: '32px',
    height: '32px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backdropFilter: 'blur(4px)',
    border: '1px solid rgba(6, 158, 255, 0.3)',
  }),

  cancelButton: (theme: Theme): SxProps<Theme> => ({
    borderColor: 'rgba(6, 158, 255, 0.5)',
    backgroundColor: 'transparent',
    color: '#069eff',
    fontFamily: theme.typography.fontFamily,
    fontSize: '14px',
    fontWeight: 600,
    textTransform: 'none',
    px: 3,
    py: 1,
    '&:hover': {
      backgroundColor: 'rgba(6, 158, 255, 0.1)',
      borderColor: '#069eff',
    },
  }),

  confirmButton: (theme: Theme): SxProps<Theme> => ({
    backgroundColor: '#069eff',
    color: '#FFF',
    fontFamily: theme.typography.fontFamily,
    fontSize: '14px',
    fontWeight: 600,
    textTransform: 'none',
    px: 3,
    py: 1,
    '&:hover': {
      backgroundColor: '#0580d0',
    },
    '&.Mui-disabled': {
      backgroundColor: 'rgba(6, 158, 255, 0.3)',
      color: 'rgba(255, 255, 255, 0.3)',
    },
  }),
};

