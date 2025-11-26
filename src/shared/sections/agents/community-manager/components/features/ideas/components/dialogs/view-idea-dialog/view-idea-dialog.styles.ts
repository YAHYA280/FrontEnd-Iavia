import { Theme } from '@mui/material/styles';

export const styles = {
  dialogPaper: {
    borderRadius: '16px',
    background: 'rgba(13, 45, 69, 0.95)',
    backdropFilter: 'blur(12px)',
    border: '1px solid rgba(6, 158, 255, 0.2)',
    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
  },

  backdrop: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    backdropFilter: 'blur(4px)',
  },

  dialogTitle: (theme: Theme) => ({
    color: '#FFF',
    fontFamily: (theme.typography.fontFamily || 'inherit') as string,
    fontSize: '24px',
    fontWeight: 700,
    pb: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  }),

  dialogTitleText: (theme: Theme) => ({
    color: '#FFF',
    fontFamily: (theme.typography.fontFamily || 'inherit') as string,
    fontSize: '24px',
    fontWeight: 700,
  }),

  statusChip: (theme: Theme, isPublished: boolean) => ({
    backgroundColor: isPublished
      ? 'rgba(16, 185, 129, 0.2)'
      : 'rgba(6, 158, 255, 0.2)',
    color: isPublished ? '#10B981' : '#069EFF',
    fontFamily: (theme.typography.fontFamily || 'inherit') as string,
    fontSize: '12px',
    fontWeight: 600,
    height: '24px',
  }),

  closeButton: {
    color: '#9CA3AF',
    '&:hover': {
      backgroundColor: 'rgba(6, 158, 255, 0.1)',
      color: '#069EFF',
    },
  },

  platformInfo: {
    display: 'flex',
    alignItems: 'center',
    gap: 1.5,
    mb: 3,
    p: 2,
    borderRadius: '12px',
    background: 'rgba(6, 158, 255, 0.05)',
    border: '1px solid rgba(6, 158, 255, 0.2)',
  },

  platformName: (theme: Theme) => ({
    color: '#EDEDED',
    fontFamily: (theme.typography.fontFamily || 'inherit') as string,
    fontSize: '16px',
    fontWeight: 600,
  }),

  platformDate: (theme: Theme) => ({
    color: '#9CA3AF',
    fontFamily: (theme.typography.fontFamily || 'inherit') as string,
    fontSize: '12px',
  }),

  imagesTitle: (theme: Theme) => ({
    color: '#EDEDED',
    fontFamily: (theme.typography.fontFamily || 'inherit') as string,
    fontSize: '14px',
    fontWeight: 600,
    mb: 1.5,
  }),

  imageContainer: {
    position: 'relative',
    width: '100%',
    aspectRatio: '16/9',
    borderRadius: '12px',
    overflow: 'hidden',
    border: '1px solid rgba(6, 158, 255, 0.3)',
    backgroundColor: '#1A1D25',
  },

  image: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  },

  downloadButton: {
    position: 'absolute',
    top: 12,
    right: 12,
    width: '36px',
    height: '36px',
    backgroundColor: 'rgba(13, 45, 69, 0.9)',
    backdropFilter: 'blur(4px)',
    color: '#FFF',
    border: '1px solid rgba(6, 158, 255, 0.3)',
    zIndex: 2,
    '&:hover': {
      backgroundColor: 'rgba(13, 45, 69, 1)',
      borderColor: 'rgba(6, 158, 255, 0.5)',
    },
  },

  navButton: (canNavigate: boolean) => ({
    position: 'absolute',
    top: '50%',
    transform: 'translateY(-50%)',
    width: '36px',
    height: '36px',
    backgroundColor: canNavigate
      ? 'rgba(13, 45, 69, 0.9)'
      : 'rgba(13, 45, 69, 0.3)',
    backdropFilter: 'blur(4px)',
    color: canNavigate ? '#FFF' : 'rgba(255, 255, 255, 0.3)',
    border: '1px solid rgba(6, 158, 255, 0.3)',
    zIndex: 2,
    cursor: canNavigate ? 'pointer' : 'not-allowed',
    '&:hover': {
      backgroundColor: canNavigate
        ? 'rgba(13, 45, 69, 1)'
        : 'rgba(13, 45, 69, 0.3)',
      borderColor: canNavigate
        ? 'rgba(6, 158, 255, 0.5)'
        : 'rgba(6, 158, 255, 0.3)',
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

  captionTitle: (theme: Theme) => ({
    color: '#EDEDED',
    fontFamily: (theme.typography.fontFamily || 'inherit') as string,
    fontSize: '14px',
    fontWeight: 600,
    mb: 1.5,
  }),

  captionContainer: {
    p: 2.5,
    borderRadius: '12px',
    background: '#1A1D25',
    border: '1px solid rgba(6, 158, 255, 0.2)',
  },

  captionText: (theme: Theme) => ({
    color: '#FFF',
    fontFamily: (theme.typography.fontFamily || 'inherit') as string,
    fontSize: '14px',
    lineHeight: '1.6',
    whiteSpace: 'pre-wrap',
  }),

  captionLength: (theme: Theme) => ({
    color: '#9CA3AF',
    fontFamily: (theme.typography.fontFamily || 'inherit') as string,
    fontSize: '12px',
    mt: 2,
  }),

  dialogActions: {
    p: 3,
    gap: 2,
    borderTop: '1px solid rgba(6, 158, 255, 0.1)',
    flexDirection: 'column',
    alignItems: 'stretch',
  },

  publishButton: (theme: Theme) => ({
    height: '44px',
    borderRadius: '12px',
    background: '#069EFF',
    color: '#FFF',
    fontFamily: (theme.typography.fontFamily || 'inherit') as string,
    fontSize: '14px',
    fontWeight: 600,
    textTransform: 'none',
    boxShadow: '0 4px 12px rgba(6, 158, 255, 0.3)',
    '&:hover': {
      background: '#0588d6',
      boxShadow: '0 6px 16px rgba(6, 158, 255, 0.4)',
    },
  }),

  editButton: (theme: Theme) => ({
    flex: 1,
    height: '40px',
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

  deleteButton: (theme: Theme) => ({
    flex: 1,
    height: '40px',
    borderRadius: '12px',
    border: '1px solid rgba(224, 67, 67, 0.5)',
    backgroundColor: 'transparent',
    color: '#E04343',
    fontFamily: (theme.typography.fontFamily || 'inherit') as string,
    fontSize: '14px',
    fontWeight: 600,
    textTransform: 'none',
    '&:hover': {
      backgroundColor: 'rgba(224, 67, 67, 0.1)',
      borderColor: '#E04343',
    },
  }),

  actionsRow: {
    display: 'flex',
    gap: 1,
    width: '100%',
  },
};

