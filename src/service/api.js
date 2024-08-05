// src/api/api.js

import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3001/api', // Asegúrate de que esta URL sea correcta
  headers: {
    'Content-Type': 'application/json',
  },
});

export const login = async (credentials) => {
  const response = await api.post('/auth/login', credentials);
  return response.data;
};

export const register = async (userData) => {
  const response = await api.post('/auth/register', userData);
  return response.data;
};

export const uploadPhoto = async (photoData, token) => {
  const response = await api.post('/photos/upload', photoData, {
    headers: {
      'Content-Type': 'multipart/form-data',
      'Authorization': `Bearer ${token}`,
    },
  });
  return response.data;
};

export const getAllPhotos = async (token) => {
  const response = await api.get('photos/', {
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });
  return response.data;
};

export const getPhotosByLocation = async (lat, lng, maxDistance, token) => {
  const response = await api.get(`/photos/location?lat=${lat}&lng=${lng}&maxDistance=${maxDistance}`, {
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });
  return response.data;
};
