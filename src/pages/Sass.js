import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar';
import { useAuth } from '../contexts/AuthContext';

function Sass() {
  const { user } = useAuth();
  const [competitions, setCompetitions] = useState([]);
  const [listCompetitions, setListCompetitions] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newCompetitionDetails, setNewCompetitionDetails] = useState({
    name: '',
    min_participants: '',
    duration_days: '',
  });

  // Ouvrir/fermer le modal
  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  // Gérer les changements dans le formulaire
  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewCompetitionDetails((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Fonction pour récupérer les compétitions
  const getCompetitions = async () => {
    try {
      const response = await axios.get('http://localhost:5000/competition/mycompetition-user', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('access_token')}`
        }
      });
      setListCompetitions(response.data.competitions); // Mise à jour de l'état avec les compétitions
    } catch (err) {
    console.error('Erreur lors de la récupération des compétitions');
    }
  };

  // Utilisation de useEffect pour appeler getCompetitions lors du montage du composant
  useEffect(() => {
    getCompetitions();
  }, []);

  // Envoyer les données pour créer une nouvelle compétition
  const handleSubmit = async () => {
    try {
      // Envoyer les données formatées au backend
      const response = await axios.post(
        'http://localhost:5000/competition/create', // URL de l'API
        
          {
            // Contenu du body de la requête
            name: newCompetitionDetails.name,
            min_participants: newCompetitionDetails.min_participants,
            duration_days: newCompetitionDetails.duration_days,
          },
          {
          // Configuration supplémentaire : headers pour inclure le token
          headers: {
            Authorization: `Bearer ${localStorage.getItem('access_token')}`,
          },
        }, 

      );
      setCompetitions([...competitions, response.data.competition]); // Ajouter la compétition à la liste
      setIsModalOpen(false); // Fermer la fenêtre modale
      setNewCompetitionDetails({
        name: '',
        min_participants: '',
        duration_days: '',
      }); // Réinitialiser le formulaire
    } catch (error) {
      if (error.response) {
        console.error('Erreur du backend :', error.response.data.error);
        alert(`Erreur : ${error.response.data.error}`);
      } else {
        console.error('Erreur réseau ou autre :', error.message);
        alert("Une erreur inattendue s'est produite. Veuillez réessayer.");
      }
    }
  };

  return (
    <>
      <Navbar />
      <div style={styles.container}>
        {/* Section profil joueur */}
        <div style={styles.profileSection}>
          <div style={styles.profileCard}>
            <h2>{user.username}</h2>
            <h3>{user.score}<span> pts</span></h3>
            <div style={styles.profileDetails}>
              <div style={styles.detailItem}>
                <p>Matchs joués</p>
                <h4>{user.match_played}</h4>
              </div>
              <div style={styles.detailItem}>
                <p>Gagnés</p>
                <h4>{user.wins}</h4>
              </div>
              <div style={styles.detailItem}>
                <p>Matchs nuls</p>
                <h4>{user.draws}</h4>
              </div>
              <div style={styles.detailItem}>
                <p>Perdus</p>
                <h4>{user.loses}</h4>
              </div>
            </div>
          </div>
        </div>

        {/* Bloc Créer une compétition */}
        <div style={styles.blocksContainer}>
          <div style={styles.block}>
            <div style={styles.blockImageCreate}>
              <h2>Créer une compétition</h2>
              <button onClick={toggleModal} style={styles.button}>
                Créer
              </button>
            </div>
          </div>
        </div>

        {/* Liste des compétitions */}
        <div style={styles.section}>
          <h2>Vos compétitions</h2>
          {listCompetitions.length === 0 ? (
            <p>Aucune compétition pour le moment.</p>
          ) : (
            <ul style={styles.sectionCompet}>
              {listCompetitions.map((comp) => (
                <li style={styles.blockCompet} key={comp.id}>
                  <div>
                    {comp.name} (ID: {comp.id})
                    <p>{comp.min_participants}/{comp.max_participants} participants</p>
                    <p>{comp.duration_days} jours restants</p>
                    <h4>{comp.status}</h4>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Modal pour créer une compétition */}
        {isModalOpen && (
          <div style={styles.modalOverlay}>
            <div style={styles.modal}>
              <h2>Créer une nouvelle compétition</h2>
              <label>
                Nom de la compétition :
                <input
                  type="text"
                  name="name"
                  value={newCompetitionDetails.name}
                  onChange={handleChange}
                  style={styles.input}
                />
              </label>
              <label>
                Nombre minimum de participants :
                <input
                  type="number"
                  name="min_participants"
                  value={newCompetitionDetails.min_participants}
                  onChange={handleChange}
                  style={styles.input}
                />
              </label>
              <label>
                Durée de la compétition (en jours) :
                <input
                  type="number"
                  name="duration_days"
                  value={newCompetitionDetails.duration_days}
                  onChange={handleChange}
                  style={styles.input}
                />
              </label>
              <div style={styles.modalActions}>
                <button onClick={handleSubmit} style={styles.button}>
                  Valider
                </button>
                <button onClick={toggleModal} style={{ ...styles.button, backgroundColor: 'gray' }}>
                  Annuler
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

const styles = {
  sectionCompet: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  blockCompet: {
    padding: '10px',
    boxShadow: '0 2px 5px rgba(0, 0, 0, 0.6)',
    width: '45%',
    borderRadius: '.5rem',
    marginBottom: '1rem',
  },
  container: {
    padding: '20px',
    maxWidth: '1000px',
    margin: '0 auto',
    fontFamily: 'Arial, sans-serif',
  },
  profileSection: {
    marginBottom: '40px',
    display: 'flex',
    justifyContent: 'center',
  },
  profileCard: {
    width: '80%',
    padding: '20px',
    borderRadius: '10px',
    backgroundColor: '#f8f9fa',
    textAlign: 'center',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  },
  profileDetails: {
    display: 'flex',
    justifyContent: 'space-around',
    marginTop: '20px',
  },
  detailItem: {
    textAlign: 'center',
  },
  blocksContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    gap: '20px',
    marginBottom: '40px',
  },
  block: {
    width: '48%',
    borderRadius: '10px',
    overflow: 'hidden',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  },
  blockImageCreate: {
    backgroundImage: "url('https://images.unsplash.com/photo-1499877468582-90301c136ebc?q=80&w=2070&auto=format&fit=crop')",
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    padding: '20px',
    color: '#fff',
  },
  input: {
    width: '100%',
    padding: '10px',
    marginBottom: '10px',
    borderRadius: '5px',
    border: '1px solid #ccc',
  },
  button: {
    padding: '10px 15px',
    border: 'none',
    borderRadius: '5px',
    backgroundColor: '#007bff',
    color: '#fff',
    cursor: 'pointer',
  },
  modalOverlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
  },
  modal: {
    backgroundColor: '#fff',
    padding: '20px',
    borderRadius: '10px',
    width: '400px',
    textAlign: 'center',
  },
  modalActions: {
    display: 'flex',
    justifyContent: 'space-between',
    marginTop: '20px',
  },
};

export default Sass;
