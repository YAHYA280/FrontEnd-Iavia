import { Button, ButtonProps } from '@mui/material';
import { forwardRef } from 'react';

export interface ConfigurationToggleButtonTheme {
  active: {
    text: string;
    border: string;
  };
  inactive: {
    text: string;
    border: string;
  };
  hover: {
    border: string;
    background?: string;
  };
  dimensions?: {
    minWidth?: string | number;
    height?: string | number;
    padding?: string;
  };
}

export interface ConfigurationToggleButtonProps extends Omit<ButtonProps, 'variant'> {
  active?: boolean;
  variant?: 'default' | 'outlined';
  theme?: Partial<ConfigurationToggleButtonTheme>;
}

export const ConfigurationToggleButton = forwardRef<HTMLButtonElement, ConfigurationToggleButtonProps>(
  ({ 
    active = false, 
    variant = 'default', 
    children, 
    theme,
    sx, 
    ...other 
  }, ref) => {
    
    // Default theme
    const buttonTheme: ConfigurationToggleButtonTheme = {
      active: {
        text: '#FFF',
        border: '#8D31FB',
        ...theme?.active,
      },
      inactive: {
        text: 'rgba(255, 255, 255, 0.7)',
        border: 'transparent',
        ...theme?.inactive,
      },
      hover: {
        border: 'rgba(141, 49, 251, 0.5)',
        ...theme?.hover,
      },
      dimensions: {
        padding: '5px',
        ...theme?.dimensions,
      },
    };

    const getActiveStyles = () => {
      return active
        ? {
            color: buttonTheme.active.text,
            borderBottom: `2px solid ${buttonTheme.active.border}`,
          }
        : {
            color: buttonTheme.inactive.text,
            borderBottom: `2px solid ${buttonTheme.inactive.border}`,
          };
    };

    return (
      <Button
        ref={ref}
        variant="text"
        sx={{
          borderRadius: 0,
          textTransform: 'none',
          fontWeight: 500,
          minWidth: buttonTheme.dimensions?.minWidth,
          height: buttonTheme.dimensions?.height,
          px: { xs: '12px', sm: '20px' },
          py: buttonTheme.dimensions?.padding,
          transition: 'all 0.2s ease-in-out',
          fontFamily: 'var(--font-primary)',
          fontSize: { xs: '12px', sm: '14px' },
          flex: { xs: '0 0 auto', sm: 1 },
          backgroundColor: 'transparent',
          border: 'none',
          whiteSpace: 'nowrap',
          ...getActiveStyles(),
          '&:hover': {
            backgroundColor: buttonTheme.hover?.background || 'transparent',
            borderBottom: `2px solid ${buttonTheme.hover.border}`,
          },
          ...sx,
        }}
        {...other}
      >
        {children}
      </Button>
    );
  }
);

ConfigurationToggleButton.displayName = 'ConfigurationToggleButton';