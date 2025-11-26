import { SxProps, Theme } from '@mui/material';

export const styles = {
  container: {} as SxProps<Theme>,

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
  })
  }