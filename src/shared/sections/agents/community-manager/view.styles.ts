import { SxProps, Theme } from '@mui/material';

export const styles = {
  root: { display: 'flex', width: '100%', minHeight: '100vh' } as SxProps<Theme>,

  outer: { width: '100%', p: { xs: 1, sm: 1.5, md: 1.5 } } as SxProps<Theme>,

  frame: {
    width: '100%',
    height: 'calc(100vh - 32px)',
    borderRadius: { xs: '16px', md: '24px' },
    border: '2px solid transparent',
    background: `
              linear-gradient(#1a1a2e, #0d2d45) padding-box,
              linear-gradient(45deg, #BE30FF, #5D31F8, #00A3FF) border-box
            `,
    backgroundColor: 'rgb(13, 45, 69)',
    display: 'flex',
    position: 'relative',
    mx: 'auto',
    overflow: 'hidden',
  } as SxProps<Theme>,

  frameOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgb(13, 45, 69)',
    borderRadius: { xs: '16px', md: '24px' },
    zIndex: 0,
  } as SxProps<Theme>,

  contentRow: {
    display: 'flex',
    position: 'relative',
    zIndex: 1,
    flex: 1,
    height: '100%',
    overflow: 'hidden',
  } as SxProps<Theme>,

  sidebar: {
    width: '260px',
    height: '100%',
    flexShrink: 0,
    borderRadius: { xs: '16px', md: '24px' },
    backgroundColor: 'rgb(12, 68, 106)',
    position: 'relative',
    zIndex: 2,
    display: 'flex',
    flexDirection: 'column',
    padding: '8px 20px 24px 20px',
    gap: '16px',
    overflow: 'hidden',
  } as SxProps<Theme>,

  sidebarMenu: { display: 'flex', flexDirection: 'column', mt: -2 } as SxProps<Theme>,

  menuButton: (theme: Theme, isActive: boolean): SxProps<Theme> => ({
    width: '100%',
    py: 1.5,
    px: 2,
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    borderRadius: '8px',
    background: isActive ? 'rgb(11, 86, 136)' : 'transparent',
    border: 'none',
    cursor: 'pointer',
    color: isActive ? '#069EFF' : '#EDEDED',
    fontFamily: theme.typography.fontFamily,
    fontSize: '20px',
    fontStyle: 'normal',
    fontWeight: isActive ? 700 : 500,
    lineHeight: 'normal',
    transition: 'all 0.2s ease',
    textAlign: 'left',
    mb: 1,
    minHeight: '48px',
    '&:last-child': { mb: 0 },
    '&:hover': {
      background: isActive ? 'rgb(11, 86, 136)' : 'rgba(6, 158, 255, 0.20)',
      color: isActive ? '#069EFF' : '#069EFF',
    },
  }),

  menuButtonLabel: (theme: Theme, isActive: boolean): SxProps<Theme> => ({
    flex: '1 1 auto',
    textAlign: 'left',
    fontFamily: theme.typography.fontFamily,
    fontSize: '20px',
    fontStyle: 'normal',
    fontWeight: isActive ? 700 : 500,
    lineHeight: 'normal',
    color: 'inherit',
  }),

  main: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    position: 'relative',
    padding: '24px',
    boxShadow: 'none',
    borderRadius: { xs: '16px', md: '24px' },
    zIndex: 1,
    overflow: 'hidden',
  } as SxProps<Theme>,

  scrollArea: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    height: '100%',
    overflowY: 'auto',
    overflowX: 'hidden',
    '&::-webkit-scrollbar': { width: '0px', display: 'none' },
    '&::-webkit-scrollbar-track': { display: 'none' },
    '&::-webkit-scrollbar-thumb': { display: 'none' },
    scrollbarWidth: 'none',
    msOverflowStyle: 'none',
  } as SxProps<Theme>,

  ideasHeaderRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    mb: 4,
    gap: 2,
  } as SxProps<Theme>,

  ideasTitle: (theme: Theme): SxProps<Theme> => ({
    color: '#EDEDED',
    fontFamily: theme.typography.fontTertiaryFamily,
    fontSize: '24px',
    fontWeight: 700,
    lineHeight: '121.331%',
    mb: 1,
  }),

  ideasSubtitle: (theme: Theme): SxProps<Theme> => ({
    maxWidth: '1038px',
    color: '#9CA3AF',
    fontFamily: theme.typography.fontFamily,
    fontSize: '18px',
    fontWeight: 500,
    lineHeight: '121.331%',
  }),

  genIdeasBtn: (theme: Theme): SxProps<Theme> => ({
    height: { xs: '44px', sm: '48px' },
    padding: { xs: '12px 16px', sm: '14px 24px' },
    borderRadius: '16px',
    backgroundColor: '#069EFF',
    background: '#069EFF',
    backgroundImage: 'none',
    color: '#FFF',
    fontFamily: theme.typography.fontFamily,
    fontSize: { xs: '14px', sm: '16px' },
    fontWeight: 600,
    textTransform: 'none',
    boxShadow: '0 4px 12px rgba(6, 158, 255, 0.3)',
    '&:hover': {
      backgroundColor: '#0588d6',
      background: '#0588d6',
      backgroundImage: 'none',
      boxShadow: '0 6px 16px rgba(6, 158, 255, 0.4)',
    },
  }),
};


