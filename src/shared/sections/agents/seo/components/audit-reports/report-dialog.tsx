import { Dialog, DialogContent, Box, Typography, Grid, Button, Tooltip } from '@mui/material';
import { Info } from '@mui/icons-material';
import { AuditReport } from '@/shared/types/audit-reports';
import { getScoreBackground, getScoreColor } from '@/shared/utils/audit-reports-utils';

interface ReportDialogProps {
  open: boolean;
  report: AuditReport | null;
  showAITools: boolean;
  onClose: () => void;
  onGenerateInsights: () => void;
  onDownload: (reportId: number, url: string) => void;
}

const scrollStyles = {
  overflow: 'auto',
  scrollbarWidth: 'none' as const,
  '&::-webkit-scrollbar': {
    display: 'none',
  },
  msOverflowStyle: 'none',
};

const ReportDialog = ({
  open,
  report,
  showAITools,
  onClose,
  onGenerateInsights,
  onDownload,
}: ReportDialogProps) => {
  if (!report) return null;

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="md"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: '24px',
          background: 'rgba(78, 28, 106)',
          border: '1px solid rgba(190, 48, 255, 0.3)',
          ...scrollStyles,
        },
      }}
    >
      <DialogContent
        sx={{
          p: 4,
          ...scrollStyles,
          '&.MuiDialogContent-root': {
            ...scrollStyles,
          },
        }}
      >
        <Box sx={scrollStyles}>
          <Box sx={{ mb: 4 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
              <Box
                sx={{
                  display: 'inline-flex',
                  height: '34px',
                  padding: '10px',
                  justifyContent: 'center',
                  alignItems: 'center',
                  gap: '10px',
                  borderRadius: '8px',
                  background: getScoreBackground(report.score),
                }}
              >
                <Typography
                  sx={{
                    color: getScoreColor(report.score),
                    fontFamily: '"IBM Plex Sans"',
                    fontSize: '20px',
                    fontWeight: 500,
                  }}
                >
                  {report.score}
                </Typography>
              </Box>
              <Typography variant="h6" sx={{ color: '#EDEDED', mb: 1 }}>
                {report.url}
              </Typography>
            </Box>
            <Typography variant="body2" sx={{ color: 'rgba(237, 237, 237, 0.7)' }}>
              {report.startDate} - {report.endDate} • 21:20:49
            </Typography>
          </Box>

          <Box sx={{ mb: 4 }}>
            <Typography variant="h6" sx={{ color: '#EDEDED', mb: 2 }}>
              Catégories Lighthouse
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={3}>
                <Box sx={{ p: 2, background: 'rgba(190, 48, 255, 0.20)', borderRadius: '24px' }}>
                  <Typography variant="body2" sx={{ color: '#EDEDED', mb: 1 }}>
                    Performance
                  </Typography>
                  <Typography
                    variant="h5"
                    sx={{ color: getScoreColor(report.details.performance) }}
                  >
                    {report.details.performance}
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={3}>
                <Box sx={{ p: 2, background: 'rgba(190, 48, 255, 0.20)', borderRadius: '24px' }}>
                  <Typography variant="body2" sx={{ color: '#EDEDED', mb: 1 }}>
                    Accessibilité
                  </Typography>
                  <Typography
                    variant="h5"
                    sx={{ color: getScoreColor(report.details.accessibility) }}
                  >
                    {report.details.accessibility}
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={3}>
                <Box sx={{ p: 2, background: 'rgba(190, 48, 255, 0.20)', borderRadius: '24px' }}>
                  <Typography variant="body2" sx={{ color: '#EDEDED', mb: 1 }}>
                    Bonnes pratiques
                  </Typography>
                  <Typography
                    variant="h5"
                    sx={{ color: getScoreColor(report.details.bestPractices) }}
                  >
                    {report.details.bestPractices}
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={3}>
                <Box sx={{ p: 2, background: 'rgba(190, 48, 255, 0.20)', borderRadius: '24px' }}>
                  <Typography variant="body2" sx={{ color: '#EDEDED', mb: 1 }}>
                    SEO
                  </Typography>
                  <Typography variant="h5" sx={{ color: getScoreColor(report.details.seo) }}>
                    {report.details.seo}
                  </Typography>
                </Box>
              </Grid>
            </Grid>
          </Box>

          <Box sx={{ mb: 4 }}>
            <Typography variant="h6" sx={{ color: '#EDEDED', mb: 2 }}>
              Indicateurs Core Web Vitals
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={2.4} sx={{ display: 'flex' }}>
                <Box
                  sx={{
                    p: 2,
                    background: 'rgba(190, 48, 255, 0.20)',
                    borderRadius: '24px',
                    flex: 1,
                    display: 'flex',
                    flexDirection: 'column',
                  }}
                >
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, mb: 1 }}>
                    <Typography variant="body2" sx={{ color: '#EDEDED' }}>
                      LCP
                    </Typography>
                    <Tooltip title="Largest Contentful Paint - Mesure le temps de chargement du plus grand élément visible dans la fenêtre">
                      <Info sx={{ color: '#EDEDED', fontSize: '16px', opacity: 0.7 }} />
                    </Tooltip>
                  </Box>
                  <Typography variant="h5" sx={{ color: '#BE30FF', mt: 'auto' }}>
                    {report.details.lcp}
                  </Typography>
                  <Typography
                    variant="caption"
                    sx={{ color: 'rgba(237, 237, 237, 0.7)', display: 'block', mb: 1 }}
                  >
                    Largest Contentful Paint
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={2.4} sx={{ display: 'flex' }}>
                <Box
                  sx={{
                    p: 2,
                    background: 'rgba(190, 48, 255, 0.20)',
                    borderRadius: '24px',
                    flex: 1,
                    display: 'flex',
                    flexDirection: 'column',
                  }}
                >
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, mb: 1 }}>
                    <Typography variant="body2" sx={{ color: '#EDEDED' }}>
                      INP
                    </Typography>
                    <Tooltip title="Interaction to Next Paint - Mesure la réactivité aux interactions utilisateur">
                      <Info sx={{ color: '#EDEDED', fontSize: '16px', opacity: 0.7 }} />
                    </Tooltip>
                  </Box>
                  <Typography variant="h5" sx={{ color: '#BE30FF', mt: 'auto' }}>
                    {report.details.inp}
                  </Typography>
                  <Typography
                    variant="caption"
                    sx={{ color: 'rgba(237, 237, 237, 0.7)', display: 'block', mb: 1 }}
                  >
                    Interaction to Next Paint
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={2.4} sx={{ display: 'flex' }}>
                <Box
                  sx={{
                    p: 2,
                    background: 'rgba(190, 48, 255, 0.20)',
                    borderRadius: '24px',
                    flex: 1,
                    display: 'flex',
                    flexDirection: 'column',
                  }}
                >
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, mb: 1 }}>
                    <Typography variant="body2" sx={{ color: '#EDEDED' }}>
                      CLS
                    </Typography>
                    <Tooltip title="Cumulative Layout Shift - Mesure la stabilité visuelle de la page">
                      <Info sx={{ color: '#EDEDED', fontSize: '16px', opacity: 0.7 }} />
                    </Tooltip>
                  </Box>
                  <Typography variant="h5" sx={{ color: '#BE30FF', mt: 'auto' }}>
                    {report.details.cls}
                  </Typography>
                  <Typography
                    variant="caption"
                    sx={{ color: 'rgba(237, 237, 237, 0.7)', display: 'block', mb: 1 }}
                  >
                    Cumulative Layout Shift
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={2.4} sx={{ display: 'flex' }}>
                <Box
                  sx={{
                    p: 2,
                    background: 'rgba(190, 48, 255, 0.20)',
                    borderRadius: '24px',
                    flex: 1,
                    display: 'flex',
                    flexDirection: 'column',
                  }}
                >
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, mb: 1 }}>
                    <Typography variant="body2" sx={{ color: '#EDEDED' }}>
                      FCP
                    </Typography>
                    <Tooltip title="First Contentful Paint - Mesure le temps jusqu'au premier rendu de contenu">
                      <Info sx={{ color: '#EDEDED', fontSize: '16px', opacity: 0.7 }} />
                    </Tooltip>
                  </Box>
                  <Typography variant="h5" sx={{ color: '#BE30FF', mt: 'auto' }}>
                    {report.details.fcp}
                  </Typography>
                  <Typography
                    variant="caption"
                    sx={{ color: 'rgba(237, 237, 237, 0.7)', display: 'block', mb: 1 }}
                  >
                    First Contentful Paint
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={2.4} sx={{ display: 'flex' }}>
                <Box
                  sx={{
                    p: 2,
                    background: 'rgba(190, 48, 255, 0.20)',
                    borderRadius: '24px',
                    flex: 1,
                    display: 'flex',
                    flexDirection: 'column',
                  }}
                >
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, mb: 1 }}>
                    <Typography variant="body2" sx={{ color: '#EDEDED' }}>
                      TTFB
                    </Typography>
                    <Tooltip title="Time To First Byte - Mesure le temps de réponse du serveur">
                      <Info sx={{ color: '#EDEDED', fontSize: '16px', opacity: 0.7 }} />
                    </Tooltip>
                  </Box>
                  <Typography variant="h5" sx={{ color: '#BE30FF' }}>
                    {report.details.ttfb}
                  </Typography>
                  <Typography
                    variant="caption"
                    sx={{ color: 'rgba(237, 237, 237, 0.7)', display: 'block', mb: 1 }}
                  >
                    Time To First Byte
                  </Typography>
                </Box>
              </Grid>
            </Grid>
          </Box>

          <Box>
            <Typography variant="h6" sx={{ color: '#EDEDED', mb: 2 }}>
              {showAITools ? "Outils alimentés par l'IA" : 'IA Insights'}
            </Typography>

            {showAITools ? (
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <Button
                  variant="outlined"
                  onClick={onGenerateInsights}
                  sx={{
                    px: 4,
                    py: 1.5,
                    textTransform: 'none',
                    fontSize: '1rem',
                    fontWeight: 600,
                    padding: '14px 20px',
                    display: 'flex',
                    gap: '8px',
                    alignItems: 'center',
                    borderRadius: '16px',
                    backgroundColor: '#BE30FF',
                    color: '#551d74',
                    '&:hover': {
                      backgroundColor: '#A020E0',
                    },
                    width: '100%',
                  }}
                >
                  Générer des insights
                </Button>
              </Box>
            ) : (
              <Box
                sx={{
                  p: 3,
                  backgroundImage:
                    'linear-gradient(#1A1D25, #1A1D25), linear-gradient(180deg, #BE30FF 0.66%, #5D31F8 51.44%, #00A3FF 100%)',
                  backgroundOrigin: 'border-box',
                  backgroundClip: 'padding-box, border-box',
                  borderRadius: '24px',
                  border: '2px solid rgba(190, 48, 255, 0.3)',
                  mb: 2,
                }}
              >
                <Typography variant="h6" sx={{ color: '#EDEDED', mb: 3 }}>
                  {report.insights.title}
                </Typography>

                {report.insights.sections.map((section, index) => (
                  <Box key={index} sx={{ mb: 3 }}>
                    <Typography
                      variant="subtitle1"
                      sx={{ color: '#EDEDED', mb: 1, fontWeight: 'bold' }}
                    >
                      {section.title}
                    </Typography>
                    {section.content.map((paragraph: string, pIndex: number) => (
                      <Typography
                        key={pIndex}
                        variant="body2"
                        sx={{ color: 'rgba(237, 237, 237, 0.7)', mb: 1 }}
                      >
                        {paragraph}
                      </Typography>
                    ))}
                  </Box>
                ))}
              </Box>
            )}

            <Button
              variant="outlined"
              sx={{
                color: '#BE30FF',
                borderColor: '#BE30FF',
                '&:hover': {
                  borderColor: '#BE30FF',
                  background: 'rgba(190, 48, 255, 0.1)',
                },
                width: '100%',
                mt: 2,
              }}
              onClick={() => onDownload(report.id, report.url)}
            >
              Télécharger le rapport
            </Button>
          </Box>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default ReportDialog;
