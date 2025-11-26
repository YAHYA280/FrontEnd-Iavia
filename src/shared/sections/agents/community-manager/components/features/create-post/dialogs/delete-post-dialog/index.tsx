'use client';

import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Typography, Button, useTheme } from '@mui/material';
import { styles } from './delete-post-dialog.styles';

interface DeletePostDialogProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export const DeletePostDialog: React.FC<DeletePostDialogProps> = ({ open, onClose, onConfirm }) => {
  const theme = useTheme();

  return (
    <Dialog
      open={open}
      onClose={onClose}
      disableEscapeKeyDown={false}
      PaperProps={{
        sx: styles.dialogPaper,
      }}
      sx={{
        '& .MuiBackdrop-root': styles.backdrop,
      }}
    >
      <DialogTitle sx={styles.dialogTitle(theme)}>
        Confirmer la suppression
      </DialogTitle>
      <DialogContent>
        <Typography sx={styles.dialogContent(theme)}>
          Êtes-vous sûr de vouloir supprimer ce post ? Cette action est irréversible.
        </Typography>
      </DialogContent>
      <DialogActions sx={styles.dialogActions}>
        <Button
          onClick={onClose}
          variant="outlined"
          sx={styles.cancelButton(theme)}
        >
          Annuler
        </Button>
        <Button
          onClick={onConfirm}
          variant="contained"
          sx={styles.deleteButton(theme)}
        >
          Supprimer
        </Button>
      </DialogActions>
    </Dialog>
  );
};
