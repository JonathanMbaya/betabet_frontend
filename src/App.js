import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import axios from 'axios';
import LoadingScreen from './components/LoadingScreen';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Friends from './pages/Friends';
import { useAuth } from './contexts/AuthContext';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import DetailsMatch from './components/DetailsMatch';
import Sass from './pages/Sass';
import PrivateRoute from './PrivateRoute';

function App() {
  const { loading, setUser } = useAuth();

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem('access_token');
      if (token) {
        try {
          const response = await axios.get('http://localhost:5000/auth/me', {
            headers: { Authorization: `Bearer ${token}` },
          });
          setUser(response.data.user);
        } catch (error) {
          console.error('Erreur lors de la récupération de l\'utilisateur :', error);
          localStorage.removeItem('access_token');
        }
      }
    };

    fetchUser();
  }, [setUser]);

  if (loading) {
    return <LoadingScreen />;
  }

  return (
    <>
      <ToastContainer />
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route element={<PrivateRoute />}>
            <Route path="/" element={<Sass />} />
            <Route path="/competition/:id" element={<Home />} />
            <Route path="/match/:id" element={<DetailsMatch />} />
            <Route path="/friends" element={<Friends />} />
          </Route>
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;