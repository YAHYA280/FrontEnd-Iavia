import { Box, BoxProps, Fade } from '@mui/material';
import { ReactNode } from 'react';

export interface ConfigurationContentTheme {
  background: string;
  text: string;
  border: string;
  shadow?: string;
}

export interface ConfigurationContentProps extends BoxProps {
  children: ReactNode;
  tabId: string;
  activeTab: string;
  animation?: boolean;
  animationTimeout?: number;
  theme?: Partial<ConfigurationContentTheme>;
}

export const ConfigurationContent = ({
  children,
  tabId,
  activeTab,
  animation = true,
  animationTimeout = 300,
  theme,
  sx,
  ...other
}: ConfigurationContentProps) => {
  const isActive = activeTab === tabId;

  //Default theme
  const contentTheme: ConfigurationContentTheme = {
    background: '#3C1C69',
    text: '#FFFFFF',
    border: 'none',
    shadow: '0px 4px 20px rgba(0, 0, 0, 0.1)',
    ...theme,
  };

  if (!isActive) {
    return null;
  }

  const content = (
    <Box
      sx={{
        mt: 4,
        p: 3,
        backgroundColor: contentTheme.background,
        color: contentTheme.text,
        borderRadius: '24px',
        border: contentTheme.border,
        boxShadow: contentTheme.shadow,
        minHeight: '400px',
        transition: 'all 0.3s ease-in-out',
        ...sx,
      }}
      {...other}
    >
      {children}
    </Box>
  );

  if (animation) {
    return (
      <Fade in={isActive} timeout={animationTimeout}>
        <div>{content}</div>
      </Fade>
    );
  }

  return content;
};

ConfigurationContent.displayName = 'ConfigurationContent';