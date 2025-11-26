import React from 'react';
import { Box, Typography, useTheme } from '@mui/material';
import { FontAwesomeIcon } from '@/shared/components/fontawesome';
import { TopPost } from '@/shared/_mock/community-manager-config';

export interface TopPostCardProps {
  post: TopPost;
}

export const TopPostCard: React.FC<TopPostCardProps> = ({ post }) => {
  const theme = useTheme();

  const formatNumber = (num: number): string => {
    if (num >= 1000) {
      return `${(num / 1000).toFixed(1)}k`;
    }
    return num.toString();
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: 'rgb(12, 68, 106)',
        borderRadius: '16px',
        border: '1px solid rgba(6, 158, 255, 0.2)',
        overflow: 'hidden',
        transition: 'all 0.3s ease',
        '&:hover': {
          borderColor: 'rgba(6, 158, 255, 0.4)',
          boxShadow: '0 4px 12px rgba(6, 158, 255, 0.2)',
        },
      }}
    >
      {/* Image */}
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
          src={post.imageUrl}
          alt={post.caption}
          sx={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
          }}
        />
      </Box>

      {/* Content */}
      <Box sx={{ p: 2.5, display: 'flex', flexDirection: 'column', gap: 2 }}>
        <Typography
          sx={{
            color: '#FFF',
            fontFamily: theme.typography.fontFamily,
            fontSize: '15px',
            fontWeight: 600,
            lineHeight: 1.4,
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
          }}
        >
          {post.caption}
        </Typography>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Box
            component="img"
            src={post.platformLogoSrc}
            alt={post.platformName}
            sx={{ width: 20, height: 20, objectFit: 'contain' }}
          />
          <Typography
            sx={{
              color: '#9CA3AF',
              fontFamily: theme.typography.fontFamily,
              fontSize: '13px',
              fontWeight: 500,
            }}
          >
            {post.platformName}
          </Typography>
        </Box>

        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: 'repeat(2, 1fr)',
            gap: 1.5,
            pt: 1,
            borderTop: '1px solid rgba(6, 158, 255, 0.1)',
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Box
              sx={{
                width: 32,
                height: 32,
                backgroundColor: 'rgba(6, 158, 255, 0.1)',
                borderRadius: '8px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <FontAwesomeIcon icon="heart" style={{ fontSize: '14px', color: '#069eff' }} />
            </Box>
            <Box>
              <Typography
                sx={{
                  color: '#FFF',
                  fontFamily: theme.typography.fontTertiaryFamily,
                  fontSize: '14px',
                  fontWeight: 700,
                  lineHeight: 1.2,
                }}
              >
                {formatNumber(post.likes)}
              </Typography>
              <Typography
                sx={{
                  color: '#6B7280',
                  fontFamily: theme.typography.fontFamily,
                  fontSize: '11px',
                  fontWeight: 500,
                  lineHeight: 1.2,
                }}
              >
                Likes
              </Typography>
            </Box>
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Box
              sx={{
                width: 32,
                height: 32,
                backgroundColor: 'rgba(6, 158, 255, 0.1)',
                borderRadius: '8px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <FontAwesomeIcon icon="comment" style={{ fontSize: '14px', color: '#069eff' }} />
            </Box>
            <Box>
              <Typography
                sx={{
                  color: '#FFF',
                  fontFamily: theme.typography.fontTertiaryFamily,
                  fontSize: '14px',
                  fontWeight: 700,
                  lineHeight: 1.2,
                }}
              >
                {formatNumber(post.comments)}
              </Typography>
              <Typography
                sx={{
                  color: '#6B7280',
                  fontFamily: theme.typography.fontFamily,
                  fontSize: '11px',
                  fontWeight: 500,
                  lineHeight: 1.2,
                }}
              >
                Commentaires
              </Typography>
            </Box>
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Box
              sx={{
                width: 32,
                height: 32,
                backgroundColor: 'rgba(6, 158, 255, 0.1)',
                borderRadius: '8px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <FontAwesomeIcon icon="share" style={{ fontSize: '14px', color: '#069eff' }} />
            </Box>
            <Box>
              <Typography
                sx={{
                  color: '#FFF',
                  fontFamily: theme.typography.fontTertiaryFamily,
                  fontSize: '14px',
                  fontWeight: 700,
                  lineHeight: 1.2,
                }}
              >
                {formatNumber(post.shares)}
              </Typography>
              <Typography
                sx={{
                  color: '#6B7280',
                  fontFamily: theme.typography.fontFamily,
                  fontSize: '11px',
                  fontWeight: 500,
                  lineHeight: 1.2,
                }}
              >
                Partages
              </Typography>
            </Box>
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Box
              sx={{
                width: 32,
                height: 32,
                backgroundColor: 'rgba(6, 158, 255, 0.1)',
                borderRadius: '8px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <FontAwesomeIcon icon="chart-simple" style={{ fontSize: '14px', color: '#069eff' }} />
            </Box>
            <Box>
              <Typography
                sx={{
                  color: '#FFF',
                  fontFamily: theme.typography.fontTertiaryFamily,
                  fontSize: '14px',
                  fontWeight: 700,
                  lineHeight: 1.2,
                }}
              >
                {formatNumber(post.reach)}
              </Typography>
              <Typography
                sx={{
                  color: '#6B7280',
                  fontFamily: theme.typography.fontFamily,
                  fontSize: '11px',
                  fontWeight: 500,
                  lineHeight: 1.2,
                }}
              >
                Portée
              </Typography>
            </Box>
          </Box>
        </Box>

        <Box
          sx={{
            backgroundColor: 'rgba(6, 158, 255, 0.1)',
            borderRadius: '10px',
            p: 1.5,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <Typography
            sx={{
              color: '#9CA3AF',
              fontFamily: theme.typography.fontFamily,
              fontSize: '12px',
              fontWeight: 500,
            }}
          >
            Engagement
          </Typography>
          <Typography
            sx={{
              color: '#069eff',
              fontFamily: theme.typography.fontTertiaryFamily,
              fontSize: '16px',
              fontWeight: 700,
            }}
          >
            {post.engagement}%
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};
