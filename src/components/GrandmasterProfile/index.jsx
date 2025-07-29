import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import styles from "./style.module.css";
import { fetchPlayerProfile } from "../../utils/api";
import { useActivityTimer } from "../../hooks/useActivityTimer";
import Button from "../Button";

function GrandmasterProfile() {
  const { username } = useParams();
  const navigate = useNavigate();
  const [player, setPlayer] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { formatDuration } = useActivityTimer(player?.last_online);

  useEffect(() => {
    const loadPlayerProfile = async () => {
      if (!username) return;
      
      try {
        setLoading(true);
        setError(null);
        const data = await fetchPlayerProfile(username);
        setPlayer(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadPlayerProfile();
  }, [username]);

  if (loading) return <div className={styles.loading}>Loading player info...</div>;
  if (error) return <div className={styles.error}>Error: {error}</div>;
  if (!player) return null;

  return (
    <div className={styles.container}>
      <Button 
        onClick={() => navigate('/')}
        className={styles.backButton}
      >
        ← Back to Grandmasters
      </Button>
      <h1 className={styles.title}>Grandmaster Profile</h1>
      <div className={styles.profileCard}>
        {player.avatar && (
          <img src={player.avatar} alt="avatar" className={styles.avatar} />
        )}
        <div className={styles.username}>{player.username}</div>
        <div className={styles.infoGrid}>
          <div className={styles.infoItem}>
            <b>Name</b>
            <p>{player.name}</p>
          </div>
          <div className={styles.infoItem}>
            <b>Country</b>
            <p>{player.country.split('/').pop().toUpperCase()}</p>
          </div>
          <div className={styles.infoItem}>
            <b>Joined</b>
            <p>{new Date(player.joined * 1000).toLocaleDateString()}</p>
          </div>
          <div className={styles.infoItem}>
            <b>Status</b>
            <p>{player.status}</p>
          </div>
          <div className={styles.infoItem}>
            <b>Last Activity</b>
            <p>{formatDuration()} ago</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default GrandmasterProfile; 