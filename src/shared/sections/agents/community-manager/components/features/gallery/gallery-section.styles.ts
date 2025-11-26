import { SxProps, Theme } from '@mui/material';

export const styles = {
  container: {} as SxProps<Theme>,

  filtersRow: {
    display: 'flex',
    flexDirection: { xs: 'column', sm: 'row' },
    gap: 2,
    mb: 4,
    alignItems: { xs: 'stretch', sm: 'center' },
  } as SxProps<Theme>,

  searchInputWrapper: {
    flex: 1,
  } as SxProps<Theme>,

  searchInput: (theme: Theme): SxProps<Theme> => ({
    width: '100%',
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

  filtersGroup: {
    display: 'flex',
    gap: 2,
    flexDirection: { xs: 'column', sm: 'row' },
  } as SxProps<Theme>,

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
    minWidth: { xs: '100%', sm: 160 },
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
  }),
};
