import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  FormControl,
  Select,
  MenuItem,
  useTheme,
  useMediaQuery,
  Grid,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  CircularProgress,
  Alert,
} from '@mui/material';
import { FontAwesomeIcon } from '@/shared/components/fontawesome';
import { defaultPlatforms, defaultIdeas, Idea } from '@/shared/_mock/community-manager-config';
import ConditionalComponent from '@/shared/components/conditionalComponent';
import { styles } from './ideas-section.styles';
import { useIdeasStore } from '@/shared/api/stores/community-manager-service/ideas-store';
import { PlatformType, IdeaStatus } from '@/shared/types/community-manager';
import { getPlatformId } from '@/shared/utils/platform-helpers';
import { IdeaCard } from '../../idea-card';
import { EditIdeaDialog } from './components/dialogs/edit-idea-dialog';
import { PublishIdeaDialog } from './components/dialogs/publish-idea-dialog';
import { ViewIdeaDialog } from '../../ViewIdeaDialog';

interface IdeasSectionProps {
  agentUid: string;
}

export const IdeasSection: React.FC<IdeasSectionProps> = ({ agentUid }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [selectedPlatform, setSelectedPlatform] = useState<string>('all');
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);
  const [editIdeaId, setEditIdeaId] = useState<string | null>(null);
  const [publishIdeaId, setPublishIdeaId] = useState<string | null>(null);
  const [viewIdeaId, setViewIdeaId] = useState<string | null>(null);

  const { ideas, isLoading, error, fetchAllByAgent, updateIdea, publishIdea, deleteIdea, clearError } = useIdeasStore();

  useEffect(() => {
    if (agentUid) {
      fetchAllByAgent(agentUid);
    }
  }, [agentUid, fetchAllByAgent]);

  const handleView = (ideaId: string) => {
    setViewIdeaId(ideaId);
  };

  const handleCloseView = () => {
    setViewIdeaId(null);
  };

  const handleModify = (ideaId: string) => {
    setEditIdeaId(ideaId);
  };

  const handleCloseEdit = () => {
    setEditIdeaId(null);
  };

  const handleSaveEdit = async (ideaUid: string, updatedData: { caption: string; imageUrls: string[] }) => {
    try {
      await updateIdea(ideaUid, {
        caption: updatedData.caption,
        images: updatedData.imageUrls.map((url, index) => ({
          imageUrl: url,
          displayOrder: index,
        })),
      });
      setEditIdeaId(null);
    } catch (error) {
      console.error('Failed to update idea:', error);
    }
  };

  const handleDelete = (ideaUid: string) => {
    setDeleteConfirmId(ideaUid);
  };

  const handleConfirmDelete = async () => {
    if (deleteConfirmId) {
      try {
        await deleteIdea(deleteConfirmId);
        setDeleteConfirmId(null);
      } catch (error) {
        console.error('Failed to delete idea:', error);
      }
    }
  };

  const handleCancelDelete = () => {
    setDeleteConfirmId(null);
  };

  const handleClosePublish = () => {
    setPublishIdeaId(null);
  };

  const handlePublish = (ideaId: string) => {
    setPublishIdeaId(ideaId);
  };

  const handleConfirmPublish = async (
    ideaUid: string,
    publishDate: string | null,
    publishTime: string | null,
    platformIds: string[]
  ) => {
    try {
      let publishDateTime: string | undefined;
      let publishNow = !publishDate && !publishTime;

      if (publishDate && publishTime) {
        publishDateTime = `${publishDate}T${publishTime}:00`;
      }

      await publishIdea(ideaUid, {
        publishDateTime,
        publishNow,
      });

      setPublishIdeaId(null);
    } catch (error) {
      console.error('Failed to publish idea:', error);
    }
  };

  const filteredIdeas = selectedPlatform === 'all'
    ? ideas
    : ideas.filter((idea) => getPlatformId(idea.platformType) === selectedPlatform);

  if (error) {
    return (
      <Box sx={styles.container}>
        <Alert severity="error" onClose={clearError} sx={{ mb: 2 }}>
          {error}
        </Alert>
      </Box>
    );
  }

  return (
    <Box sx={styles.container}>
      <Box sx={styles.filterWrapper}>
        <FormControl sx={{ minWidth: { xs: '100%', sm: 200 } }}>
          <Select
            value={selectedPlatform}
            onChange={(e) => setSelectedPlatform(e.target.value)}
            displayEmpty
            renderValue={(selected) => {
              if (selected === 'all') {
                return (
                  <Typography
                    sx={{
                      color: '#EDEDED',
                      fontFamily: theme.typography.fontFamily,
                      fontSize: '14px',
                    }}
                  >
                    Toutes les plateformes
                  </Typography>
                );
              }
              const platform = defaultPlatforms.find((p) => p.id === selected);
              return (
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Box
                    component="img"
                    src={platform?.logoSrc}
                    alt={platform?.name}
                    sx={{ width: 20, height: 20, objectFit: 'contain' }}
                  />
                  <Typography
                    sx={{
                      color: '#EDEDED',
                      fontFamily: theme.typography.fontFamily,
                      fontSize: '14px',
                    }}
                  >
                    {platform?.name}
                  </Typography>
                </Box>
              );
            }}
            MenuProps={{
              PaperProps: {
                sx: styles.selectPaper(theme),
              },
            }}
            sx={styles.selectRoot(theme)}
          >
            <MenuItem value="all">
              <Typography
                sx={{
                  color: '#EDEDED',
                  fontFamily: theme.typography.fontFamily,
                  fontSize: '14px',
                }}
              >
                Toutes les plateformes
              </Typography>
            </MenuItem>
            {defaultPlatforms.map((platform) => (
              <MenuItem key={platform.id} value={platform.id}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Box
                    component="img"
                    src={platform.logoSrc}
                    alt={platform.name}
                    sx={{ width: 20, height: 20, objectFit: 'contain' }}
                  />
                  <Typography
                    sx={{
                      color: '#EDEDED',
                      fontFamily: theme.typography.fontFamily,
                      fontSize: '14px',
                    }}
                  >
                    {platform.name}
                  </Typography>
                </Box>
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>

      <ConditionalComponent isValid={isLoading}>
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '200px' }}>
          <CircularProgress />
        </Box>
      </ConditionalComponent>

      <ConditionalComponent isValid={!isLoading && filteredIdeas.length === 0}>
        <Box sx={styles.emptyStateBox}>
          <FontAwesomeIcon
            icon="wand-magic-sparkles"
            style={{ fontSize: '20px', color: '#FFF' }}
          />
          <Typography sx={styles.emptyTitle(theme)}>
            Aucune idée générée
          </Typography>
          <Typography sx={styles.emptySubtitle(theme)}>
            Cliquez sur &quot;Générer des idées&quot; pour créer des posts personnalisés selon votre configuration
          </Typography>
        </Box>
      </ConditionalComponent>

      <ConditionalComponent isValid={!isLoading && filteredIdeas.length > 0}>
        <Grid container spacing={3}>
          {filteredIdeas.map((idea) => (
            <Grid item xs={12} sm={6} md={4} key={idea.uid}>
              <IdeaCard
                idea={idea}
                onView={handleView}
                onModify={handleModify}
                onDelete={handleDelete}
                onPublish={handlePublish}
              />
            </Grid>
          ))}
        </Grid>
      </ConditionalComponent>

      <Dialog
        open={!!deleteConfirmId}
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
            Êtes-vous sûr de vouloir supprimer cette idée ? Cette action est irréversible.
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

      <EditIdeaDialog
        open={!!editIdeaId}
        idea={ideas.find((idea) => idea.uid === editIdeaId) || null}
        onClose={handleCloseEdit}
        onSave={handleSaveEdit}
      />

      <PublishIdeaDialog
        open={!!publishIdeaId}
        ideaId={publishIdeaId}
        currentPlatformId={getPlatformId(ideas.find((idea) => idea.uid === publishIdeaId)?.platformType || PlatformType.INSTAGRAM)}
        onClose={handleClosePublish}
        onConfirm={handleConfirmPublish}
      />

      <ViewIdeaDialog
        open={!!viewIdeaId}
        idea={ideas.find((idea) => idea.uid === viewIdeaId) || null}
        onClose={handleCloseView}
        onEdit={handleModify}
        onDelete={handleDelete}
        onPublish={handlePublish}
      />
    </Box>
  );
};