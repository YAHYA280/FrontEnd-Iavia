import { getScoreBackground, getScoreColor } from '@/shared/utils/audit-reports-utils';
import { Typography, Box } from '@mui/material';

interface ScoreDisplayProps {
  score: number;
  size?: 'small' | 'medium' | 'large';
}

const ScoreDisplay = ({ score, size = 'medium' }: ScoreDisplayProps) => {
  const fontSize = {
    small: '16px',
    medium: '20px',
    large: '24px',
  }[size];

  return (
    <Box
      sx={{
        display: 'inline-flex',
        height: '34px',
        padding: '10px',
        justifyContent: 'center',
        alignItems: 'center',
        gap: '10px',
        borderRadius: '8px',
        background: getScoreBackground(score),
      }}
    >
      <Typography
        sx={{
          color: getScoreColor(score),
          fontFamily: '"IBM Plex Sans"',
          fontSize,
          fontWeight: 500,
          lineHeight: '121.331%',
        }}
      >
        {score}
      </Typography>
    </Box>
  );
};

export default ScoreDisplay;
