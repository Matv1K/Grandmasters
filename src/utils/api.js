import axios from 'axios';

const api = axios.create({
  baseURL: 'https://api.chess.com/pub',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const fetchGrandmasters = async (offset = 0, limit = 20) => {
  try {
    const response = await api.get('/titled/GM');
    const allPlayers = response.data.players || [];
    
    const startIndex = offset;
    const endIndex = offset + limit;
    const paginatedPlayers = allPlayers.slice(startIndex, endIndex);
    
    return {
      players: paginatedPlayers,
      hasMore: endIndex < allPlayers.length,
      total: allPlayers.length
    };
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