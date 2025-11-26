import React, { useState } from 'react';
import {
  Box,
  Typography,
  Button,
  IconButton,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import { IdeaResponse } from '@/shared/types/community-manager';
import { FontAwesomeIcon } from '@/shared/components/fontawesome';
import ConditionalComponent from '@/shared/components/conditionalComponent';
import { getPlatformInfo } from '@/shared/utils/platform-helpers';

export interface IdeaCardProps {
  idea: IdeaResponse;
  onView: (ideaUid: string) => void;
  onModify: (ideaUid: string) => void;
  onDelete: (ideaUid: string) => void;
  onPublish: (ideaUid: string) => void;
}

export const IdeaCard: React.FC<IdeaCardProps> = ({
  idea,
  onView,
  onModify,
  onDelete,
  onPublish,
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const platformInfo = getPlatformInfo(idea.platformType);
  const imagesList = idea.images?.length > 0
    ? [...idea.images].sort((a, b) => a.displayOrder - b.displayOrder)
    : [];
  const hasImages = imagesList.length > 0;

  const handlePreviousImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (currentImageIndex > 0) {
      setCurrentImageIndex((prev) => prev - 1);
    }
  };

  const handleNextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (currentImageIndex < imagesList.length - 1) {
      setCurrentImageIndex((prev) => prev + 1);
    }
  };

  const canGoPrevious = currentImageIndex > 0;
  const canGoNext = currentImageIndex < imagesList.length - 1;

  return (
    <Box
      onClick={() => onView(idea.uid)}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: 'rgb(12, 68, 106)',
        borderRadius: '16px',
        border: '1px solid rgba(6, 158, 255, 0.2)',
        overflow: 'hidden',
        cursor: 'pointer',
        transition: 'all 0.3s ease',
        '&:hover': {
          borderColor: 'rgba(6, 158, 255, 0.4)',
          boxShadow: '0 4px 12px rgba(6, 158, 255, 0.2)',
        },
      }}
    >
      <Box
        sx={{
          position: 'relative',
          width: '100%',
          aspectRatio: '16/9',
          overflow: 'hidden',
          backgroundColor: '#1A1D25',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <ConditionalComponent isValid={hasImages}>
          <Box
            component="img"
            src={imagesList[currentImageIndex].imageUrl}
            alt={imagesList[currentImageIndex].altText || idea.caption}
            sx={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              transition: 'opacity 0.3s ease',
            }}
          />
        </ConditionalComponent>
        <ConditionalComponent isValid={!hasImages}>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 1,
              p: 3,
            }}
          >
            <FontAwesomeIcon
              icon="file-image"
              style={{ fontSize: '32px', color: 'rgba(255, 255, 255, 0.3)' }}
            />
            <Typography
              sx={{
                color: 'rgba(255, 255, 255, 0.5)',
                fontFamily: theme.typography.fontFamily,
                fontSize: '12px',
                textAlign: 'center',
              }}
            >
              Image generation failed
            </Typography>
          </Box>
        </ConditionalComponent>
        <Box
          sx={{
            position: 'absolute',
            top: 12,
            left: 12,
            width: 32,
            height: 32,
            backgroundColor: 'rgba(13, 45, 69, 0.9)',
            borderRadius: '8px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '4px',
            backdropFilter: 'blur(4px)',
            zIndex: 2,
          }}
        >
          <Box
            component="img"
            src={platformInfo.logoSrc}
            alt={platformInfo.name}
            sx={{
              width: '100%',
              height: '100%',
              objectFit: 'contain',
            }}
          />
        </Box>

        <ConditionalComponent isValid={hasImages && imagesList.length > 1}>
          <>
            <IconButton
              onClick={handlePreviousImage}
              disabled={!canGoPrevious}
              sx={{
                position: 'absolute',
                left: 12,
                top: '50%',
                transform: 'translateY(-50%)',
                width: '36px',
                height: '36px',
                backgroundColor: canGoPrevious ? 'rgba(13, 45, 69, 0.9)' : 'rgba(13, 45, 69, 0.3)',
                backdropFilter: 'blur(4px)',
                color: canGoPrevious ? '#FFF' : 'rgba(255, 255, 255, 0.3)',
                border: '1px solid rgba(6, 158, 255, 0.3)',
                zIndex: 2,
                cursor: canGoPrevious ? 'pointer' : 'not-allowed',
                '&:hover': {
                  backgroundColor: canGoPrevious ? 'rgba(13, 45, 69, 1)' : 'rgba(13, 45, 69, 0.3)',
                  borderColor: canGoPrevious ? 'rgba(6, 158, 255, 0.5)' : 'rgba(6, 158, 255, 0.3)',
                },
                '&.Mui-disabled': {
                  backgroundColor: 'rgba(13, 45, 69, 0.3)',
                  color: 'rgba(255, 255, 255, 0.3)',
                },
              }}
            >
              <FontAwesomeIcon icon="chevron-left" style={{ fontSize: '14px' }} />
            </IconButton>

            <IconButton
              onClick={handleNextImage}
              disabled={!canGoNext}
              sx={{
                position: 'absolute',
                right: 12,
                top: '50%',
                transform: 'translateY(-50%)',
                width: '36px',
                height: '36px',
                backgroundColor: canGoNext ? 'rgba(13, 45, 69, 0.9)' : 'rgba(13, 45, 69, 0.3)',
                backdropFilter: 'blur(4px)',
                color: canGoNext ? '#FFF' : 'rgba(255, 255, 255, 0.3)',
                border: '1px solid rgba(6, 158, 255, 0.3)',
                zIndex: 2,
                cursor: canGoNext ? 'pointer' : 'not-allowed',
                '&:hover': {
                  backgroundColor: canGoNext ? 'rgba(13, 45, 69, 1)' : 'rgba(13, 45, 69, 0.3)',
                  borderColor: canGoNext ? 'rgba(6, 158, 255, 0.5)' : 'rgba(6, 158, 255, 0.3)',
                },
                '&.Mui-disabled': {
                  backgroundColor: 'rgba(13, 45, 69, 0.3)',
                  color: 'rgba(255, 255, 255, 0.3)',
                },
              }}
            >
              <FontAwesomeIcon icon="chevron-right" style={{ fontSize: '14px' }} />
            </IconButton>
            <Box
              sx={{
                position: 'absolute',
                bottom: 12,
                right: 12,
                backgroundColor: 'rgba(13, 45, 69, 0.9)',
                backdropFilter: 'blur(4px)',
                borderRadius: '8px',
                padding: '4px 12px',
                zIndex: 2,
              }}
            >
              <Typography
                sx={{
                  color: '#FFF',
                  fontFamily: theme.typography.fontFamily,
                  fontSize: '12px',
                  fontWeight: 600,
                }}
              >
                {currentImageIndex + 1}/{imagesList.length}
              </Typography>
            </Box>
          </>
        </ConditionalComponent>
      </Box>
      <Box sx={{ p: 2.5, display: 'flex', flexDirection: 'column', gap: 2 }}>
        <Typography
          sx={{
            color: '#FFF',
            fontFamily: theme.typography.fontFamily,
            fontSize: '14px',
            fontWeight: 500,
            lineHeight: '1.5',
            minHeight: '42px',
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
          }}
        >
          {idea.caption}
        </Typography>
        <Typography
          sx={{
            color: '#9CA3AF',
            fontFamily: theme.typography.fontFamily,
            fontSize: '12px',
            fontWeight: 500,
            mb: -0.5,
          }}
        >
          {(() => {
            const date = new Date(idea.createdAt);
            const day = String(date.getDate()).padStart(2, '0');
            const month = String(date.getMonth() + 1).padStart(2, '0');
            const year = date.getFullYear();
            return `Créé le ${day}/${month}/${year}`;
          })()}
        </Typography>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 1,
            }}
          >
            <Button
              onClick={(e) => {
                e.stopPropagation();
                onModify(idea.uid);
              }}
              startIcon={<FontAwesomeIcon icon="edit" style={{ fontSize: '14px' }} />}
              sx={{
                flex: 1,
                height: '36px',
                borderRadius: '12px',
                border: '1px solid rgba(6, 158, 255, 0.5)',
                backgroundColor: 'transparent',
                color: '#069eff',
                fontFamily: theme.typography.fontFamily,
                fontSize: '14px',
                fontWeight: 600,
                textTransform: 'none',
                '&:hover': {
                  backgroundColor: 'rgba(6, 158, 255, 0.1)',
                  borderColor: '#069eff',
                },
              }}
            >
              Modifier
            </Button>
            <IconButton
              onClick={(e) => {
                e.stopPropagation();
                onDelete(idea.uid);
              }}
              sx={{
                width: '36px',
                height: '36px',
                borderRadius: '12px',
                border: '1px solid rgba(255, 86, 48, 0.3)',
                color: '#FF5630',
                '&:hover': {
                  backgroundColor: 'rgba(255, 86, 48, 0.1)',
                  borderColor: '#FF5630',
                },
              }}
            >
              <FontAwesomeIcon icon="trash" style={{ fontSize: '16px', color: '#E04343' }} />
            </IconButton>
          </Box>
          <Button
            onClick={(e) => {
              e.stopPropagation();
              onPublish(idea.uid);
            }}
            variant="contained"
            startIcon={<FontAwesomeIcon icon="paper-plane" style={{ fontSize: '14px' }} />}
            sx={{
              width: '100%',
              height: '40px',
              borderRadius: '12px',
              background: '#069EFF',
              color: '#FFF',
              fontFamily: theme.typography.fontFamily,
              fontSize: '16px',
              fontWeight: 600,
              textTransform: 'none',
              boxShadow: '0 4px 12px rgba(6, 158, 255, 0.3)',
              '&:hover': {
                background: '#0588d6',
                boxShadow: '0 6px 16px rgba(6, 158, 255, 0.4)',
              },
            }}
          >
            Publier
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

