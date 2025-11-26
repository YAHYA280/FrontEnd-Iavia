import React from 'react';
import { Box, Typography, TextField } from '@mui/material';
import ConditionalComponent from '@/shared/components/conditionalComponent';
import { CustomSelect } from '@/shared/components/ui/custom-select';
import type { NotificationsStepProps } from './types';

export const StepNotifications: React.FC<NotificationsStepProps> = ({
  notifications,
  setNotifications,
  notificationChannels,
  setNotificationChannels,
  agentColor,
}) => {
  const pendingTicketNotif = notifications.find((n) => n.id === 'pending-ticket');

  const delayOptions = [
    { id: '30 minutes', title: '30 minutes' },
    { id: '1 heure', title: '1 heure' },
    { id: '2 heures', title: '2 heures' },
    { id: '4 heures', title: '4 heures' },
  ];

  return (
    <Box sx={{ maxWidth: '900px', margin: '0 auto' }}>
      {/* Notification Types Grid */}
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)' },
          gap: 2.5,
          mb: 5,
        }}
      >
        {notifications.map((notif, index) => (
          <Box
            key={notif.id}
            sx={{
              position: 'relative',
              overflow: 'hidden',
              background: notif.enabled
                ? `linear-gradient(135deg, ${agentColor.primary}12, ${agentColor.primary}06)`
                : 'rgba(255, 255, 255, 0.03)',
              backdropFilter: 'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)',
              border: notif.enabled
                ? `2px solid ${agentColor.primary}66`
                : '2px solid rgba(255, 255, 255, 0.08)',
              borderRadius: '16px',
              padding: 2.5,
              transition: 'all 0.3s ease',
              isolation: 'isolate',
              willChange: 'transform',
              cursor: 'pointer',
              '&:hover': {
                borderColor: `${agentColor.primary}88`,
                transform: 'translateX(4px)',
                '& .shine-effect': {
                  transform: 'translateX(100%)',
                },
              },
            }}
            onClick={() => {
              const newNotifs = [...notifications];
              newNotifs[index].enabled = !newNotifs[index].enabled;
              setNotifications(newNotifs);
            }}
          >
            {/* Shine effect */}
            <Box
              className="shine-effect"
              sx={{
                position: 'absolute',
                inset: 0,
                background:
                  'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.1), transparent)',
                transform: 'translateX(-100%)',
                transition: 'transform 0.7s ease-out',
                pointerEvents: 'none',
              }}
            />

            <Box
              sx={{
                position: 'relative',
                zIndex: 1,
                display: 'flex',
                alignItems: 'flex-start',
                gap: 2,
              }}
            >
              {/* Toggle Switch */}
              <Box
                sx={{
                  position: 'relative',
                  width: '48px',
                  height: '24px',
                  background: notif.enabled ? '#10b981' : 'rgba(255, 255, 255, 0.1)',
                  border: `2px solid ${notif.enabled ? '#10b981' : 'rgba(255, 255, 255, 0.2)'}`,
                  borderRadius: '16px',
                  flexShrink: 0,
                  mt: 0.25,
                  transition: 'all 0.3s ease',
                  '&::after': {
                    content: '""',
                    position: 'absolute',
                    width: '16px',
                    height: '16px',
                    background: '#FFF',
                    borderRadius: '50%',
                    top: '2px',
                    left: notif.enabled ? '24px' : '2px',
                    transition: 'all 0.3s ease',
                  },
                }}
              />

              <Box sx={{ flex: 1 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 1 }}>
                  <Box sx={{ fontSize: '24px' }}>{notif.icon}</Box>
                  <Typography
                    sx={{
                      fontSize: '16px',
                      fontWeight: 700,
                      color: '#FFF',
                      fontFamily: 'var(--font-primary)',
                    }}
                  >
                    {notif.title}
                  </Typography>
                </Box>
                <Typography
                  sx={{
                    fontSize: '13px',
                    color: 'rgba(255, 255, 255, 0.65)',
                    lineHeight: 1.5,
                    fontFamily: 'var(--font-primary)',
                  }}
                >
                  {notif.description}
                </Typography>
              </Box>
            </Box>
          </Box>
        ))}
      </Box>

      {/* Delay selector for pending ticket (if enabled) */}
      <ConditionalComponent isValid={!!pendingTicketNotif?.enabled}>
        <Box sx={{ mb: 5, position: 'relative', zIndex: 10 }}>
          <Typography
            sx={{
              fontSize: '15px',
              fontWeight: 700,
              mb: 2,
              color: 'rgba(255, 255, 255, 0.85)',
              fontFamily: 'var(--font-primary)',
            }}
          >
            ⏰ Délai avant alerte pour &quot;Ticket en attente&quot;
          </Typography>
          <CustomSelect
            value={pendingTicketNotif?.delay || '1 heure'}
            onChange={(value) => {
              const newNotifs = [...notifications];
              const index = newNotifs.findIndex((n) => n.id === 'pending-ticket');
              if (index !== -1) {
                newNotifs[index].delay = value;
                setNotifications(newNotifs);
              }
            }}
            options={delayOptions}
            placeholder="Sélectionnez un délai"
            primaryColor={agentColor.primary}
            glowColor={agentColor.glow}
          />
        </Box>
      </ConditionalComponent>

      {/* Shared Channels Configuration */}
      <Box
        sx={{
          background: 'rgba(255, 255, 255, 0.03)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          border: '2px solid rgba(255, 255, 255, 0.08)',
          borderRadius: '20px',
          padding: 3.5,
        }}
      >
        <Typography
          sx={{
            fontSize: '16px',
            fontWeight: 700,
            mb: 3,
            color: '#FFF',
            fontFamily: 'var(--font-primary)',
          }}
        >
          📢 Canaux de notification
        </Typography>

        {/* Channel Tabs */}
        <Box sx={{ display: 'flex', gap: 1.5, flexWrap: 'wrap', mb: 3 }}>
          {['email', 'whatsapp', 'telegram'].map((channel) => (
            <Box
              key={channel}
              onClick={() => {
                setNotificationChannels({ ...notificationChannels, activeChannel: channel });
              }}
              sx={{
                position: 'relative',
                overflow: 'hidden',
                padding: '12px 24px',
                background:
                  notificationChannels.activeChannel === channel
                    ? `linear-gradient(135deg, ${agentColor.primary}, ${agentColor.primary}dd)`
                    : 'rgba(0, 0, 0, 0.3)',
                border: `2px solid ${notificationChannels.activeChannel === channel ? agentColor.primary : 'rgba(255, 255, 255, 0.1)'}`,
                borderRadius: '12px',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                fontWeight: 600,
                fontSize: '15px',
                color: '#FFF',
                fontFamily: 'var(--font-primary)',
                display: 'flex',
                alignItems: 'center',
                gap: 1,
                '&:hover': {
                  borderColor: `${agentColor.primary}66`,
                  transform: 'scale(1.05)',
                },
              }}
            >
              <Box
                sx={{
                  position: 'relative',
                  zIndex: 1,
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1,
                }}
              >
                {channel === 'email' && '📧 Email'}
                {channel === 'whatsapp' && '💬 WhatsApp'}
                {channel === 'telegram' && '✈️ Telegram'}
              </Box>
            </Box>
          ))}
        </Box>

        {/* Channel Content */}
        <ConditionalComponent isValid={notificationChannels.activeChannel === 'email'}>
          <Box>
            <Typography
              sx={{
                fontSize: '13px',
                fontWeight: 600,
                mb: 1.5,
                color: 'rgba(255, 255, 255, 0.8)',
                fontFamily: 'var(--font-primary)',
              }}
            >
              Adresse email
            </Typography>
            <TextField
              fullWidth
              type="email"
              value={notificationChannels.email}
              onChange={(e) => {
                setNotificationChannels({ ...notificationChannels, email: e.target.value });
              }}
              placeholder="support@example.com"
              sx={{
                '& .MuiOutlinedInput-root': {
                  background: 'rgba(0, 0, 0, 0.3)',
                  backdropFilter: 'blur(10px)',
                  color: '#FFF',
                  borderRadius: '12px',
                  fontFamily: 'var(--font-primary)',
                  '& fieldset': {
                    borderColor: 'rgba(255, 255, 255, 0.1)',
                    borderWidth: '2px',
                  },
                  '&:hover fieldset': {
                    borderColor: `${agentColor.primary}66`,
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: agentColor.primary,
                  },
                },
              }}
            />
          </Box>
        </ConditionalComponent>

        <ConditionalComponent isValid={notificationChannels.activeChannel === 'whatsapp'}>
          <Box>
            <Typography
              sx={{
                fontSize: '13px',
                fontWeight: 600,
                mb: 1.5,
                color: 'rgba(255, 255, 255, 0.8)',
                fontFamily: 'var(--font-primary)',
              }}
            >
              Numéro WhatsApp
            </Typography>
            <TextField
              fullWidth
              type="tel"
              value={notificationChannels.whatsapp}
              onChange={(e) => {
                setNotificationChannels({ ...notificationChannels, whatsapp: e.target.value });
              }}
              placeholder="+212 6 XX XX XX XX"
              sx={{
                '& .MuiOutlinedInput-root': {
                  background: 'rgba(0, 0, 0, 0.3)',
                  backdropFilter: 'blur(10px)',
                  color: '#FFF',
                  borderRadius: '12px',
                  fontFamily: 'var(--font-primary)',
                  '& fieldset': {
                    borderColor: 'rgba(255, 255, 255, 0.1)',
                    borderWidth: '2px',
                  },
                  '&:hover fieldset': {
                    borderColor: `${agentColor.primary}66`,
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: agentColor.primary,
                  },
                },
              }}
            />
          </Box>
        </ConditionalComponent>

        <ConditionalComponent isValid={notificationChannels.activeChannel === 'telegram'}>
          <Box>
            <Typography
              sx={{
                fontSize: '13px',
                fontWeight: 600,
                mb: 1.5,
                color: 'rgba(255, 255, 255, 0.8)',
                fontFamily: 'var(--font-primary)',
              }}
            >
              Chat ID Telegram
            </Typography>
            <TextField
              fullWidth
              type="text"
              value={notificationChannels.telegram}
              onChange={(e) => {
                setNotificationChannels({ ...notificationChannels, telegram: e.target.value });
              }}
              placeholder="123456789"
              sx={{
                '& .MuiOutlinedInput-root': {
                  background: 'rgba(0, 0, 0, 0.3)',
                  backdropFilter: 'blur(10px)',
                  color: '#FFF',
                  borderRadius: '12px',
                  fontFamily: 'var(--font-primary)',
                  '& fieldset': {
                    borderColor: 'rgba(255, 255, 255, 0.1)',
                    borderWidth: '2px',
                  },
                  '&:hover fieldset': {
                    borderColor: `${agentColor.primary}66`,
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: agentColor.primary,
                  },
                },
              }}
            />
          </Box>
        </ConditionalComponent>
      </Box>
    </Box>
  );
};
