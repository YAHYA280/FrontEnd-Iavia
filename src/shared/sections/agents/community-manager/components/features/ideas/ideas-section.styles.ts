import { SxProps, Theme } from '@mui/material';

export const styles = {
  container: {} as SxProps<Theme>,

  filterWrapper: { mb: 3 } as SxProps<Theme>,

  selectPaper: (theme: Theme): SxProps<Theme> => ({
    background: '#1A1D25',
    borderRadius: '12px',
    border: '1px solid rgba(6, 158, 255, 0.3)',
    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.3)',
    '& .MuiMenuItem-root': {
      color: '#FFF',
      fontFamily: theme.typography.fontFamily,
      fontSize: '14px',
      '&:hover': {
        background: 'rgba(6, 158, 255, 0.1)',
      },
      '&.Mui-selected': {
        background: 'rgba(6, 158, 255, 0.2)',
        '&:hover': {
          background: 'rgba(6, 158, 255, 0.3)',
        },
      },
    },
  }),

  selectRoot: (theme: Theme): SxProps<Theme> => ({
    background: 'rgb(11, 86, 136)',
    borderRadius: '12px',
    color: '#FFF',
    '& .MuiOutlinedInput-notchedOutline': {
      borderColor: 'rgba(6, 158, 255, 0.3)',
    },
    '&:hover .MuiOutlinedInput-notchedOutline': {
      borderColor: 'rgba(6, 158, 255, 0.5)',
    },
    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
      borderColor: '#069eff',
    },
    '& .MuiSelect-icon': {
      color: '#FFF',
    },
  }),

  emptyStateBox: {
    width: '100%',
    minHeight: '400px',
    borderRadius: '24px',
    border: '2px dashed rgba(6, 158, 255, 0.4)',
    background: 'rgba(13, 45, 69, 0.3)',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    px: 3,
    py: 6,
  } as SxProps<Theme>,

  emptyTitle: (theme: Theme): SxProps<Theme> => ({
    color: '#FFFFFF',
    fontFamily: theme.typography.fontFamily,
    fontSize: '20px',
    fontWeight: 700,
    mb: 1,
  }),

  emptySubtitle: (theme: Theme): SxProps<Theme> => ({
    color: '#9CA3AF',
    fontFamily: theme.typography.fontFamily,
    fontSize: '16px',
    fontWeight: 500,
    maxWidth: '500px',
    mb: 3,
  }),

  dialogPaper: {
    borderRadius: '16px',
    background: 'rgba(13, 45, 69, 0.95)',
    backdropFilter: 'blur(12px)',
    minWidth: '400px',
    border: '1px solid rgba(6, 158, 255, 0.2)',
    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
  } as SxProps<Theme>,

  dialogBackdrop: {
    '& .MuiBackdrop-root': {
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      backdropFilter: 'blur(4px)',
    },
  } as SxProps<Theme>,

  dialogTitle: (theme: Theme): SxProps<Theme> => ({
    color: '#FFF',
    fontFamily: theme.typography.fontFamily,
    fontSize: '20px',
    fontWeight: 600,
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
};


