import api from './api';

export const getRoadmaps = async () => {
  const response = await api.get('/api/crud/');
  return response.data;
};

export const createRoadmap = async (name, description = null) => {
  const response = await api.post('/api/crud/', {
    name,
    description,
  });
  return response.data;
};

export const deleteRoadmap = async (id) => {
  const response = await api.delete(`/api/crud/${id}`);
  return response.data;
};
