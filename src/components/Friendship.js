import React, { useState, useEffect } from "react";
import axios from "axios";

const API_BASE_URL = "http://localhost:5000"; // Remplace avec l'URL de ton backend

function Friendship() {
  const [searchQuery, setSearchQuery] = useState("");
  const [players, setPlayers] = useState([]);
  const [friends, setFriends] = useState([]);
  const [pendingRequests, setPendingRequests] = useState([]);

  useEffect(() => {
    fetchFriends();
    fetchPendingRequests();
  }, []);

  // 🔍 Recherche de joueurs
  const searchPlayers = async () => {
    if (searchQuery.trim() === "") return;
    try {
      const response = await axios.get(`${API_BASE_URL}/search-friend?query=${searchQuery}`);
      setPlayers(response.data);
    } catch (error) {
      console.error("Erreur lors de la recherche :", error);
    }
  };

  // 📜 Récupérer la liste d'amis
  const fetchFriends = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/friends`, { withCredentials: true });
      setFriends(response.data);
    } catch (error) {
      console.error("Erreur lors de la récupération des amis :", error);
    }
  };

  // 📜 Récupérer les demandes d'amis en attente
  const fetchPendingRequests = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/friends/pending`, { withCredentials: true });
      setPendingRequests(response.data);
    } catch (error) {
      console.error("Erreur lors de la récupération des demandes d'amis :", error);
    }
  };

  // ➕ Envoyer une demande d’ami
  const sendFriendRequest = async (friendId) => {
    try {
      await axios.post(`${API_BASE_URL}/friends/request`, { friend_id: friendId }, { withCredentials: true });
      alert("Demande envoyée !");
    } catch (error) {
      console.error("Erreur lors de l'envoi de la demande :", error);
    }
  };

  // ✅ Accepter une demande d’ami
  const acceptFriendRequest = async (friendId) => {
    try {
      await axios.post(`${API_BASE_URL}/accept`, { friend_id: friendId }, { withCredentials: true });
      fetchFriends();
      fetchPendingRequests();
    } catch (error) {
      console.error("Erreur lors de l'acceptation :", error);
    }
  };

  // ❌ Refuser une demande d’ami
  const declineFriendRequest = async (friendId) => {
    try {
      await axios.post(`${API_BASE_URL}/decline`, { friend_id: friendId }, { withCredentials: true });
      fetchPendingRequests();
    } catch (error) {
      console.error("Erreur lors du refus :", error);
    }
  };

  return (
    <div className="friendship-container">
      {/* 🔍 Barre de recherche */}
      <div className="search-container">
        <input
          type="text"
          placeholder="Rechercher un joueur..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button onClick={searchPlayers}>🔍</button>
      </div>

      {/* 📜 Liste des amis */}
      <div className="card">
        <h3>Liste d'amis</h3>
        {friends.length === 0 ? (
          <p>Aucun ami trouvé.</p>
        ) : (
          <ul>
            {friends.map((friend) => (
              <li key={friend.id} className="friend-item">
                <span>{friend.username} - Score: {friend.score}</span>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* 📩 Demandes d'amis reçues */}
      <div className="card">
        <h3>Demandes d'amis reçues</h3>
        {pendingRequests.length === 0 ? (
          <p>Aucune demande en attente.</p>
        ) : (
          <ul>
            {pendingRequests.map((request) => (
              <li key={request.id} className="request-item">
                <span>{request.username}</span>
                <div>
                  <button className="accept" onClick={() => acceptFriendRequest(request.id)}>✔</button>
                  <button className="decline" onClick={() => declineFriendRequest(request.id)}>✖</button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* 🔍 Résultats de recherche */}
      {players.length > 0 && (
        <div className="card">
          <h3>Résultats de recherche</h3>
          <ul>
            {players.map((player) => (
              <li key={player.id} className="request-item">
                <span>{player.username}</span>
                <button className="add" onClick={() => sendFriendRequest(player.id)}>Ajouter</button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default Friendship;
