// src/api/api.js

import axios from 'axios';

const api = axios.create({
  baseURL: 'https://api-gallery-1.onrender.com', // Asegúrate de que esta URL sea correcta
  headers: {
    'Content-Type': 'application/json',
  },
});

export const login = async (credentials) => {
  const response = await api.post('/api/auth/login', credentials);
  return response.data;
};

export const register = async (userData) => {
  const response = await api.post('/api/auth/register', userData);
  return response.data;
};

export const uploadPhoto = async (photoData, token) => {
  const response = await api.post('/api/photos/upload/', photoData, {
    headers: {
      'Content-Type': 'multipart/form-data',
      'Authorization': `Bearer ${token}`,
    },
  });
  return response.data;
};

export const getAllPhotos = async (token) => {
  const response = await api.get('/api/photos', {
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });
  return response.data;
};

export const getPhotosByLocation = async (lat, lng, maxDistance, token) => {
  const response = await api.get(`/api/photos/location?lat=${lat}&lng=${lng}&maxDistance=${maxDistance}`, {
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });
  return response.data;
};
