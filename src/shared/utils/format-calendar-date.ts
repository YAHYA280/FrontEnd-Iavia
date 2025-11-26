import dayjs from 'dayjs';
import 'dayjs/locale/fr';
import { CalendarView } from '@/shared/types/calendar';

export function formatCalendarDate(date: Date, view: CalendarView): string {
  const d = dayjs(date).locale('fr');

  switch (view) {
    case 'timeGridDay':
      // Day
      return d.format('dddd D MMMM YYYY');
    case 'timeGridWeek':
      // Week
      const weekStart = d.startOf('week');
      const weekEnd = d.endOf('week');
      return `Semaine du ${weekStart.format('D')} au ${weekEnd.format('D MMMM YYYY')}`;
    case 'listWeek':
      // Agenda
      const listWeekStart = d.startOf('week');
      const listWeekEnd = d.endOf('week');
      if (listWeekStart.month() === listWeekEnd.month()) {
        return `${listWeekStart.format('D')} - ${listWeekEnd.format('D MMMM YYYY')}`;
      }
      return `${listWeekStart.format('D MMM')} - ${listWeekEnd.format('D MMM YYYY')}`;
    case 'dayGridMonth':
    default:
      // Month
      return d.format('MMMM YYYY');
  }
}

