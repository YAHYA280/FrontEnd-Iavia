import { SxProps, Theme } from '@mui/material';

export const styles = {
  historyItem: (isActive: boolean): SxProps<Theme> => ({
    display: 'flex',
    width: '100%',
    padding: '12px 8px',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderRadius: '8px',
    background: isActive ? 'rgba(93, 46, 255, 0.1)' : 'transparent',
    border: 'none',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    textAlign: 'left',
    mb: 1,
    position: 'relative',
    '&:hover': {
      backgroundColor: 'rgba(93, 46, 255, 0.1)',
      '& .menu-button': {
        opacity: 1,
      },
    },
    '&:last-child': {
      mb: 0,
    },
  }),

  historyItemText: {
    color: '#EDEDED',
    fontFamily: 'Inter, sans-serif',
    fontSize: '15px',
    fontStyle: 'normal',
    fontWeight: 500,
    lineHeight: 'normal',
    textOverflow: 'ellipsis',
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    flex: 1,
    textAlign: 'left',
  } as SxProps<Theme>,

  menuButton: {
    opacity: 0,
    transition: 'opacity 0.2s ease',
    color: '#9CA3AF',
    padding: '4px',
    minWidth: 'auto',
    width: '24px',
    height: '24px',
    '&:hover': {
      backgroundColor: 'rgba(255, 255, 255, 0.1)',
      color: '#5D2EFF',
    },
  } as SxProps<Theme>,

  menuIcon: {
    fontSize: '14px',
    color: '#fff',
  } as React.CSSProperties,

  renameInput: {
    width: '100%',
    '& .MuiInputBase-root': {
      color: '#EDEDED',
      fontFamily: 'Inter, sans-serif',
      fontSize: '15px',
      background: 'rgba(255, 255, 255, 0.1)',
      borderRadius: '4px',
      '& .MuiOutlinedInput-notchedOutline': {
        borderColor: '#5D2EFF',
      },
      '&:hover .MuiOutlinedInput-notchedOutline': {
        borderColor: '#5D2EFF',
      },
      '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
        borderColor: '#5D2EFF',
      },
    },
    '& .MuiInputBase-input': {
      padding: '4px 8px',
      color: '#EDEDED',
    },
  } as SxProps<Theme>,

  menuPaper: {
    backgroundColor: '#1F1745',
    borderRadius: '8px',
    border: '1px solid rgba(93, 46, 255, 0.3)',
    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.3)',
    minWidth: '140px',
    '& .MuiList-root': {
      padding: '4px',
    },
  } as SxProps<Theme>,

  menuItem: {
    color: '#EDEDED',
    fontFamily: 'Inter, sans-serif',
    fontSize: '14px',
    padding: '8px 12px',
    borderRadius: '4px',
    gap: '8px',
    '&:hover': {
      backgroundColor: 'rgba(93, 46, 255, 0.2)',
      color: '#5D2EFF',
    },
  } as SxProps<Theme>,

  deleteMenuItem: {
    color: '#EF4444',
    fontFamily: 'Inter, sans-serif',
    fontSize: '14px',
    padding: '8px 12px',
    borderRadius: '4px',
    gap: '8px',
    '&:hover': {
      backgroundColor: 'rgba(239, 68, 68, 0.1)',
      color: '#EF4444',
    },
  } as SxProps<Theme>,

  menuItemIcon: {
    fontSize: '14px',
    width: '16px',
  } as React.CSSProperties,

  dialogPaper: {
    borderRadius: '16px',
    background: 'rgb(31, 23, 69)',
    backdropFilter: 'blur(12px)',
    minWidth: '400px',
    border: '1px solid rgb(43, 28, 106)',
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
    borderColor: '#5D2EFF',
    backgroundColor: 'transparent',
    color: '#5D2EFF',
    fontFamily: theme.typography.fontFamily,
    textTransform: 'none',
    fontSize: '14px',
    fontWeight: 600,
    '&:hover': {
      backgroundColor: 'rgba(49, 30, 125, 0.5)',
      borderColor: '#5D2EFF',
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