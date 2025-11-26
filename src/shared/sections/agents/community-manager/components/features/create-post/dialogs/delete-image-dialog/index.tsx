'use client';

import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Typography, Button, useTheme } from '@mui/material';
import { styles } from '../create-post-dialog/create-post-dialog.styles';

interface DeleteImageDialogProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export const DeleteImageDialog: React.FC<DeleteImageDialogProps> = ({ open, onClose, onConfirm }) => {
  const theme = useTheme();

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="xs"
      fullWidth
      PaperProps={{ sx: styles.dialogPaper }}
    >
      <DialogTitle sx={styles.dialogTitle(theme)}>Supprimer l&apos;image</DialogTitle>
      <DialogContent>
        <Typography
          sx={{
            color: '#EDEDED',
            fontFamily: theme.typography.fontFamily,
            fontSize: '14px',
          }}
        >
          Êtes-vous sûr de vouloir supprimer cette image ?
        </Typography>
      </DialogContent>
      <DialogActions sx={{ p: 3, gap: 1.5 }}>
        <Button onClick={onClose} variant="outlined" sx={styles.cancelButton(theme)}>
          Annuler
        </Button>
        <Button onClick={onConfirm} variant="contained" sx={styles.deleteButton(theme)}>
          Supprimer
        </Button>
      </DialogActions>
    </Dialog>
  );
};

