export const styles = {
  container: {
    py: 4,
    px: 2
  },
  cardStyle: {
    p: 3,
    mb: 6.25,
    background: 'rgba(55, 32, 142, 1)',
    backdropFilter: 'blur(10px)',
    border: '1px solid rgba(49, 30, 125, 0.2)',
    borderRadius: '24px',
    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.3)',
    overflow: 'hidden'
  },
  innerCardStyle: {
    p: 3,
    cursor: "pointer",
    transition: "all 0.3s ease",
    background: 'rgba(111, 78, 255, 0.2)',
    backdropFilter: 'blur(10px)',
    border: '1px solid rgba(49, 30, 125, 0.2)',
    borderRadius: '24px',
    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.3)',
    overflow: 'hidden',
    "&:hover": {
      transform: "scale(1.02)",
      borderColor: "rgba(49, 30, 125, 0.5)",
    },
  },
  selectedCardStyle: {
    p: 3,
    cursor: "pointer",
    transition: "all 0.3s ease",
    background: 'rgba(111, 78, 255, 0.3)',
    backdropFilter: 'blur(10px)',
    border: '2px solid rgba(111, 78, 255, 0.8)',
    borderRadius: '24px',
    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.3)',
    overflow: 'hidden',
    "&:hover": {
      transform: "scale(1.02)",
      borderColor: "rgba(49, 30, 125, 0.5)",
    },
  },
  titleStyle: {
    color: '#FFF',
    fontFamily: 'Inter',
    fontSize: '24px',
    fontWeight: 600,
    mb: 1,
  },
  labelStyle: {
    color: '#FFF',
    fontFamily: 'Inter',
    fontSize: '16px',
    fontWeight: 500,
    mb: 1,
  },
  textStyle: {
    color: '#FFF',
    fontFamily: 'Inter',
  },
  languageLabelStyle: {
    color: '#FFF',
    fontFamily: 'Inter',
    fontSize: '18px',
    fontWeight: 600,
    mb: 2,
  },
  textFieldStyle: (theme: any) => ({
    '& .MuiOutlinedInput-root': {
      color: '#FFF',
      fontFamily: theme.typography.fontFamily,
      fontSize: '14px',
      background: '#1A1D25',
      borderRadius: '24px',
      border: '2px solid transparent',
      backgroundImage:
        'linear-gradient(#1A1D25, #1A1D25), linear-gradient(180deg, #BE30FF 0.66%, #5D31F8 51.44%, #00A3FF 100%)',
      backgroundOrigin: 'border-box',
      backgroundClip: 'padding-box, border-box',
      boxShadow:
        '0 0 2px 0 rgba(0, 0, 0, 0.28), 0 16px 64px 0 rgba(0, 0, 0, 0.16)',
      '& fieldset': { border: 'none' },
      '&:hover fieldset': { border: 'none' },
      '&.Mui-focused fieldset': { border: 'none' },
    },
    '& .MuiInputBase-input::placeholder': {
      color: 'rgba(255, 255, 255, 0.5)',
      opacity: 1,
    },
  }),
  selectStyle: {
    mt: 1,
    '& .MuiOutlinedInput-root': {
      color: '#FFF',
      fontFamily: 'Inter',
      fontSize: '16px',
      fontWeight: 500,
      background: 'rgba(26, 29, 37, 0.8)',
      borderRadius: '24px',
      border: '2px solid rgba(49, 30, 125, 0.2)',
      '&:hover': {
        borderColor: 'rgba(49, 30, 125, 0.4)',
        boxShadow: '0 0 15px rgba(49, 30, 125, 0.15)'
      },
      '&.Mui-focused': {
        borderColor: 'rgba(111, 78, 255, 0.8)',
        boxShadow: '0 0 20px rgba(111, 78, 255, 0.25)'
      },
      '& fieldset': {
        border: 'none'
      }
    },
    '& .MuiSelect-icon': {
      color: 'rgba(255, 255, 255, 0.8)',
      fontSize: '28px',
      right: '12px'
    },
    '& .MuiInputBase-input': {
      padding: '14px 20px',
      fontFamily: 'Inter',
    }
  },
  tvaFrequencySelectStyle: {
    minWidth: 180,
    '& .MuiOutlinedInput-root': {
      color: '#FFF',
      fontFamily: 'Inter',
      fontSize: '14px',
      background: '#1A1D25',
      borderRadius: '16px',
      border: '1px solid rgba(49, 30, 125, 0.2)',
      '&:hover': {
        borderColor: 'rgba(49, 30, 125, 0.4)',
      },
      '&.Mui-focused': {
        borderColor: 'rgba(111, 78, 255, 0.8)',
      },
      '& fieldset': { border: 'none' }
    },
    '& .MuiSelect-icon': {
      color: 'rgba(255, 255, 255, 0.8)',
    }
  },
  saveButtonStyle: {
    background: 'rgba(111, 78, 255, 0.9)',
    borderRadius: '24px',
    px: 4,
    py: 1.5,
    fontFamily: 'Inter',
    fontWeight: 600,
    fontSize: '16px',
    '&:hover': {
      background: 'rgba(111, 78, 255, 1)',
      transform: 'scale(1.02)',
      boxShadow: '0 4px 20px rgba(111, 78, 255, 0.3)',
    },
    transition: 'all 0.3s ease',
  },
  checkboxStyle: {
    color: 'rgba(111, 78, 255, 0.8)',
    '&.Mui-checked': {
      color: 'rgba(111, 78, 255, 1)',
    },
  },
  sliderStyle: {
    flex: 1,
    color: 'rgba(111, 78, 255, 0.8)',
    '& .MuiSlider-thumb': {
      background: 'rgba(111, 78, 255, 1)',
      width: 20,
      height: 20,
    },
    '& .MuiSlider-track': {
      background: 'rgba(111, 78, 255, 0.8)',
      height: 6,
    },
    '& .MuiSlider-rail': {
      background: 'rgba(255, 255, 255, 0.1)',
      height: 6,
    }
  },
  chipStyle: {
    background: 'rgba(111, 78, 255, 0.3)',
    color: '#FFF',
    border: '1px solid rgba(111, 78, 255, 0.5)',
    fontFamily: 'Inter',
    fontWeight: 600,
    fontSize: '14px',
    height: '32px',
  },
  menuProps: {
    PaperProps: {
      sx: {
        background: 'rgba(26, 29, 37, 0.95)',
        backdropFilter: 'blur(20px)',
        border: '1px solid rgba(49, 30, 125, 0.3)',
        borderRadius: '16px',
        marginTop: '8px',
        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.4)',
        '& .MuiList-root': {
          padding: '8px',
        },
        '& .MuiMenuItem-root': {
          fontFamily: 'Inter',
          fontSize: '16px',
          fontWeight: 500,
          borderRadius: '12px',
          marginBottom: '4px',
          color: '#FFF',
          padding: '12px 16px',
          transition: 'all 0.2s ease',
          '&:hover': {
            background: 'rgba(111, 78, 255, 0.2)',
            transform: 'translateX(4px)',
          },
          '&.Mui-selected': {
            background: 'rgba(111, 78, 255, 0.3)',
            border: '1px solid rgba(111, 78, 255, 0.5)',
            '&:hover': {
              background: 'rgba(111, 78, 255, 0.4)',
            }
          },
          '&:last-child': {
            marginBottom: 0
          }
        }
      }
    }
  },
  languageMenuItemStyle: (selectedChannel: string | null, channelsConfig: any, language: any) => ({
    fontFamily: 'Inter',
    fontSize: '16px',
    color: '#FFF',
    fontWeight: selectedChannel && channelsConfig[selectedChannel].language === language.value ? 600 : 500,
    background: selectedChannel && channelsConfig[selectedChannel].language === language.value 
      ? 'rgba(111, 78, 255, 0.3)' 
      : 'transparent',
    '&:hover': {
      background: 'rgba(111, 78, 255, 0.2)',
    },
    '&.Mui-selected': {
      background: 'rgba(111, 78, 255, 0.3)',
      '&:hover': {
        background: 'rgba(111, 78, 255, 0.4)',
      }
    }
  }),
  languageFlagBoxStyle: (selectedChannel: string | null, channelsConfig: any, language: any) => ({
    width: 24,
    height: 24,
    borderRadius: '4px',
    background: selectedChannel && channelsConfig[selectedChannel].language === language.value 
      ? 'rgba(111, 78, 255, 0.8)' 
      : 'rgba(255, 255, 255, 0.1)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '12px',
    fontWeight: 'bold',
    color: '#FFF'
  }),
  languageSelectRenderValueStyle: {
    color: '#FFF',
    fontFamily: 'Inter',
    fontSize: '16px',
    fontWeight: 600
  }
} as const;