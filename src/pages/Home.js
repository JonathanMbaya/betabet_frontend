import React from 'react';
import MatchCard from '../components/MatchCard';
import Navbar from '../components/Navbar';
import PanelPilot from '../components/PanelPilot';

const Home = () => {
  // Exemple de données
  const liveMatches = [
    {
      id: 1,
      homeTeam: 'Real Madrid',
      awayTeam: 'Manchester United',
      time: '92:30 +5',
      competition: 'Champions League',
      score: '1 - 0',
      odds: {
        home: 1.8,
        draw: 3.5,
        away: 4.2,
      },
    },
    // Ajoutez d'autres matchs ici
  ];

  return (
    <>
      <Navbar />

      <main style={styles.container}>
        <h1 style={styles.title}>En Direct</h1>
        <section style={styles.matches}>
          {liveMatches.length > 0 ? (
            liveMatches.map((match) => (
              <MatchCard
                key={match.id}
                match={match}
                onBet={(prediction) => {
                  console.log(`Pari placé sur ${match.id}: ${prediction}`);
                }}
                showDetails={() => {
                  console.log(`Afficher les détails du match ${match.id}`);
                }}
              />
            ))
          ) : (
            <p style={styles.noMatches}>Aucun match en direct pour le moment.</p>
          )}
        </section>
      </main>

      <PanelPilot/>
    </>
  );
};

const styles = {
  container: {
    padding: '20px',
    margin: '0 auto',
    maxWidth: '800px',
    fontFamily: '"Arial", sans-serif',
    borderRadius: '10px',
    backgroundColor: '#F5F5F5',
  },
  title: {
    fontSize: '28px',
    textAlign: 'center',
    color: '#333',
    marginBottom: '20px',
    fontWeight: 'bold',
  },
  matches: {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
  },
  noMatches: {
    textAlign: 'center',
    fontSize: '18px',
    color: '#666',
  },
};

export default Home;
