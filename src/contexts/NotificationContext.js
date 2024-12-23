import React, { createContext, useContext, useReducer, useCallback } from 'react';

const NotificationContext = createContext();

const notificationReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_NOTIFICATION':
      return [...state, { id: Date.now(), ...action.payload }];
    case 'REMOVE_NOTIFICATION':
      return state.filter((notification) => notification.id !== action.payload);
    default:
      return state;
  }
};

export const NotificationProvider = ({ children }) => {
  const [notifications, dispatch] = useReducer(notificationReducer, []);

  const addNotification = useCallback((message, type = 'info') => {
    dispatch({
      type: 'ADD_NOTIFICATION',
      payload: { message, type },
    });
  }, []);

  const removeNotification = useCallback((id) => {
    dispatch({
      type: 'REMOVE_NOTIFICATION',
      payload: id,
    });
  }, []);

  const showBetSuccess = useCallback((points) => {
    addNotification(`Pari gagné ! +${points} points`, 'success');
  }, [addNotification]);

  const showBetError = useCallback((message) => {
    addNotification(message, 'error');
  }, [addNotification]);

  const showFriendAdded = useCallback((username) => {
    addNotification(`${username} a été ajouté à votre liste d'amis`, 'success');
  }, [addNotification]);

  const value = {
    notifications,
    addNotification,
    removeNotification,
    showBetSuccess,
    showBetError,
    showFriendAdded,
  };

  return (
    <NotificationContext.Provider value={value}>
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotifications = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error('useNotifications must be used within a NotificationProvider');
  }
  return context;
};
