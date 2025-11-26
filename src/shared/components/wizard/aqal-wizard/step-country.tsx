import { Box, Typography, Grid } from '@mui/material';
import Image from 'next/image';
import { useState } from 'react';
import type { StepCountryProps } from './types';
import ConditionalComponent from '../../conditionalComponent';

export const StepCountry = ({ agentColor, onSelect }: StepCountryProps) => {
  const [selectedCountry, setSelectedCountry] = useState<'morocco' | 'france' | null>(null);

  const handleCountrySelect = (country: 'morocco' | 'france') => {
    setSelectedCountry(country);
    onSelect(country);
  };

  const countryCards = [
    {
      id: 'morocco' as const,
      name: 'Maroc',
      description: 'Configuration pour les entreprises marocaines',
      flag: '/flags/morocco.png',
    },
    {
      id: 'france' as const,
      name: 'France',
      description: 'Configuration pour les entreprises françaises',
      flag: '/flags/french.png',
    },
  ];

  return (
    <Box>
      {/* Countries Grid */}
      <Grid
        container
        spacing={4}
        justifyContent="center"
        sx={{ maxWidth: '900px', margin: '0 auto' }}
      >
        {countryCards.map((country) => {
          const isSelected = selectedCountry === country.id;

          return (
            <Grid item xs={12} md={6} key={country.id}>
              <Box
                sx={{
                  position: 'relative',
                  overflow: 'hidden',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: 3,
                  padding: { xs: 3, md: 4 },
                  background: isSelected
                    ? `linear-gradient(135deg, ${agentColor.primary}12, ${agentColor.primary}06)`
                    : 'rgba(255, 255, 255, 0.03)',
                  backdropFilter: 'blur(20px)',
                  WebkitBackdropFilter: 'blur(20px)',
                  borderRadius: '20px',
                  cursor: 'pointer',
                  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                  border: isSelected
                    ? `2px solid ${agentColor.primary}`
                    : '2px solid rgba(255, 255, 255, 0.08)',
                  boxShadow: isSelected ? `0 4px 16px ${agentColor.glow}33` : 'none',
                  isolation: 'isolate',
                  willChange: 'transform',
                  textAlign: 'center',
                  '&:hover': {
                    background: isSelected
                      ? `linear-gradient(135deg, ${agentColor.primary}18, ${agentColor.primary}08)`
                      : 'rgba(255, 255, 255, 0.06)',
                    borderColor: `${agentColor.primary}66`,
                    transform: 'translateY(-8px)',
                    boxShadow: isSelected
                      ? `0 6px 20px ${agentColor.glow}33`
                      : `0 6px 20px ${agentColor.glow}22`,
                    '& .shine-effect': {
                      transform: 'translateX(100%)',
                    },
                  },
                  ...(isSelected && {
                    boxShadow: `0 0 0 1px ${agentColor.primary}, 0 8px 32px ${agentColor.glow}`,
                  }),
                }}
                onClick={() => handleCountrySelect(country.id)}
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

                {/* Indicateur de sélection */}
                <ConditionalComponent isValid={isSelected}>
                  <Box
                    sx={{
                      position: 'absolute',
                      top: 12,
                      right: 12,
                      width: 24,
                      height: 24,
                      borderRadius: '50%',
                      background: agentColor.primary,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      boxShadow: `0 0 12px ${agentColor.glow}`,
                      zIndex: 2,
                    }}
                  >
                    <Typography
                      sx={{
                        fontSize: '14px',
                        fontWeight: 'bold',
                        color: '#FFF',
                      }}
                    >
                      ✓
                    </Typography>
                  </Box>
                </ConditionalComponent>

                <Box
                  sx={{
                    position: 'relative',
                    width: 100,
                    height: 100,
                    borderRadius: '50%',
                    overflow: 'hidden',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    border: isSelected
                      ? `3px solid ${agentColor.primary}`
                      : `2px solid ${agentColor.primary}33`,
                    boxShadow: isSelected
                      ? `0 0 30px ${agentColor.glow}`
                      : `0 0 20px ${agentColor.primary}40`,
                    transition: 'all 0.3s ease',
                    zIndex: 1,
                  }}
                >
                  <Image
                    alt={`Drapeau du ${country.name}`}
                    src={country.flag}
                    fill
                    style={{
                      objectFit: 'cover',
                    }}
                    sizes="100px"
                  />
                </Box>

                <Typography
                  sx={{
                    fontSize: '24px',
                    fontWeight: 700,
                    color: '#FFF',
                    mb: 1,
                    fontFamily: 'var(--font-primary)',
                    zIndex: 1,
                  }}
                >
                  {country.name}
                </Typography>

                <Typography
                  sx={{
                    fontSize: '14px',
                    color: isSelected ? 'rgba(255, 255, 255, 0.9)' : 'rgba(255, 255, 255, 0.7)',
                    lineHeight: 1.5,
                    fontFamily: 'var(--font-primary)',
                    zIndex: 1,
                  }}
                >
                  {country.description}
                </Typography>

                {/* Badge de statut */}
                <Box
                  sx={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 1,
                    background: isSelected ? `${agentColor.primary}66` : `${agentColor.primary}22`,
                    border: isSelected
                      ? `1px solid ${agentColor.primary}`
                      : `1px solid ${agentColor.primary}33`,
                    borderRadius: '20px',
                    padding: '8px 16px',
                    marginTop: 1,
                    transition: 'all 0.3s ease',
                    zIndex: 1,
                  }}
                >
                  <Typography
                    sx={{
                      fontSize: '12px',
                      fontWeight: 600,
                      color: isSelected ? '#FFF' : 'rgba(255, 255, 255, 0.8)',
                      fontFamily: 'var(--font-primary)',
                      textTransform: 'uppercase',
                      letterSpacing: '0.5px',
                    }}
                  >
                    {isSelected ? 'Sélectionné' : 'Cliquer pour sélectionner'}
                  </Typography>
                </Box>
              </Box>
            </Grid>
          );
        })}
      </Grid>
    </Box>
  );
};
