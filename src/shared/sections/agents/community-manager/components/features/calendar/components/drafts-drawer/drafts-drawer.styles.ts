import { Theme } from '@mui/material/styles';

export const styles = {
  drawer: (theme: Theme) => ({
    '& .MuiDrawer-paper': {
      width: { xs: '100%', sm: 400 },
      backgroundColor: '#0d2d45',
      borderLeft: '1px solid rgba(255, 255, 255, 0.1)',
    },
  }),

  container: {
    p: 3,
    height: '100%',
    display: 'flex',
    flexDirection: 'column' as const,
  },

  header: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    mb: 3,
  },

  title: (theme: Theme) => ({
    color: '#EDEDED',
    fontFamily: theme.typography.fontFamily,
    fontSize: '20px',
    fontWeight: 600,
  }),

  closeButton: (theme: Theme) => ({
    color: '#EDEDED',
    '&:hover': { backgroundColor: 'rgba(255, 255, 255, 0.1)' },
  }),

  content: {
    flex: 1,
    overflow: 'auto' as const,
  },

  emptyState: {
    display: 'flex',
    flexDirection: 'column' as const,
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
    textAlign: 'center' as const,
    p: 3,
  },

  emptyText: (theme: Theme) => ({
    color: '#9CA3AF',
    fontFamily: theme.typography.fontFamily,
    fontSize: '16px',
  }),

  draftsList: {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: 1.5,
  },

  draftItem: {
    display: 'flex',
    alignItems: 'center',
    gap: 2,
    p: 2,
    borderRadius: '12px',
    border: '1px solid rgba(107, 114, 128, 0.3)',
    backgroundColor: 'rgba(107, 114, 128, 0.05)',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    '&:hover': {
      backgroundColor: 'rgba(107, 114, 128, 0.1)',
      borderColor: 'rgba(107, 114, 128, 0.5)',
    },
  },

  platformsContainer: {
    display: 'flex',
    alignItems: 'center',
    gap: 0.5,
    flexWrap: 'wrap' as const,
  },

  platformLogo: {
    width: 32,
    height: 32,
    objectFit: 'contain' as const,
  },

  draftContent: {
    flex: 1,
    minWidth: 0,
  },

  draftTitle: (theme: Theme) => ({
    color: '#EDEDED',
    fontFamily: theme.typography.fontFamily,
    fontSize: '14px',
    fontWeight: 600,
    mb: 0.5,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap' as const,
  }),

  draftCaptionLength: (theme: Theme) => ({
    color: '#9CA3AF',
    fontFamily: theme.typography.fontFamily,
    fontSize: '11px',
    mt: 0.5,
  }),
};

