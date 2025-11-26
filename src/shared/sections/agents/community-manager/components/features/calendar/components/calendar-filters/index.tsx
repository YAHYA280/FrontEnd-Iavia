'use client';

import React from 'react';
import {
  Drawer,
  Box,
  Typography,
  IconButton,
  Button,
  Divider,
  useTheme,
  FormControl,
  Select,
  MenuItem,
  ListItemButton,
  ListItemText,
} from '@mui/material';
import dayjs from 'dayjs';
import { ScheduledPost } from '@/shared/types/calendar';
import { FontAwesomeIcon } from '@/shared/components/fontawesome';
import { defaultPlatforms } from '@/shared/_mock/community-manager-config';
import { PostStatus, CalendarFilters as CalendarFiltersType } from '@/shared/types/calendar';
import ConditionalComponent from '@/shared/components/conditionalComponent';
import { styles } from './calendar-filters.styles';

interface CalendarFiltersProps {
  open: boolean;
  onClose: () => void;
  filters: CalendarFiltersType;
  onFiltersChange: (filters: CalendarFiltersType) => void;
  canReset: boolean;
  onReset: () => void;
  events: ScheduledPost[];
  onClickEvent: (postId: string) => void;
}

const STATUS_OPTIONS: { value: PostStatus | 'all'; label: string }[] = [
  { value: 'all', label: 'Tous les statuts' },
  { value: 'scheduled', label: 'Planifié' },
  { value: 'published', label: 'Publié' },
];

export const CalendarFilters: React.FC<CalendarFiltersProps> = ({
  open,
  onClose,
  filters,
  onFiltersChange,
  canReset,
  onReset,
  events,
  onClickEvent,
}) => {
  const theme = useTheme();

  const handleStatusChange = (status: PostStatus | 'all') => {
    if (status === 'all') {
      onFiltersChange({ ...filters, statuses: [] });
    } else {
      onFiltersChange({ ...filters, statuses: [status] });
    }
  };

  const handlePlatformChange = (platformId: string) => {
    if (platformId === 'all') {
      onFiltersChange({ ...filters, platforms: [] });
    } else {
      onFiltersChange({ ...filters, platforms: [platformId] });
    }
  };

  const selectedStatus = filters.statuses.length === 0 ? 'all' : filters.statuses[0];
  const selectedPlatform = filters.platforms.length === 0 ? 'all' : filters.platforms[0];

  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={onClose}
      slotProps={{ backdrop: { invisible: true } }}
      sx={styles.drawer(theme)}
    >
      <Box sx={styles.header(theme)}>
        <Typography sx={styles.headerTitle(theme)}>Filtres avancés</Typography>
        <IconButton onClick={onClose} sx={styles.closeButton(theme)}>
          <FontAwesomeIcon icon="xmark" style={{ fontSize: '18px' }} />
        </IconButton>
      </Box>

      <Box sx={styles.contentContainer}>
        <Box sx={styles.sectionContainer}>
          <Typography sx={styles.sectionTitle(theme)}>Statut</Typography>
          <FormControl fullWidth sx={styles.formControl}>
            <Select
              value={selectedStatus}
              onChange={(e) => handleStatusChange(e.target.value as PostStatus | 'all')}
              displayEmpty
              renderValue={(selected) => {
                const option = STATUS_OPTIONS.find((opt) => opt.value === selected);
                return (
                  <Typography sx={styles.selectRenderValue(theme)}>
                    {option?.label || 'Tous les statuts'}
                  </Typography>
                );
              }}
              MenuProps={{
                PaperProps: {
                  sx: styles.selectMenuProps(theme),
                },
              }}
              sx={styles.select(theme)}
            >
              {STATUS_OPTIONS.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  <Typography sx={styles.menuItemText(theme)}>
                    {option.label}
                  </Typography>
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>

        <Divider sx={styles.divider} />

        <Box>
          <Typography sx={styles.sectionTitle(theme)}>Plateforme</Typography>
          <FormControl fullWidth sx={styles.formControl}>
            <Select
              value={selectedPlatform}
              onChange={(e) => handlePlatformChange(e.target.value)}
              displayEmpty
              renderValue={(selected) => {
                if (selected === 'all') {
                  return (
                    <Typography sx={styles.selectRenderValue(theme)}>
                      Toutes les plateformes
                    </Typography>
                  );
                }
                const platform = defaultPlatforms.find((p) => p.id === selected);
                return (
                  <Box sx={styles.platformSelectValue}>
                    <Box
                      component="img"
                      src={platform?.logoSrc}
                      alt={platform?.name}
                      sx={styles.platformLogo}
                    />
                    <Typography sx={styles.selectRenderValue(theme)}>
                      {platform?.name}
                    </Typography>
                  </Box>
                );
              }}
              MenuProps={{
                PaperProps: {
                  sx: styles.selectMenuProps(theme),
                },
              }}
              sx={styles.select(theme)}
            >
              <MenuItem value="all">
                <Typography sx={styles.menuItemText(theme)}>
                  Toutes les plateformes
                </Typography>
              </MenuItem>
              {defaultPlatforms.map((platform) => (
                <MenuItem key={platform.id} value={platform.id}>
                  <Box sx={styles.platformSelectValue}>
                    <Box
                      component="img"
                      src={platform.logoSrc}
                      alt={platform.name}
                      sx={styles.platformLogo}
                    />
                    <Typography sx={styles.menuItemText(theme)}>
                      {platform.name}
                    </Typography>
                  </Box>
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>

        <Divider sx={styles.divider} />

        <Box>
          <Typography sx={styles.sectionTitle(theme)}>
            Événements ({events.length})
          </Typography>
          <Box component="ul" sx={styles.eventsList}>
            <ConditionalComponent isValid={events.length === 0}>
              <Box sx={styles.emptyEvents(theme)}>
                Aucun événement
              </Box>
            </ConditionalComponent>
            <ConditionalComponent isValid={events.length > 0}>
              {events
                .sort((a, b) => dayjs(b.start).valueOf() - dayjs(a.start).valueOf())
                .map((event) => {
                  const platform = defaultPlatforms.find((p) => p.id === event.platformIds[0]);
                  const statusColor = event.status === 'scheduled' ? '#F59E0B' : '#10B981';
                  return (
                    <Box component="li" key={event.id}>
                      <ListItemButton
                        onClick={() => onClickEvent(event.id)}
                        sx={styles.eventItem}
                      >
                        <Box sx={styles.statusIndicator(statusColor)} />
                        <ListItemText
                          disableTypography
                          primary={
                            <Box sx={styles.eventPrimary}>
                              <ConditionalComponent isValid={!!platform}>
                                <Box
                                  component="img"
                                  src={platform?.logoSrc}
                                  alt={platform?.name}
                                  sx={styles.eventPlatformLogo}
                                />
                              </ConditionalComponent>
                              <Typography sx={styles.eventTitle(theme)}>
                                {event.title}
                              </Typography>
                            </Box>
                          }
                          secondary={
                            <Typography sx={styles.eventDate(theme)}>
                              {dayjs(event.start).format('DD/MM/YYYY HH:mm')}
                            </Typography>
                          }
                          sx={styles.listItemText}
                        />
                      </ListItemButton>
                    </Box>
                  );
                })}
            </ConditionalComponent>
          </Box>
        </Box>
      </Box>

      <ConditionalComponent isValid={canReset}>
        <Box sx={styles.resetContainer}>
          <Button
            onClick={onReset}
            variant="outlined"
            startIcon={<FontAwesomeIcon icon="arrow-rotate-left" style={{ fontSize: '14px' }} />}
            sx={styles.resetButton(theme)}
          >
            Réinitialiser les filtres
          </Button>
        </Box>
      </ConditionalComponent>
    </Drawer>
  );
};

