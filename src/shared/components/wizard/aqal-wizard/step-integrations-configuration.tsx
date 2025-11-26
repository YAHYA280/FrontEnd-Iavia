import React, { useState } from 'react';
import {
  Box,
  Typography,
  TextField,
  Select,
  MenuItem,
  Button,
  Alert,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel,
} from '@mui/material';
import type { IntegrationConfigStepProps } from './types';
import ConditionalComponent from '../../conditionalComponent';

interface PreconfiguredAccount {
  id: string;
  name: string;
  workspace: string;
  oauthToken?: string;
  webhookUrl?: string;
  defaultChannel?: string;
}

export const StepIntegrationConfigLegal: React.FC<IntegrationConfigStepProps> = ({
  selectedIntegrations,
  activeIntegrationTab,
  setActiveIntegrationTab,
  integrationConfigs,
  setIntegrationConfigs,
  agentColor,
}) => {
  const [generatedWebhook, setGeneratedWebhook] = useState<string>('');
  const [isGeneratingWebhook, setIsGeneratingWebhook] = useState<boolean>(false);
  const [configMode, setConfigMode] = useState<'preconfigured' | 'manual'>('preconfigured');

  const [preconfiguredSlackAccounts] = useState<PreconfiguredAccount[]>([
    {
      id: '1',
      name: 'Espace de travail principal',
      workspace: 'AQAL Legal Workspace',
      oauthToken: 'YOUR_SLACK_OAUTH_TOKEN_HERE',
      defaultChannel: '#notifications-juridiques',
    },
    {
      id: '2',
      name: 'Espace de travail équipe',
      workspace: 'AQAL Group Workspace',
      oauthToken: 'YOUR_SLACK_OAUTH_TOKEN_HERE',
      defaultChannel: '#alertes-juridiques',
    },
  ]);

  if (selectedIntegrations.length === 0) {
    return (
      <Box sx={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
        <Box
          sx={{
            background: `linear-gradient(135deg, ${agentColor.primary}08, ${agentColor.primary}03)`,
            backdropFilter: 'blur(20px)',
            border: `1px solid ${agentColor.primary}33`,
            borderRadius: '16px',
            padding: 4,
          }}
        >
          <Box sx={{ fontSize: '64px', mb: 2 }}>ℹ️</Box>
          <Typography sx={{ fontSize: '18px', color: 'rgba(255, 255, 255, 0.8)' }}>
            Aucune intégration sélectionnée. Vous pouvez passer à l&apos;étape suivante.
          </Typography>
        </Box>
      </Box>
    );
  }

  const activeTab =
    selectedIntegrations.find((i) => i.id === activeIntegrationTab) || selectedIntegrations[0];
  const configData = integrationConfigs[activeTab.id] || {};

  const updateConfig = (field: string, value: string) => {
    setIntegrationConfigs((prev) => ({
      ...prev,
      [activeTab.id]: {
        ...prev[activeTab.id],
        [field]: value,
      },
    }));
  };

  const handleAccountSelect = (account: PreconfiguredAccount) => {
    setIntegrationConfigs((prev) => ({
      ...prev,
      [activeTab.id]: {
        ...prev[activeTab.id],
        oauthToken: account.oauthToken || '',
        defaultChannel: account.defaultChannel || '',
        selectedAccountId: account.id,
        configMode: 'preconfigured',
      },
    }));
  };

  const handleConfigModeChange = (mode: 'preconfigured' | 'manual') => {
    setConfigMode(mode);

    if (mode === 'manual') {
      setIntegrationConfigs((prev) => ({
        ...prev,
        [activeTab.id]: {
          ...prev[activeTab.id],
          selectedAccountId: undefined,
          configMode: 'manual',
        },
      }));
    }
  };

  const generateWebhookUrl = async () => {
    if (!configData.oauthToken) {
      alert("Veuillez d'abord entrer un token OAuth Slack");
      return;
    }

    setIsGeneratingWebhook(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 2000));

      const mockWebhookUrl = `https://hooks.slack.com/services/T00000000/B00000000/${configData.oauthToken?.substring(0, 10)}`;
      setGeneratedWebhook(mockWebhookUrl);

      updateConfig('webhookUrl', mockWebhookUrl);
    } catch (error) {
      console.error('Erreur lors de la génération du webhook:', error);
      alert('Erreur lors de la génération du webhook');
    } finally {
      setIsGeneratingWebhook(false);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    alert('URL copiée dans le presse-papier !');
  };

  const renderGuideAndForm = () => {
    switch (activeTab.id) {
      case 'slack':
        return (
          <>
            {/* Guide Card */}
            <Box
              sx={{
                background: `linear-gradient(135deg, ${agentColor.primary}15, ${agentColor.primary}08)`,
                border: `2px solid ${agentColor.primary}`,
                borderRadius: '16px',
                padding: 3.5,
                mb: 3,
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 2 }}>
                <Box sx={{ fontSize: '28px' }}>💬</Box>
                <Typography sx={{ fontSize: '20px', fontWeight: 700, color: '#FFF' }}>
                  Guide de configuration Slack
                </Typography>
              </Box>
              <Typography
                sx={{
                  fontSize: '15px',
                  color: 'rgba(255, 255, 255, 0.85)',
                  mb: 2.5,
                  lineHeight: 1.6,
                }}
              >
                Pour connecter Slack à votre agent juridique, suivez ces étapes détaillées pour
                créer votre application et obtenir le token d&apos;accès.
              </Typography>

              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                {[
                  {
                    step: '1. Création du compte et espace de travail',
                    description:
                      'Rendez-vous sur https://slack.com/intl/fr-ma/get-started et créez votre compte Slack. Après connexion, créez un nouvel espace de travail.',
                  },
                  {
                    step: '2. Accéder à la gestion des applications',
                    description:
                      'Dans la sidebar d\'accueil, cliquez sur les trois points du champ "Applications" puis sélectionnez "Gérer"',
                  },
                  {
                    step: '3. Parcourir les applications',
                    description:
                      'Cliquez sur le bouton "Parcourir les applications" pour accéder à l\'App Directory',
                  },
                  {
                    step: '4. Créer une nouvelle application',
                    description:
                      'Dans la barre de navigation, cliquez sur "Conçu" puis "Create new app". Choisissez "From scratch"',
                  },
                  {
                    step: "5. Nommer l'application",
                    description:
                      'Donnez un nom à votre application (ex: "AQAL Legal Assistant") et sélectionnez votre workspace Slack',
                  },
                  {
                    step: '6. Configurer les permissions OAuth',
                    description:
                      'Dans le menu gauche, cliquez sur "OAuth & Permissions". Dans la section "Scopes", ajoutez les permissions nécessaires pour votre agent juridique',
                  },
                  {
                    step: "7. Installer l'application",
                    description:
                      'Dans la section "OAuth Tokens", cliquez sur "Install to your workspace". Confirmez l\'installation en cliquant sur "Install votre application"',
                  },
                  {
                    step: '8. Récupérer le token',
                    description:
                      'Après installation, un token OAuth sera généré. Cliquez sur "Copy" pour copier le token commençant par "xoxb-"',
                  },
                  {
                    step: '9. Coller le token',
                    description:
                      'Collez votre token dans le champ ci-dessous pour finaliser la configuration',
                  },
                ].map((item, index) => (
                  <Box
                    key={index}
                    sx={{
                      display: 'flex',
                      alignItems: 'flex-start',
                      gap: 1.5,
                      padding: 2,
                      background: 'rgba(255, 255, 255, 0.03)',
                      borderRadius: '12px',
                    }}
                  >
                    <Box
                      sx={{
                        width: '32px',
                        height: '32px',
                        background: agentColor.primary,
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontWeight: 700,
                        fontSize: '14px',
                        flexShrink: 0,
                      }}
                    >
                      {index + 1}
                    </Box>
                    <Box>
                      <Typography
                        sx={{
                          fontSize: '15px',
                          fontWeight: 600,
                          color: '#FFF',
                          mb: 0.5,
                          lineHeight: 1.5,
                        }}
                      >
                        {item.step}
                      </Typography>
                      <Typography
                        sx={{
                          fontSize: '14px',
                          color: 'rgba(255, 255, 255, 0.7)',
                          lineHeight: 1.5,
                        }}
                      >
                        {item.description}
                      </Typography>
                    </Box>
                  </Box>
                ))}
              </Box>

              <Box
                sx={{
                  mt: 3,
                  p: 2.5,
                  background: 'rgba(255, 255, 255, 0.05)',
                  borderRadius: '12px',
                  border: `1px solid ${agentColor.primary}33`,
                }}
              >
                <Typography sx={{ fontSize: '16px', fontWeight: 700, mb: 1.5, color: '#FFF' }}>
                  📚 Documentation détaillée
                </Typography>
                <Typography sx={{ fontSize: '14px', color: 'rgba(255, 255, 255, 0.8)', mb: 2 }}>
                  Pour une documentation plus complète avec des captures d&apos;écran et des instructions
                  détaillées, consultez notre guide complet :
                </Typography>
                <Box
                  sx={{
                    position: 'relative',
                    overflow: 'hidden',
                    display: 'inline-block',
                    borderRadius: '12px',
                    isolation: 'isolate',
                    willChange: 'transform',
                  }}
                >
                  <Button
                    variant="outlined"
                    href="https://docs.google.com/document/d/1FLg5OWcj_uT9il509PP30zjtf0F11MjH/view"
                    target="_blank"
                    rel="noopener noreferrer"
                    sx={{
                      position: 'relative',
                      overflow: 'hidden',
                      background: `linear-gradient(135deg, ${agentColor.primary}15, ${agentColor.primary}08)`,
                      border: `2px solid ${agentColor.primary}`,
                      color: '#FFF',
                      borderRadius: '12px',
                      padding: '12px 24px',
                      fontWeight: 600,
                      fontSize: '14px',
                      transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                      backdropFilter: 'blur(20px)',
                      WebkitBackdropFilter: 'blur(20px)',
                      '&:hover': {
                        background: `linear-gradient(135deg, ${agentColor.primary}25, ${agentColor.primary}15)`,
                        borderColor: `${agentColor.primary}CC`,
                        transform: 'translateY(-2px)',
                        boxShadow: `0 8px 25px ${agentColor.glow}33`,
                        '& .shine-effect': {
                          transform: 'translateX(100%)',
                        },
                      },
                    }}
                  >
                    {/* Shine effect */}
                    <Box
                      className="shine-effect"
                      sx={{
                        position: 'absolute',
                        inset: 0,
                        background:
                          'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.15), transparent)',
                        transform: 'translateX(-100%)',
                        transition: 'transform 0.7s ease-out',
                        pointerEvents: 'none',
                      }}
                    />
                    Voir la documentation détaillée Slack
                  </Button>
                </Box>
              </Box>
            </Box>

            <Box
              sx={{
                background: 'rgba(255, 255, 255, 0.02)',
                border: '2px solid rgba(255, 255, 255, 0.08)',
                borderRadius: '16px',
                padding: 3.5,
                mb: 3,
              }}
            >
              <Typography sx={{ fontSize: '18px', fontWeight: 700, mb: 2, color: '#FFF' }}>
                🔧 Mode de Configuration
              </Typography>

              <FormControl component="fieldset">
                <RadioGroup
                  value={configMode}
                  onChange={(e) =>
                    handleConfigModeChange(e.target.value as 'preconfigured' | 'manual')
                  }
                  sx={{ gap: 2 }}
                >
                  <FormControlLabel
                    value="preconfigured"
                    control={
                      <Radio
                        sx={{
                          color: 'rgba(255, 255, 255, 0.7)',
                          '&.Mui-checked': {
                            color: agentColor.primary,
                          },
                        }}
                      />
                    }
                    label={
                      <Box>
                        <Typography
                          sx={{ fontSize: '16px', fontWeight: 600, color: '#FFF', mb: 0.5 }}
                        >
                          📋 Utiliser un compte pré-configuré
                        </Typography>
                        <Typography sx={{ fontSize: '14px', color: 'rgba(255, 255, 255, 0.7)' }}>
                          Sélectionnez parmi vos comptes Slack déjà configurés
                        </Typography>
                      </Box>
                    }
                  />

                  <FormControlLabel
                    value="manual"
                    control={
                      <Radio
                        sx={{
                          color: 'rgba(255, 255, 255, 0.7)',
                          '&.Mui-checked': {
                            color: agentColor.primary,
                          },
                        }}
                      />
                    }
                    label={
                      <Box>
                        <Typography
                          sx={{ fontSize: '16px', fontWeight: 600, color: '#FFF', mb: 0.5 }}
                        >
                          ⚙️ Configuration manuelle
                        </Typography>
                        <Typography sx={{ fontSize: '14px', color: 'rgba(255, 255, 255, 0.7)' }}>
                          Configurez un nouveau compte Slack manuellement
                        </Typography>
                      </Box>
                    }
                  />
                </RadioGroup>
              </FormControl>
            </Box>

            {/* Section Comptes Pré-configurés */}
            <ConditionalComponent isValid={configMode === 'preconfigured'}>
              <Box
                sx={{
                  background: 'rgba(255, 255, 255, 0.02)',
                  border: '2px solid rgba(255, 255, 255, 0.08)',
                  borderRadius: '16px',
                  padding: 3.5,
                  mb: 3,
                }}
              >
                <Typography sx={{ fontSize: '18px', fontWeight: 700, mb: 2, color: '#FFF' }}>
                  📋 Comptes Slack Pré-configurés
                </Typography>
                <Typography sx={{ fontSize: '14px', color: 'rgba(255, 255, 255, 0.7)', mb: 2 }}>
                  Sélectionnez un compte déjà configuré dans votre organisation.
                </Typography>

                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                  {preconfiguredSlackAccounts.map((account) => (
                    <Box
                      key={account.id}
                      onClick={() => handleAccountSelect(account)}
                      sx={{
                        position: 'relative',
                        overflow: 'hidden',
                        padding: 3,
                        background:
                          configData.selectedAccountId === account.id
                            ? `linear-gradient(135deg, ${agentColor.primary}15, ${agentColor.primary}08)`
                            : 'rgba(255, 255, 255, 0.03)',
                        backdropFilter: 'blur(20px)',
                        WebkitBackdropFilter: 'blur(20px)',
                        border:
                          configData.selectedAccountId === account.id
                            ? `2px solid ${agentColor.primary}`
                            : '2px solid rgba(255, 255, 255, 0.1)',
                        borderRadius: '12px',
                        cursor: 'pointer',
                        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                        isolation: 'isolate',
                        willChange: 'transform',
                        '&:hover': {
                          background:
                            configData.selectedAccountId === account.id
                              ? `linear-gradient(135deg, ${agentColor.primary}18, ${agentColor.primary}10)`
                              : 'rgba(255, 255, 255, 0.06)',
                          borderColor: `${agentColor.primary}66`,
                          transform: 'translateY(-2px)',
                          boxShadow:
                            configData.selectedAccountId === account.id
                              ? `0 6px 20px ${agentColor.glow}33`
                              : `0 6px 20px ${agentColor.glow}22`,
                          '& .shine-effect': {
                            transform: 'translateX(100%)',
                          },
                        },
                      }}
                    >
                      {/* Shine effect */}
                      <Box
                        className="shine-effect"
                        sx={{
                          position: 'absolute',
                          inset: 0,
                          background:
                            'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.15), transparent)',
                          transform: 'translateX(-100%)',
                          transition: 'transform 0.7s ease-out',
                          pointerEvents: 'none',
                        }}
                      />

                      <Box sx={{ position: 'relative', zIndex: 1 }}>
                        <Box
                          sx={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'flex-start',
                            mb: 1,
                          }}
                        >
                          <Typography sx={{ fontSize: '16px', fontWeight: 600, color: '#FFF' }}>
                            {account.name}
                          </Typography>

                          <ConditionalComponent
                            isValid={configData.selectedAccountId === account.id}
                          >
                            <Box
                              sx={{
                                padding: '4px 8px',
                                background: agentColor.primary,
                                borderRadius: '6px',
                                fontSize: '12px',
                                fontWeight: 600,
                                color: '#000',
                              }}
                            >
                              Sélectionné
                            </Box>
                          </ConditionalComponent>
                        </Box>
                        <Typography
                          sx={{ fontSize: '14px', color: 'rgba(255, 255, 255, 0.7)', mb: 1 }}
                        >
                          Workspace: {account.workspace}
                        </Typography>
                        <Typography sx={{ fontSize: '12px', color: 'rgba(255, 255, 255, 0.5)' }}>
                          Canal: {account.defaultChannel}
                        </Typography>
                        <ConditionalComponent isValid={configData.selectedAccountId === account.id}>
                          <Alert
                            severity="success"
                            sx={{
                              mt: 2,
                              background: 'rgba(76, 175, 80, 0.1)',
                              border: '1px solid rgba(76, 175, 80, 0.3)',
                              color: '#FFF',
                              position: 'relative',
                              zIndex: 1,
                            }}
                          >
                            Compte sélectionné avec succès ! Le token OAuth et le canal par défaut
                            ont été configurés automatiquement.
                          </Alert>
                        </ConditionalComponent>
                      </Box>
                    </Box>
                  ))}
                </Box>
              </Box>
            </ConditionalComponent>

            {/* Section Configuration Manuelle */}

            <ConditionalComponent isValid={configMode === 'manual'}>
              <Box
                sx={{
                  background: 'rgba(255, 255, 255, 0.02)',
                  border: '2px solid rgba(255, 255, 255, 0.08)',
                  borderRadius: '16px',
                  padding: 3.5,
                }}
              >
                <Typography sx={{ fontSize: '18px', fontWeight: 700, mb: 3, color: '#FFF' }}>
                  ⚙️ Configuration Manuelle
                </Typography>

                <Box sx={{ mb: 2.5 }}>
                  <Typography sx={{ fontSize: '15px', fontWeight: 700, mb: 1, color: '#FFF' }}>
                    Token OAuth Slack <span style={{ color: '#ef4444' }}>*</span>
                  </Typography>
                  <TextField
                    fullWidth
                    placeholder="xoxb-xxxxxxxxxxxx-xxxxxxxxxxxxxxxxxxxxxxxx"
                    value={configData.oauthToken || ''}
                    onChange={(e) => updateConfig('oauthToken', e.target.value)}
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        background: 'rgba(255, 255, 255, 0.03)',
                        borderRadius: '12px',
                        '& fieldset': { borderColor: 'rgba(255, 255, 255, 0.1)' },
                        '&:hover fieldset': { borderColor: `${agentColor.primary}66` },
                        '&.Mui-focused fieldset': { borderColor: agentColor.primary },
                      },
                      '& .MuiOutlinedInput-input': { color: '#FFF' },
                    }}
                  />
                  <Typography
                    sx={{ fontSize: '13px', color: 'rgba(255, 255, 255, 0.65)', mt: 0.75 }}
                  >
                    Token OAuth commençant par &ldquoxoxb-&ldquo récupéré depuis la section &ldquoOAuth Tokens&ldquo de
                    votre application Slack
                  </Typography>
                </Box>
                {/* Bouton de génération de webhook */}
                <Box sx={{ mb: 2.5 }}>
                  <Typography sx={{ fontSize: '15px', fontWeight: 700, mb: 1, color: '#FFF' }}>
                    Génération du Webhook URL
                  </Typography>
                  <Button
                    variant="outlined"
                    onClick={generateWebhookUrl}
                    disabled={!configData.oauthToken || isGeneratingWebhook}
                    sx={{
                      background: 'rgba(255, 255, 255, 0.03)',
                      border: `2px solid ${agentColor.primary}66`,
                      color: '#FFF',
                      borderRadius: '12px',
                      padding: '12px 24px',
                      '&:hover': {
                        background: `${agentColor.primary}22`,
                        borderColor: agentColor.primary,
                      },
                      '&:disabled': {
                        borderColor: 'rgba(255, 255, 255, 0.1)',
                        color: 'rgba(255, 255, 255, 0.3)',
                      },
                    }}
                  >
                    {isGeneratingWebhook ? 'Génération en cours...' : 'Générer le Webhook URL'}
                  </Button>
                  <Typography
                    sx={{ fontSize: '13px', color: 'rgba(255, 255, 255, 0.65)', mt: 0.75 }}
                  >
                    Génère automatiquement l&apos;URL de webhook à partir de votre token OAuth
                  </Typography>
                </Box>

                {/* Affichage du webhook généré */}
                <ConditionalComponent isValid={!!generatedWebhook}>
                  <Box sx={{ mb: 2.5 }}>
                    <Alert
                      severity="success"
                      sx={{
                        mb: 2,
                        background: 'rgba(76, 175, 80, 0.1)',
                        border: '1px solid rgba(76, 175, 80, 0.3)',
                        color: '#FFF',
                      }}
                    >
                      Webhook URL généré avec succès !
                    </Alert>
                    <Typography sx={{ fontSize: '15px', fontWeight: 700, mb: 1, color: '#FFF' }}>
                      Webhook URL Généré
                    </Typography>
                    <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
                      <TextField
                        fullWidth
                        value={generatedWebhook}
                        InputProps={{ readOnly: true }}
                        sx={{
                          '& .MuiOutlinedInput-root': {
                            background: 'rgba(255, 255, 255, 0.03)',
                            borderRadius: '12px',
                            '& fieldset': { borderColor: 'rgba(76, 175, 80, 0.5)' },
                          },
                          '& .MuiOutlinedInput-input': {
                            color: '#FFF',
                            fontFamily: 'monospace',
                            fontSize: '14px',
                          },
                        }}
                      />
                      <Button
                        variant="outlined"
                        onClick={() => copyToClipboard(generatedWebhook)}
                        sx={{
                          background: 'rgba(255, 255, 255, 0.03)',
                          border: '2px solid rgba(255, 255, 255, 0.2)',
                          color: '#FFF',
                          borderRadius: '12px',
                          minWidth: '100px',
                          '&:hover': {
                            background: 'rgba(255, 255, 255, 0.1)',
                          },
                        }}
                      >
                        Copier
                      </Button>
                    </Box>
                  </Box>
                </ConditionalComponent>
              </Box>
            </ConditionalComponent>
          </>
        );

      default:
        return (
          <Box
            sx={{
              background: 'rgba(255, 255, 255, 0.02)',
              border: '2px solid rgba(255, 255, 255, 0.08)',
              borderRadius: '16px',
              padding: 4,
              textAlign: 'center',
            }}
          >
            <Box sx={{ fontSize: '48px', mb: 2 }}>{activeTab.icon}</Box>
            <Typography sx={{ fontSize: '18px', fontWeight: 700, mb: 1, color: '#FFF' }}>
              Configuration de {activeTab.title}
            </Typography>
            <Typography sx={{ fontSize: '15px', color: 'rgba(255, 255, 255, 0.8)' }}>
              Les instructions de configuration pour cette intégration seront ajoutées
              prochainement.
            </Typography>
          </Box>
        );
    }
  };

  return (
    <Box sx={{ maxWidth: '900px', margin: '0 auto' }}>
      {/* Tabs */}
      <Box
        sx={{
          display: 'flex',
          gap: 1,
          mb: 3,
          pb: 1,
          borderBottom: `2px solid ${agentColor.primary}22`,
          overflowX: 'auto',
          '&::-webkit-scrollbar': { height: '6px' },
          '&::-webkit-scrollbar-thumb': {
            background: agentColor.primary,
            borderRadius: '3px',
          },
        }}
      >
        {selectedIntegrations.map((integration) => (
          <Box
            key={integration.id}
            onClick={() => setActiveIntegrationTab(integration.id)}
            sx={{
              padding: '12px 24px',
              background:
                activeIntegrationTab === integration.id
                  ? `linear-gradient(135deg, ${agentColor.primary}, ${agentColor.primary}cc)`
                  : 'rgba(255, 255, 255, 0.03)',
              border: `2px solid ${activeIntegrationTab === integration.id ? agentColor.primary : 'rgba(255, 255, 255, 0.08)'}`,
              borderRadius: '12px 12px 0 0',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              display: 'flex',
              alignItems: 'center',
              gap: 1.5,
              whiteSpace: 'nowrap',
              '&:hover': {
                borderColor: `${agentColor.primary}66`,
                background:
                  activeIntegrationTab === integration.id
                    ? `linear-gradient(135deg, ${agentColor.primary}, ${agentColor.primary}cc)`
                    : 'rgba(255, 255, 255, 0.06)',
              },
            }}
          >
            <Box sx={{ fontSize: '20px' }}>{integration.icon}</Box>
            <Typography sx={{ fontSize: '15px', fontWeight: 600, color: '#FFF' }}>
              {integration.title}
            </Typography>
          </Box>
        ))}
      </Box>

      {/* Tab Content */}
      {renderGuideAndForm()}
    </Box>
  );
};
