import { Theme } from '@mui/material/styles';

export const styles = {
  eventContent: (theme: Theme) => ({
    display: 'flex',
    flexDirection: 'column' as const,
    alignItems: 'flex-start',
    gap: '4px',
    width: '100%',
    padding: '2px 0',
  }),

  eventHeader: {
    display: 'flex',
    alignItems: 'center',
    gap: '4px',
    width: '100%',
    minWidth: 0,
  },

  platformsContainer: {
    display: 'flex',
    alignItems: 'center',
    gap: '3px',
    flexShrink: 0,
  },

  platformLogo: {
    width: 18,
    height: 18,
    objectFit: 'contain' as const,
    flexShrink: 0,
  },

  morePlatformsBadge: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '18px',
    height: '18px',
    borderRadius: '50%',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    color: '#EDEDED',
    fontSize: '10px',
    fontWeight: 600,
    cursor: 'pointer',
    flexShrink: 0,
    '&:hover': {
      backgroundColor: 'rgba(255, 255, 255, 0.3)',
    },
  },

  eventTitle: (theme: Theme) => ({
    fontFamily: theme.typography.fontFamily,
    fontSize: '13px',
    fontWeight: 600,
    color: '#EDEDED',
    flex: 1,
    minWidth: 0,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap' as const,
  }),

  eventTime: (theme: Theme) => ({
    fontFamily: theme.typography.fontFamily,
    fontSize: '11px',
    fontWeight: 600,
    color: '#EDEDED',
    opacity: 0.9,
    width: '100%',
    marginTop: '2px',
  }),
};

