// src/api.js
import axios from 'axios';

const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_ROOT,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor para añadir token de autenticación si es necesario
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem(process.env.NEXT_PUBLIC_AUTH_TOKEN_KEY);
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

// Ejemplo de llamada a la API para obtener productos
export const getProducts = async () => {
  try {
    const response = await apiClient.get('/products');
    return response.data;
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error;
  }
};

// Exporta otras funciones de API según sea necesario
