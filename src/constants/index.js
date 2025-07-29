export const API_CONFIG = {
  BASE_URL: 'https://api.chess.com/pub',
  TIMEOUT: 10000,
  DEFAULT_LIMIT: 20,
};

export const UI_CONFIG = {
  INFINITE_SCROLL_LIMIT: 20,
  ACTIVITY_TIMER_INTERVAL: 1000,
};

export const ROUTES = {
  HOME: '/',
  GRANDMASTER_PROFILE: '/gm/:username',
};

export const ERROR_MESSAGES = {
  FETCH_GRANDMASTERS: 'Failed to fetch grandmasters',
  FETCH_PLAYER_PROFILE: 'Failed to fetch player profile',
  NETWORK_ERROR: 'Network error occurred',
  UNKNOWN_ERROR: 'An unknown error occurred',
};
