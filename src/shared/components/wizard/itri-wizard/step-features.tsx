import React from 'react';
import { Box, Typography, Collapse, Tooltip } from '@mui/material';
import { FontAwesomeIcon } from '@/shared/components/fontawesome';
import { features } from '@/shared/_mock/wizard-data';
import ConditionalComponent from '@/shared/components/conditionalComponent';
import type { WizardData, AgentColor } from './types';

interface StepFeaturesProps {
  wizardData: WizardData;
  handleFeatureToggle: (featureId: string) => void;
  handleSubFeatureToggle: (parentFeatureId: string, subFeatureId: string) => void;
  handleFeatureExpand: (featureId: string) => void;
  getFeatureCheckboxState: (featureId: string) => 'checked' | 'unchecked' | 'indeterminate';
  expandedFeatures: Set<string>;
  agentColor: AgentColor;
}

export const StepFeatures: React.FC<StepFeaturesProps> = ({
  wizardData,
  handleFeatureToggle,
  handleSubFeatureToggle,
  handleFeatureExpand,
  getFeatureCheckboxState,
  expandedFeatures,
  agentColor,
}) => (
  <Box sx={{ maxWidth: '900px', margin: '0 auto' }}>
    <Box
      sx={{
        background: `linear-gradient(135deg, ${agentColor.primary}08, ${agentColor.primary}03)`,
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        border: `1px solid ${agentColor.primary}33`,
        borderRadius: '16px',
        padding: 2.5,
        mb: 4,
        display: 'flex',
        alignItems: 'center',
        gap: 2,
      }}
    >
      <Box sx={{ fontSize: '24px' }}>⚙️</Box>
      <Typography sx={{ fontSize: '14px', color: 'rgba(255, 255, 255, 0.8)', lineHeight: 1.6 }}>
        Sélectionnez les fonctionnalités que votre agent doit avoir. Cliquez sur une
        fonctionnalité pour voir et gérer ses sous-fonctionnalités.
      </Typography>
    </Box>

    <Box
      sx={{
        display: 'grid',
        gridTemplateColumns: { xs: '1fr', md: 'repeat(2, 1fr)' },
        gap: 2.5,
        alignItems: 'start',
      }}
    >
      {features.map((feature) => {
        const checkboxState = getFeatureCheckboxState(feature.id);
        const isExpanded = expandedFeatures.has(feature.id);
        const hasSubFeatures = Boolean(feature.subFeatures && feature.subFeatures.length > 0);

        return (
          <Box
            key={feature.id}
            sx={{
              position: 'relative',
              overflow: 'hidden',
              minHeight: '100px',
              background:
                checkboxState === 'checked' || checkboxState === 'indeterminate'
                  ? `linear-gradient(135deg, ${agentColor.primary}12, ${agentColor.primary}06)`
                  : 'rgba(255, 255, 255, 0.03)',
              backdropFilter: 'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)',
              borderRadius: '16px',
              transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
              border:
                checkboxState === 'checked' || checkboxState === 'indeterminate'
                  ? `2px solid ${agentColor.primary}`
                  : '2px solid rgba(255, 255, 255, 0.08)',
              boxShadow:
                checkboxState === 'checked' || checkboxState === 'indeterminate'
                  ? `0 4px 16px ${agentColor.glow}`
                  : 'none',
              isolation: 'isolate',
              willChange: 'transform',
              '&:hover': {
                background:
                  checkboxState === 'checked' || checkboxState === 'indeterminate'
                    ? `linear-gradient(135deg, ${agentColor.primary}18, ${agentColor.primary}08)`
                    : 'rgba(255, 255, 255, 0.06)',
                borderColor: `${agentColor.primary}66`,
                transform: 'translateY(-2px)',
                boxShadow: `0 6px 20px ${agentColor.glow}`,
              },
            }}
          >
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 2,
                padding: '16px',
                minHeight: '100px',
                cursor: hasSubFeatures ? 'pointer' : 'default',
              }}
              onClick={(e) => {
                if (hasSubFeatures && !(e.target as HTMLElement).closest('.checkbox-wrapper')) {
                  handleFeatureExpand(feature.id);
                }
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

              {/* Checkbox */}
              <Box
                className="checkbox-wrapper"
                onClick={(e) => {
                  e.stopPropagation();
                  handleFeatureToggle(feature.id);
                }}
                sx={{
                  width: '22px',
                  height: '22px',
                  borderRadius: '6px',
                  border: `2px solid ${checkboxState === 'checked' || checkboxState === 'indeterminate'
                      ? agentColor.primary
                      : 'rgba(255, 255, 255, 0.3)'
                    }`,
                  background:
                    checkboxState === 'checked' || checkboxState === 'indeterminate'
                      ? agentColor.primary
                      : 'transparent',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                  transition: 'all 0.3s ease',
                  position: 'relative',
                  zIndex: 1,
                  cursor: 'pointer',
                }}
              >
                <ConditionalComponent
                  isValid={checkboxState === 'checked' || checkboxState === 'indeterminate'}
                >
                  <FontAwesomeIcon
                    icon={checkboxState === 'indeterminate' ? 'minus' : 'check'}
                    style={{ fontSize: '11px', color: '#FFF' }}
                  />
                </ConditionalComponent>
              </Box>

              {/* Icon */}
              <Box sx={{ fontSize: '28px', flexShrink: 0, position: 'relative', zIndex: 1 }}>
                {feature.icon}
              </Box>

              {/* Content */}
              <Box sx={{ flex: 1, position: 'relative', zIndex: 1 }}>
                <Typography
                  sx={{
                    fontSize: '15px',
                    fontWeight: 700,
                    mb: 0.5,
                    color: '#FFF',
                    fontFamily: 'var(--font-primary)',
                    lineHeight: 1.3,
                  }}
                >
                  {feature.title}
                </Typography>
                <Typography
                  sx={{
                    fontSize: '13px',
                    color: 'rgba(255, 255, 255, 0.65)',
                    lineHeight: 1.4,
                    fontFamily: 'var(--font-primary)',
                  }}
                >
                  {feature.description}
                </Typography>
              </Box>

              <ConditionalComponent isValid={hasSubFeatures}>
                <Tooltip
                  title={isExpanded ? 'Masquer les détails' : 'Afficher les détails'}
                  placement="top"
                  arrow
                >
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      width: '32px',
                      height: '32px',
                      borderRadius: '8px',
                      background: 'rgba(255, 255, 255, 0.05)',
                      transition: 'all 0.3s ease',
                      position: 'relative',
                      zIndex: 1,
                      '&:hover': {
                        background: 'rgba(255, 255, 255, 0.1)',
                      },
                    }}
                  >
                    <FontAwesomeIcon
                      icon={isExpanded ? 'chevron-up' : 'chevron-down'}
                      style={{
                        fontSize: '14px',
                        color: 'rgba(255, 255, 255, 0.7)',
                        transition: 'transform 0.3s ease',
                      }}
                    />
                  </Box>
                </Tooltip>
              </ConditionalComponent>
            </Box>

            {/* Sub-Features */}
            <ConditionalComponent isValid={hasSubFeatures}>
              <Collapse in={isExpanded} timeout={300}>
                <Box
                  sx={{
                    padding: '0 16px 16px 16px',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 1.5,
                  }}
                >
                  {feature.subFeatures?.map((subFeature) => {
                    const isSubSelected = wizardData.subFeatures.includes(subFeature.id);
                    return (
                      <Box
                        key={subFeature.id}
                        onClick={() => handleSubFeatureToggle(feature.id, subFeature.id)}
                        sx={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: 1.5,
                          padding: '12px 16px',
                          background: isSubSelected
                            ? `linear-gradient(135deg, ${agentColor.primary}08, ${agentColor.primary}04)`
                            : 'rgba(255, 255, 255, 0.02)',
                          border: isSubSelected
                            ? `1px solid ${agentColor.primary}66`
                            : '1px solid rgba(255, 255, 255, 0.05)',
                          borderRadius: '12px',
                          cursor: 'pointer',
                          transition: 'all 0.2s ease',
                          position: 'relative',
                          zIndex: 1,
                          '&:hover': {
                            background: isSubSelected
                              ? `linear-gradient(135deg, ${agentColor.primary}12, ${agentColor.primary}06)`
                              : 'rgba(255, 255, 255, 0.05)',
                            borderColor: `${agentColor.primary}44`,
                            transform: 'translateX(4px)',
                          },
                        }}
                      >
                        <Box
                          sx={{
                            width: '18px',
                            height: '18px',
                            borderRadius: '4px',
                            border: `2px solid ${isSubSelected ? agentColor.primary : 'rgba(255, 255, 255, 0.25)'
                              }`,
                            background: isSubSelected ? agentColor.primary : 'transparent',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            flexShrink: 0,
                            transition: 'all 0.2s ease',
                          }}
                        >
                          <ConditionalComponent isValid={isSubSelected}>
                            <FontAwesomeIcon
                              icon="check"
                              style={{ fontSize: '9px', color: '#FFF' }}
                            />
                          </ConditionalComponent>
                        </Box>

                        <Box sx={{ flex: 1 }}>
                          <Typography
                            sx={{
                              fontSize: '13px',
                              fontWeight: 600,
                              mb: 0.3,
                              color: '#FFF',
                              fontFamily: 'var(--font-primary)',
                              lineHeight: 1.3,
                            }}
                          >
                            {subFeature.title}
                          </Typography>
                          <Typography
                            sx={{
                              fontSize: '11px',
                              color: 'rgba(255, 255, 255, 0.55)',
                              lineHeight: 1.3,
                              fontFamily: 'var(--font-primary)',
                            }}
                          >
                            {subFeature.description}
                          </Typography>
                        </Box>
                      </Box>
                    );
                  })}
                </Box>
              </Collapse>
            </ConditionalComponent>
          </Box>
        );
      })}
    </Box>
  </Box>
);
