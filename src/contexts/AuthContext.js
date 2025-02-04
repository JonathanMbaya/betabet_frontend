import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  useMemo,
} from 'react';
import axios from 'axios';
import jwtDecode from 'jwt-decode';

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
  
      console.log('Réponse du backend :', data); // Vérifiez la réponse
      setUser(data.user);
      localStorage.setItem('access_token', data.access_token);
    } catch (error) {
      console.error('Erreur de connexion :', error);
      throw error;
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
      if (error.response) {
        console.error('Erreur serveur :', error.response.data);
        throw error.response.data;
      } else if (error.request) {
        console.error('Pas de réponse du serveur :', error.request);
        throw new Error('Le serveur ne répond pas. Veuillez réessayer plus tard.');
      } else {
        console.error('Erreur inattendue :', error.message);
        throw new Error('Une erreur inattendue est survenue.');
      }
    } finally {
      setLoading(false);
    }
  }, []);

  // Fonction de déconnexion
  const logout = useCallback(() => {
    // setUser(null); // Déconnexion de l'utilisateur
    localStorage.removeItem('access_token'); // Suppression du token
  }, []);

  // Récupérer les informations utilisateur lors du montage
  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem('access_token');

      if (token) {
        try {
          const decodedToken = jwtDecode(token);
          const currentTime = Date.now() / 1000;

          if (decodedToken.exp < currentTime) {
            localStorage.removeItem('access_token'); // Supprime le token expiré
            return;
          }

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
      setUser,
      loading,
      login,
      register,
      logout,
    }),
    [user, setUser, loading, login, register, logout]
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