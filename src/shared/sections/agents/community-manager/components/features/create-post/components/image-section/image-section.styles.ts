import { SxProps, Theme } from '@mui/material/styles';

export const styles = {
  thumbnailLabel: (theme: Theme): SxProps<Theme> => ({
    color: '#9CA3AF',
    fontFamily: theme.typography.fontFamily,
    fontSize: '12px',
    fontWeight: 600,
    mb: 1,
  }),

  thumbnailContainer: {
    display: 'flex',
    gap: 1,
    overflowX: 'auto',
    pb: 1,
    '&::-webkit-scrollbar': {
      height: '6px',
    },
    '&::-webkit-scrollbar-track': {
      background: 'rgba(6, 158, 255, 0.1)',
      borderRadius: '3px',
    },
    '&::-webkit-scrollbar-thumb': {
      background: 'rgba(6, 158, 255, 0.3)',
      borderRadius: '3px',
      '&:hover': {
        background: 'rgba(6, 158, 255, 0.5)',
      },
    },
  } as SxProps<Theme>,

  thumbnailItem: (isCurrent: boolean, isDragging: boolean): SxProps<Theme> => ({
    position: 'relative',
    width: '80px',
    height: '80px',
    flexShrink: 0,
    borderRadius: '8px',
    overflow: 'hidden',
    border: isCurrent ? '2px solid #069eff' : '2px solid rgba(6, 158, 255, 0.2)',
    cursor: isDragging ? 'grabbing' : 'grab',
    transition: 'all 0.2s ease',
    opacity: isDragging ? 0.8 : 1,
    transform: isDragging ? 'scale(1.05)' : 'scale(1)',
    '&:hover': {
      borderColor: isCurrent ? '#069eff' : 'rgba(6, 158, 255, 0.4)',
      '& .delete-overlay': {
        opacity: 1,
      },
    },
  }),

  thumbnailClickArea: {
    width: '100%',
    height: '100%',
    cursor: 'pointer',
  } as SxProps<Theme>,

  thumbnailImage: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    pointerEvents: 'none',
  } as SxProps<Theme>,

  deleteOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    opacity: 0,
    transition: 'opacity 0.2s ease',
    pointerEvents: 'none',
  } as SxProps<Theme>,

  deleteButton: {
    backgroundColor: 'rgba(224, 67, 67, 0.9)',
    color: '#FFF',
    width: '28px',
    height: '28px',
    pointerEvents: 'auto',
    '&:hover': {
      backgroundColor: '#E04343',
    },
  } as SxProps<Theme>,

  currentImageIndicator: {
    position: 'absolute',
    top: 4,
    right: 4,
    backgroundColor: '#069eff',
    borderRadius: '50%',
    width: '20px',
    height: '20px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    pointerEvents: 'none',
  } as SxProps<Theme>,

  addImageBox: {
    position: 'relative',
    width: '80px',
    height: '80px',
    flexShrink: 0,
    borderRadius: '8px',
    border: '2px dashed rgba(6, 158, 255, 0.4)',
    backgroundColor: 'rgba(6, 158, 255, 0.05)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    '&:hover': {
      borderColor: '#069eff',
      backgroundColor: 'rgba(6, 158, 255, 0.1)',
    },
  } as SxProps<Theme>,

  emptyImageBox: {
    width: '100%',
    aspectRatio: '16/9',
    borderRadius: '12px',
    border: '2px dashed rgba(6, 158, 255, 0.4)',
    backgroundColor: 'rgba(6, 158, 255, 0.05)',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    mb: 3,
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    '&:hover': {
      borderColor: '#069eff',
      backgroundColor: 'rgba(6, 158, 255, 0.1)',
    },
  } as SxProps<Theme>,

  emptyImageTitle: (theme: Theme): SxProps<Theme> => ({
    color: '#EDEDED',
    fontFamily: theme.typography.fontFamily,
    fontSize: '14px',
    fontWeight: 600,
    mb: 0.5,
  }),

  emptyImageSubtitle: (theme: Theme): SxProps<Theme> => ({
    color: '#9CA3AF',
    fontFamily: theme.typography.fontFamily,
    fontSize: '12px',
  }),

  imageContainer: {
    position: 'relative',
    width: '100%',
    aspectRatio: '16/9',
    borderRadius: '12px',
    overflow: 'hidden',
    border: '1px solid rgba(6, 158, 255, 0.3)',
    backgroundColor: '#1A1D25',
    mb: 2,
  } as SxProps<Theme>,

  imagePreview: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    transition: 'opacity 0.3s ease',
  } as SxProps<Theme>,

  navigationIconButton: (canNavigate: boolean): SxProps<Theme> => ({
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

  imageCounterBox: {
    position: 'absolute',
    bottom: 12,
    right: 12,
    backgroundColor: 'rgba(13, 45, 69, 0.9)',
    backdropFilter: 'blur(4px)',
    borderRadius: '8px',
    padding: '4px 12px',
    zIndex: 2,
  } as SxProps<Theme>,

  imageCounterText: (theme: Theme): SxProps<Theme> => ({
    color: '#FFF',
    fontFamily: theme.typography.fontFamily,
    fontSize: '12px',
    fontWeight: 600,
  }),

  replaceImageContainer: {
    position: 'absolute',
    top: 12,
    right: 12,
    zIndex: 2,
  } as SxProps<Theme>,

  changeImageButton: (theme: Theme): SxProps<Theme> => ({
    backgroundColor: 'rgba(13, 45, 69, 0.9)',
    backdropFilter: 'blur(4px)',
    color: '#FFF',
    border: '1px solid rgba(6, 158, 255, 0.3)',
    fontFamily: theme.typography.fontFamily,
    fontSize: '12px',
    fontWeight: 600,
    textTransform: 'none',
    zIndex: 2,
    '&:hover': {
      backgroundColor: 'rgba(13, 45, 69, 1)',
      borderColor: 'rgba(6, 158, 255, 0.5)',
    },
  }),
};

