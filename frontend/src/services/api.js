import axios from 'axios';

const API_URL = 'http://localhost:3001/api';

export const login = async (email, password) => {
  const response = await axios.post(`${API_URL}/auth/signin`, { email, password });
  localStorage.setItem('token', response.data.accessToken);
  return response.data;
};

export const getProfile = async () => {
  const response = await axios.get(`${API_URL}/auth/profile`, {
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    }
  });
  return response.data;
};

export const logout = () => {
  localStorage.removeItem('token');
};

export const getUsers = async () => {
  const response = await axios.get(`${API_URL}/users`, {
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    }
  });
  return response.data;
};
