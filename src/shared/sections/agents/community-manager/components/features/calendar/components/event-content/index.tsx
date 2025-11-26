'use client';

import React from 'react';
import { Box, Typography, useTheme } from '@mui/material';
import dayjs from 'dayjs';
import { ScheduledPost, CalendarView } from '@/shared/types/calendar';
import { defaultPlatforms } from '@/shared/_mock/community-manager-config';
import ConditionalComponent from '@/shared/components/conditionalComponent';
import { styles } from './event-content.styles';

interface EventContentProps {
  eventInfo: any;
  view: CalendarView;
  onPlatformsClick: (e: React.MouseEvent<HTMLElement>, platforms: any[]) => void;
}

const MAX_VISIBLE_PLATFORMS = 2;

export const EventContent: React.FC<EventContentProps> = ({
  eventInfo,
  view,
  onPlatformsClick,
}) => {
  const theme = useTheme();
  const post = eventInfo.event.extendedProps.post as ScheduledPost;

  if (!post) return null;

  const isTimeGrid = view === 'timeGridWeek' || view === 'timeGridDay';
  const time = dayjs(eventInfo.event.start).format('HH:mm');
  const platforms = post.platformIds
    .map((id) => defaultPlatforms.find((p) => p.id === id))
    .filter(Boolean);
  const visiblePlatforms = platforms.slice(0, MAX_VISIBLE_PLATFORMS);
  const remainingPlatforms = platforms.slice(MAX_VISIBLE_PLATFORMS);

  return (
    <Box sx={styles.eventContent(theme)}>
      <Box sx={styles.eventHeader}>
        <ConditionalComponent isValid={visiblePlatforms.length > 0}>
          <Box sx={styles.platformsContainer}>
            {visiblePlatforms.map((platform, index) => (
              <ConditionalComponent
                key={`${platform?.id}-${index}`}
                isValid={!!platform}
              >
                <Box
                  component="img"
                  src={platform?.logoSrc}
                  alt={platform?.name}
                  sx={styles.platformLogo}
                />
              </ConditionalComponent>
            ))}
            <ConditionalComponent isValid={remainingPlatforms.length > 0}>
              <Box
                component="span"
                onClick={(e) => {
                  e.stopPropagation();
                  onPlatformsClick(e, remainingPlatforms);
                }}
                sx={styles.morePlatformsBadge}
              >
                +{remainingPlatforms.length}
              </Box>
            </ConditionalComponent>
          </Box>
        </ConditionalComponent>
        <Typography sx={styles.eventTitle(theme)}>
          {eventInfo.event.title}
        </Typography>
      </Box>
      <ConditionalComponent isValid={!isTimeGrid}>
        <Typography sx={styles.eventTime(theme)}>{time}</Typography>
      </ConditionalComponent>
    </Box>
  );
};

