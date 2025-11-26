import React, { useState, useEffect, useImperativeHandle, forwardRef } from 'react';
import {
  Box,
  Typography,
  Checkbox,
  FormControlLabel,
  useTheme,
} from '@mui/material';
import { MarketingObjectiveType } from '@/shared/types/community-manager';
import { marketingObjectiveOptions } from '@/shared/utils/community-manager-mappings';

export interface ObjectifsMarketingSectionProps {
  resetTrigger?: number;
  initialObjectives?: MarketingObjectiveType[];
}

export interface ObjectifsMarketingSectionRef {
  getSelectedObjectives: () => MarketingObjectiveType[];
}

export const ObjectifsMarketingSection = forwardRef<ObjectifsMarketingSectionRef, ObjectifsMarketingSectionProps>(
  ({ resetTrigger = 0, initialObjectives = [] }, ref) => {
    const theme = useTheme();
    const [selectedObjectives, setSelectedObjectives] = useState<MarketingObjectiveType[]>(initialObjectives);

    useImperativeHandle(ref, () => ({
      getSelectedObjectives: () => selectedObjectives,
    }));

    useEffect(() => {
      if (resetTrigger > 0) {
        setSelectedObjectives([]);
      }
    }, [resetTrigger]);

    useEffect(() => {
      setSelectedObjectives(initialObjectives);
    }, [initialObjectives]);

    const handleToggleObjective = (objective: MarketingObjectiveType) => {
      setSelectedObjectives((prev) =>
        prev.includes(objective)
          ? prev.filter((obj) => obj !== objective)
          : [...prev, objective]
      );
    };

    return (
      <Box
        sx={{
          mt: 4,
          p: 3,
          backgroundColor: 'rgb(12, 68, 106)',
          borderRadius: '24px',
          border: 'none',
        }}
      >
        <Typography
          variant="h6"
          sx={{
            color: '#FFF',
            fontFamily: theme.typography.fontFamily,
            fontSize: '20px',
            fontWeight: 600,
            mb: 1,
          }}
        >
          Objectifs marketing
        </Typography>
        <Typography
          sx={{
            color: '#9CA3AF',
            fontFamily: theme.typography.fontFamily,
            fontSize: '16px',
            fontStyle: 'normal',
            fontWeight: 500,
            lineHeight: '121.331%',
            mb: 4,
          }}
        >
          Définissez les priorités de votre entreprise
        </Typography>

        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          {marketingObjectiveOptions.map((option) => (
            <FormControlLabel
              key={option.value}
              control={
                <Checkbox
                  checked={selectedObjectives.includes(option.value)}
                  onChange={() => handleToggleObjective(option.value)}
                  sx={{
                    color: 'rgba(6, 158, 255, 0.5)',
                    padding: 0,
                    '&.Mui-checked': {
                      color: '#069eff',
                    },
                    '& .MuiSvgIcon-root': {
                      fontSize: 24,
                    },
                  }}
                />
              }
              label={
                <Typography
                  sx={{
                    color: '#FFF',
                    fontFamily: theme.typography.fontFamily,
                    fontSize: '16px',
                    fontWeight: 500,
                    marginLeft: '16px',
                  }}
                >
                  {option.label}
                </Typography>
              }
              sx={{
                alignItems: 'center',
                margin: 0,
                marginLeft: 0,
                '& .MuiFormControlLabel-label': {
                  marginLeft: 0,
                },
              }}
            />
          ))}
        </Box>
      </Box>
    );
  }
);

ObjectifsMarketingSection.displayName = 'ObjectifsMarketingSection';

