'use client';

import { useState } from 'react';
import { Card, CardContent, Typography, Box, useTheme } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { fr } from 'date-fns/locale';
import { AuditReport, Filters } from '@/shared/types/audit-reports';
import { scrollStyles } from '@/shared/utils/audit-reports-utils';
import AuditFilters from './audit-reports/audit-filters';
import AuditList from './audit-reports/audit-list';
import ReportDialog from './audit-reports/report-dialog';
import { auditReports } from '@/shared/_mock/seo-data';

const AuditReports = () => {
  const theme = useTheme();
  const [selectedReport, setSelectedReport] = useState<AuditReport | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [showAITools, setShowAITools] = useState(true);
  const [filters, setFilters] = useState<Filters>({
    url: '',
    device: '',
    startDate: '',
    endDate: '',
  });

  const handleViewReport = (report: AuditReport) => {
    setSelectedReport(report);
    setIsDialogOpen(true);
    setShowAITools(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
    setSelectedReport(null);
    setShowAITools(true);
  };

  const handleGenerateInsights = () => {
    setShowAITools(false);
  };

  const handleFilterChange = (field: keyof Filters) => (event: any) => {
    setFilters({
      ...filters,
      [field]: event.target.value,
    });
  };

  const handleDownload = (reportId: number, url: string) => void 0;

  const handleDelete = (reportId: number, url: string) => void 0;

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={fr}>
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
                fontWeight: 700,
                mb: 1,
              }}
            >
              Rapports d&lsquo;audit
            </Typography>
            <Typography variant="body1" sx={{ color: '#EDEDED', fontSize: '16px', opacity: 0.8 }}>
              Afficher, télécharger ou supprimer votre historique d&lsquo;audit
            </Typography>
          </Box>

          {/* Filtres */}
          <AuditFilters filters={filters} onFilterChange={handleFilterChange} />

          {/* Liste des rapports */}
          <AuditList
            reports={auditReports}
            onViewReport={handleViewReport}
            onDownload={handleDownload}
            onDelete={handleDelete}
          />
        </CardContent>
      </Card>

      {/* Popup de détails */}
      <ReportDialog
        open={isDialogOpen}
        report={selectedReport}
        showAITools={showAITools}
        onClose={handleCloseDialog}
        onGenerateInsights={handleGenerateInsights}
        onDownload={handleDownload}
      />
    </LocalizationProvider>
  );
};

export default AuditReports;
