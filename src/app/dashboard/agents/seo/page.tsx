'use client';

import SeoDashboardView from '@/shared/sections/agents/seo/view';
import { Box, Typography, Container } from '@mui/material';

export default function SeoPage() {
  return (
    <Container maxWidth="xl">
      <Box sx={{ py: 4 }}>
       <SeoDashboardView />
      </Box>
    </Container>
  );
}
