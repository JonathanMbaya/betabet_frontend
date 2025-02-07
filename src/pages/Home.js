import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import PanelPilot from '../components/PanelPilot';
import InLiveMatches from '../components/inLiveMatches';
import Standings from '../components/Standings';
import BasketBets from '../components/BasketBets';
import Friendship from '../components/Friendship';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserPlus, faTimes } from '@fortawesome/free-solid-svg-icons';

const Home = () => {
  const [activeTab, setActiveTab] = useState('inLiveMatches'); // Onglet actif
  const [showFriendship, setShowFriendship] = useState(false); // Gérer l'affichage du popup

  const renderTabContent = () => {
    switch (activeTab) {
      case 'inLiveMatches':
        return <InLiveMatches />;
      case 'standings':
        return <Standings />;
      case 'basket':
        return <BasketBets />;
      default:
        return <InLiveMatches />;
    }
  };

  return (
    <main style={{ ...styles.mainContainer, filter: showFriendship ? 'blur(0px)' : 'none' }}>
      {/* Image de fond */}
      <div style={styles.backgroundImage} />

      {/* Overlay vert */}
      <div style={styles.greenOverlay} />

      {/* Contenu principal */}
      <Navbar />
      <PanelPilot activeTab={activeTab} onTabChange={setActiveTab} />
      <div style={styles.tabContent}>{renderTabContent()}</div>

      {/* Bouton pour afficher la pop-up Amis */}
      <div style={styles.iconFriend} onClick={() => setShowFriendship(true)}>
        <FontAwesomeIcon icon={faUserPlus} /> Amis
      </div>

      {/* Pop-up d'affichage des amis */}
      {showFriendship && (
        <div style={styles.popupOverlay}>
          <div style={styles.popupContent}>
            {/* Bouton pour fermer la pop-up */}
            <button onClick={() => setShowFriendship(false)} style={styles.closeButton}>
              <FontAwesomeIcon icon={faTimes} />
            </button>

            {/* Composant FriendShip */}
            <Friendship />
          </div>
        </div>
      )}
    </main>
  );
};

const styles = {
  mainContainer: {
    position: 'relative',
    width: '100%',
    overflow: 'hidden',
    transition: 'filter 0.3s ease-in-out', // Animation de flou
  },
  backgroundImage: {
    position: 'fixed',
    top: 0,
    left: 0,
    height: '100%',
    width: '100%',
    backgroundImage: 'url(https://images.unsplash.com/photo-1431324155629-1a6deb1dec8d?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fA%3D%3D)',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    zIndex: -2,
  },
  greenOverlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    height: '100%',
    width: '100%',
    backgroundColor: 'rgba(0, 128, 0, 0.3)', // Vert transparent
    zIndex: -1,
  },
  tabContent: {
    padding: '20px',
    marginTop: '10px',
    borderRadius: '10px',
  },
  iconFriend: {
    position: 'fixed',
    zIndex: 500,
    bottom: '20px',
    right: '2rem',
    color: 'white',
    cursor: 'pointer',
    backgroundColor: '#008000',
    padding: '10px 15px',
    borderRadius: '10px',
    fontSize: '18px',
    boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.3)',
    transition: 'background 0.3s',
  },
  popupOverlay: {
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
  popupContent: {
    backgroundColor: 'white',
    width: '80%',
    maxWidth: '600px',
    padding: '20px',
    borderRadius: '10px',
    boxShadow: '0px 5px 15px rgba(0, 0, 0, 0.3)',
    position: 'relative',
    animation: 'fadeIn 0.3s ease-in-out',
  },
  closeButton: {
    position: 'absolute',
    top: '10px',
    right: '10px',
    background: 'none',
    border: 'none',
    fontSize: '20px',
    cursor: 'pointer',
  }
};

export default Home;
