import React from "react";
import { useParams } from "react-router-dom";
import styles from "./style.module.css";
import { usePlayerProfile } from "../../hooks/usePlayerProfile";
import { useActivityTimer } from "../../hooks/useActivityTimer";

function GrandmasterProfile() {
  const { username } = useParams();
  const { player, loading, error } = usePlayerProfile(username);
  const { formatDuration } = useActivityTimer(player?.last_online);

  if (loading) return <div className={styles.loading}>Loading player info...</div>;
  if (error) return <div className={styles.error}>Error: {error}</div>;
  if (!player) return null;

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Grandmaster Profile</h1>
      {player.avatar && (
        <img src={player.avatar} alt="avatar" className={styles.avatar} />
      )}
      <p className={styles.username}><b>Username:</b> {player.username}</p>
      {player.name && <p><b>Name:</b> {player.name}</p>}
      {player.country && (
        <p><b>Country:</b> {player.country.split('/').pop().toUpperCase()}</p>
      )}
      {player.joined && (
        <p><b>Joined:</b> {new Date(player.joined * 1000).toLocaleDateString()}</p>
      )}
      {player.status && <p><b>Status:</b> {player.status}</p>}
      {player.last_online && (
        <p><b>Last activity:</b> {formatDuration()} ago</p>
      )}
    </div>
  );
}

export default GrandmasterProfile; 