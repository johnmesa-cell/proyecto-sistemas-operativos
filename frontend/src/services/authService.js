import api from './api';

export const register = async (username, email, password) => {
  const response = await api.post('/api/auth/register', {
    username,
    email,
    password,
  });
  return response.data;
};

export const login = async (username, password) => {
  const response = await api.post('/api/auth/login', {
    username,
    password,
  });
  return response.data;
};

export const logout = async () => {
  const response = await api.post('/api/auth/logout');
  return response.data;
};

export const getCurrentUser = async () => {
  const response = await api.get('/api/auth/me');
  return response.data;
};
