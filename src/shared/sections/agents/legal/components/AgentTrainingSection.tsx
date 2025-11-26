import {
  Box,
  Typography,
  TextField,
  Button,
  Card,
  CardContent,
  Chip,
  IconButton,
  useTheme,
  useMediaQuery,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
  Input,
  CircularProgress,
  LinearProgress,
  Alert,
  Snackbar
} from '@mui/material';
import {
  Upload,
  Description,
  MoreVert,
  Visibility,
  Edit,
  Delete,
  Folder,
  Search,
  Download,
  Add,
  Close,
  Block
} from '@mui/icons-material';
import { useState, useRef, useEffect } from 'react';
import { useKnowledgeBaseStore } from '@/shared/api/stores/agent-legal-service/knowledge-base-store';
import { useBlockedKeywordsStore } from '@/shared/api/stores/agent-legal-service/blocked-keywords-store';
import type { FileMetadataDTO } from '@/shared/types/knowledge-base';

export const AgentTrainingSection: React.FC = () => {
  const theme = useTheme();

  // Zustand stores
  const {
    files,
    loading,
    uploadProgress,
    error,
    fetchFilesByAgent,
    uploadAgentFiles,
    renameFile,
    deleteFile,
    downloadFile,
    searchFiles,
    clearError,
    knowledgeBaseText,
    textCharacterCount,
    textLoading,
    fetchKnowledgeBaseText,
    updateKnowledgeBaseText,
  } = useKnowledgeBaseStore();

  const {
    blockedKeywords,
    totalCount: keywordsCount,
    loading: keywordsLoading,
    error: keywordsError,
    fetchBlockedKeywords,
    addKeywords,
    removeKeywords,
    clearAllKeywords,
    clearError: clearKeywordsError,
  } = useBlockedKeywordsStore();

  // Local state
  const [localKnowledgeText, setLocalKnowledgeText] = useState('');
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedFile, setSelectedFile] = useState<FileMetadataDTO | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState<'success' | 'error'>('success');
  const [keywordInput, setKeywordInput] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);


  const userUid = 'user_123'; 
  const adminUid = 'admin_uid_123'; 
  const agentUid ='24c8a5a5-e75f-4857-be8f-0b80ec8e7a1c';

  // Fetch files, knowledge base text, and blocked keywords on mount
  useEffect(() => {
    fetchFilesByAgent({
      adminUid,
      agentUid,
      userUid,
    }).catch((err) => {
      showSnackbar('Erreur lors du chargement des fichiers', 'error');
    });

    fetchKnowledgeBaseText(agentUid).catch((err) => {
      console.warn('No knowledge base text found for agent');
    });

    fetchBlockedKeywords(agentUid).catch((err) => {
      console.warn('No blocked keywords found for agent');
    });
  }, [fetchFilesByAgent, fetchKnowledgeBaseText, fetchBlockedKeywords]);

  // Sync local text with store text
  useEffect(() => {
    setLocalKnowledgeText(knowledgeBaseText);
  }, [knowledgeBaseText]);

  // Show error from store
  useEffect(() => {
    if (error) {
      showSnackbar(error, 'error');
      clearError();
    }
  }, [error, clearError]);

  const sectionTheme = {
      primary: {
        main: '#8D31FB',
        light: '#BE30FF',
        dark: '#4C2086',
      },
      background: {
        card: '#4C2086',
        section: '#1A1D25',
        search: '#1A1D25',
      },
      text: {
        primary: '#FFF',
        secondary: '#9CA3AF',
        disabled: 'rgba(255, 255, 255, 0.5)',
      },
      border: {
        primary: 'rgba(141, 49, 251, 0.3)',
        secondary: 'rgba(141, 49, 251, 0.5)',
        gradient: 'linear-gradient(180deg, #BE30FF 0.66%, #5D31F8 51.44%, #00A3FF 100%)',
      },
      state: {
        hover: 'rgba(190, 48, 255, 0.1)',
        selected: 'rgba(141, 49, 251, 0.2)',
        disabled: 'rgba(141, 49, 251, 0.7)',
      },
      ...theme,
    };

  // Helper function to show snackbar notifications
  const showSnackbar = (message: string, severity: 'success' | 'error') => {
    setSnackbarMessage(message);
    setSnackbarSeverity(severity);
    setSnackbarOpen(true);
  };

  // Helper function to format file size
  const formatFileSize = (bytes: number): string => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  // Helper function to get file type
  const getFileType = (file: FileMetadataDTO): string => {
    // Backend already provides fileType field
    return file.fileType || 'FILE';
  };

  // Filter files based on search query
  const filteredFiles = files.filter(file =>
    file.displayName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    getFileType(file).toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleFileUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileSelect = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = event.target.files;
    if (selectedFiles && selectedFiles.length > 0) {
      try {
        const filesArray = Array.from(selectedFiles);

        const result = await uploadAgentFiles({
          files: filesArray,
          adminUid,
          agentUid,
          uploadedBy: userUid,
        });

        // Show success notification
        showSnackbar(
          `${result.successCount} fichier(s) téléversé(s) avec succès`,
          'success'
        );

        // Show failure notification if any files failed
        if (result.failureCount > 0) {
          console.warn('Failed files:', result.failedFiles);
          showSnackbar(
            `${result.failureCount} fichier(s) ont échoué`,
            'error'
          );
        }

        // Refetch the file list to ensure we have the latest data
        await fetchFilesByAgent({
          adminUid,
          agentUid,
          userUid,
        });

      } catch (error: any) {
        console.error('Upload error in component:', error);
        showSnackbar(
          `Erreur lors du téléversement: ${error.message || 'Erreur inconnue'}`,
          'error'
        );
      } finally {
        event.target.value = '';
      }
    }
  };

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>, file: FileMetadataDTO) => {
    setAnchorEl(event.currentTarget);
    setSelectedFile(file);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedFile(null);
  };

  const handleViewFile = async () => {
    if (selectedFile) {
      try {
        const blob = await downloadFile({
          fileUid: selectedFile.uid,
          userUid,
        });

        // Create download link and trigger download
        const url = window.URL.createObjectURL(blob);
        window.open(url, '_blank');
        window.URL.revokeObjectURL(url);

        showSnackbar('Fichier ouvert avec succès', 'success');
      } catch (error: any) {
        showSnackbar(`Erreur lors de l'ouverture: ${error.message}`, 'error');
      }
    }
    handleMenuClose();
  };

  const handleDownloadFile = async () => {
    if (selectedFile) {
      try {
        const blob = await downloadFile({
          fileUid: selectedFile.uid,
          userUid,
        });

        // Create download link
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = selectedFile.displayName;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        window.URL.revokeObjectURL(url);

        showSnackbar('Fichier téléchargé avec succès', 'success');
      } catch (error: any) {
        showSnackbar(`Erreur lors du téléchargement: ${error.message}`, 'error');
      }
    }
    handleMenuClose();
  };

  const handleRenameFile = async () => {
    if (selectedFile) {
      const newName = prompt('Nouveau nom du fichier:', selectedFile.displayName);
      if (newName && newName.trim() !== '' && newName !== selectedFile.displayName) {
        try {
          await renameFile({
            fileUid: selectedFile.uid,
            newDisplayName: newName.trim(),
            userUid,
          });
          showSnackbar('Fichier renommé avec succès', 'success');
        } catch (error: any) {
          showSnackbar(`Erreur lors du renommage: ${error.message}`, 'error');
        }
      }
    }
    handleMenuClose();
  };

  const handleDeleteFile = async () => {
    if (selectedFile) {
      if (confirm(`Êtes-vous sûr de vouloir supprimer "${selectedFile.displayName}" ?`)) {
        try {
          await deleteFile({
            fileUid: selectedFile.uid,
            userUid,
          });
          showSnackbar('Fichier supprimé avec succès', 'success');
        } catch (error: any) {
          showSnackbar(`Erreur lors de la suppression: ${error.message}`, 'error');
        }
      }
    }
    handleMenuClose();
  };

  const handleAddToKnowledge = async () => {
    if (localKnowledgeText.trim()) {
      try {
        const result = await updateKnowledgeBaseText({
          agentUid,
          text: localKnowledgeText.trim(),
        });
        showSnackbar(
          `Texte sauvegardé avec succès (${result.characterCount} caractères)`,
          'success'
        );
      } catch (error: any) {
        showSnackbar(
          `Erreur lors de la sauvegarde: ${error.message || 'Erreur inconnue'}`,
          'error'
        );
      }
    } else {
      showSnackbar('Veuillez ajouter du texte ou des documents avant de continuer.', 'error');
    }
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  // ========== BLOCKED KEYWORDS HANDLERS ==========

  const handleAddKeyword = async () => {
    if (!keywordInput.trim()) {
      showSnackbar('Veuillez entrer un mot-clé', 'error');
      return;
    }

    // Split by comma and trim each keyword
    const newKeywords = keywordInput
      .split(',')
      .map(k => k.trim())
      .filter(k => k.length > 0);

    if (newKeywords.length === 0) {
      showSnackbar('Veuillez entrer des mots-clés valides', 'error');
      return;
    }

    try {
      const result = await addKeywords({
        agentUid,
        keywords: newKeywords,
      });
      showSnackbar(
        `${newKeywords.length} mot(s)-clé(s) ajouté(s) avec succès`,
        'success'
      );
      setKeywordInput('');
    } catch (error: any) {
      showSnackbar(
        `Erreur lors de l'ajout: ${error.message || 'Erreur inconnue'}`,
        'error'
      );
    }
  };

  const handleRemoveKeyword = async (keyword: string) => {
    try {
      await removeKeywords({
        agentUid,
        keywords: [keyword],
      });
      showSnackbar('Mot-clé supprimé avec succès', 'success');
    } catch (error: any) {
      showSnackbar(
        `Erreur lors de la suppression: ${error.message || 'Erreur inconnue'}`,
        'error'
      );
    }
  };

  const handleClearAllKeywords = async () => {
    if (confirm('Êtes-vous sûr de vouloir supprimer tous les mots-clés bloqués ?')) {
      try {
        await clearAllKeywords(agentUid);
        showSnackbar('Tous les mots-clés ont été supprimés', 'success');
      } catch (error: any) {
        showSnackbar(
          `Erreur lors de la suppression: ${error.message || 'Erreur inconnue'}`,
          'error'
        );
      }
    }
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
      {/* Snackbar for notifications */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={() => setSnackbarOpen(false)}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <Alert
          onClose={() => setSnackbarOpen(false)}
          severity={snackbarSeverity}
          sx={{ width: '100%' }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>

      {/* Upload progress indicator */}
      {loading && uploadProgress > 0 && (
        <Box sx={{ width: '100%', mb: 2 }}>
          <LinearProgress
            variant="determinate"
            value={uploadProgress}
            sx={{
              height: 8,
              borderRadius: 4,
              backgroundColor: 'rgba(49, 30, 125, 0.2)',
              '& .MuiLinearProgress-bar': {
                backgroundColor: '#8D31FB',
              },
            }}
          />
          <Typography
            sx={{
              color: '#9CA3AF',
              fontSize: '12px',
              mt: 1,
              textAlign: 'center',
            }}
          >
            Téléversement en cours... {uploadProgress}%
          </Typography>
        </Box>
      )}

      <Input
        inputRef={fileInputRef}
        type="file"
        inputProps={{
          multiple: true,
          accept: '.pdf,.doc,.docx,.txt,.xlsx,.xls,.ppt,.pptx'
        }}
        onChange={handleFileSelect}
        sx={{ display: 'none' }}
        disabled={loading}
      />

      <Card
        sx={{
          background: 'rgba(55, 32, 142, 1)', 
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(49, 30, 125, 0.2)', 
          borderRadius: '24px',
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.3)',
          overflow: 'hidden'
        }}
      >
        <CardContent sx={{ p: { xs: 3, sm: 4 } }}>
          <Typography
            variant="h6"
            sx={{
              color: '#FFF',
              fontFamily: 'Inter',
              fontSize: '24px',
              fontWeight: 600,
              mb: 1,
            }}
          >
            Former l&lsquo;agent
          </Typography>
          <Typography
            variant="body1"
            sx={{
              maxWidth: '1038px',
              color: '#9CA3AF',
              fontFamily: 'Inter',
              fontSize: '18px',
              fontStyle: 'normal',
              fontWeight: 500,
              lineHeight: '121.331%',
              mb: 4,
            }}
          >
            Ajoutez des documents ou du texte pour lui transmettre des connaissances spécifiques.
          </Typography>

          <Box sx={{ mb: 4 }}>
            <TextField
              multiline
              rows={6}
              fullWidth
              value={localKnowledgeText}
              onChange={(e) => setLocalKnowledgeText(e.target.value)}
              placeholder="Collez ou saisissez vos informations ici : produits, politiques, FAQ ou autres contenus accessibles à votre agent..."
              disabled={textLoading}
              sx={{
              '& .MuiOutlinedInput-root': {
                color: '#FFF',
                fontFamily: theme.typography.fontFamily,
                fontSize: '14px',
                background: '#1A1D25',
                borderRadius: '24px',
                border: '2px solid transparent',
                backgroundImage:
                  'linear-gradient(#1A1D25, #1A1D25), linear-gradient(180deg, #BE30FF 0.66%, #5D31F8 51.44%, #00A3FF 100%)',
                backgroundOrigin: 'border-box',
                backgroundClip: 'padding-box, border-box',
                boxShadow:
                  '0 0 2px 0 rgba(0, 0, 0, 0.28), 0 16px 64px 0 rgba(0, 0, 0, 0.16)',
                '& fieldset': { border: 'none' },
                '&:hover fieldset': { border: 'none' },
                '&.Mui-focused fieldset': { border: 'none' },
              },
              '& .MuiInputBase-input::placeholder': {
                color: 'rgba(255, 255, 255, 0.5)',
                opacity: 1,
              },
            }}
            />
            {localKnowledgeText && (
              <Typography
                sx={{
                  color: '#9CA3AF',
                  fontSize: '12px',
                  mt: 1,
                  textAlign: 'right',
                }}
              >
                {localKnowledgeText.length} caractères
              </Typography>
            )}
          </Box>

          <Card
            sx={{
              background: 'rgba(111, 78, 255, 0.2)', 
              border: '1px solid rgba(49, 30, 125, 0.2)', 
              borderRadius: '24px',
              mb: 4,
              transition: 'all 0.3s ease',
              '&:hover': {
                background: 'rgba(49, 30, 125, 0.15)', 
                boxShadow: '0 0 30px rgba(49, 30, 125, 0.2)' 
              }
            }}
          >
            <CardContent sx={{ p: { xs: 3, sm: 4 }, textAlign: 'center' }}>
              <Box
                sx={{
                  width: { xs: 60, sm: 80 },
                  height: { xs: 60, sm: 80 },
                  borderRadius: '24px',
                  background: 'rgba(49, 30, 125, 0.1)', 
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 16px',
                  boxShadow: '0 0 30px rgba(49, 30, 125, 0.2)' 
                }}
              >
                <Upload
                  sx={{
                    fontSize: { xs: 30, sm: 40 },
                    color: 'rgba(111, 78, 255, 0.8)' 
                  }}
                />
              </Box>

              <Typography
                sx={{
                  color: '#FFF',
                  fontFamily: 'Inter',
                  fontSize: { xs: '18px', sm: '20px' },
                  fontWeight: 600,
                  mb: 1
                }}
              >
                Téléverser des documents
              </Typography>
              <Typography
                sx={{
                  color: '#9CA3AF',
                  fontFamily: 'Inter',
                  fontSize: { xs: '12px', sm: '14px' },
                  mb: 3
                }}
              >
                Prise en charge des formats PDF, DOC, TXT, XLS, PPT et autres.
              </Typography>

              <Button
                onClick={handleFileUploadClick}
                sx={{
                  background: 'rgba(49, 30, 125, 0.9)', 
                  color: '#FFF',
                  borderRadius: '8px',
                  textTransform: 'none',
                  fontFamily: 'Inter',
                  fontSize: { xs: '14px', sm: '16px' },
                  fontWeight: 600,
                  px: 4,
                  py: 1.5,
                  boxShadow: '0 0 20px rgba(49, 30, 125, 0.3)', 
                  '&:hover': {
                    background: 'rgba(49, 30, 125, 1)', 
                    boxShadow: '0 0 30px rgba(49, 30, 125, 0.4)' 
                  }
                }}
              >
                Importer des documents
              </Button>
            </CardContent>
          </Card>

          <Box sx={{ display: 'flex', justifyContent: 'center', pt: 2 }}>
            <Button
              onClick={handleAddToKnowledge}
              size="large"
              disabled={textLoading}
              sx={{
                background: 'linear-gradient(90deg, rgba(49, 30, 125, 0.9) 0%, rgba(26, 16, 69, 0.9) 50%, rgba(49, 30, 125, 0.9) 100%)',
                color: '#FFF',
                borderRadius: '26px',
                textTransform: 'none',
                fontFamily: 'Inter',
                fontSize: { xs: '14px', sm: '16px' },
                fontWeight: 600,
                px: { xs: 4, sm: 6 },
                py: 1.5,
                boxShadow: '0 0 30px rgba(49, 30, 125, 0.3)',
                '&:hover': {
                  opacity: 0.9,
                  boxShadow: '0 0 40px rgba(49, 30, 125, 0.4)'
                },
                '&:disabled': {
                  background: 'rgba(49, 30, 125, 0.5)',
                  color: 'rgba(255, 255, 255, 0.5)',
                }
              }}
            >
              {textLoading ? 'Sauvegarde en cours...' : 'Ajouter à la base de connaissances'}
            </Button>
          </Box>
        </CardContent>
      </Card>

      <Card
        sx={{
          background: 'rgba(55, 32, 142, 1)', 
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(49, 30, 125, 0.2)', 
          borderRadius: '24px',
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.3)'
        }}
      >
        <CardContent sx={{ p: { xs: 3, sm: 4 } }}>
          <Box sx={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center',
            flexDirection: { xs: 'column', sm: 'row' },
            gap: { xs: 2, sm: 0 },
            mb: 4 
          }}>
            <Typography
              variant="h6"
              sx={{
                color: '#FFF',
                fontFamily: 'Inter',
                fontSize: '24px',
                fontWeight: 600,
              }}
            >
              Base de connaissances actuelle
            </Typography>

            <TextField
              size="medium"
              value={searchQuery}
              onChange={handleSearchChange}
              placeholder="Rechercher un fichier..."
               sx={{
                width: '300px',
              '& .MuiOutlinedInput-root': {
                color: '#FFF',
                fontFamily: theme.typography.fontFamily,
                fontSize: '14px',
                background: '#1A1D25',
                borderRadius: '24px',
                border: '2px solid transparent',
                backgroundImage:
                  'linear-gradient(#1A1D25, #1A1D25), linear-gradient(180deg, #BE30FF 0.66%, #5D31F8 51.44%, #00A3FF 100%)',
                backgroundOrigin: 'border-box',
                backgroundClip: 'padding-box, border-box',
                boxShadow:
                  '0 0 2px 0 rgba(0, 0, 0, 0.28), 0 16px 64px 0 rgba(0, 0, 0, 0.16)',
                '& fieldset': { border: 'none' },
                '&:hover fieldset': { border: 'none' },
                '&.Mui-focused fieldset': { border: 'none' },
              },
              '& .MuiInputBase-input::placeholder': {
                color: 'rgba(255, 255, 255, 0.5)',
                opacity: 1,
              },
            }}
              InputProps={{
                endAdornment: (
                  <IconButton
                    size="small"
                    sx={{
                      color: sectionTheme.primary.light,
                      padding: '4px',
                      '&:hover': {
                        color: sectionTheme.primary.main,
                        backgroundColor: sectionTheme.state.hover,
                      },
                    }}
                  >
                    <Search sx={{ fontSize: '18px' }} /> 
                  </IconButton>
                ),
              }}
            />
          </Box>

          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
            {loading && files.length === 0 ? (
              <Box sx={{ textAlign: 'center', py: 4 }}>
                <CircularProgress sx={{ color: '#8D31FB' }} />
                <Typography
                  sx={{
                    color: '#9CA3AF',
                    fontFamily: 'Inter',
                    fontSize: '16px',
                    mt: 2,
                  }}
                >
                  Chargement des fichiers...
                </Typography>
              </Box>
            ) : filteredFiles.length > 0 ? (
              filteredFiles.map((file) => (
                <Card
                  key={file.uid}
                  sx={{
                    background: 'rgba(111, 78, 255, 0.2)',
                    border: '1px solid rgba(49, 30, 125, 0.2)',
                    borderRadius: '12px',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      background: 'rgba(49, 30, 125, 0.15)',
                      boxShadow: '0 0 20px rgba(49, 30, 125, 0.1)'
                    }
                  }}
                >
                  <CardContent sx={{ p: { xs: 2, sm: 3 } }}>
                    <Box
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: { xs: 2, sm: 3 },
                        flexDirection: { xs: 'column', sm: 'row' }
                      }}
                    >
                      <Box
                        sx={{
                          width: { xs: 40, sm: 48, lg: 60 },
                          height: { xs: 40, sm: 48, lg: 60 },
                          borderRadius: '24px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          flexShrink: 0,
                        }}
                      >
                        <Description
                          sx={{
                            fontSize: { xs: 20, sm: 24 },
                            color: '#EDEDED'
                          }}
                        />
                      </Box>

                      <Box sx={{ flex: 1, minWidth: 0, textAlign: { xs: 'center', sm: 'left' } }}>
                        <Typography
                          sx={{
                            color: '#FFF',
                            fontFamily: 'Inter',
                            fontSize: { xs: '14px', sm: '16px' },
                            fontWeight: 600,
                            mb: 1,
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            whiteSpace: 'nowrap'
                          }}
                        >
                          {file.displayName}
                        </Typography>
                        <Box
                          sx={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: 1,
                            flexWrap: 'wrap',
                            justifyContent: { xs: 'center', sm: 'flex-start' }
                          }}
                        >
                          <Typography
                            sx={{
                              color: '#9CA3AF',
                              fontFamily: 'Inter',
                              fontSize: '12px'
                            }}
                          >
                            {formatFileSize(file.size)}
                          </Typography>
                          <Typography sx={{ color: 'rgba(49, 30, 125, 0.8)', fontSize: '12px' }}>•</Typography>
                          <Chip
                            label={getFileType(file)}
                            size="small"
                            sx={{
                              background: 'transparent',
                              color: '#EDEDED',
                              border: '1px solid #EDEDED',
                              fontSize: '10px',
                              height: '20px'
                            }}
                          />
                          <Typography sx={{ color: 'rgba(49, 30, 125, 0.8)', fontSize: '12px' }}>•</Typography>
                          <Typography
                            sx={{
                              color: '#9CA3AF',
                              fontFamily: 'Inter',
                              fontSize: '12px'
                            }}
                          >
                            Ajouté le {new Date(file.createdAt).toLocaleDateString('fr-FR')}
                          </Typography>
                        </Box>
                      </Box>

                      <Box
                        sx={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: { xs: 1, sm: 2 },
                          flexShrink: 0
                        }}
                      >
                        <IconButton
                          size="small"
                          onClick={(event) => handleMenuOpen(event, file)}
                          sx={{
                            color: '#9CA3AF',
                            '&:hover': {
                              color: 'rgba(49, 30, 125, 0.8)',
                              background: 'rgba(49, 30, 125, 0.1)'
                            }
                          }}
                        >
                          <MoreVert fontSize="small" />
                        </IconButton>
                      </Box>
                    </Box>
                  </CardContent>
                </Card>
              ))
            ) : (
              <Box sx={{ textAlign: 'center', py: 4 }}>
                <Typography
                  sx={{
                    color: '#9CA3AF',
                    fontFamily: 'Inter',
                    fontSize: '16px'
                  }}
                >
                  {searchQuery ? 'Aucun fichier trouvé pour votre recherche.' : 'Aucun fichier dans la base de connaissances.'}
                </Typography>
              </Box>
            )}
          </Box>

          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
            PaperProps={{
              sx: {
                background: 'rgba(26, 16, 69, 0.95)',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(49, 30, 125, 0.2)',
                borderRadius: '8px',
                boxShadow: '0 4px 20px rgba(0, 0, 0, 0.3)',
                '& .MuiMenuItem-root': {
                  color: '#FFF',
                  fontFamily: 'Inter',
                  fontSize: '14px',
                  '&:hover': {
                    background: 'rgba(49, 30, 125, 0.2)'
                  }
                }
              }
            }}
          >
            <MenuItem onClick={handleViewFile}>
              <ListItemIcon>
                <Visibility fontSize="small" sx={{ color: '#8D31FB' }} />
              </ListItemIcon>
              <ListItemText>Voir</ListItemText>
            </MenuItem>
            <MenuItem onClick={handleDownloadFile}>
              <ListItemIcon>
                <Download fontSize="small" sx={{ color: '#8D31FB' }} />
              </ListItemIcon>
              <ListItemText>Télécharger</ListItemText>
            </MenuItem>
            <MenuItem onClick={handleRenameFile}>
              <ListItemIcon>
                <Edit fontSize="small" sx={{ color: '#8D31FB' }} />
              </ListItemIcon>
              <ListItemText>Renommer</ListItemText>
            </MenuItem>
            <MenuItem onClick={handleDeleteFile}>
              <ListItemIcon>
                <Delete fontSize="small" sx={{ color: '#EF4444' }} />
              </ListItemIcon>
              <ListItemText sx={{ color: '#EF4444' }}>Supprimer</ListItemText>
            </MenuItem>
          </Menu>
        </CardContent>
      </Card>

      {/* Blocked Keywords Section */}
      <Card
        sx={{
          background: 'rgba(55, 32, 142, 1)',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(49, 30, 125, 0.2)',
          borderRadius: '24px',
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.3)'
        }}
      >
      </Card>
    </Box>
  );
};