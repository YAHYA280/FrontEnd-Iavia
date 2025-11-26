import { Theme } from '@mui/material/styles';

export const styles = {
  dialogPaper: {
    borderRadius: '16px',
    background: 'rgba(13, 45, 69, 0.95)',
    backdropFilter: 'blur(12px)',
    minWidth: '400px',
    border: '1px solid rgba(6, 158, 255, 0.2)',
    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
  },

  backdrop: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    backdropFilter: 'blur(4px)',
  },

  dialogTitle: (theme: Theme) => ({
    color: '#FFF',
    fontFamily: theme.typography.fontFamily,
    fontSize: '20px',
    fontWeight: 600,
  }),

  dialogContent: (theme: Theme) => ({
    color: '#9CA3AF',
    fontFamily: theme.typography.fontFamily,
    fontSize: '16px',
  }),

  dialogActions: {
    p: 2,
    gap: 1,
  },

  cancelButton: (theme: Theme) => ({
    borderColor: 'rgba(6, 158, 255, 0.5)',
    backgroundColor: 'transparent',
    color: '#069eff',
    fontFamily: (theme.typography.fontFamily || 'inherit') as string,
    textTransform: 'none',
    fontSize: '14px',
    fontWeight: 600,
    '&:hover': {
      backgroundColor: 'rgba(6, 158, 255, 0.1)',
      borderColor: '#069eff',
    },
  }),

  deleteButton: (theme: Theme) => ({
    backgroundColor: '#E04343',
    background: '#E04343',
    backgroundImage: 'none',
    color: '#FFF',
    fontFamily: (theme.typography.fontFamily || 'inherit') as string,
    textTransform: 'none',
    '&:hover': {
      backgroundColor: '#C03939',
      background: '#C03939',
      backgroundImage: 'none',
    },
  }),
};

