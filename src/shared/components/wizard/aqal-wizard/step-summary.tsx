import React from 'react';
import { Box, Typography, Chip } from '@mui/material';
import { StepResumeLegalProps } from './types';
import ConditionalComponent from '../../conditionalComponent';

export const StepResumeLegal: React.FC<StepResumeLegalProps> = ({
  wizardData,
  integrationConfigs,
  agentColor,
}) => {
  const SummaryCard = ({
    icon,
    title,
    status = 'completed',
    children,
  }: {
    icon: string;
    title: string;
    status?: 'completed' | 'pending' | 'error';
    children: React.ReactNode;
  }) => (
    <Box
      sx={{
        position: 'relative',
        overflow: 'hidden',
        background:
          status === 'completed' ? 'rgba(255, 255, 255, 0.03)' : 'rgba(255, 255, 255, 0.02)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        border:
          status === 'completed'
            ? '2px solid rgba(255, 255, 255, 0.08)'
            : '2px solid rgba(255, 255, 255, 0.04)',
        borderRadius: '16px',
        padding: 2.5,
        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        isolation: 'isolate',
        opacity: status === 'completed' ? 1 : 0.6,
        '&:hover': {
          borderColor: `${agentColor.primary}66`,
          transform: 'translateY(-4px)',
          boxShadow: `0 8px 24px ${agentColor.glow}`,
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
          background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.15), transparent)',
          transform: 'translateX(-100%)',
          transition: 'transform 0.7s ease-out',
          pointerEvents: 'none',
        }}
      />

      {/* Status Badge */}
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
          <Box sx={{ fontSize: '24px' }}>{icon}</Box>
          <Typography sx={{ fontSize: '17px', fontWeight: 700, color: '#FFF' }}>{title}</Typography>
        </Box>
        <Chip
          label={status === 'completed' ? '✓ Complété' : 'En attente'}
          size="small"
          sx={{
            background:
              status === 'completed' ? `${agentColor.primary}25` : 'rgba(255, 255, 255, 0.1)',
            color: status === 'completed' ? agentColor.primary : 'rgba(255, 255, 255, 0.5)',
            border: `1px solid ${status === 'completed' ? agentColor.primary : 'rgba(255, 255, 255, 0.2)'}`,
            fontWeight: 600,
            fontSize: '11px',
          }}
        />
      </Box>

      <Box sx={{ position: 'relative', zIndex: 1 }}>{children}</Box>
    </Box>
  );

  if (!wizardData) {
    return (
      <Box sx={{ maxWidth: '950px', margin: '0 auto', textAlign: 'center', py: 4 }}>
        <Typography sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>
          Aucune donnée disponible pour le résumé
        </Typography>
      </Box>
    );
  }

  // Étape 1: Pays
  const getCountrySummary = () => {
    if (!wizardData.country) return null;

    return {
      status: 'completed' as const,
      data: {
        country: wizardData.country === 'morocco' ? 'Maroc' : 'France',
        flag: wizardData.country === 'morocco' ? '🇲🇦' : '🇫🇷',
      },
    };
  };

  // Étape 2: Documents
  const getDocumentsSummary = () => {
    if (!wizardData.documents) return null;

    const documents = wizardData.documents as Record<string, any>;
    const documentEntries = Object.entries(documents);

    const documentCount = documentEntries.filter(([_, doc]) => doc?.file !== undefined).length;

    const totalRequired = documentEntries.filter(([_, doc]) => doc?.required === true).length;

    const uploadedRequired = documentEntries.filter(
      ([_, doc]) => doc?.required === true && doc?.file !== undefined
    ).length;

    return {
      status: uploadedRequired >= totalRequired ? ('completed' as const) : ('pending' as const),
      data: {
        count: documentCount,
        totalRequired,
        uploadedRequired,
        documentNames: documentEntries
          .filter(([_, doc]) => doc?.file !== undefined)
          .map(([name, _]) => name)
          .slice(0, 3),
      },
    };
  };

  // Étape 3: Informations entreprise
  const getCompanyInfoSummary = () => {
    if (!wizardData.companyInfo?.data) {
      return {
        status: 'pending' as const,
        data: null,
      };
    }

    const data = wizardData.companyInfo.data;
    const fields = Object.keys(data).filter(
      (key) => data[key] && data[key].toString().trim() !== '' && data[key] !== 'Non spécifié'
    );

    // Extraire les champs principaux selon le pays
    const mainFields =
      wizardData.country === 'morocco'
        ? {
            raisonSociale: data.raisonSociale || 'Non spécifié',
            formeJuridique: data.formeJuridique || 'Non spécifié',
            activite: data.activite || 'Non spécifié',
            rc: data.rc || 'Non spécifié',
            ice: data.ice || 'Non spécifié',
            capital: data.capital || 'Non spécifié',
            adresse: data.adresse || 'Non spécifié',
            gerants: data.gerants || 'Non spécifié',
          }
        : {
            raisonSociale: data.denomination || 'Non spécifié',
            formeJuridique: data.formeJuridique || 'Non spécifié',
            activite: data.activite || 'Non spécifié',
            siren: data.siren || 'Non spécifié',
            naf: data.naf || 'Non spécifié',
            capital: data.capital || 'Non spécifié',
            adresse: data.adresse || 'Non spécifié',
            dirigeants: data.dirigeants || 'Non spécifié',
          };

    return {
      status: fields.length > 5 ? ('completed' as const) : ('pending' as const),
      data: {
        fieldCount: fields.length,
        mainFields,
        allFields: data,
      },
    };
  };

  // Étape 4: Intégrations de communication
  const getCommunicationSummary = () => {
    const channels = wizardData.communicationChannels || [];

    return {
      status: channels.length > 0 ? ('completed' as const) : ('pending' as const),
      data: {
        channels: channels.map((channel) => ({
          id: channel,
          name: channel === 'slack' ? 'Slack' : channel === 'teams' ? 'Microsoft Teams' : 'Email',
          icon: channel === 'slack' ? '💬' : channel === 'teams' ? '🏢' : '📧',
        })),
      },
    };
  };

  // Étape 5: Configuration des intégrations
  const getIntegrationConfigSummary = () => {
    const selectedIntegrations = wizardData.communicationChannels || [];

    const configuredAccounts = Object.entries(integrationConfigs)
      .filter(([key, config]) => {
        if (!selectedIntegrations.includes(key)) return false;

        if (!config) return false;

        switch (key) {
          case 'slack':
            return config.oauthToken && config.defaultChannel;
          case 'teams':
            return config.webhookUrl;
          default:
            return true;
        }
      })
      .map(([key, _]) => key);

    const hasConfig =
      selectedIntegrations.length > 0 && configuredAccounts.length === selectedIntegrations.length;

    return {
      status:
        selectedIntegrations.length === 0 || hasConfig
          ? ('completed' as const)
          : ('pending' as const),
      data: {
        configuredAccounts,
        selectedIntegrations,
        configs: integrationConfigs,
      },
    };
  };

  // Étape 6: Configuration des notifications
  const getNotificationSummary = () => {
    const hasChannelConfig =
      wizardData.notificationConfig?.channel && wizardData.notificationConfig?.channelInfo;

    const hasActiveNotifications =
      wizardData.notificationConfig?.notifications &&
      Object.values(wizardData.notificationConfig.notifications).some(
        (notif: any) => notif?.enabled === true
      );

    const isConfigured = hasChannelConfig || hasActiveNotifications;

    if (!isConfigured) {
      return {
        status: 'pending' as const,
        data: null,
      };
    }

    return {
      status: 'completed' as const,
      data: {
        channel: wizardData.notificationConfig?.channel || 'Non spécifié',
        channelInfo: wizardData.notificationConfig?.channelInfo || '',
        language: wizardData.notificationConfig?.language || 'fr',
        reminderCount: wizardData.notificationConfig?.reminderCount || 3,
        excludeWeekends: wizardData.notificationConfig?.excludeWeekends || false,
        activeNotifications: wizardData.notificationConfig?.notifications
          ? Object.entries(wizardData.notificationConfig.notifications)
              .filter(([_, notif]: [string, any]) => notif?.enabled === true)
              .map(([key, _]) => key)
          : [],
      },
    };
  };

  const summaryData = {
    country: getCountrySummary(),
    documents: getDocumentsSummary(),
    companyInfo: getCompanyInfoSummary(),
    communications: getCommunicationSummary(),
    integrationConfig: getIntegrationConfigSummary(),
    notifications: getNotificationSummary(),
  };

  const totalSteps = Object.values(summaryData).filter(Boolean).length;
  const completedSteps = Object.values(summaryData).filter(
    (item) => item && item.status === 'completed'
  ).length;
  const completionPercentage = totalSteps > 0 ? Math.round((completedSteps / totalSteps) * 100) : 0;

  const renderCompanyInfoContent = () => {
    const companyInfo = summaryData.companyInfo;

    if (!companyInfo || !companyInfo.data) {
      return (
        <Typography
          sx={{ fontSize: '14px', color: 'rgba(255, 255, 255, 0.5)', fontStyle: 'italic' }}
        >
          Aucune information d&apos;entreprise renseignée
        </Typography>
      );
    }

    const { mainFields, fieldCount } = companyInfo.data;

    return (
      <>
        {/* Champs principaux */}
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', md: 'repeat(3, 1fr)' },
            gap: 2,
            mb: 2,
          }}
        >
          <Box>
            <Typography sx={{ fontSize: '12px', color: 'rgba(255, 255, 255, 0.6)', mb: 0.5 }}>
              Raison sociale
            </Typography>
            <Typography sx={{ fontSize: '14px', fontWeight: 600, color: '#FFF' }}>
              {mainFields.raisonSociale}
            </Typography>
          </Box>

          <Box>
            <Typography sx={{ fontSize: '12px', color: 'rgba(255, 255, 255, 0.6)', mb: 0.5 }}>
              Forme juridique
            </Typography>
            <Typography sx={{ fontSize: '14px', fontWeight: 600, color: '#FFF' }}>
              {mainFields.formeJuridique}
            </Typography>
          </Box>

          <Box>
            <Typography sx={{ fontSize: '12px', color: 'rgba(255, 255, 255, 0.6)', mb: 0.5 }}>
              Activité principale
            </Typography>
            <Typography sx={{ fontSize: '14px', fontWeight: 600, color: '#FFF' }}>
              {mainFields.activite}
            </Typography>
          </Box>

          {wizardData.country === 'morocco' ? (
            <>
              <Box>
                <Typography sx={{ fontSize: '12px', color: 'rgba(255, 255, 255, 0.6)', mb: 0.5 }}>
                  RC
                </Typography>
                <Typography sx={{ fontSize: '14px', fontWeight: 600, color: '#FFF' }}>
                  {mainFields.rc}
                </Typography>
              </Box>

              <Box>
                <Typography sx={{ fontSize: '12px', color: 'rgba(255, 255, 255, 0.6)', mb: 0.5 }}>
                  ICE
                </Typography>
                <Typography sx={{ fontSize: '14px', fontWeight: 600, color: '#FFF' }}>
                  {mainFields.ice}
                </Typography>
              </Box>
            </>
          ) : (
            <>
              <Box>
                <Typography sx={{ fontSize: '12px', color: 'rgba(255, 255, 255, 0.6)', mb: 0.5 }}>
                  SIREN
                </Typography>
                <Typography sx={{ fontSize: '14px', fontWeight: 600, color: '#FFF' }}>
                  {mainFields.siren}
                </Typography>
              </Box>

              <Box>
                <Typography sx={{ fontSize: '12px', color: 'rgba(255, 255, 255, 0.6)', mb: 0.5 }}>
                  Code NAF/APE
                </Typography>
                <Typography sx={{ fontSize: '14px', fontWeight: 600, color: '#FFF' }}>
                  {mainFields.naf}
                </Typography>
              </Box>
            </>
          )}

          <Box>
            <Typography sx={{ fontSize: '12px', color: 'rgba(255, 255, 255, 0.6)', mb: 0.5 }}>
              Capital social
            </Typography>
            <Typography sx={{ fontSize: '14px', fontWeight: 600, color: '#FFF' }}>
              {mainFields.capital}
            </Typography>
          </Box>

          <Box>
            <Typography sx={{ fontSize: '12px', color: 'rgba(255, 255, 255, 0.6)', mb: 0.5 }}>
              Adresse
            </Typography>
            <Typography sx={{ fontSize: '14px', fontWeight: 600, color: '#FFF' }}>
              {mainFields.adresse}
            </Typography>
          </Box>

          <Box>
            <Typography sx={{ fontSize: '12px', color: 'rgba(255, 255, 255, 0.6)', mb: 0.5 }}>
              {wizardData.country === 'morocco' ? 'Gérants' : 'Dirigeants'}
            </Typography>
            <Typography sx={{ fontSize: '14px', fontWeight: 600, color: '#FFF' }}>
              {wizardData.country === 'morocco' ? mainFields.gerants : mainFields.dirigeants}
            </Typography>
          </Box>
        </Box>

        <Box sx={{ textAlign: 'center', mt: 1 }}>
          <Typography sx={{ fontSize: '12px', color: 'rgba(255, 255, 255, 0.5)' }}>
            {fieldCount} informations renseignées au total
          </Typography>
        </Box>
      </>
    );
  };

  const renderNotificationContent = () => {
    const notifications = summaryData.notifications;

    if (!notifications || !notifications.data) {
      return (
        <Typography
          sx={{ fontSize: '14px', color: 'rgba(255, 255, 255, 0.5)', fontStyle: 'italic' }}
        >
          Aucune notification configurée
        </Typography>
      );
    }

    const { channel, channelInfo, language, reminderCount, activeNotifications } =
      notifications.data;

    return (
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography sx={{ fontSize: '12px', color: 'rgba(255, 255, 255, 0.6)' }}>
            Canal principal
          </Typography>
          <Typography sx={{ fontSize: '13px', fontWeight: 600, color: '#FFF' }}>
            {channel === 'slack'
              ? '💬 Slack'
              : channel === 'teams'
                ? '🏢 Teams'
                : channel === 'mail'
                  ? '📧 Email'
                  : 'Non spécifié'}
          </Typography>
        </Box>

        <ConditionalComponent isValid={!!channelInfo}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography sx={{ fontSize: '12px', color: 'rgba(255, 255, 255, 0.6)' }}>
              Détails
            </Typography>
            <Typography
              sx={{
                fontSize: '13px',
                fontWeight: 600,
                color: '#FFF',
                maxWidth: '150px',
                textOverflow: 'ellipsis',
                overflow: 'hidden',
              }}
            >
              {channelInfo}
            </Typography>
          </Box>
        </ConditionalComponent>

        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography sx={{ fontSize: '12px', color: 'rgba(255, 255, 255, 0.6)' }}>
            Langue
          </Typography>
          <Typography sx={{ fontSize: '13px', fontWeight: 600, color: '#FFF' }}>
            {language === 'fr' ? '🇫🇷 Français' : language === 'ar' ? '🇲🇦 العربية' : '🇺🇸 English'}
          </Typography>
        </Box>

        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography sx={{ fontSize: '12px', color: 'rgba(255, 255, 255, 0.6)' }}>
            Rappels
          </Typography>
          <Typography sx={{ fontSize: '13px', fontWeight: 600, color: '#FFF' }}>
            {reminderCount} jour{reminderCount > 1 ? 's' : ''} avant
          </Typography>
        </Box>

        <ConditionalComponent isValid={activeNotifications.length > 0}>
          <Box>
            <Typography sx={{ fontSize: '12px', color: 'rgba(255, 255, 255, 0.6)', mb: 0.5 }}>
              Notifications activées
            </Typography>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
              {activeNotifications.map((notif: string) => (
                <Chip
                  key={notif}
                  label={notif.toUpperCase()}
                  size="small"
                  sx={{
                    background: `${agentColor.primary}25`,
                    color: '#FFF',
                    border: `1px solid ${agentColor.primary}33`,
                    fontSize: '10px',
                    height: '20px',
                  }}
                />
              ))}
            </Box>
          </Box>
        </ConditionalComponent>
      </Box>
    );
  };

  return (
    <Box sx={{ maxWidth: '950px', margin: '0 auto' }}>
      {/* Header avec progression globale */}
      <Box sx={{ textAlign: 'center', mb: 4 }}>
        <Box sx={{ fontSize: '64px', mb: 2 }}>⚖️</Box>
        <Typography sx={{ fontSize: '28px', fontWeight: 700, mb: 1, color: '#FFF' }}>
          Récapitulatif de votre configuration
        </Typography>
      </Box>

      {/* Grille de résumé détaillé */}
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', md: 'repeat(2, 1fr)' },
          gap: 2.5,
          mb: 3,
        }}
      >
        {/* Étape 1: Pays */}
        <ConditionalComponent isValid={!!summaryData.country}>
          <SummaryCard
            icon="🌍"
            title="1. Pays de juridiction"
            status={summaryData.country?.status || 'pending'}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Box sx={{ fontSize: '32px' }}>{summaryData.country?.data?.flag}</Box>
              <Box>
                <Typography sx={{ fontSize: '16px', fontWeight: 700, color: '#FFF', mb: 0.5 }}>
                  {summaryData.country?.data?.country}
                </Typography>
                <Typography sx={{ fontSize: '13px', color: 'rgba(255, 255, 255, 0.6)' }}>
                  Juridiction sélectionnée
                </Typography>
              </Box>
            </Box>
          </SummaryCard>
        </ConditionalComponent>

        {/* Étape 2: Documents */}
        <ConditionalComponent isValid={!!summaryData.documents}>
          <SummaryCard
            icon="📄"
            title="2. Documents administratifs"
            status={summaryData.documents?.status || 'pending'}
          >
            <Box>
              <Typography sx={{ fontSize: '16px', fontWeight: 700, color: '#FFF', mb: 1 }}>
                {summaryData.documents?.data?.count} document
                {summaryData.documents?.data?.count && summaryData.documents.data.count > 1
                  ? 's'
                  : ''}{' '}
                importé
                {summaryData.documents?.data?.count && summaryData.documents.data.count > 1
                  ? 's'
                  : ''}
              </Typography>

              <ConditionalComponent
                isValid={
                  !!summaryData.documents?.data?.documentNames &&
                  summaryData.documents.data.documentNames.length > 0
                }
              >
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 1 }}>
                  {summaryData.documents?.data?.documentNames.map((docName, index) => (
                    <Chip
                      key={index}
                      label={docName}
                      size="small"
                      sx={{
                        background: `${agentColor.primary}15`,
                        color: '#FFF',
                        border: `1px solid ${agentColor.primary}33`,
                        fontSize: '11px',
                        maxWidth: '120px',
                      }}
                    />
                  ))}

                  <ConditionalComponent
                    isValid={
                      !!summaryData.documents?.data?.count && summaryData.documents.data.count > 3
                    }
                  >
                    <Chip
                      label={`+${(summaryData.documents?.data?.count ?? 0) - 3}`}
                      size="small"
                      sx={{
                        background: 'rgba(255, 255, 255, 0.05)',
                        color: 'rgba(255, 255, 255, 0.6)',
                      }}
                    />
                  </ConditionalComponent>
                </Box>
              </ConditionalComponent>

              <Typography sx={{ fontSize: '12px', color: 'rgba(255, 255, 255, 0.6)' }}>
                {summaryData.documents?.data?.uploadedRequired}/
                {summaryData.documents?.data?.totalRequired} obligatoires
              </Typography>
            </Box>
          </SummaryCard>
        </ConditionalComponent>

        {/* Étape 3: Informations entreprise */}
        <ConditionalComponent isValid={!!summaryData.companyInfo}>
          <Box sx={{ gridColumn: { xs: '1', md: 'span 2' } }}>
            <SummaryCard
              icon="🏢"
              title="3. Informations de l'entreprise"
              status={summaryData.companyInfo?.status || 'pending'}
            >
              {renderCompanyInfoContent()}
            </SummaryCard>
          </Box>
        </ConditionalComponent>

        {/* Étape 4: Canaux de communication */}
        <ConditionalComponent isValid={!!summaryData.communications}>
          <SummaryCard
            icon="🔗"
            title="4. Canaux de communication"
            status={summaryData.communications?.status || 'pending'}
          >
            <ConditionalComponent
              isValid={
                !!summaryData.communications?.data?.channels &&
                summaryData.communications.data.channels.length > 0
              }
            >
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
                <Typography sx={{ fontSize: '13px', color: 'rgba(255, 255, 255, 0.7)' }}>
                  {summaryData.communications.data.channels.length} canal
                  {summaryData.communications.data.channels.length > 1 ? 'aux' : ''} configuré
                  {summaryData.communications.data.channels.length > 1 ? 's' : ''}
                </Typography>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                  {summaryData.communications.data.channels.map((channel) => (
                    <Box
                      key={channel.id}
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 1,
                        padding: '6px 12px',
                        background: `${agentColor.primary}15`,
                        border: `1px solid ${agentColor.primary}33`,
                        borderRadius: '8px',
                      }}
                    >
                      <Box sx={{ fontSize: '16px' }}>{channel.icon}</Box>
                      <Typography sx={{ fontSize: '12px', fontWeight: 600, color: '#FFF' }}>
                        {channel.name}
                      </Typography>
                    </Box>
                  ))}
                </Box>
              </Box>
            </ConditionalComponent>

            <ConditionalComponent
              isValid={
                !summaryData.communications?.data?.channels ||
                summaryData.communications.data.channels.length === 0
              }
            >
              <Typography
                sx={{ fontSize: '14px', color: 'rgba(255, 255, 255, 0.5)', fontStyle: 'italic' }}
              >
                Aucun canal configuré
              </Typography>
            </ConditionalComponent>
          </SummaryCard>
        </ConditionalComponent>

        {/* Étape 5: Configuration des intégrations */}
        <ConditionalComponent isValid={!!summaryData.integrationConfig}>
          <SummaryCard
            icon="⚙️"
            title="5. Configuration des intégrations"
            status={summaryData.integrationConfig?.status || 'pending'}
          >
            <ConditionalComponent
              isValid={
                !!summaryData.integrationConfig?.data?.selectedIntegrations &&
                summaryData.integrationConfig.data.selectedIntegrations.length > 0
              }
            >
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
                <Typography sx={{ fontSize: '13px', color: 'rgba(255, 255, 255, 0.7)' }}>
                  {summaryData.integrationConfig.data.configuredAccounts.length} sur{' '}
                  {summaryData.integrationConfig.data.selectedIntegrations.length} configurée
                  {summaryData.integrationConfig.data.configuredAccounts.length > 1 ? 's' : ''}
                </Typography>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                  {summaryData.integrationConfig.data.selectedIntegrations.map(
                    (integrationId: string) => {
                      const isConfigured =
                        summaryData.integrationConfig?.data?.configuredAccounts.includes(
                          integrationId
                        );
                      const config = summaryData.integrationConfig?.data?.configs?.[integrationId];

                      return (
                        <Box
                          key={integrationId}
                          sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            padding: '8px 12px',
                            background: isConfigured
                              ? `${agentColor.primary}15`
                              : 'rgba(255, 255, 255, 0.05)',
                            border: `1px solid ${isConfigured ? agentColor.primary : 'rgba(255, 255, 255, 0.1)'}33`,
                            borderRadius: '8px',
                            minWidth: '140px',
                          }}
                        >
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, mb: 0.5 }}>
                            <Typography sx={{ fontSize: '12px', fontWeight: 600, color: '#FFF' }}>
                              {integrationId === 'slack'
                                ? '💬 Slack'
                                : integrationId === 'teams'
                                  ? '🏢 Teams'
                                  : integrationId}
                            </Typography>
                            <ConditionalComponent isValid={isConfigured}>
                              <Box sx={{ fontSize: '10px' }}>✓</Box>
                            </ConditionalComponent>
                          </Box>
                          <ConditionalComponent isValid={config}>
                            <Typography
                              sx={{ fontSize: '10px', color: 'rgba(255, 255, 255, 0.5)' }}
                            >
                              {integrationId === 'slack' && config.defaultChannel
                                ? `#${config.defaultChannel}`
                                : integrationId === 'teams' && config.webhookUrl
                                  ? 'Webhook configuré'
                                  : 'Configuré'}
                            </Typography>
                          </ConditionalComponent>
                          <ConditionalComponent isValid={!isConfigured}>
                            <Typography
                              sx={{
                                fontSize: '10px',
                                color: 'rgba(255, 255, 255, 0.3)',
                                fontStyle: 'italic',
                              }}
                            >
                              Non configuré
                            </Typography>
                          </ConditionalComponent>
                        </Box>
                      );
                    }
                  )}
                </Box>
              </Box>
            </ConditionalComponent>

            <ConditionalComponent
              isValid={
                !summaryData.integrationConfig?.data?.selectedIntegrations ||
                summaryData.integrationConfig.data.selectedIntegrations.length === 0
              }
            >
              <Typography
                sx={{ fontSize: '14px', color: 'rgba(255, 255, 255, 0.5)', fontStyle: 'italic' }}
              >
                Aucune intégration sélectionnée
              </Typography>
            </ConditionalComponent>
          </SummaryCard>
        </ConditionalComponent>

        {/* Étape 6: Notifications */}
        <ConditionalComponent isValid={!!summaryData.notifications}>
          <SummaryCard
            icon="🔔"
            title="6. Paramètres de notification"
            status={summaryData.notifications?.status || 'pending'}
          >
            {renderNotificationContent()}
          </SummaryCard>
        </ConditionalComponent>
      </Box>

      {/* Section d'action finale */}
      <Box
        sx={{
          position: 'relative',
          overflow: 'hidden',
          background: `linear-gradient(135deg, ${agentColor.primary}15, ${agentColor.primary}08)`,
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          border: `2px solid ${agentColor.primary}`,
          borderRadius: '20px',
          padding: 4,
          textAlign: 'center',
          isolation: 'isolate',
          mt: 4,
        }}
      >
        <Box sx={{ fontSize: '56px', mb: 2 }}>✨</Box>
        <Typography sx={{ fontSize: '24px', fontWeight: 700, mb: 1.5, color: '#FFF' }}>
          Configuration {completionPercentage === 100 ? 'terminée' : 'presque terminée'} !
        </Typography>

        {completionPercentage === 100 ? (
          <Typography
            sx={{ fontSize: '15px', color: 'rgba(255, 255, 255, 0.8)', lineHeight: 1.6, mb: 2 }}
          >
            Toutes les étapes sont complétées. Votre agent juridique AQAL est prêt à être déployé.
          </Typography>
        ) : (
          <Typography
            sx={{ fontSize: '15px', color: 'rgba(255, 255, 255, 0.8)', lineHeight: 1.6, mb: 2 }}
          >
            {completedSteps} sur {totalSteps} étapes sont complétées. Vous pouvez finaliser la
            configuration maintenant.
          </Typography>
        )}
      </Box>
    </Box>
  );
};
