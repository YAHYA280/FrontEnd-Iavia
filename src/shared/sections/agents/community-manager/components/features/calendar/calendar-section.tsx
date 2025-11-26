'use client';

import React, { useState, useEffect, useMemo, useCallback } from 'react';
import Calendar from '@fullcalendar/react';
import listPlugin from '@fullcalendar/list';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import frLocale from '@fullcalendar/core/locales/fr';
import { Box, Card, useTheme } from '@mui/material';
import dayjs from 'dayjs';
import 'dayjs/locale/fr';
import { ScheduledPost, CalendarFilters, PostStatus } from '@/shared/types/calendar';
import { mockScheduledPosts, defaultPlatforms } from '@/shared/_mock/community-manager-config';
import { useCalendar, useEvent } from '../../../hooks';
import { CalendarToolbar } from './components/calendar-toolbar';
import { CalendarFilters as CalendarFiltersComponent } from './components/calendar-filters';
import { CreatePostDialog } from '../../features/create-post';
import { DraftsDrawer } from './components/drafts-drawer';
import { PlatformsPopover } from './components/platforms-popover';
import { EventContent } from './components/event-content';
import { formatCalendarDate } from '@/shared/utils/format-calendar-date';
import { styles } from './calendar-section.styles';

const getStatusColor = (status: PostStatus): string => {
  switch (status) {
    case 'scheduled':
      return '#F59E0B';
    case 'published':
      return '#10B981';
    case 'draft':
      return '#6B7280';
    default:
      return '#F59E0B';
  }
};

export interface CalendarSectionProps {
  onCreatePostRef?: React.MutableRefObject<(() => void) | null>;
}

export const CalendarSection: React.FC<CalendarSectionProps> = ({ onCreatePostRef }) => {
  const theme = useTheme();
  const [posts, setPosts] = useState<ScheduledPost[]>(mockScheduledPosts);
  const [filters, setFilters] = useState<CalendarFilters>({
    statuses: [],
    platforms: [],
    startDate: null,
    endDate: null,
  });
  const [openFilters, setOpenFilters] = useState(false);
  const [openDrafts, setOpenDrafts] = useState(false);
  const [platformsPopoverAnchor, setPlatformsPopoverAnchor] = useState<{
    element: HTMLElement;
    platforms: any[];
  } | null>(null);

  const draftPosts = useMemo(() => {
    return posts.filter((post) => post.status === 'draft');
  }, [posts]);

  const {
    calendarRef,
    view,
    date,
    onDatePrev,
    onDateNext,
    onDateToday,
    onChangeView,
    onSelectRange,
    onDateClick,
    onClickEvent,
    onInitialView,
    openForm,
    onOpenForm,
    onCloseForm,
    selectEventId,
    selectedRange,
  } = useCalendar();

  const currentPost = useEvent(posts, selectEventId, selectedRange, openForm);

  useEffect(() => {
    onInitialView();
  }, [onInitialView]);

  useEffect(() => {
    if (selectedRange) {
      onOpenForm();
    }
  }, [selectedRange, onOpenForm]);

  const canReset = filters.statuses.length > 0 || filters.platforms.length > 0;

  const filteredPosts = useMemo(() => {
    let filtered = [...posts];

    if (filters.statuses.length > 0) {
      filtered = filtered.filter((post) => filters.statuses.includes(post.status));
    }

    if (filters.platforms.length > 0) {
      filtered = filtered.filter((post) =>
        post.platformIds.some((id) => filters.platforms.includes(id))
      );
    }

    return filtered;
  }, [posts, filters]);

  const calendarEvents = useMemo(() => {
    const postsForCalendar = filteredPosts.filter((post) => post.status !== 'draft');

    return postsForCalendar.map((post) => {
      const statusColor = getStatusColor(post.status);
      const bgColor =
        post.status === 'scheduled'
          ? 'rgba(245, 158, 11, 0.6)'
          : 'rgba(16, 185, 129, 0.6)';

      return {
        id: post.id,
        title: post.title,
        start: post.start,
        end: post.end,
        allDay: post.allDay,
        backgroundColor: bgColor,
        borderColor: statusColor,
        textColor: '#FFFFFF',
        extendedProps: {
          post,
        },
      };
    });
  }, [filteredPosts]);

  const handleCreatePost = useCallback(() => {
    onOpenForm();
  }, [onOpenForm]);

  React.useEffect(() => {
    if (onCreatePostRef) {
      onCreatePostRef.current = handleCreatePost;
    }
  }, [onCreatePostRef, handleCreatePost]);

  const handleSubmitPost = async (data: any) => {
    const combineDateAndTime = (date: dayjs.Dayjs, time: dayjs.Dayjs): dayjs.Dayjs => {
      const year = date.year();
      const month = date.month();
      const day = date.date();
      const hour = time.hour();
      const minute = time.minute();
      const localDate = new Date(year, month, day, hour, minute, 0, 0);
      return dayjs(localDate);
    };

    const toISOStringLocal = (date: dayjs.Dayjs): string => {
      return date.toISOString();
    };

    const convertFilesToUrls = async (files: File[]): Promise<string[]> => {
      const urls: string[] = [];
      for (const file of files) {
        const url = await new Promise<string>((resolve) => {
          const reader = new FileReader();
          reader.onloadend = () => resolve(reader.result as string);
          reader.readAsDataURL(file);
        });
        urls.push(url);
      }
      return urls;
    };

    if (currentPost?.id) {
      const updatedCaption = data.caption || currentPost.caption || '';
      const updatedTitle = updatedCaption.substring(0, 50) || 'Nouveau post';

      let updatedImageUrls = currentPost.imageUrls || [];
      if (data.mediaFiles && data.mediaFiles.length > 0) {
        updatedImageUrls = await convertFilesToUrls(data.mediaFiles);
      } else if (data.imageUrls && data.imageUrls.length > 0) {
        updatedImageUrls = data.imageUrls;
      } else if (data.generatedImageUrls && data.generatedImageUrls.length > 0) {
        updatedImageUrls = data.generatedImageUrls;
      }

      let newStartDate: dayjs.Dayjs | null = null;
      let newEndDate: dayjs.Dayjs | null = null;

      if (data.publishDate && data.publishTime) {
        const publishDateObj = dayjs(data.publishDate);
        const publishTimeObj = dayjs(data.publishTime);
        newStartDate = combineDateAndTime(publishDateObj, publishTimeObj);
        newEndDate = newStartDate.add(30, 'minute');
      }

      const wasDraft = currentPost.status === 'draft';
      const requestedStatus: PostStatus = data.forceStatus || currentPost.status || 'scheduled';
      const newStatus: PostStatus = requestedStatus;

      setPosts((prev) =>
        prev.map((post) =>
          post.id === currentPost.id
            ? {
              ...post,
              title: updatedTitle,
              caption: updatedCaption,
              imageUrls: updatedImageUrls,
              platformIds:
                data.selectedPlatforms && data.selectedPlatforms.length > 0
                  ? data.selectedPlatforms
                  : post.platformIds,
              platformLogoSrcs:
                data.selectedPlatforms && data.selectedPlatforms.length > 0
                  ? data.selectedPlatforms
                    .map((id: string) => defaultPlatforms.find((p) => p.id === id)?.logoSrc || '')
                    .filter(Boolean)
                  : post.platformLogoSrcs,
              start: newStartDate ? toISOStringLocal(newStartDate) : post.start,
              end: newEndDate ? toISOStringLocal(newEndDate) : post.end,
              status: newStatus,
            }
            : post
        )
      );

      setTimeout(() => {
        if (newStatus !== 'scheduled') {
          return;
        }
        if (calendarRef.current && currentPost?.id) {
          const calendarApi = calendarRef.current.getApi();
          const event = calendarApi.getEventById(currentPost.id);

          if (event) {
            if (wasDraft && newStartDate && newEndDate) {
              event.setProp('title', updatedTitle);
              event.setStart(toISOStringLocal(newStartDate));
              event.setEnd(toISOStringLocal(newEndDate));
              const currentView = calendarApi.view;
              calendarApi.changeView(currentView.type);
            } else if (newStartDate && newEndDate) {
              event.setProp('title', updatedTitle);
              event.setStart(toISOStringLocal(newStartDate));
              event.setEnd(toISOStringLocal(newEndDate));
              const currentView = calendarApi.view;
              calendarApi.changeView(currentView.type);
            }
          } else if (wasDraft && newStartDate && newEndDate) {
            const currentView = calendarApi.view;
            calendarApi.changeView(currentView.type);
          }
        }
      }, 100);
    } else {
      const status: PostStatus = data.saveAsDraft ? 'draft' : 'scheduled';

      let imageUrls: string[] = [];
      if (data.mode === 'manual') {
        if (data.mediaFiles && data.mediaFiles.length > 0) {
          imageUrls = await convertFilesToUrls(data.mediaFiles);
        } else if (data.imageUrls && data.imageUrls.length > 0) {
          imageUrls = data.imageUrls;
        }
      } else if (data.generatedImageUrls && data.generatedImageUrls.length > 0) {
        imageUrls = data.generatedImageUrls;
      }

      const baseDate = data.publishDate ? dayjs(data.publishDate) : dayjs();
      const publishTimeObj = data.publishTime ? dayjs(data.publishTime) : dayjs().hour(0).minute(0);

      const startDate = combineDateAndTime(baseDate, publishTimeObj);
      const endDate = startDate.add(30, 'minute');

      const uniqueId = `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

      const autoPlatforms =
        data.mode === 'manual'
          ? data.selectedPlatforms || []
          : data.generatedPlatforms && data.generatedPlatforms.length > 0
            ? data.generatedPlatforms
            : data.channels || [];

      const captionValue =
        data.mode === 'manual'
          ? data.caption || ''
          : data.generatedCaption || data.description || 'Post généré par IA';

      const finalPlatformIds =
        autoPlatforms.length > 0
          ? autoPlatforms
          : data.mode === 'manual'
            ? data.selectedPlatforms || []
            : data.channels || [];

      const newPost: ScheduledPost = {
        id: uniqueId,
        title: captionValue.substring(0, 50) || (data.mode === 'manual' ? 'Nouveau post' : 'Post généré par IA'),
        caption: captionValue,
        imageUrls,
        platformIds: finalPlatformIds,
        platformLogoSrcs: finalPlatformIds
          .map((id: string) => defaultPlatforms.find((p) => p.id === id)?.logoSrc || '')
          .filter(Boolean),
        status,
        start: toISOStringLocal(startDate),
        end: toISOStringLocal(endDate),
        allDay: false,
        color: getStatusColor(status),
      };
      setPosts((prev) => [...prev, newPost]);
    }
    onCloseForm();
  };

  const handleResetFilters = () => {
    setFilters({
      statuses: [],
      platforms: [],
      startDate: null,
      endDate: null,
    });
  };

  useEffect(() => {
    const copyEventColors = () => {
      const events = document.querySelectorAll('.fc-event, .fc-timegrid-event');
      events.forEach((event) => {
        const eventElement = event as HTMLElement;
        const mainElement = eventElement.querySelector('.fc-event-main') as HTMLElement;
        if (mainElement) {
          const bgColor =
            eventElement.style.backgroundColor || window.getComputedStyle(eventElement).backgroundColor;
          if (bgColor && bgColor !== 'rgba(0, 0, 0, 0)' && bgColor !== 'transparent') {
            mainElement.style.setProperty('--event-bg-color', bgColor);
          }
        }
      });
    };

    const timer = setTimeout(copyEventColors, 100);

    const observer = new MutationObserver(copyEventColors);
    const calendarElement = document.querySelector('.fc');
    if (calendarElement) {
      observer.observe(calendarElement, {
        childList: true,
        subtree: true,
        attributes: true,
        attributeFilter: ['style'],
      });
    }

    return () => {
      clearTimeout(timer);
      observer.disconnect();
    };
  }, [calendarEvents, view]);

  const renderEventContent = (eventInfo: any) => {
    return (
      <EventContent
        eventInfo={eventInfo}
        view={view}
        onPlatformsClick={(e, platforms) => {
          setPlatformsPopoverAnchor({ element: e.currentTarget, platforms });
        }}
      />
    );
  };

  const handleEditDraft = (postId: string) => {
    const mockEvent = {
      event: {
        id: postId,
        title: '',
        start: new Date(),
        end: new Date(),
      },
    };
    onClickEvent(mockEvent as any);
  };

  return (
    <>
      <Card sx={styles.card}>
        <Box sx={styles.calendarContainer}>
          <Box sx={styles.styledCalendar(theme)}>
            <CalendarToolbar
              date={formatCalendarDate(date, view)}
              view={view}
              onToday={onDateToday}
              onNextDate={onDateNext}
              onPrevDate={onDatePrev}
              onChangeView={onChangeView}
              onOpenFilters={() => setOpenFilters(true)}
              onOpenDrafts={() => setOpenDrafts(true)}
              canReset={canReset}
              draftCount={draftPosts.length}
            />

            <Calendar
              ref={calendarRef}
              plugins={[listPlugin, dayGridPlugin, timeGridPlugin, interactionPlugin]}
              initialView={view}
              initialDate={date}
              locale={frLocale}
              weekends
              editable
              selectable={false}
              dateClick={onDateClick}
              eventClick={onClickEvent}
              events={calendarEvents}
              headerToolbar={false}
              dayMaxEventRows={2}
              eventMaxStack={1}
              moreLinkClick="popover"
              eventDisplay="block"
              eventContent={renderEventContent}
              aspectRatio={1.8}
              eventInteractive={true}
              allDaySlot={true}
              slotMinTime="00:00:00"
              slotMaxTime="24:00:00"
              height="100%"
              scrollTime="08:00:00"
              scrollTimeReset={false}
              displayEventTime={true}
              displayEventEnd={false}
            />
          </Box>
        </Box>
      </Card>

      <CalendarFiltersComponent
        open={openFilters}
        onClose={() => setOpenFilters(false)}
        filters={filters}
        onFiltersChange={setFilters}
        canReset={canReset}
        onReset={handleResetFilters}
        events={filteredPosts.filter((post) => post.status !== 'draft')}
        onClickEvent={(postId: string) => {
          onClickEvent({ event: { id: postId } } as any);
          setOpenFilters(false);
        }}
      />

      <DraftsDrawer
        open={openDrafts}
        onClose={() => setOpenDrafts(false)}
        drafts={draftPosts}
        onEditDraft={handleEditDraft}
      />

      <CreatePostDialog
        open={openForm}
        selectedDate={selectedRange ? new Date(selectedRange.start) : null}
        currentPost={currentPost}
        onClose={onCloseForm}
        onSubmit={handleSubmitPost}
        onDelete={(postId: string) => {
          setPosts((prev) => prev.filter((post) => post.id !== postId));
          onCloseForm();
        }}
      />

      <PlatformsPopover
        open={Boolean(platformsPopoverAnchor)}
        anchorEl={platformsPopoverAnchor?.element || null}
        onClose={() => setPlatformsPopoverAnchor(null)}
        platforms={platformsPopoverAnchor?.platforms || []}
      />
    </>
  );
};

