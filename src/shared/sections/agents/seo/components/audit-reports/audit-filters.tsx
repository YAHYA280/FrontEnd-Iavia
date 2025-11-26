import { Filters } from '@/shared/types/audit-reports';
import { datePickerStyles } from '@/shared/utils/audit-reports-utils';
import {
  Box,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Typography,
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

interface AuditFiltersProps {
  filters: Filters;
  onFilterChange: (field: keyof Filters) => (event: any) => void;
}

const AuditFilters = ({ filters, onFilterChange }: AuditFiltersProps) => {
  return (
    <Box sx={{ mb: 4 }}>
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', md: '1fr 1fr 1fr 1fr auto' },
          gap: 2,
          alignItems: 'end',
        }}
      >
        {/* Champ URL */}
        <Box>
          <Typography
            variant="body2"
            sx={{ color: 'rgba(237, 237, 237, 0.7)', mb: 1, fontSize: '14px', fontWeight: 500 }}
          >
            URL
          </Typography>
          <TextField
            value={filters.url}
            onChange={onFilterChange('url')}
            variant="outlined"
            size="small"
            placeholder="Entrez une URL"
            sx={{
              width: '100%',
              '& .MuiOutlinedInput-root': {
                color: '#EDEDED',
                background: 'rgba(26, 29, 37, 0.8)',
                borderRadius: '16px',
                '& fieldset': { borderColor: 'rgba(190, 48, 255, 0.3)' },
                '&:hover fieldset': { borderColor: 'rgba(190, 48, 255, 0.5)' },
                '&.Mui-focused fieldset': { borderColor: '#BE30FF' },
              },
            }}
          />
        </Box>

        {/* Liste déroulante Appareil */}
        <Box>
          <Typography
            variant="body2"
            sx={{ color: 'rgba(237, 237, 237, 0.7)', mb: 1, fontSize: '14px', fontWeight: 500 }}
          >
            Appareil
          </Typography>
          <FormControl size="small" sx={{ width: '100%' }}>
            <Select
              value={filters.device}
              onChange={onFilterChange('device')}
              displayEmpty
              sx={{
                color: '#EDEDED',
                background: 'rgba(26, 29, 37, 0.8)',
                borderRadius: '16px',
                '& .MuiOutlinedInput-notchedOutline': { borderColor: 'rgba(190, 48, 255, 0.3)' },
                '&:hover .MuiOutlinedInput-notchedOutline': {
                  borderColor: 'rgba(190, 48, 255, 0.5)',
                },
                '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: '#BE30FF' },
                '& .MuiSvgIcon-root': { color: '#EDEDED' },
              }}
              MenuProps={{
                PaperProps: {
                  sx: {
                    background: 'rgba(26, 29, 37, 0.95)',
                    color: '#EDEDED',
                    '& .MuiMenuItem-root': {
                      '&:hover': { background: 'rgba(190, 48, 255, 0.2)' },
                      '&.Mui-selected': { background: 'rgba(190, 48, 255, 0.3)' },
                    },
                  },
                },
              }}
            >
              <MenuItem value="">Tous</MenuItem>
              <MenuItem value="mobile">Mobile</MenuItem>
              <MenuItem value="computer">Ordinateur</MenuItem>
            </Select>
          </FormControl>
        </Box>

        {/* Dates */}
        <Box>
          <Typography
            variant="body2"
            sx={{ color: 'rgba(237, 237, 237, 0.7)', mb: 1, fontSize: '14px', fontWeight: 500 }}
          >
            Date de début
          </Typography>
          <DatePicker
            value={filters.startDate}
            onChange={onFilterChange('startDate')}
            slotProps={{ textField: { size: 'small', fullWidth: true, sx: datePickerStyles } }}
          />
        </Box>

        <Box>
          <Typography
            variant="body2"
            sx={{ color: 'rgba(237, 237, 237, 0.7)', mb: 1, fontSize: '14px', fontWeight: 500 }}
          >
            Date de fin
          </Typography>
          <DatePicker
            value={filters.endDate}
            onChange={onFilterChange('endDate')}
            slotProps={{ textField: { size: 'small', fullWidth: true, sx: datePickerStyles } }}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default AuditFilters;
