export const getScoreColor = (score: number): string => {
  if (score >= 90) return '#10B981';
  if (score >= 80) return '#FAAD4F';
  return '#EF4444';
};

export const getScoreBackground = (score: number): string => {
  if (score >= 90) return 'rgba(16, 185, 129, 0.20)';
  if (score >= 80) return 'rgba(250, 173, 79, 0.20)';
  return 'rgba(239, 68, 68, 0.20)';
};

export const scrollStyles = {
  overflow: 'auto',
  scrollbarWidth: 'none' as const,
  '&::-webkit-scrollbar': { display: 'none' },
  msOverflowStyle: 'none',
};

export const deviceIconStyles = {
  width: '20px',
  height: '20px',
  flexShrink: 0,
  fill: '#EDEDED',
};

export const datePickerStyles = {
  '& .MuiOutlinedInput-root': {
    color: '#EDEDED',
    background: 'rgba(26, 29, 37, 0.8)',
    borderRadius: '16px',
    '& fieldset': { borderColor: 'rgba(190, 48, 255, 0.3)' },
    '&:hover fieldset': { borderColor: 'rgba(190, 48, 255, 0.5)' },
    '&.Mui-focused fieldset': { borderColor: '#BE30FF' },
  },
  '& .MuiInputBase-input': { color: '#EDEDED' },
  '& .MuiSvgIcon-root': { color: '#EDEDED' },
};