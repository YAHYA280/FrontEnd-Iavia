'use client';

import { Box, Grid, Typography, Container } from '@mui/material';
import { MarketplaceCard } from '@/shared/components/ui/marketplace-card';
import { marketplaceAgents, MarketplaceAgent } from '@/shared/_mock/marketplace-agents';

interface MarketplaceGridProps {
  onAgentClick: (agent: MarketplaceAgent) => void;
}

export const MarketplaceGrid = ({ onAgentClick }: MarketplaceGridProps) => {
  return (
    <Container
      maxWidth="xl"
      sx={{
        position: 'relative',
        zIndex: 1,
        pt: 6,
      }}
    >
      {/* Page Title */}
      <Box sx={{ mb: 6, textAlign: 'center' }}>
        <Typography
          variant="h3"
          sx={{
            color: '#FFF',
            fontFamily: 'var(--font-tertiary)',
            fontWeight: 700,
            mb: 2,
            fontSize: { xs: '28px', md: '36px' },
            letterSpacing: '-0.5px',
            textShadow: '0 4px 12px rgba(0, 0, 0, 0.5)',
          }}
        >
          Découvrez nos Agents IA
        </Typography>
      </Box>

      {/* Agent Cards Grid */}
      <Grid
        container
        spacing={4}
        justifyContent="center"
        sx={{
          px: { xs: 2, md: 0 },
        }}
      >
        {marketplaceAgents.map((agent) => (
          <Grid item key={agent.id}>
            <MarketplaceCard
              agentId={agent.id}
              agentName={agent.name}
              agentTitle={agent.title}
              avatar={agent.avatar}
              price={agent.price}
              category={agent.category}
              onClick={() => onAgentClick(agent)}
            />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};
