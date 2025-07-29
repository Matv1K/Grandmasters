import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import styles from "./style.module.css";
import { useGrandmasterProfile } from "../../hooks/useGrandmasterProfile";
import { useActivityTimer } from "../../hooks/useActivityTimer";
import Button from "../Button";

function GrandmasterProfile() {
  const { username } = useParams();
  const navigate = useNavigate();
  
  const {
    data: player,
    isLoading,
    isError,
    error
  } = useGrandmasterProfile(username);
  
  const { formatDuration } = useActivityTimer(player?.last_online);

  const handleBackClick = () => {
    navigate('/');
  };

  if (isLoading) {
    return (
      <div className={styles.loading}>
        Loading player info...
      </div>
    );
  }

  if (isError) {
    return (
      <div className={styles.error}>
        Error: {error?.message || 'Failed to load player profile'}
      </div>
    );
  }

  if (!player) {
    return (
      <div className={styles.error}>
        Player not found
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <Button 
        onClick={handleBackClick}
        className={styles.backButton}
        aria-label="Back to grandmasters list"
      >
        ← Back to Grandmasters
      </Button>
      
      <h1 className={styles.title}>Grandmaster Profile</h1>
      
      <div className={styles.profileCard}>
        {player.avatar && (
          <img 
            src={player.avatar} 
            alt={`${player.username}'s avatar`} 
            className={styles.avatar} 
          />
        )}
        
        <div className={styles.username}>{player.username}</div>
        
        <div className={styles.infoGrid}>
          <div className={styles.infoItem}>
            <b>Name</b>
            <p>{player.name || '-'}</p>
          </div>
          
          <div className={styles.infoItem}>
            <b>Country</b>
            <p>{player.country}</p>
          </div>
          
          <div className={styles.infoItem}>
            <b>Joined</b>
            <p>{player.joined}</p>
          </div>
          
          <div className={styles.infoItem}>
            <b>Status</b>
            <p>{player.status || '-'}</p>
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