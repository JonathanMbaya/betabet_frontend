const express = require('express');
const { placeBet, modifyBet, clearBets, getLiveMatches } = require('./betsController');
const router = express.Router();

// Route pour enregistrer les matches en direct
app.get('/live-matches', getLiveMatches);

// Route pour ajouter les paris d'un utilisateur
router.post('/bet', placeBet);

// Modification du pari d'un match
app.put('/bet', modifyBet);


// Route pour supprimer les paris d’un match
router.delete('/bets/:matchId', clearBets);

module.exports = router;
