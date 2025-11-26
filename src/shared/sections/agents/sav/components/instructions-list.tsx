'use client';

import React, { useState, useMemo, useRef } from 'react';
import { Box, Typography, useTheme } from '@mui/material';
import { InstructionOption } from '@/shared/_mock/sav-subagents-config';
import ConditionalComponent from '@/shared/components/conditionalComponent';
import { InstructionsSearchBar } from './instructions-search-bar';
import { InstructionSection } from './instruction-section';
import { DeleteInstructionDialog } from './delete-instruction-dialog';

export interface InstructionsListProps {
  options: InstructionOption[];
  onAddSuggestion: (label: string) => void;
  onRestrict: (label: string) => void;
  onEditInstruction: (id: string, newLabel: string) => void;
  onDeleteInstruction: (id: string) => void;
  onToggleInstructionActive: (id: string) => void;
}

export const InstructionsList: React.FC<InstructionsListProps> = ({
  options,
  onAddSuggestion,
  onRestrict,
  onEditInstruction,
  onDeleteInstruction,
  onToggleInstructionActive,
}) => {
  const theme = useTheme();
  const [search, setSearch] = useState('');
  const [selectedFilter, setSelectedFilter] = useState<string>('all');
  const [showAddSuggestionInput, setShowAddSuggestionInput] = useState(false);
  const [showAddRestrictionInput, setShowAddRestrictionInput] = useState(false);
  const [newSuggestionLabel, setNewSuggestionLabel] = useState('');
  const [newRestrictionLabel, setNewRestrictionLabel] = useState('');
  const [editingInstructionId, setEditingInstructionId] = useState<string | null>(null);
  const [editingLabel, setEditingLabel] = useState('');
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [instructionToDelete, setInstructionToDelete] = useState<string | null>(null);
  const suggestionInputRef = useRef<HTMLDivElement>(null);
  const restrictionInputRef = useRef<HTMLDivElement>(null);
  const suggestionEditInputRef = useRef<HTMLDivElement>(null);
  const restrictionEditInputRef = useRef<HTMLDivElement>(null);

  const suggestions = useMemo(() => {
    return options.filter((opt) => opt.id.startsWith('suggestion-'));
  }, [options]);

  const restrictions = useMemo(() => {
    return options.filter((opt) => opt.id.startsWith('restriction-'));
  }, [options]);

  const handleAddSuggestionClick = () => {
    setShowAddSuggestionInput(true);
    setShowAddRestrictionInput(false);
    setEditingInstructionId(null);
  };

  const handleAddRestrictionClick = () => {
    setShowAddRestrictionInput(true);
    setShowAddSuggestionInput(false);
    setEditingInstructionId(null);
  };

  const handleSubmitSuggestion = () => {
    if (newSuggestionLabel.trim()) {
      onAddSuggestion(newSuggestionLabel.trim());
      setNewSuggestionLabel('');
      setShowAddSuggestionInput(false);
    }
  };

  const handleSubmitRestriction = () => {
    if (newRestrictionLabel.trim()) {
      onRestrict(newRestrictionLabel.trim());
      setNewRestrictionLabel('');
      setShowAddRestrictionInput(false);
    }
  };

  const handleCancelSuggestion = () => {
    setNewSuggestionLabel('');
    setShowAddSuggestionInput(false);
  };

  const handleCancelRestriction = () => {
    setNewRestrictionLabel('');
    setShowAddRestrictionInput(false);
  };

  const handleEditClick = (option: InstructionOption) => {
    setEditingInstructionId(option.id);
    setEditingLabel(option.label);
    setShowAddSuggestionInput(false);
    setShowAddRestrictionInput(false);
  };

  const handleSubmitEdit = () => {
    if (editingInstructionId && editingLabel.trim()) {
      onEditInstruction(editingInstructionId, editingLabel.trim());
      setEditingInstructionId(null);
      setEditingLabel('');
    }
  };

  const handleCancelEdit = () => {
    setEditingInstructionId(null);
    setEditingLabel('');
  };

  const handleDeleteClick = (id: string) => {
    setInstructionToDelete(id);
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = () => {
    if (instructionToDelete) {
      onDeleteInstruction(instructionToDelete);
      setInstructionToDelete(null);
    }
    setDeleteDialogOpen(false);
  };

  const handleDeleteCancel = () => {
    setInstructionToDelete(null);
    setDeleteDialogOpen(false);
  };

  return (
    <Box>
      <Typography
        variant="h6"
        sx={{
          color: '#FFF',
          fontFamily: theme.typography.fontFamily,
          fontSize: '24px',
          fontWeight: 600,
          mb: 1,
        }}
      >
        Gestion des instructions
      </Typography>

      <Typography
        sx={{
          maxWidth: { xs: '100%', sm: '1038px' },
          color: '#9CA3AF',
          fontFamily: theme.typography.fontFamily,
          fontSize: { xs: '14px', sm: '16px' },
          fontStyle: 'normal',
          fontWeight: 600,
          lineHeight: 'normal',
          mb: 4,
        }}
      >
        Liste des fonctionnalités permettant de définir les comportements souhaités (positifs) ou à éviter (négatifs) de votre agent IA.
      </Typography>

      <InstructionsSearchBar
        search={search}
        onSearchChange={setSearch}
        selectedFilter={selectedFilter}
        onFilterChange={setSelectedFilter}
      />

      <Box
        sx={{
          maxHeight: 'calc(100vh - 350px)',
          overflowY: 'auto',
          overflowX: 'hidden',
          pr: 1,
          '&::-webkit-scrollbar': {
            width: '6px',
          },
          '&::-webkit-scrollbar-track': {
            background: 'transparent',
          },
          '&::-webkit-scrollbar-thumb': {
            background: 'rgba(141, 49, 251, 0.3)',
            borderRadius: '3px',
            '&:hover': {
              background: 'rgba(141, 49, 251, 0.5)',
            },
          },
          scrollbarWidth: 'thin',
          scrollbarColor: 'rgba(141, 49, 251, 0.3) transparent',
        }}
      >
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
          <ConditionalComponent isValid={selectedFilter === 'all' || selectedFilter === 'suggestions'}>
            <InstructionSection
              title="Suggestions"
              instructions={suggestions}
              search={search}
              showAddInput={showAddSuggestionInput}
              newLabel={newSuggestionLabel}
              editingInstructionId={editingInstructionId}
              editingLabel={editingLabel}
              addButtonIcon="/icons/add-icon.svg"
              addButtonText="Ajouter"
              inputPlaceholder="Entrez votre suggestion..."
              editPlaceholder="Modifier l'instruction..."
              inputRef={suggestionInputRef}
              editInputRef={suggestionEditInputRef}
              onAddClick={handleAddSuggestionClick}
              onLabelChange={setNewSuggestionLabel}
              onSubmit={handleSubmitSuggestion}
              onCancel={handleCancelSuggestion}
              onEditClick={handleEditClick}
              onEditLabelChange={setEditingLabel}
              onSubmitEdit={handleSubmitEdit}
              onCancelEdit={handleCancelEdit}
              onDelete={handleDeleteClick}
              onToggleActive={onToggleInstructionActive}
              onEditClickOutside={handleCancelEdit}
            />
          </ConditionalComponent>

          <ConditionalComponent isValid={selectedFilter === 'all' || selectedFilter === 'restrictions'}>
            <InstructionSection
              title="Restrictions"
              instructions={restrictions}
              search={search}
              showAddInput={showAddRestrictionInput}
              newLabel={newRestrictionLabel}
              editingInstructionId={editingInstructionId}
              editingLabel={editingLabel}
              addButtonIcon="/icons/restrict-icon-dark.svg"
              addButtonText="Restreindre"
              inputPlaceholder="Entrez votre restriction..."
              editPlaceholder="Modifier la restriction..."
              inputRef={restrictionInputRef}
              editInputRef={restrictionEditInputRef}
              onAddClick={handleAddRestrictionClick}
              onLabelChange={setNewRestrictionLabel}
              onSubmit={handleSubmitRestriction}
              onCancel={handleCancelRestriction}
              onEditClick={handleEditClick}
              onEditLabelChange={setEditingLabel}
              onSubmitEdit={handleSubmitEdit}
              onCancelEdit={handleCancelEdit}
              onDelete={handleDeleteClick}
              onToggleActive={onToggleInstructionActive}
              onEditClickOutside={handleCancelEdit}
            />
          </ConditionalComponent>
        </Box>
      </Box>

      <DeleteInstructionDialog
        open={deleteDialogOpen}
        onClose={handleDeleteCancel}
        onConfirm={handleDeleteConfirm}
      />
    </Box>
  );
};
