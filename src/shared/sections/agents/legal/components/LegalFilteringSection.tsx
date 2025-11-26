import { Box, Typography, TextField, IconButton, Chip, useTheme, Snackbar, Alert, CircularProgress, Button } from '@mui/material';
import { useState, useEffect } from 'react';
import { Add, Close, DeleteSweep } from '@mui/icons-material';
import { useBlockedKeywordsStore } from '@/shared/api/stores/agent-legal-service/blocked-keywords-store';
import ConditionalComponent from '@/shared/components/conditionalComponent';

export const LegalFilteringSection: React.FC = () => {
  const theme = useTheme();

  // Legal agent UID - same as used in AgentTrainingSection
  const agentUid = '24c8a5a5-e75f-4857-be8f-0b80ec8e7a1c';


  // Zustand store
  const {
    blockedKeywords,
    totalCount,
    loading,
    error,
    fetchBlockedKeywords,
    addKeywords,
    removeKeywords,
    clearAllKeywords,
    clearError,
  } = useBlockedKeywordsStore();

  // Local state
  const [keyword, setKeyword] = useState('');
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState<'success' | 'error'>('success');

  // Fetch keywords on mount
  useEffect(() => {
    if (agentUid) {
      fetchBlockedKeywords(agentUid).catch(() => {
      });
    }
  }, [agentUid, fetchBlockedKeywords]);

  // Show error from store
  useEffect(() => {
    if (error) {
      showSnackbar(error, 'error');
      clearError();
    }
  }, [error, clearError]);

  const showSnackbar = (message: string, severity: 'success' | 'error') => {
    setSnackbarMessage(message);
    setSnackbarSeverity(severity);
    setSnackbarOpen(true);
  };

  const handleAddKeyword = async () => {
    const trimmedKeyword = keyword.trim();
    if (!trimmedKeyword) {
      showSnackbar('Veuillez entrer un mot-clé', 'error');
      return;
    }

    if (blockedKeywords.includes(trimmedKeyword)) {
      showSnackbar('Ce mot-clé existe déjà', 'error');
      return;
    }

    try {
      await addKeywords({
        agentUid,
        keywords: [trimmedKeyword],
      });
      setKeyword('');
      showSnackbar('Mot-clé ajouté avec succès', 'success');
    } catch (error: any) {
      showSnackbar(
        `Erreur lors de l'ajout: ${error.message || 'Erreur inconnue'}`,
        'error'
      );
    }
  };

  const handleRemoveKeyword = async (keywordToRemove: string) => {
    try {
      await removeKeywords({
        agentUid,
        keywords: [keywordToRemove],
      });
      showSnackbar('Mot-clé supprimé avec succès', 'success');
    } catch (error: any) {
      showSnackbar(
        `Erreur lors de la suppression: ${error.message || 'Erreur inconnue'}`,
        'error'
      );
    }
  };

  const handleClearAll = async () => {
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

  const handleKeyPress = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter') {
      handleAddKeyword();
    }
  };

  return (
    <Box>
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

      <Typography
        variant="h6"
        sx={{
          color: '#FFF',
          fontFamily: theme.typography.fontFamily,
          fontSize: '24px',
          fontWeight: 600,
          mb: 1,
        }}
      >
        Bouclier de filtrage de contenu
      </Typography>
      <Typography
        variant="body1"
        sx={{
          maxWidth: '1038px',
          color: '#9CA3AF',
          fontFamily: theme.typography.fontFamily,
          fontSize: '18px',
          fontStyle: 'normal',
          fontWeight: 500,
          lineHeight: '121.331%',
          mb: 4,
        }}
      >
        Configurez votre agent pour ignorer certains mots-clés ou sujets.
      </Typography>

      <Box sx={{ mt: 3 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <Typography
            sx={{
              color: '#FFF',
              fontFamily: theme.typography.fontFamily,
              fontSize: '18px',
              fontWeight: 600,
            }}
          >
            Mots-clés bloqués ({totalCount})
          </Typography>
          {totalCount > 0 && (
            <Button
              onClick={handleClearAll}
              disabled={loading}
              startIcon={<DeleteSweep />}
              size="small"
              sx={{
                color: '#FF6B6B',
                textTransform: 'none',
                fontSize: '14px',
                fontFamily: theme.typography.fontFamily,
                '&:hover': {
                  background: 'rgba(255, 107, 107, 0.1)',
                },
                '&:disabled': {
                  color: 'rgba(255, 107, 107, 0.5)',
                },
              }}
            >
              Tout supprimer
            </Button>
          )}
        </Box>
        <Box sx={{ position: 'relative', width: '100%' }}>
          <TextField
            fullWidth
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            onKeyPress={handleKeyPress}
            disabled={loading}
            placeholder="Ajouter un mot-clé à ignorer..."
            sx={{
              width: '100%',
              maxWidth: '100%',
              '& .MuiOutlinedInput-root': {
                color: '#FFF',
                fontFamily: theme.typography.fontFamily,
                fontSize: '16px',
                background: '#1A1D25',
                borderRadius: '24px',
                border: '2px solid transparent',
                backgroundImage: 'linear-gradient(#1A1D25, #1A1D25), linear-gradient(180deg, #BE30FF 0.66%, #5D31F8 51.44%, #00A3FF 100%)',
                backgroundOrigin: 'border-box',
                backgroundClip: 'padding-box, border-box',
                boxShadow: '0 0 2px 0 rgba(0, 0, 0, 0.28), 0 16px 64px 0 rgba(0, 0, 0, 0.16)',
                paddingRight: '40px',
                '& fieldset': {
                  border: 'none',
                },
                '&:hover fieldset': {
                  border: 'none',
                },
                '&.Mui-focused fieldset': {
                  border: 'none',
                },
              },
              '& .MuiInputBase-input::placeholder': {
                color: 'rgba(255, 255, 255, 0.5)',
                opacity: 1,
              },
            }}
            InputProps={{
              endAdornment: (
                <IconButton
                  onClick={handleAddKeyword}
                  disabled={loading}
                  sx={{
                    color: '#BE30FF',
                    padding: '4px',
                    margin: 0,
                    marginRight: '-12px',
                    '&:hover': {
                      color: '#8D31FB',
                      backgroundColor: 'rgba(190, 48, 255, 0.1)',
                    },
                    '&:disabled': {
                      color: 'rgba(190, 48, 255, 0.5)',
                    },
                  }}
                >
                  <Add sx={{ fontSize: '20px' }} />
                </IconButton>
              ),
            }}
          />
        </Box>

        {loading && blockedKeywords.length === 0 ? (
          <Box sx={{ textAlign: 'center', py: 4 }}>
            <CircularProgress sx={{ color: '#BE30FF' }} size={30} />
          </Box>
        ) : (
          <ConditionalComponent isValid={blockedKeywords.length > 0}>
            <Box sx={{ mt: 3, display: 'flex', flexWrap: 'wrap', gap: 1 }}>
              {blockedKeywords.map((keyword, index) => (
                <Chip
                  key={index}
                  label={keyword}
                  onDelete={() => handleRemoveKeyword(keyword)}
                  deleteIcon={<Close sx={{ fontSize: '16px' }} />}
                  sx={{
                    background: 'rgba(141, 49, 251, 0.2)',
                    color: '#FFF',
                    border: '1px solid rgba(141, 49, 251, 0.3)',
                    '& .MuiChip-deleteIcon': {
                      color: '#FFF',
                      '&:hover': {
                        color: '#FF6B6B',
                      },
                    },
                    '&:hover': {
                      background: 'rgba(141, 49, 251, 0.3)',
                    },
                  }}
                />
              ))}
            </Box>
          </ConditionalComponent>
        )}
      </Box>
    </Box>
  );
};
