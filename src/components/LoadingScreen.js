import React from 'react';
import { Box, CircularProgress, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';

const LoadingContainer = styled(Box)(({ theme }) => ({
  height: '100vh',
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-around',
  alignItems: 'center',
  background: 'linear-gradient(45deg, #6B8E23 25%, #3e5c3a 75%, #2f4d28)',  
}));

const LoadingScreen = () => {
  return (
    <LoadingContainer>
      {/* Ici, vous pouvez ajouter votre logo personnalisé */}
      <Typography style={{fontFamily: '"Josefin Sans", serif'}} variant="h3" color="white" fontWeight="bold">
        Betabet
      </Typography>
      <CircularProgress size={60} thickness={4} />
      <Typography style={{fontFamily: '"Josefin Sans", serif'}} variant="h6" color="white">
        Chargement...
      </Typography>
    </LoadingContainer>
  );
};

export default LoadingScreen;
