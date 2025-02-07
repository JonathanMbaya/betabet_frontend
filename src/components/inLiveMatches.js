import React, { useEffect, useState } from 'react';
import axios from 'axios';
import MatchCard from './MatchCard';

function InLiveMatches() {
  const API_KEY = 'fa25d2130d305098ca63d7db5a3f825399d58f47bd53b01553b0907f23fc4421';
  const [liveMatches, setLiveMatches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchScores = async () => {
    try {
      const response = await axios.get('https://apiv2.allsportsapi.com/football/', {
        params: {
          met: 'Livescore',
          APIkey: API_KEY,
        },
      });
      setLiveMatches(response.data.result || []);
      setLoading(false);
    } catch (err) {
      setError('Erreur lors de la récupération des scores.');
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchScores();
    const interval = setInterval(fetchScores, 10000); // Actualisation toutes les 10 secondes
    return () => clearInterval(interval); // Nettoyage de l’intervalle à la fin
  }, []);

  return (
    <main style={styles.container}>
      <h1 style={styles.title}>En Direct</h1>
      <section style={styles.matches}>
        {loading ? (
          <p style={styles.noMatches}>Chargement des matchs...</p>
        ) : error ? (
          <p style={styles.noMatches}>{error}</p>
        ) : liveMatches.length > 0 ? (
          liveMatches.map((match, index) => (
            <MatchCard
              key={index}
              match={{
                id: match.event_key,
                homeTeam: match.event_home_team,
                awayTeam: match.event_away_team,
                homeLogo: match.home_team_logo,
                awayLogo: match.away_team_logo,
                score: match.event_final_result,
                date: match.event_date,
                time: match.event_time,
                stadium: match.event_stadium,
                goalscorers: match.goalscorers,
              }}
            />
          ))
        ) : (
          <p style={styles.noMatches}>Aucun match en direct pour le moment.</p>
        )}
      </section>
    </main>
  );
}

const styles = {
  container: {
    padding: '20px',
    margin: '2rem auto',
    maxWidth: '800px',
    fontFamily: '"Arial", sans-serif',
    borderRadius: '10px',
  },
  title: {
    fontSize: '28px',
    textAlign: 'center',
    color: 'white',
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
    color: 'white',
  },
};

export default InLiveMatches;
