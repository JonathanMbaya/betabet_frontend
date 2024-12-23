import React from 'react';
import { Snackbar, Alert, Slide } from '@mui/material';
import { styled } from '@mui/material/styles';

const StyledAlert = styled(Alert)(({ theme }) => ({
  backgroundColor: theme.palette.primary.dark,
  color: theme.palette.text.primary,
  '&.MuiAlert-standardSuccess': {
    backgroundColor: '#2e7d32',
  },
  '&.MuiAlert-standardError': {
    backgroundColor: '#d32f2f',
  },
}));

const NotificationSystem = ({ notifications, onClose }) => {
  return notifications.map((notification, index) => (
    <Snackbar
      key={notification.id}
      open={true}
      autoHideDuration={6000}
      onClose={() => onClose(notification.id)}
      anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      TransitionComponent={Slide}
      TransitionProps={{ direction: 'down' }}
      style={{ top: `${(index * 60) + 20}px` }}
    >
      <StyledAlert
        onClose={() => onClose(notification.id)}
        severity={notification.type}
        variant="filled"
        elevation={6}
      >
        {notification.message}
      </StyledAlert>
    </Snackbar>
  ));
};

export default NotificationSystem;
