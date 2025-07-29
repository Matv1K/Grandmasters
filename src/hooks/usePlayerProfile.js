import { useState, useEffect } from 'react';
import { fetchPlayerProfile } from '../utils/api';

export const usePlayerProfile = (username) => {
  const [player, setPlayer] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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

  return { player, loading, error };
}; 