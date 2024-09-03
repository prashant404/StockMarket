import axios from 'axios';

const API_URL = 'http://localhost:5000/api';
const API_URI = 'http://localhost:5000/api/watchlist';

const getToken = () => {
  const token = localStorage.getItem('token');
  if (!token) {
    throw new Error('No authentication token found.');
  }
  return token;
};

export const addToWatchlist = async (stockId) => {
  try {
    const token = getToken();
    const response = await axios.post(
      API_URI, // Updated URL
      { stockId },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        withCredentials: true,
      }
    );
    return response.data;
  } catch (error) {
    console.error('Error adding to watchlist:', error.response ? error.response.data : error.message);
    throw new Error(error.response ? error.response.data.message : error.message);
  }
};

export const fetchWatchlist = async () => {
  try {
    const token = getToken();
    const response = await axios.get(`${API_URL}/watchlist`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      withCredentials: true,
    });
    console.log("Watchlist fetched successfully:", response.data); 
    return response.data;
  } catch (error) {
    console.error('Error fetching watchlist:', error.response ? error.response.data : error.message);
    throw new Error(error.response ? error.response.data.message : error.message);
  }
};

export const fetchStockData = async (symbol) => {
  try {
    const response = await axios.get(`${API_URL}/stocks/search/${symbol}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching stock data:', error);
    throw error;
  }
};

export const fetchPortfolio = async () => {
  try {
    const token = getToken();
    const response = await axios.get(`${API_URL}/portfolio`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching portfolio:', error.response ? error.response.data : error.message);
    throw error;
  }
};
export const removeFromPortfolio = async (stockId) => {
  try {
    const response = await fetch(`/api/portfolio/${stockId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
      },
    });
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || 'Failed to remove stock from portfolio');
    }
    return data;
  } catch (error) {
    console.error('Error removing stock from portfolio:', error);
    throw error;
  }
};

export const removeFromWatchlist = async (stockId) => {
  try {
    const token = getToken();
    await axios.delete(`${API_URL}/watchlist/${stockId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      withCredentials: true,
    });
  } catch (error) {
    console.error('Error removing from watchlist:', error.response ? error.response.data : error.message);
    throw error;
  }
};

export const executeTrade = async (symbol, quantity, action) => {
  try {
    const token = getToken();
    await axios.post(
      `${API_URL}/trade`,
      { symbol, quantity, action },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        withCredentials: true,
      }
    );
  } catch (error) {
    console.error('Error executing trade:', error.response ? error.response.data : error.message);
    throw error;
  }
};

export const fetchUserDetails = async () => {
  try {
    const token = getToken();
    const response = await axios.get(`${API_URL}/users/me`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching user details:', error.response ? error.response.data : error.message);
    throw new Error(error.response ? error.response.data.message : error.message);
  }
};
