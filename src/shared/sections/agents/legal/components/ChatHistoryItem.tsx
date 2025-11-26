import React, { useState, useRef } from 'react';
import { Box, Typography, TextField, Menu, MenuItem, IconButton, Dialog, DialogTitle, DialogContent, DialogActions, Button, useTheme } from '@mui/material';
import { FontAwesomeIcon } from '@/shared/components/fontawesome';
import { styles } from './chat-history.styles';
import ConditionalComponent from '@/shared/components/conditionalComponent';


interface ChatHistoryItemProps {
  id: string;
  title: string;
  isActive: boolean;
  onSelect: (id: string) => void;
  onRename: (id: string, newTitle: string) => void;
  onDelete: (id: string) => void;
}

export const ChatHistoryItem: React.FC<ChatHistoryItemProps> = ({
  id,
  title,
  isActive,
  onSelect,
  onRename,
  onDelete,
}) => {
  const theme = useTheme();
  const [isRenaming, setIsRenaming] = useState(false);
  const [newTitle, setNewTitle] = useState(title);
  const [menuAnchor, setMenuAnchor] = useState<null | HTMLElement>(null);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    event.stopPropagation();
    setMenuAnchor(event.currentTarget);
  };

  const handleMenuClose = () => {
    setMenuAnchor(null);
  };

  const handleRename = () => {
    handleMenuClose();
    setIsRenaming(true);
    setNewTitle(title);
    setTimeout(() => inputRef.current?.focus(), 0);
  };

  const handleRenameSubmit = () => {
    if (newTitle.trim() && newTitle !== title) {
      onRename(id, newTitle.trim());
    } else {
      setNewTitle(title);
    }
    setIsRenaming(false);
  };

  const handleRenameCancel = () => {
    setNewTitle(title);
    setIsRenaming(false);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleRenameSubmit();
    } else if (e.key === 'Escape') {
      handleRenameCancel();
    }
  };

  const handleDeleteClick = () => {
    handleMenuClose();
    setShowDeleteDialog(true);
  };

  const handleConfirmDelete = () => {
    setShowDeleteDialog(false);
    onDelete(id);
  };

  const handleCancelDelete = () => {
    setShowDeleteDialog(false);
  };

  return (
    <>
      <Box
        component={isRenaming ? "div" : "button"}
        onClick={isRenaming ? undefined : () => onSelect(id)}
        sx={styles.historyItem(isActive)}
      >
        <ConditionalComponent isValid={isRenaming}>
          <TextField
            inputRef={inputRef}
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
            onBlur={handleRenameSubmit}
            onKeyDown={handleKeyPress}
            size="small"
            sx={styles.renameInput}
            autoFocus
            onClick={(e) => e.stopPropagation()}
            onMouseDown={(e) => e.stopPropagation()}
          />
        </ConditionalComponent>

        <>
          <ConditionalComponent isValid={!isRenaming}>
            <Typography sx={styles.historyItemText} title={title}>
              {title}
            </Typography>

            <IconButton
              onClick={handleMenuOpen}
              sx={styles.menuButton}
              size="small"
              className="menu-button"
            >
              <FontAwesomeIcon
                icon="ellipsis-vertical"
                style={styles.menuIcon}
              />
            </IconButton>
          </ConditionalComponent>
        </>


        <Menu
          anchorEl={menuAnchor}
          open={Boolean(menuAnchor)}
          onClose={handleMenuClose}
          slotProps={{
            paper: {
              sx: styles.menuPaper
            }
          }}
          transformOrigin={{ horizontal: 'right', vertical: 'top' }}
          anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
        >
          <MenuItem onClick={handleRename} sx={styles.menuItem}>
            <FontAwesomeIcon icon="pen-to-square" style={styles.menuItemIcon} />
            Renommer
          </MenuItem>
          <MenuItem onClick={handleDeleteClick} sx={styles.deleteMenuItem}>
            <FontAwesomeIcon icon="trash" style={styles.menuItemIcon} />
            Supprimer
          </MenuItem>
        </Menu>
      </Box>

      <Dialog
        open={showDeleteDialog}
        onClose={handleCancelDelete}
        disableEscapeKeyDown={false}
        PaperProps={{
          sx: styles.dialogPaper,
        }}
        sx={styles.dialogBackdrop}
      >
        <DialogTitle
          sx={styles.dialogTitle(theme)}
        >
          Confirmer la suppression
        </DialogTitle>
        <DialogContent>
          <Typography
            sx={{
              color: '#9CA3AF',
              fontFamily: theme.typography.fontFamily,
              fontSize: '16px',
            }}
          >
            Êtes-vous sûr de vouloir supprimer cette conversation ? Cette action est irréversible.
          </Typography>
        </DialogContent>
        <DialogActions sx={{ p: 2, gap: 1 }}>
          <Button
            onClick={handleCancelDelete}
            variant="outlined"
            sx={styles.cancelButton(theme)}
          >
            Annuler
          </Button>
          <Button
            onClick={handleConfirmDelete}
            variant="contained"
            sx={styles.deleteButton(theme)}
          >
            Supprimer
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}; 