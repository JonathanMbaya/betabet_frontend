import React from 'react';
import { Box, Typography, IconButton, Grid, Divider } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { styled } from '@mui/material/styles';

const StatRow = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: theme.spacing(1),
}));

const StatValue = styled(Typography)(({ highlight }) => ({
  color: highlight ? '#FFD700' : 'inherit',
  fontWeight: highlight ? 'bold' : 'normal',
}));

const MatchDetails = ({ match, onBack }) => {
  const { homeTeam, awayTeam, time, competition, stats } = match;

  return (
    <Box sx={{ p: 2 }}>
      <IconButton onClick={onBack} sx={{ color: 'text.primary', mb: 2 }}>
        <ArrowBackIcon />
      </IconButton>

      <Box sx={{ mb: 3 }}>
        <Typography variant="caption" color="text.secondary">
          {time} | {competition}
        </Typography>
        <Grid container alignItems="center" spacing={2}>
          <Grid item xs={5}>
            <Typography align="right" variant="h6">
              {homeTeam}
            </Typography>
          </Grid>
          <Grid item xs={2}>
            <Typography align="center" variant="h5">
              {match.score}
            </Typography>
          </Grid>
          <Grid item xs={5}>
            <Typography align="left" variant="h6">
              {awayTeam}
            </Typography>
          </Grid>
        </Grid>
      </Box>

      <Divider sx={{ bgcolor: 'rgba(255,255,255,0.1)', my: 2 }} />

      <Box>
        <StatRow>
          <StatValue highlight={stats.possession.home > stats.possession.away}>
            {stats.possession.home}%
          </StatValue>
          <Typography>Possession</Typography>
          <StatValue highlight={stats.possession.away > stats.possession.home}>
            {stats.possession.away}%
          </StatValue>
        </StatRow>

        <StatRow>
          <StatValue highlight={stats.corners.home > stats.corners.away}>
            {stats.corners.home}
          </StatValue>
          <Typography>Corners</Typography>
          <StatValue highlight={stats.corners.away > stats.corners.home}>
            {stats.corners.away}
          </StatValue>
        </StatRow>

        {/* Ajoutez d'autres statistiques ici */}
        <StatRow>
          <StatValue highlight={stats.shots.home > stats.shots.away}>
            {stats.shots.home}
          </StatValue>
          <Typography>Tirs cadrés</Typography>
          <StatValue highlight={stats.shots.away > stats.shots.home}>
            {stats.shots.away}
          </StatValue>
        </StatRow>
      </Box>
    </Box>
  );
};

export default MatchDetails;
