import { useMemo } from 'react';
import dayjs from 'dayjs';
import { ScheduledPost, CalendarRange } from '@/shared/types/calendar';

export function useEvent(
  posts: ScheduledPost[],
  selectEventId: string,
  selectedRange: CalendarRange | null,
  openForm: boolean
) {
  const currentPost = posts.find((post) => post.id === selectEventId);

  const defaultValues: Partial<ScheduledPost> = useMemo(
    () => {
      // Pour un post, on utilise une date unique
      // Si selectedRange existe, on utilise start comme date de publication
      // end sera calculé comme start + durée minimale (30 min) pour l'affichage dans le calendrier
      const baseDate = selectedRange 
        ? dayjs(selectedRange.start) 
        : dayjs(new Date());
      
      return {
        id: '',
        title: '',
        caption: '',
        imageUrls: [],
        platformIds: [],
        platformLogoSrcs: [],
        status: 'scheduled',
        start: baseDate.toISOString(),
        // Pour l'affichage dans FullCalendar, on définit end = start + 30 min
        // Mais dans le formulaire, on demandera seulement une date et une heure
        end: baseDate.add(30, 'minute').toISOString(),
        allDay: false,
      };
    },
    [selectedRange]
  );

  if (!openForm) {
    return undefined;
  }

  if (currentPost || selectedRange) {
    return { ...defaultValues, ...currentPost };
  }

  return defaultValues;
}

