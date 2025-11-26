'use client';

import { useState } from 'react';
import { useTheme } from '@mui/material';
import { Audit, AuditReport } from '@/shared/types/audit-reports';
import ReportDialog from './audit-reports/report-dialog';
import AuditTabs from './audit-controls/audit-tabs';
import ManualAudit from './audit-controls/manual-audit';
import ScheduledAudits from './audit-controls/scheduled-audits';
import DeleteAuditDialog from './audit-reports/delete-audit-dialog';
import EditAuditDialog from './audit-reports/edit-audit-dialog';
import { scheduledAudits } from '@/shared/_mock/seo-data';
import ConditionalComponent from '@/shared/components/conditionalComponent';

const AuditControls = () => {
  const theme = useTheme();
  const [auditTabValue, setAuditTabValue] = useState(0);
  const [device, setDevice] = useState('computer');
  const [frequency, setFrequency] = useState('daily');
  const [auditTime, setAuditTime] = useState<Date | null>(new Date());
  const [websiteUrl, setWebsiteUrl] = useState('https://example.com/');
  const [selectedAuditId, setSelectedAuditId] = useState<number | null>(null);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [auditToEdit, setAuditToEdit] = useState<Audit | null>(null);
  const [reportDialogOpen, setReportDialogOpen] = useState(false);
  const [showAITools, setShowAITools] = useState(true);
  const [currentAuditReport, setCurrentAuditReport] = useState<AuditReport | null>(null);
  const [editFormData, setEditFormData] = useState({
    url: '',
    device: 'computer',
    frequency: 'daily',
    time: new Date(),
  });

  const handleAuditTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setAuditTabValue(newValue);
  };

  const handleDeviceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDevice(event.target.value);
  };

  const handleFrequencyChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFrequency(event.target.value);
  };

  const handleEdit = () => {
    const audit = scheduledAudits.find((a) => a.id === selectedAuditId);
    if (audit) {
      setAuditToEdit(audit);
      setEditFormData({
        url: audit.url,
        device: audit.device,
        frequency:
          audit.frequency === 'chaque jour'
            ? 'daily'
            : audit.frequency === 'chaque semaine'
              ? 'weekly'
              : 'monthly',
        time: new Date(),
      });
      setEditDialogOpen(true);
    }
  };

  const handleEditSubmit = () => {
    setEditDialogOpen(false);
    setAuditToEdit(null);
  };

  const handleDeleteConfirm = () => {
    setDeleteDialogOpen(false);
  };

  const handleEditFormChange = (field: string, value: any) => {
    setEditFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleExecuteAudit = () => {
    const deviceType: 'computer' | 'mobile' = device as 'computer' | 'mobile';
    const newReport: AuditReport = {
      id: Date.now(),
      url: websiteUrl,
      device: deviceType,
      startDate: new Date().toLocaleDateString('fr-FR'),
      endDate: new Date().toLocaleDateString('fr-FR'),
      score: Math.floor(Math.random() * 30) + 70,
      reportNumber: `#${Math.floor(Math.random() * 1000)
        .toString()
        .padStart(4, '0')}`,
      details: {
        performance: Math.floor(Math.random() * 30) + 70,
        accessibility: Math.floor(Math.random() * 30) + 70,
        bestPractices: Math.floor(Math.random() * 30) + 70,
        seo: Math.floor(Math.random() * 30) + 70,
        lcp: `${(Math.random() * 2 + 0.5).toFixed(1)} s`,
        inp: `${Math.floor(Math.random() * 200 + 50)} ms`,
        cls: `${(Math.random() * 0.2).toFixed(2)}`,
        fcp: `${Math.floor(Math.random() * 200 + 50)} ms`,
        ttfb: `${Math.floor(Math.random() * 200 + 50)} ms`,
      },
      insights: {
        title: 'Analyse des Performances',
        sections: [
          {
            title: '1. Temps de chargement',
            content: [
              `Votre site ${websiteUrl} affiche des performances ${Math.random() > 0.5 ? 'correctes' : 'à améliorer'}.`,
              'Optimisez les images et réduisez le JavaScript bloquant pour améliorer le LCP.',
            ],
          },
          {
            title: '2. Accessibilité',
            content: [
              "Score d'accessibilité dans la moyenne.",
              'Vérifiez les contrastes de couleurs et les attributs ALT des images.',
            ],
          },
        ],
      },
    };

    setCurrentAuditReport(newReport);
    setReportDialogOpen(true);
    setShowAITools(true);
  };

  const handleGenerateInsights = () => {
    setShowAITools(false);
  };

  const handleDownloadReport = (reportId: number, url: string) => {};

  const handleCloseReportDialog = () => {
    setReportDialogOpen(false);
    setCurrentAuditReport(null);
    setShowAITools(true);
  };

  const scrollStyles = {
    overflow: 'auto',
    scrollbarWidth: 'none' as const,
    '&::-webkit-scrollbar': { display: 'none' },
    msOverflowStyle: 'none',
  };

  return (
    <>
      <AuditTabs
        auditTabValue={auditTabValue}
        onAuditTabChange={handleAuditTabChange}
        theme={theme}
        scrollStyles={scrollStyles}
      >
        <ConditionalComponent isValid={auditTabValue === 0}>
          <ManualAudit
            websiteUrl={websiteUrl}
            onWebsiteUrlChange={setWebsiteUrl}
            device={device}
            onDeviceChange={handleDeviceChange}
            onExecuteAudit={handleExecuteAudit}
            theme={theme}
          />
        </ConditionalComponent>

        <ConditionalComponent isValid={auditTabValue === 1}>
          <ScheduledAudits
            websiteUrl={websiteUrl}
            onWebsiteUrlChange={setWebsiteUrl}
            device={device}
            onDeviceChange={handleDeviceChange}
            frequency={frequency}
            onFrequencyChange={handleFrequencyChange}
            auditTime={auditTime}
            onAuditTimeChange={setAuditTime}
            scheduledAudits={scheduledAudits}
            onEdit={(audit) => {
              setSelectedAuditId(audit.id);
              setAuditToEdit(audit);
              setEditFormData({
                url: audit.url,
                device: audit.device,
                frequency:
                  audit.frequency === 'chaque jour'
                    ? 'daily'
                    : audit.frequency === 'chaque semaine'
                      ? 'weekly'
                      : 'monthly',
                time: new Date(),
              });
              setEditDialogOpen(true);
            }}
            onDelete={(auditId) => {
              setSelectedAuditId(auditId);
              setDeleteDialogOpen(true);
            }}
            theme={theme}
            scrollStyles={scrollStyles}
          />
        </ConditionalComponent>
      </AuditTabs>

      <ReportDialog
        open={reportDialogOpen}
        report={currentAuditReport}
        showAITools={showAITools}
        onClose={handleCloseReportDialog}
        onGenerateInsights={handleGenerateInsights}
        onDownload={handleDownloadReport}
      />

      <EditAuditDialog
        open={editDialogOpen}
        onClose={() => setEditDialogOpen(false)}
        editFormData={editFormData}
        onEditFormChange={handleEditFormChange}
        onSubmit={handleEditSubmit}
        theme={theme}
      />

      <DeleteAuditDialog
        open={deleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
        onConfirm={handleDeleteConfirm}
        theme={theme}
      />
    </>
  );
};

export default AuditControls;
