import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import PanelPilot from '../components/PanelPilot';
import InLiveMatches from '../components/inLiveMatches';
import Standings from '../components/Standings';
import BasketBets from '../components/BasketBets';

const Home = () => {
  const [activeTab, setActiveTab] = useState('inLiveMatches'); // Onglet actif

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
    <main style={styles.mainContainer}>
      {/* Image de fond */}
      <div style={styles.backgroundImage} />

      {/* Overlay vert */}
      <div style={styles.greenOverlay} />

      {/* Contenu principal */}
      <Navbar />
      <PanelPilot activeTab={activeTab} onTabChange={setActiveTab} />
      <div style={styles.tabContent}>{renderTabContent()}</div>
    </main>
  );
};

const styles = {
  mainContainer: {
    position: 'relative',
    width: '100%',
    overflow: 'hidden',
  },
  backgroundImage: {
    position: 'fixed',
    top: 0,
    left: 0,
    height: '100%',
    width: '100%',
    backgroundImage: 'url(https://images.unsplash.com/photo-1431324155629-1a6deb1dec8d?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)',
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
};

export default Home;
