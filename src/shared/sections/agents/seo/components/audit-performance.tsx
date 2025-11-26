'use client';

import { useState } from 'react';
import { Box, Tabs, Tab, Typography, Card, CardContent, useTheme } from '@mui/material';
import AuditControls from './audit-control';
import AuditReports from './audit-reports';
import AuditAnalytics from './audit-analytics';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

const TabPanel = (props: TabPanelProps) => {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`main-tabpanel-${index}`}
      aria-labelledby={`main-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ py: 3 }}>{children}</Box>}
    </div>
  );
};

const MainAuditDashboard = () => {
  const theme = useTheme();
  const [mainTabValue, setMainTabValue] = useState(0);

  const handleMainTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setMainTabValue(newValue);
  };

  const mainTabStyles = {
    container: {
      display: 'flex',
      width: '100%',
      height: '50px',
      alignItems: 'center',
      flexShrink: 0,
      borderRadius: '12px',
      background: '#4E1C6A',
      padding: '4px',
      marginBottom: 3,
    },
    normal: {
      display: 'flex',
      flex: 1,
      height: '50px',
      justifyContent: 'center',
      alignItems: 'center',
      flexShrink: 0,
      borderRadius: '8px',
      color: '#EDEDED',
      textAlign: 'center' as const,
      fontFamily: 'Inter',
      fontSize: '16px',
      fontStyle: 'normal' as const,
      fontWeight: 600,
      lineHeight: '15.287px',
      letterSpacing: '-0.255px',
      textTransform: 'none' as const,
      minWidth: 'auto',
      '&.MuiTab-root': {
        minWidth: 'auto',
        padding: '12px 24px',
      },
    },
    selected: {
      display: 'flex',
      flex: 1,
      height: '50px',
      justifyContent: 'center',
      alignItems: 'center',
      flexShrink: 0,
      borderRadius: '8px',
      background: '#be30ff',
      color: '#EDEDED',
      textAlign: 'center' as const,
      fontFamily: 'Inter',
      fontSize: '16px',
      fontStyle: 'normal' as const,
      fontWeight: 600,
      lineHeight: '15.287px',
      letterSpacing: '-0.255px',
      textTransform: 'none' as const,
      minWidth: 'auto',
      '&.MuiTab-root': {
        minWidth: 'auto',
        padding: '12px 24px',
      },
    },
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
    <Box sx={{ width: '100%', ...scrollStyles }}>
      {/* Onglets principaux */}
      <Card
        variant="outlined"
        sx={{
          borderRadius: '16px',
          background: 'rgb(50, 23, 69)',
          ...scrollStyles,
        }}
      >
        <CardContent sx={{ p: 3, ...scrollStyles }}>
          <Box sx={mainTabStyles.container}>
            <Tabs
              value={mainTabValue}
              onChange={handleMainTabChange}
              sx={{
                display: 'flex',
                width: '100%',
                alignItems: 'center',
                minHeight: '42px',
                '& .MuiTabs-indicator': {
                  display: 'none',
                },
                '& .MuiTabs-flexContainer': {
                  display: 'flex',
                  width: '100%',
                  gap: '4px',
                },
              }}
            >
              <Tab
                label="Contrôles d'audit"
                sx={{
                  ...mainTabStyles.normal,
                  '&.Mui-selected': mainTabStyles.selected,
                }}
              />
              <Tab
                label="Analytiques"
                sx={{
                  ...mainTabStyles.normal,
                  '&.Mui-selected': mainTabStyles.selected,
                }}
              />
              <Tab
                label="Rapports d'audit"
                sx={{
                  ...mainTabStyles.normal,
                  '&.Mui-selected': mainTabStyles.selected,
                }}
              />
            </Tabs>
          </Box>

          {/* Contenu des onglets principaux */}
          <TabPanel value={mainTabValue} index={0}>
            <AuditControls />
          </TabPanel>

          <TabPanel value={mainTabValue} index={1}>
            <AuditAnalytics />
          </TabPanel>

          <TabPanel value={mainTabValue} index={2}>
            <AuditReports />
          </TabPanel>
        </CardContent>
      </Card>
    </Box>
  );
};

export default MainAuditDashboard;
