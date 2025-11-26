import React, { useState, useRef } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Box,
  Typography,
  TextField,
  Button,
  useTheme,
  IconButton,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import { IdeaResponse } from '@/shared/types/community-manager';
import { FontAwesomeIcon } from '@/shared/components/fontawesome';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import { styles } from './edit-idea-dialog.styles';

export interface EditIdeaDialogProps {
  open: boolean;
  idea: IdeaResponse | null;
  onClose: () => void;
  onSave: (ideaUid: string, updatedData: { caption: string; imageUrls: string[] }) => void;
}

export const EditIdeaDialog: React.FC<EditIdeaDialogProps> = ({
  open,
  idea,
  onClose,
  onSave,
}) => {
  const theme = useTheme();
  const [caption, setCaption] = useState('');
  const [imageUrls, setImageUrls] = useState<string[]>([]);
  const [imagePrompt, setImagePrompt] = useState('');
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [initialCaption, setInitialCaption] = useState('');
  const [initialImageUrls, setInitialImageUrls] = useState<string[]>([]);
  const fileInputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const [deleteImageIndex, setDeleteImageIndex] = useState<number | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [showAIGenerateDialog, setShowAIGenerateDialog] = useState(false);
  const [aiPrompt, setAiPrompt] = useState('');
  const [changeImageMenuAnchor, setChangeImageMenuAnchor] = useState<null | HTMLElement>(null);
  const [showImageEditor, setShowImageEditor] = useState(false);

  const hasChanges = () => {
    if (!idea) return false;
    const captionChanged = caption !== initialCaption;
    const imagesChanged = JSON.stringify(imageUrls) !== JSON.stringify(initialImageUrls);
    return captionChanged || imagesChanged;
  };

  React.useEffect(() => {
    if (idea) {
      const sortedImages = idea.images?.length > 0
        ? [...idea.images].sort((a, b) => a.displayOrder - b.displayOrder)
        : [];
      const imageUrlsList = sortedImages.map(img => img.imageUrl);

      setCaption(idea.caption);
      setImageUrls(imageUrlsList);
      setInitialCaption(idea.caption);
      setInitialImageUrls(imageUrlsList);
      setImagePrompt('');
      setCurrentImageIndex(0);
      setShowConfirmDialog(false);
    }
  }, [idea]);

  const handlePreviousImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (currentImageIndex > 0) {
      setCurrentImageIndex((prev) => prev - 1);
    }
  };

  const handleNextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (currentImageIndex < imageUrls.length - 1) {
      setCurrentImageIndex((prev) => prev + 1);
    }
  };

  const canGoPrevious = currentImageIndex > 0;
  const canGoNext = currentImageIndex < imageUrls.length - 1;

  const handleSave = () => {
    if (idea && hasChanges()) {
      onSave(idea.uid, { caption, imageUrls });
      onClose();
    }
  };

  const handleClose = () => {
    if (hasChanges()) {
      setShowConfirmDialog(true);
    } else {
      onClose();
    }
  };

  const handleConfirmClose = () => {
    setShowConfirmDialog(false);
    onClose();
  };

  const handleCancelClose = () => {
    setShowConfirmDialog(false);
  };

  const handleRegenerateImage = () => {
    alert('Fonctionnalité de régénération d\'image à implémenter');
  };

  const handleAutoGenerateCaption = () => {
    alert('Fonctionnalité d\'auto-génération de légende à implémenter');
  };

  const handleImageUpload = (index: number, event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const newImageUrls = [...imageUrls];
        newImageUrls[index] = reader.result as string;
        setImageUrls(newImageUrls);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDragStart = () => {
    setIsDragging(true);
  };

  const handleDragEnd = (result: any) => {
    setIsDragging(false);

    if (!result.destination) return;

    const items = Array.from(imageUrls);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setImageUrls(items);

    if (currentImageIndex === result.source.index) {
      setCurrentImageIndex(result.destination.index);
    } else if (
      currentImageIndex > result.source.index &&
      currentImageIndex <= result.destination.index
    ) {
      setCurrentImageIndex(currentImageIndex - 1);
    } else if (
      currentImageIndex < result.source.index &&
      currentImageIndex >= result.destination.index
    ) {
      setCurrentImageIndex(currentImageIndex + 1);
    }
  };

  const handleAddImage = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImageUrls([...imageUrls, reader.result as string]);
        setCurrentImageIndex(imageUrls.length);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = (index: number) => {
    setDeleteImageIndex(index);
  };

  const handleConfirmRemoveImage = () => {
    if (deleteImageIndex !== null) {
      const newImageUrls = imageUrls.filter((_, i) => i !== deleteImageIndex);
      setImageUrls(newImageUrls);

      if (currentImageIndex >= newImageUrls.length) {
        setCurrentImageIndex(Math.max(0, newImageUrls.length - 1));
      } else if (currentImageIndex > deleteImageIndex) {
        setCurrentImageIndex(currentImageIndex - 1);
      }

      setDeleteImageIndex(null);
    }
  };

  const handleCancelRemoveImage = () => {
    setDeleteImageIndex(null);
  };

  const handleOpenAIGenerate = () => {
    setShowAIGenerateDialog(true);
    setAiPrompt('');
  };

  const handleCloseAIGenerate = () => {
    setShowAIGenerateDialog(false);
    setAiPrompt('');
  };

  const handleGenerateImage = () => {
    const mockGeneratedImage = `https://picsum.photos/800/600?random=${Date.now()}`;
    setImageUrls([...imageUrls, mockGeneratedImage]);
    setCurrentImageIndex(imageUrls.length);
    setShowAIGenerateDialog(false);
    setAiPrompt('');

    alert('Fonctionnalité de génération d\'image par IA à implémenter');
  };

  const renderThumbnailStrip = () => (
    <Box sx={{ mb: 2 }}>
      <Typography sx={styles.thumbnailLabel(theme)}>
        {imageUrls.length > 1 ? 'Glissez pour réorganiser • Cliquez pour sélectionner' : 'Image'}
      </Typography>

      <DragDropContext
        onDragEnd={handleDragEnd}
        onDragStart={handleDragStart}
      >
        <Droppable droppableId="images" direction="horizontal" renderClone={(provided, snapshot, rubric) => (
          <Box
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            ref={provided.innerRef}
            sx={{
              ...styles.thumbnailItem(false, true),
              boxShadow: '0 8px 16px rgba(6, 158, 255, 0.4)',
            }}
          >
            <Box
              component="img"
              src={imageUrls[rubric.source.index]}
              alt={`Dragging ${rubric.source.index + 1}`}
              sx={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
              }}
            />
          </Box>
        )}>
          {(provided) => (
            <Box
              {...provided.droppableProps}
              ref={provided.innerRef}
              sx={styles.thumbnailContainer}
            >
              {imageUrls.map((url, index) => (
                <Draggable key={`image-${index}`} draggableId={`image-${index}`} index={index}>
                  {(provided, snapshot) => (
                    <Box
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      sx={styles.thumbnailItem(currentImageIndex === index, snapshot.isDragging)}
                    >
                      <Box
                        onClick={(e) => {
                          e.stopPropagation();
                          setCurrentImageIndex(index);
                        }}
                        sx={{
                          width: '100%',
                          height: '100%',
                          cursor: 'pointer',
                        }}
                      >
                        <Box
                          component="img"
                          src={url}
                          alt={`Thumbnail ${index + 1}`}
                          sx={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover',
                            pointerEvents: 'none',
                          }}
                        />
                      </Box>

                      <Box className="delete-overlay" sx={styles.deleteOverlay}>
                        <IconButton
                          size="small"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleRemoveImage(index);
                          }}
                          sx={{
                            backgroundColor: 'rgba(224, 67, 67, 0.9)',
                            color: '#FFF',
                            width: '28px',
                            height: '28px',
                            pointerEvents: 'auto',
                            '&:hover': {
                              backgroundColor: '#E04343',
                            },
                          }}
                        >
                          <FontAwesomeIcon icon="trash" style={{ fontSize: '12px' }} />
                        </IconButton>
                      </Box>

                      {currentImageIndex === index && (
                        <Box sx={styles.currentImageIndicator}>
                          <FontAwesomeIcon icon="check" style={{ fontSize: '10px', color: '#FFF' }} />
                        </Box>
                      )}
                    </Box>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}

              <Box
                sx={styles.addImageBox}
                onClick={() => {
                  const input = document.createElement('input');
                  input.type = 'file';
                  input.accept = 'image/*';
                  input.onchange = (e: any) => handleAddImage(e);
                  input.click();
                }}
              >
                <FontAwesomeIcon
                  icon="plus"
                  style={{ fontSize: '20px', color: '#069eff' }}
                />
              </Box>

              <Box
                sx={styles.addImageBox}
                onClick={handleOpenAIGenerate}
              >
                <FontAwesomeIcon
                  icon="wand-magic-sparkles"
                  style={{ fontSize: '20px', color: '#069eff' }}
                />
              </Box>
            </Box>
          )}
        </Droppable>
      </DragDropContext>
    </Box>
  );

  const renderEmptyImageState = () => (
    <Box
      sx={styles.emptyImageBox}
      onClick={() => {
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = 'image/*';
        input.onchange = (e: any) => handleAddImage(e);
        input.click();
      }}
    >
      <FontAwesomeIcon
        icon="file-image"
        style={{ fontSize: '48px', color: 'rgba(6, 158, 255, 0.5)', marginBottom: '12px' }}
      />
      <Typography
        sx={{
          color: '#9CA3AF',
          fontFamily: theme.typography.fontFamily,
          fontSize: '14px',
          fontWeight: 600,
          mb: 0.5,
        }}
      >
        Aucune image
      </Typography>
      <Typography
        sx={{
          color: '#9CA3AF',
          fontFamily: theme.typography.fontFamily,
          fontSize: '12px',
        }}
      >
        Cliquez pour ajouter une image
      </Typography>
    </Box>
  );

  const renderImageSection = () => (
    <Box sx={{ mb: 4 }}>
      <Typography sx={styles.sectionTitle(theme)}>
        Changer l&apos;image
      </Typography>
      <Box sx={{ mb: 2 }}>
        <TextField
          fullWidth
          multiline
          rows={3}
          placeholder="Entrez un prompt pour améliorer l'image..."
          value={imagePrompt}
          onChange={(e) => setImagePrompt(e.target.value)}
          sx={styles.gradientTextField(theme)}
        />
      </Box>
      <Box sx={{ mb: 3 }}>
        <Button
          onClick={handleRegenerateImage}
          variant="contained"
          fullWidth
          startIcon={
            <FontAwesomeIcon
              icon="wand-magic-sparkles"
              style={{ fontSize: '14px' }}
            />
          }
          sx={styles.regenerateButton(theme)}
        >
          Régénérer l&apos;image
        </Button>
      </Box>

      {imageUrls.length > 0 ? (
        <Box>
          <Box sx={styles.imageContainer}>
            <Box
              component="img"
              src={imageUrls[currentImageIndex]}
              alt={`Image ${currentImageIndex + 1}`}
              sx={styles.imagePreview}
            />

            {imageUrls.length > 1 && (
              <>
                <IconButton
                  onClick={handlePreviousImage}
                  disabled={!canGoPrevious}
                  sx={{ ...styles.navigationIconButton(canGoPrevious), left: 12 }}
                >
                  <FontAwesomeIcon icon="chevron-left" style={{ fontSize: '14px' }} />
                </IconButton>

                <IconButton
                  onClick={handleNextImage}
                  disabled={!canGoNext}
                  sx={{ ...styles.navigationIconButton(canGoNext), right: 12 }}
                >
                  <FontAwesomeIcon icon="chevron-right" style={{ fontSize: '14px' }} />
                </IconButton>

                <Box sx={styles.imageCounterBox}>
                  <Typography sx={styles.imageCounterText(theme)}>
                    {currentImageIndex + 1}/{imageUrls.length}
                  </Typography>
                </Box>
              </>
            )}

            <Box
              sx={{
                position: 'absolute',
                top: 12,
                right: 12,
                zIndex: 2,
              }}
            >
              <input
                ref={(el) => {
                  fileInputRefs.current[currentImageIndex] = el;
                }}
                type="file"
                accept="image/*"
                style={{ display: 'none' }}
                onChange={(e) => {
                  handleImageUpload(currentImageIndex, e);
                  setChangeImageMenuAnchor(null);
                }}
              />
              <Button
                onClick={(e) => {
                  e.stopPropagation();
                  setChangeImageMenuAnchor(e.currentTarget);
                }}
                variant="outlined"
                size="small"
                startIcon={<FontAwesomeIcon icon="edit" style={{ fontSize: '12px' }} />}
                sx={styles.changeImageButton(theme)}
              >
                Changer l&apos;image
              </Button>
              <Menu
                anchorEl={changeImageMenuAnchor}
                open={Boolean(changeImageMenuAnchor)}
                onClose={() => setChangeImageMenuAnchor(null)}
                PaperProps={{
                  sx: {
                    background: 'rgba(13, 45, 69, 0.95)',
                    backdropFilter: 'blur(12px)',
                    border: '1px solid rgba(6, 158, 255, 0.3)',
                    borderRadius: '12px',
                    minWidth: '240px',
                    mt: 1,
                    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
                  },
                }}
                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
              >
                <MenuItem
                  onClick={() => {
                    fileInputRefs.current[currentImageIndex]?.click();
                    setChangeImageMenuAnchor(null);
                  }}
                  sx={{
                    color: '#FFF',
                    fontFamily: theme.typography.fontFamily,
                    fontSize: '14px',
                    py: 1.5,
                    px: 2,
                    '&:hover': {
                      backgroundColor: 'rgba(6, 158, 255, 0.1)',
                    },
                  }}
                >
                  <ListItemIcon>
                    <FontAwesomeIcon icon="upload" style={{ fontSize: '16px', color: '#069eff' }} />
                  </ListItemIcon>
                  <ListItemText
                    primary="Télécharger une photo"
                    secondary="Depuis votre ordinateur"
                    primaryTypographyProps={{
                      sx: {
                        fontFamily: theme.typography.fontFamily,
                        fontSize: '14px',
                        fontWeight: 600,
                        color: '#FFF',
                      },
                    }}
                    secondaryTypographyProps={{
                      sx: {
                        fontFamily: theme.typography.fontFamily,
                        fontSize: '12px',
                        color: '#9CA3AF',
                        mt: 0.5,
                      },
                    }}
                  />
                </MenuItem>
                <MenuItem
                  onClick={() => {
                    setChangeImageMenuAnchor(null);
                    // TODO: Intégrer l'éditeur d'image ici
                    // Vous pouvez passer l'image actuelle à l'éditeur
                    // handleOpenImageEditor(imageUrls[currentImageIndex]);
                  }}
                  sx={{
                    color: '#FFF',
                    fontFamily: theme.typography.fontFamily,
                    fontSize: '14px',
                    py: 1.5,
                    px: 2,
                    '&:hover': {
                      backgroundColor: 'rgba(6, 158, 255, 0.1)',
                    },
                  }}
                >
                  <ListItemIcon>
                    <FontAwesomeIcon icon="wand-magic-sparkles" style={{ fontSize: '16px', color: '#069eff' }} />
                  </ListItemIcon>
                  <ListItemText
                    primary="Modifier avec l'éditeur"
                    secondary="Retouches et effets"
                    primaryTypographyProps={{
                      sx: {
                        fontFamily: theme.typography.fontFamily,
                        fontSize: '14px',
                        fontWeight: 600,
                        color: '#FFF',
                      },
                    }}
                    secondaryTypographyProps={{
                      sx: {
                        fontFamily: theme.typography.fontFamily,
                        fontSize: '12px',
                        color: '#9CA3AF',
                        mt: 0.5,
                      },
                    }}
                  />
                </MenuItem>
              </Menu>
            </Box>
          </Box>

          {renderThumbnailStrip()}
        </Box>
      ) : (
        renderEmptyImageState()
      )}
    </Box>
  );

  const renderCaptionSection = () => (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1.5 }}>
        <Typography
          sx={{
            color: '#EDEDED',
            fontFamily: theme.typography.fontFamily,
            fontSize: '14px',
            fontWeight: 600,
          }}
        >
          Légende
        </Typography>
        <Button
          onClick={handleAutoGenerateCaption}
          variant="outlined"
          size="small"
          startIcon={
            <FontAwesomeIcon
              icon="wand-magic-sparkles"
              style={{ fontSize: '12px' }}
            />
          }
          sx={styles.outlinedBlueBtn(theme)}
        >
          Auto-générer
        </Button>
      </Box>
      <TextField
        fullWidth
        multiline
        rows={4}
        value={caption}
        onChange={(e) => setCaption(e.target.value)}
        placeholder="Entrez la légende de votre post..."
        sx={styles.gradientTextField(theme)}
      />
      <Typography sx={styles.captionCounter(theme)}>
        {caption.length} caractères
      </Typography>
    </Box>
  );

  return (
    <>
      <Dialog
        open={open}
        onClose={handleClose}
        maxWidth="md"
        fullWidth
        disableEscapeKeyDown={hasChanges()}
        PaperProps={{
          sx: styles.dialogPaper,
        }}
        sx={styles.dialogBackdrop}
      >
        <DialogTitle sx={styles.dialogTitle(theme)}>
          Modifier le brouillon
        </DialogTitle>
        <DialogContent>
          {!idea ? (
            <Typography sx={styles.loadingText(theme)}>
              Chargement...
            </Typography>
          ) : (
            <>
              <Typography sx={styles.descriptionText(theme)}>
                Modifiez l&apos;image ou la légende de votre post ou autre proposition de votre choix
              </Typography>

              {renderImageSection()}
              {renderCaptionSection()}
            </>
          )}
        </DialogContent>
        <DialogActions sx={{ p: 3, gap: 1.5 }}>
          <Button
            onClick={handleClose}
            variant="outlined"
            sx={styles.cancelButton(theme)}
          >
            Annuler
          </Button>
          <Button
            onClick={handleSave}
            variant="contained"
            disabled={!idea || !hasChanges()}
            sx={styles.actionsPrimaryBtn(theme)}
          >
            Enregistrer les modifications
          </Button>
        </DialogActions>
      </Dialog>

      {/* Confirmation Dialog */}
      <Dialog
        open={showConfirmDialog}
        onClose={handleCancelClose}
        maxWidth="sm"
        PaperProps={{
          sx: { ...styles.dialogPaper, minWidth: '400px' },
        }}
        sx={styles.dialogBackdrop}
      >
        <DialogTitle
          sx={{
            color: '#FFF',
            fontFamily: theme.typography.fontFamily,
            fontSize: '20px',
            fontWeight: 600,
          }}
        >
          Modifications non sauvegardées
        </DialogTitle>
        <DialogContent>
          <Typography
            sx={{
              color: '#9CA3AF',
              fontFamily: theme.typography.fontFamily,
              fontSize: '16px',
            }}
          >
            Vous avez des modifications non sauvegardées. Êtes-vous sûr de vouloir quitter sans enregistrer ?
          </Typography>
        </DialogContent>
        <DialogActions sx={{ p: 2, gap: 1 }}>
          <Button
            onClick={handleCancelClose}
            variant="outlined"
            sx={styles.cancelButton(theme)}
          >
            Annuler
          </Button>
          <Button
            onClick={handleConfirmClose}
            variant="contained"
            sx={styles.actionsPrimaryBtn(theme)}
          >
            Quitter sans enregistrer
          </Button>
        </DialogActions>
      </Dialog>

      {/* Delete Image Dialog */}
      <Dialog
        open={deleteImageIndex !== null}
        onClose={handleCancelRemoveImage}
        maxWidth="sm"
        PaperProps={{
          sx: { ...styles.dialogPaper, minWidth: '400px' },
        }}
        sx={styles.dialogBackdrop}
      >
        <DialogTitle
          sx={{
            color: '#FFF',
            fontFamily: theme.typography.fontFamily,
            fontSize: '20px',
            fontWeight: 600,
          }}
        >
          Supprimer l&apos;image
        </DialogTitle>
        <DialogContent>
          <Typography
            sx={{
              color: '#9CA3AF',
              fontFamily: theme.typography.fontFamily,
              fontSize: '16px',
            }}
          >
            Êtes-vous sûr de vouloir supprimer cette image ? Cette action est irréversible.
          </Typography>
        </DialogContent>
        <DialogActions sx={{ p: 2, gap: 1 }}>
          <Button
            onClick={handleCancelRemoveImage}
            variant="outlined"
            sx={styles.cancelButton(theme)}
          >
            Annuler
          </Button>
          <Button
            onClick={handleConfirmRemoveImage}
            variant="contained"
            sx={styles.deleteButton(theme)}
          >
            Supprimer
          </Button>
        </DialogActions>
      </Dialog>

      {/* AI Generate Dialog */}
      <Dialog
        open={showAIGenerateDialog}
        onClose={handleCloseAIGenerate}
        maxWidth="sm"
        fullWidth
        PaperProps={{
          sx: { ...styles.dialogPaper, border: '1px solid rgba(155, 81, 224, 0.2)' },
        }}
        sx={styles.dialogBackdrop}
      >
        <DialogTitle
          sx={{
            color: '#FFF',
            fontFamily: theme.typography.fontFamily,
            fontSize: '20px',
            fontWeight: 600,
            display: 'flex',
            alignItems: 'center',
            gap: 1,
          }}
        >
          <FontAwesomeIcon
            icon="wand-magic-sparkles"
            style={{ color: '#fff' }}
          />
          Générer une image avec l&apos;IA
        </DialogTitle>
        <DialogContent>
          <Typography
            sx={{
              color: '#9CA3AF',
              fontFamily: theme.typography.fontFamily,
              fontSize: '14px',
              mb: 2,
            }}
          >
            Décrivez l&apos;image que vous souhaitez générer. L&apos;IA créera une image unique basée sur votre description.
          </Typography>

          <TextField
            fullWidth
            multiline
            rows={4}
            value={aiPrompt}
            onChange={(e) => setAiPrompt(e.target.value)}
            placeholder="Ex: Une licorne rose volant au-dessus d'une forêt enchantée au coucher du soleil..."
            sx={styles.aiGenerateTextField(theme)}
          />
        </DialogContent>
        <DialogActions sx={{ p: 3, gap: 1.5 }}>
          <Button
            onClick={handleCloseAIGenerate}
            variant="outlined"
            sx={styles.cancelButton(theme)}
          >
            Annuler
          </Button>
          <Button
            onClick={handleGenerateImage}
            variant="contained"
            disabled={!aiPrompt.trim()}
            startIcon={
              <FontAwesomeIcon
                icon="wand-magic-sparkles"
                style={{ fontSize: '14px' }}
              />
            }
            sx={styles.actionsPrimaryBtn(theme)}
          >
            Générer l&apos;image
          </Button>
        </DialogActions>
      </Dialog>

      {/* Image Editor Dialog */}
      <Dialog
        open={showImageEditor}
        onClose={() => setShowImageEditor(false)}
        maxWidth="lg"
        fullWidth
        PaperProps={{
          sx: { ...styles.dialogPaper, border: '1px solid rgba(190, 48, 255, 0.2)' },
        }}
        sx={styles.dialogBackdrop}
      >
        <DialogTitle
          sx={{
            color: '#FFF',
            fontFamily: theme.typography.fontFamily,
            fontSize: '20px',
            fontWeight: 600,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <FontAwesomeIcon
              icon="wand-magic-sparkles"
              style={{ color: '#BE30FF', fontSize: '20px' }}
            />
            Éditeur d&apos;image
          </Box>
          <IconButton
            onClick={() => setShowImageEditor(false)}
            sx={{
              color: '#9CA3AF',
              '&:hover': {
                backgroundColor: 'rgba(6, 158, 255, 0.1)',
                color: '#069EFF',
              },
            }}
          >
            <FontAwesomeIcon icon="times" style={{ fontSize: '18px' }} />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          {/* TODO: Intégrer votre composant d'éditeur d'image ici */}
          {/* Exemple: <ImageEditor imageUrl={imageUrls[currentImageIndex]} onSave={(editedImage) => { ... }} /> */}
        </DialogContent>
        <DialogActions sx={{ p: 3, gap: 1.5 }}>
          <Button
            onClick={() => setShowImageEditor(false)}
            variant="outlined"
            sx={styles.cancelButton(theme)}
          >
            Annuler
          </Button>
          <Button
            onClick={() => {
              // TODO: Récupérer l'image modifiée de l'éditeur et mettre à jour imageUrls[currentImageIndex]
              // const editedImage = imageEditorRef.current?.getEditedImage();
              // if (editedImage) {
              //   const newImageUrls = [...imageUrls];
              //   newImageUrls[currentImageIndex] = editedImage;
              //   setImageUrls(newImageUrls);
              // }
              setShowImageEditor(false);
            }}
            variant="contained"
            startIcon={<FontAwesomeIcon icon="check" style={{ fontSize: '14px' }} />}
            sx={styles.actionsPrimaryBtn(theme)}
          >
            Appliquer les modifications
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};