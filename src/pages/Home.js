import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import PanelPilot from '../components/PanelPilot';
import InLiveMatches from '../components/inLiveMatches';
import Standings from '../components/Standings';

const Home = () => {
  const [activeTab, setActiveTab] = useState('inLiveMatches'); // Onglet actif

  const renderTabContent = () => {
    switch (activeTab) {
      case 'inLiveMatches':
        return <InLiveMatches />;
      case 'standings':
        return <Standings />;
      default:
        return <InLiveMatches />;
    }
  };

  return (
    <>
      <Navbar />
      <PanelPilot activeTab={activeTab} onTabChange={setActiveTab} />
      <div style={styles.tabContent}>{renderTabContent()}</div>
    </>
  );
};

const styles = {
  tabContent: {
    padding: '20px',
    marginTop: '10px',
    backgroundColor: '#F5F5F5',
    borderRadius: '10px',
  },
};

export default Home;
