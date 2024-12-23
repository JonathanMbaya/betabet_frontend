import React from 'react';
import { Container, Typography } from '@mui/material';
import FriendsList from '../components/FriendsList';

const Friends = () => {
  // Exemple de données
  const friends = [
    {
      id: 1,
      username: 'JohnDoe',
      score: 1250,
      rank: 1,
      status: 'online'
    },
    {
      id: 2,
      username: 'JaneSmith',
      score: 980,
      rank: 2,
      status: 'offline'
    },
    // Ajoutez d'autres amis ici
  ];

  return (
    <Container maxWidth="sm" sx={{ pb: 7, pt: 2 }}>
      <Typography variant="h5" gutterBottom sx={{ color: 'text.primary' }}>
        Mes Amis
      </Typography>
      <FriendsList friends={friends} />
    </Container>
  );
};

export default Friends;