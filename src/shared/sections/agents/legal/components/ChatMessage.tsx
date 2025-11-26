import React from 'react';
import { Box, Typography, Chip } from '@mui/material';
import Image from 'next/image';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { styles } from './chat-message.styles';
import { Message } from '@/shared/types/chat';
import ConditionalComponent from '@/shared/components/conditionalComponent';
import { FontAwesomeIcon } from '@/shared/components/fontawesome';
import { isAudioFile } from '@/utils/file-helpers';

interface ChatMessageProps {
  message: Message;
  userAvatar?: string;
  agentAvatar?: string;
}

export const ChatMessage: React.FC<ChatMessageProps> = ({
  message,
  userAvatar = "/images/default-user-avatar.jpg",
  agentAvatar = "/avatars/ziri-avatar.png"
}) => {
  const isUser = message.sender === 'user';
  const [avatarError, setAvatarError] = React.useState(false);
  const [agentAvatarError, setAgentAvatarError] = React.useState(false);

  const handleAvatarError = () => {
    if (isUser) {
      setAvatarError(true);
    } else {
      setAgentAvatarError(true);
    }
  };

  const handleAgentAvatarError = () => {
    setAgentAvatarError(true);
  };

  return (
    <Box sx={styles.messageContainer(isUser)}>
      <ConditionalComponent
        isValid={!isUser}
      >
        <Box sx={styles.avatar(isUser)}>
          <ConditionalComponent
            isValid={!agentAvatarError}
          >
            <Image
              src={agentAvatar}
              alt="Agent"
              width={32}
              height={32}
              style={{
                borderRadius: '50%',
                objectFit: 'cover'
              }}
              onError={handleAgentAvatarError}
            />
          </ConditionalComponent>
          <ConditionalComponent
            isValid={agentAvatarError}
          >
            <Box
              sx={{
                width: '100%',
                height: '100%',
                borderRadius: '50%',
                background: '#5d2eff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                fontSize: '14px',
                fontWeight: 'bold'
              }}
            >
              A
            </Box>
          </ConditionalComponent>
        </Box>
      </ConditionalComponent>

      <Box sx={styles.messageContent(isUser)}>
        <Box sx={styles.messageBubble(isUser)}>
          <ConditionalComponent
            isValid={isUser}
            defaultComponent={
              <Box sx={styles.messageText}>
                <ReactMarkdown
                  remarkPlugins={[remarkGfm]}
                  components={{
                    p: ({children}) => (
                      <Typography component="p" sx={{ mb: 1, ...styles.messageText }}>
                        {children}
                      </Typography>
                    ),
                    ul: ({children}) => (
                      <Box component="ul" sx={{ pl: 2, mb: 1 }}>
                        {children}
                      </Box>
                    ),
                    ol: ({children}) => (
                      <Box component="ol" sx={{ pl: 2, mb: 1 }}>
                        {children}
                      </Box>
                    ),
                    li: ({children}) => (
                      <Box component="li" sx={{ mb: 0.5 }}>
                        {children}
                      </Box>
                    ),
                    strong: ({children}) => (
                      <Box component="strong" sx={{ fontWeight: 700 }}>
                        {children}
                      </Box>
                    ),
                    code: ({inline, children}: any) => (
                      <ConditionalComponent
                        isValid={inline}
                        defaultComponent={
                          <Box component="pre" sx={{
                            backgroundColor: 'rgba(0,0,0,0.05)',
                            padding: 2,
                            borderRadius: 1,
                            overflow: 'auto',
                            mb: 1
                          }}>
                            <Box component="code" sx={{ fontFamily: 'monospace' }}>
                              {children}
                            </Box>
                          </Box>
                        }
                      >
                        <Box component="code" sx={{
                          backgroundColor: 'rgba(0,0,0,0.05)',
                          padding: '2px 4px',
                          borderRadius: '3px',
                          fontFamily: 'monospace',
                          fontSize: '0.9em'
                        }}>
                          {children}
                        </Box>
                      </ConditionalComponent>
                    ),
                  }}
                >
                  {message.content}
                </ReactMarkdown>
              </Box>
            }
          >
            <Typography sx={styles.messageText}>
              {message.content}
            </Typography>
          </ConditionalComponent>
        </Box>

        <ConditionalComponent
          isValid={!!message.files && message.files.length > 0}
        >
          <Box sx={styles.filesContainer}>
            {message.files?.map((file, index) => {
              if (isAudioFile(file)) {
                // Render audio player for audio files
                const audioUrl = URL.createObjectURL(file);
                return (
                  <Box
                    key={index}
                    sx={{
                      width: '100%',
                      maxWidth: '400px',
                      backgroundColor: isUser ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.03)',
                      borderRadius: 2,
                      padding: 2,
                      display: 'flex',
                      flexDirection: 'column',
                      gap: 1,
                    }}
                  >
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Box
                        sx={{
                          width: 40,
                          height: 40,
                          borderRadius: '50%',
                          backgroundColor: '#5D2EFF',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}
                      >
                        <FontAwesomeIcon
                          icon="microphone"
                          style={{ fontSize: '18px', color: 'white' }}
                        />
                      </Box>
                      <Box sx={{ flex: 1 }}>
                        <Typography variant="body2" sx={{ fontWeight: 600 }}>
                          Message vocal
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          {file.name}
                        </Typography>
                      </Box>
                    </Box>
                    <audio
                      controls
                      src={audioUrl}
                      style={{
                        width: '100%',
                        height: '40px',
                      }}
                      onLoadedMetadata={(e) => {
                        // Clean up the blob URL when component unmounts
                        return () => URL.revokeObjectURL(audioUrl);
                      }}
                    />
                  </Box>
                );
              } else {
                // Render chip for other files
                return (
                  <Chip
                    key={index}
                    label={file.name}
                    size="small"
                    sx={styles.fileChip}
                  />
                );
              }
            })}
          </Box>
        </ConditionalComponent>

        <Typography sx={styles.timestamp}>
          {message.timestamp.toLocaleTimeString('fr-FR', {
            hour: '2-digit',
            minute: '2-digit'
          })}
        </Typography>
      </Box>

      <ConditionalComponent
        isValid={isUser}
      >
        <Box sx={styles.avatar(isUser)}>
          <ConditionalComponent
            isValid={!avatarError}
          >
            <Image
              src={userAvatar}
              alt="Utilisateur"
              width={32}
              height={32}
              style={{
                borderRadius: '50%',
                objectFit: 'cover'
              }}
              onError={handleAvatarError}
            />
          </ConditionalComponent>
          <ConditionalComponent
            isValid={avatarError}
          >
            <Box
              sx={{
                width: '100%',
                height: '100%',
                borderRadius: '50%',
                backgroundColor: 'secondary.main',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                fontSize: '14px',
                fontWeight: 'bold'
              }}
            >
              U
            </Box>
          </ConditionalComponent>
        </Box>
      </ConditionalComponent>
    </Box>
  );
};