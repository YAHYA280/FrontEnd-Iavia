import {
  Box,
  TextField,
  RadioGroup,
  FormControlLabel,
  Radio,
  Button,
  Typography,
  IconButton,
} from '@mui/material';
import { LocalizationProvider, TimePicker } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { fr } from 'date-fns/locale';
import { PhoneAndroid, Computer, Edit, Delete } from '@mui/icons-material';

interface Audit {
  id: number;
  url: string;
  nextDate: string;
  device: string;
  frequency: string;
}

interface ScheduledAuditsProps {
  websiteUrl: string;
  onWebsiteUrlChange: (url: string) => void;
  device: string;
  onDeviceChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  frequency: string;
  onFrequencyChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  auditTime: Date | null;
  onAuditTimeChange: (time: Date | null) => void;
  scheduledAudits: Audit[];
  onEdit: (audit: Audit) => void;
  onDelete: (auditId: number) => void;
  theme: any;
  scrollStyles: any;
}

const timePickerStyles = {
  width: '100%',
  '& .MuiOutlinedInput-root': {
    color: '#EDEDED',
    background: 'rgba(26, 29, 37, 0.8)',
    borderRadius: '16px',
    '& fieldset': { borderColor: 'rgba(190, 48, 255, 0.3)' },
    '&:hover fieldset': { borderColor: 'rgba(190, 48, 255, 0.5)' },
    '&.Mui-focused fieldset': { borderColor: '#BE30FF' },
  },
  '& .MuiInputBase-input': { color: '#EDEDED' },
  '& .MuiSvgIcon-root': { color: '#EDEDED' },
};

const deviceIconStyles = {
  width: '25px',
  height: '25px',
  flexShrink: 0,
  fill: '#EDEDED',
};

const ScheduledAudits = ({
  websiteUrl,
  onWebsiteUrlChange,
  device,
  onDeviceChange,
  frequency,
  onFrequencyChange,
  auditTime,
  onAuditTimeChange,
  scheduledAudits,
  onEdit,
  onDelete,
  theme,
  scrollStyles,
}: ScheduledAuditsProps) => {
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={fr}>
      <Box sx={{ mt: 3, ...scrollStyles, maxHeight: '500px' }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3, mb: 4 }}>
          <Box>
            <Typography
              variant="subtitle2"
              gutterBottom
              sx={{
                color: '#EDEDED',
                fontSize: '20px',
                fontStyle: 'normal',
                fontFamily: theme.typography.fontTertiaryFamily,
                fontWeight: 600,
              }}
            >
              URL du site web
            </Typography>
            <TextField
              fullWidth
              value={websiteUrl}
              onChange={(e) => onWebsiteUrlChange(e.target.value)}
              variant="outlined"
              sx={{
                '& .MuiOutlinedInput-root': {
                  color: '#FFF',
                  fontFamily: theme.typography.fontFamily,
                  fontSize: '14px',
                  background: '#1A1D25',
                  borderRadius: '24px',
                  border: '2px solid transparent',
                  backgroundImage:
                    'linear-gradient(#1A1D25, #1A1D25), linear-gradient(180deg, #BE30FF 0.66%, #5D31F8 51.44%, #00A3FF 100%)',
                  backgroundOrigin: 'border-box',
                  backgroundClip: 'padding-box, border-box',
                  boxShadow: '0 0 2px 0 rgba(0, 0, 0, 0.28), 0 16px 64px 0 rgba(0, 0, 0, 0.16)',
                  '& fieldset': { border: 'none' },
                },
              }}
            />
          </Box>

          <Box sx={{ display: 'flex', gap: 6, alignItems: 'flex-start' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Typography
                variant="subtitle2"
                sx={{
                  color: '#EDEDED',
                  fontSize: '20px',
                  fontStyle: 'normal',
                  fontFamily: theme.typography.fontTertiaryFamily,
                  fontWeight: 600,
                  mb: 0.7,
                }}
              >
                Appareil:
              </Typography>
              <RadioGroup row value={device} onChange={onDeviceChange} sx={{ gap: 1 }}>
                <FormControlLabel
                  value="computer"
                  control={
                    <Radio sx={{ color: '#EDEDED', '&.Mui-checked': { color: '#be30ff' } }} />
                  }
                  label="Ordinateur"
                  sx={{ color: '#EDEDED' }}
                />
                <FormControlLabel
                  value="mobile"
                  control={
                    <Radio sx={{ color: '#EDEDED', '&.Mui-checked': { color: '#be30ff' } }} />
                  }
                  label="Mobile"
                  sx={{ color: '#EDEDED' }}
                />
              </RadioGroup>
            </Box>

            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Typography
                variant="subtitle2"
                sx={{
                  color: '#EDEDED',
                  fontSize: '20px',
                  fontStyle: 'normal',
                  fontFamily: theme.typography.fontTertiaryFamily,
                  fontWeight: 600,
                  mb: 0.7,
                }}
              >
                Fréquence:
              </Typography>
              <RadioGroup row value={frequency} onChange={onFrequencyChange} sx={{ gap: 1 }}>
                <FormControlLabel
                  value="daily"
                  control={
                    <Radio sx={{ color: '#EDEDED', '&.Mui-checked': { color: '#be30ff' } }} />
                  }
                  label="Quotidien"
                  sx={{ color: '#EDEDED' }}
                />
                <FormControlLabel
                  value="weekly"
                  control={
                    <Radio sx={{ color: '#EDEDED', '&.Mui-checked': { color: '#be30ff' } }} />
                  }
                  label="Hebdomadaire"
                  sx={{ color: '#EDEDED' }}
                />
                <FormControlLabel
                  value="monthly"
                  control={
                    <Radio sx={{ color: '#EDEDED', '&.Mui-checked': { color: '#be30ff' } }} />
                  }
                  label="Mensuel"
                  sx={{ color: '#EDEDED' }}
                />
              </RadioGroup>
            </Box>
          </Box>

          <Box>
            <Typography
              variant="subtitle2"
              sx={{
                color: '#EDEDED',
                fontSize: '20px',
                fontStyle: 'normal',
                fontFamily: theme.typography.fontTertiaryFamily,
                fontWeight: 600,
                mb: 2,
              }}
            >
              L&lsquo;heure d&lsquo;Audit
            </Typography>
            <TimePicker
              value={auditTime}
              onChange={onAuditTimeChange}
              slotProps={{
                textField: {
                  size: 'small',
                },
              }}
              sx={{
                '& .MuiOutlinedInput-root': {
                  color: 'text.secondary',
                  fontFamily: theme.typography.fontFamily,
                  fontSize: '22px',
                  background: '#1A1D25',
                  borderRadius: '24px',
                  border: '2px solid transparent',
                  backgroundImage:
                    'linear-gradient(#1A1D25, #1A1D25), linear-gradient(180deg, #BE30FF 0.66%, #5D31F8 51.44%, #00A3FF 100%)',
                  backgroundOrigin: 'border-box',
                  backgroundClip: 'padding-box, border-box',
                  boxShadow: '0 0 2px 0 rgba(0, 0, 0, 0.28), 0 16px 64px 0 rgba(0, 0, 0, 0.16)',
                  '& fieldset': {
                    border: 'none',
                  },
                  '&:hover fieldset': {
                    border: 'none',
                  },
                  '&.Mui-focused fieldset': {
                    border: 'none',
                  },
                },
                '& .MuiInputBase-input::placeholder': {
                  color: 'rgba(255, 255, 255, 0.5)',
                  opacity: 1,
                },
              }}
            />
          </Box>

          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
            <Button
              size="large"
              sx={{
                px: 4,
                py: 1.5,
                textTransform: 'none',
                fontSize: '1rem',
                fontWeight: 600,
                padding: '14px 20px',
                borderRadius: '16px',
                backgroundColor: '#BE30FF',
                color: '#551d74',
                '&:hover': { backgroundColor: '#A020E0' },
                width: '100%',
              }}
            >
              Créer un planning
            </Button>
          </Box>
        </Box>

        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: 2,
            ...scrollStyles,
            maxHeight: '300px',
          }}
        >
          {scheduledAudits.map((audit) => (
            <Box
              key={audit.id}
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 3,
                p: 1.5,
                borderRadius: '24px',
                background: 'rgb(100, 32, 136)',
              }}
            >
              <Box sx={{ display: 'flex', transform: 'rotate(0deg)', flexShrink: 0 }}>
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
                    fontSize: '20px',
                    fontStyle: 'normal',
                    lineHeight: '121.331%',
                    width: '314px',
                  }}
                >
                  {audit.url}
                </Typography>
                <Typography
                  variant="caption"
                  sx={{
                    color: 'rgba(237, 237, 237, 0.7)',
                    fontFamily: '"IBM Plex Sans"',
                    fontSize: '14px',
                  }}
                >
                  {audit.frequency}
                </Typography>
              </Box>

              <Box sx={{ flex: 1, minWidth: 0 }}>
                <Typography
                  variant="body2"
                  sx={{
                    color: '#EDEDED',
                    fontWeight: 600,
                    fontFamily: '"IBM Plex Sans"',
                    fontSize: '20px',
                    fontStyle: 'normal',
                    lineHeight: '121.331%',
                    width: '314px',
                    mb: 1,
                  }}
                >
                  Prochain : {audit.nextDate}
                </Typography>
              </Box>

              <Box>
                <IconButton
                  onClick={() => onEdit(audit)}
                  sx={{
                    color: '#EDEDED',
                    '&:hover': {
                      color: '#BE30FF',
                      backgroundColor: 'rgba(190, 48, 255, 0.1)',
                    },
                  }}
                >
                  <Edit sx={{ fontSize: '25px' }} />
                </IconButton>
                <IconButton
                  onClick={() => onDelete(audit.id)}
                  sx={{
                    color: '#EDEDED',
                    '&:hover': {
                      color: '#BE30FF',
                      backgroundColor: 'rgba(190, 48, 255, 0.1)',
                    },
                  }}
                >
                  <Delete sx={{ fontSize: '25px' }} />
                </IconButton>
              </Box>
            </Box>
          ))}
        </Box>
      </Box>
    </LocalizationProvider>
  );
};

export default ScheduledAudits;
