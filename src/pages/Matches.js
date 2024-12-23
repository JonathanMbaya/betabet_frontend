import React, { useState } from 'react';
import { Box, Tabs, Tab, Container } from '@mui/material';
import { styled } from '@mui/material/styles';
import MatchCard from '../components/MatchCard';
import MatchDetails from '../components/MatchDetails';

const StyledTab = styled(Tab)(({ theme }) => ({
  color: theme.palette.text.primary,
  '&.Mui-selected': {
    color: theme.palette.secondary.main,
  },
}));

const Matches = () => {
  const [selectedTab, setSelectedTab] = useState(0);
  const [selectedMatch, setSelectedMatch] = useState(null);

  // Exemple de données
  const matches = [
    {
      id: 1,
      homeTeam: 'Real Madrid',
      awayTeam: 'Manchester United',
      time: '92:30 +5',
      competition: 'Champions League',
      score: '1 - 0',
      stats: {
        possession: { home: 56, away: 44 },
        corners: { home: 6, away: 12 },
        shots: { home: 8, away: 5 }
      }
    },
    // Ajoutez d'autres matchs ici
  ];

  const handleTabChange = (event, newValue) => {
    setSelectedTab(newValue);
  };

  const handleBet = (matchId, prediction) => {
    console.log(`Bet placed on match ${matchId}: ${prediction}`);
    // Implémentez la logique de pari ici
  };

  if (selectedMatch) {
    return (
      <MatchDetails
        match={selectedMatch}
        onBack={() => setSelectedMatch(null)}
      />
    );
  }

  return (
    <Container maxWidth="sm" sx={{ pb: 7 }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 2 }}>
        <Tabs
          value={selectedTab}
          onChange={handleTabChange}
          variant="fullWidth"
          textColor="secondary"
          indicatorColor="secondary"
        >
          <StyledTab label="En cours" />
          <StyledTab label="Gagnés" />
          <StyledTab label="Perdus" />
        </Tabs>
      </Box>

      <Box>
        {matches.map((match) => (
          <MatchCard
            key={match.id}
            match={match}
            onBet={(prediction) => handleBet(match.id, prediction)}
            showDetails={() => setSelectedMatch(match)}
          />
        ))}
      </Box>
    </Container>
  );
};

export default Matches;
