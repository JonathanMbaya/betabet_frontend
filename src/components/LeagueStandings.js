import React from 'react';
import { Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Tabs, Tab } from '@mui/material';
import { styled } from '@mui/material/styles';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  color: theme.palette.text.primary,
  borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
  padding: '8px 16px',
}));

const StyledTab = styled(Tab)(({ theme }) => ({
  color: theme.palette.text.primary,
  '&.Mui-selected': {
    color: theme.palette.secondary.main,
  },
}));

const LeagueStandings = () => {
  const [selectedLeague, setSelectedLeague] = React.useState(0);

  const handleLeagueChange = (event, newValue) => {
    setSelectedLeague(newValue);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Tabs
        value={selectedLeague}
        onChange={handleLeagueChange}
        variant="scrollable"
        scrollButtons="auto"
        sx={{ mb: 2 }}
      >
        <StyledTab label="Ligue 1" />
        <StyledTab label="Liga Santanders" />
        <StyledTab label="Premier League" />
      </Tabs>

      <TableContainer component={Paper} sx={{ backgroundColor: 'transparent' }}>
        <Table>
          <TableHead>
            <TableRow>
              <StyledTableCell>Pos.</StyledTableCell>
              <StyledTableCell>Équipe</StyledTableCell>
              <StyledTableCell align="center">J</StyledTableCell>
              <StyledTableCell align="center">V</StyledTableCell>
              <StyledTableCell align="center">N</StyledTableCell>
              <StyledTableCell align="center">D</StyledTableCell>
              <StyledTableCell align="center">Pts</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {/* Exemple de données */}
            {[
              { pos: 1, team: 'Marseille', p: 3, w: 3, d: 0, l: 0, pts: 9 },
              { pos: 1, team: 'Paris Saint-Germain', p: 3, w: 3, d: 0, l: 0, pts: 9 },
              { pos: 1, team: 'Lyon', p: 3, w: 3, d: 0, l: 0, pts: 9 },
              { pos: 1, team: 'OGC Nice', p: 3, w: 3, d: 0, l: 0, pts: 9 },
            ].map((row) => (
              <TableRow key={row.team}>
                <StyledTableCell>{row.pos}</StyledTableCell>
                <StyledTableCell>{row.team}</StyledTableCell>
                <StyledTableCell align="center">{row.p}</StyledTableCell>
                <StyledTableCell align="center">{row.w}</StyledTableCell>
                <StyledTableCell align="center">{row.d}</StyledTableCell>
                <StyledTableCell align="center">{row.l}</StyledTableCell>
                <StyledTableCell align="center">{row.pts}</StyledTableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default LeagueStandings;
