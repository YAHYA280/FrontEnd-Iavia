import React, { useState, useMemo, useEffect } from 'react';
import {
  Box,
  Typography,
  TextField,
  InputAdornment,
  useTheme,
  Grid,
  CircularProgress,
} from '@mui/material';
import { FontAwesomeIcon } from '@/shared/components/fontawesome';
import { useGalleryStore, GalleryMediaResponse } from '@/shared/api';
import ConditionalComponent from '@/shared/components/conditionalComponent';
import { styles } from './gallery-section.styles';
import { GalleryCard } from './components/gallery-card';
import { EditImageDialog } from './components/edit-image-dialog';

const MOCK_AGENT_UID = '6b15cae1-0d41-4756-9593-a5a9906f4e09';

export const GallerySection: React.FC = () => {
  const theme = useTheme();
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [selectedMedia, setSelectedMedia] = useState<GalleryMediaResponse | null>(null);

  const { media, isLoading, error, fetchByAgent } = useGalleryStore();

  useEffect(() => {
    fetchByAgent(MOCK_AGENT_UID);
  }, [fetchByAgent]);

  const handleDownload = async (mediaUid: string) => {
    const mediaItem = media.find((m) => m.uid === mediaUid);
    if (mediaItem) {
      try {
        const response = await fetch(mediaItem.url);
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);

        const link = document.createElement('a');
        link.href = url;
        link.download = `${mediaItem.platformName}-${mediaItem.uid}.jpg`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        window.URL.revokeObjectURL(url);
      } catch (error) {
        window.open(mediaItem.url, '_blank');
      }
    }
  };

  const handleEdit = (mediaUid: string) => {
    const mediaItem = media.find((m) => m.uid === mediaUid);
    if (mediaItem) {
      setSelectedMedia(mediaItem);
      setEditDialogOpen(true);
    }
  };

  const handleCloseEditDialog = () => {
    setEditDialogOpen(false);
    setSelectedMedia(null);
  };

  const filteredMedia = useMemo(() => {
    if (!media) return [];

    return media.filter((item) => {
      const matchesSearch = searchQuery.trim() === '' ||
        item.caption.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.platformName.toLowerCase().includes(searchQuery.toLowerCase());

      return matchesSearch;
    });
  }, [media, searchQuery]);

  return (
    <Box sx={styles.container}>
      <Box sx={{ mb: 4 }}>
        <Box sx={{ width: '100%', maxWidth: '500px' }}>
          <TextField
            placeholder="Rechercher un média..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            fullWidth
            disabled={isLoading}
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
      </Box>

      {/* Loading State */}
      <ConditionalComponent isValid={isLoading}>
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '300px' }}>
          <CircularProgress size={40} sx={{ color: '#069EFF' }} />
        </Box>
      </ConditionalComponent>

      {/* Error State */}
      <ConditionalComponent isValid={!isLoading && error !== null}>
        <Box sx={styles.emptyStateBox}>
          <FontAwesomeIcon
            icon="circle-exclamation"
            style={{ fontSize: '48px', color: 'rgba(255, 82, 82, 0.5)', marginBottom: '16px' }}
          />
          <Typography sx={styles.emptyTitle(theme)}>
            Erreur de chargement
          </Typography>
          <Typography sx={styles.emptySubtitle(theme)}>
            {error || 'Une erreur est survenue lors du chargement des médias.'}
          </Typography>
        </Box>
      </ConditionalComponent>

      {/* Empty State */}
      <ConditionalComponent isValid={!isLoading && !error && filteredMedia.length === 0}>
        <Box sx={styles.emptyStateBox}>
          <FontAwesomeIcon
            icon="images"
            style={{ fontSize: '48px', color: 'rgba(6, 158, 255, 0.5)', marginBottom: '16px' }}
          />
          <Typography sx={styles.emptyTitle(theme)}>
            Aucun média trouvé
          </Typography>
          <Typography sx={styles.emptySubtitle(theme)}>
            Aucun média ne correspond à vos critères de recherche. Essayez de modifier vos filtres.
          </Typography>
        </Box>
      </ConditionalComponent>

      {/* Gallery Grid */}
      <ConditionalComponent isValid={!isLoading && !error && filteredMedia.length > 0}>
        <Grid container spacing={3}>
          {filteredMedia.map((mediaItem) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={mediaItem.uid}>
              <GalleryCard media={mediaItem} onDownload={handleDownload} onEdit={handleEdit} />
            </Grid>
          ))}
        </Grid>
      </ConditionalComponent>

      <EditImageDialog
        open={editDialogOpen}
        onClose={handleCloseEditDialog}
        media={selectedMedia}
      />
    </Box>
  );
};
