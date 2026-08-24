import axios from 'axios';

// Base Axios instance pointing to Django backend
const API = axios.create({
  baseURL: 'http://127.0.0.1:8000/api',
});

// Attach JWT access token to every request automatically
API.interceptors.request.use((config) => {
  const token = localStorage.getItem('access_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// ── Auth API calls ──────────────────────────────────────────────

/** Register a new user */
export const registerUser = (data) => API.post('/register/', data);

/** Login — obtain JWT tokens */
export const loginUser = (data) => API.post('/login/', data);

/** Logout - blacklist the refresh token */
export const logoutUser = (refresh) => API.post('/logout/', { refresh });

/** Get dashboard / user profile */
export const getDashboard = () => API.get('/dashboard/');

/** Refresh the access token */
export const refreshToken = (refresh) =>
  API.post('/token/refresh/', { refresh });

export default API;
