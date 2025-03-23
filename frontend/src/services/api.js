import axios from 'axios';

const API_URL = 'http://localhost:30011/api';

// Create axios instance with default config
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests if it exists
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Auth Services
export const authService = {
  register: async (userData) => {
    const response = await api.post('/auth/register', userData);
    if (response.data.token) {
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('currentUser', JSON.stringify(response.data.user));
    }
    return response.data;
  },

  login: async (credentials) => {
    const response = await api.post('/auth/login', credentials);
    if (response.data.token) {
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('currentUser', JSON.stringify(response.data.user));
    }
    return response.data;
  },

  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('currentUser');
  },

  getCurrentUser: () => {
    return JSON.parse(localStorage.getItem('currentUser'));
  },
};

// Bet Services
export const betService = {
  placeBet: async (betData) => {
    const response = await api.post('/bets', betData);
    return response.data;
  },

  getBets: async () => {
    const response = await api.get('/bets');
    return response.data;
  },

  cashOut: async (betId) => {
    const response = await api.post(`/bets/${betId}/cashout`);
    return response.data;
  },
};

// Leaderboard Services
export const leaderboardService = {
  getLeaderboard: async () => {
    const response = await api.get('/leaderboard');
    return response.data;
  },
};

// Portfolio Services
export const portfolioService = {
  getPortfolio: async () => {
    try {
      const response = await api.get('/portfolio');
      return response.data;
    } catch (error) {
      if (error.code === 'ECONNREFUSED') {
        throw new Error('Could not connect to server. Please check if the server is running.');
      }
      throw error.response?.data?.message || 'Failed to fetch portfolio data';
    }
  },

  updatePortfolio: async (portfolioData) => {
    try {
      const response = await api.put('/portfolio', portfolioData);
      return response.data;
    } catch (error) {
      if (error.code === 'ECONNREFUSED') {
        throw new Error('Could not connect to server. Please check if the server is running.');
      }
      throw error.response?.data?.message || 'Failed to update portfolio';
    }
  },
};

export default api; 