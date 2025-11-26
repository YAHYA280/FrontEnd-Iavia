'use client';

import React from 'react';
import {
  Drawer,
  Box,
  Typography,
  IconButton,
  useTheme,
} from '@mui/material';
import { FontAwesomeIcon } from '@/shared/components/fontawesome';
import { ScheduledPost } from '@/shared/types/calendar';
import { defaultPlatforms } from '@/shared/_mock/community-manager-config';
import ConditionalComponent from '@/shared/components/conditionalComponent';
import { styles } from './drafts-drawer.styles';

interface DraftsDrawerProps {
  open: boolean;
  onClose: () => void;
  drafts: ScheduledPost[];
  onEditDraft: (postId: string) => void;
}

export const DraftsDrawer: React.FC<DraftsDrawerProps> = ({
  open,
  onClose,
  drafts,
  onEditDraft,
}) => {
  const theme = useTheme();

  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={onClose}
      slotProps={{ backdrop: { invisible: true } }}
      sx={styles.drawer(theme)}
    >
      <Box sx={styles.container}>
        <Box sx={styles.header}>
          <Typography sx={styles.title(theme)}>
            Brouillons ({drafts.length})
          </Typography>
          <IconButton onClick={onClose} sx={styles.closeButton(theme)}>
            <FontAwesomeIcon icon="xmark" style={{ fontSize: '18px' }} />
          </IconButton>
        </Box>

        <Box sx={styles.content}>
          <ConditionalComponent isValid={drafts.length === 0}>
            <Box sx={styles.emptyState}>
              <FontAwesomeIcon
                icon="file-lines"
                style={{ fontSize: '48px', color: '#6B7280', marginBottom: '16px' }}
              />
              <Typography sx={styles.emptyText(theme)}>
                Aucun brouillon
              </Typography>
            </Box>
          </ConditionalComponent>

          <ConditionalComponent isValid={drafts.length > 0}>
            <Box sx={styles.draftsList}>
              {drafts.map((post) => {
                const platforms = post.platformIds
                  .map((id) => defaultPlatforms.find((p) => p.id === id))
                  .filter(Boolean);

                return (
                  <Box
                    key={post.id}
                    onClick={() => {
                      onEditDraft(post.id);
                      onClose();
                    }}
                    sx={styles.draftItem}
                  >
                    <ConditionalComponent isValid={platforms.length > 0}>
                      <Box sx={styles.platformsContainer}>
                        {platforms.map((platform, index) => (
                          <ConditionalComponent
                            key={`${platform?.id}-${index}`}
                            isValid={!!platform}
                          >
                            <Box
                              component="img"
                              src={platform?.logoSrc}
                              alt={platform?.name}
                              sx={styles.platformLogo}
                            />
                          </ConditionalComponent>
                        ))}
                      </Box>
                    </ConditionalComponent>

                    <Box sx={styles.draftContent}>
                      <Typography sx={styles.draftTitle(theme)}>
                        {post.caption && post.caption.length > 0
                          ? post.caption.length > 60
                            ? `${post.caption.substring(0, 60)}...`
                            : post.caption
                          : post.title || 'Brouillon sans titre'}
                      </Typography>
                      <ConditionalComponent
                        isValid={!!(post.caption && post.caption.length > 60)}
                      >
                        <Typography sx={styles.draftCaptionLength(theme)}>
                          {post.caption.length} caractères
                        </Typography>
                      </ConditionalComponent>
                    </Box>
                  </Box>
                );
              })}
            </Box>
          </ConditionalComponent>
        </Box>
      </Box>
    </Drawer>
  );
};

