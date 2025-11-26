import React, { useState, useEffect } from 'react';
import {
  Box,
  Dialog,
  DialogContent,
  TextField,
  Button,
  Typography,
  useTheme,
  CircularProgress,
} from '@mui/material';
import { FontAwesomeIcon } from '@/shared/components/fontawesome';
import { GalleryMediaResponse, useGalleryStore } from '@/shared/api';
import ConditionalComponent from '@/shared/components/conditionalComponent';

export interface EditImageDialogProps {
  open: boolean;
  onClose: () => void;
  media: GalleryMediaResponse | null;
}

export const EditImageDialog: React.FC<EditImageDialogProps> = ({
  open,
  onClose,
  media,
}) => {
  const theme = useTheme();
  const [prompt, setPrompt] = useState('');
  const [isRegenerating, setIsRegenerating] = useState(false);
  const { regenerateImage } = useGalleryStore();

  useEffect(() => {
    if (open) {
      setPrompt('');
    }
  }, [open]);

  const handleRegenerate = async () => {
    if (!media || !prompt.trim()) return;

    setIsRegenerating(true);
    try {
      await regenerateImage(media.uid, { prompt: prompt.trim() });
      onClose();
    } catch (error) {
      console.error('Failed to regenerate image:', error);
    } finally {
      setIsRegenerating(false);
    }
  };

  if (!media) return null;

  const isVideo = media.type === 'video';
  const imageSrc = isVideo && media.thumbnailUrl ? media.thumbnailUrl : media.url;

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="md"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: '16px',
          background: 'rgba(13, 45, 69, 0.95)',
          backdropFilter: 'blur(12px)',
          border: '1px solid rgba(6, 158, 255, 0.2)',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
        },
      }}
      sx={{
        '& .MuiBackdrop-root': {
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          backdropFilter: 'blur(4px)',
        },
      }}
    >
      <DialogContent sx={{ p: 4 }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
          <Box>
            <ConditionalComponent isValid={isVideo}>
              <Typography
                sx={{
                  color: '#FFF',
                  fontFamily: theme.typography.fontTertiaryFamily,
                  fontSize: '24px',
                  fontWeight: 700,
                  mb: 1,
                }}
              >
                Éditer la vidéo
              </Typography>
            </ConditionalComponent>

            <ConditionalComponent isValid={!isVideo}>
              <Typography
                sx={{
                  color: '#FFF',
                  fontFamily: theme.typography.fontTertiaryFamily,
                  fontSize: '24px',
                  fontWeight: 700,
                  mb: 1,
                }}
              >
                Éditer l&apos;image
              </Typography>
            </ConditionalComponent>

            <Typography
              sx={{
                color: '#9CA3AF',
                fontFamily: theme.typography.fontFamily,
                fontSize: '14px',
              }}
            >
              Décrire les changements souhaités
            </Typography>
          </Box>

          {/* Prompt */}
          <TextField
            fullWidth
            multiline
            rows={4}
            placeholder="Ex: Changer la couleur de fond en bleu, ajouter plus de texte, etc."
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            sx={{
              '& .MuiOutlinedInput-root': {
                color: '#FFF',
                fontFamily: theme.typography.fontFamily,
                fontSize: '14px',
                background: '#1A1D25',
                borderRadius: '24px',
                border: '2px solid transparent',
                backgroundImage:
                  'linear-gradient(#1A1D25, #1A1D25), linear-gradient(180deg, #BE30FF 0.66%, #5D31F8 51.44%, #00A3FF 100%)',
                backgroundOrigin: 'border-box',
                backgroundClip: 'padding-box, border-box',
                boxShadow: '0 0 2px 0 rgba(0, 0, 0, 0.28), 0 16px 64px 0 rgba(0, 0, 0, 0.16)',
                '& fieldset': { border: 'none' },
                '&:hover fieldset': { border: 'none' },
                '&.Mui-focused fieldset': { border: 'none' },
                '& .MuiInputBase-input': {
                  color: '#FFF',
                  '&::placeholder': {
                    color: 'rgba(255, 255, 255, 0.5)',
                    opacity: 1,
                  },
                },
              },
            }}
          />

          {/* Preview */}
          <Box
            sx={{
              borderRadius: '12px',
              overflow: 'hidden',
              border: '1px solid rgba(6, 158, 255, 0.2)',
            }}
          >
            <Box
              component="img"
              src={imageSrc}
              alt={media.caption}
              sx={{
                width: '100%',
                maxHeight: '400px',
                objectFit: 'contain',
                backgroundColor: '#1A1D25',
              }}
            />
          </Box>

          {/* Actions */}
          <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end', pt: 1 }}>
            <Button
              variant="outlined"
              onClick={onClose}
              sx={{
                color: '#EDEDED',
                borderColor: 'rgba(6, 158, 255, 0.5)',
                borderRadius: '12px',
                px: 3,
                py: 1.5,
                fontFamily: theme.typography.fontFamily,
                fontSize: '14px',
                fontWeight: 600,
                textTransform: 'none',
                '&:hover': {
                  borderColor: '#069eff',
                  backgroundColor: 'rgba(6, 158, 255, 0.1)',
                },
              }}
            >
              Annuler
            </Button>

            <Button
              variant="contained"
              onClick={handleRegenerate}
              disabled={!prompt.trim() || isRegenerating}
              sx={{
                backgroundColor: '#069EFF',
                background: '#069EFF',
                backgroundImage: 'none',
                color: '#FFF',
                borderRadius: '12px',
                px: 3,
                py: 1.5,
                fontFamily: theme.typography.fontFamily,
                fontSize: '14px',
                fontWeight: 600,
                textTransform: 'none',
                boxShadow: 'none',
                '&:hover': {
                  backgroundColor: '#0588d6',
                  background: '#0588d6',
                  backgroundImage: 'none',
                  boxShadow: 'none',
                },
                '&:disabled': {
                  backgroundColor: 'rgba(6, 158, 255, 0.3)',
                  background: 'rgba(6, 158, 255, 0.3)',
                  color: 'rgba(255, 255, 255, 0.5)',
                },
              }}
            >
              <ConditionalComponent isValid={isRegenerating}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <CircularProgress size={16} sx={{ color: '#FFF' }} />
                  <span>Régénération...</span>
                </Box>
              </ConditionalComponent>

              <ConditionalComponent isValid={!isRegenerating}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <FontAwesomeIcon icon="wand-magic-sparkles" style={{ fontSize: '16px' }} />
                  <span>Régénérer</span>
                </Box>
              </ConditionalComponent>
            </Button>
          </Box>
        </Box>
      </DialogContent>
    </Dialog>
  );
};
