import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from './contexts/AuthContext';

const PrivateRoute = () => {
  const { user } = useAuth();
  const token = localStorage.getItem('access_token');

  if (!user && !token) {
    // Redirige l'utilisateur vers /login s'il n'est pas authentifié
    return <Navigate to="/login" />;
  }

  // Si l'utilisateur est authentifié, rend les routes enfants
  return <Outlet />;
};

export default PrivateRoute;
