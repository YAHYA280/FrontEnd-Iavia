'use client';

import React, { RefObject } from 'react';
import { Box, Typography, Button } from '@mui/material';
import { FontAwesomeIcon } from '@/shared/components/fontawesome';
import { ImageSection } from '../image-section';
import { CaptionSection } from '../caption-section';
import { PlatformSelection } from '../platform-selection';
import { useTheme } from '@mui/material';
import { styles } from '../../dialogs/create-post-dialog/create-post-dialog.styles';

interface AutomaticModeEditingProps {
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
  fileInputRef: RefObject<HTMLInputElement>;
  fileInputRefs: React.MutableRefObject<(HTMLInputElement | null)[]>;
  canGoPrevious: boolean;
  canGoNext: boolean;
  caption: string;
  onCaptionChange: (value: string) => void;
  onAutoGenerateCaption: () => void;
  selectedPlatforms: string[];
  onPlatformToggle: (platformId: string) => void;
  onFileSelect: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onRegenerate: () => void;
  onAddImageFromGallery?: (imageUrl: string) => void;
  onReplaceImageFromGallery?: (index: number, imageUrl: string) => void;
}

export const AutomaticModeEditing: React.FC<AutomaticModeEditingProps> = ({
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
  fileInputRef,
  fileInputRefs,
  canGoPrevious,
  canGoNext,
  caption,
  onCaptionChange,
  onAutoGenerateCaption,
  selectedPlatforms,
  onPlatformToggle,
  onFileSelect,
  onRegenerate,
  onAddImageFromGallery,
  onReplaceImageFromGallery,
}) => {
  const theme = useTheme();

  return (
    <>
      <Box sx={{ mb: 3 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1.5 }}>
          <Typography sx={styles.sectionTitle(theme)}>Média</Typography>
          <Button
            onClick={onRegenerate}
            variant="outlined"
            size="small"
            startIcon={<FontAwesomeIcon icon="rotate-right" style={{ fontSize: '12px' }} />}
            sx={styles.outlinedBlueBtn(theme)}
          >
            Régénérer
          </Button>
        </Box>
        <input
          ref={fileInputRef}
          type="file"
          multiple
          accept="image/*,video/*"
          style={{ display: 'none' }}
          onChange={onFileSelect}
        />
        <ImageSection
          imageUrls={imageUrls}
          currentImageIndex={currentImageIndex}
          onImageSelect={onImageSelect}
          onRemoveImage={onRemoveImage}
          onAddImage={onAddImage}
          onPreviousImage={onPreviousImage}
          onNextImage={onNextImage}
          onReplaceImage={onReplaceImage}
          onDragEnd={onDragEnd}
          onDragStart={onDragStart}
          fileInputRefs={fileInputRefs}
          canGoPrevious={canGoPrevious}
          canGoNext={canGoNext}
          onAddImageFromGallery={onAddImageFromGallery}
          onReplaceImageFromGallery={onReplaceImageFromGallery}
        />
      </Box>

      <CaptionSection
        caption={caption}
        onCaptionChange={onCaptionChange}
        onAutoGenerate={onAutoGenerateCaption}
      />

      <PlatformSelection
        selectedPlatforms={selectedPlatforms}
        onPlatformToggle={onPlatformToggle}
      />
    </>
  );
};

