import axios from 'axios';

const api = axios.create({
  baseURL: 'https://api.chess.com/pub',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const fetchGrandmasters = async () => {
  try {
    const response = await api.get('/titled/GM');
    return response.data.players || [];
  } catch (error) {
    throw new Error('Failed to fetch grandmasters');
  }
};

export const fetchPlayerProfile = async (username) => {
  try {
    const response = await api.get(`/player/${username}`);
    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch player profile');
  }
};

export default api; 