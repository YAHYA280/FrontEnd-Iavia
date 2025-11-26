import { SxProps, Theme } from '@mui/material';

export const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    height: '100%',
    minHeight: '100%',
    padding: '40px 0px 0px 0px',
    position: 'relative',
    flex: 1,
  } as SxProps<Theme>,

  avatarContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-end',
    position: 'relative',
    height: '380px',
    marginBottom: '40px',
  } as SxProps<Theme>,

  avatarBackground: {
    width: '200px',
    height: '50px',
    flexShrink: 0,
    borderRadius: '25px',
    background: 'linear-gradient(180deg, rgba(40, 23, 69, 0.00) 25.21%, #281745 86.3%)',
    position: 'absolute',
    bottom: '30px',
    left: '50%',
    transform: 'translateX(-50%)',
    zIndex: 3,
  } as SxProps<Theme>,

  avatarImage: {
    width: '280px',
    height: '380px',
    flexShrink: 0,
    borderRadius: '17.469px',
    background: 'url(/avatars/ziri-avatar.png) center center / cover no-repeat',
    position: 'absolute',
    bottom: '0px',
    left: '50%',
    transform: 'translateX(-50%)',
    zIndex: 2,
    backgroundColor: 'transparent',
  } as SxProps<Theme>,

  welcomeSection: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    textAlign: 'center',
    gap: 2,
    width: '100%',
    maxWidth: '800px',
    marginBottom: '40px',
  } as SxProps<Theme>,

  welcomeTitle: {
    color: '#EDEDED',
    fontFamily: '"IBM Plex Sans", sans-serif',
    fontSize: '50px',
    fontStyle: 'normal',
    fontWeight: 700,
    lineHeight: '121.331%',
    margin: 0,
  } as SxProps<Theme>,

  agentName: {
    color: '#EDEDED',
    fontFamily: '"IBM Plex Sans", sans-serif',
    fontSize: '50px',
    fontStyle: 'normal',
    fontWeight: 700,
    lineHeight: '121.331%',
    textTransform: 'uppercase',
    display: 'inline',
  } as SxProps<Theme>,

  welcomeSubtitle: {
    color: '#9CA3AF',
    fontFamily: 'Inter, sans-serif',
    fontSize: '25px',
    fontStyle: 'normal',
    fontWeight: 500,
    lineHeight: '121.331%',
    margin: 0,
  } as SxProps<Theme>,

  inputContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    width: '100%',
    marginTop: 'auto',
    paddingBottom: '60px',
    paddingLeft: '24px',
    paddingRight: '24px',
  } as SxProps<Theme>,

  inputWrapper: {
    width: '100%',
    height: '62.54px',
    flexShrink: 0,
    borderRadius: '16px',
    border: '2px solid transparent',
    backgroundImage: 'linear-gradient(#1A1D25, #1A1D25), linear-gradient(180deg, #BE30FF 0.66%, #5D31F8 51.44%, #00A3FF 100%)',
    backgroundOrigin: 'border-box',
    backgroundClip: 'padding-box, border-box',
    boxShadow: '0 0 2px 0 rgba(0, 0, 0, 0.28), 0 16px 64px 0 rgba(0, 0, 0, 0.16)',
    padding: '4px',
  } as SxProps<Theme>,

  textField: {
    width: '100%',
    '& .MuiOutlinedInput-root': {
      color: '#FFF',
      fontFamily: 'Inter, sans-serif',
      fontSize: '22px',
      background: 'transparent',
      padding: '0 !important',
      height: '100%',
      alignItems: 'center',
      '& fieldset': {
        border: 'none',
      },
      '&:hover fieldset': {
        border: 'none',
      },
      '&.Mui-focused fieldset': {
        border: 'none',
      },
    },
    '& .MuiInputBase-input': {
      padding: '0px 16px',
      color: '#9CA3AF',
      fontFeatureSettings: "'liga' off, 'clig' off",
      fontFamily: 'Inter, sans-serif',
      fontSize: '22px',
      fontStyle: 'normal',
      fontWeight: 400,
      lineHeight: '54px',
      letterSpacing: '1px',
      height: '100%',
      display: 'flex',
      alignItems: 'center',
      '&::placeholder': {
        color: '#9CA3AF',
        opacity: 1,
        fontFeatureSettings: "'liga' off, 'clig' off",
        fontFamily: 'Inter, sans-serif',
        fontSize: '22px',
        fontStyle: 'normal',
        fontWeight: 400,
        lineHeight: '54px',
        letterSpacing: '1px',
      },
    },
    '& .MuiInputBase-inputMultiline': {
      padding: '0px 16px !important',
      minHeight: 'auto !important',
      display: 'flex',
      alignItems: 'center',
    },
  } as SxProps<Theme>,

  audioButton: {
    background: 'transparent',
    border: 'none',
    cursor: 'pointer',
    padding: '12px',
    margin: '0 0 0 8px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '8px',
    transition: 'all 0.2s ease',
    height: '40px',
    '&:hover': {
      backgroundColor: 'rgb(49, 30, 125)',
    },
  } as SxProps<Theme>,

  audioIcon: {
    fontSize: '25px',
    color: '#5D2EFF',
  } as React.CSSProperties,

  magicButton: {
    background: 'transparent',
    border: 'none',
    cursor: 'pointer',
    padding: '10px',
    margin: '0 4px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '4px',
    transition: 'all 0.2s ease',
    color: '#5D2EFF',
    minWidth: '40px',
    minHeight: '40px',
    '&:hover': {
      backgroundColor: 'rgba(93, 46, 255, 0.1)',
      color: '#5D2EFF',
    },
  } as SxProps<Theme>,

  magicIcon: {
    fontSize: '20px',
    color: '#5D2EFF',
  } as React.CSSProperties,

  attachButton: {
    background: 'transparent',
    border: 'none',
    cursor: 'pointer',
    padding: '10px',
    margin: '0 4px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '4px',
    transition: 'all 0.2s ease',
    color: '#5D2EFF',
    minWidth: '40px',
    minHeight: '40px',
    '&:hover': {
      backgroundColor: 'rgba(93, 46, 255, 0.1)',
      color: '#5D2EFF',
    },
  } as SxProps<Theme>,

  attachIcon: {
    fontSize: '20px',
    color: '#5D2EFF',
  } as React.CSSProperties,

  microphoneButton: {
    background: 'transparent',
    border: 'none',
    cursor: 'pointer',
    padding: '10px',
    margin: '0 4px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '4px',
    transition: 'all 0.2s ease',
    color: '#5D2EFF',
    minWidth: '40px',
    minHeight: '40px',
    '&:hover': {
      backgroundColor: 'rgba(93, 46, 255, 0.1)',
      color: '#5D2EFF',
    },
  } as SxProps<Theme>,

  microphoneIcon: {
    fontSize: '20px',
    color: '#5D2EFF',
  } as React.CSSProperties,

  sendButton: {
    background: 'transparent',
    border: 'none',
    cursor: 'pointer',
    padding: '10px',
    margin: '0 4px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '4px',
    transition: 'all 0.2s ease',
    color: '#5D2EFF',
    minWidth: '40px',
    minHeight: '40px',
    '&:hover': {
      backgroundColor: 'rgba(93, 46, 255, 0.1)',
      color: '#5D2EFF',
    },
  } as SxProps<Theme>,

  sendIcon: {
    fontSize: '20px',
    color: '#5D2EFF',
  } as React.CSSProperties,

  filesContainer: {
    width: '100%',
    marginBottom: '12px',
    padding: '12px 16px',
    borderRadius: '12px',
    backgroundColor: 'rgba(93, 46, 255, 0.05)',
    border: '1px solid rgba(93, 46, 255, 0.2)',
  } as SxProps<Theme>,

  filesTitle: {
    color: '#9CA3AF',
    fontFamily: 'Inter, sans-serif',
    fontSize: '14px',
    fontWeight: 500,
    mb: 1,
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

  messagesContainer: {
    flex: 1,
    overflowY: 'auto',
    padding: '20px 24px',
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
  } as SxProps<Theme>,

  messagesList: {
    display: 'flex',
    flexDirection: 'column',
    gap: 2,
    width: '100%',
  } as SxProps<Theme>,

  welcomeContent: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
    flex: 1,
    width: '100%',
  } as SxProps<Theme>,
};