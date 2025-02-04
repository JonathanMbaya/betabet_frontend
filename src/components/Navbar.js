import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWallet } from '@fortawesome/free-solid-svg-icons';
import { useAuth } from '../contexts/AuthContext';


const Navbar = ({ score, onProfileClick }) => {
  const { user } = useAuth();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const {logout} = useAuth();

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  return (
    <>
      {/* Navbar */}
      <div style={styles.navbar}>
        <button style={styles.menuButton} onClick={toggleDrawer}>
          ☰ Menu
        </button>
      </div>

      <div style={styles.navbarLogo}>
        <div style={styles.menuButton}>
          Betabet
        </div>
      </div>

      <div style={styles.navbarWallet}>
        <div style={styles.menuButton}>
          <span style={styles.yellow}> + {user.score} pts <FontAwesomeIcon style={styles.icon} icon={faWallet} /></span>
        </div>
      </div>

      {/* Drawer */}
      <div
        style={{
          ...styles.drawer,
          transform: isDrawerOpen ? 'translateX(0)' : 'translateX(-100%)',
        }}
      >
        <div style={styles.drawerHeader}>
          <h2>{user.username}</h2>
          <p>Débutant</p>
        </div>
        <hr style={styles.divider} />
        <ul style={styles.menuList}>
          <li style={styles.pointList}>
            <Link to="/">
              Mon profil
            </Link>
          </li>
          <li style={styles.pointList}>Liste d'Amis</li>
          <li style={styles.pointList}>A propos de Betabet</li>
          <li onClick={logout} style={styles.pointList}>Déconnexion</li>
        </ul>
      </div>

      {/* Overlay (pour fermer le drawer en cliquant à l'extérieur) */}
      {isDrawerOpen && <div style={styles.overlay} onClick={toggleDrawer}></div>}
    </>
  );
};

const styles = {
  navbar: {
    display: 'flex',
    position: 'fixed',
    zIndex: '100',
    top: '0',
    alignItems: 'center',
    justifyContent: 'space-between',
    color: 'white',
    fontFamily: 'Arial, sans-serif',
  },

  navbarLogo : {
    display: 'flex',
    position: 'fixed',
    alignItems: 'center',
    justifyContent: 'center',
    top: '0',
    textAlign: 'center',
    width: '100%',
    color: 'white',
    fontFamily: 'Arial, sans-serif',
  },

  navbarWallet : {
    display: 'flex',
    position: 'fixed',
    alignItems: 'center',
    justifyContent: 'center',
    top: '0',
    right: '0',
    textAlign: 'center',
    color: 'white',
    fontFamily: 'Arial, sans-serif',
  },

  menuButton: {
    fontSize: '18px',
    background: 'none',
    border: 'none',
    color: 'white',
    cursor: 'pointer',
    backgroundColor: '#6B8E23',
    padding: '7px 20px',
    boxShadow: '0 2px 5px rgba(0, 0, 0, 0.6)',
    maxWidth: '120px',
  },
  title: {
    fontSize: '24px',
    margin: 0,
  },
  scoreBox: {
    backgroundColor: 'white',
    color: '#6B8E23',
    padding: '5px 10px',
    borderRadius: '10px',
  },
  profileButton: {
    fontSize: '20px',
    background: 'none',
    border: 'none',
    color: 'white',
    cursor: 'pointer',
  },
  drawer: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '350px',
    height: '100%',
    backgroundColor: '#6B8E23',
    color: 'white',
    padding: '20px',
    boxShadow: '2px 0 5px rgba(0, 0, 0, 0.5)',
    transform: 'translateX(-100%)',
    transition: 'transform 0.3s ease-in-out',
    zIndex: 1000,
  },
  drawerHeader: {
    marginBottom: '20px',
  },
  divider: {
    border: '1px solid white',
    marginBottom: '20px',
  },
  menuList: {
    display: 'flex',
    flexDirection:'column',
    justifyContent: 'space-around',
    listStyle: 'none',
    margin: 0,
  },
  menuListItem: {
    marginBottom: '15px',
    marginTop: '15px',
    fontSize: '18px',
  },
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    zIndex: 999,
  },

  icon : {
    color: '#43F043',
  },
  pointList : {
    marginTop: '2rem'
  }
};

export default Navbar;
