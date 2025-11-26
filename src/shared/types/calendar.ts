export type PostStatus = 'scheduled' | 'published' | 'draft';

export type CalendarView = 'dayGridMonth' | 'timeGridWeek' | 'timeGridDay' | 'listWeek';

export interface ScheduledPost {
  id: string;
  title: string;
  caption: string;
  imageUrls: string[];
  platformIds: string[]; 
  platformLogoSrcs: string[]; 
  status: PostStatus;
  start: string;
  end: string;
  allDay: boolean;
  color?: string;
}

export interface CalendarFilters {
  statuses: PostStatus[];
  platforms: string[];
  startDate: Date | null;
  endDate: Date | null;
}

export interface CalendarRange {
  start: string;
  end: string;
}

