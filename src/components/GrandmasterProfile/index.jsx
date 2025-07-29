import React from "react";
import { useParams } from "react-router-dom";
import styles from "./style.module.css";

function GrandmasterProfile() {
  const { username } = useParams();
  
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Grandmaster Profile</h1>
      <p className={styles.username}>Username: {username}</p>
    </div>
  );
}

export default GrandmasterProfile; 