import { useRef, useState, useCallback } from 'react';
import type FullCalendar from '@fullcalendar/react';
import type { DateSelectArg, EventClickArg } from '@fullcalendar/core';
import type { DateClickArg } from '@fullcalendar/interaction';
import { CalendarView, CalendarRange } from '@/shared/types/calendar';

export function useCalendar() {
  const calendarRef = useRef<FullCalendar>(null);
  const calendarEl = calendarRef.current;

  const [date, setDate] = useState(new Date());
  const [openForm, setOpenForm] = useState(false);
  const [selectEventId, setSelectEventId] = useState('');
  const [selectedRange, setSelectedRange] = useState<CalendarRange | null>(null);
  const [view, setView] = useState<CalendarView>('dayGridMonth');

  const onOpenForm = useCallback(() => {
    setOpenForm(true);
  }, []);

  const onCloseForm = useCallback(() => {
    setOpenForm(false);
    setSelectedRange(null);
    setSelectEventId('');
  }, []);

  const onChangeView = useCallback(
    (newView: CalendarView) => {
      if (calendarEl) {
        const calendarApi = calendarEl.getApi();
        calendarApi.changeView(newView);
        setView(newView);
      }
    },
    [calendarEl]
  );

  const onDateToday = useCallback(() => {
    if (calendarEl) {
      const calendarApi = calendarEl.getApi();
      calendarApi.today();
      setDate(calendarApi.getDate());
    }
  }, [calendarEl]);

  const onDatePrev = useCallback(() => {
    if (calendarEl) {
      const calendarApi = calendarEl.getApi();
      calendarApi.prev();
      setDate(calendarApi.getDate());
    }
  }, [calendarEl]);

  const onDateNext = useCallback(() => {
    if (calendarEl) {
      const calendarApi = calendarEl.getApi();
      calendarApi.next();
      setDate(calendarApi.getDate());
    }
  }, [calendarEl]);

  const onDateClick = useCallback(
    (arg: DateClickArg) => {
      const clickedDate = arg.dateStr;
      onOpenForm();
      setSelectedRange({ start: clickedDate, end: clickedDate });
    },
    [onOpenForm]
  );

  const onSelectRange = useCallback(
    (arg: DateSelectArg) => {
      if (calendarEl) {
        const calendarApi = calendarEl.getApi();
        calendarApi.unselect();
      }
      onOpenForm();
      setSelectedRange({ start: arg.startStr, end: arg.startStr });
    },
    [calendarEl, onOpenForm]
  );

  const onClickEvent = useCallback(
    (arg: EventClickArg) => {
      const { event } = arg;
      onOpenForm();
      setSelectEventId(event.id);
    },
    [onOpenForm]
  );

  const onInitialView = useCallback(() => {
    if (calendarEl) {
      const calendarApi = calendarEl.getApi();
      const newView: CalendarView = 'dayGridMonth';
      calendarApi.changeView(newView);
      setView(newView);
    }
  }, [calendarEl]);

  return {
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
  };
}

