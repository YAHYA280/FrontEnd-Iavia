'use client';

import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  useTheme,
} from '@mui/material';

export interface DeleteInstructionDialogProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export const DeleteInstructionDialog: React.FC<DeleteInstructionDialogProps> = ({
  open,
  onClose,
  onConfirm,
}) => {
  const theme = useTheme();

  return (
    <Dialog
      open={open}
      onClose={onClose}
      PaperProps={{
        sx: {
          background: '#1A1D25',
          borderRadius: '16px',
          border: '1px solid rgba(141, 49, 251, 0.3)',
          minWidth: '400px',
        },
      }}
    >
      <DialogTitle
        sx={{
          color: '#FFF',
          fontFamily: theme.typography.fontFamily,
          fontSize: '20px',
          fontWeight: 600,
          pb: 1,
        }}
      >
        Confirmer la suppression
      </DialogTitle>
      <DialogContent>
        <DialogContentText
          sx={{
            color: '#9CA3AF',
            fontFamily: theme.typography.fontFamily,
            fontSize: '14px',
          }}
        >
          Êtes-vous sûr de vouloir supprimer cette instruction ? Cette action est irréversible.
        </DialogContentText>
      </DialogContent>
      <DialogActions sx={{ padding: '16px 24px', gap: 1 }}>
        <Button
          onClick={onClose}
          sx={{
            color: '#9CA3AF',
            fontFamily: theme.typography.fontFamily,
            fontSize: '14px',
            fontWeight: 600,
            textTransform: 'none',
            '&:hover': {
              backgroundColor: 'rgba(156, 163, 175, 0.1)',
            },
          }}
        >
          Annuler
        </Button>
        <Button
          onClick={onConfirm}
          sx={{
            color: '#FFF',
            fontFamily: theme.typography.fontFamily,
            fontSize: '14px',
            fontWeight: 600,
            textTransform: 'none',
            background: '#8D31FB',
            borderRadius: '8px',
            padding: '8px 16px',
            '&:hover': {
              background: '#7B28E2',
            },
          }}
        >
          Supprimer
        </Button>
      </DialogActions>
    </Dialog>
  );
};

