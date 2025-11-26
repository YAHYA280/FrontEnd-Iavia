'use client';

import React from 'react';
import {
  Box,
  Stack,
  Button,
  IconButton,
  Typography,
  MenuList,
  MenuItem,
  useTheme,
  Tooltip,
} from '@mui/material';
import { FontAwesomeIcon } from '@/shared/components/fontawesome';
import { CalendarView } from '@/shared/types/calendar';
import ConditionalComponent from '@/shared/components/conditionalComponent';
import { styles } from './calendar-toolbar.styles';
import { usePopover } from '../../../../../hooks';

const VIEW_OPTIONS = [
  { value: 'dayGridMonth' as CalendarView, label: 'Mois', icon: 'calendar-days' },
  { value: 'timeGridWeek' as CalendarView, label: 'Semaine', icon: 'calendar-week' },
  { value: 'timeGridDay' as CalendarView, label: 'Jour', icon: 'calendar-day' },
  { value: 'listWeek' as CalendarView, label: 'Agenda', icon: 'list' },
] as const;

interface CalendarToolbarProps {
  date: string;
  view: CalendarView;
  onToday: () => void;
  onNextDate: () => void;
  onPrevDate: () => void;
  onChangeView: (newView: CalendarView) => void;
  onOpenFilters: () => void;
  onOpenDrafts: () => void;
  canReset: boolean;
  draftCount: number;
}

export const CalendarToolbar: React.FC<CalendarToolbarProps> = ({
  date,
  view,
  onToday,
  onNextDate,
  onPrevDate,
  onChangeView,
  onOpenFilters,
  onOpenDrafts,
  canReset,
  draftCount,
}) => {
  const theme = useTheme();
  const popover = usePopover();

  const selectedView = VIEW_OPTIONS.find((option) => option.value === view) || VIEW_OPTIONS[0];

  return (
    <>
      <Stack direction="row" alignItems="center" justifyContent="space-between" sx={styles.toolbar(theme)}>
        <Box sx={styles.leftSection}>
          <Button
            size="small"
            onClick={popover.onOpen}
            startIcon={<FontAwesomeIcon icon={selectedView.icon as any} style={{ fontSize: '16px' }} />}
            endIcon={<FontAwesomeIcon icon="chevron-down" style={{ fontSize: '12px' }} />}
            sx={styles.viewButton(theme)}
          >
            {selectedView.label}
          </Button>
        </Box>

        <Stack direction="row" alignItems="center" spacing={1} sx={styles.navigationSection}>
          <IconButton onClick={onPrevDate} sx={styles.navButton(theme)}>
            <FontAwesomeIcon icon="chevron-left" style={{ fontSize: '16px' }} />
          </IconButton>

          <Typography sx={styles.dateText(theme)}>{date}</Typography>

          <IconButton onClick={onNextDate} sx={styles.navButton(theme)}>
            <FontAwesomeIcon icon="chevron-right" style={{ fontSize: '16px' }} />
          </IconButton>
        </Stack>

        <Box sx={styles.rightSection}>
          <Button size="small" onClick={onToday} sx={styles.todayButton(theme)}>
            Aujourd&apos;hui
          </Button>

          <Tooltip title="Brouillons" arrow>
            <IconButton onClick={onOpenDrafts} sx={styles.filterButton(theme)}>
              <Box sx={styles.iconContainer}>
                <FontAwesomeIcon icon="file-lines" style={{ fontSize: '24px', color: '#EDEDED' }} />
                <ConditionalComponent isValid={draftCount > 0}>
                  <Box sx={styles.badgeContainer}>
                    <Typography sx={styles.badgeText}>
                      {draftCount > 9 ? '9+' : draftCount}
                    </Typography>
                  </Box>
                </ConditionalComponent>
              </Box>
            </IconButton>
          </Tooltip>

          <Tooltip title="Filtres" arrow>
            <IconButton onClick={onOpenFilters} sx={styles.filterButton(theme)}>
              <Box sx={styles.iconContainer}>
                <FontAwesomeIcon icon="filter" style={{ fontSize: '24px' }} />
                <ConditionalComponent isValid={canReset}>
                  <Box sx={styles.filterIndicator} />
                </ConditionalComponent>
              </Box>
            </IconButton>
          </Tooltip>
        </Box>
      </Stack>

      <ConditionalComponent isValid={popover.open}>
        <Box
          sx={styles.popoverContainer(popover.anchorEl)}
          onMouseLeave={popover.onClose}
        >
          <MenuList sx={styles.menuList}>
            {VIEW_OPTIONS.map((viewOption) => (
              <MenuItem
                key={viewOption.value}
                selected={viewOption.value === view}
                onClick={() => {
                  popover.onClose();
                  onChangeView(viewOption.value);
                }}
                sx={styles.menuItem(theme, viewOption.value === view)}
              >
                <FontAwesomeIcon
                  icon={viewOption.icon as any}
                  style={{ fontSize: '16px', marginRight: 12 }}
                />
                {viewOption.label}
              </MenuItem>
            ))}
          </MenuList>
        </Box>
      </ConditionalComponent>
    </>
  );
};

