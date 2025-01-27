import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoadingScreen from './components/LoadingScreen';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Friends from './pages/Friends';
import { AuthProvider } from './contexts/AuthContext';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import DetailsMatch from './components/DetailsMatch';
import Sass from './pages/Sass';
import PrivateRoute from './PrivateRoute'; // Assurez-vous que le chemin est correct

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const simulateLoading = async () => {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      setLoading(false);
    };

    simulateLoading();
  }, []);

  if (loading) {
    return <LoadingScreen />;
  }

  return (
    <AuthProvider>
      <ToastContainer />
      <Router>
        <Routes>
          {/* Routes publiques */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Routes protégées */}
          <Route element={<PrivateRoute />}>
            <Route path="/" element={<Sass />} />
            <Route path="/competition/" element={<Home />} />
            <Route path="/match/:id" element={<DetailsMatch />} />
            <Route path="/friends" element={<Friends />} />
          </Route>

          {/* Redirection par défaut */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
