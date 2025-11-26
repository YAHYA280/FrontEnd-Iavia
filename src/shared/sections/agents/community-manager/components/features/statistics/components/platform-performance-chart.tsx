import React, { useState, useRef, useEffect } from 'react';
import { Box, Typography, FormControl, Select, MenuItem, useTheme } from '@mui/material';
import { BarChart } from '@mui/x-charts/BarChart';
import { defaultPlatformPerformance, defaultPlatforms } from '@/shared/_mock/community-manager-config';
import ConditionalComponent from '@/shared/components/conditionalComponent';
import { styles } from '../statistics-section.styles';

export const PlatformPerformanceChart: React.FC = () => {
  const theme = useTheme();
  const [selectedPlatform, setSelectedPlatform] = useState<string>('all');
  const chartContainerRef = useRef<HTMLDivElement>(null);
  const [chartWidth, setChartWidth] = useState<number>(400);

  useEffect(() => {
    const updateWidth = () => {
      if (chartContainerRef.current) {
        const containerWidth = chartContainerRef.current.offsetWidth;
        setChartWidth(containerWidth - 20);
      }
    };

    setTimeout(updateWidth, 100);
    window.addEventListener('resize', updateWidth);
    return () => window.removeEventListener('resize', updateWidth);
  }, []);

  const getChartData = () => {
    if (selectedPlatform === 'all') {
      return {
        xAxis: defaultPlatformPerformance.map((p) => p.platformName),
        engagement: defaultPlatformPerformance.map((p) => p.engagement),
        reach: defaultPlatformPerformance.map((p) => p.reach),
        clicks: defaultPlatformPerformance.map((p) => p.clicks),
      };
    } else {
      const platform = defaultPlatformPerformance.find((p) => p.platformId === selectedPlatform);
      return {
        xAxis: ['Engagement', 'Portée', 'Clics'],
        data: platform ? [platform.engagement, platform.reach, platform.clicks] : [0, 0, 0],
      };
    }
  };

  const chartData = getChartData();

  return (
    <Box
      sx={{
        width: '100%',
        height: '100%',
        backgroundColor: 'rgb(12, 68, 106)',
        borderRadius: '16px',
        border: '1px solid rgba(6, 158, 255, 0.2)',
        p: 3,
        display: 'flex',
        flexDirection: 'column',
        gap: 3,
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', sm: 'row' },
          justifyContent: 'space-between',
          alignItems: { xs: 'flex-start', sm: 'center' },
          gap: 2,
        }}
      >
        <Box>
          <Typography
            variant="h6"
            sx={{
              color: '#EDEDED',
              fontFamily: theme.typography.fontTertiaryFamily,
              fontSize: '20px',
              fontWeight: 700,
              mb: 0.5,
            }}
          >
            Performances par plateforme
          </Typography>
          <Typography
            sx={{
              color: '#9CA3AF',
              fontFamily: theme.typography.fontFamily,
              fontSize: '14px',
              fontWeight: 500,
            }}
          >
            Comparez les métriques de chaque plateforme
          </Typography>
        </Box>

        <FormControl sx={{ minWidth: { xs: '100%', sm: 180 } }}>
          <Select
            value={selectedPlatform}
            onChange={(e) => setSelectedPlatform(e.target.value)}
            displayEmpty
            renderValue={(selected) => {
              if (selected === 'all') {
                return (
                  <Typography
                    sx={{
                      color: '#EDEDED',
                      fontFamily: theme.typography.fontFamily,
                      fontSize: '14px',
                    }}
                  >
                    Toutes plateformes
                  </Typography>
                );
              }
              const platform = defaultPlatforms.find((p) => p.id === selected);
              return (
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Box
                    component="img"
                    src={platform?.logoSrc}
                    alt={platform?.name}
                    sx={{ width: 20, height: 20, objectFit: 'contain' }}
                  />
                  <Typography
                    sx={{
                      color: '#EDEDED',
                      fontFamily: theme.typography.fontFamily,
                      fontSize: '14px',
                    }}
                  >
                    {platform?.name}
                  </Typography>
                </Box>
              );
            }}
            MenuProps={{
              PaperProps: {
                sx: styles.selectPaper(theme),
              },
            }}
            sx={styles.selectRoot(theme)}
          >
            <MenuItem value="all">
              <Typography
                sx={{
                  color: '#EDEDED',
                  fontFamily: theme.typography.fontFamily,
                  fontSize: '14px',
                }}
              >
                Toutes plateformes
              </Typography>
            </MenuItem>
            {defaultPlatforms.map((platform) => (
              <MenuItem key={platform.id} value={platform.id}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Box
                    component="img"
                    src={platform.logoSrc}
                    alt={platform.name}
                    sx={{ width: 20, height: 20, objectFit: 'contain' }}
                  />
                  <Typography
                    sx={{
                      color: '#EDEDED',
                      fontFamily: theme.typography.fontFamily,
                      fontSize: '14px',
                    }}
                  >
                    {platform.name}
                  </Typography>
                </Box>
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>

      {/* Chart */}
      <Box ref={chartContainerRef} sx={{ width: '100%', height: 430, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <ConditionalComponent isValid={selectedPlatform === 'all'}>
          <BarChart
            xAxis={[
              {
                data: chartData.xAxis,
                scaleType: 'band',
                tickLabelStyle: {
                  fill: '#9CA3AF',
                  fontFamily: theme.typography.fontFamily,
                  fontSize: 12,
                },
              },
            ]}
            yAxis={[
              {
                tickLabelStyle: {
                  fill: '#9CA3AF',
                  fontFamily: theme.typography.fontFamily,
                  fontSize: 12,
                },
              },
            ]}
            series={[
              {
                data: chartData.engagement,
                color: '#069eff',
                label: 'Engagement',
              },
              {
                data: chartData.reach,
                color: '#10B981',
                label: 'Portée',
              },
              {
                data: chartData.clicks,
                color: '#F59E0B',
                label: 'Clics',
              },
            ]}
            width={chartWidth}
            height={340}
            margin={{ top: 20, right: 30, bottom: 60, left: 60 }}
            slotProps={{
              legend: {
                direction: 'row',
                position: { vertical: 'bottom', horizontal: 'middle' },
                padding: 0,
                itemMarkWidth: 12,
                itemMarkHeight: 12,
                markGap: 6,
                itemGap: 16,
              },
            }}
            sx={{
              '& .MuiBarElement-root': {
                rx: 4,
              },
              '& .MuiChartsAxis-line': {
                stroke: 'rgba(6, 158, 255, 0.2)',
              },
              '& .MuiChartsAxis-tick': {
                stroke: 'rgba(6, 158, 255, 0.2)',
              },
              '& .MuiChartsLegend-series text': {
                fill: '#9CA3AF !important',
              },
            }}
          />
        </ConditionalComponent>
        <ConditionalComponent isValid={selectedPlatform !== 'all'}>
          <BarChart
            xAxis={[
              {
                data: chartData.xAxis,
                scaleType: 'band',
                tickLabelStyle: {
                  fill: '#9CA3AF',
                  fontFamily: theme.typography.fontFamily,
                  fontSize: 12,
                },
              },
            ]}
            yAxis={[
              {
                tickLabelStyle: {
                  fill: '#9CA3AF',
                  fontFamily: theme.typography.fontFamily,
                  fontSize: 12,
                },
              },
            ]}
            series={[
              {
                data: chartData.data,
                color: '#069eff',
              },
            ]}
            width={chartWidth}
            height={340}
            margin={{ top: 20, right: 30, bottom: 40, left: 60 }}
            sx={{
              '& .MuiBarElement-root': {
                rx: 4,
              },
              '& .MuiChartsAxis-line': {
                stroke: 'rgba(6, 158, 255, 0.2)',
              },
              '& .MuiChartsAxis-tick': {
                stroke: 'rgba(6, 158, 255, 0.2)',
              },
              '& .MuiChartsLegend-series text': {
                fill: '#9CA3AF !important',
              },
            }}
          />
        </ConditionalComponent>
      </Box>
    </Box>
  );
};
