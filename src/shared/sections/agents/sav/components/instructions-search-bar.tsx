'use client';

import React, { useState } from 'react';
import {
  Box,
  TextField,
  IconButton,
  Tooltip,
  FormControl,
  Select,
  MenuItem,
  useTheme,
} from '@mui/material';
import { Search } from '@mui/icons-material';
import ConditionalComponent from '@/shared/components/conditionalComponent';

export interface InstructionsSearchBarProps {
  search: string;
  onSearchChange: (value: string) => void;
  selectedFilter: string;
  onFilterChange: (value: string) => void;
}

export const InstructionsSearchBar: React.FC<InstructionsSearchBarProps> = ({
  search,
  onSearchChange,
  selectedFilter,
  onFilterChange,
}) => {
  const theme = useTheme();
  const [showFilterSelect, setShowFilterSelect] = useState(false);

  return (
    <Box sx={{
      display: 'flex',
      gap: { xs: 1, sm: 2 },
      mb: 3,
      alignItems: 'center',
      mt: 4,
      justifyContent: 'space-between',
      flexDirection: { xs: 'column', sm: 'row' },
    }}>
      <Box sx={{ width: { xs: '100%', sm: '360px' }, flex: { xs: '1 1 100%', sm: '0 0 auto' } }}>
        <TextField
          fullWidth
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Rechercher une instruction..."
          sx={{
            '& .MuiOutlinedInput-root': {
              color: '#FFF',
              fontFamily: theme.typography.fontFamily,
              fontSize: '14px',
              background: '#1A1D25',
              borderRadius: '24px',
              border: '2px solid transparent',
              backgroundImage:
                'linear-gradient(#1A1D25, #1A1D25), linear-gradient(180deg, #BE30FF 0.66%, #5D31F8 51.44%, #00A3FF 100%)',
              backgroundOrigin: 'border-box',
              backgroundClip: 'padding-box, border-box',
              boxShadow:
                '0 0 2px 0 rgba(0, 0, 0, 0.28), 0 16px 64px 0 rgba(0, 0, 0, 0.16)',
              padding: '4px 4px',
              '& fieldset': { border: 'none' },
              '&:hover fieldset': { border: 'none' },
              '&.Mui-focused fieldset': { border: 'none' },
            },
            '& .MuiInputBase-input': {
              padding: '8px 14px',
            },
            '& .MuiInputBase-input::placeholder': {
              color: 'rgba(255, 255, 255, 0.5)',
              opacity: 1,
            },
          }}
          InputProps={{
            endAdornment: (
              <IconButton
                sx={{
                  color: '#BE30FF',
                  padding: '4px',
                  '&:hover': { color: '#8D31FB', backgroundColor: 'rgba(190, 48, 255, 0.1)' },
                }}
              >
                <Search sx={{ fontSize: '20px' }} />
              </IconButton>
            ),
          }}
        />
      </Box>

      <Box sx={{
        display: 'flex',
        alignItems: 'center',
        width: { xs: '100%', sm: 'auto' },
        justifyContent: { xs: 'flex-end', sm: 'flex-start' },
      }}>
        <ConditionalComponent isValid={!showFilterSelect}>
          <Tooltip title="Filtrer" arrow>
            <IconButton
              onClick={() => setShowFilterSelect(true)}
              sx={{
                width: '41px',
                height: '41px',
                padding: 0,
                '&:hover': {
                  opacity: 0.8,
                },
              }}
            >
              <Box
                component="img"
                src="/icons/filter-icon.svg"
                alt="Filtrer"
                sx={{ width: '25px', height: '25px' }}
              />
            </IconButton>
          </Tooltip>
        </ConditionalComponent>
        <ConditionalComponent isValid={showFilterSelect}>
          <FormControl sx={{ minWidth: { xs: '100%', sm: 180 }, width: { xs: '100%', sm: 'auto' }, position: 'relative' }}>
            <Box
              component="img"
              src="/icons/filter-icon.svg"
              alt="Filtrer"
              sx={{
                position: 'absolute',
                left: '14px',
                top: '50%',
                transform: 'translateY(-50%)',
                width: '25px',
                height: '25px',
                zIndex: 1,
                pointerEvents: 'none',
              }}
            />
            <Select
              value={selectedFilter}
              onChange={(e) => {
                const value = e.target.value;
                onFilterChange(value);
                if (value === 'all') {
                  setShowFilterSelect(false);
                }
              }}
              sx={{
                background: '#1A1D25',
                borderRadius: '24px',
                color: '#FFF',
                fontFamily: theme.typography.fontFamily,
                fontSize: '14px',
                border: '2px solid transparent',
                backgroundImage:
                  'linear-gradient(#1A1D25, #1A1D25), linear-gradient(180deg, #BE30FF 0.66%, #5D31F8 51.44%, #00A3FF 100%)',
                backgroundOrigin: 'border-box',
                backgroundClip: 'padding-box, border-box',
                boxShadow: '0 0 2px 0 rgba(0, 0, 0, 0.28), 0 16px 64px 0 rgba(0, 0, 0, 0.16)',
                pl: 5,
                '& .MuiOutlinedInput-notchedOutline': {
                  border: 'none',
                },
                '&:hover .MuiOutlinedInput-notchedOutline': {
                  border: 'none',
                },
                '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                  border: 'none',
                },
                '& .MuiSelect-icon': {
                  color: '#FFF',
                },
              }}
              MenuProps={{
                PaperProps: {
                  sx: {
                    background: '#1A1D25',
                    borderRadius: '12px',
                    border: '1px solid rgba(141, 49, 251, 0.3)',
                    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.5)',
                    mt: 1,
                    '& .MuiMenuItem-root': {
                      color: '#FFF',
                      fontFamily: theme.typography.fontFamily,
                      fontSize: '14px',
                      padding: '10px 16px',
                      '&:hover': {
                        background: 'rgba(141, 49, 251, 0.15)',
                      },
                      '&.Mui-selected': {
                        background: 'rgba(141, 49, 251, 0.25)',
                        '&:hover': {
                          background: 'rgba(141, 49, 251, 0.35)',
                        },
                      },
                    },
                  },
                },
              }}
            >
              <MenuItem value="all">Tous</MenuItem>
              <MenuItem value="suggestions">Suggestions</MenuItem>
              <MenuItem value="restrictions">Restrictions</MenuItem>
            </Select>
          </FormControl>
        </ConditionalComponent>
      </Box>
    </Box>
  );
};

