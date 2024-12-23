import React, { useState } from 'react';
import {
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  ListItemSecondaryAction,
  Avatar,
  IconButton,
  TextField,
  Button,
  Box,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import DeleteIcon from '@mui/icons-material/Delete';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';

const StyledListItem = styled(ListItem)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  marginBottom: theme.spacing(1),
  borderRadius: theme.spacing(1),
  '&:hover': {
    backgroundColor: theme.palette.primary.dark,
  },
}));

const ScoreChip = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.secondary.main,
  color: theme.palette.primary.main,
  padding: theme.spacing(0.5, 1.5),
  borderRadius: theme.spacing(2),
  fontWeight: 'bold',
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(0.5),
}));

const FriendsList = () => {
  const [openDialog, setOpenDialog] = useState(false);
  const [friendUsername, setFriendUsername] = useState('');

  // Exemple de données
  const friends = [
    { id: 1, username: 'Alex', score: 150, rank: 1 },
    { id: 2, username: 'Marie', score: 120, rank: 2 },
    { id: 3, username: 'Thomas', score: 90, rank: 3 },
  ];

  const handleAddFriend = () => {
    // Implémenter l'ajout d'ami
    console.log('Adding friend:', friendUsername);
    setFriendUsername('');
    setOpenDialog(false);
  };

  const handleRemoveFriend = (friendId) => {
    // Implémenter la suppression d'ami
    console.log('Removing friend:', friendId);
  };

  return (
    <Box sx={{ p: 2 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
        <Typography variant="h6">Mes Amis</Typography>
        <Button
          variant="contained"
          color="secondary"
          startIcon={<PersonAddIcon />}
          onClick={() => setOpenDialog(true)}
        >
          Ajouter
        </Button>
      </Box>

      <List>
        {friends.map((friend) => (
          <StyledListItem key={friend.id}>
            <ListItemAvatar>
              <Avatar>{friend.username[0]}</Avatar>
            </ListItemAvatar>
            <ListItemText
              primary={friend.username}
              secondary={
                <ScoreChip>
                  <EmojiEventsIcon fontSize="small" />
                  {friend.score} pts
                </ScoreChip>
              }
            />
            <ListItemSecondaryAction>
              <IconButton
                edge="end"
                aria-label="delete"
                onClick={() => handleRemoveFriend(friend.id)}
              >
                <DeleteIcon />
              </IconButton>
            </ListItemSecondaryAction>
          </StyledListItem>
        ))}
      </List>

      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle>Ajouter un ami</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Nom d'utilisateur"
            type="text"
            fullWidth
            variant="outlined"
            value={friendUsername}
            onChange={(e) => setFriendUsername(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Annuler</Button>
          <Button onClick={handleAddFriend} variant="contained" color="primary">
            Ajouter
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default FriendsList;
