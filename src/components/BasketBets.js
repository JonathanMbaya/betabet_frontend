import React, { useEffect, useState } from 'react';
import axios from 'axios';

function BasketBets() {
    const [bets, setBets] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Cette fonction récupère les paris de l'utilisateur depuis le backend
    const fetchUserBets = async () => {
        try {
            const response = await axios.get('/api/bets'); // Remplacez par l'URL de votre API
            setBets(response.data); // Les paris retournés par le backend
            setLoading(false);
        } catch (err) {
            setError('Erreur lors de la récupération des paris.');
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUserBets();
    }, []);

    if (loading) {
        return <p>Chargement des paris...</p>;
    }

    if (error) {
        return <p>{error}</p>;
    }

    return (
        <div style={styles.container}>
            <h2 style={styles.title}>Mon Panier de Paris</h2>
            {bets.length > 0 ? (
                <ul style={styles.betList}>
                    {bets.map((bet, index) => (
                        <li key={index} style={styles.betItem}>
                            <div style={styles.betInfo}>
                                <p><strong>Équipe Pariée :</strong> {bet.team}</p>
                                <p><strong>Cote :</strong> {bet.odds}</p>
                                <p><strong>Match :</strong> {bet.matchId}</p>
                                <p><strong>Statut :</strong> {bet.status}</p>
                                <p><strong>Score Final :</strong> {bet.score || 'En attente'}</p>
                            </div>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>Aucun pari enregistré.</p>
            )}
        </div>
    );
}

const styles = {
    container: {
        padding: '20px',
        backgroundColor: '#f5f5f5',
        borderRadius: '8px',
        maxWidth: '900px',
        margin: '0 auto',
    },
    title: {
        fontSize: '24px',
        textAlign: 'center',
        marginBottom: '20px',
        fontWeight: 'bold',
    },
    betList: {
        listStyleType: 'none',
        padding: 0,
    },
    betItem: {
        backgroundColor: '#fff',
        padding: '15px',
        marginBottom: '10px',
        borderRadius: '8px',
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    },
    betInfo: {
        fontSize: '16px',
        color: '#333',
    },
};

export default BasketBets;
