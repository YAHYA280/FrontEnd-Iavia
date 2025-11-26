import { useState, useRef, useCallback } from 'react';

export interface UseAudioRecorderReturn {
  isRecording: boolean;
  isPaused: boolean;
  recordingTime: number;
  audioBlob: Blob | null;
  audioUrl: string | null;
  startRecording: () => Promise<void>;
  stopRecording: () => void;
  pauseRecording: () => void;
  resumeRecording: () => void;
  cancelRecording: () => void;
  clearRecording: () => void;
}

export const useAudioRecorder = (): UseAudioRecorderReturn => {
  const [isRecording, setIsRecording] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);

  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const timerIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const isCancelledRef = useRef<boolean>(false);

  const startTimer = useCallback(() => {
    timerIntervalRef.current = setInterval(() => {
      setRecordingTime((prev) => prev + 1);
    }, 1000);
  }, []);

  const stopTimer = useCallback(() => {
    if (timerIntervalRef.current) {
      clearInterval(timerIntervalRef.current);
      timerIntervalRef.current = null;
    }
  }, []);

  const startRecording = useCallback(async () => {
    try {
      // Reset cancel flag when starting new recording
      isCancelledRef.current = false;

      // Request microphone access
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      streamRef.current = stream;

      // Try formats supported by backend: ogg, mp3, wav, m4a
      // Note: WebM is NOT supported by the backend
      let mimeType = 'audio/ogg';
      if (MediaRecorder.isTypeSupported('audio/ogg; codecs=opus')) {
        mimeType = 'audio/ogg; codecs=opus';
      } else if (MediaRecorder.isTypeSupported('audio/ogg')) {
        mimeType = 'audio/ogg';
      } else if (MediaRecorder.isTypeSupported('audio/mp4')) {
        mimeType = 'audio/mp4'; // Will be saved as .m4a
      } else if (MediaRecorder.isTypeSupported('audio/mpeg')) {
        mimeType = 'audio/mpeg'; // MP3
      } else if (MediaRecorder.isTypeSupported('audio/wav')) {
        mimeType = 'audio/wav';
      } else {
        // Last resort - let browser choose, we'll handle conversion
        mimeType = '';
      }

      const mediaRecorder = new MediaRecorder(stream, mimeType ? { mimeType } : undefined);
      mediaRecorderRef.current = mediaRecorder;
      audioChunksRef.current = [];

      // Handle data available event
      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };

      // Handle stop event
      mediaRecorder.onstop = () => {
        // Only create blob if recording was not cancelled
        if (!isCancelledRef.current) {
          const blob = new Blob(audioChunksRef.current, { type: mimeType });
          setAudioBlob(blob);

          // Create URL for playback
          const url = URL.createObjectURL(blob);
          setAudioUrl(url);
        }

        // Clean up stream
        if (streamRef.current) {
          streamRef.current.getTracks().forEach((track) => track.stop());
          streamRef.current = null;
        }
      };

      // Start recording
      mediaRecorder.start();
      setIsRecording(true);
      setRecordingTime(0);
      startTimer();
    } catch (error) {
      console.error('Error starting recording:', error);
      alert('Impossible d\'accéder au microphone. Veuillez vérifier les permissions.');
    }
  }, [startTimer]);

  const stopRecording = useCallback(() => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      setIsPaused(false);
      stopTimer();
    }
  }, [isRecording, stopTimer]);

  const pauseRecording = useCallback(() => {
    if (mediaRecorderRef.current && isRecording && !isPaused) {
      mediaRecorderRef.current.pause();
      setIsPaused(true);
      stopTimer();
    }
  }, [isRecording, isPaused, stopTimer]);

  const resumeRecording = useCallback(() => {
    if (mediaRecorderRef.current && isRecording && isPaused) {
      mediaRecorderRef.current.resume();
      setIsPaused(false);
      startTimer();
    }
  }, [isRecording, isPaused, startTimer]);

  const cancelRecording = useCallback(() => {
    if (mediaRecorderRef.current && isRecording) {
      // Set cancel flag BEFORE stopping to prevent blob creation in onstop handler
      isCancelledRef.current = true;

      mediaRecorderRef.current.stop();
      setIsRecording(false);
      setIsPaused(false);
      setRecordingTime(0);
      stopTimer();

      // Clean up without creating blob
      audioChunksRef.current = [];

      // Clean up stream
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((track) => track.stop());
        streamRef.current = null;
      }
    }
  }, [isRecording, stopTimer]);

  const clearRecording = useCallback(() => {
    if (audioUrl) {
      URL.revokeObjectURL(audioUrl);
    }
    setAudioBlob(null);
    setAudioUrl(null);
    setRecordingTime(0);
  }, [audioUrl]);

  return {
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
  };
};
