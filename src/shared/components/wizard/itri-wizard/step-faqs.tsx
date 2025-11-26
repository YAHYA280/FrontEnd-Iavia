import React from 'react';
import { Box, Typography, TextField } from '@mui/material';
import { FontAwesomeIcon } from '@/shared/components/fontawesome';
import ConditionalComponent from '@/shared/components/conditionalComponent';
import { CustomSelect } from '@/shared/components/ui/custom-select';
import type { WizardData, AgentColor } from './types';

interface StepFaqsProps {
  wizardData: WizardData;
  showAddFaq: boolean;
  setShowAddFaq: React.Dispatch<React.SetStateAction<boolean>>;
  newFaq: { question: string; answer: string; category: string };
  setNewFaq: React.Dispatch<React.SetStateAction<{ question: string; answer: string; category: string }>>;
  handleAddFaq: () => void;
  handleDeleteFaq: (faqId: string) => void;
  agentColor: AgentColor;
}

export const StepFaqs: React.FC<StepFaqsProps> = ({
  wizardData,
  showAddFaq,
  setShowAddFaq,
  newFaq,
  setNewFaq,
  handleAddFaq,
  handleDeleteFaq,
  agentColor,
}) => {
  const categories = [
    { id: '', title: 'Aucune catégorie', icon: '📋' },
    { id: 'Livraison', title: 'Livraison', icon: '🚚' },
    { id: 'Paiement', title: 'Paiement', icon: '💳' },
    { id: 'Retours', title: 'Retours', icon: '↩️' },
    { id: 'Produits', title: 'Produits', icon: '📦' },
    { id: 'Compte', title: 'Compte', icon: '👤' },
    { id: 'Autre', title: 'Autre', icon: '📌' },
  ];

  return (
    <Box sx={{ maxWidth: '900px', margin: '0 auto' }}>
      {/* Info Banner */}
      <Box
        sx={{
          background: `linear-gradient(135deg, ${agentColor.primary}08, ${agentColor.primary}03)`,
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          border: `1px solid ${agentColor.primary}33`,
          borderRadius: '16px',
          padding: 2.5,
          mb: 4,
        }}
      >
        <Typography
          sx={{
            fontSize: '14px',
            color: 'rgba(255, 255, 255, 0.8)',
            lineHeight: 1.6,
            fontFamily: 'var(--font-primary)',
          }}
        >
          Créez une base de connaissances complète pour que votre agent puisse répondre automatiquement
          aux questions fréquentes de vos clients.
        </Typography>
      </Box>

      {/* Header with Add Button */}
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          mb: 3,
        }}
      >
        <Typography
          sx={{
            fontSize: '15px',
            fontWeight: 700,
            color: 'rgba(255, 255, 255, 0.85)',
            fontFamily: 'var(--font-primary)',
          }}
        >
          Questions fréquentes ({wizardData.faqs.length})
        </Typography>

        {/* Add FAQ Button with Navigation Style */}
        <Box
          component="button"
          onClick={() => setShowAddFaq(!showAddFaq)}
          sx={{
            position: 'relative',
            overflow: 'hidden',
            padding: '12px 24px',
            borderRadius: '16px',
            background: showAddFaq
              ? 'rgba(255, 255, 255, 0.02)'
              : `linear-gradient(135deg, ${agentColor.primary}, ${agentColor.primary}dd)`,
            backdropFilter: 'blur(12px)',
            WebkitBackdropFilter: 'blur(12px)',
            color: '#FFF',
            border: showAddFaq ? '1px solid rgba(255, 255, 255, 0.1)' : 'none',
            cursor: 'pointer',
            fontWeight: 700,
            fontSize: '14px',
            fontFamily: 'var(--font-primary)',
            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
            display: 'inline-flex',
            alignItems: 'center',
            gap: 1.5,
            boxShadow: showAddFaq ? '0 2px 8px rgba(0, 0, 0, 0.1)' : `0 4px 20px ${agentColor.glow}`,
            '&:hover': {
              transform: 'scale(1.05)',
              backdropFilter: 'blur(16px)',
              WebkitBackdropFilter: 'blur(16px)',
              background: showAddFaq
                ? 'rgba(255, 255, 255, 0.08)'
                : `linear-gradient(135deg, ${agentColor.primary}, ${agentColor.primary}dd)`,
              borderColor: showAddFaq ? `${agentColor.primary}66` : 'transparent',
              boxShadow: showAddFaq
                ? `0 6px 20px ${agentColor.glow}`
                : `0 6px 28px ${agentColor.glow}`,
              '& .shine-effect': {
                transform: 'translateX(100%)',
              },
            },
            '&:active': {
              transform: 'scale(0.98)',
            },
          }}
        >
          {/* Shine effect */}
          <Box
            className="shine-effect"
            sx={{
              position: 'absolute',
              inset: 0,
              background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent)',
              transform: 'translateX(-100%)',
              transition: 'transform 0.7s ease-out',
              pointerEvents: 'none',
            }}
          />
          <Box sx={{ position: 'relative', zIndex: 1, display: 'flex', alignItems: 'center', gap: 1 }}>
            <FontAwesomeIcon icon={showAddFaq ? 'times' : 'plus'} />
            {showAddFaq ? 'Annuler' : 'Ajouter une FAQ'}
          </Box>
        </Box>
      </Box>

      {/* Add FAQ Form */}
      <ConditionalComponent isValid={showAddFaq}>
        <Box sx={{ mb: 4, position: 'relative', zIndex: 9999, isolation: 'isolate' }}>
          {/* Question Field */}
          <Box sx={{ mb: 3 }}>
            <Typography
              sx={{
                fontSize: '15px',
                fontWeight: 700,
                mb: 2,
                color: 'rgba(255, 255, 255, 0.85)',
                fontFamily: 'var(--font-primary)',
              }}
            >
              Question <span style={{ color: '#ef4444' }}>*</span>
            </Typography>
            <TextField
              fullWidth
              value={newFaq.question}
              onChange={(e) => setNewFaq({ ...newFaq, question: e.target.value })}
              placeholder="Quels sont vos délais de livraison ?"
              sx={{
                '& .MuiOutlinedInput-root': {
                  background: 'rgba(0, 0, 0, 0.3)',
                  backdropFilter: 'blur(10px)',
                  WebkitBackdropFilter: 'blur(10px)',
                  color: '#FFF',
                  borderRadius: '12px',
                  fontFamily: 'var(--font-primary)',
                  border: '2px solid rgba(255, 255, 255, 0.08)',
                  transition: 'all 0.3s ease',
                  '& fieldset': {
                    border: 'none',
                  },
                  '&:hover': {
                    borderColor: `${agentColor.primary}44`,
                    background: 'rgba(0, 0, 0, 0.4)',
                  },
                  '&.Mui-focused': {
                    borderColor: agentColor.primary,
                    boxShadow: `0 0 0 2px ${agentColor.glow}`,
                  },
                },
                '& .MuiInputBase-input::placeholder': {
                  color: 'rgba(255, 255, 255, 0.4)',
                  opacity: 1,
                },
              }}
            />
          </Box>

          {/* Answer Field */}
          <Box sx={{ mb: 3 }}>
            <Typography
              sx={{
                fontSize: '15px',
                fontWeight: 700,
                mb: 2,
                color: 'rgba(255, 255, 255, 0.85)',
                fontFamily: 'var(--font-primary)',
              }}
            >
              Réponse <span style={{ color: '#ef4444' }}>*</span>
            </Typography>
            <TextField
              fullWidth
              multiline
              rows={4}
              value={newFaq.answer}
              onChange={(e) => setNewFaq({ ...newFaq, answer: e.target.value })}
              placeholder="Nos délais sont de 24-48h pour les grandes villes et 3-5 jours pour les autres villes."
              sx={{
                '& .MuiOutlinedInput-root': {
                  background: 'rgba(0, 0, 0, 0.3)',
                  backdropFilter: 'blur(10px)',
                  WebkitBackdropFilter: 'blur(10px)',
                  color: '#FFF',
                  borderRadius: '12px',
                  fontFamily: 'var(--font-primary)',
                  border: '2px solid rgba(255, 255, 255, 0.08)',
                  transition: 'all 0.3s ease',
                  '& fieldset': {
                    border: 'none',
                  },
                  '&:hover': {
                    borderColor: `${agentColor.primary}44`,
                    background: 'rgba(0, 0, 0, 0.4)',
                  },
                  '&.Mui-focused': {
                    borderColor: agentColor.primary,
                    boxShadow: `0 0 0 2px ${agentColor.glow}`,
                  },
                },
                '& .MuiInputBase-input::placeholder': {
                  color: 'rgba(255, 255, 255, 0.4)',
                  opacity: 1,
                },
              }}
            />
          </Box>

          {/* Category Field */}
          <Box sx={{ mb: 3, position: 'relative', zIndex: 9999 }}>
            <Typography
              sx={{
                fontSize: '15px',
                fontWeight: 700,
                mb: 2,
                color: 'rgba(255, 255, 255, 0.85)',
                fontFamily: 'var(--font-primary)',
              }}
            >
              Catégorie (optionnel)
            </Typography>
            <CustomSelect
              value={newFaq.category}
              onChange={(value) => setNewFaq({ ...newFaq, category: value })}
              options={categories}
              placeholder="Sélectionnez une catégorie"
              primaryColor={agentColor.primary}
              glowColor={agentColor.glow}
            />
          </Box>

          {/* Action Buttons */}
          <Box sx={{ display: 'flex', gap: 2 }}>
            {/* Cancel Button */}
            <Box
              component="button"
              onClick={() => {
                setShowAddFaq(false);
                setNewFaq({ question: '', answer: '', category: '' });
              }}
              sx={{
                position: 'relative',
                overflow: 'hidden',
                flex: 1,
                padding: '14px 28px',
                borderRadius: '16px',
                background: 'rgba(255, 255, 255, 0.02)',
                backdropFilter: 'blur(12px)',
                WebkitBackdropFilter: 'blur(12px)',
                color: '#FFF',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                cursor: 'pointer',
                fontWeight: 700,
                fontSize: '14px',
                fontFamily: 'var(--font-primary)',
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 1.5,
                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
                '&:hover': {
                  background: 'rgba(255, 255, 255, 0.08)',
                  backdropFilter: 'blur(16px)',
                  WebkitBackdropFilter: 'blur(16px)',
                  borderColor: `${agentColor.primary}66`,
                  transform: 'scale(1.05)',
                  boxShadow: `0 6px 20px ${agentColor.glow}`,
                  '& .shine-effect': {
                    transform: 'translateX(100%)',
                  },
                },
                '&:active': {
                  transform: 'scale(0.98)',
                },
              }}
            >
              <Box
                className="shine-effect"
                sx={{
                  position: 'absolute',
                  inset: 0,
                  background:
                    'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent)',
                  transform: 'translateX(-100%)',
                  transition: 'transform 0.7s ease-out',
                  pointerEvents: 'none',
                }}
              />
              <Box sx={{ position: 'relative', zIndex: 1 }}>Annuler</Box>
            </Box>

            {/* Save Button */}
            <Box
              component="button"
              onClick={handleAddFaq}
              disabled={!newFaq.question.trim() || !newFaq.answer.trim()}
              sx={{
                position: 'relative',
                overflow: 'hidden',
                flex: 1,
                padding: '14px 28px',
                borderRadius: '16px',
                background: `linear-gradient(135deg, ${agentColor.primary}, ${agentColor.primary}dd)`,
                backdropFilter: 'blur(12px)',
                WebkitBackdropFilter: 'blur(12px)',
                color: '#FFF',
                border: 'none',
                cursor: 'pointer',
                fontWeight: 700,
                fontSize: '14px',
                fontFamily: 'var(--font-primary)',
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                boxShadow: `0 4px 20px ${agentColor.glow}`,
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 1.5,
                opacity: !newFaq.question.trim() || !newFaq.answer.trim() ? 0.5 : 1,
                '&:hover': {
                  transform: 'scale(1.05)',
                  boxShadow: `0 6px 28px ${agentColor.glow}`,
                  backdropFilter: 'blur(16px)',
                  WebkitBackdropFilter: 'blur(16px)',
                  '& .shine-effect': {
                    transform: 'translateX(100%)',
                  },
                },
                '&:active': {
                  transform: 'scale(0.98)',
                },
                '&:disabled': {
                  cursor: 'not-allowed',
                  '&:hover': {
                    transform: 'none',
                  },
                },
              }}
            >
              <Box
                className="shine-effect"
                sx={{
                  position: 'absolute',
                  inset: 0,
                  background:
                    'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent)',
                  transform: 'translateX(-100%)',
                  transition: 'transform 0.7s ease-out',
                  pointerEvents: 'none',
                }}
              />
              <Box
                sx={{
                  position: 'relative',
                  zIndex: 1,
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1,
                }}
              >
                <FontAwesomeIcon icon="check" />
                Enregistrer
              </Box>
            </Box>
          </Box>
        </Box>
      </ConditionalComponent>

      {/* Empty State */}
      <ConditionalComponent isValid={wizardData.faqs.length === 0 && !showAddFaq}>
        <Box
          sx={{
            textAlign: 'center',
            py: 8,
            px: 3,
            background: 'rgba(255, 255, 255, 0.02)',
            borderRadius: '20px',
            border: '2px dashed rgba(255, 255, 255, 0.1)',
          }}
        >
          <Box
            sx={{
              fontSize: '64px',
              mb: 2,
              opacity: 0.3,
            }}
          >
            📋
          </Box>
          <Typography
            sx={{
              fontSize: '18px',
              fontWeight: 700,
              color: 'rgba(255, 255, 255, 0.8)',
              mb: 1,
              fontFamily: 'var(--font-primary)',
            }}
          >
            Aucune FAQ pour le moment
          </Typography>
          <Typography
            sx={{
              fontSize: '14px',
              color: 'rgba(255, 255, 255, 0.5)',
              fontFamily: 'var(--font-primary)',
            }}
          >
            Cliquez sur &quot;Ajouter une FAQ&quot; pour commencer
          </Typography>
        </Box>
      </ConditionalComponent>

      {/* FAQ List */}
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
        {wizardData.faqs.map((faq) => (
          <Box
            key={faq.id}
            sx={{
              background: 'rgba(255, 255, 255, 0.02)',
              backdropFilter: 'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)',
              border: '2px solid rgba(255, 255, 255, 0.06)',
              borderRadius: '20px',
              padding: 3,
              transition: 'all 0.3s ease',
              '&:hover': {
                borderColor: `${agentColor.primary}33`,
                background: 'rgba(255, 255, 255, 0.03)',
                transform: 'translateY(-2px)',
                boxShadow: `0 8px 24px ${agentColor.glow}22`,
              },
            }}
          >
            {/* Category Badge */}
            <ConditionalComponent isValid={!!faq.category}>
              <Box
                sx={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 1,
                  background: `linear-gradient(135deg, ${agentColor.primary}22, ${agentColor.primary}10)`,
                  color: agentColor.primary,
                  padding: '6px 14px',
                  borderRadius: '20px',
                  fontSize: '12px',
                  fontWeight: 600,
                  mb: 2,
                  fontFamily: 'var(--font-primary)',
                  border: `1px solid ${agentColor.primary}33`,
                }}
              >
                {categories.find((c) => c.id === faq.category)?.icon} {faq.category}
              </Box>
            </ConditionalComponent>

            {/* Question and Delete Button */}
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'flex-start',
                gap: 2,
                mb: 2,
              }}
            >
              <Typography
                sx={{
                  flex: 1,
                  fontSize: '16px',
                  fontWeight: 700,
                  color: '#FFF',
                  fontFamily: 'var(--font-primary)',
                  lineHeight: 1.5,
                }}
              >
                {faq.question}
              </Typography>

              {/* Delete Button */}
              <Box
                component="button"
                onClick={() => handleDeleteFaq(faq.id)}
                sx={{
                  position: 'relative',
                  overflow: 'hidden',
                  padding: '10px 18px',
                  borderRadius: '12px',
                  background: 'rgba(255, 255, 255, 0.02)',
                  backdropFilter: 'blur(12px)',
                  WebkitBackdropFilter: 'blur(12px)',
                  color: 'rgba(255, 255, 255, 0.7)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  cursor: 'pointer',
                  fontWeight: 600,
                  fontSize: '13px',
                  fontFamily: 'var(--font-primary)',
                  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 1,
                  flexShrink: 0,
                  '&:hover': {
                    background: 'rgba(239, 68, 68, 0.1)',
                    borderColor: '#ef4444',
                    color: '#ef4444',
                    transform: 'scale(1.05)',
                    boxShadow: '0 4px 12px rgba(239, 68, 68, 0.3)',
                    '& .shine-effect': {
                      transform: 'translateX(100%)',
                    },
                  },
                  '&:active': {
                    transform: 'scale(0.98)',
                  },
                }}
              >
                <Box
                  className="shine-effect"
                  sx={{
                    position: 'absolute',
                    inset: 0,
                    background:
                      'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent)',
                    transform: 'translateX(-100%)',
                    transition: 'transform 0.7s ease-out',
                    pointerEvents: 'none',
                  }}
                />
                <Box
                  sx={{
                    position: 'relative',
                    zIndex: 1,
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1,
                  }}
                >
                  <FontAwesomeIcon icon="trash" />
                  Supprimer
                </Box>
              </Box>
            </Box>

            {/* Answer */}
            <Typography
              sx={{
                fontSize: '14px',
                color: 'rgba(255, 255, 255, 0.7)',
                lineHeight: 1.7,
                fontFamily: 'var(--font-primary)',
              }}
            >
              {faq.answer}
            </Typography>
          </Box>
        ))}
      </Box>
    </Box>
  );
};
