const client = require('./redisClient');

// Récupérer les matchs en live
const getLiveMatches = (req, res) => {
  const key = 'live_matches'; // Nom de la clé pour les matchs en direct dans Redis
  
  client.get(key, (err, matches) => {
    if (err) {
      return res.status(500).json({ error: 'Failed to fetch live matches' });
    }
    
    // Si des matchs en direct existent, nous les renvoyons après les avoir convertis en JSON
    if (matches) {
      const liveMatches = JSON.parse(matches);
      return res.status(200).json(liveMatches);
    }
    
    // Aucun match en direct n'est trouvé
    res.status(404).json({ message: 'Aucun match en direct trouvé' });
  });
};

module.exports = { getLiveMatches };

const client = require('./redisClient'); // Redis client

// Enregistrer un pari pour un utilisateur sur un match donné
const placeBet = (req, res) => {
  const { userId, matchId, team, odds } = req.body;

  const key = `bets:${userId}:${matchId}`;

  // Créer l'objet de pari
  const bet = {
    team,
    odds,
    status: 'pending', // Le pari est en attente tant que le match n'est pas terminé
    timestamp: Date.now()
  };

  // Sauvegarder le pari dans Redis
  client.set(key, JSON.stringify(bet), (err, reply) => {
    if (err) {
      return res.status(500).json({ error: 'Erreur lors de l\'enregistrement du pari.' });
    }
    res.status(200).json({ message: 'Pari enregistré avec succès.' });
  });
};

module.exports = { placeBet };


const modifyBet = (req, res) => {
  const { userId, matchId, newTeam, newOdds } = req.body;

  const key = `bets:${userId}:${matchId}`;

  // Vérifier si le pari existe
  client.get(key, (err, betData) => {
    if (err || !betData) {
      return res.status(404).json({ error: 'Pari introuvable.' });
    }

    const bet = JSON.parse(betData);

    // Vérifier l'heure du match
    const matchStartTime = 1700; // Exemple d'heure de départ du match (en minutes)
    const currentTime = Date.now();
    const timeElapsed = (currentTime - bet.timestamp) / (1000 * 60); // Temps écoulé en minutes

    if (timeElapsed >= 100) { // Si plus d'1h40 (100 minutes) se sont écoulées, on ne peut pas modifier
      return res.status(400).json({ error: 'Impossible de modifier le pari, le match a déjà commencé.' });
    }

    // Mettre à jour le pari
    bet.team = newTeam;
    bet.odds = newOdds;

    // Sauvegarder la mise à jour dans Redis
    client.set(key, JSON.stringify(bet), (err, reply) => {
      if (err) {
        return res.status(500).json({ error: 'Erreur lors de la mise à jour du pari.' });
      }
      res.status(200).json({ message: 'Pari modifié avec succès.' });
    });
  });
};

module.exports = { modifyBet };


const calculateBetResult = (matchId) => {
  const key = `live_matches`; // Nous récupérons les matchs en direct de Redis
  client.get(key, (err, liveMatchesData) => {
    if (err || !liveMatchesData) {
      console.error('Erreur lors de la récupération des matchs en direct');
      return;
    }

    const liveMatches = JSON.parse(liveMatchesData);
    const match = liveMatches.find((m) => m.match_id === matchId);

    if (!match) {
      console.error('Match introuvable');
      return;
    }

    // Vérifier si le match est terminé
    if (match.status === 'finished' || match.time >= 100) { // Si match terminé ou 1h40 écoulée
      const { home_team_score, away_team_score } = match;
      const result = home_team_score > away_team_score ? 'home' : home_team_score < away_team_score ? 'away' : 'draw';

      // Vérifier les paris des utilisateurs
      client.keys(`bets:*:${matchId}`, (err, keys) => {
        if (err || keys.length === 0) return;

        keys.forEach((key) => {
          client.get(key, (err, betData) => {
            if (err || !betData) return;

            const bet = JSON.parse(betData);

            // Si l'équipe pariée est la même que celle qui a gagné, on marque le pari comme gagné
            if (
              (result === 'home' && bet.team === match.event_home_team) ||
              (result === 'away' && bet.team === match.event_away_team) ||
              (result === 'draw' && bet.team === 'draw')
            ) {
              bet.status = 'won';
              bet.result = result; // Attribuer le résultat

              // Enregistrer le pari mis à jour avec le statut "gagnant"
              client.set(key, JSON.stringify(bet));
            } else {
              bet.status = 'lost';
              client.set(key, JSON.stringify(bet));
            }
          });
        });
      });
    }
  });
};

  
// Supprimer les paris d’un match
const clearBets = (req, res) => {
  const { matchId } = req.params;
  const key = `match:${matchId}:bets`;

  client.del(key, (err, reply) => {
    if (err) {
      return res.status(500).json({ error: 'Failed to clear bets' });
    }
    res.status(200).json({ message: 'Bets cleared successfully', reply });
  });
};

module.exports = { calculateBetResult, clearBets };

  
