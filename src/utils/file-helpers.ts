/**
 * Checks if a file is an audio file based on its type or name
 */
export const isAudioFile = (file: File | { name: string; type?: string }): boolean => {
  // Check by MIME type if available
  if (file.type && file.type.startsWith('audio/')) {
    return true;
  }

  // Check by file extension as fallback
  const audioExtensions = ['.mp3', '.wav', '.ogg', '.webm', '.m4a', '.aac', '.flac', '.opus'];
  const fileName = file.name.toLowerCase();

  return audioExtensions.some(ext => fileName.endsWith(ext));
};

/**
 * Checks if a file is an image file based on its type or name
 */
export const isImageFile = (file: File | { name: string; type?: string }): boolean => {
  // Check by MIME type if available
  if (file.type && file.type.startsWith('image/')) {
    return true;
  }

  // Check by file extension as fallback
  const imageExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.webp', '.svg', '.bmp'];
  const fileName = file.name.toLowerCase();

  return imageExtensions.some(ext => fileName.endsWith(ext));
};

/**
 * Formats file size in human-readable format
 */
export const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return '0 B';

  const k = 1024;
  const sizes = ['B', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};

/**
 * Gets file extension from filename
 */
export const getFileExtension = (filename: string): string => {
  const parts = filename.split('.');
  return parts.length > 1 ? parts[parts.length - 1].toLowerCase() : '';
};
