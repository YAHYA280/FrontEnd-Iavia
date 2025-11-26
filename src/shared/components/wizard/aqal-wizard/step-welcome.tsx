import React from 'react';
import { Box, Typography } from '@mui/material';
import type { StepWelcomeProps } from './types';

export const StepWelcome: React.FC<StepWelcomeProps> = ({ agentColor }) => (
  <Box>
    <Box
      sx={{
        textAlign: 'center',
        maxWidth: '900px',
        margin: '0 auto',
        pt: { xs: 2, md: 4 },
        pb: 4,
      }}
    >
      {/* Welcome Title */}
      <Typography
        sx={{
          fontSize: { xs: '36px', md: '48px' },
          fontWeight: 700,
          mb: 3,
          color: '#FFF',
          fontFamily: 'var(--font-tertiary)',
          textShadow: '0 4px 16px rgba(0,0,0,0.5)',
          letterSpacing: '-1px',
        }}
      >
        Configurez votre Agent Juridique AQAL
      </Typography>

      {/* Description */}
      <Typography
        sx={{
          fontSize: { xs: '17px', md: '19px' },
          color: 'rgba(255, 255, 255, 0.8)',
          lineHeight: 1.8,
          mb: { xs: 5, md: 6 },
          maxWidth: '700px',
          margin: '0 auto',
          fontFamily: 'var(--font-primary)',
        }}
      >
        AQAL est votre assistant juridique intelligent spécialisé dans la conformité fiscale et
        administrative. En quelques étapes simples, configurez-le selon la réglementation de votre
        pays et bénéficiez d&apos;un suivi automatisé de vos obligations légales.
      </Typography>

      {/* Steps Preview */}
      <Box
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'center',
          gap: 2,
          mb: { xs: 6, md: 8 },
          maxWidth: '900px',
          margin: '0 auto',
        }}
      >
        {[
          { icon: '🌍', text: 'Pays' },
          { icon: '📄', text: 'Documents' },
          { icon: '🏢', text: 'Entreprise' },
          { icon: '🔗', text: 'Intégrations' },
          { icon: '⚙️', text: 'Configuration' },
          { icon: '🔔', text: 'Notifications' },
          { icon: '📋', text: 'Résumé' },
        ].map((step, index) => (
          <Box
            key={index}
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 1,
              background: 'rgba(255, 255, 255, 0.03)',
              backdropFilter: 'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)',
              border: `1px solid ${agentColor.primary}22`,
              borderRadius: '12px',
              padding: '10px 18px',
              transition: 'all 0.3s ease',
              '&:hover': {
                background: `${agentColor.primary}15`,
                borderColor: `${agentColor.primary}66`,
                transform: 'translateY(-2px)',
                boxShadow: `0 4px 16px ${agentColor.glow}`,
              },
            }}
          >
            <Box sx={{ fontSize: '20px' }}>{step.icon}</Box>
            <Typography
              sx={{
                fontSize: '14px',
                fontWeight: 600,
                color: 'rgba(255, 255, 255, 0.85)',
                fontFamily: 'var(--font-primary)',
              }}
            >
              {step.text}
            </Typography>
          </Box>
        ))}
      </Box>

      {/* Features Preview Cards */}
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', sm: 'repeat(3, 1fr)' },
          gap: 3,
        }}
      >
        <Box
          sx={{
            background: 'rgba(255, 255, 255, 0.03)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            border: '2px solid rgba(255, 255, 255, 0.08)',
            borderRadius: '20px',
            padding: '20px 24px',
            textAlign: 'center',
            transition: 'all 0.3s ease',
            '&:hover': {
              borderColor: `${agentColor.primary}66`,
              transform: 'translateY(-4px)',
              boxShadow: `0 12px 32px ${agentColor.glow}`,
            },
          }}
        >
          <Box sx={{ fontSize: '48px', mb: 2 }}>⚡</Box>
          <Typography
            sx={{
              fontSize: '16px',
              fontWeight: 600,
              color: '#FFF',
              mb: 0.5,
              fontFamily: 'var(--font-primary)',
            }}
          >
            Conformité Automatisée
          </Typography>
          <Typography
            sx={{
              fontSize: '13px',
              color: 'rgba(255, 255, 255, 0.6)',
              fontFamily: 'var(--font-primary)',
            }}
          >
            Gestion automatique des échéances
          </Typography>
        </Box>

        <Box
          sx={{
            background: 'rgba(255, 255, 255, 0.03)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            border: '2px solid rgba(255, 255, 255, 0.08)',
            borderRadius: '20px',
            padding: '20px 24px',
            textAlign: 'center',
            transition: 'all 0.3s ease',
            '&:hover': {
              borderColor: `${agentColor.primary}66`,
              transform: 'translateY(-4px)',
              boxShadow: `0 12px 32px ${agentColor.glow}`,
            },
          }}
        >
          <Box sx={{ fontSize: '48px', mb: 2 }}>⚖️</Box>
          <Typography
            sx={{
              fontSize: '16px',
              fontWeight: 600,
              color: '#FFF',
              mb: 0.5,
              fontFamily: 'var(--font-primary)',
            }}
          >
            Expert Juridique
          </Typography>
          <Typography
            sx={{
              fontSize: '13px',
              color: 'rgba(255, 255, 255, 0.6)',
              fontFamily: 'var(--font-primary)',
            }}
          >
            Réglementations Maroc & France
          </Typography>
        </Box>

        <Box
          sx={{
            background: 'rgba(255, 255, 255, 0.03)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            border: '2px solid rgba(255, 255, 255, 0.08)',
            borderRadius: '20px',
            padding: '20px 24px',
            textAlign: 'center',
            transition: 'all 0.3s ease',
            '&:hover': {
              borderColor: `${agentColor.primary}66`,
              transform: 'translateY(-4px)',
              boxShadow: `0 12px 32px ${agentColor.glow}`,
            },
          }}
        >
          <Box sx={{ fontSize: '32px', mb: 2 }}>⏰</Box>
          <Typography
            sx={{
              fontSize: '14px',
              fontWeight: 600,
              color: '#FFF',
              mb: 0.5,
              fontFamily: 'var(--font-primary)',
            }}
          >
            Rappels Intelligents
          </Typography>
          <Typography
            sx={{
              fontSize: '12px',
              color: 'rgba(255, 255, 255, 0.6)',
              fontFamily: 'var(--font-primary)',
            }}
          >
            TVA, IS, IR, CNSS et taxes
          </Typography>
        </Box>
      </Box>
    </Box>
  </Box>
);
