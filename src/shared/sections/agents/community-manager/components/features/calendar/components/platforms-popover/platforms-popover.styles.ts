import { Theme } from '@mui/material/styles';

export const styles = {
  paper: {
    backgroundColor: '#1F2937',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    borderRadius: 2,
    p: 1.5,
    minWidth: 150,
    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
  },

  container: {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: 1,
  },

  platformItem: {
    display: 'flex',
    alignItems: 'center',
    gap: 1,
    p: 0.5,
  },

  platformLogo: {
    width: 20,
    height: 20,
    objectFit: 'contain' as const,
  },

  platformName: (theme: Theme) => ({
    color: '#EDEDED',
    fontFamily: theme.typography.fontFamily,
    fontSize: '12px',
  }),
};

