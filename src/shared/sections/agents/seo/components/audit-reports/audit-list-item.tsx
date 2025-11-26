import { Box, Typography, IconButton } from '@mui/material';
import { PhoneAndroid, Computer } from '@mui/icons-material';
import { FontAwesomeIcon } from '@/shared/components/fontawesome';
import { AuditReport } from '@/shared/types/audit-reports';
import ScoreDisplay from './score-display';
import { deviceIconStyles } from '@/shared/utils/audit-reports-utils';

interface AuditListItemProps {
  audit: AuditReport;
  onViewReport: (report: AuditReport) => void;
  onDownload: (reportId: number, url: string) => void;
  onDelete: (reportId: number, url: string) => void;
}

const AuditListItem = ({ audit, onViewReport, onDownload, onDelete }: AuditListItemProps) => {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 3,
        p: 2,
        borderRadius: '16px',
        background: 'rgb(100, 32, 136)',
        border: '1px solid rgba(190, 48, 255, 0.3)',
        cursor: 'pointer',
        transition: 'all 0.2s ease-in-out',
        '&:hover': {
          background: 'rgb(110, 40, 146)',
          borderColor: 'rgba(190, 48, 255, 0.5)',
        },
      }}
      onClick={() => onViewReport(audit)}
    >
      {/* Informations à GAUCHE */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 3, flex: 1 }}>
        <Box sx={{ minWidth: '80px' }}>
          <Typography
            variant="body2"
            sx={{
              color: '#BE30FF',
              fontWeight: 700,
              fontFamily: '"IBM Plex Sans"',
              fontSize: '18px',
            }}
          >
            {audit.reportNumber}
          </Typography>
        </Box>

        <ScoreDisplay score={audit.score} />

        <Box sx={{ display: 'flex', flexShrink: 0 }}>
          {audit.device === 'mobile' ? (
            <PhoneAndroid sx={deviceIconStyles} />
          ) : (
            <Computer sx={deviceIconStyles} />
          )}
        </Box>

        <Box sx={{ flex: 1, minWidth: 0 }}>
          <Typography
            variant="body2"
            sx={{
              color: '#EDEDED',
              fontWeight: 500,
              fontFamily: '"IBM Plex Sans"',
              fontSize: '16px',
              mb: 0.5,
            }}
          >
            {audit.url}
          </Typography>
          <Typography
            variant="caption"
            sx={{
              color: 'rgba(237, 237, 237, 0.7)',
              fontFamily: '"IBM Plex Sans"',
              fontSize: '12px',
            }}
          >
            {audit.startDate} - {audit.endDate}
          </Typography>
        </Box>
      </Box>

      {/* Actions à DROITE */}
      <Box sx={{ display: 'flex', gap: 1, flexShrink: 0 }}>
        <IconButton
          sx={{ color: '#EDEDED', '&:hover': { color: '#BE30FF' } }}
          onClick={(e) => {
            e.stopPropagation();
            onDownload(audit.id, audit.url);
          }}
        >
          <FontAwesomeIcon icon="file-download" style={{ fontSize: '20px' }} />
        </IconButton>
        <IconButton
          sx={{ color: '#EDEDED', '&:hover': { color: '#BE30FF' } }}
          onClick={(e) => {
            e.stopPropagation();
            onDelete(audit.id, audit.url);
          }}
        >
          <FontAwesomeIcon icon="trash-alt" style={{ fontSize: '20px' }} />
        </IconButton>
      </Box>
    </Box>
  );
};

export default AuditListItem;
