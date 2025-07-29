import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styles from "./style.module.css";

function GrandmasterProfile() {
  const { username } = useParams();

  const [player, setPlayer] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [secondsSinceLastOnline, setSecondsSinceLastOnline] = useState(null);

  useEffect(() => {
    setLoading(true);
    setError(null);

    fetch(`https://api.chess.com/pub/player/${username}`)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch player info");
        return res.json();
      })
      .then((data) => {
        setPlayer(data);
        setLoading(false);
        if (data.last_online) {
          setSecondsSinceLastOnline(Math.floor(Date.now() / 1000) - data.last_online);
        }
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [username]);

  useEffect(() => {
    if (!player || !player.last_online) return;
    const interval = setInterval(() => {
      setSecondsSinceLastOnline(Math.floor(Date.now() / 1000) - player.last_online);
    }, 1000);
    return () => clearInterval(interval);
  }, [player]);

  function formatDuration(seconds) {
    if (seconds == null) return "-";
    const d = Math.floor(seconds / (3600 * 24));
    const h = Math.floor((seconds % (3600 * 24)) / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
    return [
      d > 0 ? `${d}d` : null,
      h > 0 ? `${h}h` : null,
      m > 0 ? `${m}m` : null,
      `${s}s`
    ].filter(Boolean).join(" ");
  }

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
        <p><b>Last activity:</b> {formatDuration(secondsSinceLastOnline)} ago</p>
      )}
    </div>
  );
}

export default GrandmasterProfile; 