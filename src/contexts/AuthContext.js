import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  useMemo,
} from 'react';
import axios from 'axios';

// Création du contexte d'authentification
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // Utilisateur connecté
  const [loading, setLoading] = useState(false); // État de chargement

  // Fonction de connexion
  const login = useCallback(async (username, password) => {
    try {
      setLoading(true);
      const { data } = await axios.post('http://localhost:5000/auth/login', {
        username,
        password,
      });

      setUser(data.user); // Mise à jour de l'utilisateur connecté
      localStorage.setItem('access_token', data.access_token); // Stockage du token
    } catch (error) {
      console.error('Erreur lors de la connexion :', error.response?.data || error);
      throw error.response?.data || error; // Propager une erreur pour l'interface utilisateur
    } finally {
      setLoading(false);
    }
  }, []);

  // Fonction d'inscription
  const register = useCallback(async (username, password) => {
    try {
      setLoading(true);

      const { data } = await axios.post('http://localhost:5000/auth/register', {
        username,
        password,
      });

      return data; // Retourne la réponse si succès
    } catch (error) {
      console.error('Erreur lors de l\'inscription :', error.response?.data || error);
      throw error.response?.data || error; // Propager une erreur pour l'interface utilisateur
    } finally {
      setLoading(false);
    }
  }, []);

  // Fonction de déconnexion
  const logout = useCallback(() => {
    setUser(null); // Déconnexion de l'utilisateur
    localStorage.removeItem('access_token'); // Suppression du token
  }, []);

  // Récupérer les informations utilisateur lors du montage
  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem('access_token');

      if (token) {
        try {
          setLoading(true);
          const { data } = await axios.get('http://localhost:5000/auth/me', {
            headers: { Authorization: `Bearer ${token}` },
          });

          setUser(data.user); // Mise à jour de l'utilisateur connecté
        } catch (error) {
          console.error(
            'Erreur lors de la récupération des informations utilisateur :',
            error.response?.data || error
          );
          localStorage.removeItem('access_token'); // Supprime le token invalide
        } finally {
          setLoading(false);
        }
      }
    };

    fetchUser();
  }, []);

  // Mémoisation de la valeur du contexte
  const contextValue = useMemo(
    () => ({
      user,
      loading,
      login,
      register,
      logout,
    }),
    [user, loading, login, register, logout]
  );

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook personnalisé pour accéder au contexte
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth doit être utilisé dans un AuthProvider');
  }
  return context;
};
