'use client';

import React from 'react';
import { Box, Typography, useTheme } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { Dayjs } from 'dayjs';
import { styles } from '../dialogs/create-post-dialog/create-post-dialog.styles';

interface PublishDateSectionProps {
  publishDate: Dayjs | null;
  publishTime: Dayjs | null;
  onPublishDateChange: (date: Dayjs | null) => void;
  onPublishTimeChange: (time: Dayjs | null) => void;
}

export const PublishDateSection: React.FC<PublishDateSectionProps> = ({
  publishDate,
  publishTime,
  onPublishDateChange,
  onPublishTimeChange,
}) => {
  const theme = useTheme();

  return (
    <>
      <Box sx={{ mt: 3 }}>
        <Typography sx={styles.sectionTitle(theme)}>Date de publication</Typography>
        <DatePicker
          value={publishDate}
          onChange={onPublishDateChange}
          slotProps={{
            textField: {
              fullWidth: true,
              sx: styles.pickerTextFieldSx(theme),
              placeholder: 'dd/mm/yyyy',
            },
          }}
          format="DD/MM/YYYY"
        />
      </Box>

      <Box sx={{ mt: 3 }}>
        <Typography sx={styles.sectionTitle(theme)}>Heure de publication</Typography>
        <TimePicker
          value={publishTime}
          onChange={onPublishTimeChange}
          slotProps={{
            textField: {
              fullWidth: true,
              sx: styles.pickerTextFieldSx(theme),
              placeholder: 'Sélectionnez une heure',
            },
            actionBar: {
              actions: ['cancel', 'accept'],
              sx: {
                '& .MuiButton-root': {
                  color: '#069EFF',
                  '&.MuiButton-contained': {
                    backgroundColor: '#069EFF',
                    color: '#FFF',
                    '&:hover': {
                      backgroundColor: '#0588d6',
                    },
                  },
                },
              },
            },
            popper: {
              sx: {
                '& .MuiPaper-root': {
                  background: '#1A1D25',
                  border: '1px solid rgba(6, 158, 255, 0.3)',
                },
              },
            },
          }}
          format="HH:mm"
        />
      </Box>
    </>
  );
};

