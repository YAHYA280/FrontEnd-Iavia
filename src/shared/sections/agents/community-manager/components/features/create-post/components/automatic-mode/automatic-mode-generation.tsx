'use client';

import React from 'react';
import { Box, Typography, TextField, FormControlLabel, Checkbox, IconButton, useTheme } from '@mui/material';
import { FontAwesomeIcon } from '@/shared/components/fontawesome';
import ConditionalComponent from '@/shared/components/conditionalComponent';
import { defaultPlatforms } from '@/shared/_mock/community-manager-config';
import { styles } from '../../dialogs/create-post-dialog/create-post-dialog.styles';

interface AutomaticModeGenerationProps {
  channels: string[];
  onChannelToggle: (channelId: string) => void;
  imageCount: number;
  onImageCountChange: (count: number) => void;
  imagePrompts: { [key: number]: string };
  onImagePromptChange: (index: number, prompt: string) => void;
  referenceImages: { [key: number]: { file: File | null; url: string } };
  onReferenceImageUpload: (index: number, event: React.ChangeEvent<HTMLInputElement>) => void;
  onRemoveReferenceImage: (index: number) => void;
  inspirationUrl: string;
  onInspirationUrlChange: (url: string) => void;
  description: string;
  onDescriptionChange: (description: string) => void;
}

export const AutomaticModeGeneration: React.FC<AutomaticModeGenerationProps> = ({
  channels,
  onChannelToggle,
  imageCount,
  onImageCountChange,
  imagePrompts,
  onImagePromptChange,
  referenceImages,
  onReferenceImageUpload,
  onRemoveReferenceImage,
  inspirationUrl,
  onInspirationUrlChange,
  description,
  onDescriptionChange,
}) => {
  const theme = useTheme();

  return (
    <>
      <Box sx={{ mb: 3 }}>
        <Typography sx={styles.sectionTitle(theme)}>Canaux de communication *</Typography>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
          {defaultPlatforms.map((platform) => (
            <FormControlLabel
              key={platform.id}
              control={
                <Checkbox
                  checked={channels.includes(platform.id)}
                  onChange={() => onChannelToggle(platform.id)}
                  sx={{
                    color: 'rgba(6, 158, 255, 0.5)',
                    '&.Mui-checked': { color: '#069EFF' },
                  }}
                />
              }
              label={
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
              }
            />
          ))}
        </Box>
        <Typography
          sx={{
            color: '#9CA3AF',
            fontFamily: theme.typography.fontFamily,
            fontSize: '12px',
            mt: 1,
            fontStyle: 'italic',
          }}
        >
          L&apos;IA générera la même image avec des légendes adaptées à chaque plateforme.
        </Typography>
      </Box>

      <Box sx={{ mb: 3 }}>
        <Typography sx={styles.sectionTitle(theme)}>Nombre d&apos;images *</Typography>
        <TextField
          type="number"
          value={imageCount}
          onChange={(e) => {
            const value = parseInt(e.target.value, 10);
            if (!isNaN(value) && value > 0 && value <= 10) {
              onImageCountChange(value);
            }
          }}
          inputProps={{ min: 1, max: 10 }}
          placeholder="1"
          sx={styles.gradientTextField(theme)}
          fullWidth
        />
        <Typography
          sx={{
            color: '#9CA3AF',
            fontFamily: theme.typography.fontFamily,
            fontSize: '12px',
            mt: 1,
          }}
        >
          Entrez le nombre d&apos;images à générer pour votre post (1-10)
        </Typography>
      </Box>

      <ConditionalComponent isValid={imageCount > 0}>
        <Box sx={{ mb: 3 }}>
          <Typography sx={styles.sectionTitle(theme)}>
            Prompts et images de référence (Optionnel)
          </Typography>
          <Typography
            sx={{
              color: '#9CA3AF',
              fontFamily: theme.typography.fontFamily,
              fontSize: '12px',
              mb: 2,
            }}
          >
            Décrivez chaque image et/ou ajoutez une image de référence pour que l&apos;IA génère des images personnalisées
          </Typography>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
            {Array.from({ length: imageCount }, (_, index) => (
              <Box
                key={index}
                sx={{
                  padding: 2,
                  borderRadius: '12px',
                  border: '1px solid rgba(6, 158, 255, 0.2)',
                  backgroundColor: 'rgba(6, 158, 255, 0.05)',
                }}
              >
                <Typography
                  sx={{
                    color: '#EDEDED',
                    fontFamily: theme.typography.fontFamily,
                    fontSize: '14px',
                    fontWeight: 600,
                    mb: 2,
                  }}
                >
                  Image {index + 1}
                </Typography>

                <TextField
                  fullWidth
                  multiline
                  rows={2}
                  value={imagePrompts[index] || ''}
                  onChange={(e) => onImagePromptChange(index, e.target.value)}
                  placeholder={`Décrivez l'image ${index + 1} (ex: "Un paysage montagneux au coucher du soleil avec des couleurs chaudes")`}
                  sx={styles.gradientTextField(theme)}
                />

                <Box sx={{ mt: 2 }}>
                  <Typography
                    sx={{
                      color: '#EDEDED',
                      fontFamily: theme.typography.fontFamily,
                      fontSize: '13px',
                      fontWeight: 500,
                      mb: 1,
                    }}
                  >
                    Image de référence
                  </Typography>
                  {!referenceImages[index]?.url ? (
                    <Box
                      sx={{
                        ...styles.emptyImageBox,
                        minHeight: '120px',
                        cursor: 'pointer',
                      }}
                      onClick={() => {
                        const input = document.createElement('input');
                        input.type = 'file';
                        input.accept = 'image/*';
                        input.onchange = (e: any) => onReferenceImageUpload(index, e);
                        input.click();
                      }}
                    >
                      <FontAwesomeIcon
                        icon="image"
                        style={{ fontSize: '32px', color: 'rgba(6, 158, 255, 0.5)', marginBottom: '8px' }}
                      />
                      <Typography
                        sx={{
                          color: '#EDEDED',
                          fontFamily: theme.typography.fontFamily,
                          fontSize: '13px',
                          fontWeight: 600,
                          mb: 0.5,
                        }}
                      >
                        Ajouter une image de référence
                      </Typography>
                      <Typography
                        sx={{
                          color: '#9CA3AF',
                          fontFamily: theme.typography.fontFamily,
                          fontSize: '11px',
                        }}
                      >
                        L&apos;IA s&apos;inspirera de cette image
                      </Typography>
                    </Box>
                  ) : (
                    <Box sx={{ position: 'relative' }}>
                      <Box
                        sx={{
                          width: '100%',
                          height: '120px',
                          borderRadius: '12px',
                          overflow: 'hidden',
                          position: 'relative',
                        }}
                      >
                        <Box
                          component="img"
                          src={referenceImages[index].url}
                          alt={`Image de référence ${index + 1}`}
                          sx={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover',
                          }}
                        />
                        <Box
                          sx={{
                            position: 'absolute',
                            top: 8,
                            right: 8,
                            zIndex: 2,
                          }}
                        >
                          <IconButton
                            onClick={() => onRemoveReferenceImage(index)}
                            sx={{
                              backgroundColor: 'rgba(224, 67, 67, 0.9)',
                              color: '#FFF',
                              width: '32px',
                              height: '32px',
                              '&:hover': {
                                backgroundColor: '#E04343',
                              },
                            }}
                          >
                            <FontAwesomeIcon icon="trash" style={{ fontSize: '12px' }} />
                          </IconButton>
                        </Box>
                      </Box>
                    </Box>
                  )}
                </Box>
              </Box>
            ))}
          </Box>
        </Box>
      </ConditionalComponent>

      <Box sx={{ mb: 3 }}>
        <Typography sx={styles.sectionTitle(theme)}>URL d&apos;inspiration (Optionnel)</Typography>
        <TextField
          fullWidth
          value={inspirationUrl}
          onChange={(e) => onInspirationUrlChange(e.target.value)}
          placeholder="https://example.com/inspiration"
          sx={styles.gradientTextField(theme)}
        />
        <Typography
          sx={{
            color: '#9CA3AF',
            fontFamily: theme.typography.fontFamily,
            fontSize: '12px',
            mt: 1,
          }}
        >
          L&apos;IA analysera cette URL pour s&apos;inspirer du contenu et du style
        </Typography>
      </Box>

      <Box sx={{ mb: 3 }}>
        <Typography sx={styles.sectionTitle(theme)}>Décrivez votre post</Typography>
        <TextField
          fullWidth
          multiline
          rows={4}
          value={description}
          onChange={(e) => onDescriptionChange(e.target.value)}
          placeholder="Soyez précis sur le contenu, le style et le ton souhaités"
          sx={styles.gradientTextField(theme)}
        />
      </Box>
    </>
  );
};

