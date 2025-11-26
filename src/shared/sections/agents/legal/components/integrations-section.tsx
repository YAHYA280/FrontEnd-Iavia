import { Box } from '@mui/material';
import { useSavSubagentData } from '@/hooks/use-sav-subagent-data';
import { IntegrationGrid } from '@/shared/components/integrations/IntegrationGrid';
import { IntegrationHeader } from '@/shared/components/integrations/IntegrationHeader';

export function IntegrationSection() {
  const { platforms } = useSavSubagentData('agent-juridique'); 

  const handlePlatformToggle = () => void 0;
  const handlePlatformConnect = () => void 0;

  return (
    <Box
      sx={{
        backgroundColor: '#311e7d',
        borderRadius: '24px',
        border: 'none',
        p: 3,
      }}
    >
      <IntegrationHeader
        title="Intégrations d'agent"
        subtitle="Connectez des outils externes et des canaux de communication pour cet agent."
      />
      <IntegrationGrid
        platforms={platforms}
        onPlatformToggle={handlePlatformToggle}
        onPlatformConnect={handlePlatformConnect}
        defaultColors={{
          card: {
            background: 'rgba(111, 78, 255, 0.20)',
            text: '#FFF',
          },
          status: {
            connected: '#10B981',
            disconnected: '#EF4444',
          },
          button: {
            background: 'rgba(111, 78, 255, 0.20)',
            text: '#6F4EFF',
            hover: '#24155d',
            active: '#0d0829',
          },
          switch: {
            connected: '#9FE3CD',
            disconnected: '#F9B4B4',
          },
        }}
        sx={{
          backgroundColor: 'transparent',
          borderRadius: 0,
          border: 'none',
          p: 0,
        }}
      />
    </Box>
  );
}