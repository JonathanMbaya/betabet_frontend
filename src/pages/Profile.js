import React from 'react';
import { Box, Typography, List, ListItem, ListItemText, Divider, IconButton } from '@mui/material';
import { styled } from '@mui/material/styles';
import CloseIcon from '@mui/icons-material/Close';

const ProfileContainer = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  minHeight: '100vh',
  padding: theme.spacing(3),
  color: theme.palette.text.primary,
}));

const ProfileHeader = styled(Box)(({ theme }) => ({
  marginBottom: theme.spacing(4),
}));

const MenuList = styled(List)(({ theme }) => ({
  '& .MuiListItem-root': {
    padding: theme.spacing(2, 0),
  },
  '& .MuiDivider-root': {
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
}));

const Profile = ({ onClose }) => {
  const user = {
    username: 'Natesama',
    level: 'Débutant',
    points: 13,
  };

  const menuItems = [
    'Mon compte',
    'Journal de paris',
    'Liste d\'amis',
    'Règles',
    'A propos de Betabet',
  ];

  return (
    <ProfileContainer>
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 2 }}>
        <IconButton onClick={onClose} sx={{ color: 'white' }}>
          <CloseIcon />
        </IconButton>
      </Box>

      <ProfileHeader>
        <Typography variant="h5" gutterBottom>
          {user.username}
        </Typography>
        <Typography variant="subtitle1" color="text.secondary">
          {user.level}
        </Typography>
        <Typography variant="h4" sx={{ mt: 2, color: 'secondary.main' }}>
          {user.points} pts
        </Typography>
      </ProfileHeader>

      <MenuList>
        {menuItems.map((item, index) => (
          <React.Fragment key={item}>
            <ListItem button>
              <ListItemText primary={item} />
            </ListItem>
            {index < menuItems.length - 1 && <Divider />}
          </React.Fragment>
        ))}
      </MenuList>

      <Box sx={{ mt: 4, textAlign: 'center' }}>
        <Typography variant="caption" color="text.secondary">
          Développé par Jonathan Mbaya
        </Typography>
        <Typography variant="caption" display="block" color="text.secondary">
          Copyright 2024
        </Typography>
      </Box>
    </ProfileContainer>
  );
};

export default Profile;
