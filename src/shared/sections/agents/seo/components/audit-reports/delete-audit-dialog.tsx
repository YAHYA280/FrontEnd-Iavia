import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  DialogContentText,
} from '@mui/material';

interface DeleteAuditDialogProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  theme: any;
}

const DeleteAuditDialog = ({ open, onClose, onConfirm, theme }: DeleteAuditDialogProps) => {
  return (
    <Dialog
      open={open}
      onClose={onClose}
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
        Supprimer l&lsquo;audit
      </DialogTitle>
      <DialogContent>
        <DialogContentText sx={{ color: '#EDEDED', fontSize: '16px' }}>
          Êtes-vous sûr de vouloir supprimer cet audit planifié ? Cette action est irréversible.
        </DialogContentText>
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
          onClick={onConfirm}
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
          Supprimer
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteAuditDialog;
