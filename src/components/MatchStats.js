import React from 'react';
import { Box, Typography, LinearProgress } from '@mui/material';
import { styled } from '@mui/material/styles';

const StatContainer = styled(Box)(({ theme }) => ({
  marginBottom: theme.spacing(2),
}));

const StatLabel = styled(Typography)(({ theme }) => ({
  color: theme.palette.text.secondary,
  marginBottom: theme.spacing(1),
}));

const StatBar = styled(LinearProgress)(({ theme }) => ({
  height: 8,
  borderRadius: 4,
  backgroundColor: theme.palette.primary.dark,
  '& .MuiLinearProgress-bar': {
    borderRadius: 4,
    backgroundColor: theme.palette.secondary.main,
  },
}));

const StatValue = styled(Typography)(({ align }) => ({
  textAlign: align,
  fontWeight: 'bold',
  fontSize: '0.875rem',
}));

const StatRow = ({ label, homeValue, awayValue, total = 100 }) => {
  const homePercent = (homeValue / total) * 100;

  return (
    <StatContainer>
      <StatLabel variant="body2">{label}</StatLabel>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        <StatValue align="right" sx={{ flex: 1 }}>
          {homeValue}
        </StatValue>
        <Box sx={{ flex: 2 }}>
          <StatBar variant="determinate" value={homePercent} />
        </Box>
        <StatValue align="left" sx={{ flex: 1 }}>
          {awayValue}
        </StatValue>
      </Box>
    </StatContainer>
  );
};

const MatchStats = ({ stats }) => {
  return (
    <Box sx={{ p: 2 }}>
      <StatRow
        label="Possession"
        homeValue={`${stats.possession.home}%`}
        awayValue={`${stats.possession.away}%`}
      />
      
      <StatRow
        label="Tirs"
        homeValue={stats.shots.home}
        awayValue={stats.shots.away}
        total={stats.shots.home + stats.shots.away}
      />
      
      <StatRow
        label="Tirs Cadrés"
        homeValue={stats.shotsOnTarget.home}
        awayValue={stats.shotsOnTarget.away}
        total={stats.shotsOnTarget.home + stats.shotsOnTarget.away}
      />
      
      <StatRow
        label="Corners"
        homeValue={stats.corners.home}
        awayValue={stats.corners.away}
        total={stats.corners.home + stats.corners.away}
      />
      
      <StatRow
        label="Fautes"
        homeValue={stats.fouls.home}
        awayValue={stats.fouls.away}
        total={stats.fouls.home + stats.fouls.away}
      />
      
      <Box sx={{ mt: 3 }}>
        <Typography variant="h6" gutterBottom>
          Événements clés
        </Typography>
        {stats.events.map((event, index) => (
          <Box
            key={index}
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 2,
              mb: 1,
            }}
          >
            <Typography variant="body2" color="text.secondary">
              {event.time}'
            </Typography>
            <Typography variant="body2">
              {event.player} - {event.type}
            </Typography>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default MatchStats;
