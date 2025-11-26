import { Box, Card, CardContent, Tabs, Tab, Typography } from '@mui/material';

interface AuditTabsProps {
  auditTabValue: number;
  onAuditTabChange: (event: React.SyntheticEvent, newValue: number) => void;
  children: React.ReactNode;
  theme: any;
  scrollStyles: any;
}

const auditTabStyles = {
  normal: {
    display: 'flex',
    width: '223px',
    height: '46px',
    padding: '15px 0',
    justifyContent: 'center',
    alignItems: 'center',
    flexShrink: 0,
    borderRadius: '12px 12px 0 0',
    color: '#EDEDED',
    textAlign: 'center' as const,
    fontFamily: 'Inter',
    fontSize: '16px',
    fontStyle: 'normal' as const,
    fontWeight: 600,
    lineHeight: '15.287px',
    letterSpacing: '-0.255px',
    textTransform: 'none' as const,
    minWidth: '223px',
    '& .MuiTab-wrapper': {
      width: '133px',
      height: '16px',
      flexShrink: 0,
    },
  },
  selected: {
    display: 'flex',
    width: '223px',
    height: '46px',
    padding: '15px 0',
    justifyContent: 'center',
    alignItems: 'center',
    flexShrink: 0,
    borderRadius: '12px 12px 0 0',
    background: '#BE30FF',
    color: '#EDEDED',
    textAlign: 'center' as const,
    fontFamily: 'var(--font-primary)',
    fontSize: '16px',
    fontStyle: 'normal' as const,
    fontWeight: 600,
    lineHeight: '15.287px',
    letterSpacing: '-0.255px',
    textTransform: 'none' as const,
    minWidth: '223px',
    '& .MuiTab-wrapper': {
      width: '133px',
      height: '16px',
      flexShrink: 0,
    },
  },
};

const AuditTabs = ({
  auditTabValue,
  onAuditTabChange,
  children,
  theme,
  scrollStyles,
}: AuditTabsProps) => {
  return (
    <Card
      variant="outlined"
      sx={{
        borderRadius: '24px',
        background: 'rgba(78, 28, 106)',
        marginTop: 3,
        ...scrollStyles,
        maxHeight: '100vh',
      }}
    >
      <CardContent sx={scrollStyles}>
        <Box sx={{ mt: 3 }}>
          <Typography
            variant="h6"
            gutterBottom
            sx={{
              color: '#EDEDED',
              fontFamily: theme.typography.fontTertiaryFamily,
              fontSize: '30px',
              fontStyle: 'normal',
              fontWeight: 700,
              mb: 1,
            }}
          >
            Contrôles d&lsquo;audit
          </Typography>
          <Typography variant="body2" sx={{ color: '#EDEDED', mb: 2 }}>
            Effectuez des audits de performance et planifiez une surveillance automatisée
          </Typography>
        </Box>

        <Box
          sx={{
            display: 'flex',
            width: '100%',
            height: '46px',
            alignItems: 'center',
            gap: '40px',
            flexShrink: 0,
            borderRadius: '8px',
            mb: 3,
            mt: 3,
            ...scrollStyles,
            overflowX: 'auto',
          }}
        >
          <Tabs
            value={auditTabValue}
            onChange={onAuditTabChange}
            sx={{
              display: 'flex',
              alignItems: 'center',
              height: '46px',
              minWidth: 'max-content',
              '& .MuiTabs-indicator': { display: 'none' },
              '& .MuiTabs-flexContainer': {
                display: 'flex',
                gap: '40px',
              },
            }}
          >
            <Tab
              label="Audit manuel"
              sx={{
                ...auditTabStyles.normal,
                '&.Mui-selected': auditTabStyles.selected,
              }}
            />
            <Tab
              label="Audit planifiés"
              sx={{
                ...auditTabStyles.normal,
                '&.Mui-selected': auditTabStyles.selected,
              }}
            />
          </Tabs>
        </Box>

        {children}
      </CardContent>
    </Card>
  );
};

export default AuditTabs;
