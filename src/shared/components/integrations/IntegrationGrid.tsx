import { Box, BoxProps } from '@mui/material';
import { ColorTheme, IntegrationCard } from './IntegrationCard';

export interface PlatformIntegration {
  id: string;
  name: string;
  logoSrc: string;
  isConnected: boolean;
  showLinkIcon?: boolean;
  colors?: Partial<ColorTheme>;
}

export interface IntegrationGridProps extends BoxProps {
  platforms: PlatformIntegration[];
  onPlatformToggle?: (platformName: string, isConnected: boolean) => void;
  onPlatformConnect?: (platformName: string) => void;
  defaultColors?: Partial<ColorTheme>;
}

export const IntegrationGrid = ({
  platforms,
  onPlatformToggle,
  onPlatformConnect,
  defaultColors,
  sx,
  ...other
}: IntegrationGridProps) => {
  return (
    <Box
      sx={{
        display: 'grid',
        gridTemplateColumns: {
          xs: 'repeat(1, 1fr)',
          sm: 'repeat(2, 1fr)',
          md: 'repeat(3, 1fr)',
        },
        gap: { xs: 2, sm: 3, md: 3 },
        ...sx,
      }}
      {...other}
    >
      {platforms.map((platform) => (
        <IntegrationCard
          key={platform.id}
          platformName={platform.name}
          logoSrc={platform.logoSrc}
          isConnected={platform.isConnected}
          showLinkIcon={platform.showLinkIcon}
          onToggleChange={onPlatformToggle}
          onConnect={onPlatformConnect}
          colors={{
            ...defaultColors,
            ...platform.colors,
          }}
        />
      ))}
    </Box>
  );
};

IntegrationGrid.displayName = 'IntegrationGrid';