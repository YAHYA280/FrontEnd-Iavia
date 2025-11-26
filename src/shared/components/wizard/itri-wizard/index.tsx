'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Box, Typography, Container, IconButton } from '@mui/material';
import gsap from 'gsap';
import { FontAwesomeIcon } from '@/shared/components/fontawesome';
import { agentColors } from '@/contexts/theme/agent-theme-context';
import { GalaxyBackground } from '@/shared/components/backgrounds/galaxy-background';
import DarkVeil from '@/shared/components/backgrounds/DarkVeil';
import { wizardSteps } from '@/shared/_mock/wizard-data';
import { useWizardState } from './use-wizard-state';
import { ProgressBar } from './progress-bar';
import { NavigationButtons } from './navigation-buttons';
import { StepWelcome } from './step-welcome';
import { StepContext } from './step-context';
import { StepObjectives } from './step-objectives';
import { StepFeatures } from './step-features';
import { StepIdentity } from './step-identity';
import { StepNotifications } from './step-notifications';
import { StepIntegrations } from './step-integrations';
import { StepIntegrationConfig } from './step-integration-config';
import { StepResume } from './step-resume';
import { StepFaqs } from './step-faqs';
import ConditionalComponent from '@/shared/components/conditionalComponent';
import type { ItriWizardProps } from './types';

export const ItriWizard: React.FC<ItriWizardProps> = ({ onBack, onComplete }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = wizardSteps.length;
  const agentColor = agentColors.itri || agentColors.default;
  const contentRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const {
    wizardData,
    setWizardData,
    showAddFaq,
    setShowAddFaq,
    newFaq,
    setNewFaq,
    outOfHoursMessage,
    setOutOfHoursMessage,
    timezone,
    setTimezone,
    startTime,
    setStartTime,
    endTime,
    setEndTime,
    workingDays,
    setWorkingDays,
    spamKeywords,
    setSpamKeywords,
    notifications,
    setNotifications,
    notificationChannels,
    setNotificationChannels,
    activeIntegrationTab,
    setActiveIntegrationTab,
    integrationConfigs,
    setIntegrationConfigs,
    selectedIntegrations,
    expandedFeatures,
    setExpandedFeatures,
    handleObjectiveToggle,
    handleFeatureToggle,
    handleSubFeatureToggle,
    handleFeatureExpand,
    getFeatureCheckboxState,
    handleLanguageToggle,
    handleAddFaq,
    handleDeleteFaq,
    handleIntegrationToggle,
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

  const handleNext = () => {
    if (currentStep < totalSteps) {
      if (contentRef.current) {
        gsap.to(contentRef.current, {
          opacity: 0,
          x: -30,
          duration: 0.3,
          ease: 'power2.in',
          onComplete: () => {
            setCurrentStep((prev) => prev + 1);
          },
        });
      }
    } else {
      onComplete(wizardData);
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
          },
        });
      }
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return <StepWelcome agentColor={agentColor} />;
      case 2:
        return (
          <StepContext
            wizardData={wizardData}
            setWizardData={setWizardData}
            agentColor={agentColor}
          />
        );
      case 3:
        return (
          <StepObjectives
            wizardData={wizardData}
            handleObjectiveToggle={handleObjectiveToggle}
            agentColor={agentColor}
          />
        );
      case 4:
        return (
          <StepFeatures
            wizardData={wizardData}
            handleFeatureToggle={handleFeatureToggle}
            handleSubFeatureToggle={handleSubFeatureToggle}
            handleFeatureExpand={handleFeatureExpand}
            getFeatureCheckboxState={getFeatureCheckboxState}
            expandedFeatures={expandedFeatures}
            agentColor={agentColor}
          />
        );
      case 5:
        return (
          <StepIdentity
            wizardData={wizardData}
            setWizardData={setWizardData}
            agentColor={agentColor}
            outOfHoursMessage={outOfHoursMessage}
            setOutOfHoursMessage={setOutOfHoursMessage}
            timezone={timezone}
            setTimezone={setTimezone}
            startTime={startTime}
            setStartTime={setStartTime}
            endTime={endTime}
            setEndTime={setEndTime}
            workingDays={workingDays}
            setWorkingDays={setWorkingDays}
            spamKeywords={spamKeywords}
            setSpamKeywords={setSpamKeywords}
            handleLanguageToggle={handleLanguageToggle}
          />
        );
      case 6:
        return (
          <StepFaqs
            wizardData={wizardData}
            showAddFaq={showAddFaq}
            setShowAddFaq={setShowAddFaq}
            newFaq={newFaq}
            setNewFaq={setNewFaq}
            handleAddFaq={handleAddFaq}
            handleDeleteFaq={handleDeleteFaq}
            agentColor={agentColor}
          />
        );
      case 7:
        return (
          <StepNotifications
            notifications={notifications}
            setNotifications={setNotifications}
            notificationChannels={notificationChannels}
            setNotificationChannels={setNotificationChannels}
            agentColor={agentColor}
          />
        );
      case 8:
        return (
          <StepIntegrations
            wizardData={wizardData}
            setWizardData={setWizardData}
            handleIntegrationToggle={handleIntegrationToggle}
            agentColor={agentColor}
          />
        );
      case 9:
        return (
          <StepIntegrationConfig
            selectedIntegrations={selectedIntegrations}
            activeIntegrationTab={activeIntegrationTab}
            setActiveIntegrationTab={setActiveIntegrationTab}
            integrationConfigs={integrationConfigs}
            setIntegrationConfigs={setIntegrationConfigs}
            agentColor={agentColor}
          />
        );
      case 10:
        return (
          <StepResume
            wizardData={wizardData}
            notifications={notifications}
            notificationChannels={notificationChannels}
            agentColor={agentColor}
          />
        );
      default:
        return null;
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
          isolation: 'isolate',
          willChange: 'transform',
          transform: 'translateZ(0)',
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
          isolation: 'isolate',
          willChange: 'transform',
          transform: 'translateZ(0)',
        }}
      >
        <DarkVeil
          targetColor={agentColor.primary}
          speed={1.5}
          warpAmount={0.4}
          noiseIntensity={0.03}
        />
      </Box>

      {/* Return Button - Fixed Position */}
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
          isolation: 'isolate',
          willChange: 'auto',
        }}
      >
        {/* Progress Bar */}
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
          {/* Step Header - Hide for welcome step */}
          <ConditionalComponent isValid={currentStep !== 1}>
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

          {/* Navigation Buttons */}
          <NavigationButtons
            currentStep={currentStep}
            totalSteps={totalSteps}
            agentColor={agentColor}
            onBack={currentStep === 1 ? handleBackClick : handlePrev}
            onNext={handleNext}
          />
        </Container>
      </Box>
    </>
  );
};
