import { Theme } from '@mui/material/styles';

export const styles = {
  card: {
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: 'rgb(12, 68, 106)',
    borderRadius: '16px',
    border: '1px solid rgba(6, 158, 255, 0.2)',
    overflow: 'hidden',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    '&:hover': {
      borderColor: 'rgba(6, 158, 255, 0.4)',
      boxShadow: '0 4px 12px rgba(6, 158, 255, 0.2)',
    },
  },

  imageContainer: {
    position: 'relative',
    width: '100%',
    aspectRatio: '16/9',
    overflow: 'hidden',
    backgroundColor: '#1A1D25',
  },

  image: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    transition: 'opacity 0.3s ease',
  },

  platformLogoContainer: {
    position: 'absolute',
    top: 12,
    left: 12,
    width: 32,
    height: 32,
    backgroundColor: 'rgba(13, 45, 69, 0.9)',
    borderRadius: '8px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '4px',
    backdropFilter: 'blur(4px)',
    zIndex: 2,
  },

  platformLogo: {
    width: '100%',
    height: '100%',
    objectFit: 'contain',
  },

  navButton: (canNavigate: boolean) => ({
    position: 'absolute',
    top: '50%',
    transform: 'translateY(-50%)',
    width: '36px',
    height: '36px',
    backgroundColor: canNavigate ? 'rgba(13, 45, 69, 0.9)' : 'rgba(13, 45, 69, 0.3)',
    backdropFilter: 'blur(4px)',
    color: canNavigate ? '#FFF' : 'rgba(255, 255, 255, 0.3)',
    border: '1px solid rgba(6, 158, 255, 0.3)',
    zIndex: 2,
    cursor: canNavigate ? 'pointer' : 'not-allowed',
    '&:hover': {
      backgroundColor: canNavigate ? 'rgba(13, 45, 69, 1)' : 'rgba(13, 45, 69, 0.3)',
      borderColor: canNavigate ? 'rgba(6, 158, 255, 0.5)' : 'rgba(6, 158, 255, 0.3)',
    },
    '&.Mui-disabled': {
      backgroundColor: 'rgba(13, 45, 69, 0.3)',
      color: 'rgba(255, 255, 255, 0.3)',
    },
  }),

  navButtonLeft: {
    left: 12,
  },

  navButtonRight: {
    right: 12,
  },

  imageCounter: {
    position: 'absolute',
    bottom: 12,
    right: 12,
    backgroundColor: 'rgba(13, 45, 69, 0.9)',
    backdropFilter: 'blur(4px)',
    borderRadius: '8px',
    padding: '4px 12px',
    zIndex: 2,
  },

  imageCounterText: (theme: Theme) => ({
    color: '#FFF',
    fontFamily: (theme.typography.fontFamily || 'inherit') as string,
    fontSize: '12px',
    fontWeight: 600,
  }),

  content: {
    p: 2.5,
    display: 'flex',
    flexDirection: 'column',
    gap: 2,
  },

  caption: (theme: Theme) => ({
    color: '#FFF',
    fontFamily: (theme.typography.fontFamily || 'inherit') as string,
    fontSize: '14px',
    fontWeight: 500,
    lineHeight: '1.5',
    minHeight: '42px',
    display: '-webkit-box',
    WebkitLineClamp: 2,
    WebkitBoxOrient: 'vertical',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  }),

  date: (theme: Theme) => ({
    color: '#9CA3AF',
    fontFamily: (theme.typography.fontFamily || 'inherit') as string,
    fontSize: '12px',
    fontWeight: 500,
    mb: -0.5,
  }),

  actionsContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: 1.5,
  },

  actionsRow: {
    display: 'flex',
    alignItems: 'center',
    gap: 1,
  },

  editButton: (theme: Theme) => ({
    flex: 1,
    height: '36px',
    borderRadius: '12px',
    border: '1px solid rgba(6, 158, 255, 0.5)',
    backgroundColor: 'transparent',
    color: '#069eff',
    fontFamily: (theme.typography.fontFamily || 'inherit') as string,
    fontSize: '14px',
    fontWeight: 600,
    textTransform: 'none',
    '&:hover': {
      backgroundColor: 'rgba(6, 158, 255, 0.1)',
      borderColor: '#069eff',
    },
  }),

  deleteButton: {
    width: '36px',
    height: '36px',
    borderRadius: '12px',
    border: '1px solid rgba(255, 86, 48, 0.3)',
    color: '#FF5630',
    '&:hover': {
      backgroundColor: 'rgba(255, 86, 48, 0.1)',
      borderColor: '#FF5630',
    },
  },

  publishButton: (theme: Theme) => ({
    width: '100%',
    height: '40px',
    borderRadius: '12px',
    background: '#069EFF',
    color: '#FFF',
    fontFamily: (theme.typography.fontFamily || 'inherit') as string,
    fontSize: '16px',
    fontWeight: 600,
    textTransform: 'none',
    boxShadow: '0 4px 12px rgba(6, 158, 255, 0.3)',
    '&:hover': {
      background: '#0588d6',
      boxShadow: '0 6px 16px rgba(6, 158, 255, 0.4)',
    },
  }),
};

