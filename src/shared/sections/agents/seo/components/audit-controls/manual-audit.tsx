import {
  Box,
  TextField,
  RadioGroup,
  FormControlLabel,
  Radio,
  Button,
  Typography,
} from '@mui/material';

interface ManualAuditProps {
  websiteUrl: string;
  onWebsiteUrlChange: (url: string) => void;
  device: string;
  onDeviceChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onExecuteAudit: () => void;
  theme: any;
}

const ManualAudit = ({
  websiteUrl,
  onWebsiteUrlChange,
  device,
  onDeviceChange,
  onExecuteAudit,
  theme,
}: ManualAuditProps) => {
  return (
    <Box component="form" sx={{ display: 'flex', flexDirection: 'column', gap: 3, mt: 3 }}>
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

      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
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
        <RadioGroup
          row
          value={device}
          onChange={onDeviceChange}
          sx={{ gap: 3, alignItems: 'center' }}
        >
          <FormControlLabel
            value="computer"
            control={<Radio sx={{ color: '#EDEDED', '&.Mui-checked': { color: '#be30ff' } }} />}
            label="Ordinateur"
            sx={{ color: '#EDEDED' }}
          />
          <FormControlLabel
            value="mobile"
            control={<Radio sx={{ color: '#EDEDED', '&.Mui-checked': { color: '#be30ff' } }} />}
            label="Mobile"
            sx={{ color: '#EDEDED' }}
          />
        </RadioGroup>
      </Box>

      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
        <Button
          size="large"
          onClick={onExecuteAudit}
          sx={{
            px: 4,
            py: 1.5,
            textTransform: 'none',
            fontSize: '1rem',
            fontWeight: 600,
            padding: '14px 20px',
            display: 'flex',
            gap: '8px',
            alignItems: 'center',
            borderRadius: '16px',
            backgroundColor: '#BE30FF',
            color: '#551d74',
            '&:hover': { backgroundColor: '#A020E0' },
            width: '100%',
          }}
        >
          Exécuter l&lsquo;audit de performance
        </Button>
      </Box>
    </Box>
  );
};

export default ManualAudit;
