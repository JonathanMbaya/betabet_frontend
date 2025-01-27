import React from 'react';
import { useNavigate } from 'react-router-dom';

const MatchCard = ({ match }) => {

  const navigate = useNavigate();

  const {
    id,
    homeTeam,
    awayTeam,
    homeLogo,
    awayLogo,
    score,
    date,
    time,
    stadium,
    goalscorers,
  } = match;


  const handleClick = () => {
    navigate(`/match/${id}`); // Redirige vers l'URL du match
  };

  return (
    <div onClick={handleClick} style={styles.card}>

      <p style={{textAlign: 'center', color: 'white'}}>Date: {date} | Heure: {time} <br/> Stade: {stadium || 'Non spécifié'}</p>
      <div style={styles.team}>
        <table style={styles.table}>
          <thead>
            <tr style={styles.tr} >
              <th style={styles.thlogo}>{homeTeam} <img src={homeLogo} alt={`${homeTeam} logo`} style={styles.logo}/></th>
              <th style={styles.thlogo}>{score}</th>
              <th style={styles.thlogo}><img src={awayLogo} alt={`${awayTeam} logo`} style={styles.logo}/> {awayTeam}</th>
            </tr>
          </thead>
        </table>
      </div>

      <div style={styles.oddspanel}>
        <button style={styles.button}>+3</button>
        <button style={styles.button}>Match nul +1</button>
        <button style={styles.button}>+3</button>
      </div>

    </div>
  );
};

const styles = {
  card: {
    border: '1px solid #ddd',
    borderRadius: '2rem',
    padding: '16px',
    margin: '10px 0',
    backgroundColor: '#6B8E23',
    fontFamily: 'Arial, sans-serif',
    boxShadow: '0 -2px 5px rgba(0, 0, 0, 0.1)',

  },
  header: {
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginBottom: '16px',
  },
  team: {
    textAlign: 'center',
  },
  logo: {
    width: '30px',
    height: '30px',
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
    width: '70px',
  },
  thlogo: {
    display:'flex',
    justifyContent: 'center',
    alignItems:'center',
    padding: '10px',
    border: 'none',
    maxWidth: '100px',
    fontSize: '12px'
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
  oddspanel:{
    display:'flex',
    justifyContent: 'space-around',
    alignItems: 'center'
  },
  button:{
    padding: '10px 15px',
    backgroundColor: 'white',
    color: '#228B22',
    border: 'none',
    borderRadius: '.5rem',
    cursor: 'pointer',
    marginTop: '.5rem',
    fontSize:'12px' 
  }
};

export default MatchCard;
