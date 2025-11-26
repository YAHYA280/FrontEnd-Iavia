import React, { useState } from 'react';
import {
  Box,
  Typography,
  Button,
  IconButton,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import { Idea } from '@/shared/_mock/community-manager-config';
import { FontAwesomeIcon } from '@/shared/components/fontawesome';
import ConditionalComponent from '@/shared/components/conditionalComponent';
import { styles } from './idea-card.styles';

export interface IdeaCardProps {
  idea: Idea;
  onView: (ideaId: string) => void;
  onModify: (ideaId: string) => void;
  onDelete: (ideaId: string) => void;
  onPublish: (ideaId: string) => void;
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

  const handlePreviousImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (currentImageIndex > 0) {
      setCurrentImageIndex((prev) => prev - 1);
    }
  };

  const handleNextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (currentImageIndex < idea.imageUrls.length - 1) {
      setCurrentImageIndex((prev) => prev + 1);
    }
  };

  const canGoPrevious = currentImageIndex > 0;
  const canGoNext = currentImageIndex < idea.imageUrls.length - 1;

  return (
    <Box
      onClick={() => onView(idea.id)}
      sx={styles.card}
    >
      <Box sx={styles.imageContainer}>
        <Box
          component="img"
          src={idea.imageUrls[currentImageIndex]}
          alt={idea.caption}
          sx={styles.image}
        />
        <Box sx={styles.platformLogoContainer}>
          <Box
            component="img"
            src={idea.platformLogoSrc}
            alt={idea.platformName}
            sx={styles.platformLogo}
          />
        </Box>

        <ConditionalComponent isValid={idea.imageUrls.length > 1}>
          <>
            <IconButton
              onClick={handlePreviousImage}
              disabled={!canGoPrevious}
              sx={{
                ...styles.navButton(canGoPrevious),
                ...styles.navButtonLeft,
              }}
            >
              <FontAwesomeIcon icon="chevron-left" style={{ fontSize: '14px' }} />
            </IconButton>

            <IconButton
              onClick={handleNextImage}
              disabled={!canGoNext}
              sx={{
                ...styles.navButton(canGoNext),
                ...styles.navButtonRight,
              }}
            >
              <FontAwesomeIcon icon="chevron-right" style={{ fontSize: '14px' }} />
            </IconButton>
            <Box sx={styles.imageCounter}>
              <Typography sx={styles.imageCounterText(theme)}>
                {currentImageIndex + 1}/{idea.imageUrls.length}
              </Typography>
            </Box>
          </>
        </ConditionalComponent>
      </Box>
      <Box sx={styles.content}>
        <Typography sx={styles.caption(theme)}>
          {idea.caption}
        </Typography>
        <Typography sx={styles.date(theme)}>
          {(() => {
            const date = new Date(idea.createdAt);
            const day = String(date.getDate()).padStart(2, '0');
            const month = String(date.getMonth() + 1).padStart(2, '0');
            const year = date.getFullYear();
            return `Créé le ${day}/${month}/${year}`;
          })()}
        </Typography>
        <Box sx={styles.actionsContainer}>
          <Box sx={styles.actionsRow}>
            <Button
              onClick={(e) => {
                e.stopPropagation();
                onModify(idea.id);
              }}
              startIcon={<FontAwesomeIcon icon="edit" style={{ fontSize: '14px' }} />}
              sx={styles.editButton(theme)}
            >
              Modifier
            </Button>
            <IconButton
              onClick={(e) => {
                e.stopPropagation();
                onDelete(idea.id);
              }}
              sx={styles.deleteButton}
            >
              <FontAwesomeIcon icon="trash" style={{ fontSize: '16px', color: '#E04343' }} />
            </IconButton>
          </Box>
          <Button
            onClick={(e) => {
              e.stopPropagation();
              onPublish(idea.id);
            }}
            variant="contained"
            startIcon={<FontAwesomeIcon icon="paper-plane" style={{ fontSize: '14px' }} />}
            sx={styles.publishButton(theme)}
          >
            Publier
          </Button>
        </Box>
      </Box>
    </Box>
  );
};
