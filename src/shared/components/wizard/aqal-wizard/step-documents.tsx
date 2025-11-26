import { useState, useEffect } from 'react';
import { Box, Typography, Button, Chip } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt } from '@fortawesome/free-regular-svg-icons';
import type { StepDocumentProps } from './types';
import ConditionalComponent from '../../conditionalComponent';

interface Document {
  name: string;
  required: boolean;
  file?: File;
}

export const StepDocument = ({
  country,
  agentColor,
  onValidationChange,
  onSubmit,
}: StepDocumentProps) => {
  const moroccoDocuments: Document[] = [
    { name: 'Extrait de Registre de Commerce', required: true },
    { name: 'Statuts', required: false },
    { name: "Identifiant Commun de l'Entreprise", required: false },
    { name: 'Bilan comptable', required: false },
    { name: 'Attestation fiscale', required: false },
    { name: 'Convention collective', required: false },
  ];

  const franceDocuments: Document[] = [
    { name: 'Extrait Kbis', required: true },
    { name: 'Statuts', required: false },
    { name: "SIREN (ou SIRET pour l'établissement)", required: false },
    { name: 'Bilan comptable', required: false },
    { name: 'Attestation fiscale', required: false },
    { name: 'Convention collective nationale (CCN)', required: false },
  ];

  const [documents, setDocuments] = useState<Document[]>(
    country === 'morocco' ? moroccoDocuments : franceDocuments
  );
  const [validationError, setValidationError] = useState<string>('');

  const validateDocumentsSilent = (): boolean => {
    const missingRequiredDocs = documents.filter((doc) => doc.required && !doc.file);
    if (missingRequiredDocs.length > 0) return false;

    const invalidFiles = documents.filter((doc) => doc.file && !isValidFileType(doc.file));
    if (invalidFiles.length > 0) return false;

    const oversizedFiles = documents.filter((doc) => doc.file && doc.file.size > 10 * 1024 * 1024);
    if (oversizedFiles.length > 0) return false;

    return true;
  };

  useEffect(() => {
    const isValid = validateDocumentsSilent();

    if (onValidationChange) {
      onValidationChange(isValid);
    }

    if (isValid && onSubmit) {
      const documentsToSubmit = documents.reduce(
        (acc, doc) => ({
          ...acc,
          [doc.name]: doc.file,
        }),
        {}
      );
      onSubmit(documentsToSubmit);
    }
  }, [documents]);

  const handleFileChange = (index: number, file: File | undefined) => {
    const newDocuments = [...documents];
    newDocuments[index].file = file;
    setDocuments(newDocuments);
    setValidationError('');
  };

  const validateDocuments = (): boolean => {
    const missingRequiredDocs = documents.filter((doc) => doc.required && !doc.file);

    if (missingRequiredDocs.length > 0) {
      const missingNames = missingRequiredDocs.map((doc) => doc.name).join(', ');
      setValidationError(`Les documents obligatoires suivants sont manquants : ${missingNames}`);
      return false;
    }

    const invalidFiles = documents.filter((doc) => doc.file && !isValidFileType(doc.file));

    if (invalidFiles.length > 0) {
      const invalidNames = invalidFiles.map((doc) => doc.name).join(', ');
      setValidationError(
        `Les fichiers suivants ont un format invalide : ${invalidNames}. Formats acceptés : PDF, DOC, DOCX, JPG, JPEG, PNG`
      );
      return false;
    }

    const oversizedFiles = documents.filter((doc) => doc.file && doc.file.size > 10 * 1024 * 1024);

    if (oversizedFiles.length > 0) {
      const oversizedNames = oversizedFiles.map((doc) => doc.name).join(', ');
      setValidationError(
        `Les fichiers suivants dépassent la taille maximale de 10MB : ${oversizedNames}`
      );
      return false;
    }

    setValidationError('');
    return true;
  };

  const isValidFileType = (file: File): boolean => {
    const allowedTypes = [
      'application/pdf',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'image/jpeg',
      'image/jpg',
      'image/png',
    ];
    return allowedTypes.includes(file.type);
  };

  const requiredDocumentsCount = documents.filter((doc) => doc.required).length;
  const uploadedRequiredDocumentsCount = documents.filter((doc) => doc.required && doc.file).length;

  const isFormValid = validateDocumentsSilent();

  const handleFileUpload = (index: number) => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.pdf,.doc,.docx,.jpg,.jpeg,.png';
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) handleFileChange(index, file);
    };
    input.click();
  };

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
        <Box sx={{ fontSize: '24px' }}>📄</Box>
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
            Documents requis - {country === 'morocco' ? 'Maroc' : 'France'}
          </Typography>
          <Typography
            sx={{
              fontSize: '14px',
              color: 'rgba(255, 255, 255, 0.8)',
              lineHeight: 1.6,
              fontFamily: 'var(--font-primary)',
            }}
          >
            Téléchargez vos documents administratifs (les documents marqués d&apos;un * sont
            obligatoires)
          </Typography>

          {/* Progress Indicator */}
          <Box sx={{ mt: 2, display: 'flex', alignItems: 'center', gap: 2 }}>
            <Chip
              label={`${uploadedRequiredDocumentsCount}/${requiredDocumentsCount} obligatoires`}
              sx={{
                background: isFormValid ? `${agentColor.primary}33` : 'rgba(255, 255, 255, 0.1)',
                color: isFormValid ? agentColor.primary : 'rgba(255, 255, 255, 0.7)',
                border: `1px solid ${isFormValid ? agentColor.primary : 'rgba(255, 255, 255, 0.2)'}`,
                fontFamily: 'var(--font-primary)',
                fontWeight: 600,
              }}
            />
          </Box>
        </Box>
      </Box>

      {/* Validation Error */}
      <ConditionalComponent isValid={!!validationError}>
        <Box
          sx={{
            background: 'rgba(244, 67, 54, 0.1)',
            border: '1px solid rgba(244, 67, 54, 0.3)',
            borderRadius: '12px',
            padding: 2,
            mb: 3,
            display: 'flex',
            alignItems: 'center',
            gap: 2,
          }}
        >
          <Box sx={{ fontSize: '20px', color: '#f44336' }}>⚠️</Box>
          <Typography
            sx={{
              fontSize: '14px',
              color: 'rgba(255, 255, 255, 0.9)',
              fontFamily: 'var(--font-primary)',
            }}
          >
            {validationError}
          </Typography>
        </Box>
      </ConditionalComponent>

      {/* Documents List */}
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        {documents.map((doc, index) => {
          const hasFile = !!doc.file;

          return (
            <Box
              key={index}
              onClick={() => !hasFile && handleFileUpload(index)}
              sx={{
                position: 'relative',
                overflow: 'hidden',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: 3,
                padding: '16px 20px',
                background: hasFile
                  ? `linear-gradient(135deg, ${agentColor.primary}12, ${agentColor.primary}06)`
                  : 'rgba(255, 255, 255, 0.03)',
                backdropFilter: 'blur(20px)',
                WebkitBackdropFilter: 'blur(20px)',
                borderRadius: '16px',
                cursor: hasFile ? 'default' : 'pointer',
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                border: hasFile
                  ? `2px solid ${agentColor.primary}`
                  : '2px solid rgba(255, 255, 255, 0.08)',
                boxShadow: hasFile ? `0 4px 16px ${agentColor.glow}33` : 'none',
                isolation: 'isolate',
                willChange: 'transform',
                '&:hover': {
                  background: hasFile
                    ? `linear-gradient(135deg, ${agentColor.primary}18, ${agentColor.primary}08)`
                    : 'rgba(255, 255, 255, 0.06)',
                  borderColor: `${agentColor.primary}66`,
                  transform: hasFile ? 'none' : 'translateY(-2px)',
                  boxShadow: hasFile
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

              <Box sx={{ display: 'flex', alignItems: 'center', gap: 3, flex: 1 }}>
                <ConditionalComponent isValid={hasFile}>
                  <Box
                    sx={{
                      width: '20px',
                      height: '20px',
                      borderRadius: '6px',
                      border: `2px solid ${agentColor.primary}`,
                      background: agentColor.primary,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                      transition: 'all 0.3s ease',
                      position: 'relative',
                      zIndex: 1,
                    }}
                  >
                    <Box sx={{ fontSize: '12px', color: '#FFF', fontWeight: 'bold' }}>✓</Box>
                  </Box>
                </ConditionalComponent>

                <Box sx={{ fontSize: '24px', flexShrink: 0, position: 'relative', zIndex: 1 }}>
                  {hasFile ? '📎' : '📄'}
                </Box>

                <Box sx={{ flex: 1, position: 'relative', zIndex: 1 }}>
                  <Typography
                    sx={{
                      fontSize: '15px',
                      fontWeight: 700,
                      mb: 0.5,
                      color: '#FFF',
                      fontFamily: 'var(--font-primary)',
                      lineHeight: 1.3,
                      display: 'flex',
                      alignItems: 'center',
                      gap: 1,
                    }}
                  >
                    {doc.name}

                    <ConditionalComponent isValid={doc.required}>
                      <Box
                        component="span"
                        sx={{
                          color: hasFile ? agentColor.primary : '#f44336',
                          fontSize: '18px',
                          lineHeight: 1,
                        }}
                      >
                        *
                      </Box>
                    </ConditionalComponent>
                  </Typography>

                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <Chip
                      label={doc.required ? 'Obligatoire' : 'Optionnel'}
                      size="small"
                      sx={{
                        height: '20px',
                        fontSize: '11px',
                        color: doc.required
                          ? hasFile
                            ? agentColor.primary
                            : '#f44336'
                          : 'rgba(255, 255, 255, 0.6)',
                        borderColor: 'currentColor',
                        background: 'transparent',
                        fontFamily: 'var(--font-primary)',
                        fontWeight: 600,
                      }}
                      variant="outlined"
                    />

                    <ConditionalComponent isValid={hasFile}>
                      <Typography
                        sx={{
                          fontSize: '12px',
                          color: 'rgba(255, 255, 255, 0.6)',
                          fontFamily: 'var(--font-primary)',
                        }}
                      >
                        {doc.file?.size
                          ? `${(doc.file.size / (1024 * 1024)).toFixed(2)} MB`
                          : 'Taille inconnue'}
                      </Typography>
                    </ConditionalComponent>
                  </Box>
                </Box>
              </Box>

              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1,
                  position: 'relative',
                  zIndex: 1,
                }}
              >
                {hasFile ? (
                  <>
                    <Typography
                      sx={{
                        fontSize: '13px',
                        color: agentColor.primary,
                        fontWeight: 600,
                        maxWidth: '150px',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap',
                        fontFamily: 'var(--font-primary)',
                      }}
                      title={doc.file!.name}
                    >
                      {doc.file!.name}
                    </Typography>
                    <Box
                      onClick={(e) => {
                        e.stopPropagation();
                        handleFileChange(index, undefined);
                      }}
                      sx={{
                        padding: '6px',
                        borderRadius: '8px',
                        cursor: 'pointer',
                        transition: 'all 0.2s ease',
                        color: agentColor.primary,
                        '&:hover': {
                          background: 'rgba(244, 67, 54, 0.2)',
                          color: '#f44336',
                        },
                      }}
                    >
                      <FontAwesomeIcon icon={faTrashAlt} />
                    </Box>
                  </>
                ) : (
                  <Box
                    sx={{
                      padding: '8px 16px',
                      background: `${agentColor.primary}22`,
                      border: `1px solid ${agentColor.primary}44`,
                      borderRadius: '12px',
                      cursor: 'pointer',
                      transition: 'all 0.3s ease',
                      '&:hover': {
                        background: `${agentColor.primary}33`,
                        transform: 'translateY(-1px)',
                      },
                    }}
                  >
                    <Typography
                      sx={{
                        fontSize: '13px',
                        fontWeight: 600,
                        color: agentColor.primary,
                        fontFamily: 'var(--font-primary)',
                      }}
                    >
                      Télécharger
                    </Typography>
                  </Box>
                )}
              </Box>
            </Box>
          );
        })}
      </Box>
    </Box>
  );
};
