import React from 'react';
import { Box, Typography, useTheme } from '@mui/material';
import { FontAwesomeIcon } from '@/shared/components/fontawesome';
import { StatMetric } from '@/shared/_mock/community-manager-config';

export interface StatsCardProps {
  metric: StatMetric;
}

export const StatsCard: React.FC<StatsCardProps> = ({ metric }) => {
  const theme = useTheme();
  const isPositive = metric.change >= 0;

  return (
    <Box
      sx={{
        backgroundColor: 'rgb(12, 68, 106)',
        borderRadius: '16px',
        border: '1px solid rgba(6, 158, 255, 0.2)',
        p: 3,
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
        transition: 'all 0.3s ease',
        '&:hover': {
          borderColor: 'rgba(6, 158, 255, 0.4)',
          boxShadow: '0 4px 12px rgba(6, 158, 255, 0.2)',
        },
      }}
    >
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <Box
          sx={{
            width: 48,
            height: 48,
            backgroundColor: 'rgba(6, 158, 255, 0.15)',
            borderRadius: '12px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <FontAwesomeIcon
            icon={metric.icon as any}
            style={{ fontSize: '24px', color: '#069eff' }}
          />
        </Box>

        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 0.5,
            backgroundColor: isPositive
              ? 'rgba(16, 185, 129, 0.15)'
              : 'rgba(239, 68, 68, 0.15)',
            borderRadius: '8px',
            px: 1.5,
            py: 0.5,
          }}
        >
          <FontAwesomeIcon
            icon={isPositive ? 'arrow-up' : 'arrow-down'}
            style={{
              fontSize: '12px',
              color: isPositive ? '#10B981' : '#EF4444',
            }}
          />
          <Typography
            sx={{
              color: isPositive ? '#10B981' : '#EF4444',
              fontFamily: theme.typography.fontFamily,
              fontSize: '14px',
              fontWeight: 600,
            }}
          >
            {Math.abs(metric.change)}%
          </Typography>
        </Box>
      </Box>

      <Typography
        sx={{
          color: '#FFF',
          fontFamily: theme.typography.fontTertiaryFamily,
          fontSize: '32px',
          fontWeight: 700,
          lineHeight: 1,
        }}
      >
        {metric.value}
      </Typography>

      <Typography
        sx={{
          color: '#9CA3AF',
          fontFamily: theme.typography.fontFamily,
          fontSize: '14px',
          fontWeight: 500,
          lineHeight: 1.3,
        }}
      >
        {metric.label}
      </Typography>
    </Box>
  );
};
