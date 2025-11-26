import { Box } from '@mui/material';
import { ReactNode, useState } from 'react';
import { ConfigurationToggleGroup } from '../../sav/components/configuration-toggle-group';
import { AgentTrainingSection } from './AgentTrainingSection';
import { LegalFilteringSection } from './LegalFilteringSection';
import { LegalNotificationConfig } from './LegalNotificationsSection';
import { ConfigurationToggleButton } from '@/shared/components/configurations/ConfigurationToggleButton';
import { ConfigurationContent } from '@/shared/components/configurations/ConfigurationContent';
import { ConfigTabItem } from '@/shared/types/configuration';


export function LegalAgentConfiguration() {
  const legalTabs: ConfigTabItem[] = [
    {
      id: 'info',
      label: 'Informations',
      content: <AgentTrainingSection />
    },
    {
      id: 'filtrage',
      label: 'Filtrage',
      content: <LegalFilteringSection />
    },
   
    {
      id: 'notifications',
      label: 'Notifications',
      content: <LegalNotificationConfig 
       />
    },
  ];

  const [activeTab, setActiveTab] = useState(legalTabs[0]?.id || '');

  const handleTabChange = (tabId: string) => {
    setActiveTab(tabId);
  };

  return (
    <Box>
      <ConfigurationToggleGroup
        defaultValue={activeTab}
        onTabChange={handleTabChange}
        sx={{ 
          mb: 3, 
          mt: 4,
          width: '100%',
          overflowX: { xs: 'auto', sm: 'visible' },
          '&::-webkit-scrollbar': {
            height: '4px',
          },
          '&::-webkit-scrollbar-track': {
            backgroundColor: 'rgba(255, 255, 255, 0.1)',
            borderRadius: '2px',
          },
          '&::-webkit-scrollbar-thumb': {
            backgroundColor: '#311e7d',
            borderRadius: '2px',
          },
        }}
      >
        {legalTabs.map((tab) => (
          <ConfigurationToggleButton
            key={tab.id}
            active={activeTab === tab.id}
            onClick={() => handleTabChange(tab.id)}
            theme={{
              active: {
                text: '#FFF',
                border: '#311e7d',
              },
              inactive: {
                text: 'rgba(255, 255, 255, 0.7)',
                border: 'transparent',
              },
              hover: {
                border: 'rgba(49, 30, 125, 0.5)',
              },
            }}
          >
            {tab.label}
          </ConfigurationToggleButton>
        ))}
      </ConfigurationToggleGroup>

      {legalTabs.map((tab) => (
        <ConfigurationContent
          key={tab.id}
          tabId={tab.id}
          activeTab={activeTab}
          theme={{
            background: '#311e7d',
            text: '#FFFFFF',
            border: '1px solid rgba(49, 30, 125, 0.3)',
            shadow: '0px 4px 20px rgba(0, 0, 0, 0.2)'
          }}
        >
          {tab.content}
        </ConfigurationContent>
      ))}
    </Box>
  );
}