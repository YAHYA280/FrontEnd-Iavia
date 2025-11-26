'use client';

import { useState, useMemo, useRef } from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Button,
  useTheme,
  TextField,
  MenuItem,
  FormControl,
  Select,
  Grid,
} from '@mui/material';
import { FontAwesomeIcon } from '@/shared/components/fontawesome';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { AuditReport } from '@/shared/types/audit-reports';
import ReportDialog from './audit-reports/report-dialog';
import { chartData, metricConfig } from '@/shared/_mock/seo-data';

const AuditAnalytics = () => {
  const theme = useTheme();
  const tooltipRef = useRef<HTMLDivElement>(null);

  const [filters, setFilters] = useState({
    url: 'example.com',
    metric: 'performance',
    device: 'all',
    period: '30',
  });

  const [isTooltipVisible, setIsTooltipVisible] = useState(false);
  const [tooltipData, setTooltipData] = useState<any>(null);
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });

  const [reportDialogOpen, setReportDialogOpen] = useState(false);
  const [selectedReport, setSelectedReport] = useState<AuditReport | null>(null);
  const [showAITools, setShowAITools] = useState(true);

  const createAuditReportFromData = (data: any): AuditReport => {
    const deviceType: 'computer' | 'mobile' = data.device === 'Desktop' ? 'computer' : 'mobile';

    return {
      id: data.reportNumber,
      url: data.url,
      device: deviceType,
      startDate: data.date,
      endDate: data.date,
      score: data.performance,
      reportNumber: `#${data.reportNumber.toString().padStart(4, '0')}`,
      details: {
        performance: data.performance,
        accessibility: Math.round(data.accessibility * 20),
        bestPractices: data.bestPractices,
        seo: data.seo,
        lcp: `${(Math.random() * 2 + 0.5).toFixed(1)} s`,
        inp: `${Math.floor(Math.random() * 200 + 50)} ms`,
        cls: `${(Math.random() * 0.2).toFixed(2)}`,
        fcp: `${Math.floor(Math.random() * 200 + 50)} ms`,
        ttfb: `${Math.floor(Math.random() * 200 + 50)} ms`,
      },
      insights: {
        title: `Analyse du ${data.date}`,
        sections: [
          {
            title: '1. Performance générale',
            content: [
              `Score de performance: ${data.performance}/100`,
              data.performance >= 90
                ? 'Excellentes performances !'
                : data.performance >= 80
                  ? 'Bonnes performances'
                  : 'Performances à améliorer',
            ],
          },
          {
            title: "2. Points d'amélioration",
            content: [
              `Appareil: ${data.device}`,
              'Continuez à surveiller les métriques Core Web Vitals',
            ],
          },
        ],
      },
    };
  };

  const handleViewReport = (data: any) => {
    const report = createAuditReportFromData(data);
    setSelectedReport(report);
    setReportDialogOpen(true);
    setShowAITools(true);
    setIsTooltipVisible(false);
  };

  const handleCloseReportDialog = () => {
    setReportDialogOpen(false);
    setSelectedReport(null);
    setShowAITools(true);
  };

  const handleGenerateInsights = () => {
    setShowAITools(false);
  };

  const handleDownloadReport = (reportId: number, url: string) => void 0;

  const filteredData = useMemo(() => {
    let filtered = [...chartData];

    if (filters.device !== 'all') {
      filtered = filtered.filter((item) => item.device === filters.device);
    }

    if (filters.period === '7') {
      filtered = filtered.slice(-2);
    } else if (filters.period === '30') {
      filtered = filtered.slice(-4);
    } else if (filters.period === '90') {
      filtered = filtered.slice(-6);
    }

    return filtered;
  }, [filters.device, filters.period]);

  const currentMetric = metricConfig[filters.metric as keyof typeof metricConfig];

  const handleMouseEnter = (data: any, event: React.MouseEvent) => {
    if (!data) {
      return;
    }

    const payload = data.payload || data;
    const value = payload[filters.metric];

    setTooltipData({
      ...payload,
      value,
      currentMetric,
    });

    setTooltipPosition({
      x: event.clientX + 10,
      y: event.clientY - 100,
    });

    setIsTooltipVisible(true);
  };

  const handleMouseLeave = () => {
    setIsTooltipVisible(false);
    setTooltipData(null);
  };

  const FixedCustomTooltip = () => {
    if (!isTooltipVisible || !tooltipData) return null;

    return (
      <Box
        ref={tooltipRef}
        sx={{
          position: 'fixed',
          left: tooltipPosition.x,
          top: tooltipPosition.y,
          zIndex: 9999,
          background: 'rgba(26, 29, 37, 0.95)',
          border: '1px solid rgba(190, 48, 255, 0.3)',
          borderRadius: '12px',
          p: 2,
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
          backdropFilter: 'blur(10px)',
          minWidth: 150,
          pointerEvents: 'none',
        }}
      >
        <Typography
          variant="body2"
          sx={{ color: 'rgba(237, 237, 237, 0.7)', mb: 1, fontSize: '12px' }}
        >
          {tooltipData.date}
        </Typography>
        <Typography
          variant="body2"
          sx={{
            color: '#EDEDED',
            fontSize: '14px',
            fontWeight: 600,
            mb: 0.5,
          }}
        >
          {tooltipData.currentMetric.label}: {tooltipData.value}
          {tooltipData.currentMetric.unit}
        </Typography>
        <Typography
          variant="body2"
          sx={{ color: 'rgba(237, 237, 237, 0.7)', fontSize: '11px', mt: 1 }}
        >
          {tooltipData.device} • Report #{tooltipData.reportNumber}
        </Typography>
        <Button
          variant="contained"
          size="small"
          sx={{
            mt: 1,
            background: '#BE30FF',
            color: '#EDEDED',
            borderRadius: '8px',
            fontSize: '11px',
            px: 2,
            py: 0.5,
            '&:hover': {
              background: '#BE30FF',
              opacity: 0.8,
            },
            pointerEvents: 'auto',
          }}
          onClick={() => handleViewReport(tooltipData)}
        >
          Voir le rapport
        </Button>
      </Box>
    );
  };

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return null;
    }
    return null;
  };

  const CustomizedDot = (props: any) => {
    const { cx, cy, payload } = props;

    return (
      <g>
        <circle
          cx={cx}
          cy={cy}
          r={5}
          fill="#BE30FF"
          stroke="#fff"
          strokeWidth={2}
          onMouseEnter={(e) => {
            const rect = e.currentTarget.getBoundingClientRect();
            handleMouseEnter({ payload }, {
              clientX: rect.left + rect.width / 2,
              clientY: rect.top + rect.height / 2,
            } as React.MouseEvent);
          }}
          onMouseLeave={handleMouseLeave}
          style={{ cursor: 'pointer' }}
        />
      </g>
    );
  };

  const CustomizedActiveDot = (props: any) => {
    const { cx, cy, payload } = props;

    return (
      <g>
        <circle
          cx={cx}
          cy={cy}
          r={7}
          fill="#BE30FF"
          stroke="#fff"
          strokeWidth={2}
          onMouseEnter={(e) => {
            const rect = e.currentTarget.getBoundingClientRect();
            handleMouseEnter({ payload }, {
              clientX: rect.left + rect.width / 2,
              clientY: rect.top + rect.height / 2,
            } as React.MouseEvent);
          }}
          onMouseLeave={handleMouseLeave}
          style={{ cursor: 'pointer' }}
        />
      </g>
    );
  };

  const handleFilterChange = (field: string) => (event: any) => {
    setFilters({
      ...filters,
      [field]: event.target.value,
    });
  };

  const scrollStyles = {
    overflow: 'auto',
    scrollbarWidth: 'none' as const,
    '&::-webkit-scrollbar': {
      display: 'none',
    },
    msOverflowStyle: 'none',
  };

  return (
    <>
      <Card
        variant="outlined"
        sx={{
          borderRadius: '24px',
          background: 'rgba(78, 28, 106)',
          marginTop: 3,
          ...scrollStyles,
        }}
      >
        <CardContent sx={{ ...scrollStyles, p: 4 }}>
          {/* En-tête */}
          <Box sx={{ mb: 4 }}>
            <Typography
              variant="h4"
              gutterBottom
              sx={{
                color: '#EDEDED',
                fontFamily: theme.typography.fontTertiaryFamily,
                fontSize: '32px',
                fontStyle: 'normal',
                fontWeight: 700,
                mb: 1,
              }}
            >
              Analytiques
            </Typography>
            <Typography
              variant="body1"
              sx={{
                color: '#EDEDED',
                fontSize: '16px',
                opacity: 0.8,
              }}
            >
              Suivez les performances de votre site web
            </Typography>
          </Box>

          {/* Filtres */}
          <Box sx={{ mb: 4 }}>
            <Box
              sx={{
                display: 'grid',
                gridTemplateColumns: { xs: '1fr', md: '1fr 1fr 1fr 1fr' },
                gap: 2,
                alignItems: 'end',
              }}
            >
              {/* Champ URL */}
              <Box>
                <Typography
                  variant="body2"
                  sx={{
                    color: 'rgba(237, 237, 237, 0.7)',
                    mb: 1,
                    fontSize: '14px',
                    fontWeight: 500,
                  }}
                >
                  URL
                </Typography>
                <TextField
                  value={filters.url}
                  onChange={handleFilterChange('url')}
                  variant="outlined"
                  size="small"
                  sx={{
                    width: '100%',
                    '& .MuiOutlinedInput-root': {
                      color: '#EDEDED',
                      background: 'rgba(26, 29, 37, 0.8)',
                      borderRadius: '16px',
                      '& fieldset': {
                        borderColor: 'rgba(190, 48, 255, 0.3)',
                      },
                      '&:hover fieldset': {
                        borderColor: 'rgba(190, 48, 255, 0.5)',
                      },
                      '&.Mui-focused fieldset': {
                        borderColor: '#BE30FF',
                      },
                    },
                  }}
                />
              </Box>

              {/* Liste déroulante Métrique */}
              <Box>
                <Typography
                  variant="body2"
                  sx={{
                    color: 'rgba(237, 237, 237, 0.7)',
                    mb: 1,
                    fontSize: '14px',
                    fontWeight: 500,
                  }}
                >
                  Métrique
                </Typography>
                <FormControl size="small" sx={{ width: '100%' }}>
                  <Select
                    value={filters.metric}
                    onChange={handleFilterChange('metric')}
                    sx={{
                      color: '#EDEDED',
                      background: 'rgba(26, 29, 37, 0.8)',
                      borderRadius: '16px',
                      '& .MuiOutlinedInput-notchedOutline': {
                        borderColor: 'rgba(190, 48, 255, 0.3)',
                      },
                      '&:hover .MuiOutlinedInput-notchedOutline': {
                        borderColor: 'rgba(190, 48, 255, 0.5)',
                      },
                      '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                        borderColor: '#BE30FF',
                      },
                      '& .MuiSvgIcon-root': {
                        color: '#EDEDED',
                      },
                    }}
                    MenuProps={{
                      PaperProps: {
                        sx: {
                          background: 'rgba(26, 29, 37, 0.95)',
                          color: '#EDEDED',
                          '& .MuiMenuItem-root': {
                            '&:hover': {
                              background: 'rgba(190, 48, 255, 0.2)',
                            },
                            '&.Mui-selected': {
                              background: 'rgba(190, 48, 255, 0.3)',
                            },
                          },
                        },
                      },
                    }}
                  >
                    <MenuItem value="performance">Performance</MenuItem>
                    <MenuItem value="accessibility">Accessibilité</MenuItem>
                    <MenuItem value="bestPractices">Bonnes pratiques</MenuItem>
                    <MenuItem value="seo">SEO</MenuItem>
                  </Select>
                </FormControl>
              </Box>

              {/* Liste déroulante Appareil */}
              <Box>
                <Typography
                  variant="body2"
                  sx={{
                    color: 'rgba(237, 237, 237, 0.7)',
                    mb: 1,
                    fontSize: '14px',
                    fontWeight: 500,
                  }}
                >
                  Appareil
                </Typography>
                <FormControl size="small" sx={{ width: '100%' }}>
                  <Select
                    value={filters.device}
                    onChange={handleFilterChange('device')}
                    sx={{
                      color: '#EDEDED',
                      background: 'rgba(26, 29, 37, 0.8)',
                      borderRadius: '16px',
                      '& .MuiOutlinedInput-notchedOutline': {
                        borderColor: 'rgba(190, 48, 255, 0.3)',
                      },
                      '&:hover .MuiOutlinedInput-notchedOutline': {
                        borderColor: 'rgba(190, 48, 255, 0.5)',
                      },
                      '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                        borderColor: '#BE30FF',
                      },
                      '& .MuiSvgIcon-root': {
                        color: '#EDEDED',
                      },
                    }}
                    MenuProps={{
                      PaperProps: {
                        sx: {
                          background: 'rgba(26, 29, 37, 0.95)',
                          color: '#EDEDED',
                          '& .MuiMenuItem-root': {
                            '&:hover': {
                              background: 'rgba(190, 48, 255, 0.2)',
                            },
                            '&.Mui-selected': {
                              background: 'rgba(190, 48, 255, 0.3)',
                            },
                          },
                        },
                      },
                    }}
                  >
                    <MenuItem value="all">Tous</MenuItem>
                    <MenuItem value="Mobile">Mobile</MenuItem>
                    <MenuItem value="Desktop">Ordinateur</MenuItem>
                  </Select>
                </FormControl>
              </Box>

              {/* Liste déroulante Période */}
              <Box>
                <Typography
                  variant="body2"
                  sx={{
                    color: 'rgba(237, 237, 237, 0.7)',
                    mb: 1,
                    fontSize: '14px',
                    fontWeight: 500,
                  }}
                >
                  Période
                </Typography>
                <FormControl size="small" sx={{ width: '100%' }}>
                  <Select
                    value={filters.period}
                    onChange={handleFilterChange('period')}
                    sx={{
                      color: '#EDEDED',
                      background: 'rgba(26, 29, 37, 0.8)',
                      borderRadius: '16px',
                      '& .MuiOutlinedInput-notchedOutline': {
                        borderColor: 'rgba(190, 48, 255, 0.3)',
                      },
                      '&:hover .MuiOutlinedInput-notchedOutline': {
                        borderColor: 'rgba(190, 48, 255, 0.5)',
                      },
                      '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                        borderColor: '#BE30FF',
                      },
                      '& .MuiSvgIcon-root': {
                        color: '#EDEDED',
                      },
                    }}
                    MenuProps={{
                      PaperProps: {
                        sx: {
                          background: 'rgba(26, 29, 37, 0.95)',
                          color: '#EDEDED',
                          '& .MuiMenuItem-root': {
                            '&:hover': {
                              background: 'rgba(190, 48, 255, 0.2)',
                            },
                            '&.Mui-selected': {
                              background: 'rgba(190, 48, 255, 0.3)',
                            },
                          },
                        },
                      },
                    }}
                  >
                    <MenuItem value="7">7 derniers jours</MenuItem>
                    <MenuItem value="30">30 derniers jours</MenuItem>
                    <MenuItem value="90">3 derniers mois</MenuItem>
                    <MenuItem value="all">1 an</MenuItem>
                  </Select>
                </FormControl>
              </Box>
            </Box>
          </Box>

          {/* Métriques principales */}
          <Grid container spacing={3} sx={{ mb: 4 }}>
            {Object.entries(metricConfig).map(([key, metric]) => (
              <Grid item xs={12} sm={6} md={3} key={key}>
                <Box
                  sx={{
                    background: 'rgb(100, 32, 136)',
                    borderRadius: '16px',
                    border: '1px solid rgba(190, 48, 255, 0.3)',
                    p: 2,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: 2,
                  }}
                >
                  {/* Contenu texte */}
                  <Box sx={{ flex: 1 }}>
                    <Typography
                      variant="body2"
                      sx={{
                        color: 'rgba(237, 237, 237, 0.7)',
                        fontSize: '14px',
                        mb: 1,
                      }}
                    >
                      {metric.label}
                    </Typography>
                    <Typography
                      variant="h4"
                      sx={{
                        color: '#EDEDED',
                        fontWeight: 700,
                        fontSize: '32px',
                      }}
                    >
                      {metric.value}
                      {metric.unit}
                    </Typography>
                  </Box>

                  {/* Container pour l'icône */}
                  <Box
                    sx={{
                      width: '57px',
                      height: '56px',
                      borderRadius: '19px',
                      background: 'rgba(190, 48, 255, 0.20)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                      transform: 'rotate(-90deg)',
                      ml: 'auto',
                    }}
                  >
                    <FontAwesomeIcon
                      icon={metric.icon}
                      style={{
                        width: '24px',
                        height: '24px',
                        flexShrink: 0,
                        fill: '#BE30FF',
                        color: '#BE30FF',
                        fontSize: '24px',
                        transform: 'rotate(90deg)',
                      }}
                    />
                  </Box>
                </Box>
              </Grid>
            ))}
          </Grid>

          {/* Graphique en ligne avec Recharts */}
          <Box
            sx={{
              background: 'rgb(100, 32, 136)',
              borderRadius: '16px',
              border: '1px solid rgba(190, 48, 255, 0.3)',
              p: 3,
              position: 'relative',
            }}
          >
            <Typography
              variant="h6"
              sx={{
                color: '#EDEDED',
                mb: 3,
                fontSize: '18px',
                fontWeight: 600,
              }}
            >
              Évolution de {currentMetric.label} -{' '}
              {filters.period === '7'
                ? '7 derniers jours'
                : filters.period === '30'
                  ? '30 derniers jours'
                  : filters.period === '90'
                    ? '3 derniers mois'
                    : '1 an'}
            </Typography>

            <ResponsiveContainer width="100%" height={320}>
              <LineChart data={filteredData} onMouseLeave={handleMouseLeave}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(190, 48, 255, 0.1)" />
                <XAxis dataKey="name" stroke="rgba(237, 237, 237, 0.7)" fontSize={12} />
                <YAxis
                  stroke="rgba(237, 237, 237, 0.7)"
                  fontSize={12}
                  domain={filters.metric === 'accessibility' ? [0, 5] : [0, 100]}
                />
                <Tooltip content={<CustomTooltip />} wrapperStyle={{ pointerEvents: 'none' }} />
                <Line
                  type="monotone"
                  dataKey={filters.metric}
                  stroke={'#BE30FF'}
                  strokeWidth={3}
                  dot={<CustomizedDot />}
                  activeDot={<CustomizedActiveDot />}
                />
              </LineChart>
            </ResponsiveContainer>
          </Box>

          {/* Bouton d'action */}
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 3 }}>
            <Button
              variant="outlined"
              sx={{
                color: '#BE30FF',
                borderColor: '#BE30FF',
                borderRadius: '16px',
                px: 4,
                py: 1.5,
                textTransform: 'none',
                fontSize: '1rem',
                fontWeight: 600,
                '&:hover': {
                  borderColor: '#BE30FF',
                  background: 'rgba(190, 48, 255, 0.1)',
                },
              }}
            >
              Exporter les données
            </Button>
          </Box>
        </CardContent>
      </Card>

      {/* Tooltip fixe rendu en dehors du card */}
      <FixedCustomTooltip />

      {/* Dialog de rapport */}
      <ReportDialog
        open={reportDialogOpen}
        report={selectedReport}
        showAITools={showAITools}
        onClose={handleCloseReportDialog}
        onGenerateInsights={handleGenerateInsights}
        onDownload={handleDownloadReport}
      />
    </>
  );
};

export default AuditAnalytics;
