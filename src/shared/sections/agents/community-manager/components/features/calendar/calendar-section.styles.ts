import { Theme } from '@mui/material/styles';

export const styles = {
  card: {
    backgroundColor: 'transparent',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    borderRadius: 2,
    overflow: 'hidden',
    display: 'flex',
    flexDirection: 'column' as const,
    height: '100%',
  },

  calendarContainer: {
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column' as const,
    overflow: 'hidden',
  },

  styledCalendar: (theme: Theme) => ({
    width: 'calc(100% + 2px)',
    marginLeft: -1,
    marginBottom: -1,
    flex: '1 1 auto',
    display: 'flex',
    flexDirection: 'column' as const,
    backgroundColor: 'rgb(12, 68, 106)',
    overflow: 'hidden',
    minHeight: 0,

    '& .fc': {
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      '--fc-border-color': 'rgba(255, 255, 255, 0.1)',
      '--fc-now-indicator-color': theme.palette.error?.main || '#E04343',
      '--fc-today-bg-color': 'rgba(6, 158, 255, 0.1)',
      '--fc-page-bg-color': 'rgb(12, 68, 106)',
      '--fc-neutral-bg-color': 'rgba(255, 255, 255, 0.02)',
      '--fc-list-event-hover-bg-color': 'rgba(255, 255, 255, 0.05)',
      '--fc-highlight-color': 'rgba(6, 158, 255, 0.2)',
    },

    '& .fc .fc-license-message': { display: 'none' },
    '& .fc a': { color: theme.palette.text?.primary || '#EDEDED' },

    '& .fc .fc-col-header': {
      boxShadow: 'inset 0 -1px 0 rgba(255, 255, 255, 0.1)',
      '& th': { borderColor: 'transparent' },
      '& .fc-col-header-cell-cushion': {
        fontFamily: theme.typography.fontFamily,
        fontSize: '14px',
        fontWeight: 600,
        color: '#EDEDED',
        padding: '13px 0',
      },
    },

    '& .fc .fc-list-empty': {
      fontFamily: theme.typography.fontFamily,
      fontSize: '18px',
      fontWeight: 600,
      backgroundColor: 'transparent',
      color: '#9CA3AF',
    },

    '& .fc .fc-event': {
      borderColor: 'transparent !important',
      backgroundColor: 'transparent !important',
      cursor: 'pointer',
    },

    '& .fc .fc-event .fc-event-main': {
      padding: '6px 10px',
      borderRadius: 2,
      backdropFilter: 'blur(10px)',
      transition: 'all 0.2s ease',
      border: 'none',
      boxShadow: '0 2px 8px rgba(0, 0, 0, 0.3)',
      minHeight: '38px',
      height: 'auto',
      width: '100%',
      position: 'relative',
      backgroundColor: 'transparent',
      '&::before': {
        content: '""',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        borderRadius: 2,
        backgroundColor: 'var(--event-bg-color, transparent)',
        opacity: 1,
        zIndex: 0,
        pointerEvents: 'none',
      },
      '& > *': {
        position: 'relative',
        zIndex: 1,
      },
      '&:hover': {
        transform: 'translateY(-2px)',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.4)',
        filter: 'brightness(1.1)',
      },
    },

    '& .fc .fc-event .fc-event-main-frame': {
      fontSize: 13,
      lineHeight: '16px',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'flex-start',
      gap: '2px',
      minHeight: '16px',
      width: '100%',
    },

    '& .fc .fc-daygrid-event .fc-event-title': {
      overflow: 'hidden',
      whiteSpace: 'nowrap',
      textOverflow: 'ellipsis',
      color: '#EDEDED',
      fontWeight: 500,
    },

    '& .fc .fc-event .fc-event-time': {
      overflow: 'unset',
      fontWeight: 600,
      color: '#EDEDED',
      fontSize: '12px',
    },

    '& .fc .fc-popover': {
      overflow: 'hidden',
      boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
      borderRadius: 12,
      backgroundColor: '#1F2937',
      border: '1px solid rgba(255, 255, 255, 0.1)',
      zIndex: 1000,
    },
    '& .fc .fc-more-popover': {
      backgroundColor: '#0d2d45',
      borderRadius: 4,
    },
    '& .fc .fc-more-popover .fc-popover-body': {
      padding: theme.spacing(1),
      maxHeight: '400px',
      overflowY: 'auto',
      '& .fc-daygrid-event, & .fc-timegrid-event': {
        margin: theme.spacing(0.5, 0),
        cursor: 'pointer',
        '& .fc-event-main': {
          padding: '8px 12px',
          minHeight: '44px',
          transition: 'all 0.2s ease',
        },
        '&:hover .fc-event-main': {
          transform: 'translateX(4px)',
          filter: 'brightness(1.1)',
        },
      },
    },

    '& .fc .fc-popover-header': {
      fontFamily: theme.typography.fontFamily,
      fontSize: '14px',
      fontWeight: 600,
      padding: theme.spacing(1),
      backgroundColor: 'rgba(255, 255, 255, 0.05)',
      color: '#EDEDED',
      borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
    },

    '& .fc .fc-popover-close': {
      opacity: 0.6,
      color: '#EDEDED',
      transition: 'opacity 0.2s',
      '&:hover': { opacity: 1 },
    },

    '& .fc .fc-daygrid-day-number': {
      fontFamily: theme.typography.fontFamily,
      fontSize: '14px',
      color: '#EDEDED',
      padding: theme.spacing(1, 1, 0),
    },

    '& .fc .fc-daygrid-day': {
      minHeight: '120px !important',
    },
    '& .fc .fc-daygrid-day-frame': {
      minHeight: '120px !important',
      display: 'flex',
      flexDirection: 'column',
    },
    '& .fc .fc-daygrid-day-bg': {
      overflow: 'hidden',
    },
    '& .fc .fc-daygrid-day-events': {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'stretch',
      justifyContent: 'flex-start',
      padding: '4px',
      gap: '3px',
      minHeight: '60px',
      position: 'relative',
      zIndex: 1,
      flex: '1 1 auto',
      overflow: 'visible',
    },
    '& .fc .fc-daygrid-event': {
      marginTop: '2px !important',
      marginBottom: '2px !important',
      width: 'calc(100% - 8px) !important',
      marginLeft: '4px !important',
      marginRight: '4px !important',
      flexShrink: 0,
      display: 'block !important',
    },
    '& .fc .fc-daygrid-event.fc-event-start, & .fc .fc-daygrid-event.fc-event-end': {
      marginLeft: '4px !important',
      marginRight: '4px !important',
      width: 'calc(100% - 8px) !important',
      display: 'block !important',
    },
    '& .fc .fc-timegrid': {
      height: '100%',
      overflow: 'visible',
    },
    '& .fc .fc-timegrid-body': {
      overflowY: 'auto !important',
      overflowX: 'hidden',
      '&::-webkit-scrollbar': {
        width: '8px',
      },
      '&::-webkit-scrollbar-track': {
        backgroundColor: 'rgba(255, 255, 255, 0.05)',
        borderRadius: '4px',
      },
      '&::-webkit-scrollbar-thumb': {
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
        borderRadius: '4px',
        '&:hover': {
          backgroundColor: 'rgba(255, 255, 255, 0.3)',
        },
      },
    },
    '& .fc .fc-scroller-liquid-absolute': {
      overflowY: 'auto !important',
      '&::-webkit-scrollbar': {
        width: '8px',
      },
      '&::-webkit-scrollbar-track': {
        backgroundColor: 'rgba(255, 255, 255, 0.05)',
        borderRadius: '4px',
      },
      '&::-webkit-scrollbar-thumb': {
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
        borderRadius: '4px',
        '&:hover': {
          backgroundColor: 'rgba(255, 255, 255, 0.3)',
        },
      },
    },
    '& .fc .fc-scroller': {
      overflowY: 'auto !important',
      height: '100%',
      '&::-webkit-scrollbar': {
        width: '8px',
      },
      '&::-webkit-scrollbar-track': {
        backgroundColor: 'rgba(255, 255, 255, 0.05)',
        borderRadius: '4px',
      },
      '&::-webkit-scrollbar-thumb': {
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
        borderRadius: '4px',
        '&:hover': {
          backgroundColor: 'rgba(255, 255, 255, 0.3)',
        },
      },
    },
    '& .fc .fc-timegrid-event': {
      borderColor: 'transparent !important',
      backgroundColor: 'transparent !important',
    },
    '& .fc .fc-timegrid-event .fc-event-main': {
      padding: '8px 12px',
      borderRadius: 2,
      backdropFilter: 'blur(10px)',
      transition: 'all 0.2s ease',
      border: 'none',
      boxShadow: '0 2px 8px rgba(0, 0, 0, 0.3)',
      minHeight: '42px',
      maxHeight: '50px',
      height: 'auto',
      width: '100%',
      position: 'relative',
      backgroundColor: 'transparent',
      '&::before': {
        content: '""',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        borderRadius: 2,
        backgroundColor: 'var(--event-bg-color, transparent)',
        opacity: 1,
        zIndex: 0,
        pointerEvents: 'none',
      },
      '& > *': {
        position: 'relative',
        zIndex: 1,
      },
      '&:hover': {
        transform: 'translateY(-2px)',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.4)',
        filter: 'brightness(1.1)',
      },
    },
    '& .fc .fc-timegrid-event .fc-event-time': {
      display: 'none',
    },
    '& .fc .fc-timegrid-event .fc-event-title-container': {
      marginTop: 0,
    },
    '& .fc .fc-daygrid-more-link': {
      fontFamily: theme.typography.fontFamily,
      fontSize: '12px',
      fontWeight: 600,
      color: '#EDEDED',
      padding: '6px 10px',
      marginTop: '3px',
      borderRadius: 4,
      backgroundColor: 'rgba(255, 255, 255, 0.15)',
      border: '1px solid rgba(255, 255, 255, 0.2)',
      transition: 'all 0.2s ease',
      cursor: 'pointer',
      display: 'block',
      textAlign: 'center',
      width: 'calc(100% - 8px)',
      marginLeft: '4px',
      marginRight: '4px',
      '&:hover': {
        backgroundColor: 'rgba(255, 255, 255, 0.25)',
        color: '#FFFFFF',
        textDecoration: 'none',
        transform: 'translateY(-1px)',
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.2)',
      },
    },
    '& .fc .fc-timegrid-more-link': {
      fontFamily: theme.typography.fontFamily,
      fontSize: '11px',
      fontWeight: 600,
      color: '#EDEDED',
      padding: '4px 8px',
      borderRadius: 4,
      backgroundColor: 'rgba(255, 255, 255, 0.15)',
      border: '1px solid rgba(255, 255, 255, 0.2)',
      transition: 'all 0.2s ease',
      cursor: 'pointer',
      display: 'inline-block',
      textAlign: 'center',
      marginLeft: '4px',
      '&:hover': {
        backgroundColor: 'rgba(255, 255, 255, 0.25)',
        color: '#FFFFFF',
        textDecoration: 'none',
        transform: 'translateY(-1px)',
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.2)',
      },
    },

    '& .fc .fc-timegrid-axis-cushion': {
      fontFamily: theme.typography.fontFamily,
      fontSize: '14px',
      fontWeight: 600,
      color: '#EDEDED',
      padding: theme.spacing(0.5, 1),
    },

    '& .fc .fc-timegrid-slot-label-cushion': {
      fontFamily: theme.typography.fontFamily,
      fontSize: '13px',
      color: '#9CA3AF',
    },

    '& .fc .fc-timegrid-axis': {
      borderRight: '1px solid rgba(255, 255, 255, 0.1)',
      backgroundColor: 'rgba(255, 255, 255, 0.03)',
    },

    '& .fc .fc-timegrid-all-day': {
      backgroundColor: 'rgba(255, 255, 255, 0.05)',
      borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
    },

    '& .fc .fc-timegrid-all-day-cushion': {
      fontFamily: theme.typography.fontFamily,
      fontSize: '13px',
      color: '#EDEDED',
      padding: theme.spacing(1, 1.5),
    },

    '& .fc .fc-list-event': {
      fontFamily: theme.typography.fontFamily,
      fontSize: '14px',
      '& .fc-list-event-time': { color: '#9CA3AF' },
    },
  }),

  eventContent: (theme: Theme) => ({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    gap: '4px',
    width: '100%',
    padding: '2px 0',
  }),

  eventPlatformLogo: {
    width: 18,
    height: 18,
    objectFit: 'contain' as const,
    flexShrink: 0,
  },

  eventTime: (theme: Theme) => ({
    fontFamily: theme.typography.fontFamily,
    fontSize: '11px',
    fontWeight: 600,
    color: '#EDEDED',
    opacity: 0.9,
    width: '100%',
    marginTop: '2px',
  }),

  eventTitle: (theme: Theme) => ({
    fontFamily: theme.typography.fontFamily,
    fontSize: '13px',
    fontWeight: 600,
    color: '#EDEDED',
    flex: 1,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap' as const,
    lineHeight: '1.3',
  }),
};

