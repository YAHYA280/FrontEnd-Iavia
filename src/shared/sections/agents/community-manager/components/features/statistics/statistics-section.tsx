import React from 'react';
import { Box, Grid, Typography, useTheme } from '@mui/material';
import { defaultStatsMetrics, defaultActivityData, defaultTopPosts } from '@/shared/_mock/community-manager-config';
import { ActivityChart } from './components/activity-chart';
import { StatsCard } from './components/stats-card';
import { PlatformPerformanceChart } from './components/platform-performance-chart';
import { AudienceGrowthChart } from './components/audience-growth-chart';
import { TopPostCard } from './components/top-post-card';

export const StatisticsSection: React.FC = () => {
  const theme = useTheme();

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
      <Grid container spacing={3}>
        {defaultStatsMetrics.map((metric) => (
          <Grid item xs={12} sm={6} md={3} key={metric.id}>
            <StatsCard metric={metric} />
          </Grid>
        ))}
      </Grid>

      <ActivityChart data={defaultActivityData} />

      <Grid container spacing={3} sx={{ alignItems: 'stretch' }}>
        <Grid item xs={12} md={6} sx={{ display: 'flex' }}>
          <PlatformPerformanceChart />
        </Grid>
        <Grid item xs={12} md={6} sx={{ display: 'flex' }}>
          <AudienceGrowthChart />
        </Grid>
      </Grid>

      {/* Top Posts Section */}
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
        <Box>
          <Typography
            sx={{
              color: '#FFF',
              fontFamily: theme.typography.fontTertiaryFamily,
              fontSize: '20px',
              fontWeight: 700,
              mb: 0.5,
            }}
          >
            Top Posts
          </Typography>
          <Typography
            sx={{
              color: '#9CA3AF',
              fontFamily: theme.typography.fontFamily,
              fontSize: '14px',
              fontWeight: 400,
            }}
          >
            Les publications les plus performantes de votre compte
          </Typography>
        </Box>

        <Grid container spacing={3}>
          {defaultTopPosts.map((post) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={post.id}>
              <TopPostCard post={post} />
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
};
