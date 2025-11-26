'use client';

import React from 'react';
import { Box, Button, IconButton, Tooltip, CircularProgress, useTheme } from '@mui/material';
import { FontAwesomeIcon } from '@/shared/components/fontawesome';
import { PostStatus } from '@/shared/types/calendar';
import { styles } from './create-post-dialog.styles';

type PostMode = 'manual' | 'automatic';

interface DialogActionsSectionProps {
  currentPostId?: string;
  currentPostStatus?: PostStatus;
  mode: PostMode;
  autoStep: 'generation' | 'editing';
  isGeneratingAutoContent: boolean;
  onClose: () => void;
  onDelete?: () => void;
  onGenerateAutomaticPreview?: () => void;
  onSubmit: (options: { saveAsDraft?: boolean; forceStatus?: PostStatus }) => void;
}

export const DialogActionsSection: React.FC<DialogActionsSectionProps> = ({
  currentPostId,
  currentPostStatus,
  mode,
  autoStep,
  isGeneratingAutoContent,
  onClose,
  onDelete,
  onGenerateAutomaticPreview,
  onSubmit,
}) => {
  const theme = useTheme();

  return (
    <Box sx={{ display: 'flex', gap: 1.5, alignItems: 'center' }}>
      <Button onClick={onClose} variant="outlined" sx={styles.cancelButton(theme)}>
        Annuler
      </Button>
      {currentPostId ? (
        currentPostStatus === 'draft' ? (
          <>
            <Button
              onClick={() => onSubmit({ forceStatus: 'draft' })}
              variant="outlined"
              sx={styles.draftButton(theme)}
              startIcon={<FontAwesomeIcon icon="floppy-disk" style={{ fontSize: '14px' }} />}
            >
              Enregistrer les modifications
            </Button>
            <Button
              onClick={() => onSubmit({ forceStatus: 'scheduled' })}
              variant="contained"
              sx={styles.actionsPrimaryBtn(theme)}
              startIcon={<FontAwesomeIcon icon="calendar" style={{ fontSize: '14px' }} />}
            >
              Planifier
            </Button>
          </>
        ) : (
          <Button
            onClick={() => onSubmit({})}
            variant="contained"
            sx={styles.actionsPrimaryBtn(theme)}
            startIcon={<FontAwesomeIcon icon="check" style={{ fontSize: '14px' }} />}
          >
            Enregistrer les modifications
          </Button>
        )
      ) : (
        mode === 'automatic' && autoStep === 'generation' ? (
          <Button
            onClick={onGenerateAutomaticPreview}
            variant="contained"
            sx={styles.actionsPrimaryBtn(theme)}
            disabled={isGeneratingAutoContent}
            startIcon={
              isGeneratingAutoContent ? undefined : (
                <FontAwesomeIcon icon="wand-magic-sparkles" style={{ fontSize: '14px' }} />
              )
            }
          >
            {isGeneratingAutoContent ? (
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <CircularProgress size={16} sx={{ color: '#FFFFFF' }} />
                Génération...
              </Box>
            ) : (
              'Générer par l\'IA'
            )}
          </Button>
        ) : (
          <>
            <Button
              onClick={() => onSubmit({ saveAsDraft: true })}
              variant="outlined"
              sx={styles.draftButton(theme)}
              startIcon={<FontAwesomeIcon icon="floppy-disk" style={{ fontSize: '14px' }} />}
            >
              Enregistrer comme brouillon
            </Button>
            <Button
              onClick={() => onSubmit({ saveAsDraft: false })}
              variant="contained"
              sx={styles.actionsPrimaryBtn(theme)}
              startIcon={<FontAwesomeIcon icon="calendar" style={{ fontSize: '14px' }} />}
            >
              Planifier la publication
            </Button>
          </>
        )
      )}
    </Box>
  );
};

