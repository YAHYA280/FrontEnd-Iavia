import { Box, Typography, Switch, Chip, Card, CardProps, Button } from '@mui/material';
import { forwardRef, useState } from 'react';

export interface ColorTheme {
  card: {
    background: string;
    text: string;
  };
  status: {
    connected: string;
    disconnected: string;
  };
  button: {
    background: string;
    text: string;
    hover?: string;
    active?: string;
  };
  switch: {
    connected: string;
    disconnected: string;
  };
}

export interface IntegrationCardProps extends Omit<CardProps, 'children'> {
  platformName: string;
  logoSrc: string;
  isConnected: boolean;
  onToggleChange?: (platformName: string, isConnected: boolean) => void;
  onConnect?: (platformName: string) => void;
  showLinkIcon?: boolean;
  colors?: Partial<ColorTheme>;
}

export const IntegrationCard = forwardRef<HTMLDivElement, IntegrationCardProps>(
  ({
    platformName,
    logoSrc,
    isConnected,
    onToggleChange,
    onConnect,
    showLinkIcon = false,
    colors,
    sx,
    ...other
  }, ref) => {
    const [connected, setConnected] = useState(isConnected);

    // default theme
    const theme: ColorTheme = {
      card: {
        background: 'rgba(141, 49, 251, 0.20)',
        text: '#FFF',
        ...colors?.card,
      },
      status: {
        connected: '#10B981',
        disconnected: '#EF4444',
        ...colors?.status,
      },
      button: {
        background: '#3C1C69',
        text: '#8D31FB',
        hover: '#4C2086',
        active: '#2A0F4A',
        ...colors?.button,
      },
      switch: {
        connected: '#9FE3CD',
        disconnected: '#F9B4B4',
        ...colors?.switch,
      },
    };

    const handleToggleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const newStatus = event.target.checked;
      setConnected(newStatus);
      onToggleChange?.(platformName, newStatus);
    };

    const handleConnect = () => {
      onConnect?.(platformName);
    };

    const getStatusStyles = (connected: boolean) => {
      const statusColor = connected ? theme.status.connected : theme.status.disconnected;
      return {
        color: statusColor,
        backgroundColor: `${statusColor}20`, 
      };
    };

    const getStatusLabel = (connected: boolean) => {
      return connected ? 'Connecté' : 'Déconnecté';
    };

    return (
      <Card
        ref={ref}
        sx={{
          width: '100%',
          height: '180px',
          p: 2,
          backgroundColor: theme.card.background,
          borderRadius: '24px',
          border: 'none',
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          justifyContent: 'space-between',
          gap: 2,
          ...sx,
        }}
        {...other}
      >
        {/* Status Badge and Switch in same row */}
        <Box
          sx={{
            width: '100%',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          {/* Status Badge */}
          <Chip
            label={getStatusLabel(connected)}
            size="small"
            sx={{
              ...getStatusStyles(connected),
              fontSize: '9.556px',
              fontWeight: 600,
              lineHeight: '14.333px',
              fontFamily: 'Inter',
              height: 'auto',
              padding: '2.389px 6.37px',
              borderRadius: '79.63px',
              '& .MuiChip-label': {
                padding: 0,
              },
            }}
          />

          {/* Toggle Switch or Link Icon */}
          {showLinkIcon ? (
            <Box
              sx={{
                width: 24,
                height: 24,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: theme.button.text,
              }}
            >
              🔗
            </Box>
          ) : (
            <Switch
              checked={connected}
              onChange={handleToggleChange}
              size="small"
              sx={{
                width: '30px',
                height: '20px',
                padding: 0,
                '& .MuiSwitch-switchBase': {
                  padding: '2px',
                  '&.Mui-checked': {
                    transform: 'translateX(10px)',
                    '& + .MuiSwitch-track': {
                      backgroundColor: theme.switch.connected,
                      opacity: 1,
                    },
                  },
                },
                '& .MuiSwitch-thumb': {
                  width: '16px',
                  height: '16px',
                  backgroundColor: '#FFF',
                },
                '& .MuiSwitch-track': {
                  borderRadius: '10px',
                  backgroundColor: theme.switch.disconnected,
                  opacity: 1,
                },
              }}
            />
          )}
        </Box>

        {/* Logo - Aligned to left */}
        <Box
          sx={{
            display: 'flex',
            alignItems: 'flex-start',
            justifyContent: 'flex-start',
            width: '100%',
          }}
        >
          <Box
            component="img"
            src={logoSrc}
            alt={`${platformName} logo`}
            sx={{
              width: 36,
              height: 36,
              objectFit: 'contain',
            }}
          />
        </Box>

        {/* Platform Name and Connect Button - Same row */}
        <Box
          sx={{
            width: '100%',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            mt: 1,
          }}
        >
          {/* Platform Name - Left side */}
          <Typography
            variant="body2"
            sx={{
              color: theme.card.text,
              fontWeight: 600,
              fontSize: '18px',
              fontFamily: 'Inter',
              textAlign: 'left',
              flex: 1,
            }}
          >
            {platformName}
          </Typography>

          {/* Connect Button - Right side */}
          <Button
            onClick={handleConnect}
            sx={{
              width: '88px',
              height: '27px',
              borderRadius: '19px',
              backgroundColor: theme.button.background,
              color: theme.button.text,
              fontFamily: 'Inter',
              fontSize: '13px',
              fontWeight: 600,
              lineHeight: 'normal',
              textTransform: 'none',
              padding: 0,
              minWidth: 'auto',
              ml: 2,
              '&:hover': {
                backgroundColor: theme.button.hover || theme.button.background,
                filter: theme.button.hover ? 'none' : 'brightness(1.2)',
              },
              '&:active': {
                backgroundColor: theme.button.active || theme.button.background,
                filter: theme.button.active ? 'none' : 'brightness(0.9)',
              },
            }}
          >
            Connecter
          </Button>
        </Box>
      </Card>
    );
  }
);

IntegrationCard.displayName = 'IntegrationCard';