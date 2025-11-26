'use client';

import React, { useState } from 'react';
import { Box, Typography, IconButton, Button, useTheme, Menu, MenuItem, ListItemIcon, ListItemText } from '@mui/material';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import { FontAwesomeIcon } from '@/shared/components/fontawesome';
import ConditionalComponent from '@/shared/components/conditionalComponent';
import { SelectGalleryDialog } from '../../dialogs/select-gallery-dialog';
import { styles } from './image-section.styles';

interface ImageSectionProps {
  imageUrls: string[];
  currentImageIndex: number;
  onImageSelect: (index: number) => void;
  onRemoveImage: (index: number) => void;
  onAddImage: () => void;
  onPreviousImage: (e: React.MouseEvent) => void;
  onNextImage: (e: React.MouseEvent) => void;
  onReplaceImage: (index: number, file: File) => void;
  onDragEnd: (result: any) => void;
  onDragStart: () => void;
  fileInputRefs: React.MutableRefObject<(HTMLInputElement | null)[]>;
  canGoPrevious: boolean;
  canGoNext: boolean;
  onAddImageFromGallery?: (imageUrl: string) => void;
  onReplaceImageFromGallery?: (index: number, imageUrl: string) => void;
}

export const ImageSection: React.FC<ImageSectionProps> = ({
  imageUrls,
  currentImageIndex,
  onImageSelect,
  onRemoveImage,
  onAddImage,
  onPreviousImage,
  onNextImage,
  onReplaceImage,
  onDragEnd,
  onDragStart,
  fileInputRefs,
  canGoPrevious,
  canGoNext,
  onAddImageFromGallery,
  onReplaceImageFromGallery,
}) => {
  const theme = useTheme();
  const [changeImageMenuAnchor, setChangeImageMenuAnchor] = useState<null | HTMLElement>(null);
  const [addImageMenuAnchor, setAddImageMenuAnchor] = useState<null | HTMLElement>(null);
  const [galleryDialogOpen, setGalleryDialogOpen] = useState(false);
  const [isReplacingImage, setIsReplacingImage] = useState(false);
  const [replaceImageIndex, setReplaceImageIndex] = useState<number | null>(null);

  const renderThumbnailStrip = () => (
    <Box sx={{ mb: 2 }}>
      <Typography sx={styles.thumbnailLabel(theme)}>
        {imageUrls.length > 1 ? 'Glissez pour réorganiser • Cliquez pour sélectionner' : 'Image'}
      </Typography>

      <DragDropContext onDragStart={onDragStart} onDragEnd={onDragEnd}>
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
                          onImageSelect(index);
                        }}
                        sx={styles.thumbnailClickArea}
                      >
                        <Box
                          component="img"
                          src={url}
                          alt={`Thumbnail ${index + 1}`}
                          sx={styles.thumbnailImage}
                        />
                      </Box>

                      <Box className="delete-overlay" sx={styles.deleteOverlay}>
                        <IconButton
                          size="small"
                          onClick={(e) => {
                            e.stopPropagation();
                            onRemoveImage(index);
                          }}
                          sx={styles.deleteButton}
                        >
                          <FontAwesomeIcon icon="trash" style={{ fontSize: '12px' }} />
                        </IconButton>
                      </Box>

                      <ConditionalComponent isValid={currentImageIndex === index}>
                        <Box sx={styles.currentImageIndicator}>
                          <FontAwesomeIcon icon="check" style={{ fontSize: '10px', color: '#FFF' }} />
                        </Box>
                      </ConditionalComponent>
                    </Box>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}

              <Box
                sx={styles.addImageBox}
                onClick={(e) => {
                  e.stopPropagation();
                  setAddImageMenuAnchor(e.currentTarget);
                }}
              >
                <FontAwesomeIcon
                  icon="plus"
                  style={{ fontSize: '20px', color: '#069eff' }}
                />
              </Box>
            </Box>
          )}
        </Droppable>
      </DragDropContext>
      <Menu
        anchorEl={addImageMenuAnchor}
        open={Boolean(addImageMenuAnchor)}
        onClose={() => setAddImageMenuAnchor(null)}
        PaperProps={{
          sx: {
            background: 'linear-gradient(135deg, rgba(8, 30, 50, 0.98) 0%, rgba(15, 50, 80, 0.98) 100%)',
            backdropFilter: 'blur(16px)',
            border: '1px solid rgba(6, 158, 255, 0.4)',
            borderRadius: '12px',
            minWidth: '240px',
            mt: 1,
            boxShadow: '0 12px 40px rgba(6, 158, 255, 0.15), 0 0 0 1px rgba(6, 158, 255, 0.1)',
          },
        }}
        transformOrigin={{ horizontal: 'left', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'left', vertical: 'bottom' }}
      >
        <MenuItem
          onClick={() => {
            onAddImage();
            setAddImageMenuAnchor(null);
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
            setIsReplacingImage(false);
            setReplaceImageIndex(null);
            setGalleryDialogOpen(true);
            setAddImageMenuAnchor(null);
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
            <FontAwesomeIcon icon="images" style={{ fontSize: '16px', color: '#069eff' }} />
          </ListItemIcon>
          <ListItemText
            primary="Sélectionner depuis la galerie"
            secondary="Bibliothèque de médias"
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
  );

  const handleGallerySelect = (imageUrl: string) => {
    if (isReplacingImage && replaceImageIndex !== null && onReplaceImageFromGallery) {
      onReplaceImageFromGallery(replaceImageIndex, imageUrl);
    } else if (onAddImageFromGallery) {
      onAddImageFromGallery(imageUrl);
    }
    setGalleryDialogOpen(false);
    setIsReplacingImage(false);
    setReplaceImageIndex(null);
  };

  const renderEmptyImageState = () => (
    <Box
      sx={styles.emptyImageBox}
      onClick={(e) => {
        e.stopPropagation();
        setAddImageMenuAnchor(e.currentTarget);
      }}
    >
      <FontAwesomeIcon
        icon="images"
        style={{ fontSize: '48px', color: 'rgba(6, 158, 255, 0.5)', marginBottom: '12px' }}
      />
      <Typography sx={styles.emptyImageTitle(theme)}>
        Cliquez pour ajouter des médias
      </Typography>
      <Typography sx={styles.emptyImageSubtitle(theme)}>
        PNG, JPG, MP4 jusqu&apos;à 50MB
      </Typography>
    </Box>
  );

  if (imageUrls.length > 0) {
    return (
      <Box>
        <Box sx={styles.imageContainer}>
          <Box
            component="img"
            src={imageUrls[currentImageIndex]}
            alt={`Image ${currentImageIndex + 1}`}
            sx={styles.imagePreview}
          />

          <ConditionalComponent isValid={imageUrls.length > 1}>
            <>
              <IconButton
                onClick={onPreviousImage}
                disabled={!canGoPrevious}
                sx={{ ...styles.navigationIconButton(canGoPrevious), left: 12 }}
              >
                <FontAwesomeIcon icon="chevron-left" style={{ fontSize: '14px' }} />
              </IconButton>

              <IconButton
                onClick={onNextImage}
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
          </ConditionalComponent>

          <Box sx={styles.replaceImageContainer}>
            <input
              ref={(el) => {
                fileInputRefs.current[currentImageIndex] = el;
              }}
              type="file"
              accept="image/*,video/*"
              style={{ display: 'none' }}
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) {
                  onReplaceImage(currentImageIndex, file);
                  setChangeImageMenuAnchor(null);
                }
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
          </Box>
        </Box>

        {renderThumbnailStrip()}

        <Menu
          anchorEl={changeImageMenuAnchor}
          open={Boolean(changeImageMenuAnchor)}
          onClose={() => setChangeImageMenuAnchor(null)}
          PaperProps={{
            sx: {
              background: 'linear-gradient(135deg, rgba(8, 30, 50, 0.98) 0%, rgba(15, 50, 80, 0.98) 100%)',
              backdropFilter: 'blur(16px)',
              border: '1px solid rgba(6, 158, 255, 0.4)',
              borderRadius: '12px',
              minWidth: '240px',
              mt: 1,
              boxShadow: '0 12px 40px rgba(6, 158, 255, 0.15), 0 0 0 1px rgba(6, 158, 255, 0.1)',
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
              setIsReplacingImage(true);
              setReplaceImageIndex(currentImageIndex);
              setGalleryDialogOpen(true);
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
              <FontAwesomeIcon icon="images" style={{ fontSize: '16px', color: '#069eff' }} />
            </ListItemIcon>
            <ListItemText
              primary="Sélectionner depuis la galerie"
              secondary="Bibliothèque de médias"
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

        <SelectGalleryDialog
          open={galleryDialogOpen}
          onClose={() => {
            setGalleryDialogOpen(false);
            setIsReplacingImage(false);
            setReplaceImageIndex(null);
          }}
          onSelect={handleGallerySelect}
        />
      </Box>
    );
  }

  return (
    <>
      {renderEmptyImageState()}
      <Menu
        anchorEl={addImageMenuAnchor}
        open={Boolean(addImageMenuAnchor)}
        onClose={() => setAddImageMenuAnchor(null)}
        PaperProps={{
          sx: {
            background: 'linear-gradient(135deg, rgba(8, 30, 50, 0.98) 0%, rgba(15, 50, 80, 0.98) 100%)',
            backdropFilter: 'blur(16px)',
            border: '1px solid rgba(6, 158, 255, 0.4)',
            borderRadius: '12px',
            minWidth: '240px',
            boxShadow: '0 12px 40px rgba(6, 158, 255, 0.15), 0 0 0 1px rgba(6, 158, 255, 0.1)',
          },
        }}
        transformOrigin={{ horizontal: 'center', vertical: 'center' }}
        anchorOrigin={{ horizontal: 'center', vertical: 'center' }}
      >
        <MenuItem
          onClick={() => {
            onAddImage();
            setAddImageMenuAnchor(null);
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
            setIsReplacingImage(false);
            setReplaceImageIndex(null);
            setGalleryDialogOpen(true);
            setAddImageMenuAnchor(null);
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
            <FontAwesomeIcon icon="images" style={{ fontSize: '16px', color: '#069eff' }} />
          </ListItemIcon>
          <ListItemText
            primary="Sélectionner depuis la galerie"
            secondary="Bibliothèque de médias"
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
      <SelectGalleryDialog
        open={galleryDialogOpen}
        onClose={() => {
          setGalleryDialogOpen(false);
          setIsReplacingImage(false);
          setReplaceImageIndex(null);
        }}
        onSelect={handleGallerySelect}
      />
    </>
  );
};

