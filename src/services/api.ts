// src/services/api.ts
import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5001/api';

const api = axios.create({
  baseURL: API_BASE_URL,
});

// Interceptor para agregar token a las requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Interceptor para manejar errores de autenticación
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export const authAPI = {
  login: (credentials: { email: string; password: string }) =>
    api.post('/auth/login', credentials),
  register: (userData: { name: string; email: string; password: string }) =>
    api.post('/auth/register', userData),
};

// Agrega estos métodos a tu archivo api.ts
export const productsAPI = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  getAll: (params: any) => api.get('/products', { params }),
  getCategories: () => api.get('/products/categories'),
};

export const cartAPI = {
  get: () => api.get('/cart'),
  addItem: (item: { productId: string; quantity: number }) => api.post('/cart', item),
  removeItem: (productId: string) => api.delete(`/cart/${productId}`),
  updateItem: (productId: string, quantity: number) => api.put(`/cart/${productId}`, { quantity }),
};

export default api;
