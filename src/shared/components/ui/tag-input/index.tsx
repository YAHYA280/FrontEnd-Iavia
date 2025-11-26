'use client';

import React, { useState, useRef, KeyboardEvent } from 'react';
import { Box, Typography, Chip } from '@mui/material';
import { FontAwesomeIcon } from '@/shared/components/fontawesome';

interface TagInputProps {
  tags: string[];
  onChange: (tags: string[]) => void;
  placeholder?: string;
  primaryColor?: string;
  glowColor?: string;
}

export const TagInput: React.FC<TagInputProps> = ({
  tags,
  onChange,
  placeholder = 'Ajouter un mot-clé...',
  primaryColor = '#A855F7',
  glowColor = 'rgba(168, 85, 247, 0.4)',
}) => {
  const [inputValue, setInputValue] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && inputValue.trim()) {
      e.preventDefault();
      if (!tags.includes(inputValue.trim())) {
        onChange([...tags, inputValue.trim()]);
      }
      setInputValue('');
    } else if (e.key === 'Backspace' && !inputValue && tags.length > 0) {
      onChange(tags.slice(0, -1));
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    onChange(tags.filter((tag) => tag !== tagToRemove));
  };

  return (
    <Box
      onClick={() => inputRef.current?.focus()}
      sx={{
        position: 'relative',
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: 1,
        padding: '12px 16px',
        minHeight: '56px',
        background: 'rgba(0, 0, 0, 0.3)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        border: isFocused ? `2px solid ${primaryColor}` : '2px solid rgba(255, 255, 255, 0.08)',
        borderRadius: '12px',
        cursor: 'text',
        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        boxShadow: isFocused ? `0 0 0 2px ${glowColor}` : 'none',
        '&:hover': {
          background: 'rgba(0, 0, 0, 0.4)',
          borderColor: isFocused ? primaryColor : `${primaryColor}44`,
        },
      }}
    >
      {tags.map((tag, index) => (
        <Chip
          key={index}
          label={tag}
          onDelete={() => handleRemoveTag(tag)}
          deleteIcon={
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                ml: 0.5,
              }}
            >
              <FontAwesomeIcon icon="times" style={{ fontSize: '12px' }} />
            </Box>
          }
          sx={{
            background: `linear-gradient(135deg, ${primaryColor}22, ${primaryColor}10)`,
            color: '#FFF',
            fontFamily: 'var(--font-primary)',
            fontSize: '13px',
            fontWeight: 600,
            border: `1px solid ${primaryColor}44`,
            backdropFilter: 'blur(10px)',
            WebkitBackdropFilter: 'blur(10px)',
            height: '32px',
            transition: 'all 0.2s ease',
            '& .MuiChip-deleteIcon': {
              color: 'rgba(255, 255, 255, 0.7)',
              transition: 'all 0.2s ease',
              '&:hover': {
                color: '#FFF',
              },
            },
            '&:hover': {
              background: `linear-gradient(135deg, ${primaryColor}28, ${primaryColor}14)`,
              borderColor: primaryColor,
              transform: 'scale(1.05)',
            },
          }}
        />
      ))}

      <input
        ref={inputRef}
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={handleKeyDown}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        placeholder={tags.length === 0 ? placeholder : ''}
        style={{
          flex: 1,
          minWidth: '120px',
          border: 'none',
          outline: 'none',
          background: 'transparent',
          color: '#FFF',
          fontFamily: 'var(--font-primary)',
          fontSize: '14px',
          fontWeight: 500,
        }}
      />
    </Box>
  );
};
