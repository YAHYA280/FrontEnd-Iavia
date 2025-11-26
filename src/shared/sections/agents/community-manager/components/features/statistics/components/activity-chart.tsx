import React, { useState, useRef, useEffect } from 'react';
import { Box, Typography, FormControl, Select, MenuItem, useTheme } from '@mui/material';
import { LineChart } from '@mui/x-charts/LineChart';
import { ActivityDataPoint, defaultPlatforms } from '@/shared/_mock/community-manager-config';
import { styles } from '../statistics-section.styles';

export interface ActivityChartProps {
  data: ActivityDataPoint[];
}

const platformColors: Record<string, string> = {
  instagram: '#E4405F',
  facebook: '#1877F2',
  youtube: '#FF0000',
  telegram: '#0088CC',
  discord: '#5865F2',
  whatsapp: '#25D366',
};

export const ActivityChart: React.FC<ActivityChartProps> = ({ data }) => {
  const theme = useTheme();
  const [selectedPlatform, setSelectedPlatform] = useState<string>('all');
  const [selectedPeriod, setSelectedPeriod] = useState<string>('last-week');
  const chartContainerRef = useRef<HTMLDivElement>(null);
  const [chartWidth, setChartWidth] = useState<number>(800);

  const chartData = React.useMemo(() => {
    if (selectedPlatform === 'all') {
      return data.map((point) => ({
        date: point.date,
        total:
          (point.instagram || 0) +
          (point.facebook || 0) +
          (point.youtube || 0) +
          (point.telegram || 0) +
          (point.discord || 0) +
          (point.whatsapp || 0),
      }));
    } else {
      return data.map((point) => ({
        date: point.date,
        value: point[selectedPlatform as keyof ActivityDataPoint] as number || 0,
      }));
    }
  }, [data, selectedPlatform]);

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

  const getXAxisLabels = () => {
    if (selectedPeriod === 'last-week') {
      return chartData.map((_, index) => `Jour ${index + 1}`);
    } else if (selectedPeriod === 'last-month') {
      return chartData.map((_, index) => `Semaine ${Math.floor(index / 7) + 1}`);
    } else if (selectedPeriod === 'last-3-months') {
      return chartData.map((_, index) => `Semaine ${index + 1}`);
    } else {
      return chartData.map((_, index) => `Mois ${index + 1}`);
    }
  };

  const xAxisData = getXAxisLabels();

  const seriesData = chartData.map((point) =>
    selectedPlatform === 'all' ? (point as any).total : (point as any).value
  );

  const lineColor =
    selectedPlatform === 'all' ? '#069eff' : platformColors[selectedPlatform] || '#069eff';

  return (
    <Box
      sx={{
        width: '100%',
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
            Activités de publication
          </Typography>
          <Typography
            sx={{
              color: '#9CA3AF',
              fontFamily: theme.typography.fontFamily,
              fontSize: '14px',
              fontWeight: 500,
            }}
          >
            Suivez vos publications dans le temps
          </Typography>
        </Box>

        <Box sx={{ display: 'flex', gap: 2, flexDirection: { xs: 'column', sm: 'row' }, width: { xs: '100%', sm: 'auto' } }}>
          {/* Platform Filter */}
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

          {/* Period Filter */}
          <FormControl sx={{ minWidth: { xs: '100%', sm: 160 } }}>
            <Select
              value={selectedPeriod}
              onChange={(e) => setSelectedPeriod(e.target.value)}
              displayEmpty
              MenuProps={{
                PaperProps: {
                  sx: styles.selectPaper(theme),
                },
              }}
              sx={styles.selectRoot(theme)}
            >
              <MenuItem value="last-week">
                <Typography
                  sx={{
                    color: '#EDEDED',
                    fontFamily: theme.typography.fontFamily,
                    fontSize: '14px',
                  }}
                >
                  Dernière semaine
                </Typography>
              </MenuItem>
              <MenuItem value="last-month">
                <Typography
                  sx={{
                    color: '#EDEDED',
                    fontFamily: theme.typography.fontFamily,
                    fontSize: '14px',
                  }}
                >
                  Dernier mois
                </Typography>
              </MenuItem>
              <MenuItem value="last-3-months">
                <Typography
                  sx={{
                    color: '#EDEDED',
                    fontFamily: theme.typography.fontFamily,
                    fontSize: '14px',
                  }}
                >
                  3 derniers mois
                </Typography>
              </MenuItem>
              <MenuItem value="last-year">
                <Typography
                  sx={{
                    color: '#EDEDED',
                    fontFamily: theme.typography.fontFamily,
                    fontSize: '14px',
                  }}
                >
                  Dernière année
                </Typography>
              </MenuItem>
            </Select>
          </FormControl>
        </Box>
      </Box>

      {/* Chart */}
      <Box ref={chartContainerRef} sx={{ width: '100%' }}>
        <LineChart
          xAxis={[
            {
              data: xAxisData,
              scaleType: 'point',
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
              data: seriesData,
              color: lineColor,
              curve: 'catmullRom',
              showMark: true,
              area: true,
            },
          ]}
          width={chartWidth}
          height={350}
          margin={{ top: 20, right: 30, bottom: 40, left: 60 }}
          sx={{
            '& .MuiLineElement-root': {
              strokeWidth: 3,
            },
            '& .MuiMarkElement-root': {
              fill: lineColor,
              strokeWidth: 2,
              r: 4,
            },
            '& .MuiAreaElement-root': {
              fillOpacity: 0.1,
            },
            '& .MuiChartsAxis-line': {
              stroke: 'rgba(6, 158, 255, 0.2)',
            },
            '& .MuiChartsAxis-tick': {
              stroke: 'rgba(6, 158, 255, 0.2)',
            },
          }}
        />
      </Box>
    </Box>
  );
};
