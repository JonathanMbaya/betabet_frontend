import React from 'react';
import { Paper, BottomNavigation, BottomNavigationAction } from '@mui/material';
import { styled } from '@mui/material/styles';
import SportsSoccerIcon from '@mui/icons-material/SportsSoccer';
import UpdateIcon from '@mui/icons-material/Update';
import LeaderboardIcon from '@mui/icons-material/Leaderboard';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import { useNavigate, useLocation } from 'react-router-dom';

const StyledBottomNav = styled(BottomNavigation)(({ theme }) => ({
  backgroundColor: theme.palette.primary.dark,
  '& .MuiBottomNavigationAction-root': {
    color: theme.palette.text.secondary,
    '&.Mui-selected': {
      color: theme.palette.secondary.main,
    },
  },
}));

const BottomNav = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const getValue = () => {
    switch (location.pathname) {
      case '/live':
        return 0;
      case '/upcoming':
        return 1;
      case '/standings':
        return 2;
      case '/bets':
        return 3;
      default:
        return 0;
    }
  };

  return (
    <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }} elevation={3}>
      <StyledBottomNav
        value={getValue()}
        onChange={(event, newValue) => {
          switch (newValue) {
            case 0:
              navigate('/live');
              break;
            case 1:
              navigate('/upcoming');
              break;
            case 2:
              navigate('/standings');
              break;
            case 3:
              navigate('/bets');
              break;
            default:
              break;
          }
        }}
        showLabels
      >
        <BottomNavigationAction label="En direct" icon={<SportsSoccerIcon />} />
        <BottomNavigationAction label="À venir" icon={<UpdateIcon />} />
        <BottomNavigationAction label="Classement" icon={<LeaderboardIcon />} />
        <BottomNavigationAction label="Mes paris" icon={<AccountBalanceWalletIcon />} />
      </StyledBottomNav>
    </Paper>
  );
};

export default BottomNav;
