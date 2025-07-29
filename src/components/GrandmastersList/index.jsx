import React from "react";
import styles from "./style.module.css";
import { useNavigate } from "react-router-dom";
import { useGrandmasters } from "../../hooks/useGrandmasters";

function GrandmastersList() {
  const { gms, loading, error } = useGrandmasters();
  const navigate = useNavigate();

  if (loading) return <div className={styles.loading}>Loading grandmasters...</div>;
  if (error) return <div className={styles.error}>Error: {error}</div>;

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Chess Grandmasters</h1>
      <ul className={styles.list}>
        {gms.map((gm) => (
          <li
            key={gm}
            className={styles.item}
            style={{ cursor: 'pointer', color: '#0074cc' }}
            onClick={() => navigate(`/gm/${gm}`)}
          >
            {gm}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default GrandmastersList; 