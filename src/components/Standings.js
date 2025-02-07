import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';

const Standings = () => {
  const [standings, setStandings] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedLeague, setSelectedLeague] = useState(null);

  const leagues = {
    uefaChampionsLeague: 3,
    premierLeague: 152,
    laLiga: 302,
    serieA: 207,
    bundesliga: 175,
    ligue1: 168,
    primeiraLiga: 266,
    firstDivisionBelgium: 63,
    mls: 332,
    serieABrazil: 99,
    saudiLeague: 278,
  };

  const sliderRef = useRef(null); // Référence pour le conteneur du slider

  const fetchStandings = async (leagueId) => {
    setLoading(true);
    setError(null);
    setStandings([]);
    try {
      const API_ALL_SPORT_DATA = "fa25d2130d305098ca63d7db5a3f825399d58f47bd53b01553b0907f23fc4421";
      const response = await axios.get(
        `https://apiv2.allsportsapi.com/football/?met=Standings&leagueId=${leagueId}&APIkey=${API_ALL_SPORT_DATA}`
      );
      setStandings(response.data.result.total || []);
    } catch (err) {
      setError('Impossible de récupérer les classements.');
      console.error('Erreur API:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (selectedLeague) fetchStandings(selectedLeague);
  }, [selectedLeague]);

  const scrollSlider = (direction) => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({
        left: direction === 'left' ? -200 : 200,
        behavior: 'smooth',
      });
    }
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Classements des championnats</h1>

        {/* Slider avec boutons fléchés */}
        <div style={styles.sliderContainer}>
            <button style={styles.arrowButton} onClick={() => scrollSlider('left')}>
                ◀
            </button>
            <div style={styles.buttons}>
                {Object.entries(leagues).map(([leagueName, leagueId]) => (
                <button
                    key={leagueId}
                    style={
                    selectedLeague === leagueId
                        ? styles.activeButton
                        : styles.button
                    }
                    onClick={() => setSelectedLeague(leagueId)}
                >
                    {leagueName
                    .replace(/([A-Z])/g, ' $1') // Convert camelCase to spaced text
                    .replace(/^\w/, (c) => c.toUpperCase())} {/* Capitalize first letter */}
                </button>
                ))}
            </div>
            <button style={styles.arrowButton} onClick={() => scrollSlider('right')}>
                ▶
            </button>
      </div>
      {loading ? (
        <p style={styles.loading}>Chargement...</p>
      ) : error ? (
        <p style={styles.error}>{error}</p>
      ) : standings.length > 0 ? (
        <table style={styles.table}>
          <thead>
            <tr style={styles.tr}>
              <th style={styles.nameTeam}>Pos.</th>
              <th style={styles.nameTeam}>Équipe</th>
              <th>J</th>
              <th>V</th>
              <th>N</th>
              <th>D</th>
              <th>BP</th>
              <th>BC</th>
              <th>Diff</th>
              <th>Pts</th>
            </tr>
          </thead>
          <tbody>
            {standings.map((team) => (
              <tr style={styles.tr} key={team.team_key}>
                <td style={styles.nameTeam}>{team.standing_place}</td>
                <td>
                  {team.standing_team}
                </td>
                <td>{team.standing_P}</td>
                <td>{team.standing_W}</td>
                <td>{team.standing_D}</td>
                <td>{team.standing_L}</td>
                <td>{team.standing_F}</td>
                <td>{team.standing_A}</td>
                <td>{team.standing_GD}</td>
                <td>{team.standing_PTS}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p style={styles.message}>
          Sélectionnez une ligue pour voir les classements.
        </p>
      )}
    </div>
  );
};

const styles = {
  container: {
    padding: '20px',
    maxWidth: '95%',
    margin: '2rem auto',
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
  sliderContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: '20px',
  },
  arrowButton: {
    background: 'none',
    border: 'none',
    fontSize: '24px',
    cursor: 'pointer',
    padding: '5px 10px',
  },
  buttons: {
    display: 'flex',
    overflowX: 'auto',
    gap: '10px',
    padding: '10px 0',
    maxWidth: '80%',
    scrollBehavior: 'smooth',
  },
//   buttons: {
//     display: 'flex',
//     flexWrap: 'wrap',
//     justifyContent: 'center',
//     gap: '10px',
//     marginBottom: '20px',
//   },
  button: {
    padding: '10px 20px',
    fontSize: '14px',
    border: '1px solid #ccc',
    backgroundColor: '#f4f4f4',
    borderRadius: '5px',
    cursor: 'pointer',
  },
  activeButton: {
    padding: '10px 20px',
    fontSize: '14px',
    border: '1px solid #000',
    backgroundColor: '#ddd',
    borderRadius: '5px',
    cursor: 'pointer',
    fontWeight: 'bold',
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
    textAlign: 'center',
    color: 'white'
  },
  logo: {
    width: '20px',
    height: '20px',
    marginRight: '10px',
    verticalAlign: 'middle',
  },
  loading: {
    textAlign: 'center',
    fontSize: '18px',
    color: '#666',
  },
  error: {
    textAlign: 'center',
    fontSize: '18px',
    color: 'red',
  },
  message: {
    textAlign: 'center',
    fontSize: '18px',
    color: 'white',
  },

  nameTeam: {
    maxWidth: '30px',
    color: 'white !important'
  },

  tr : {
    borderBottom: '.5px solid gray',
    color: 'white !important'

  }
};

export default Standings;
