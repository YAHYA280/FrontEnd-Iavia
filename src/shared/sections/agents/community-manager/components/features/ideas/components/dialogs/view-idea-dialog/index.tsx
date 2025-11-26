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
import { Idea } from '@/shared/_mock/community-manager-config';
import { FontAwesomeIcon } from '@/shared/components/fontawesome';
import ConditionalComponent from '@/shared/components/conditionalComponent';
import { styles } from './view-idea-dialog.styles';

export interface ViewIdeaDialogProps {
    open: boolean;
    idea: Idea | null;
    onClose: () => void;
    onEdit: (ideaId: string) => void;
    onDelete: (ideaId: string) => void;
    onPublish: (ideaId: string) => void;
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

    React.useEffect(() => {
        if (open && idea) {
            setCurrentImageIndex(0);
        }
    }, [open, idea]);

    const handlePreviousImage = (e: React.MouseEvent) => {
        e.stopPropagation();
        if (currentImageIndex > 0) {
            setCurrentImageIndex((prev) => prev - 1);
        }
    };

    const handleNextImage = (e: React.MouseEvent) => {
        e.stopPropagation();
        if (currentImageIndex < (idea?.imageUrls.length || 0) - 1) {
            setCurrentImageIndex((prev) => prev + 1);
        }
    };

    const canGoPrevious = currentImageIndex > 0;
    const canGoNext = idea && currentImageIndex < idea.imageUrls.length - 1;

    if (!idea) return null;

    return (
        <Dialog
            open={open}
            onClose={onClose}
            maxWidth="md"
            fullWidth
            PaperProps={{
                sx: styles.dialogPaper,
            }}
            sx={{
                '& .MuiBackdrop-root': styles.backdrop,
            }}
        >
            <DialogTitle sx={styles.dialogTitle(theme)}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <Typography sx={styles.dialogTitleText(theme)}>
                        Détails du post
                    </Typography>
                    <Chip
                        label={idea.status === 'published' ? 'Publié' : 'Brouillon'}
                        sx={styles.statusChip(theme, idea.status === 'published')}
                    />
                </Box>
                <IconButton
                    onClick={onClose}
                    sx={styles.closeButton}
                >
                    <FontAwesomeIcon icon="times" style={{ fontSize: '20px' }} />
                </IconButton>
            </DialogTitle>

            <DialogContent sx={{ pb: 2 }}>
                {/* Platform info */}
                <Box sx={styles.platformInfo}>
                    <Box
                        component="img"
                        src={idea.platformLogoSrc}
                        alt={idea.platformName}
                        sx={{ width: 32, height: 32, objectFit: 'contain' }}
                    />
                    <Box>
                        <Typography sx={styles.platformName(theme)}>
                            {idea.platformName}
                        </Typography>
                        <Typography sx={styles.platformDate(theme)}>
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
                <ConditionalComponent isValid={idea.imageUrls.length > 0}>
                    <Box sx={{ mb: 3 }}>
                        <Typography sx={styles.imagesTitle(theme)}>
                            {idea.imageUrls.length > 1 ? 'Images' : 'Image'}
                        </Typography>
                        <Box sx={styles.imageContainer}>
                            <Box
                                component="img"
                                src={idea.imageUrls[currentImageIndex]}
                                alt={`Image ${currentImageIndex + 1}`}
                                sx={styles.image}
                            />

                            <Tooltip title="Télécharger l'image" arrow>
                                <IconButton
                                    onClick={async (e) => {
                                        e.stopPropagation();
                                        const imageUrl = idea.imageUrls[currentImageIndex];

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
                                    sx={styles.downloadButton}
                                >
                                    <FontAwesomeIcon icon="download" style={{ fontSize: '16px' }} />
                                </IconButton>
                            </Tooltip>

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
                                            ...styles.navButton(!!canGoNext),
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
                    </Box>
                </ConditionalComponent>

                <Box>
                    <Typography sx={styles.captionTitle(theme)}>
                        Légende
                    </Typography>
                    <Box sx={styles.captionContainer}>
                        <Typography sx={styles.captionText(theme)}>
                            {idea.caption}
                        </Typography>
                        <Typography sx={styles.captionLength(theme)}>
                            {idea.caption.length} caractères
                        </Typography>
                    </Box>
                </Box>
            </DialogContent>

            <DialogActions sx={styles.dialogActions}>
                <Button
                    onClick={() => {
                        onPublish(idea.id);
                        onClose();
                    }}
                    variant="contained"
                    startIcon={<FontAwesomeIcon icon="paper-plane" style={{ fontSize: '14px' }} />}
                    sx={styles.publishButton(theme)}
                >
                    Publier le post
                </Button>

                <Box sx={styles.actionsRow}>
                    <Button
                        onClick={() => {
                            onEdit(idea.id);
                            onClose();
                        }}
                        variant="outlined"
                        startIcon={<FontAwesomeIcon icon="edit" style={{ fontSize: '14px' }} />}
                        sx={styles.editButton(theme)}
                    >
                        Modifier
                    </Button>
                    <Button
                        onClick={() => {
                            onDelete(idea.id);
                            onClose();
                        }}
                        variant="outlined"
                        startIcon={<FontAwesomeIcon icon="trash" style={{ fontSize: '14px' }} />}
                        sx={styles.deleteButton(theme)}
                    >
                        Supprimer
                    </Button>
                </Box>
            </DialogActions>
        </Dialog>
    );
};
