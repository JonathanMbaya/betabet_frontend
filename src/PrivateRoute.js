import React, { useEffect, useState } from 'react';
import { useNavigate, Outlet } from 'react-router-dom';
import { useAuth } from './contexts/AuthContext';
import axios from 'axios';
import LoadingScreen from './components/LoadingScreen';

const PrivateRoute = () => {
  const { setUser } = useAuth();
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem('access_token');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      if (token) {
        try {
          const response = await axios.get('http://localhost:5000/auth/me', {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });

          setUser(response.data.user); // Mettre à jour l'utilisateur
        } catch (error) {
          console.error('Erreur lors de la vérification de l’utilisateur :', error);
          localStorage.removeItem('access_token');
          navigate('/login');
        } finally {
          setLoading(false);
        }
      } else {
        setLoading(false);
        navigate('/login');
      }
    };

    fetchUser();
  }, [token, navigate, setUser]);

  if (loading) {
    return <LoadingScreen />;
  }

  return <Outlet />;
};

export default PrivateRoute;