import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5002/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add request interceptor for authentication
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Ingredients API
export const ingredientsAPI = {
  getAll: () => api.get('/ingredients'),
  getById: (id) => api.get(`/ingredients/${id}`),
  create: (ingredient) => api.post('/ingredients', ingredient),
  update: (id, ingredient) => api.put(`/ingredients/${id}`, ingredient),
  delete: (id) => api.delete(`/ingredients/${id}`),
};

// Plant-Based Burgers API
export const plantBasedBurgersAPI = {
  getAll: () => api.get('/burgers'),
  getById: (id) => api.get(`/burgers/${id}`),
  create: (burger) => api.post('/burgers', burger),
  update: (id, burger) => api.put(`/burgers/${id}`, burger),
  delete: (id) => api.delete(`/burgers/${id}`),
};

// Orders API
export const ordersAPI = {
  getAll: () => api.get('/orders'),
  getById: (id) => api.get(`/orders/${id}`),
  create: (order) => api.post('/orders', order),
  update: (id, order) => api.put(`/orders/${id}`, order),
  delete: (id) => api.delete(`/orders/${id}`),
};

// Auth API
export const authAPI = {
  login: (credentials) => api.post('/auth/login', credentials),
  register: (userData) => api.post('/auth/register', userData),
  logout: () => api.post('/auth/logout'),
  getProfile: () => api.get('/auth/profile'),
  updateProfile: (userData) => api.put('/auth/profile', userData),
};

export default api;