import axios from 'axios';
import { API_CONFIG, ERROR_MESSAGES } from '../constants';

const api = axios.create({
  baseURL: API_CONFIG.BASE_URL,
  timeout: API_CONFIG.TIMEOUT,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const fetchGrandmasters = async (offset = 0, limit = API_CONFIG.DEFAULT_LIMIT) => {
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
    console.error('Error fetching grandmasters:', error);
    
    if (error.response) {
      throw new Error(`${ERROR_MESSAGES.FETCH_GRANDMASTERS}: ${error.response.status}`);
    } else if (error.request) {
      throw new Error(ERROR_MESSAGES.NETWORK_ERROR);
    } else {
      throw new Error(ERROR_MESSAGES.FETCH_GRANDMASTERS);
    }
  }
};

export const fetchPlayerProfile = async (username) => {
  if (!username) {
    throw new Error('Username is required');
  }

  try {
    const response = await api.get(`/player/${username}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching player profile:', error);
    
    if (error.response) {
      if (error.response.status === 404) {
        throw new Error(`Player "${username}" not found`);
      }
      throw new Error(`${ERROR_MESSAGES.FETCH_PLAYER_PROFILE}: ${error.response.status}`);
    } else if (error.request) {
      throw new Error(ERROR_MESSAGES.NETWORK_ERROR);
    } else {
      throw new Error(ERROR_MESSAGES.FETCH_PLAYER_PROFILE);
    }
  }
};

export default api; 