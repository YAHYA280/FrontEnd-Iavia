import React, { useState } from 'react';
import { Box, Typography, useTheme } from '@mui/material';
import { AgentProfileCardMini } from '@/shared/components';
import { FontAwesomeIcon } from '@/shared/components/fontawesome';

import ConditionalComponent from '@/shared/components/conditionalComponent';
import AuditPerformance from './components/audit-performance';
import { seoMenuOptions } from '@/shared/_mock/seo-data';

interface SectionContent {
  title: string;
  subtitle: string;
}

const getSectionContent = (optionId: string): SectionContent => {
  const contentMap: Record<string, SectionContent> = {
    integrations: {
      title: "Intégrations d'agent",
      subtitle: 'Connectez des outils externes et des canaux de communication pour cet agent.',
    },
    configuration: {
      title: 'Configuration',
      subtitle: 'Configurez les paramètres et les préférences de votre agent.',
    },
  };

  return contentMap[optionId] || { title: '', subtitle: '' };
};

export const SeoDashboardView: React.FC = () => {
  const theme = useTheme();
  const [isAgentActive, setIsAgentActive] = useState(true);
  const [selectedOption, setSelectedOption] = useState<string>('integrations');

  return (
    <Box sx={{ display: 'flex', width: '100%', minHeight: '100vh' }}>
      <Box sx={{ width: '100%', p: { xs: 1, sm: 1.5, md: 1.5 } }}>
        <Box
          sx={{
            width: '100%',
            height: 'calc(100vh - 32px)',
            borderRadius: { xs: '16px', md: '24px' },
            border: '2px solid transparent',
            background: `
              linear-gradient(#1a1a2e, #0d2d45) padding-box,
              linear-gradient(45deg, #BE30FF, #5D31F8, #00A3FF) border-box
            `,
            backgroundColor: 'rgb(50, 23, 69)',
            display: 'flex',
            position: 'relative',
            mx: 'auto',
            overflow: 'hidden',
          }}
        >
          <Box
            sx={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: 'rgb(50, 23, 69)',
              borderRadius: { xs: '16px', md: '24px' },
              zIndex: 0,
            }}
          />

          <Box
            sx={{
              display: 'flex',
              position: 'relative',
              zIndex: 1,
              flex: 1,
              height: '100%',
              overflow: 'hidden',
            }}
          >
            <Box
              sx={{
                width: '260px',
                height: '100%',
                flexShrink: 0,
                borderRadius: { xs: '16px', md: '24px' },
                backgroundColor: 'rgb(78, 28, 106)',
                position: 'relative',
                zIndex: 2,
                display: 'flex',
                flexDirection: 'column',
                padding: '8px 20px 24px 20px',
                gap: '16px',
                overflow: 'hidden',
              }}
            >
              <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: '0' }}>
                <AgentProfileCardMini
                  agentName="AYAL"
                  agentTitle="Agent SEO"
                  avatar={'/avatars/ziri-avatar.png'}
                  backgroundColor="#be30ff"
                  titleColor="#be30ff"
                  isActive={isAgentActive}
                  onToggleActive={setIsAgentActive}
                />
              </Box>
              <Box sx={{ display: 'flex', flexDirection: 'column', mt: -2 }}>
                {seoMenuOptions.map((option) => {
                  const isActive = selectedOption === option.id;
                  return (
                    <Box
                      key={option.id}
                      component="button"
                      onClick={() => setSelectedOption(option.id)}
                      sx={{
                        width: '100%',
                        py: 1.5,
                        px: 2,
                        display: 'flex',
                        alignItems: 'center',
                        gap: '10px',
                        borderRadius: '8px',
                        background: isActive ? 'rgb(100, 32, 136)' : 'transparent',
                        border: 'none',
                        cursor: 'pointer',
                        color: isActive ? '#be30ff' : '#EDEDED',
                        fontFamily: theme.typography.fontFamily,
                        fontSize: '20px',
                        fontStyle: 'normal',
                        fontWeight: isActive ? 700 : 500,
                        lineHeight: 'normal',
                        transition: 'all 0.2s ease',
                        textAlign: 'left',
                        mb: 1,
                        minHeight: '48px',
                        '&:last-child': {
                          mb: 0,
                        },
                        '&:hover': {
                          background: isActive ? 'rgb(100, 32, 136)' : 'rgba(100, 32, 136, 0.2)',
                          color: isActive ? '#be30ff' : '#be30ff',
                        },
                      }}
                    >
                      <FontAwesomeIcon
                        icon={option.icon as any}
                        style={{ fontSize: '18px', flexShrink: 0 }}
                      />
                      <Typography
                        sx={{
                          flex: '1 1 auto',
                          textAlign: 'left',
                          fontFamily: theme.typography.fontFamily,
                          fontSize: '20px',
                          fontStyle: 'normal',
                          fontWeight: isActive ? 700 : 500,
                          lineHeight: 'normal',
                          color: 'inherit',
                        }}
                      >
                        {option.label}
                      </Typography>
                    </Box>
                  );
                })}
              </Box>
            </Box>
            <Box
              sx={{
                flex: 1,
                display: 'flex',
                flexDirection: 'column',
                height: '100%',
                position: 'relative',
                padding: '14px',
                boxShadow: 'none',
                borderRadius: { xs: '16px', md: '24px' },
                zIndex: 1,
                overflow: 'hidden',
              }}
            >
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  width: '100%',
                  height: '100%',
                  overflowY: 'auto',
                  overflowX: 'hidden',
                  '&::-webkit-scrollbar': {
                    width: '0px',
                    display: 'none',
                  },
                  '&::-webkit-scrollbar-track': {
                    display: 'none',
                  },
                  '&::-webkit-scrollbar-thumb': {
                    display: 'none',
                  },
                  scrollbarWidth: 'none',
                  msOverflowStyle: 'none',
                }}
              >
                <ConditionalComponent isValid={selectedOption === 'integrations'}>
                  <Typography
                    sx={{
                      fontWeight: 500,
                      fontSize: '30px',
                      color: '#EDEDED',
                    }}
                  >
                    Fonctionnalité à venir
                  </Typography>
                </ConditionalComponent>
                <ConditionalComponent isValid={selectedOption === 'audit'}>
                  <AuditPerformance />
                </ConditionalComponent>
                <ConditionalComponent
                  isValid={
                    selectedOption !== 'integrations' &&
                    selectedOption !== 'configuration' &&
                    selectedOption !== 'audit'
                  }
                >
                  <Typography
                    sx={{
                      fontWeight: 500,
                      fontSize: '30px',
                      color: '#EDEDED',
                    }}
                  >
                    Fonctionnalité à venir
                  </Typography>
                </ConditionalComponent>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default SeoDashboardView;
