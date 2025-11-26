import { Theme } from '@mui/material/styles';

export const styles = {
  drawer: (theme: Theme) => ({
    '& .MuiDrawer-paper': {
      width: 360,
      backgroundColor: '#0d2d45',
      borderLeft: '1px solid rgba(255, 255, 255, 0.1)',
    },
  }),

  header: (theme: Theme) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: theme.spacing(2, 2.5),
    borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
  }),

  headerTitle: (theme: Theme) => ({
    fontFamily: theme.typography.fontFamily,
    fontSize: '18px',
    fontWeight: 600,
    color: '#EDEDED',
  }),

  closeButton: (theme: Theme) => ({
    color: '#9CA3AF',
    '&:hover': {
      backgroundColor: 'rgba(255, 255, 255, 0.1)',
    },
  }),

  sectionTitle: (theme: Theme) => ({
    fontFamily: theme.typography.fontFamily,
    fontSize: '14px',
    fontWeight: 600,
    color: '#EDEDED',
    marginBottom: theme.spacing(2),
  }),

  platformLogo: {
    width: 20,
    height: 20,
    objectFit: 'contain' as const,
  },

  resetButton: (theme: Theme) => ({
    fontFamily: (theme.typography.fontFamily || 'inherit') as string,
    fontSize: '14px',
    fontWeight: 600,
    color: '#EDEDED',
    borderColor: 'rgba(255, 255, 255, 0.2)',
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: '12px',
    px: 3,
    py: 1,
    textTransform: 'none',
    '&:hover': {
      backgroundColor: 'rgba(255, 255, 255, 0.1)',
      borderColor: 'rgba(255, 255, 255, 0.3)',
    },
  }),

  emptyEvents: (theme: Theme) => ({
    p: 2,
    textAlign: 'center' as const,
    color: '#9CA3AF',
    fontFamily: (theme.typography.fontFamily || 'inherit') as string,
    fontSize: '14px',
  }),

  eventItem: {
    py: 1.5,
    borderBottom: '1px dashed rgba(255, 255, 255, 0.1)',
    '&:hover': {
      backgroundColor: 'rgba(255, 255, 255, 0.05)',
    },
  },

  statusIndicator: (color: string) => ({
    position: 'absolute',
    top: 16,
    left: 0,
    width: 0,
    height: 0,
    borderRight: '10px solid transparent',
    borderTop: `10px solid ${color}`,
  }),

  eventPrimary: {
    display: 'flex',
    alignItems: 'center',
    gap: 1,
    mt: 0.5,
  },

  eventPlatformLogo: {
    width: 16,
    height: 16,
    objectFit: 'contain' as const,
  },

  eventTitle: (theme: Theme) => ({
    fontFamily: (theme.typography.fontFamily || 'inherit') as string,
    fontSize: '13px',
    fontWeight: 600,
    color: '#EDEDED',
  }),

  eventDate: (theme: Theme) => ({
    fontFamily: (theme.typography.fontFamily || 'inherit') as string,
    fontSize: '11px',
    color: '#9CA3AF',
    mt: 0.5,
  }),

  listItemText: {
    display: 'flex',
    flexDirection: 'column-reverse' as const,
    pl: 2,
  },

  resetContainer: {
    p: 2.5,
    borderTop: '1px solid rgba(255, 255, 255, 0.1)',
    display: 'flex',
    justifyContent: 'center',
  },

  contentContainer: {
    overflow: 'auto',
    flex: 1,
    p: 3,
  },

  sectionContainer: {
    mb: 3,
  },

  formControl: {
    mt: 1.5,
  },

  selectRenderValue: (theme: Theme) => ({
    color: '#EDEDED',
    fontFamily: (theme.typography.fontFamily || 'inherit') as string,
    fontSize: '14px',
  }),

  selectMenuProps: (theme: Theme) => ({
    background: '#1A1D25',
    borderRadius: '12px',
    border: '1px solid rgba(6, 158, 255, 0.3)',
    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.3)',
    '& .MuiMenuItem-root': {
      color: '#FFF',
      fontFamily: (theme.typography.fontFamily || 'inherit') as string,
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

  select: (theme: Theme) => ({
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

  menuItemText: (theme: Theme) => ({
    color: '#EDEDED',
    fontFamily: (theme.typography.fontFamily || 'inherit') as string,
    fontSize: '14px',
  }),

  platformSelectValue: {
    display: 'flex',
    alignItems: 'center',
    gap: 1,
  },

  divider: {
    borderColor: 'rgba(255, 255, 255, 0.1)',
    my: 3,
  },

  eventsList: {
    listStyle: 'none',
    p: 0,
    m: 0,
    mt: 1.5,
    maxHeight: '400px',
    overflowY: 'auto',
    '&::-webkit-scrollbar': {
      width: '6px',
    },
    '&::-webkit-scrollbar-track': {
      background: 'rgba(255, 255, 255, 0.05)',
      borderRadius: '3px',
    },
    '&::-webkit-scrollbar-thumb': {
      background: 'rgba(255, 255, 255, 0.2)',
      borderRadius: '3px',
      '&:hover': {
        background: 'rgba(255, 255, 255, 0.3)',
      },
    },
  },
};

