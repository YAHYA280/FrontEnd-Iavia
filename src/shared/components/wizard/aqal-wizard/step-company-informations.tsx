import React, { useState, useEffect, useRef } from 'react';
import { Box, Typography, TextField } from '@mui/material';
import type { StepCompanyInfoProps } from './types';

export const StepCompanyInfo: React.FC<StepCompanyInfoProps> = ({
  agentColor,
  country,
  wizardData,
  onCompleted,
  onValidationChange,
  handleCompanyInfoSubmit,
}) => {
  const moroccoFields = [
    { id: 'rc', label: 'Numéro du Registre de Commerce (RC)', defaultValue: '123456' },
    {
      id: 'raisonSociale',
      label: 'Raison sociale / Nom commercial',
      defaultValue: 'Entreprise XYZ',
    },
    { id: 'formeJuridique', label: 'Forme juridique', defaultValue: 'SARL' },
    { id: 'activite', label: 'Activité principale', defaultValue: 'Commerce' },
    { id: 'adresse', label: 'Adresse du siège social', defaultValue: 'Casablanca, Maroc' },
    { id: 'capital', label: 'Capital social', defaultValue: '100 000 MAD' },
    {
      id: 'gerants',
      label: 'Nom et prénom du ou des gérants / dirigeants',
      defaultValue: 'Ahmed Benali',
    },
    {
      id: 'dateImmatriculation',
      label: "Date d'immatriculation au RC",
      defaultValue: '01/01/2020',
    },
    { id: 'patente', label: 'Numéro de patente', defaultValue: 'P123456' },
    { id: 'if', label: 'Numéro IF (Identifiant Fiscal)', defaultValue: '12345678' },
    {
      id: 'ice',
      label: "Identifiant Commun de l'Entreprise (ICE)",
      defaultValue: '001234567890123',
    },
    { id: 'dateCreation', label: 'Date de création', defaultValue: '01/01/2020' },
  ];

  const franceFields = [
    {
      id: 'denomination',
      label: 'Dénomination sociale / Nom commercial',
      defaultValue: 'Société ABC',
    },
    { id: 'siren', label: 'Numéro SIREN', defaultValue: '123 456 789' },
    { id: 'naf', label: 'Code NAF / APE', defaultValue: '6201Z' },
    { id: 'formeJuridique', label: 'Forme juridique', defaultValue: 'SAS' },
    { id: 'capital', label: 'Capital social', defaultValue: '50 000 EUR' },
    { id: 'adresse', label: 'Adresse du siège social', defaultValue: 'Paris, France' },
    { id: 'duree', label: 'Durée de la société', defaultValue: '99 ans' },
    {
      id: 'dateImmatriculation',
      label: "Date d'immatriculation au RCS",
      defaultValue: '01/01/2020',
    },
    { id: 'greffe', label: "Greffe d'immatriculation", defaultValue: 'Paris' },
    { id: 'activite', label: 'Activité déclarée', defaultValue: 'Services informatiques' },
    { id: 'dirigeants', label: 'Dirigeants', defaultValue: 'Jean Dupont' },
    { id: 'mentionRcs', label: 'Mention RCS', defaultValue: 'Paris B 123 456 789' },
  ];

  const fields = country === 'morocco' ? moroccoFields : franceFields;
  const isInitialMount = useRef(true);

  const getInitialFormData = (): Record<string, string> => {
    if (wizardData.companyInfo && Object.keys(wizardData.companyInfo).length > 0) {
      const sanitizedCompanyInfo = Object.fromEntries(
        Object.entries(wizardData.companyInfo).map(([key, value]) => [
          key,
          value === null ? '' : String(value),
        ])
      );

      const defaultData = fields.reduce((acc, field) => ({ ...acc, [field.id]: field.defaultValue }), {});
      return { ...defaultData, ...sanitizedCompanyInfo };
    }

    return fields.reduce((acc, field) => ({ ...acc, [field.id]: field.defaultValue }), {});
  };

  const [formData, setFormData] = useState<Record<string, string>>(getInitialFormData);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);

  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
      return;
    }

    const newFormData = getInitialFormData();
    setFormData(newFormData);
    setHasUnsavedChanges(false);
  }, [country]); 

  useEffect(() => {
    const isValid = isFormValid();
    if (onValidationChange) {
      onValidationChange(isValid);
    }
  }, [formData, onValidationChange]);

  useEffect(() => {
    const isFormComplete = isFormValid();

    if (isFormComplete && hasUnsavedChanges) {
      const timeoutId = setTimeout(() => {
        if (handleCompanyInfoSubmit) {
          handleCompanyInfoSubmit(formData);
        }
        if (onCompleted) {
          onCompleted(formData);
        }
        setHasUnsavedChanges(false);
      }, 500);

      return () => clearTimeout(timeoutId);
    }
  }, [formData, hasUnsavedChanges, onCompleted, handleCompanyInfoSubmit]);

  const handleChange = (id: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [id]: value
    }));
    setHasUnsavedChanges(true);
  };

  const isFormValid = (): boolean => {
    return fields.every((field) => formData[field.id] && formData[field.id].trim() !== '');
  };

  const completedFields = fields.filter(
    (field) => formData[field.id] && formData[field.id].trim() !== ''
  ).length;
  const totalFields = fields.length;
  const progressPercentage = Math.round((completedFields / totalFields) * 100);

  return (
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
        <Box sx={{ fontSize: '24px' }}>🏢</Box>
        <Box sx={{ flex: 1 }}>
          <Typography
            sx={{
              fontSize: '16px',
              fontWeight: 600,
              color: '#FFF',
              mb: 0.5,
              fontFamily: 'var(--font-primary)',
            }}
          >
            Informations de l&apos;entreprise - {country === 'morocco' ? 'Maroc' : 'France'}
          </Typography>
          <Typography
            sx={{
              fontSize: '14px',
              color: 'rgba(255, 255, 255, 0.8)',
              lineHeight: 1.6,
              fontFamily: 'var(--font-primary)',
              mb: 1,
            }}
          >
            Vérifiez et complétez les informations extraites des documents
          </Typography>
          <Typography
            sx={{
              fontSize: '12px',
              color: 'rgba(255, 255, 255, 0.6)',
              fontFamily: 'var(--font-primary)',
            }}
          >
            Progression: {completedFields}/{totalFields} ({progressPercentage}%)
          </Typography>
        </Box>
      </Box>

      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', md: 'repeat(2, 1fr)' },
          gap: 3,
          mb: 4,
        }}
      >
        {fields.map((field) => (
          <Box
            key={field.id}
            sx={{
              position: 'relative',
              overflow: 'hidden',
              background: 'rgba(255, 255, 255, 0.03)',
              backdropFilter: 'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)',
              border:
                formData[field.id] && formData[field.id].trim() !== ''
                  ? `2px solid ${agentColor.primary}33`
                  : '2px solid rgba(255, 255, 255, 0.08)',
              borderRadius: '16px',
              padding: 2.5,
              transition: 'all 0.3s ease',
              isolation: 'isolate',
              willChange: 'transform',
              '&:hover': {
                background: 'rgba(255, 255, 255, 0.06)',
                borderColor: `${agentColor.primary}66`,
                transform: 'translateY(-2px)',
                '& .shine-effect': {
                  transform: 'translateX(100%)',
                },
              },
              '&:focus-within': {
                borderColor: agentColor.primary,
                background: `linear-gradient(135deg, ${agentColor.primary}12, ${agentColor.primary}06)`,
                boxShadow: `0 4px 16px ${agentColor.glow}33`,
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
              <Typography
                sx={{
                  fontSize: '14px',
                  fontWeight: 600,
                  mb: 2,
                  color:
                    formData[field.id] && formData[field.id].trim() !== ''
                      ? '#FFF'
                      : 'rgba(255, 255, 255, 0.7)',
                  fontFamily: 'var(--font-primary)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 0.5,
                }}
              >
                {field.label}
                <Box
                  component="span"
                  sx={{
                    color: '#ef4444',
                    fontSize: '16px',
                    lineHeight: 1,
                  }}
                >
                  *
                </Box>
              </Typography>

              <TextField
                fullWidth
                value={formData[field.id] || ''}
                onChange={(e) => handleChange(field.id, e.target.value)}
                variant="outlined"
                sx={{
                  '& .MuiOutlinedInput-root': {
                    background: 'rgba(0, 0, 0, 0.3)',
                    backdropFilter: 'blur(10px)',
                    color: '#FFF',
                    borderRadius: '12px',
                    fontFamily: 'var(--font-primary)',
                    fontSize: '14px',
                    transition: 'all 0.3s ease',
                    '& fieldset': {
                      borderColor:
                        formData[field.id] && formData[field.id].trim() !== ''
                          ? `${agentColor.primary}33`
                          : 'rgba(255, 255, 255, 0.1)',
                      borderWidth: '2px',
                      transition: 'all 0.3s ease',
                    },
                    '&:hover fieldset': {
                      borderColor: `${agentColor.primary}66`,
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: agentColor.primary,
                      boxShadow: `0 0 0 2px ${agentColor.primary}33`,
                    },
                  },
                  '& .MuiInputBase-input': {
                    color: '#FFF',
                    '&::placeholder': {
                      color: 'rgba(255, 255, 255, 0.5)',
                      opacity: 1,
                    },
                  },
                }}
              />
            </Box>
          </Box>
        ))}
      </Box>
    </Box>
  );
};