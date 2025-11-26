import { SxProps, Theme } from '@mui/material';

export const styles = {
  messageContainer: (isUser: boolean): SxProps<Theme> => ({
    display: 'flex',
    justifyContent: isUser ? 'flex-end' : 'flex-start',
    alignItems: 'flex-end',
    mb: 3,
    gap: 1,
    width: '100%',
  }),

  avatar: (isUser: boolean): SxProps<Theme> => ({
    width: 32,
    height: 32,
    borderRadius: '50%',
    background: isUser
      ? 'linear-gradient(180deg, #8D31FB 0%, #0F1117 100%)'
      : '#5d2eff',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '14px',
    fontWeight: 600,
    color: '#FFF',
    flexShrink: 0,
    order: isUser ? 2 : 1,
  }),

  messageContent: (isUser: boolean): SxProps<Theme> => ({
    display: 'flex',
    flexDirection: 'column',
    alignItems: isUser ? 'flex-end' : 'flex-start',
    order: isUser ? 1 : 2,
    maxWidth: '100%',
    flex: 1,
  }),

  messageBubble: (isUser: boolean): SxProps<Theme> => ({
    p: '22px',
    borderRadius: isUser ? '24px 24px 0 24px' : '24px 24px 24px 0',
    background: '#0F1117',
    border: isUser ? '1px solid rgba(141, 49, 251, 0.3)' : 'none',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '6px',
    width: 'fit-content',
    maxWidth: '80%',
  }),

  messageText: {
    color: '#EDEDED',
    fontFamily: 'Inter, sans-serif',
    fontSize: '14px',
    lineHeight: 1.4,
    wordBreak: 'break-word',
  } as SxProps<Theme>,

  filesContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: 1,
    mt: 1,
  } as SxProps<Theme>,

  fileChip: {
    backgroundColor: 'rgba(141, 49, 251, 0.2)',
    color: '#8D31FB',
    border: '1px solid rgba(141, 49, 251, 0.3)',
    fontFamily: 'Inter, sans-serif',
    fontSize: '12px',
    '& .MuiChip-deleteIcon': {
      color: '#8D31FB',
    },
  } as SxProps<Theme>,

  timestamp: {
    color: '#9CA3AF',
    fontFamily: 'Inter, sans-serif',
    fontSize: '12px',
    mt: 1,
    opacity: 0.7,
  } as SxProps<Theme>,
};