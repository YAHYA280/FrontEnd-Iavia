import React, { useRef, useState, useCallback } from 'react';
import { Box, Typography, TextField, IconButton, Tooltip, Chip, Input } from '@mui/material';
import { FontAwesomeIcon } from '@/shared/components/fontawesome';
import { styles } from './new-chat-interface.styles';
import { ChatMessage } from './ChatMessage';
import ConditionalComponent from '@/shared/components/conditionalComponent';
import { useAudioRecorder } from '@/hooks/use-audio-recorder';

interface NewChatInterfaceProps {
  messages?: Array<{
    id: string;
    content: string;
    sender: 'user' | 'agent';
    timestamp: Date;
    type: 'text' | 'file';
    files?: File[];
  }>;
  onSendMessage: (message: string, files?: File[]) => void;
  onAttachFile?: () => void;
  onRecordAudio?: () => void;
}

export const NewChatInterface: React.FC<NewChatInterfaceProps> = ({
  messages = [],
  onSendMessage,
  onAttachFile,
  onRecordAudio,
}) => {
  const [message, setMessage] = useState('');
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const [recordedAudioFile, setRecordedAudioFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const shouldAutoSendRef = useRef(false);

  const {
    isRecording,
    isPaused,
    recordingTime,
    audioBlob,
    audioUrl,
    startRecording,
    stopRecording,
    pauseRecording,
    resumeRecording,
    cancelRecording,
    clearRecording,
  } = useAudioRecorder();

  const handleSendMessage = () => {
    if (message.trim() || uploadedFiles.length > 0 || recordedAudioFile) {
      const filesToSend = recordedAudioFile
        ? [...uploadedFiles, recordedAudioFile]
        : uploadedFiles;

      onSendMessage(message || 'Message vocal', filesToSend);
      setMessage('');
      setUploadedFiles([]);
      setRecordedAudioFile(null);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleImproveMessage = () => {
    const improvedMessage = message
      .replace(/\s+/g, ' ')
      .replace(/\s*([,.!?;:])\s*/g, '$1 ')
      .replace(/\s*([.!?])\s*([A-Z])/g, '$1 $2')
      .replace(/\b(je|tu|il|elle|nous|vous|ils|elles)\b/gi, (match) => match.toLowerCase())
      .replace(/\b(et|ou|mais|donc|or|ni|car)\b/gi, (match) => match.toLowerCase())
      .trim();

    setMessage(improvedMessage);
  };

  const handleFileUpload = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      const newFiles = Array.from(files);
      setUploadedFiles(prev => [...prev, ...newFiles]);
    }
  };

  const handleRemoveFile = (index: number) => {
    setUploadedFiles(prev => prev.filter((_, i) => i !== index));
  };

  const handleStartRecording = async () => {
    await startRecording();
  };

  const handleStopRecording = () => {
    shouldAutoSendRef.current = false;
    stopRecording();
  };

  const handleStopAndSend = () => {
    shouldAutoSendRef.current = true;
    stopRecording();
  };

  const handleCancelRecording = () => {
    shouldAutoSendRef.current = false;
    cancelRecording();
    clearRecording();
  };

  const handleRemoveRecordedAudio = () => {
    setRecordedAudioFile(null);
    clearRecording();
  };

  const handleSendAudio = useCallback(() => {
    if (audioBlob) {
      // Convert blob to File with appropriate extension
      // Backend only accepts: ogg, mp3, wav, m4a
      let extension = 'ogg'; // default

      if (audioBlob.type.includes('ogg')) {
        extension = 'ogg';
      } else if (audioBlob.type.includes('mp4') || audioBlob.type.includes('m4a')) {
        extension = 'm4a';
      } else if (audioBlob.type.includes('mpeg') || audioBlob.type.includes('mp3')) {
        extension = 'mp3';
      } else if (audioBlob.type.includes('wav')) {
        extension = 'wav';
      }

      const audioFile = new File(
        [audioBlob],
        `audio-${Date.now()}.${extension}`,
        { type: audioBlob.type }
      );

      // If shouldAutoSendRef is true, send immediately
      // Otherwise, save for later sending with optional text
      if (shouldAutoSendRef.current) {
        shouldAutoSendRef.current = false; // Reset flag
        onSendMessage('Message vocal', [audioFile]);
        clearRecording();
      } else {
        setRecordedAudioFile(audioFile);
      }
    }
  }, [audioBlob, onSendMessage, clearRecording]);

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  React.useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Handle audio when audioBlob becomes available (either send or save for later)
  React.useEffect(() => {
    if (audioBlob) {
      handleSendAudio();
    }
  }, [audioBlob, handleSendAudio]);

  const showWelcome = messages.length === 0;

  return (
    <Box sx={styles.container}>
      <Box sx={styles.messagesContainer}>
        <ConditionalComponent
          isValid={showWelcome}
        >
          <Box sx={styles.welcomeContent}>
            <Box sx={styles.avatarContainer}>
              <Box sx={styles.avatarImage} />
              <Box sx={styles.avatarBackground} />
            </Box>
            <Box sx={styles.welcomeSection}>
              <Typography sx={styles.welcomeTitle}>
                Coucou, moi c&apos;est <Box component="span" sx={styles.agentName}>Aqal</Box> 👋
              </Typography>
              <Typography sx={styles.welcomeSubtitle}>
                Dis-moi ce dont tu as besoin, je suis là pour t&apos;accompagner !
              </Typography>
            </Box>
          </Box>
        </ConditionalComponent>
        <ConditionalComponent
          isValid={!showWelcome}
        >
          <Box sx={styles.messagesList}>
            {messages.map((message) => (
              <ChatMessage key={message.id} message={message} />
            ))}
            <div ref={messagesEndRef} />
          </Box>
        </ConditionalComponent>
      </Box>

      <Box sx={styles.inputContainer}>
        <ConditionalComponent
          isValid={uploadedFiles.length > 0}
        >
          <Box sx={styles.filesContainer}>
            <Typography sx={styles.filesTitle}>
              Fichiers joints ({uploadedFiles.length})
            </Typography>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
              {uploadedFiles.map((file, index) => (
                <Chip
                  key={index}
                  label={file.name}
                  onDelete={() => handleRemoveFile(index)}
                  size="small"
                  sx={styles.fileChip}
                />
              ))}
            </Box>
          </Box>
        </ConditionalComponent>

        {/* Recorded Audio Preview */}
        <ConditionalComponent isValid={!!recordedAudioFile && !isRecording}>
          <Box sx={{
            width: '100%',
            backgroundColor: '#F7F7F8',
            borderRadius: '12px',
            padding: '12px 16px',
            display: 'flex',
            alignItems: 'center',
            gap: 2,
            border: '1px solid #E0E0E0',
          }}>
            <Box sx={{
              width: 40,
              height: 40,
              borderRadius: '50%',
              backgroundColor: '#5D2EFF',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
              <FontAwesomeIcon
                icon="microphone"
                style={{ fontSize: '18px', color: 'white' }}
              />
            </Box>

            <Box sx={{ flex: 1 }}>
              <Typography variant="body2" sx={{ fontWeight: 600, color: '#1F1F1F' }}>
                Message vocal enregistré
              </Typography>
              <Typography variant="caption" sx={{ color: '#6E6E80' }}>
                {recordedAudioFile?.name}
              </Typography>
            </Box>

            <Tooltip title="Supprimer l'audio" arrow>
              <IconButton
                onClick={handleRemoveRecordedAudio}
                size="small"
                sx={{
                  color: '#6E6E80',
                  '&:hover': { color: '#FF0000', backgroundColor: 'rgba(255,0,0,0.1)' }
                }}
              >
                <FontAwesomeIcon icon="trash" style={{ fontSize: '16px' }} />
              </IconButton>
            </Tooltip>

            <ConditionalComponent isValid={!!audioUrl}>
              <audio
                controls
                src={audioUrl || undefined}
                style={{
                  height: '32px',
                }}
              />
            </ConditionalComponent>
          </Box>
        </ConditionalComponent>

        {/* Recording UI - Similar to OpenAI */}
        <ConditionalComponent isValid={isRecording}>
          <Box sx={{
            width: '100%',
            backgroundColor: '#F7F7F8',
            borderRadius: '24px',
            padding: '16px 24px',
            display: 'flex',
            alignItems: 'center',
            gap: 2,
            border: '2px solid #5D2EFF',
          }}>
            <Box sx={{
              width: 36,
              height: 36,
              borderRadius: '50%',
              backgroundColor: '#FF0000',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              animation: 'pulse 1.5s ease-in-out infinite',
              '@keyframes pulse': {
                '0%, 100%': { opacity: 1, transform: 'scale(1)' },
                '50%': { opacity: 0.8, transform: 'scale(1.05)' },
              },
            }}>
              <Box sx={{
                width: 12,
                height: 12,
                borderRadius: '50%',
                backgroundColor: 'white',
              }} />
            </Box>

            <Box sx={{ flex: 1 }}>
              <Typography variant="body2" sx={{ fontWeight: 600, color: '#1F1F1F' }}>
                Enregistrement en cours...
              </Typography>
              <Typography variant="caption" sx={{ color: '#6E6E80' }}>
                {formatTime(recordingTime)}
              </Typography>
            </Box>

            <Tooltip title="Annuler" arrow>
              <IconButton
                onClick={handleCancelRecording}
                size="small"
                sx={{
                  color: '#6E6E80',
                  '&:hover': { color: '#FF0000', backgroundColor: 'rgba(255,0,0,0.1)' }
                }}
              >
                <FontAwesomeIcon icon="times" style={{ fontSize: '18px' }} />
              </IconButton>
            </Tooltip>

            <Tooltip title="Arrêter" arrow>
              <IconButton
                onClick={handleStopRecording}
                size="small"
                sx={{
                  color: '#6E6E80',
                  '&:hover': { color: '#5D2EFF', backgroundColor: 'rgba(93,46,255,0.1)' }
                }}
              >
                <FontAwesomeIcon icon="stop" style={{ fontSize: '18px' }} />
              </IconButton>
            </Tooltip>

            <Tooltip title="Arrêter et envoyer" arrow>
              <IconButton
                onClick={handleStopAndSend}
                sx={{
                  backgroundColor: '#5D2EFF',
                  color: 'white',
                  width: 40,
                  height: 40,
                  '&:hover': { backgroundColor: '#4A25CC' }
                }}
              >
                <FontAwesomeIcon icon="paper-plane" style={{ fontSize: '18px' }} />
              </IconButton>
            </Tooltip>
          </Box>
        </ConditionalComponent>

        {/* Normal Input - Only shown when not recording */}
        <ConditionalComponent isValid={!isRecording}>
          <Box sx={styles.inputWrapper}>
            <Input
              type="file"
              inputRef={fileInputRef}
              onChange={handleFileChange}
              inputProps={{
                multiple: true,
                accept: "image/*,application/pdf,.doc,.docx,.txt"
              }}
              sx={{ display: 'none' }}
            />

            <TextField
              fullWidth
              multiline
              maxRows={3}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Parler à Aqal..."
              sx={styles.textField}
              InputProps={{
                startAdornment: (
                  <>
                    <ConditionalComponent
                      isValid={message.length > 0}
                    >
                      <Tooltip title="Améliorer le message" arrow>
                        <IconButton
                          onClick={handleImproveMessage}
                          sx={styles.magicButton}
                          size="small"
                        >
                          <FontAwesomeIcon
                            icon="wand-magic-sparkles"
                            style={styles.magicIcon}
                          />
                        </IconButton>
                      </Tooltip>
                    </ConditionalComponent>

                    <Tooltip title="Ajouter des fichiers" arrow>
                      <IconButton
                        onClick={handleFileUpload}
                        sx={styles.attachButton}
                        size="small"
                      >
                        <FontAwesomeIcon
                          icon="plus"
                          style={styles.attachIcon}
                        />
                      </IconButton>
                    </Tooltip>
                  </>
                ),
                endAdornment: (
                  <>
                    <Tooltip title="Enregistrer un message vocal" arrow>
                      <IconButton
                        onClick={handleStartRecording}
                        sx={styles.microphoneButton}
                        size="small"
                      >
                        <FontAwesomeIcon
                          icon="microphone"
                          style={styles.microphoneIcon}
                        />
                      </IconButton>
                    </Tooltip>

                    <Tooltip title="Envoyer le message" arrow>
                      <IconButton
                        onClick={handleSendMessage}
                        sx={styles.sendButton}
                        size="small"
                      >
                        <FontAwesomeIcon
                          icon="paper-plane"
                          style={styles.sendIcon}
                        />
                      </IconButton>
                    </Tooltip>
                  </>
                ),
              }}
            />
          </Box>
        </ConditionalComponent>
      </Box>

    </Box>
  );
};