'use client';

import React from 'react';
import { Box, Typography, useTheme, IconButton, Collapse } from '@mui/material';
import { ExpandMore as ExpandMoreIcon } from '@mui/icons-material';
import { StandardInstruction } from '@/shared/_mock/sav-subagents-config';
import ConditionalComponent from '@/shared/components/conditionalComponent';

export interface StandardInstructionsViewProps {
  instructions: StandardInstruction[];
  onToggleInstruction: (instructionId: string) => void;
  onToggleSubInstruction: (instructionId: string, subInstructionId: string) => void;
}

export const StandardInstructionsView: React.FC<StandardInstructionsViewProps> = ({
  instructions,
  onToggleInstruction,
  onToggleSubInstruction,
}) => {
  const theme = useTheme();
  const [expandedInstructions, setExpandedInstructions] = React.useState<Record<string, boolean>>(
    instructions.reduce((acc, inst) => ({ ...acc, [inst.id]: true }), {})
  );

  const instructionsIdsRef = React.useRef<string>(
    JSON.stringify(instructions.map(i => i.id).sort())
  );

  React.useEffect(() => {
    const currentIds = JSON.stringify(instructions.map(i => i.id).sort());
    if (instructionsIdsRef.current !== currentIds) {
      setExpandedInstructions(
        instructions.reduce((acc, inst) => ({ ...acc, [inst.id]: true }), {})
      );
      instructionsIdsRef.current = currentIds;
    }
  }, [instructions]);

  const toggleExpand = (instructionId: string) => {
    setExpandedInstructions((prev) => ({
      ...prev,
      [instructionId]: !prev[instructionId],
    }));
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
        Instructions standards
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
        Activez ou désactivez les instructions standards et leurs sous-instructions pour définir
        les comportements de votre agent SAV.
      </Typography>

      <Box sx={{ position: 'relative', width: '100%' }}>
        <Box
          sx={{
            position: 'relative',
            width: '100%',
            minHeight: '400px',
            background: 'rgba(26, 29, 37, 0.3)',
            borderRadius: '24px',
            border: '1px solid rgba(141, 49, 251, 0.15)',
            padding: '24px',
          }}
        >
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              gap: 3,
            }}
          >
            {instructions.map((instruction) => (
              <Box
                key={instruction.id}
                sx={{
                  borderRadius: '16px',
                  background: instruction.active ? 'rgba(141, 49, 251, 0.06)' : 'rgba(42, 47, 61, 0.4)',
                  border: instruction.active ? '1px solid rgba(141, 49, 251, 0.25)' : '1px solid rgba(156, 163, 175, 0.15)',
                  overflow: 'hidden',
                  transition: 'all 0.3s ease',
                }}
              >
                {/*  Main instruction  */}
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '16px 20px',
                    cursor: 'pointer',
                    '&:hover': {
                      background: instruction.active ? 'rgba(141, 49, 251, 0.1)' : 'rgba(42, 47, 61, 0.6)',
                    },
                  }}
                >
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 2,
                      flex: 1,
                      pl: instruction.subInstructions.length === 0 ? '40px' : instruction.active ? '16px' : 0,
                    }}
                  >
                    <ConditionalComponent isValid={instruction.subInstructions.length > 0}>
                      <IconButton
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleExpand(instruction.id);
                        }}
                        sx={{
                          padding: 0,
                          color: '#9CA3AF',
                          transform: expandedInstructions[instruction.id] ? 'rotate(0deg)' : 'rotate(-90deg)',
                          transition: 'transform 0.3s ease',
                        }}
                      >
                        <ExpandMoreIcon />
                      </IconButton>
                    </ConditionalComponent>

                    <Typography
                      onClick={() => instruction.subInstructions.length > 0 && toggleExpand(instruction.id)}
                      sx={{
                        color: '#C5C5C5',
                        fontFamily: theme.typography.fontFamily,
                        fontSize: '20px',
                        fontStyle: 'normal',
                        fontWeight: instruction.active ? 700 : 600,
                        lineHeight: '121.331%',
                        flex: 1,
                        cursor: instruction.subInstructions.length > 0 ? 'pointer' : 'default',
                        position: 'relative',
                        '&::before': instruction.active ? {
                          content: '""',
                          position: 'absolute',
                          left: '-12px',
                          top: '50%',
                          transform: 'translateY(-50%)',
                          width: '4px',
                          height: '20px',
                          background: '#8D31FB',
                          borderRadius: '2px',
                        } : {},
                      }}
                    >
                      {instruction.label}
                    </Typography>
                  </Box>

                  <IconButton
                    onClick={(e) => {
                      e.stopPropagation();
                      onToggleInstruction(instruction.id);
                    }}
                    sx={{
                      padding: 0,
                      width: '24.88px',
                      height: instruction.active ? '16.667px' : '25px',
                      flexShrink: 0,
                      '&:hover': {
                        opacity: 0.8,
                      },
                    }}
                  >
                    <ConditionalComponent isValid={instruction.active}>
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
                    <ConditionalComponent isValid={!instruction.active}>
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
                </Box>

                {/* Sub-instructions */}
                <ConditionalComponent isValid={instruction.subInstructions.length > 0}>
                  <Collapse in={expandedInstructions[instruction.id]} timeout="auto" unmountOnExit>
                    <Box
                      sx={{
                        padding: '0 20px 16px 20px',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 1,
                        pl: 8,
                      }}
                    >
                      {instruction.subInstructions.map((subInstruction) => (
                        <Box
                          key={subInstruction.id}
                          sx={{
                            display: 'flex',
                            height: '42px',
                            flexDirection: 'row',
                            alignItems: 'center',
                            gap: '10px',
                            background:
                              subInstruction.active && instruction.active
                                ? 'rgba(141, 49, 251, 0.08)'
                                : 'transparent',
                            borderRadius: '8px',
                            padding: '0 16px',
                            paddingLeft: subInstruction.active && instruction.active ? '28px' : '16px',
                            justifyContent: 'space-between',
                            opacity: instruction.active ? 1 : 0.5,
                          }}
                        >
                          <Typography
                            sx={{
                              color: '#B0B0B0',
                              fontFamily: theme.typography.fontFamily,
                              fontSize: '16px',
                              fontStyle: 'normal',
                              fontWeight: subInstruction.active && instruction.active ? 600 : 500,
                              lineHeight: '121.331%',
                              flex: 1,
                              position: 'relative',
                              '&::before': subInstruction.active && instruction.active ? {
                                content: '""',
                                position: 'absolute',
                                left: '-12px',
                                top: '50%',
                                transform: 'translateY(-50%)',
                                width: '3px',
                                height: '16px',
                                background: '#8D31FB',
                                borderRadius: '2px',
                              } : {},
                            }}
                          >
                            {subInstruction.label}
                          </Typography>
                          <IconButton
                            onClick={() => onToggleSubInstruction(instruction.id, subInstruction.id)}
                            disabled={!instruction.active}
                            sx={{
                              padding: 0,
                              width: '24.88px',
                              height:
                                subInstruction.active && instruction.active ? '16.667px' : '25px',
                              flexShrink: 0,
                              '&:hover': {
                                opacity: 0.8,
                              },
                              '&:disabled': {
                                opacity: 0.3,
                              },
                            }}
                          >
                            <ConditionalComponent isValid={subInstruction.active && instruction.active}>
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
                            <ConditionalComponent isValid={!(subInstruction.active && instruction.active)}>
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
                        </Box>
                      ))}
                    </Box>
                  </Collapse>
                </ConditionalComponent>
              </Box>
            ))}
          </Box>
        </Box>
      </Box>
    </Box>
  );
};
