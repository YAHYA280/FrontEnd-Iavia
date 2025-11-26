'use client';

import React, { RefObject } from 'react';
import { Box, Typography } from '@mui/material';
import { ImageSection } from '../image-section';
import { CaptionSection } from '../caption-section';
import { PlatformSelection } from '../platform-selection';
import { useTheme } from '@mui/material';
import { styles } from '../../dialogs/create-post-dialog/create-post-dialog.styles';

interface ManualModeFormProps {
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
  onAddImageFromGallery?: (imageUrl: string) => void;
  onReplaceImageFromGallery?: (index: number, imageUrl: string) => void;
}

export const ManualModeForm: React.FC<ManualModeFormProps> = ({
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
  onAddImageFromGallery,
  onReplaceImageFromGallery,
}) => {
  const theme = useTheme();

  return (
    <>
      <Box sx={{ mb: 3 }}>
        <Typography sx={styles.sectionTitle(theme)}>Média</Typography>
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

