import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Navbar from './Navbar';

function DetailsMatch() {
  const { id } = useParams(); // Récupère l'event_key depuis l'URL
  const [activeTab, setActiveTab] = useState('statistics'); 
  const [liveMatches, setLiveMatches] = useState([]);
  const [matchDetails, setMatchDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const API_KEY = 'd73d6c9f857db59eea4511d3aa55ec9f200f581f24ba5086dc0b54a1c0dc2239';

  // Fonction pour récupérer les scores en direct
  const fetchScores = async () => {
    try {
      const response = await axios.get('https://apiv2.allsportsapi.com/football/', {
        params: {
          met: 'Livescore',
          APIkey: API_KEY,
        },
      });
      const matches = response.data.result || [];
      setLiveMatches(matches); // Stocke tous les matchs
      const selectedMatch = matches.find((match) => match.event_key === parseInt(id));
      setMatchDetails(selectedMatch); // Trouve le match correspondant à l'event_key
      setLoading(false);
    } catch (err) {
      setError('Erreur lors de la récupération des scores.');
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchScores();
  }, [id]); // Recharger si l'event_key change

  if (loading) {
    return <p>Chargement des détails du match...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  if (!matchDetails) {
    return <p>Aucun détail disponible pour ce match.</p>;
  }

  return (
    <>
        <Navbar/>
        <main style={styles.container}>
            <div style={styles.card}>
                <p style={{textAlign: 'center', color: 'white'}}>Date: {matchDetails.event_date} | Heure: {matchDetails.event_time} 
                    <br/> Stade: {matchDetails.event_stadium || 'Non spécifié'}
                    <br/> Compétition : {matchDetails.league_name}
                </p>
                <div style={styles.team}>
                    <table style={styles.table}>
                    <thead>
                        <tr style={styles.tr} >
                        <th style={styles.thlogo}><img src={matchDetails.home_team_logo} alt={`${matchDetails.event_home_team} logo`} style={styles.logo}/> <br/> {matchDetails.event_home_team}</th>
                        <th style={styles.thlogo}>{matchDetails.event_final_result}</th>
                        <th style={styles.thlogo}><img src={matchDetails.away_team_logo} alt={`${matchDetails.event_away_team} logo`} style={styles.logo}/> <br/> {matchDetails.event_away_team}</th>
                        </tr>
                    </thead>
                    </table>
                </div>

                <div style={styles.details}>
                    <table style={styles.table}>
                        <tbody>
                        {matchDetails.goalscorers && matchDetails.goalscorers.map((scorer, index) => (
                            <tr key={index}>
                            <td style={styles.td}>
                                {scorer.time}' {scorer.home_scorer || ""}
                            </td>
                            <td style={styles.td}>
                                {scorer.away_scorer || ""}
                            </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>

            </div>

            <div style={styles.card}>
                {/* Onglets */}
                <div style={styles.tabs}>
                    <p 
                    style={activeTab === 'statistics' ? styles.activeTab : styles.tab} 
                    onClick={() => setActiveTab('statistics')}
                    >
                    Statistiques
                    </p>
                    <p 
                    style={activeTab === 'players' ? styles.activeTab : styles.tab} 
                    onClick={() => setActiveTab('players')}
                    >
                    Joueurs
                    </p>
                </div>

                {/* Contenu des onglets */}
                <div style={styles.tabContent}>
                    {activeTab === 'statistics' && (
                    <div>
                        <table>
                            {matchDetails.statistics && matchDetails.statistics.map((stat, index) => (
                                <tr style={styles.dataStat}>
                                    <td style={styles.dataStat}>{stat.home}</td>
                                    <td style={styles.dataStat}>{stat.type}</td>
                                    <td style={styles.dataStat}>{stat.away}</td>
                                </tr> 
                            ))}
                        </table>

                    </div>
                    )}

                    {activeTab === 'players' && (
                    <div>
                        <h3>Liste des joueurs</h3>
                        <ul>
                        {matchDetails.players.map((player, index) => (
                            <li key={index}>{player}</li>
                        ))}
                        </ul>
                        <h3>Formation</h3>
                        <tr>
                            <td>{matchDetails.event_home_formation}</td>
                            <td>{matchDetails.event_away_formation}</td>
                        </tr>
                    </div>
                    )}
                </div>
            </div>



        </main>
    </>

  );
}

const styles = {

  container: {
    padding: '20px',
    margin: '4rem auto',
    maxWidth: '800px',
    borderRadius: '10px',
    fontFamily: '"Arial", sans-serif',
  },
  card: {
    border: '1px solid #ddd',
    borderRadius: '2rem',
    padding: '16px',
    margin: '10px 0',
    backgroundColor: '#6B8E23',
    fontFamily: 'Arial, sans-serif',
    boxShadow: '0 -2px 5px rgba(0, 0, 0, 0.1)',

  },
  team: {
    textAlign: 'center',
  },
  logo: {
    width: '50px',
    height: '50px',
    borderRadius: '50%',
    marginBottom: '8px',
  },
  score: {
    fontSize: '24px',
    fontWeight: 'bold',
    color: '#333',
  },
  details: {
    marginTop: '12px',
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
    marginTop: '10px',

  },
  th: {
    display:'flex',
    justifyContent: 'center',
    alignItems:'center',
    padding: '10px',
    border: 'none',
    fontWeight: 'bold',
    width: '50px',
  },
  thlogo: {
    display:'flex',
    flexDirection:'column',
    justifyContent: 'center',
    alignItems:'center',
    padding: '10px',
    border: 'none',
    fontWeight: 'bold',
    maxWidth: '100px',
  },
  thscore : {
    maxWidth: '20%'
  },
  tr: {
    backgroundColor: '#F3F3F3',
    borderRadius: '1rem',
    marginBottom: '10px',
    border: 'none',
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'center',
    boxShadow: '0 -2px 5px rgba(0, 0, 0, 0.1)',
    color: 'white !important',
  },
  td: {
    padding: '10px 20px',
    borderLeft: '.5px solid #ddd',
    textAlign: 'left',
    width:'50%',
    color: 'white',
  },

  dataStat : {
    textAlign: 'center',
    color: 'white',
  },

  oddspanel:{
    display:'flex',
    justifyContent: 'space-around',
    alignItems: 'center'
  },

  button:{
    padding: '10px 15px',
    backgroundColor: '#228B22',
    color: '#fff',
    border: 'none',
    borderRadius: '.5rem',
    cursor: 'pointer',
    marginTop: '.5rem',
    fontSize:'12px' 
  },
  tabs: {
    display: 'flex',
    justifyContent: 'space-around',
    marginBottom: '20px',
    borderBottom: '2px solid #ddd',
  },
  tab: {
    padding: '10px 20px',
    cursor: 'pointer',
    fontWeight: 'bold',
    color: '#555',
  },
  activeTab: {
    padding: '10px 20px',
    cursor: 'pointer',
    fontWeight: 'bold',
    color: '#000',
    borderBottom: '2px solid #228B22',
  },
  tabContent: {
    padding: '10px 0',
  },
};

export default DetailsMatch;
