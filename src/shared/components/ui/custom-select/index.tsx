'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Box, Typography } from '@mui/material';
import { FontAwesomeIcon } from '@/shared/components/fontawesome';
import ConditionalComponent from '../../conditionalComponent';

export interface SelectOption {
  id: string;
  icon?: string;
  title: string;
  description?: string;
}

interface CustomSelectProps {
  value: string;
  onChange: (value: string) => void;
  options: SelectOption[];
  placeholder?: string;
  primaryColor?: string;
  glowColor?: string;
}

export const CustomSelect: React.FC<CustomSelectProps> = ({
  value,
  onChange,
  options,
  placeholder = 'Sélectionnez une option',
  primaryColor = '#A855F7',
  glowColor = 'rgba(168, 85, 247, 0.4)',
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const selectedOption = options.find((opt) => opt.id === value);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleEscape);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen]);

  const handleSelect = (optionId: string) => {
    onChange(optionId);
    setIsOpen(false);
  };

  return (
    <Box
      ref={containerRef}
      sx={{
        position: 'relative',
        width: '100%',
      }}
    >
      {/* Select Trigger */}
      <Box
        onClick={() => setIsOpen(!isOpen)}
        sx={{
          position: 'relative',
          overflow: 'hidden',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '16px 20px',
          background: 'rgba(0, 0, 0, 0.3)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          border: isOpen ? `2px solid ${primaryColor}` : '2px solid rgba(255, 255, 255, 0.08)',
          borderRadius: '12px',
          cursor: 'pointer',
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          boxShadow: isOpen ? `0 0 0 2px ${glowColor}` : 'none',
          '&:hover': {
            background: 'rgba(0, 0, 0, 0.4)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            borderColor: `${primaryColor}44`,
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

        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 1.5,
            flex: 1,
            position: 'relative',
            zIndex: 1,
          }}
        >
          <ConditionalComponent isValid={Boolean(selectedOption)}>
            <>
              <ConditionalComponent isValid={Boolean(selectedOption?.icon)}>
                <span style={{ fontSize: '20px' }}>{selectedOption?.icon}</span>
              </ConditionalComponent>
              <Typography
                sx={{
                  fontSize: '16px',
                  fontWeight: 600,
                  color: '#FFF',
                  fontFamily: 'var(--font-primary)',
                }}
              >
                {selectedOption?.title}
              </Typography>
            </>
          </ConditionalComponent>

          <ConditionalComponent isValid={!selectedOption}>
            <Typography
              sx={{
                fontSize: '16px',
                color: 'rgba(255, 255, 255, 0.5)',
                fontFamily: 'var(--font-primary)',
              }}
            >
              {placeholder}
            </Typography>
          </ConditionalComponent>
        </Box>

        <FontAwesomeIcon
          icon={isOpen ? 'chevron-up' : 'chevron-down'}
          style={{
            fontSize: '14px',
            color: 'rgba(255, 255, 255, 0.7)',
            transition: 'all 0.3s ease',
            position: 'relative',
            zIndex: 1,
          }}
        />
      </Box>

      <ConditionalComponent isValid={Boolean(isOpen)}>
        <Box
          sx={{
            position: 'absolute',
            top: 'calc(100% + 8px)',
            left: 0,
            right: 0,
            zIndex: 1000,
            background: `linear-gradient(135deg, ${primaryColor}20, rgba(10, 10, 20, 0.98))`,
            backdropFilter: 'blur(40px)',
            WebkitBackdropFilter: 'blur(40px)',
            border: `1px solid ${primaryColor}44`,
            borderRadius: '16px',
            boxShadow: `0 8px 32px ${glowColor}, 0 4px 20px rgba(0, 0, 0, 0.8)`,
            maxHeight: '300px',
            overflowY: 'auto',
            padding: '8px',
            animation: 'slideDown 0.2s ease-out',
            '@keyframes slideDown': {
              from: {
                opacity: 0,
                transform: 'translateY(-8px)',
              },
              to: {
                opacity: 1,
                transform: 'translateY(0)',
              },
            },
            '&::-webkit-scrollbar': {
              width: '8px',
            },
            '&::-webkit-scrollbar-track': {
              background: 'rgba(255, 255, 255, 0.05)',
              borderRadius: '8px',
            },
            '&::-webkit-scrollbar-thumb': {
              background: `${primaryColor}66`,
              borderRadius: '8px',
              '&:hover': {
                background: primaryColor,
              },
            },
          }}
        >
          {options.map((option) => (
            <Box
              key={option.id}
              onClick={() => handleSelect(option.id)}
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 1.5,
                padding: '12px 16px',
                borderRadius: '8px',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                background: option.id === value
                  ? `linear-gradient(135deg, ${primaryColor}22, ${primaryColor}10)`
                  : 'transparent',
                '&:hover': {
                  background: option.id === value
                    ? `linear-gradient(135deg, ${primaryColor}28, ${primaryColor}14)`
                    : `linear-gradient(135deg, ${primaryColor}18, ${primaryColor}08)`,
                  transform: 'translateX(4px)',
                },
              }}
            >
              <ConditionalComponent isValid={Boolean(option.icon)}>
                <span style={{ fontSize: '24px' }}>{option.icon}</span>
              </ConditionalComponent>
              <Box sx={{ flex: 1 }}>
                <Typography
                  sx={{
                    fontSize: '14px',
                    fontWeight: 600,
                    color: '#FFF',
                    fontFamily: 'var(--font-primary)',
                    mb: option.description ? 0.5 : 0,
                  }}
                >
                  {option.title}
                </Typography>
                <ConditionalComponent isValid={Boolean(option.description)}>
                  <Typography
                    sx={{
                      fontSize: '12px',
                      color: 'rgba(255, 255, 255, 0.6)',
                      fontFamily: 'var(--font-primary)',
                    }}
                  >
                    {option.description}
                  </Typography>
                </ConditionalComponent>
              </Box>
              <ConditionalComponent isValid={option.id === value}>
                <FontAwesomeIcon
                  icon="check"
                  style={{
                    fontSize: '14px',
                    color: primaryColor,
                  }}
                />
              </ConditionalComponent>
            </Box>
          ))}
        </Box>
      </ConditionalComponent>
    </Box>
  );
};
