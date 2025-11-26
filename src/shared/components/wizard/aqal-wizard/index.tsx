'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Box, Typography, Container, IconButton } from '@mui/material';
import gsap from 'gsap';
import { FontAwesomeIcon } from '@/shared/components/fontawesome';
import { agentColors } from '@/contexts/theme/agent-theme-context';
import { GalaxyBackground } from '@/shared/components/backgrounds/galaxy-background';
import DarkVeil from '@/shared/components/backgrounds/DarkVeil';

import ConditionalComponent from '@/shared/components/conditionalComponent';
import type { AqalWizardProps, AqalWizardData } from './types';
import { StepWelcome } from './step-welcome';
import { NavigationButtons } from '../itri-wizard/navigation-buttons';
import { legalIntegrations, wizardSteps } from '@/shared/_mock/aqal-wizard-data';
import { StepCountry } from './step-country';
import { StepDocument } from './step-documents';
import { StepCompanyInfo } from './step-company-informations';
import { useWizardState } from './use-aqal-wizard-state';
import { ProgressBar } from './progress-bar';
import { StepIntegrationsLegal } from './step-integrations';
import { StepIntegrationConfigLegal } from './step-integrations-configuration';
import { StepNotificationConfig } from './step-notifications';
import { StepResumeLegal } from './step-summary';

export const AqalWizard: React.FC<AqalWizardProps> = ({ onBack, onComplete }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = wizardSteps.length;
  const agentColor = agentColors.aqal || agentColors.default;
  const contentRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const [activeIntegrationTab, setActiveIntegrationTab] = useState<string>('');
  const [integrationConfigs, setIntegrationConfigs] = useState<Record<string, any>>({});
  const [documentsUploaded, setDocumentsUploaded] = useState(false);
  const [companyInfoValid, setCompanyInfoValid] = useState(false);
  const {
    wizardData,
    setWizardData,
    handleCountrySelect,
    handleCompanyInfoSubmit,
    handleDocumentsSubmit,
    handleNotificationConfigSubmit,
    handleIntegrationConfigSubmit: handleHookIntegrationConfigSubmit,
    handleNext: wizardNext,
    handleBack: wizardBack,
    handleStepChange,
    handleFinish,
    resetWizard,
    selectedCountry,
  } = useWizardState();

  // Animate entrance
  useEffect(() => {
    if (containerRef.current) {
      gsap.fromTo(
        containerRef.current,
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }
      );
    }
  }, []);

  // Animate step changes
  useEffect(() => {
    if (contentRef.current) {
      gsap.fromTo(
        contentRef.current,
        { opacity: 0, x: 30 },
        { opacity: 1, x: 0, duration: 0.5, ease: 'power2.out' }
      );
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentStep]);

  useEffect(() => {
    handleStepChange(currentStep - 1);
  }, [currentStep, handleStepChange]);

  useEffect(() => {
    const selectedIntegrations = getSelectedIntegrations();
    if (selectedIntegrations.length > 0 && !activeIntegrationTab) {
      setActiveIntegrationTab(selectedIntegrations[0].id);
    }
  }, [wizardData.communicationChannels]);

  const getSelectedIntegrations = () => {
    const selectedIds = wizardData.communicationChannels || [];
    return legalIntegrations.filter((integration) => selectedIds.includes(integration.id));
  };

  const isIntegrationConfigValid = () => {
    const selectedIntegrations = getSelectedIntegrations();

    if (selectedIntegrations.length === 0) {
      return true;
    }

    return selectedIntegrations.every((integration) => {
      const config = integrationConfigs[integration.id];
      if (!config) return false;

      switch (integration.id) {
        case 'slack':
          return config.oauthToken && config.defaultChannel;
        case 'teams':
          return config.webhookUrl;
        default:
          return true;
      }
    });
  };

  const isCurrentStepValid = () => {
    switch (currentStep) {
      case 1:
        return true;
      case 2:
        return wizardData.country !== null;
      case 3:
        return documentsUploaded;
      case 4:
        return companyInfoValid;
      case 5:
        return true;
      case 6:
        return isIntegrationConfigValid();
      case 7:
        return (
          wizardData.notificationConfig !== null && wizardData.notificationConfig.channel !== null
        );
      case 8:
        return true;
      default:
        return false;
    }
  };

  const handleCountrySelected = (country: 'morocco' | 'france') => {
    handleCountrySelect(country);
    setDocumentsUploaded(false);
    setCompanyInfoValid(false);
    setTimeout(() => handleNext(), 500);
  };

  const handleNext = () => {
    if (!isCurrentStepValid() && currentStep !== 1 && currentStep !== totalSteps) {
      console.warn(`L'étape ${currentStep} n'est pas valide`);
      return;
    }

    if (currentStep === 6) {
      handleLocalIntegrationConfigSubmit();
    }

    if (currentStep < totalSteps) {
      if (contentRef.current) {
        gsap.to(contentRef.current, {
          opacity: 0,
          x: -30,
          duration: 0.3,
          ease: 'power2.in',
          onComplete: () => {
            setCurrentStep((prev) => prev + 1);
            wizardNext();
          },
        });
      }
    } else {
      handleFinishWizard();
    }
  };
  const handlePrev = () => {
    if (currentStep > 1) {
      if (contentRef.current) {
        gsap.to(contentRef.current, {
          opacity: 0,
          x: 30,
          duration: 0.3,
          ease: 'power2.in',
          onComplete: () => {
            setCurrentStep((prev) => prev - 1);
            wizardBack(); // Appeler la navigation du hook
          },
        });
      }
    }
  };

  const handleBackClick = () => {
    if (containerRef.current) {
      gsap.to(containerRef.current, {
        opacity: 0,
        y: 50,
        duration: 0.5,
        ease: 'power3.in',
        onComplete: () => {
          resetWizard();
          onBack();
        },
      });
    }
  };

  const handleGoToStep = (step: number) => {
    if (step >= 1 && step <= totalSteps && step !== currentStep) {
      if (contentRef.current) {
        gsap.to(contentRef.current, {
          opacity: 0,
          x: step > currentStep ? -30 : 30,
          duration: 0.3,
          ease: 'power2.in',
          onComplete: () => {
            setCurrentStep(step);
            handleStepChange(step - 1);
          },
        });
      }
    }
  };

  const handleFinishWizard = () => {
    handleFinish();
    if (onComplete) {
      const formattedIntegrationConfig = {
        selectedAccounts: {
          slack: integrationConfigs.slack || '',
          gmail: integrationConfigs.gmail || '',
          ...integrationConfigs,
        },
        completed: true,
      };

      const formattedData: AqalWizardData = {
        ...wizardData,
        integrationConfig: formattedIntegrationConfig,
      };

      onComplete(formattedData);
    }
  };

  const handleLegalIntegrationToggle = (category: string, integrationId: string) => {
    if (category === 'communication') {
      const currentChannels = wizardData.communicationChannels || [];
      const isSelected = currentChannels.includes(integrationId);

      const updatedChannels = isSelected
        ? currentChannels.filter((id) => id !== integrationId)
        : [...currentChannels, integrationId];

      setWizardData((prev: any) => ({
        ...prev,
        communicationChannels: updatedChannels,
      }));
    }
  };

  const handleLocalIntegrationConfigSubmit = () => {
    const config = {
      selectedAccounts: {
        slack: integrationConfigs.slack || '',
        gmail: integrationConfigs.gmail || '',
        ...integrationConfigs,
      },
      completed: true,
    };

    handleHookIntegrationConfigSubmit(config);
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return <StepWelcome agentColor={agentColor} />;
      case 2:
        return <StepCountry agentColor={agentColor} onSelect={handleCountrySelected} />;
      case 3:
        return (
          <StepDocument
            country={selectedCountry!}
            agentColor={agentColor}
            onValidationChange={(isValid) => {
              setDocumentsUploaded(isValid);
            }}
            onSubmit={(documents) => {
              handleDocumentsSubmit(documents);
            }}
          />
        );
      case 4:
        return (
          <StepCompanyInfo
            country={selectedCountry!}
            agentColor={agentColor}
            wizardData={wizardData}
            handleCompanyInfoSubmit={handleCompanyInfoSubmit}
            onValidationChange={(isValid) => {
              setCompanyInfoValid(isValid);
            }}
            onCompleted={(data) => void 0}
          />
        );
      case 5:
        return (
          <StepIntegrationsLegal
            wizardData={wizardData}
            handleIntegrationToggle={handleLegalIntegrationToggle}
            agentColor={agentColor}
          />
        );
      case 6:
        return (
          <StepIntegrationConfigLegal
            selectedIntegrations={getSelectedIntegrations()}
            activeIntegrationTab={activeIntegrationTab}
            setActiveIntegrationTab={setActiveIntegrationTab}
            integrationConfigs={integrationConfigs}
            setIntegrationConfigs={setIntegrationConfigs}
            agentColor={agentColor}
          />
        );
      case 7:
        return (
          <StepNotificationConfig
            agentColor={agentColor}
            onConfigSubmit={(config) => {
              handleNotificationConfigSubmit(config);
            }}
            initialConfig={wizardData.notificationConfig}
          />
        );
      case 8:
        return (
          <StepResumeLegal
            wizardData={wizardData}
            integrationConfigs={integrationConfigs}
            agentColor={agentColor}
          />
        );
      default:
        return (
          <Box sx={{ textAlign: 'center', py: 8 }}>
            <Typography variant="h4" color="white">
              Étape {currentStep} - En développement
            </Typography>
          </Box>
        );
    }
  };

  const currentStepData = wizardSteps[currentStep - 1];

  return (
    <>
      {/* Galaxy Background - Full Screen */}
      <Box
        sx={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          zIndex: 0,
        }}
      >
        <GalaxyBackground enableParallax={false} />
      </Box>

      {/* DarkVeil Background - Full Screen */}
      <Box
        sx={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          zIndex: 0,
          opacity: 0.25,
        }}
      >
        <DarkVeil
          targetColor={agentColor.primary}
          speed={1.5}
          warpAmount={0.4}
          noiseIntensity={0.03}
        />
      </Box>

      {/* Return Button */}
      <IconButton
        onClick={handleBackClick}
        sx={{
          position: 'fixed',
          top: { xs: 20, md: 30 },
          left: { xs: 20, md: 30 },
          color: '#FFF',
          background: 'rgba(255, 255, 255, 0.05)',
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          width: '48px',
          height: '48px',
          zIndex: 101,
          transition: 'all 0.3s ease',
          '&:hover': {
            background: 'rgba(255, 255, 255, 0.1)',
            borderColor: `${agentColor.primary}66`,
            boxShadow: `0 4px 20px ${agentColor.glow}`,
          },
        }}
      >
        <FontAwesomeIcon icon="chevron-left" />
      </IconButton>

      {/* Main Container */}
      <Box
        ref={containerRef}
        sx={{
          position: 'relative',
          minHeight: '100vh',
          width: '100%',
          zIndex: 1,
        }}
      >
        {/* Progress Bar avec pourcentage de complétion */}
        <ProgressBar
          currentStep={currentStep}
          totalSteps={totalSteps}
          agentColor={agentColor}
          onGoToStep={handleGoToStep}
        />

        {/* Main Content */}
        <Container
          maxWidth="lg"
          sx={{
            position: 'relative',
            zIndex: 1,
            py: { xs: 6, md: 8 },
          }}
        >
          {/* Step Header */}
          <ConditionalComponent isValid={currentStep !== 1 && currentStep !== totalSteps}>
            <Box sx={{ mb: 6, textAlign: 'center' }}>
              <Typography
                sx={{
                  fontSize: { xs: '28px', md: '38px' },
                  fontWeight: 700,
                  mb: 2,
                  color: '#FFF',
                  fontFamily: 'var(--font-tertiary)',
                  textShadow: '0 4px 16px rgba(0,0,0,0.5)',
                  letterSpacing: '-0.5px',
                }}
              >
                {currentStepData.title}
              </Typography>
              <Typography
                sx={{
                  fontSize: { xs: '15px', md: '17px' },
                  color: 'rgba(255, 255, 255, 0.7)',
                  fontFamily: 'var(--font-primary)',
                }}
              >
                {currentStepData.subtitle}
              </Typography>
            </Box>
          </ConditionalComponent>

          {/* Step Content */}
          <Box ref={contentRef}>{renderStepContent()}</Box>

          {/* Navigation Buttons  */}
          <ConditionalComponent isValid={currentStep !== totalSteps}>
            <NavigationButtons
              currentStep={currentStep}
              totalSteps={totalSteps}
              agentColor={agentColor}
              onBack={currentStep === 1 ? handleBackClick : handlePrev}
              onNext={handleNext}
            />
          </ConditionalComponent>

          {/* Bouton de création sur la dernière étape */}
          <ConditionalComponent isValid={currentStep === totalSteps}>
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
              <Box
                component="button"
                onClick={handleFinishWizard}
                sx={{
                  padding: '16px 48px',
                  background: `linear-gradient(135deg, ${agentColor.primary}, ${agentColor.primary}CC)`,
                  color: '#FFF',
                  border: 'none',
                  borderRadius: '16px',
                  cursor: 'pointer',
                  fontWeight: 700,
                  fontSize: '18px',
                  fontFamily: 'var(--font-primary)',
                  transition: 'all 0.3s ease',
                  boxShadow: `0 8px 32px ${agentColor.glow}`,
                  '&:hover': {
                    transform: 'scale(1.05)',
                    boxShadow: `0 12px 40px ${agentColor.glow}`,
                  },
                }}
              >
                Créer l&apos;Agent Juridique AQAL
              </Box>
            </Box>
          </ConditionalComponent>
        </Container>
      </Box>
    </>
  );
};
