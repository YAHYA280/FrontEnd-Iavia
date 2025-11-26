'use client';

import React, { useState, useMemo, useEffect } from 'react';
import {
  Button,
  useTheme,
  TextField,
  InputAdornment,
  Grid,
  Box,
  Typography,
  IconButton,
} from '@mui/material';
import { FontAwesomeIcon } from '@/shared/components/fontawesome';
import { defaultGalleryMedia, GalleryMedia } from '@/shared/_mock/community-manager-config';
import ConditionalComponent from '@/shared/components/conditionalComponent';
import { styles } from './select-gallery-dialog.styles';

interface SelectGalleryDialogProps {
  open: boolean;
  onClose: () => void;
  onSelect: (imageUrl: string) => void;
  multiple?: boolean;
  onSelectMultiple?: (imageUrls: string[]) => void;
}

export const SelectGalleryDialog: React.FC<SelectGalleryDialogProps> = ({
  open,
  onClose,
  onSelect,
  multiple = false,
  onSelectMultiple,
}) => {
  const theme = useTheme();
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedImages, setSelectedImages] = useState<string[]>([]);
  const [media] = useState<GalleryMedia[]>(defaultGalleryMedia);

  const filteredMedia = useMemo(() => {
    const imagesOnly = media.filter((item) => item.type === 'image');
    if (searchQuery.trim() === '') {
      return imagesOnly;
    }
    return imagesOnly.filter((item) => {
      const matchesSearch =
        item.caption.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.platformName.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesSearch;
    });
  }, [media, searchQuery]);

  const handleImageClick = (imageUrl: string) => {
    if (multiple && onSelectMultiple) {
      const newSelection = selectedImages.includes(imageUrl)
        ? selectedImages.filter((url) => url !== imageUrl)
        : [...selectedImages, imageUrl];
      setSelectedImages(newSelection);
    } else {
      onSelect(imageUrl);
      onClose();
    }
  };

  const handleConfirmMultiple = () => {
    if (onSelectMultiple && selectedImages.length > 0) {
      onSelectMultiple(selectedImages);
      setSelectedImages([]);
      onClose();
    }
  };

  const handleClose = () => {
    setSearchQuery('');
    setSelectedImages([]);
    onClose();
  };

  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  if (!open) return null;

  return (
    <Box
      sx={styles.modalOverlay}
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          handleClose();
        }
      }}
    >
      <Box
        sx={styles.modalContainer}
        onClick={(e) => e.stopPropagation()}
      >
        <Box sx={styles.modalHeader}>
          <Typography sx={styles.dialogTitle(theme)}>
            Sélectionner depuis la galerie
          </Typography>
          <IconButton
            onClick={handleClose}
            sx={styles.closeButton}
          >
            <FontAwesomeIcon icon="xmark" style={{ fontSize: '18px', color: '#9CA3AF' }} />
          </IconButton>
        </Box>

        <Box sx={styles.dialogContent}>
          <Box sx={{ mb: 3 }}>
            <TextField
              placeholder="Rechercher une image..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              fullWidth
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <FontAwesomeIcon icon="search" style={{ fontSize: '16px', color: '#9CA3AF' }} />
                  </InputAdornment>
                ),
              }}
              sx={styles.searchInput(theme)}
            />
          </Box>

          <ConditionalComponent isValid={filteredMedia.length === 0}>
            <Box sx={styles.emptyStateBox}>
              <FontAwesomeIcon
                icon="images"
                style={{ fontSize: '48px', color: 'rgba(6, 158, 255, 0.5)', marginBottom: '16px' }}
              />
              <Typography sx={styles.emptyTitle(theme)}>
                Aucune image trouvée
              </Typography>
              <Typography sx={styles.emptySubtitle(theme)}>
                Aucune image ne correspond à vos critères de recherche.
              </Typography>
            </Box>
          </ConditionalComponent>

          <ConditionalComponent isValid={filteredMedia.length > 0}>
            <Grid container spacing={2}>
              {filteredMedia.map((mediaItem) => {
                const isSelected = selectedImages.includes(mediaItem.url);
                return (
                  <Grid item xs={6} sm={4} md={3} key={mediaItem.id}>
                    <Box
                      onClick={() => handleImageClick(mediaItem.url)}
                      sx={styles.galleryItem(isSelected)}
                    >
                      <Box
                        component="img"
                        src={mediaItem.url}
                        alt={mediaItem.caption}
                        sx={styles.galleryImage}
                      />
                      <ConditionalComponent isValid={isSelected}>
                        <Box sx={styles.selectedOverlay}>
                          <Box sx={styles.selectedCheck}>
                            <FontAwesomeIcon icon="check" style={{ fontSize: '16px', color: '#FFF' }} />
                          </Box>
                        </Box>
                      </ConditionalComponent>
                      <ConditionalComponent isValid={multiple}>
                        <Box sx={styles.selectionIndicator(isSelected)}>
                          <FontAwesomeIcon
                            icon={isSelected ? 'check-circle' : 'circle'}
                            style={{ fontSize: '20px', color: isSelected ? '#069eff' : 'rgba(255, 255, 255, 0.5)' }}
                          />
                        </Box>
                      </ConditionalComponent>
                    </Box>
                  </Grid>
                );
              })}
            </Grid>
          </ConditionalComponent>
        </Box>

        <Box sx={styles.modalActions}>
          <Button onClick={handleClose} variant="outlined" sx={styles.cancelButton(theme)}>
            Annuler
          </Button>
          <ConditionalComponent isValid={multiple}>
            <Button
              onClick={handleConfirmMultiple}
              variant="contained"
              disabled={selectedImages.length === 0}
              sx={styles.confirmButton(theme)}
            >
              Sélectionner ({selectedImages.length})
            </Button>
          </ConditionalComponent>
        </Box>
      </Box>
    </Box>
  );
};

