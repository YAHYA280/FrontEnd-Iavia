import React from 'react';
import { Box, Typography, TextField, Select, MenuItem } from '@mui/material';
import type { IntegrationConfigStepProps } from './types';

export const StepIntegrationConfig: React.FC<IntegrationConfigStepProps> = ({
  selectedIntegrations,
  activeIntegrationTab,
  setActiveIntegrationTab,
  integrationConfigs,
  setIntegrationConfigs,
  agentColor,
}) => {
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

  const activeTab = selectedIntegrations.find(i => i.id === activeIntegrationTab) || selectedIntegrations[0];
  const configData = integrationConfigs[activeTab.id] || {};

  const updateConfig = (field: string, value: string) => {
    setIntegrationConfigs(prev => ({
      ...prev,
      [activeTab.id]: {
        ...prev[activeTab.id],
        [field]: value
      }
    }));
  };

  const renderGuideAndForm = () => {
    switch (activeTab.id) {
      case 'whatsapp':
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
                  Guide de configuration WhatsApp Business
                </Typography>
              </Box>
              <Typography sx={{ fontSize: '15px', color: 'rgba(255, 255, 255, 0.85)', mb: 2.5, lineHeight: 1.6 }}>
                Pour connecter WhatsApp Business à IAVIA, vous devez créer une application Meta et obtenir vos identifiants API.
              </Typography>

              {/* Steps */}
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                {[
                  'Créez une application sur Meta for Developers',
                  'Activez WhatsApp Business API dans votre application',
                  'Récupérez votre Phone Number ID, WhatsApp Business Account ID et Access Token',
                  'Configurez le webhook avec l\'URL fournie par IAVIA'
                ].map((step, index) => (
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
                    <Typography sx={{ fontSize: '15px', color: 'rgba(255, 255, 255, 0.85)', pt: 0.5, lineHeight: 1.5 }}>
                      {step}
                    </Typography>
                  </Box>
                ))}
              </Box>
            </Box>

            {/* Form */}
            <Box
              sx={{
                background: 'rgba(255, 255, 255, 0.02)',
                border: '2px solid rgba(255, 255, 255, 0.08)',
                borderRadius: '16px',
                padding: 3.5,
              }}
            >
              <Box sx={{ mb: 2.5 }}>
                <Typography sx={{ fontSize: '15px', fontWeight: 700, mb: 1, color: '#FFF' }}>
                  Phone Number ID <span style={{ color: '#ef4444' }}>*</span>
                </Typography>
                <TextField
                  fullWidth
                  placeholder="123456789012345"
                  value={configData.phoneNumberId || ''}
                  onChange={(e) => updateConfig('phoneNumberId', e.target.value)}
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
                <Typography sx={{ fontSize: '13px', color: 'rgba(255, 255, 255, 0.65)', mt: 0.75 }}>
                  ID du numéro de téléphone WhatsApp Business
                </Typography>
              </Box>

              <Box sx={{ mb: 2.5 }}>
                <Typography sx={{ fontSize: '15px', fontWeight: 700, mb: 1, color: '#FFF' }}>
                  WhatsApp Business Account ID <span style={{ color: '#ef4444' }}>*</span>
                </Typography>
                <TextField
                  fullWidth
                  placeholder="987654321098765"
                  value={configData.accountId || ''}
                  onChange={(e) => updateConfig('accountId', e.target.value)}
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
                <Typography sx={{ fontSize: '13px', color: 'rgba(255, 255, 255, 0.65)', mt: 0.75 }}>
                  ID de votre compte WhatsApp Business
                </Typography>
              </Box>

              <Box sx={{ mb: 2.5 }}>
                <Typography sx={{ fontSize: '15px', fontWeight: 700, mb: 1, color: '#FFF' }}>
                  Access Token <span style={{ color: '#ef4444' }}>*</span>
                </Typography>
                <TextField
                  fullWidth
                  placeholder="EAAxxxxxxxxxxxxxxxxxxxxxxxxx"
                  value={configData.accessToken || ''}
                  onChange={(e) => updateConfig('accessToken', e.target.value)}
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
                <Typography sx={{ fontSize: '13px', color: 'rgba(255, 255, 255, 0.65)', mt: 0.75 }}>
                  Token d&apos;accès permanent généré depuis Meta for Developers
                </Typography>
              </Box>

              <Box>
                <Typography sx={{ fontSize: '15px', fontWeight: 700, mb: 1, color: '#FFF' }}>
                  Webhook Verify Token <span style={{ color: '#ef4444' }}>*</span>
                </Typography>
                <TextField
                  fullWidth
                  placeholder="mon_token_secret_123"
                  value={configData.verifyToken || ''}
                  onChange={(e) => updateConfig('verifyToken', e.target.value)}
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
                <Typography sx={{ fontSize: '13px', color: 'rgba(255, 255, 255, 0.65)', mt: 0.75 }}>
                  Token de vérification pour sécuriser votre webhook
                </Typography>
              </Box>
            </Box>
          </>
        );

      case 'freshdesk':
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
                <Box sx={{ fontSize: '28px' }}>📋</Box>
                <Typography sx={{ fontSize: '20px', fontWeight: 700, color: '#FFF' }}>
                  Guide de configuration Freshdesk
                </Typography>
              </Box>
              <Typography sx={{ fontSize: '15px', color: 'rgba(255, 255, 255, 0.85)', mb: 2.5, lineHeight: 1.6 }}>
                Pour connecter votre compte Freshdesk à IAVIA, vous aurez besoin de votre domaine Freshdesk et d&apos;une clé API.
              </Typography>

              {/* Steps */}
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                {[
                  'Connectez-vous à votre compte Freshdesk',
                  'Accédez à Profil → Paramètres de profil',
                  'Dans la section Clé API, copiez votre clé ou générez-en une nouvelle',
                  'Collez votre domaine et votre clé API dans les champs ci-dessous'
                ].map((step, index) => (
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
                    <Typography sx={{ fontSize: '15px', color: 'rgba(255, 255, 255, 0.85)', pt: 0.5, lineHeight: 1.5 }}>
                      {step}
                    </Typography>
                  </Box>
                ))}
              </Box>
            </Box>

            {/* Form */}
            <Box
              sx={{
                background: 'rgba(255, 255, 255, 0.02)',
                border: '2px solid rgba(255, 255, 255, 0.08)',
                borderRadius: '16px',
                padding: 3.5,
              }}
            >
              <Box sx={{ mb: 2.5 }}>
                <Typography sx={{ fontSize: '15px', fontWeight: 700, mb: 1, color: '#FFF' }}>
                  Domaine Freshdesk <span style={{ color: '#ef4444' }}>*</span>
                </Typography>
                <TextField
                  fullWidth
                  placeholder="votreentreprise.freshdesk.com"
                  value={configData.domain || ''}
                  onChange={(e) => updateConfig('domain', e.target.value)}
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
                <Typography sx={{ fontSize: '13px', color: 'rgba(255, 255, 255, 0.65)', mt: 0.75 }}>
                  Votre domaine Freshdesk (sans https://)
                </Typography>
              </Box>

              <Box sx={{ mb: 2.5 }}>
                <Typography sx={{ fontSize: '15px', fontWeight: 700, mb: 1, color: '#FFF' }}>
                  Clé API Freshdesk <span style={{ color: '#ef4444' }}>*</span>
                </Typography>
                <TextField
                  fullWidth
                  placeholder="xxxxxxxxxxxxxxxxxxxx"
                  value={configData.apiKey || ''}
                  onChange={(e) => updateConfig('apiKey', e.target.value)}
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
                <Typography sx={{ fontSize: '13px', color: 'rgba(255, 255, 255, 0.65)', mt: 0.75 }}>
                  Trouvez votre clé API dans Profil {'>'} Paramètres de votre compte Freshdesk
                </Typography>
              </Box>

              <Box>
                <Typography sx={{ fontSize: '15px', fontWeight: 700, mb: 1, color: '#FFF' }}>
                  Groupe par défaut (optionnel)
                </Typography>
                <Select
                  fullWidth
                  value={configData.defaultGroup || 'none'}
                  onChange={(e) => updateConfig('defaultGroup', e.target.value)}
                  sx={{
                    background: 'rgba(255, 255, 255, 0.03)',
                    borderRadius: '12px',
                    color: '#FFF',
                    '& .MuiOutlinedInput-notchedOutline': { borderColor: 'rgba(255, 255, 255, 0.1)' },
                    '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: `${agentColor.primary}66` },
                    '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: agentColor.primary },
                  }}
                >
                  <MenuItem value="none">Aucun groupe spécifique</MenuItem>
                  <MenuItem value="support">Support Technique</MenuItem>
                  <MenuItem value="customer-service">Service Client</MenuItem>
                  <MenuItem value="billing">Facturation</MenuItem>
                </Select>
                <Typography sx={{ fontSize: '13px', color: 'rgba(255, 255, 255, 0.65)', mt: 0.75 }}>
                  Les tickets créés par l&apos;agent seront assignés à ce groupe
                </Typography>
              </Box>
            </Box>
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
              Les instructions de configuration pour cette intégration seront ajoutées prochainement.
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
            borderRadius: '3px'
          },
        }}
      >
        {selectedIntegrations.map((integration) => (
          <Box
            key={integration.id}
            onClick={() => setActiveIntegrationTab(integration.id)}
            sx={{
              padding: '12px 24px',
              background: activeIntegrationTab === integration.id
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
                background: activeIntegrationTab === integration.id
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
