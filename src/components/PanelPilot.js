import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faVideo, faTable, faTicket } from '@fortawesome/free-solid-svg-icons';

function PanelPilot({ activeTab, onTabChange }) {
  return (
    <>
      <div style={styles.navbar}>
        <button
          style={activeTab === 'inLiveMatches' ? styles.activeButton : styles.navButton}
          onClick={() => onTabChange('inLiveMatches')}
        >
          <FontAwesomeIcon icon={faVideo} style={styles.icon} />
        </button>
        <button
          style={activeTab === 'standings' ? styles.activeButton : styles.navButton}
          onClick={() => onTabChange('standings')}
        >
          <FontAwesomeIcon icon={faTable} style={styles.icon} />
        </button>

        <button style={styles.navButton}>
          <FontAwesomeIcon icon={faTicket} style={styles.icon} />
        </button>
      </div>
    </>
  );
}

const styles = {
  navbar: {
    position: 'fixed',
    top: '50px',
    right: '0px',
    width: '80px',
    height: '200px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-around',
    alignItems: 'space-around',
    zIndex: 1000,
  },
  navButton: {
    backgroundColor: 'white',
    boxShadow: '0 -2px 5px rgba(0, 0, 0, 0.1)',
    borderRadius: '50px',
    color: '#6B8E23',
    border: 'none',
    padding: '15px',
    margin: '10px',
    cursor: 'pointer',
    fontSize: '14px',
    fontWeight: 'bold',
    transition: 'background-color 0.3s ease, color 0.3s ease',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px', // Espacement entre le texte et l'icône
    width: '60px',
    height: '100px'
  },
  activeButton : {
    backgroundColor: '#6B8E23',
    boxShadow: '0 -2px 5px rgba(0, 0, 0, 0.1)',
    borderRadius: '50px',
    color: 'white',
    border: 'none',
    padding: '10px 15px',
    margin: '10px',
    cursor: 'pointer',
    fontSize: '14px',
    fontWeight: 'bold',
    transition: 'background-color 0.3s ease, color 0.3s ease',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px', // Espacement entre le texte et l'icône
    width: '60px',
    height: '100px',
  },
  icon: {
    fontSize: '16px',
  },
};

export default PanelPilot;
