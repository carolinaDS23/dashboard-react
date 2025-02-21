// src/service/axiosConfigs.js
import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://tu-api-endpoint.com/api', // Reemplaza con la URL de tu API
  headers: {
    'Content-Type': 'application/json',
  },
});

export default axiosInstance;
