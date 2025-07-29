import React, { useEffect, useState } from "react";
import styles from "./style.module.css";

function GrandmasterList() {
  const [gms, setGms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("https://api.chess.com/pub/titled/GM")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch GMs");
        return res.json();
      })
      .then((data) => {
        setGms(data.players || []);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <div className={styles.loading}>Loading grandmasters...</div>;
  if (error) return <div className={styles.error}>Error: {error}</div>;

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Chess Grandmasters</h1>
      <ul className={styles.list}>
        {gms.map((gm) => (
          <li key={gm} className={styles.item}>{gm}</li>
        ))}
      </ul>
    </div>
  );
}

export default GrandmasterList; 