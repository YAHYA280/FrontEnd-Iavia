import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Box,
  TextField,
  RadioGroup,
  FormControlLabel,
  Radio,
  Typography,
} from '@mui/material';
import { LocalizationProvider, TimePicker } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { fr } from 'date-fns/locale';

interface EditFormData {
  url: string;
  device: string;
  frequency: string;
  time: Date;
}

interface EditAuditDialogProps {
  open: boolean;
  onClose: () => void;
  editFormData: EditFormData;
  onEditFormChange: (field: string, value: any) => void;
  onSubmit: () => void;
  theme: any;
}

const timePickerStyles = {
  width: '100%',
  '& .MuiOutlinedInput-root': {
    color: '#EDEDED',
    background: 'rgba(26, 29, 37, 0.8)',
    borderRadius: '16px',
    '& fieldset': {
      borderColor: 'rgba(190, 48, 255, 0.3)',
    },
    '&:hover fieldset': {
      borderColor: 'rgba(190, 48, 255, 0.5)',
    },
    '&.Mui-focused fieldset': {
      borderColor: '#BE30FF',
    },
  },
  '& .MuiInputBase-input': {
    color: '#EDEDED',
  },
  '& .MuiSvgIcon-root': {
    color: '#EDEDED',
  },
};

const EditAuditDialog = ({
  open,
  onClose,
  editFormData,
  onEditFormChange,
  onSubmit,
  theme,
}: EditAuditDialogProps) => {
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={fr}>
      <Dialog
        open={open}
        onClose={onClose}
        maxWidth="md"
        fullWidth
        sx={{
          '& .MuiDialog-paper': {
            borderRadius: '24px',
            background: 'rgba(78, 28, 106)',
            color: '#EDEDED',
          },
        }}
      >
        <DialogTitle
          sx={{
            fontFamily: theme.typography.fontTertiaryFamily,
            fontSize: '24px',
            fontWeight: 700,
            color: '#EDEDED',
          }}
        >
          Modifier l&lsquo;audit planifié
        </DialogTitle>
        <DialogContent>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3, mt: 2 }}>
            {/* URL du site web */}
            <Box>
              <Typography
                variant="subtitle2"
                gutterBottom
                sx={{
                  color: '#EDEDED',
                  fontSize: '18px',
                  fontFamily: theme.typography.fontTertiaryFamily,
                  fontWeight: 600,
                }}
              >
                URL du site web
              </Typography>
              <TextField
                fullWidth
                value={editFormData.url}
                onChange={(e) => onEditFormChange('url', e.target.value)}
                variant="outlined"
                sx={{
                  '& .MuiOutlinedInput-root': {
                    color: '#FFF',
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
                    '& fieldset': { border: 'none' },
                  },
                }}
              />
            </Box>

            {/* Appareil */}
            <Box>
              <Typography
                variant="subtitle2"
                sx={{
                  color: '#EDEDED',
                  fontSize: '18px',
                  fontFamily: theme.typography.fontTertiaryFamily,
                  fontWeight: 600,
                  mb: 1,
                }}
              >
                Appareil:
              </Typography>
              <RadioGroup
                row
                value={editFormData.device}
                onChange={(e) => onEditFormChange('device', e.target.value)}
                sx={{ gap: 2 }}
              >
                <FormControlLabel
                  value="computer"
                  control={
                    <Radio
                      sx={{
                        color: '#EDEDED',
                        '&.Mui-checked': { color: '#be30ff' },
                      }}
                    />
                  }
                  label="Ordinateur"
                  sx={{ color: '#EDEDED' }}
                />
                <FormControlLabel
                  value="mobile"
                  control={
                    <Radio
                      sx={{
                        color: '#EDEDED',
                        '&.Mui-checked': { color: '#be30ff' },
                      }}
                    />
                  }
                  label="Mobile"
                  sx={{ color: '#EDEDED' }}
                />
              </RadioGroup>
            </Box>

            {/* Fréquence */}
            <Box>
              <Typography
                variant="subtitle2"
                sx={{
                  color: '#EDEDED',
                  fontSize: '18px',
                  fontFamily: theme.typography.fontTertiaryFamily,
                  fontWeight: 600,
                  mb: 1,
                }}
              >
                Fréquence:
              </Typography>
              <RadioGroup
                row
                value={editFormData.frequency}
                onChange={(e) => onEditFormChange('frequency', e.target.value)}
                sx={{ gap: 2 }}
              >
                <FormControlLabel
                  value="daily"
                  control={
                    <Radio
                      sx={{
                        color: '#EDEDED',
                        '&.Mui-checked': { color: '#be30ff' },
                      }}
                    />
                  }
                  label="Quotidien"
                  sx={{ color: '#EDEDED' }}
                />
                <FormControlLabel
                  value="weekly"
                  control={
                    <Radio
                      sx={{
                        color: '#EDEDED',
                        '&.Mui-checked': { color: '#be30ff' },
                      }}
                    />
                  }
                  label="Hebdomadaire"
                  sx={{ color: '#EDEDED' }}
                />
                <FormControlLabel
                  value="monthly"
                  control={
                    <Radio
                      sx={{
                        color: '#EDEDED',
                        '&.Mui-checked': { color: '#be30ff' },
                      }}
                    />
                  }
                  label="Mensuel"
                  sx={{ color: '#EDEDED' }}
                />
              </RadioGroup>
            </Box>

            {/* Heure d'audit avec TimePicker */}
            <Box>
              <Typography
                variant="subtitle2"
                sx={{
                  color: '#EDEDED',
                  fontSize: '18px',
                  fontFamily: theme.typography.fontTertiaryFamily,
                  fontWeight: 600,
                  mb: 1,
                }}
              >
                L&lsquo;heure d&lsquo;Audit
              </Typography>
              <TimePicker
                value={editFormData.time}
                onChange={(newValue) => onEditFormChange('time', newValue)}
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
          </Box>
        </DialogContent>
        <DialogActions sx={{ p: 3, gap: 2 }}>
          <Button
            onClick={onClose}
            sx={{
              color: '#EDEDED',
              border: '1px solid #BE30FF',
              borderRadius: '16px',
              px: 3,
              py: 1,
              '&:hover': {
                backgroundColor: 'rgba(190, 48, 255, 0.1)',
              },
            }}
          >
            Annuler
          </Button>
          <Button
            onClick={onSubmit}
            sx={{
              backgroundColor: '#BE30FF',
              color: '#551d74',
              borderRadius: '16px',
              px: 3,
              py: 1,
              fontWeight: 600,
              '&:hover': {
                backgroundColor: '#A020E0',
              },
            }}
          >
            Enregistrer les modifications
          </Button>
        </DialogActions>
      </Dialog>
    </LocalizationProvider>
  );
};

export default EditAuditDialog;
