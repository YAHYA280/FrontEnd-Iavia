import { Theme } from '@mui/material/styles';

export const styles = {
  toolbar: (theme: Theme) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: theme.spacing(2, 2.5),
    borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
    gap: 2,
    flexWrap: 'wrap' as const,
  }),

  leftSection: {
    display: 'flex',
    alignItems: 'center',
    gap: 1,
  },

  viewButton: (theme: Theme) => ({
    color: '#EDEDED',
    fontFamily: theme.typography.fontFamily,
    fontSize: '14px',
    fontWeight: 500,
    border: '1px solid rgba(255, 255, 255, 0.1)',
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    '&:hover': {
      backgroundColor: 'rgba(255, 255, 255, 0.1)',
      borderColor: 'rgba(255, 255, 255, 0.2)',
    },
  }),

  navigationSection: {
    display: 'flex',
    alignItems: 'center',
    gap: 1,
  },

  navButton: (theme: Theme) => ({
    color: '#EDEDED',
    '&:hover': {
      backgroundColor: 'rgba(255, 255, 255, 0.1)',
    },
  }),

  dateText: (theme: Theme) => ({
    fontFamily: theme.typography.fontFamily,
    fontSize: '16px',
    fontWeight: 600,
    color: '#EDEDED',
    minWidth: '200px',
    textAlign: 'center' as const,
  }),

  rightSection: {
    display: 'flex',
    alignItems: 'center',
    gap: 1.5,
  },

  todayButton: (theme: Theme) => ({
    color: '#EDEDED',
    fontFamily: theme.typography.fontFamily,
    fontSize: '14px',
    fontWeight: 500,
    border: '1px solid rgba(6, 158, 255, 0.3)',
    backgroundColor: 'rgba(6, 158, 255, 0.1)',
    '&:hover': {
      backgroundColor: 'rgba(6, 158, 255, 0.2)',
      borderColor: 'rgba(6, 158, 255, 0.5)',
    },
  }),

  filterButton: (theme: Theme) => ({
    color: '#EDEDED',
    '&:hover': {
      backgroundColor: 'rgba(255, 255, 255, 0.1)',
    },
  }),

  createButton: (theme: Theme) => ({
    fontFamily: theme.typography.fontFamily,
    fontSize: '14px',
    fontWeight: 600,
    backgroundColor: '#069eff',
    color: '#FFF',
    '&:hover': {
      backgroundColor: '#0580d6',
    },
  }),

  iconContainer: {
    position: 'relative',
    display: 'inline-flex',
  },

  badgeContainer: {
    position: 'absolute',
    top: -4,
    right: -4,
    minWidth: 18,
    height: 18,
    borderRadius: '9px',
    backgroundColor: '#6B7280',
    border: '2px solid #1F2937',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    px: 0.5,
  },

  badgeText: {
    color: '#FFF',
    fontSize: '10px',
    fontWeight: 600,
    lineHeight: 1,
  },

  filterIndicator: {
    position: 'absolute',
    top: -4,
    right: -4,
    width: 8,
    height: 8,
    borderRadius: '50%',
    backgroundColor: '#E04343',
    border: '2px solid #1F2937',
  },

  popoverContainer: (anchorEl: HTMLElement | null) => ({
    position: 'fixed',
    top: anchorEl ? anchorEl.getBoundingClientRect().bottom : 0,
    left: anchorEl ? anchorEl.getBoundingClientRect().left : 0,
    zIndex: 1300,
    backgroundColor: '#1F2937',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    borderRadius: 2,
    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
    minWidth: 200,
    overflow: 'hidden',
  }),

  menuList: {
    p: 0.5,
  },

  menuItem: (theme: Theme, isSelected: boolean) => ({
    fontFamily: theme.typography.fontFamily,
    fontSize: '14px',
    color: isSelected ? '#069eff' : '#EDEDED',
    '&:hover': {
      backgroundColor: 'rgba(255, 255, 255, 0.1)',
    },
    '&.Mui-selected': {
      backgroundColor: 'rgba(6, 158, 255, 0.1)',
      '&:hover': {
        backgroundColor: 'rgba(6, 158, 255, 0.15)',
      },
    },
  }),
};

