import React from 'react';
import { Box, Typography, TextField, Select, MenuItem } from '@mui/material';
import { FontAwesomeIcon } from '@/shared/components/fontawesome';
import ConditionalComponent from '@/shared/components/conditionalComponent';
import type { WizardData, AgentColor } from './types';

interface FaqsSectionProps {
  wizardData: WizardData;
  showAddFaq: boolean;
  setShowAddFaq: React.Dispatch<React.SetStateAction<boolean>>;
  newFaq: { question: string; answer: string; category: string };
  setNewFaq: React.Dispatch<React.SetStateAction<{ question: string; answer: string; category: string }>>;
  handleAddFaq: () => void;
  handleDeleteFaq: (faqId: string) => void;
  agentColor: AgentColor;
}

export const FaqsSection: React.FC<FaqsSectionProps> = ({
  wizardData,
  showAddFaq,
  setShowAddFaq,
  newFaq,
  setNewFaq,
  handleAddFaq,
  handleDeleteFaq,
  agentColor,
}) => (
  <>
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
          color: 'rgba(255, 255, 255, 0.75)',
          textTransform: 'uppercase',
          letterSpacing: '0.5px',
        }}
      >
        Questions fréquentes
      </Typography>

      <Box
        component="button"
        onClick={() => setShowAddFaq(!showAddFaq)}
        sx={{
          background: `linear-gradient(135deg, ${agentColor.primary}, ${agentColor.primary}dd)`,
          color: '#FFF',
          padding: '10px 20px',
          borderRadius: '12px',
          border: 'none',
          cursor: 'pointer',
          fontWeight: 600,
          fontSize: '14px',
          transition: 'all 0.3s ease',
          display: 'inline-flex',
          alignItems: 'center',
          gap: 1,
          boxShadow: `0 4px 12px ${agentColor.glow}`,
          '&:hover': {
            transform: 'scale(1.05) translateY(-2px)',
            boxShadow: `0 6px 20px ${agentColor.glow}`,
          },
        }}
      >
        <FontAwesomeIcon icon="plus" />
        Ajouter
      </Box>
    </Box>

    <ConditionalComponent isValid={showAddFaq}>
      <Box
        sx={{
          background: 'rgba(255, 255, 255, 0.02)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          border: '2px solid rgba(255, 255, 255, 0.06)',
          borderRadius: '20px',
          padding: 3.5,
          mb: 3,
        }}
      >
        <Box sx={{ mb: 2.5 }}>
          <Typography
            sx={{
              mb: 1.5,
              fontWeight: 600,
              fontSize: '14px',
              color: 'rgba(255, 255, 255, 0.8)',
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
                color: '#FFF',
                borderRadius: '12px',
                fontFamily: 'var(--font-primary)',
                '& fieldset': {
                  borderColor: 'rgba(255, 255, 255, 0.1)',
                  borderWidth: '2px',
                },
                '&:hover fieldset': {
                  borderColor: `${agentColor.primary}66`,
                },
                '&.Mui-focused fieldset': {
                  borderColor: agentColor.primary,
                },
              },
            }}
          />
        </Box>

        <Box sx={{ mb: 2.5 }}>
          <Typography
            sx={{
              mb: 1.5,
              fontWeight: 600,
              fontSize: '14px',
              color: 'rgba(255, 255, 255, 0.8)',
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
            placeholder="Nos délais sont de 24-48h..."
            sx={{
              '& .MuiOutlinedInput-root': {
                background: 'rgba(0, 0, 0, 0.3)',
                backdropFilter: 'blur(10px)',
                color: '#FFF',
                borderRadius: '12px',
                fontFamily: 'var(--font-primary)',
                '& fieldset': {
                  borderColor: 'rgba(255, 255, 255, 0.1)',
                  borderWidth: '2px',
                },
                '&:hover fieldset': {
                  borderColor: `${agentColor.primary}66`,
                },
                '&.Mui-focused fieldset': {
                  borderColor: agentColor.primary,
                },
              },
            }}
          />
        </Box>

        <Box sx={{ mb: 2.5 }}>
          <Typography
            sx={{
              mb: 1.5,
              fontWeight: 600,
              fontSize: '14px',
              color: 'rgba(255, 255, 255, 0.8)',
            }}
          >
            Catégorie
          </Typography>
          <Select
            fullWidth
            value={newFaq.category}
            onChange={(e) => setNewFaq({ ...newFaq, category: e.target.value })}
            sx={{
              background: 'rgba(0, 0, 0, 0.3)',
              backdropFilter: 'blur(10px)',
              color: '#FFF',
              borderRadius: '12px',
              fontFamily: 'var(--font-primary)',
              '& .MuiOutlinedInput-notchedOutline': {
                borderColor: 'rgba(255, 255, 255, 0.1)',
                borderWidth: '2px',
              },
              '&:hover .MuiOutlinedInput-notchedOutline': {
                borderColor: `${agentColor.primary}66`,
              },
              '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                borderColor: agentColor.primary,
              },
            }}
          >
            <MenuItem value="">Aucune catégorie</MenuItem>
            <MenuItem value="Livraison">Livraison</MenuItem>
            <MenuItem value="Paiement">Paiement</MenuItem>
            <MenuItem value="Retours">Retours</MenuItem>
            <MenuItem value="Produits">Produits</MenuItem>
          </Select>
        </Box>

        <Box sx={{ display: 'flex', gap: 1.5 }}>
          <Box
            component="button"
            onClick={handleAddFaq}
            sx={{
              flex: 1,
              background: '#10b981',
              color: '#FFF',
              padding: '12px 24px',
              borderRadius: '12px',
              border: 'none',
              cursor: 'pointer',
              fontWeight: 600,
              fontSize: '14px',
              transition: 'all 0.3s ease',
              '&:hover': {
                background: '#059669',
                transform: 'scale(1.05) translateY(-2px)',
              },
            }}
          >
            ✓ Enregistrer
          </Box>
          <Box
            component="button"
            onClick={() => setShowAddFaq(false)}
            sx={{
              flex: 1,
              background: 'rgba(255, 255, 255, 0.05)',
              backdropFilter: 'blur(10px)',
              color: '#FFF',
              padding: '12px 24px',
              borderRadius: '12px',
              border: '2px solid rgba(255, 255, 255, 0.1)',
              cursor: 'pointer',
              fontWeight: 600,
              fontSize: '14px',
              transition: 'all 0.3s ease',
              '&:hover': {
                borderColor: `${agentColor.primary}66`,
                background: 'rgba(255, 255, 255, 0.08)',
                transform: 'scale(1.05)',
              },
            }}
          >
            Annuler
          </Box>
        </Box>
      </Box>
    </ConditionalComponent>

    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
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
            },
          }}
        >
          <ConditionalComponent isValid={!!faq.category}>
            <Box
              sx={{
                display: 'inline-block',
                background: `${agentColor.primary}22`,
                color: agentColor.primary,
                padding: '6px 14px',
                borderRadius: '20px',
                fontSize: '12px',
                fontWeight: 600,
                mb: 2,
              }}
            >
              {faq.category}
            </Box>
          </ConditionalComponent>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'flex-start',
              mb: 2,
            }}
          >
            <Typography
              sx={{
                flex: 1,
                fontSize: '16px',
                fontWeight: 700,
                color: '#FFF',
                pr: 2,
                fontFamily: 'var(--font-primary)',
              }}
            >
              {faq.question}
            </Typography>
            <Box
              component="button"
              onClick={() => handleDeleteFaq(faq.id)}
              sx={{
                background: '#ef4444',
                color: '#FFF',
                padding: '8px 16px',
                borderRadius: '10px',
                border: 'none',
                cursor: 'pointer',
                fontWeight: 600,
                fontSize: '13px',
                transition: 'all 0.3s ease',
                '&:hover': {
                  background: '#dc2626',
                  transform: 'scale(1.05) translateY(-2px)',
                },
              }}
            >
              🗑️ Supprimer
            </Box>
          </Box>
          <Typography
            sx={{
              fontSize: '14px',
              color: 'rgba(255, 255, 255, 0.65)',
              lineHeight: 1.7,
              fontFamily: 'var(--font-primary)',
            }}
          >
            {faq.answer}
          </Typography>
        </Box>
      ))}
    </Box>
  </>
);
