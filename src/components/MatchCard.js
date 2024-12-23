import React from 'react';

const MatchCard = ({ match, onBet, showDetails }) => {
  const { homeTeam, awayTeam, time, competition, score, odds } = match;

  return (
    <div style={styles.card}>
      <div style={styles.header}>
        <span style={styles.timeCompetition}>
          {time} | {competition}
        </span>
      </div>

      <div style={styles.teams}>
        <div style={styles.team}>{homeTeam}</div>
        <div style={styles.score}>{score ? score : '-'}</div>
        <div style={styles.team}>{awayTeam}</div>
      </div>

      {score && (
        <div style={styles.buttons}>
          <button
            style={styles.button}
            onClick={() => onBet('home')}
            aria-label={`Parier sur ${homeTeam}`}
          >
            <p style={{fontSize: '10px'}}>{homeTeam}</p> 
            <br></br>
            {odds.home}
          </button>
          <button
            style={styles.button}
            onClick={() => onBet('draw')}
            aria-label="Parier sur Match Nul"
          >
            <p style={{fontSize: '10px'}}>Match nul</p> 
            <br></br>
            {odds.draw}
          </button>
          <button
            style={styles.button}
            onClick={() => onBet('away')}
            aria-label={`Parier sur ${awayTeam}`}
          >
            <p style={{fontSize: '10px'}}>{awayTeam}</p> 
            <br></br>
            {odds.away}
          </button>
        </div>
      )}

      <div style={styles.details}>
        <button
          style={styles.button}
          onClick={showDetails}
          type="button"
          aria-label="Voir les détails du match"
        >
          Voir détails du match
        </button>
      </div>
    </div>
  );
};

const styles = {
  card: {
    border: '1px solid #ddd',
    borderRadius: '8px',
    padding: '16px',
    margin: '10px 0',
    backgroundColor: '#6B8E23',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    fontFamily: 'Arial, sans-serif',
    transition: 'transform 0.2s, box-shadow 0.2s',
  },
  cardHover: {
    transform: 'scale(1.02)',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
  },
  header: {
    marginBottom: '8px',
    fontSize: '12px',
    color: '#fff',
    textAlign: 'center',
  },
  timeCompetition: {
    display: 'block',
  },
  teams: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: '16px',
    fontSize: '16px',
    fontWeight: 'bold',
    backgroundColor: '#fff',
    padding: '.5rem',
    borderRadius: '1rem',
  },
  team: {
    flex: 1,
    textAlign: 'center',
  },
  score: {
    flex: 1,
    textAlign: 'center',
    fontSize: '20px',
    fontWeight: 'bold',
  },
  buttons: {
    display: 'flex',
    justifyContent: 'space-around',
    marginTop: '10px',
  },
  button: {
    padding: '10px 20px',
    backgroundColor: '#228B22',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '14px',
    transition: 'background-color 0.3s, transform 0.2s',
  },
  buttonHover: {
    backgroundColor: '#0056b3',
    transform: 'scale(1.05)',
  },
  details: {
    textAlign: 'center',
    marginTop: '12px',
  },
  detailsButtonHover: {
    color: '#0056b3',
  },
};

export default MatchCard;
