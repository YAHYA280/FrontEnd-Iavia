import { Box, Typography } from '@mui/material';
import AuditListItem from './audit-list-item';
import { AuditReport } from '@/shared/types/audit-reports';

interface AuditListProps {
  reports: AuditReport[];
  onViewReport: (report: AuditReport) => void;
  onDownload: (reportId: number, url: string) => void;
  onDelete: (reportId: number, url: string) => void;
}

const AuditList = ({ reports, onViewReport, onDownload, onDelete }: AuditListProps) => {
  if (reports.length === 0) {
    return (
      <Box sx={{ textAlign: 'center', py: 6 }}>
        <Typography variant="h6" sx={{ color: '#EDEDED', mb: 2 }}>
          Aucun rapport d&lsquo;audit disponible
        </Typography>
        <Typography variant="body2" sx={{ color: 'rgba(237, 237, 237, 0.7)' }}>
          Les rapports de vos audits apparaîtront ici après leur exécution.
        </Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      {reports.map((audit) => (
        <AuditListItem
          key={audit.id}
          audit={audit}
          onViewReport={onViewReport}
          onDownload={onDownload}
          onDelete={onDelete}
        />
      ))}
    </Box>
  );
};

export default AuditList;
