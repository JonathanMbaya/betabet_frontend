import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faVideo, faForward, faTable, faTicket } from '@fortawesome/free-solid-svg-icons';

function PanelPilot() {
  return (
    <>
      <div style={styles.navbar}>
        <button style={styles.navButton}>
          En direct
          <FontAwesomeIcon icon={faVideo} style={styles.icon} />
        </button>
        <button style={styles.navButton}>
          À venir
          <FontAwesomeIcon icon={faForward} style={styles.icon} />
        </button>
        <button style={styles.navButton}>
          Classement
          <FontAwesomeIcon icon={faTable} style={styles.icon} />
        </button>
        <button style={styles.navButton}>
          Mes paris
          <FontAwesomeIcon icon={faTicket} style={styles.icon} />
        </button>
      </div>
    </>
  );
}

const styles = {
  navbar: {
    position: 'fixed',
    bottom: 0,
    left: 0,
    width: '100%',
    backgroundColor: '#6B8E23',
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'center',
    padding: '10px 0',
    boxShadow: '0 -2px 5px rgba(0, 0, 0, 0.1)',
    zIndex: 1000,
  },
  navButton: {
    backgroundColor: 'white',
    color: '#6B8E23',
    border: 'none',
    borderRadius: '20px',
    padding: '10px 15px',
    cursor: 'pointer',
    fontSize: '14px',
    fontWeight: 'bold',
    transition: 'background-color 0.3s ease, color 0.3s ease',
    display: 'flex',
    alignItems: 'center',
    gap: '8px', // Espacement entre le texte et l'icône
  },
  icon: {
    fontSize: '16px',
  },
};

export default PanelPilot;
