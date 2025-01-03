import React, { useEffect, useState } from 'react';
import axios from 'axios';
import MatchCard from './MatchCard';

function InLiveMatches() {
  const fakeMatch = {
    event_home_team: 'Equipe Fictive Domicile',
    event_away_team: 'Equipe Fictive Extérieur',
    home_team_logo: 'https://via.placeholder.com/50',
    away_team_logo: 'https://via.placeholder.com/50',
    event_final_result: '0 - 0',
    event_date: '2024-12-25',
    event_time: '00:00',
    event_stadium: 'Stade Imaginaire',
    goalscorers: [],
  };

  const [liveMatches, setLiveMatches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMatches = async () => {
      const API_ALL_SPORT_DATA = process.env.REACT_APP_API_ALL_SPORT_DATA;

      const options = {
        method: 'GET',
        url: `https://apiv2.allsportsapi.com/football/?met=Livescore&APIkey=${API_ALL_SPORT_DATA}`,
      };

      try {
        const response = await axios.request(options);
        console.log('API Response:', response.data);
        setLiveMatches(response.data.result || []); // Extrayez les résultats
      } catch (error) {
        setError('Impossible de récupérer les matchs en direct.');
        console.error('Erreur API:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchMatches();
  }, []);

  return (
    <>
      <main style={styles.container}>
        <h1 style={styles.title}>En Direct</h1>
        <section style={styles.matches}>
          {loading ? (
            <p style={styles.noMatches}>Chargement des matchs...</p>
          ) : error ? (
            <p style={styles.noMatches}>{error}</p>
          ) : liveMatches.length > 0 ? (
            liveMatches.map((match) => (
              <MatchCard
                key={match.event_key}
                match={{
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
            <MatchCard
              key="fakeMatch"
              match={{
                homeTeam: fakeMatch.event_home_team,
                awayTeam: fakeMatch.event_away_team,
                homeLogo: fakeMatch.home_team_logo,
                awayLogo: fakeMatch.away_team_logo,
                score: fakeMatch.event_final_result,
                date: fakeMatch.event_date,
                time: fakeMatch.event_time,
                stadium: fakeMatch.event_stadium,
                goalscorers: fakeMatch.goalscorers,
              }}
            />
          )}
        </section>
      </main>
    </>
  );
}

const styles = {
  container: {
    padding: '20px',
    margin: '2rem auto',
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

export default InLiveMatches;
