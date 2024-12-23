import React from 'react';
import {
  Box,
  List,
  ListItem,
  Typography,
  Chip,
  IconButton,
  Collapse,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import { motion, AnimatePresence } from 'framer-motion';

const StyledListItem = styled(ListItem)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  marginBottom: theme.spacing(1),
  borderRadius: theme.spacing(1),
  flexDirection: 'column',
  alignItems: 'stretch',
  padding: theme.spacing(2),
}));

const BetHeader = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  width: '100%',
}));

const StatusChip = styled(Chip)(({ theme, status }) => ({
  backgroundColor: status === 'won'
    ? theme.palette.success.main
    : status === 'lost'
      ? theme.palette.error.main
      : theme.palette.warning.main,
  color: theme.palette.common.white,
}));

const MotionBox = styled(motion.div)({
  width: '100%',
});

const BetHistory = () => {
  const [expandedId, setExpandedId] = React.useState(null);

  const bets = [
    {
      id: 1,
      match: 'Real Madrid vs Manchester United',
      date: '2024-12-18',
      prediction: 'Real Madrid',
      status: 'won',
      points: 3,
      odds: 1.5,
      details: {
        score: '2-1',
        competition: 'Champions League',
        timeOfBet: '15:30',
      },
    },
    // Ajoutez plus de paris ici
  ];

  const handleExpand = (id) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <List sx={{ width: '100%', p: 2 }}>
      <AnimatePresence>
        {bets.map((bet) => (
          <MotionBox
            key={bet.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
          >
            <StyledListItem>
              <BetHeader>
                <Box>
                  <Typography variant="subtitle1" gutterBottom>
                    {bet.match}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    {bet.date}
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <StatusChip
                    label={bet.status === 'won' ? `+${bet.points}` : bet.status}
                    status={bet.status}
                    size="small"
                  />
                  <IconButton
                    onClick={() => handleExpand(bet.id)}
                    size="small"
                  >
                    {expandedId === bet.id ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                  </IconButton>
                </Box>
              </BetHeader>

              <Collapse in={expandedId === bet.id}>
                <Box sx={{ mt: 2, pl: 2 }}>
                  <Typography variant="body2" color="text.secondary" gutterBottom>
                    Compétition: {bet.details.competition}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" gutterBottom>
                    Heure du pari: {bet.details.timeOfBet}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" gutterBottom>
                    Score final: {bet.details.score}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Cote: {bet.odds}
                  </Typography>
                </Box>
              </Collapse>
            </StyledListItem>
          </MotionBox>
        ))}
      </AnimatePresence>
    </List>
  );
};

export default BetHistory;
