import axios from 'axios';
import { tokenStorage } from '../utils/tokenStorage';

// Dev:  /api  → Vite proxies to http://localhost:4000/api (no CORS)
// Prod: set VITE_API_BASE_URL=https://api.giftpose.com/api in your host env vars
const BASE_URL = import.meta.env.VITE_API_BASE_URL ?? '/api';

const httpClient = axios.create({
  baseURL: BASE_URL,
  timeout: 15000,
});

// Attach token to every request
httpClient.interceptors.request.use((config) => {
  const token = tokenStorage.getAccess();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  // Only set Content-Type on requests that have a body
  if (config.data) {
    config.headers['Content-Type'] = 'application/json';
  }
  return config;
});

// On 401 — clear session and redirect to login
httpClient.interceptors.response.use(
  (res) => res,
  (error) => {
    const isAuthRoute = error.config?.url?.includes('/auth/');
    if (error.response?.status === 401 && !isAuthRoute) {
      tokenStorage.clearTokens();
      window.location.replace('/login');
    }
    return Promise.reject(error);
  }
);

export default httpClient;

