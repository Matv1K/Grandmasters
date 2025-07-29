import { useState, useEffect } from 'react';
import { fetchGrandmasters } from '../utils/api';

export const useGrandmasters = () => {
  const [gms, setGms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadGrandmasters = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await fetchGrandmasters();
        setGms(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadGrandmasters();
  }, []);

  return { gms, loading, error };
}; 