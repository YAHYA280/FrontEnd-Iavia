import React, { useState } from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Box,
    Typography,
    Button,
    IconButton,
    useTheme,
    Chip,
    Tooltip,
} from '@mui/material';
import { IdeaResponse, IdeaStatus } from '@/shared/types/community-manager';
import { FontAwesomeIcon } from '@/shared/components/fontawesome';
import ConditionalComponent from '@/shared/components/conditionalComponent';
import { getPlatformInfo } from '@/shared/utils/platform-helpers';

export interface ViewIdeaDialogProps {
    open: boolean;
    idea: IdeaResponse | null;
    onClose: () => void;
    onEdit: (ideaUid: string) => void;
    onDelete: (ideaUid: string) => void;
    onPublish: (ideaUid: string) => void;
}

export const ViewIdeaDialog: React.FC<ViewIdeaDialogProps> = ({
    open,
    idea,
    onClose,
    onEdit,
    onDelete,
    onPublish,
}) => {
    const theme = useTheme();
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    const imagesList = (idea?.images?.length ?? 0) > 0
        ? [...idea!.images!].sort((a, b) => a.displayOrder - b.displayOrder)
        : [];
    const platformInfo = idea ? getPlatformInfo(idea.platformType) : null;
    const hasImages = imagesList.length > 0;

    React.useEffect(() => {
        if (open && idea) {
            setCurrentImageIndex(0);
        }
    }, [open, idea]);

    // Reset image index if it's out of bounds
    React.useEffect(() => {
        if (currentImageIndex >= imagesList.length && imagesList.length > 0) {
            setCurrentImageIndex(0);
        }
    }, [imagesList.length, currentImageIndex]);

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

    if (!idea || !platformInfo) return null;

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
            <DialogTitle
                sx={{
                    color: '#FFF',
                    fontFamily: theme.typography.fontFamily,
                    fontSize: '24px',
                    fontWeight: 700,
                    pb: 1,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                }}
            >
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <Typography
                        sx={{
                            color: '#FFF',
                            fontFamily: theme.typography.fontFamily,
                            fontSize: '24px',
                            fontWeight: 700,
                        }}
                    >
                        Détails du post
                    </Typography>
                    <Chip
                        label={idea.status === IdeaStatus.PUBLISHED ? 'Publié' : 'Brouillon'}
                        sx={{
                            backgroundColor:
                                idea.status === IdeaStatus.PUBLISHED
                                    ? 'rgba(16, 185, 129, 0.2)'
                                    : 'rgba(6, 158, 255, 0.2)',
                            color: idea.status === IdeaStatus.PUBLISHED ? '#10B981' : '#069EFF',
                            fontFamily: theme.typography.fontFamily,
                            fontSize: '12px',
                            fontWeight: 600,
                            height: '24px',
                        }}
                    />
                </Box>
                <IconButton
                    onClick={onClose}
                    sx={{
                        color: '#9CA3AF',
                        '&:hover': {
                            backgroundColor: 'rgba(6, 158, 255, 0.1)',
                            color: '#069EFF',
                        },
                    }}
                >
                    <FontAwesomeIcon icon="times" style={{ fontSize: '20px' }} />
                </IconButton>
            </DialogTitle>

            <DialogContent sx={{ pb: 2 }}>
                {/* Platform info */}
                <Box
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 1.5,
                        mb: 3,
                        p: 2,
                        borderRadius: '12px',
                        background: 'rgba(6, 158, 255, 0.05)',
                        border: '1px solid rgba(6, 158, 255, 0.2)',
                    }}
                >
                    <Box
                        component="img"
                        src={platformInfo.logoSrc}
                        alt={platformInfo.name}
                        sx={{ width: 32, height: 32, objectFit: 'contain' }}
                    />
                    <Box>
                        <Typography
                            sx={{
                                color: '#EDEDED',
                                fontFamily: theme.typography.fontFamily,
                                fontSize: '16px',
                                fontWeight: 600,
                            }}
                        >
                            {platformInfo.name}
                        </Typography>
                        <Typography
                            sx={{
                                color: '#9CA3AF',
                                fontFamily: theme.typography.fontFamily,
                                fontSize: '12px',
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
                    </Box>
                </Box>

                {/* Images */}
                <ConditionalComponent isValid={hasImages}>
                    <Box sx={{ mb: 3 }}>
                        <Typography
                            sx={{
                                color: '#EDEDED',
                                fontFamily: theme.typography.fontFamily,
                                fontSize: '14px',
                                fontWeight: 600,
                                mb: 1.5,
                            }}
                        >
                            <ConditionalComponent isValid={imagesList.length > 1}>
                                Images
                            </ConditionalComponent>
                            <ConditionalComponent isValid={imagesList.length <= 1}>
                                Image
                            </ConditionalComponent>
                        </Typography>
                        <Box
                            sx={{
                                position: 'relative',
                                width: '100%',
                                aspectRatio: '16/9',
                                borderRadius: '12px',
                                overflow: 'hidden',
                                border: '1px solid rgba(6, 158, 255, 0.3)',
                                backgroundColor: '#1A1D25',
                            }}
                        >
                            <ConditionalComponent isValid={hasImages && !!imagesList[currentImageIndex]}>
                                <Box
                                    component="img"
                                    src={imagesList[currentImageIndex].imageUrl}
                                    alt={`Image ${currentImageIndex + 1}`}
                                    sx={{
                                        width: '100%',
                                        height: '100%',
                                        objectFit: 'cover',
                                    }}
                                />
                            </ConditionalComponent>

                            <Tooltip title="Télécharger l'image" arrow>
                                <IconButton
                                    onClick={async (e) => {
                                        e.stopPropagation();
                                        const imageUrl = imagesList[currentImageIndex].imageUrl;

                                        try {
                                            const response = await fetch(imageUrl);
                                            const blob = await response.blob();
                                            const url = window.URL.createObjectURL(blob);

                                            const link = document.createElement('a');
                                            link.href = url;
                                            link.download = `image-${currentImageIndex + 1}.jpg`;
                                            document.body.appendChild(link);
                                            link.click();
                                            document.body.removeChild(link);
                                            window.URL.revokeObjectURL(url);
                                        } catch (error) {
                                            window.open(imageUrl, '_blank');
                                        }
                                    }}
                                    sx={{
                                        position: 'absolute',
                                        top: 12,
                                        right: 12,
                                        width: '36px',
                                        height: '36px',
                                        backgroundColor: 'rgba(13, 45, 69, 0.9)',
                                        backdropFilter: 'blur(4px)',
                                        color: '#FFF',
                                        border: '1px solid rgba(6, 158, 255, 0.3)',
                                        zIndex: 2,
                                        '&:hover': {
                                            backgroundColor: 'rgba(13, 45, 69, 1)',
                                            borderColor: 'rgba(6, 158, 255, 0.5)',
                                        },
                                    }}
                                >
                                    <FontAwesomeIcon icon="download" style={{ fontSize: '16px' }} />
                                </IconButton>
                            </Tooltip>

                            <ConditionalComponent isValid={imagesList.length > 1}>
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
                                            backgroundColor: canGoPrevious
                                                ? 'rgba(13, 45, 69, 0.9)'
                                                : 'rgba(13, 45, 69, 0.3)',
                                            backdropFilter: 'blur(4px)',
                                            color: canGoPrevious ? '#FFF' : 'rgba(255, 255, 255, 0.3)',
                                            border: '1px solid rgba(6, 158, 255, 0.3)',
                                            zIndex: 2,
                                            cursor: canGoPrevious ? 'pointer' : 'not-allowed',
                                            '&:hover': {
                                                backgroundColor: canGoPrevious
                                                    ? 'rgba(13, 45, 69, 1)'
                                                    : 'rgba(13, 45, 69, 0.3)',
                                                borderColor: canGoPrevious
                                                    ? 'rgba(6, 158, 255, 0.5)'
                                                    : 'rgba(6, 158, 255, 0.3)',
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
                                            backgroundColor: canGoNext
                                                ? 'rgba(13, 45, 69, 0.9)'
                                                : 'rgba(13, 45, 69, 0.3)',
                                            backdropFilter: 'blur(4px)',
                                            color: canGoNext ? '#FFF' : 'rgba(255, 255, 255, 0.3)',
                                            border: '1px solid rgba(6, 158, 255, 0.3)',
                                            zIndex: 2,
                                            cursor: canGoNext ? 'pointer' : 'not-allowed',
                                            '&:hover': {
                                                backgroundColor: canGoNext
                                                    ? 'rgba(13, 45, 69, 1)'
                                                    : 'rgba(13, 45, 69, 0.3)',
                                                borderColor: canGoNext
                                                    ? 'rgba(6, 158, 255, 0.5)'
                                                    : 'rgba(6, 158, 255, 0.3)',
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
                    </Box>
                </ConditionalComponent>

                <Box>
                    <Typography
                        sx={{
                            color: '#EDEDED',
                            fontFamily: theme.typography.fontFamily,
                            fontSize: '14px',
                            fontWeight: 600,
                            mb: 1.5,
                        }}
                    >
                        Légende
                    </Typography>
                    <Box
                        sx={{
                            p: 2.5,
                            borderRadius: '12px',
                            background: '#1A1D25',
                            border: '1px solid rgba(6, 158, 255, 0.2)',
                        }}
                    >
                        <Typography
                            sx={{
                                color: '#FFF',
                                fontFamily: theme.typography.fontFamily,
                                fontSize: '14px',
                                lineHeight: '1.6',
                                whiteSpace: 'pre-wrap',
                            }}
                        >
                            {idea.caption}
                        </Typography>
                        <Typography
                            sx={{
                                color: '#9CA3AF',
                                fontFamily: theme.typography.fontFamily,
                                fontSize: '12px',
                                mt: 2,
                            }}
                        >
                            {idea.caption.length} caractères
                        </Typography>
                    </Box>
                </Box>
            </DialogContent>

            <DialogActions
                sx={{
                    p: 3,
                    gap: 2,
                    borderTop: '1px solid rgba(6, 158, 255, 0.1)',
                    flexDirection: 'column',
                    alignItems: 'stretch',
                }}
            >
                <Button
                    onClick={() => {
                        onPublish(idea.uid);
                        onClose();
                    }}
                    variant="contained"
                    startIcon={<FontAwesomeIcon icon="paper-plane" style={{ fontSize: '14px' }} />}
                    sx={{
                        height: '44px',
                        borderRadius: '12px',
                        background: '#069EFF',
                        color: '#FFF',
                        fontFamily: theme.typography.fontFamily,
                        fontSize: '14px',
                        fontWeight: 600,
                        textTransform: 'none',
                        boxShadow: '0 4px 12px rgba(6, 158, 255, 0.3)',
                        '&:hover': {
                            background: '#0588d6',
                            boxShadow: '0 6px 16px rgba(6, 158, 255, 0.4)',
                        },
                    }}
                >
                    Publier le post
                </Button>

                <Box sx={{ display: 'flex', gap: 1, width: '100%' }}>
                    <Button
                        onClick={() => {
                            onEdit(idea.uid);
                            onClose();
                        }}
                        variant="outlined"
                        startIcon={<FontAwesomeIcon icon="edit" style={{ fontSize: '14px' }} />}
                        sx={{
                            flex: 1,
                            height: '40px',
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
                    <Button
                        onClick={() => {
                            onDelete(idea.uid);
                            onClose();
                        }}
                        variant="outlined"
                        startIcon={<FontAwesomeIcon icon="trash" style={{ fontSize: '14px' }} />}
                        sx={{
                            flex: 1,
                            height: '40px',
                            borderRadius: '12px',
                            border: '1px solid rgba(224, 67, 67, 0.5)',
                            backgroundColor: 'transparent',
                            color: '#E04343',
                            fontFamily: theme.typography.fontFamily,
                            fontSize: '14px',
                            fontWeight: 600,
                            textTransform: 'none',
                            '&:hover': {
                                backgroundColor: 'rgba(224, 67, 67, 0.1)',
                                borderColor: '#E04343',
                            },
                        }}
                    >
                        Supprimer
                    </Button>
                </Box>
            </DialogActions>
        </Dialog>
    );
};