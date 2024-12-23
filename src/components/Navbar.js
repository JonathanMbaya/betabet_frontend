import React from 'react';
import { AppBar, Toolbar, Typography, IconButton, Box, Badge } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { styled } from '@mui/material/styles';

const StyledAppBar = styled(AppBar)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  boxShadow: 'none',
}));

const ScoreBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  backgroundColor: theme.palette.primary.dark,
  borderRadius: 15,
  padding: '4px 12px',
  marginLeft: 'auto',
}));

const Navbar = ({ score, onMenuClick, onProfileClick }) => {
  return (
    <StyledAppBar position="static">
      <Toolbar>
        <IconButton
          edge="start"
          color="inherit"
          aria-label="menu"
          onClick={onMenuClick}
        >
          <MenuIcon />
        </IconButton>
        
        <Typography variant="h6" component="div" sx={{ flexGrow: 1, ml: 2 }}>
          Betabet
        </Typography>

        <ScoreBox>
          <Badge badgeContent="+2" color="secondary">
            <Typography variant="body1" component="span">
              {score} pts
            </Typography>
          </Badge>
        </ScoreBox>

        <IconButton
          color="inherit"
          onClick={onProfileClick}
          sx={{ ml: 2 }}
        >
          <AccountCircleIcon />
        </IconButton>
      </Toolbar>
    </StyledAppBar>
  );
};

export default Navbar;
