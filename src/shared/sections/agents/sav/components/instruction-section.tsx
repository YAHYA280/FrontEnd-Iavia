'use client';

import React, { useState, useRef, useEffect } from 'react';
import {
  Box,
  Typography,
  Button,
  useTheme,
  IconButton,
  TextField,
  Tooltip,
} from '@mui/material';
import { Edit as EditIcon, Delete as DeleteIcon } from '@mui/icons-material';
import { InstructionOption } from '@/shared/_mock/sav-subagents-config';
import ConditionalComponent from '@/shared/components/conditionalComponent';

export interface InstructionSectionProps {
  title: string;
  instructions: InstructionOption[];
  search: string;
  showAddInput: boolean;
  newLabel: string;
  editingInstructionId: string | null;
  editingLabel: string;
  addButtonIcon: string;
  addButtonText: string;
  inputPlaceholder: string;
  editPlaceholder: string;
  inputRef: React.RefObject<HTMLDivElement>;
  editInputRef: React.RefObject<HTMLDivElement>;
  onAddClick: () => void;
  onLabelChange: (value: string) => void;
  onSubmit: () => void;
  onCancel: () => void;
  onEditClick: (instruction: InstructionOption) => void;
  onEditLabelChange: (value: string) => void;
  onSubmitEdit: () => void;
  onCancelEdit: () => void;
  onDelete: (id: string) => void;
  onToggleActive: (id: string) => void;
  onEditClickOutside?: () => void;
}

export const InstructionSection: React.FC<InstructionSectionProps> = ({
  title,
  instructions,
  search,
  showAddInput,
  newLabel,
  editingInstructionId,
  editingLabel,
  addButtonIcon,
  addButtonText,
  inputPlaceholder,
  editPlaceholder,
  inputRef,
  editInputRef,
  onAddClick,
  onLabelChange,
  onSubmit,
  onCancel,
  onEditClick,
  onEditLabelChange,
  onSubmitEdit,
  onCancelEdit,
  onDelete,
  onToggleActive,
  onEditClickOutside,
}) => {
  const theme = useTheme();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        showAddInput &&
        inputRef.current &&
        !inputRef.current.contains(event.target as Node)
      ) {
        onCancel();
      }
      if (
        editingInstructionId &&
        editInputRef.current &&
        !editInputRef.current.contains(event.target as Node)
      ) {
        onEditClickOutside?.();
      }
    };

    if (showAddInput || editingInstructionId) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showAddInput, editingInstructionId]);

  const filteredInstructions = React.useMemo(() => {
    if (!search.trim()) return instructions;
    const searchLower = search.toLowerCase();
    return instructions.filter((opt) =>
      opt.label.toLowerCase().includes(searchLower)
    );
  }, [instructions, search]);

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography
          sx={{
            color: '#8D31FB',
            fontFamily: theme.typography.fontFamily,
            fontSize: { xs: '18px', sm: '20px' },
            fontStyle: 'normal',
            fontWeight: 600,
            lineHeight: '121.331%',
          }}
        >
          {title}
        </Typography>
        <ConditionalComponent isValid={!showAddInput}>
          <Button
            onClick={onAddClick}
            startIcon={
              <Box
                component="img"
                src={addButtonIcon}
                alt={addButtonText}
                sx={{
                  width: '18px',
                  height: '18px',
                  filter: 'brightness(0) invert(1)',
                }}
              />
            }
            sx={{
              display: 'inline-flex',
              padding: '9px 18px',
              alignItems: 'center',
              gap: '8px',
              borderRadius: '16px',
              background: '#8D31FB',
              color: '#FFF',
              fontFamily: theme.typography.fontFamily,
              fontSize: '15px',
              fontStyle: 'normal',
              fontWeight: 600,
              lineHeight: '121.331%',
              textTransform: 'none',
              transition: 'all 0.2s ease',
              '&:hover': {
                background: '#7B28E2',
                transform: 'translateY(-1px)',
              },
              '& .MuiButton-startIcon': {
                marginRight: '4px',
              },
            }}
          >
            {addButtonText}
          </Button>
        </ConditionalComponent>
      </Box>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <ConditionalComponent isValid={showAddInput}>
          <Box
            ref={inputRef}
            sx={{
              width: '100%',
              borderRadius: '24px',
              background: '#1A1D25',
              border: '2px solid transparent',
              backgroundImage:
                'linear-gradient(#1A1D25, #1A1D25), linear-gradient(180deg, #BE30FF 0.66%, #5D31F8 51.44%, #00A3FF 100%)',
              backgroundOrigin: 'border-box',
              backgroundClip: 'padding-box, border-box',
              boxShadow: '0 0 2px 0 rgba(0, 0, 0, 0.28), 0 16px 64px 0 rgba(0, 0, 0, 0.16)',
              padding: '4px 4px 4px 20px',
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              gap: 1,
            }}
          >
            <TextField
              fullWidth
              value={newLabel}
              onChange={(e) => onLabelChange(e.target.value)}
              onKeyPress={(e) => {
                if (e.key === 'Enter') {
                  onSubmit();
                } else if (e.key === 'Escape') {
                  onCancel();
                }
              }}
              placeholder={inputPlaceholder}
              autoFocus
              sx={{
                flex: 1,
                '& .MuiOutlinedInput-root': {
                  color: '#FFF',
                  fontFamily: theme.typography.fontFamily,
                  fontSize: '14px',
                  background: 'transparent',
                  padding: 0,
                  '& fieldset': { border: 'none' },
                  '&:hover fieldset': { border: 'none' },
                  '&.Mui-focused fieldset': { border: 'none' },
                },
                '& .MuiInputBase-input': {
                  padding: '8px 0',
                },
                '& .MuiInputBase-input::placeholder': {
                  color: 'rgba(255, 255, 255, 0.5)',
                  opacity: 1,
                },
              }}
            />
            <Button
              onClick={onSubmit}
              disabled={!newLabel.trim()}
              startIcon={
                <Box
                  component="img"
                  src={addButtonIcon}
                  alt={addButtonText}
                  sx={{
                    width: '16px',
                    height: '16px',
                    filter: 'brightness(0) invert(1)',
                  }}
                />
              }
              sx={{
                display: 'inline-flex',
                padding: '9px 18px',
                alignItems: 'center',
                gap: '8px',
                borderRadius: '16px',
                background: '#8D31FB',
                color: '#FFF',
                fontFamily: theme.typography.fontFamily,
                fontSize: '15px',
                fontStyle: 'normal',
                fontWeight: 600,
                lineHeight: '121.331%',
                textTransform: 'none',
                height: '100%',
                minHeight: '38px',
                transition: 'all 0.2s ease',
                '&:hover': {
                  background: '#7B28E2',
                  transform: 'translateY(-1px)',
                },
                '&:disabled': {
                  background: 'rgba(141, 49, 251, 0.3)',
                  color: 'rgba(255, 255, 255, 0.5)',
                },
                '& .MuiButton-startIcon': {
                  marginRight: '4px',
                },
              }}
            >
              {addButtonText}
            </Button>
          </Box>
        </ConditionalComponent>
        {filteredInstructions.map((option) => (
          <ConditionalComponent key={option.id} isValid={editingInstructionId !== option.id}>
            <Box
              sx={{
                width: '100%',
                borderRadius: '24px',
                background: '#4C2086',
                padding: { xs: '12px 16px', sm: '16px 20px' },
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                gap: 2,
              }}
            >
              <Typography
                sx={{
                  color: '#EDEDED',
                  fontFamily: theme.typography.fontTertiaryFamily,
                  fontSize: { xs: '14px', sm: '16px' },
                  fontStyle: 'normal',
                  fontWeight: 700,
                  lineHeight: '121.331%',
                  flex: 1,
                }}
              >
                {option.label}
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Tooltip title="Éditer" arrow>
                  <IconButton
                    onClick={() => onEditClick(option)}
                    sx={{
                      color: '#9CA3AF',
                      padding: '6px',
                      '&:hover': {
                        backgroundColor: 'rgba(156, 163, 175, 0.1)',
                        color: '#8D31FB',
                      },
                    }}
                  >
                    <EditIcon sx={{ fontSize: '20px' }} />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Supprimer" arrow>
                  <IconButton
                    onClick={() => onDelete(option.id)}
                    sx={{
                      color: '#9CA3AF',
                      padding: '6px',
                      '&:hover': {
                        backgroundColor: 'rgba(156, 163, 175, 0.1)',
                        color: '#8D31FB',
                      },
                    }}
                  >
                    <DeleteIcon sx={{ fontSize: '20px' }} />
                  </IconButton>
                </Tooltip>
                <Tooltip title={option.active ? 'Désactiver' : 'Activer'} arrow>
                  <IconButton
                    onClick={() => onToggleActive(option.id)}
                    sx={{
                      padding: 0,
                      width: '24.88px',
                      height: option.active ? '16.667px' : '25px',
                      '&:hover': {
                        opacity: 0.8,
                      },
                    }}
                  >
                    <ConditionalComponent isValid={option.active}>
                      <Box
                        component="img"
                        src="/icons/toggle-active.svg"
                        alt="Toggle actif"
                        sx={{
                          width: '24.88px',
                          height: '16.667px',
                        }}
                      />
                    </ConditionalComponent>
                    <ConditionalComponent isValid={!option.active}>
                      <Box
                        component="img"
                        src="/icons/toggle-inactive.svg"
                        alt="Toggle inactif"
                        sx={{
                          width: '24.88px',
                          height: '25px',
                        }}
                      />
                    </ConditionalComponent>
                  </IconButton>
                </Tooltip>
              </Box>
            </Box>
          </ConditionalComponent>
        ))}
        <ConditionalComponent isValid={editingInstructionId !== null && instructions.find(i => i.id === editingInstructionId) !== undefined}>
          <Box
            ref={editInputRef}
            sx={{
              width: '100%',
              borderRadius: '24px',
              background: '#1A1D25',
              border: '2px solid transparent',
              backgroundImage:
                'linear-gradient(#1A1D25, #1A1D25), linear-gradient(180deg, #BE30FF 0.66%, #5D31F8 51.44%, #00A3FF 100%)',
              backgroundOrigin: 'border-box',
              backgroundClip: 'padding-box, border-box',
              boxShadow: '0 0 2px 0 rgba(0, 0, 0, 0.28), 0 16px 64px 0 rgba(0, 0, 0, 0.16)',
              padding: '4px 4px 4px 20px',
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              gap: 1,
            }}
          >
            <TextField
              fullWidth
              value={editingLabel}
              onChange={(e) => onEditLabelChange(e.target.value)}
              onKeyPress={(e) => {
                if (e.key === 'Enter') {
                  onSubmitEdit();
                } else if (e.key === 'Escape') {
                  onCancelEdit();
                }
              }}
              placeholder={editPlaceholder}
              autoFocus
              sx={{
                flex: 1,
                '& .MuiOutlinedInput-root': {
                  color: '#FFF',
                  fontFamily: theme.typography.fontFamily,
                  fontSize: '14px',
                  background: 'transparent',
                  padding: 0,
                  '& fieldset': { border: 'none' },
                  '&:hover fieldset': { border: 'none' },
                  '&.Mui-focused fieldset': { border: 'none' },
                },
                '& .MuiInputBase-input': {
                  padding: '8px 0',
                },
                '& .MuiInputBase-input::placeholder': {
                  color: 'rgba(255, 255, 255, 0.5)',
                  opacity: 1,
                },
              }}
            />
            <Button
              onClick={onSubmitEdit}
              disabled={!editingLabel.trim()}
              startIcon={
                <Box
                  component="img"
                  src={addButtonIcon}
                  alt="Modifier"
                  sx={{
                    width: '16px',
                    height: '16px',
                    filter: 'brightness(0) invert(1)',
                  }}
                />
              }
              sx={{
                display: 'inline-flex',
                padding: '9px 18px',
                alignItems: 'center',
                gap: '8px',
                borderRadius: '16px',
                background: '#8D31FB',
                color: '#FFF',
                fontFamily: theme.typography.fontFamily,
                fontSize: '15px',
                fontStyle: 'normal',
                fontWeight: 600,
                lineHeight: '121.331%',
                textTransform: 'none',
                height: '100%',
                minHeight: '38px',
                transition: 'all 0.2s ease',
                '&:hover': {
                  background: '#7B28E2',
                  transform: 'translateY(-1px)',
                },
                '&:disabled': {
                  background: 'rgba(141, 49, 251, 0.3)',
                  color: 'rgba(255, 255, 255, 0.5)',
                },
                '& .MuiButton-startIcon': {
                  marginRight: '4px',
                },
              }}
            >
              Modifier
            </Button>
          </Box>
        </ConditionalComponent>
      </Box>
    </Box>
  );
};

