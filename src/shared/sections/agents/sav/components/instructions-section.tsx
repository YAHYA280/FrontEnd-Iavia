'use client';

import React, { useState, useEffect, useRef, useMemo } from 'react';
import { Box, Tabs, Tab, useTheme } from '@mui/material';
import { useSavSubagentData } from '@/hooks/use-sav-subagent-data';
import { InstructionOption, StandardInstruction } from '@/shared/_mock/sav-subagents-config';
import { StandardInstructionsView } from './standard-instructions-view';
import { InstructionsList } from './instructions-list';
import ConditionalComponent from '@/shared/components/conditionalComponent';

export interface InstructionsSectionProps {
  subagentId?: string;
}

export const InstructionsSection: React.FC<InstructionsSectionProps> = ({
  subagentId = 'sav-general',
}) => {
  const theme = useTheme();
  const agentData = useSavSubagentData(subagentId);

  const initialInstructions = agentData.instructions || [];
  const initialStandardInstructions = agentData.standardInstructions || [];

  const [options, setOptions] = useState<InstructionOption[]>(initialInstructions);
  const [standardInstructions, setStandardInstructions] = useState<StandardInstruction[]>(initialStandardInstructions);
  const [currentTab, setCurrentTab] = useState(0);

  const prevSubagentIdRef = useRef<string>(subagentId);

  useEffect(() => {
    if (prevSubagentIdRef.current !== subagentId) {
      setOptions([...initialInstructions]);
      setStandardInstructions([...initialStandardInstructions]);
      prevSubagentIdRef.current = subagentId;
    }
  }, [subagentId]);

  const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
    setCurrentTab(newValue);
  };

  const handleToggleInstruction = (instructionId: string) => {
    setStandardInstructions((prev) =>
      prev.map((inst) => {
        if (inst.id === instructionId) {
          const newActive = !inst.active;
          if (!newActive) {
            return {
              ...inst,
              active: newActive,
              subInstructions: inst.subInstructions.map((sub) => ({
                ...sub,
                active: false,
              })),
            };
          }
          return { ...inst, active: newActive };
        }
        return inst;
      })
    );
  };

  const handleToggleSubInstruction = (instructionId: string, subInstructionId: string) => {
    setStandardInstructions((prev) =>
      prev.map((inst) => {
        if (inst.id === instructionId) {
          return {
            ...inst,
            subInstructions: inst.subInstructions.map((sub) =>
              sub.id === subInstructionId ? { ...sub, active: !sub.active } : sub
            ),
          };
        }
        return inst;
      })
    );
  };

  const handleAddSuggestion = (label: string) => {
    const newId = `suggestion-${Date.now()}`;
    const newOption: InstructionOption = {
      id: newId,
      label,
      active: true,
    };
    setOptions((prev) => [...prev, newOption]);
  };

  const handleRestrict = (label: string) => {
    const newId = `restriction-${Date.now()}`;
    const newOption: InstructionOption = {
      id: newId,
      label,
      active: false,
    };
    setOptions((prev) => [...prev, newOption]);
  };

  const handleEditInstruction = (id: string, newLabel: string) => {
    setOptions((prev) =>
      prev.map((opt) => (opt.id === id ? { ...opt, label: newLabel } : opt))
    );
  };

  const handleDeleteInstruction = (id: string) => {
    setOptions((prev) => prev.filter((opt) => opt.id !== id));
  };

  const handleToggleInstructionActive = (id: string) => {
    setOptions((prev) =>
      prev.map((opt) => (opt.id === id ? { ...opt, active: !opt.active } : opt))
    );
  };

  return (
    <Box>
      <Box
        sx={{
          borderBottom: 1,
          borderColor: 'rgba(156, 163, 175, 0.2)',
          mb: 4,
        }}
      >
        <Tabs
          value={currentTab}
          onChange={handleTabChange}
          sx={{
            '& .MuiTabs-indicator': {
              background: '#8D31FB',
              height: '2px',
            },
            '& .MuiTab-root': {
              color: '#9CA3AF',
              fontFamily: theme.typography.fontFamily,
              fontSize: '16px',
              fontWeight: 600,
              textTransform: 'none',
              minHeight: '48px',
              padding: '12px 24px',
              transition: 'all 0.3s ease',
              '&:hover': {
                color: '#B580F0',
              },
              '&.Mui-selected': {
                color: '#8D31FB',
              },
            },
          }}
        >
          <Tab label="Instructions standards" />
          <Tab label="Instructions personnalisées" />
        </Tabs>
      </Box>
      <Box>
        <ConditionalComponent isValid={currentTab === 0}>
          <StandardInstructionsView
            key={subagentId}
            instructions={standardInstructions}
            onToggleInstruction={handleToggleInstruction}
            onToggleSubInstruction={handleToggleSubInstruction}
          />
        </ConditionalComponent>
        <ConditionalComponent isValid={currentTab === 1}>
          <InstructionsList
            key={subagentId}
            options={options}
            onAddSuggestion={handleAddSuggestion}
            onRestrict={handleRestrict}
            onEditInstruction={handleEditInstruction}
            onDeleteInstruction={handleDeleteInstruction}
            onToggleInstructionActive={handleToggleInstructionActive}
          />
        </ConditionalComponent>
      </Box>
    </Box>
  );
};
