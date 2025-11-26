import React, { useState, useRef , useEffect } from 'react';
import {
  Box,
  Typography,
  TextField,
  FormControl,
  Select,
  MenuItem,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  useTheme,
  CircularProgress,
  Alert,
} from '@mui/material';
import { ObjectifsMarketingSection } from './components/marketing-objectives';
import { ChannelSettingsSection } from './components/channel-settings';
import { useConfigurationStore } from '@/shared/api/stores/community-manager-service/configuration-store';
import { ActivitySector, MarketingObjectiveType, PlatformType } from '@/shared/types/community-manager';
import { activitySectorOptions } from '@/shared/utils/community-manager-mappings';
import ConditionalComponent from '@/shared/components/conditionalComponent';

export const ConfigurationSection: React.FC = () => {
  const theme = useTheme();
  const agentUid = '6b15cae1-0d41-4756-9593-a5a9906f4e09';

  const { configuration, isLoading, error, fetchConfiguration, updateConfiguration, clearError } = useConfigurationStore();

  const [activitySector, setActivitySector] = useState<ActivitySector | ''>('');
  const [productsServices, setProductsServices] = useState('');
  const [websiteUrl, setWebsiteUrl] = useState('');
  const [resetTrigger, setResetTrigger] = useState(0);
  const [showCancelDialog, setShowCancelDialog] = useState(false);
  const [showSuccessDialog, setShowSuccessDialog] = useState(false);

  const objectivesRef = useRef<{ getSelectedObjectives: () => MarketingObjectiveType[] }>(null);
  const platformsRef = useRef<{ getPlatforms: () => any[] }>(null);

  useEffect(() => {
    fetchConfiguration(agentUid);
  }, [agentUid]);

  useEffect(() => {
    if (configuration && configuration.companyInfo) {
      setActivitySector(configuration.companyInfo.activitySector);
      setProductsServices(configuration.companyInfo.productsServices ?? '');
      setWebsiteUrl(configuration.companyInfo.websiteUrl ?? '');
    }
  }, [configuration]);

  const initialValues: {
    activitySector: ActivitySector | '';
    productsServices: string;
    websiteUrl: string;
  } = {
    activitySector: '',
    productsServices: '',
    websiteUrl: '',
  };

  const hasFormValues = () => {
    const hasMainValues =
      activitySector.trim() !== '' ||
      productsServices.trim() !== '' ||
      websiteUrl.trim() !== '';

    const objectives = objectivesRef.current?.getSelectedObjectives();
    const hasObjectives = objectives ? objectives.length > 0 : false;

    const platforms = platformsRef.current?.getPlatforms() ?? [];
    const hasPlatformSettings = platforms.some((platform: any) =>
      platform.settings.tone.value !== '' ||
      platform.settings.captionLength.value !== '' ||
      platform.settings.frequency.value !== '' ||
      platform.settings.postCount.value !== '' ||
      platform.settings.imagesPerPost.value !== ''
    );

    return hasMainValues || hasObjectives || hasPlatformSettings;
  };

  const handleCancelClick = () => {
    if (hasFormValues()) {
      setShowCancelDialog(true);
    } else {
      handleCancel();
    }
  };

  const handleCancel = () => {
    setActivitySector(initialValues.activitySector);
    setProductsServices(initialValues.productsServices);
    setWebsiteUrl(initialValues.websiteUrl);
    setResetTrigger((prev) => prev + 1);
    setShowCancelDialog(false);
  };

  const handleSave = async () => {
    if (!hasFormValues()) {
      return;
    }
    if (!activitySector) {
      return;
    }

    const selectedObjectives = objectivesRef.current?.getSelectedObjectives() ?? [];
    const platforms = platformsRef.current?.getPlatforms() ?? [];

    const configurationData = {
      agentUid,
      companyInfo: {
        activitySector: activitySector as ActivitySector,
        productsServices,
        websiteUrl,
      },
      marketingObjectives: selectedObjectives.map(obj => ({ objectiveType: obj })),
      channelSettings: platforms
        .filter((platform: any) => {
          const hasSettings =
            (platform.settings.tone.value && platform.settings.tone.value !== '') ||
            (platform.settings.captionLength.value && platform.settings.captionLength.value !== '') ||
            (platform.settings.frequency.value && platform.settings.frequency.value !== '') ||
            (platform.settings.postCount.value && platform.settings.postCount.value !== '') ||
            (platform.settings.imagesPerPost.value && platform.settings.imagesPerPost.value !== '');
          return hasSettings;
        })
        .map((platform: any) => {
          const platformId = platform.platformId?.toUpperCase();
          return {
            platformType: platformId === 'TWITTER' ? PlatformType.TWITTER : (PlatformType[platformId as keyof typeof PlatformType] ?? PlatformType.FACEBOOK),
            contentTone: platform.settings.tone.value && platform.settings.tone.value !== '' ? platform.settings.tone.value : undefined,
            captionLength: platform.settings.captionLength.value && platform.settings.captionLength.value !== '' ? platform.settings.captionLength.value : undefined,
            postingFrequency: platform.settings.frequency.value && platform.settings.frequency.value !== '' ? platform.settings.frequency.value : undefined,
            postCountPerCycle: platform.settings.postCount.value && platform.settings.postCount.value !== '' ? parseInt(platform.settings.postCount.value) : undefined,
            imagesPerIdea: platform.settings.imagesPerPost.value && platform.settings.imagesPerPost.value !== '' ? parseInt(platform.settings.imagesPerPost.value) : undefined,
          };
        }),
    };

    try {
      await updateConfiguration(agentUid, configurationData);
      setShowSuccessDialog(true);
    } catch (err) {
      console.error('Failed to save configuration:', err);
    }
  };

  const getSelectedLabel = (selected: ActivitySector | '') => {
    if (!selected) {
      return (
        <Typography
          sx={{
            color: 'rgba(255, 255, 255, 0.5)',
            fontFamily: theme.typography.fontFamily,
            fontSize: '14px',
          }}
        >
          Sélectionnez un secteur
        </Typography>
      );
    }
    const option = activitySectorOptions.find(opt => opt.value === selected);
    if (option) {
      return option.label;
    }
    return selected;
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
      <ConditionalComponent isValid={isLoading && !configuration}>
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '400px' }}>
          <CircularProgress />
        </Box>
      </ConditionalComponent>

      <ConditionalComponent isValid={Boolean(error)}>
        <Alert severity="error" onClose={clearError}>
          {error}
        </Alert>
      </ConditionalComponent>

      <Box
        sx={{
          mt: 4,
          p: 3,
          backgroundColor: 'rgb(12, 68, 106)',
          borderRadius: '24px',
          border: 'none',
        }}
      >
        <Typography
          variant="h6"
          sx={{
            color: '#FFF',
            fontFamily: theme.typography.fontFamily,
            fontSize: '20px',
            fontWeight: 600,
            mb: 1,
          }}
        >
          Informations sur l&apos;entreprise
        </Typography>
        <Typography
          sx={{
            color: '#9CA3AF',
            fontFamily: theme.typography.fontFamily,
            fontSize: '16px',
            fontStyle: 'normal',
            fontWeight: 500,
            lineHeight: '121.331%',
            mb: 4,
          }}
        >
          Identifiez le profil de votre société et son activité principale
        </Typography>

        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
          <Box>
            <Typography
              sx={{
                color: '#EDEDED',
                fontFamily: theme.typography.fontFamily,
                fontSize: '16px',
                fontWeight: 600,
                mb: 1.5,
              }}
            >
              Secteur d&apos;activité
            </Typography>
            <FormControl fullWidth>
              <Select
                value={activitySector}
                onChange={(e) => setActivitySector(e.target.value as ActivitySector)}
                displayEmpty
                renderValue={getSelectedLabel}
                MenuProps={{
                  PaperProps: {
                    sx: {
                      background: '#1A1D25',
                      borderRadius: '12px',
                      border: '1px solid rgba(6, 158, 255, 0.3)',
                      boxShadow: '0 4px 20px rgba(0, 0, 0, 0.3)',
                      '& .MuiMenuItem-root': {
                        color: '#FFF',
                        fontFamily: theme.typography.fontFamily,
                        fontSize: '14px',
                        '&:hover': {
                          background: 'rgba(6, 158, 255, 0.1)',
                        },
                        '&.Mui-selected': {
                          background: 'rgba(6, 158, 255, 0.2)',
                          '&:hover': {
                            background: 'rgba(6, 158, 255, 0.3)',
                          },
                        },
                      },
                    },
                  },
                }}
                sx={{
                  background: 'rgb(11, 86, 136)',
                  borderRadius: '12px',
                  color: '#FFF',
                  '& .MuiOutlinedInput-notchedOutline': {
                    borderColor: 'rgba(6, 158, 255, 0.3)',
                  },
                  '&:hover .MuiOutlinedInput-notchedOutline': {
                    borderColor: 'rgba(6, 158, 255, 0.5)',
                  },
                  '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                    borderColor: '#069eff',
                  },
                  '& .MuiSelect-icon': {
                    color: '#FFF',
                  },
                }}
              >
                {activitySectorOptions.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>

          <Box>
            <Typography
              sx={{
                color: '#EDEDED',
                fontFamily: theme.typography.fontFamily,
                fontSize: '16px',
                fontWeight: 600,
                mb: 1.5,
              }}
            >
              Produits et services
            </Typography>
            <Box
              sx={{
                borderRadius: '24px',
                background: '#1A1D25',
                border: '2px solid transparent',
                backgroundImage:
                  'linear-gradient(#1A1D25, #1A1D25), linear-gradient(180deg, #BE30FF 0.66%, #5D31F8 51.44%, #00A3FF 100%)',
                backgroundOrigin: 'border-box',
                backgroundClip: 'padding-box, border-box',
                boxShadow: '0 0 2px 0 rgba(0, 0, 0, 0.28), 0 16px 64px 0 rgba(0, 0, 0, 0.16)',
                padding: '4px',
              }}
            >
              <TextField
                fullWidth
                multiline
                rows={4}
                value={productsServices}
                onChange={(e) => setProductsServices(e.target.value)}
                placeholder="Décrivez ce que votre entreprise propose"
                sx={{
                  '& .MuiOutlinedInput-root': {
                    color: '#FFF',
                    fontFamily: theme.typography.fontFamily,
                    fontSize: '14px',
                    background: 'transparent',
                    padding: 0,
                    '& fieldset': { border: 'none' },
                    '&:hover fieldset': { border: 'none' },
                    '&.Mui-focused fieldset': { border: 'none' },
                  },
                  '& .MuiInputBase-input': {
                    padding: '12px 16px',
                  },
                  '& .MuiInputBase-input::placeholder': {
                    color: 'rgba(255, 255, 255, 0.5)',
                    opacity: 1,
                  },
                }}
              />
            </Box>
          </Box>

          <Box>
            <Typography
              sx={{
                color: '#EDEDED',
                fontFamily: theme.typography.fontFamily,
                fontSize: '16px',
                fontWeight: 600,
                mb: 1.5,
              }}
            >
              Lien du site web
            </Typography>
            <Box
              sx={{
                borderRadius: '24px',
                background: '#1A1D25',
                border: '2px solid transparent',
                backgroundImage:
                  'linear-gradient(#1A1D25, #1A1D25), linear-gradient(180deg, #BE30FF 0.66%, #5D31F8 51.44%, #00A3FF 100%)',
                backgroundOrigin: 'border-box',
                backgroundClip: 'padding-box, border-box',
                boxShadow: '0 0 2px 0 rgba(0, 0, 0, 0.28), 0 16px 64px 0 rgba(0, 0, 0, 0.16)',
                padding: '4px',
              }}
            >
              <TextField
                fullWidth
                type="url"
                value={websiteUrl}
                onChange={(e) => setWebsiteUrl(e.target.value)}
                placeholder="https://www.example.com"
                sx={{
                  '& .MuiOutlinedInput-root': {
                    color: '#FFF',
                    fontFamily: theme.typography.fontFamily,
                    fontSize: '14px',
                    background: 'transparent',
                    padding: 0,
                    '& fieldset': { border: 'none' },
                    '&:hover fieldset': { border: 'none' },
                    '&.Mui-focused fieldset': { border: 'none' },
                  },
                  '& .MuiInputBase-input': {
                    padding: '12px 16px',
                  },
                  '& .MuiInputBase-input::placeholder': {
                    color: 'rgba(255, 255, 255, 0.5)',
                    opacity: 1,
                  },
                }}
              />
            </Box>
          </Box>
        </Box>
      </Box>

      <ObjectifsMarketingSection
        resetTrigger={resetTrigger}
        initialObjectives={configuration?.marketingObjectives?.map(obj => obj.objectiveType) ?? []}
        ref={objectivesRef}
      />

      <ChannelSettingsSection
        resetTrigger={resetTrigger}
        ref={platformsRef}
      />

      <Box
        sx={{
          display: 'flex',
          justifyContent: { xs: 'center', sm: 'flex-end' },
          alignItems: 'center',
          gap: 2,
          mt: 4,
          mb: 2,
          flexDirection: { xs: 'column', sm: 'row' },
          width: '100%',
        }}
      >
        <Button
          onClick={handleCancelClick}
          sx={{
            display: 'flex',
            width: { xs: '100%', sm: 'auto' },
            minWidth: { xs: '100%', sm: '160px' },
            height: { xs: '44px', sm: '48px' },
            padding: { xs: '12px 16px', sm: '14px 24px' },
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: '16px',
            border: '1px solid rgba(6, 158, 255, 0.5)',
            backgroundColor: 'transparent',
            color: '#069eff',
            fontFamily: theme.typography.fontFamily,
            fontSize: { xs: '14px', sm: '16px' },
            fontWeight: 600,
            textTransform: 'none',
            '&:hover': {
              backgroundColor: 'rgba(6, 158, 255, 0.1)',
              borderColor: '#069eff',
            },
          }}
        >
          Annuler
        </Button>
        <Button
          onClick={handleSave}
          disabled={isLoading}
          sx={{
            display: 'flex',
            width: { xs: '100%', sm: 'auto' },
            minWidth: { xs: '100%', sm: '240px' },
            height: { xs: '44px', sm: '48px' },
            padding: { xs: '12px 16px', sm: '14px 24px' },
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: '16px',
            backgroundColor: '#069eff',
            color: '#FFF',
            fontFamily: theme.typography.fontFamily,
            fontSize: { xs: '14px', sm: '16px' },
            fontWeight: 600,
            textTransform: 'none',
            boxShadow: '0 4px 12px rgba(6, 158, 255, 0.3)',
            '&:hover': {
              backgroundColor: '#0588d6',
              boxShadow: '0 6px 16px rgba(6, 158, 255, 0.4)',
            },
          }}
        >
          Enregistrer la configuration
        </Button>
      </Box>

      <Dialog
        open={showCancelDialog}
        onClose={() => setShowCancelDialog(false)}
        PaperProps={{
          sx: {
            borderRadius: '16px',
            background: 'rgba(13, 45, 69, 0.95)',
            backdropFilter: 'blur(12px)',
            minWidth: '400px',
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
            fontSize: '20px',
            fontWeight: 600,
          }}
        >
          Confirmer l&apos;annulation
        </DialogTitle>
        <DialogContent>
          <Typography
            sx={{
              color: '#9CA3AF',
              fontFamily: theme.typography.fontFamily,
              fontSize: '16px',
            }}
          >
            Vous avez des modifications non enregistrées. Êtes-vous sûr de vouloir annuler ? Toutes les modifications seront perdues.
          </Typography>
        </DialogContent>
        <DialogActions sx={{ p: 2, gap: 1 }}>
          <Button
            onClick={() => setShowCancelDialog(false)}
            sx={{
              color: '#069eff',
              fontFamily: theme.typography.fontFamily,
              fontSize: '16px',
              fontWeight: 600,
              textTransform: 'none',
              '&:hover': {
                backgroundColor: 'rgba(6, 158, 255, 0.1)',
              },
            }}
          >
            Non, garder les modifications
          </Button>
          <Button
            onClick={handleCancel}
            variant="contained"
            sx={{
              background: '#069eff',
              color: '#FFF',
              fontFamily: theme.typography.fontFamily,
              fontSize: '16px',
              fontWeight: 600,
              textTransform: 'none',
              '&:hover': {
                background: '#0588d6',
              },
            }}
          >
            Oui, annuler
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={showSuccessDialog}
        onClose={() => setShowSuccessDialog(false)}
        PaperProps={{
          sx: {
            borderRadius: '16px',
            background: 'rgba(13, 45, 69, 0.95)',
            backdropFilter: 'blur(12px)',
            minWidth: '400px',
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
            fontSize: '20px',
            fontWeight: 600,
          }}
        >
          Configuration enregistrée
        </DialogTitle>
        <DialogContent>
          <Typography
            sx={{
              color: '#9CA3AF',
              fontFamily: theme.typography.fontFamily,
              fontSize: '16px',
            }}
          >
            Votre configuration a été enregistrée avec succès.
          </Typography>
        </DialogContent>
        <DialogActions sx={{ p: 2, gap: 1, justifyContent: 'center' }}>
          <Button
            onClick={() => setShowSuccessDialog(false)}
            variant="contained"
            sx={{
              background: '#069eff',
              color: '#FFF',
              fontFamily: theme.typography.fontFamily,
              fontSize: '16px',
              fontWeight: 600,
              textTransform: 'none',
              minWidth: '120px',
              '&:hover': {
                background: '#0588d6',
              },
            }}
          >
            OK
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

