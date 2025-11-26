import React, { useState } from 'react';
import {
  Box,
  IconButton,
  Typography,
  useTheme,
  Tooltip,
} from '@mui/material';
import { GalleryMediaResponse } from '@/shared/api';
import { FontAwesomeIcon } from '@/shared/components/fontawesome';
import ConditionalComponent from '@/shared/components/conditionalComponent';

export interface GalleryCardProps {
  media: GalleryMediaResponse;
  onDownload?: (mediaId: string) => void;
  onEdit?: (mediaId: string) => void;
}

export const GalleryCard: React.FC<GalleryCardProps> = ({
  media,
  onDownload,
  onEdit,
}) => {
  const theme = useTheme();
  const [isHovered, setIsHovered] = useState(false);

  const handleDownload = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onDownload) {
      onDownload(media.uid);
    }
  };

  const handleEdit = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onEdit) {
      onEdit(media.uid);
    }
  };

  const handleImageClick = () => {
    window.open(media.url, '_blank');
  };

  return (
    <Box
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: 'rgb(12, 68, 106)',
        borderRadius: '16px',
        border: '1px solid rgba(6, 158, 255, 0.2)',
        overflow: 'hidden',
        cursor: 'pointer',
        transition: 'all 0.3s ease',
        position: 'relative',
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
          aspectRatio: '1',
          overflow: 'hidden',
          backgroundColor: '#1A1D25',
        }}
      >
        <Box
          component="img"
          src={media.type === 'video' && media.thumbnailUrl ? media.thumbnailUrl : media.url}
          alt={media.caption}
          onClick={handleImageClick}
          sx={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            transition: 'transform 0.3s ease',
            transform: isHovered ? 'scale(1.05)' : 'scale(1)',
            cursor: 'pointer',
          }}
        />
        <ConditionalComponent isValid={media.type === 'video'}>
          <Box
            sx={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: 56,
              height: 56,
              backgroundColor: 'rgba(13, 45, 69, 0.9)',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              backdropFilter: 'blur(4px)',
              zIndex: 2,
              pointerEvents: 'none',
            }}
          >
            <FontAwesomeIcon icon="play" style={{ fontSize: '24px', color: '#FFF', marginLeft: '4px' }} />
          </Box>
        </ConditionalComponent>

        <Box
          sx={{
            position: 'absolute',
            top: 12,
            left: 12,
            opacity: isHovered ? 1 : 0,
            transition: 'opacity 0.3s ease',
            zIndex: 3,
          }}
        >
          <Tooltip title={media.type === 'video' ? 'Éditer la vidéo' : "Éditer l'image"} placement="top">
            <IconButton
              onClick={handleEdit}
              sx={{
                width: '40px',
                height: '40px',
                backgroundColor: 'rgba(13, 45, 69, 0.9)',
                backdropFilter: 'blur(4px)',
                color: '#FFF',
                border: '1px solid rgba(6, 158, 255, 0.3)',
                '&:hover': {
                  backgroundColor: 'rgba(13, 45, 69, 1)',
                  borderColor: 'rgba(6, 158, 255, 0.5)',
                },
              }}
            >
              <FontAwesomeIcon icon="pen-to-square" style={{ fontSize: '16px' }} />
            </IconButton>
          </Tooltip>
        </Box>

        <Box
          sx={{
            position: 'absolute',
            top: 12,
            right: 12,
            opacity: isHovered ? 1 : 0,
            transition: 'opacity 0.3s ease',
            zIndex: 3,
          }}
        >
          <Tooltip title="Télécharger" placement="top">
            <IconButton
              onClick={handleDownload}
              sx={{
                width: '40px',
                height: '40px',
                backgroundColor: 'rgba(13, 45, 69, 0.9)',
                backdropFilter: 'blur(4px)',
                color: '#FFF',
                border: '1px solid rgba(6, 158, 255, 0.3)',
                '&:hover': {
                  backgroundColor: 'rgba(13, 45, 69, 1)',
                  borderColor: 'rgba(6, 158, 255, 0.5)',
                },
              }}
            >
              <FontAwesomeIcon icon="download" style={{ fontSize: '16px' }} />
            </IconButton>
          </Tooltip>
        </Box>

        <Box
          sx={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            background: 'linear-gradient(to top, rgba(13, 45, 69, 0.95) 0%, rgba(13, 45, 69, 0.8) 50%, transparent 100%)',
            backdropFilter: 'blur(4px)',
            padding: '40px 12px 12px',
            opacity: isHovered ? 1 : 0,
            transition: 'opacity 0.3s ease',
            zIndex: 2,
          }}
        >
          <Typography
            sx={{
              color: '#FFF',
              fontFamily: theme.typography.fontFamily,
              fontSize: '13px',
              fontWeight: 500,
              lineHeight: '1.4',
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
            }}
          >
            {media.caption}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};
