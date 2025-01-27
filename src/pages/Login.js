import React, { useState } from 'react';
import { useNavigate} from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { useAuth } from '../contexts/AuthContext';
import { toast } from 'react-toastify';

const Login = () => {
  const navigate = useNavigate();
  const { login, loading } = useAuth(); // Utilise le hook personnalisé pour accéder à la fonction login
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(formData.username, formData.password); // Appelle la fonction login du contexte
      toast.success('Connexion réussie !'); // Notification de succès
      navigate('/'); // Redirige l'utilisateur vers la page d'accueil après la connexion
    } catch (error) {
      toast.error('Échec de la connexion. Veuillez vérifier vos identifiants.'); // Notification d'erreur
      console.error('Erreur de connexion:', error);
    }
  };

  return (
    <div style={styles.container}>

        <div style={styles.boxbox}>
            <div style={styles.box}>
                <h1 style={{color: "#6B8E23", fontSize: '60px'}}>Betabet</h1>
                <h2 style={styles.subtitle}>Accéder à votre compte Betabet</h2>
                <form onSubmit={handleSubmit} style={styles.form}>
                  <div style={styles.inputGroup}>
                    <label htmlFor="username" style={styles.label}>
                      Pseudo
                    </label>
                    <input
                      type="text"
                      id="username"
                      name="username"
                      value={formData.username}
                      onChange={handleChange}
                      style={styles.input}
                      required
                    />
                  </div>
                  <div style={styles.inputGroup}>
                    <label htmlFor="password" style={styles.label}>
                      Mot de passe
                    </label>
                    <input
                      type="password"
                      id="password"
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      style={styles.input}
                      required
                    />
                  </div>
                  <button type="submit" style={styles.button} disabled={loading}>
                    {loading ? 'En cours de connexion ...' : 'Connexion'}
                  </button>
                </form>

                <p style={styles.linkContainer}>

                    Pas encore de compte ?{' '}
                    <a href="/register" style={styles.link}>
                        S'inscrire
                    </a>

                </p>
            
            </div>

            <ul style={styles.textDevises}>
              <li><FontAwesomeIcon style={styles.spanIncon} icon={faCheck} /> Pariez sans risque</li>
              <li><FontAwesomeIcon style={styles.spanIncon} icon={faCheck} /> Partagez avec vos amis</li>
              <li><FontAwesomeIcon style={styles.spanIncon} icon={faCheck} /> Gagnez des prix</li>
            </ul>

        </div>

        <div style={styles.devises}>
            <div style={styles.imageDevises}>
            </div>
        </div>

    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    height: '100vh',
    backgroundColor: '#6B8E23',
    fontFamily: '"Josefin Sans", serif',
  },
  
  box: {
    backgroundColor: '#fff',
    padding: '20px',
    borderRadius: '8px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    textAlign: 'center',
  },

  boxbox : {
    padding: '20px',
    width: '100%',
    maxWidth: '400px',
  },

  title: {
    fontSize: '24px',
    marginBottom: '10px',
    color: '#333',
  },
  subtitle: {
    fontSize: '16px',
    marginBottom: '20px',
    color: '#555',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
  },
  inputGroup: {
    marginBottom: '15px',
    textAlign: 'left',
  },
  label: {
    marginBottom: '5px',
    display: 'block',
    fontSize: '14px',
    color: '#555',
  },
  input: {
    width: '100%',
    padding: '10px',
    fontSize: '14px',
    border: '1px solid #ccc',
    borderRadius: '4px',
    boxSizing: 'border-box',
  },
  button: {
    padding: '10px 15px',
    backgroundColor: '#228B22',
    color: '#fff',
    fontSize: '16px',
    border: 'none',
    borderRadius: '5rem',
    cursor: 'pointer',
  },
  linkContainer: {
    marginTop: '10px',
    fontSize: '14px',
    color: '#555',
  },
  link: {
    color: '#007BFF',
    textDecoration: 'none',
  },
  devises: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    width: '40%',
  },
  textDevises: {
    listStyleType: 'none',
    padding: 0,
    margin: 0,
    color: '#fff',
    fontSize: '18px',
    textAlign: 'left',
    paddingTop: '2rem',
  },
  imageDevises: {
    width: '100%',
    height: '600px',
    backgroundImage: 'url("/background.jpg")',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    marginTop: '20px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '8px',
  },
  spanIncon : {
    color: "#43F043"
  }
};

export default Login;
