
import axios, { type AxiosError, type InternalAxiosRequestConfig } from 'axios';
import { tokenStorage } from '../utils/tokenStorage';
import { unwrapData } from './unwrap';

const BASE_URL =
  import.meta.env.VITE_API_BASE_URL ??
  import.meta.env.VITE_API_URL ??
  '/api';

const AUTH_SKIP_REFRESH = [
  '/admin/auth/login',
  '/admin/auth/verify-otp',
  '/admin/auth/resend-otp',
  '/admin/auth/refresh',
];

type RetryConfig = InternalAxiosRequestConfig & { _retry?: boolean };

const httpClient = axios.create({
  baseURL: BASE_URL,
  timeout: 15000,
});

/** Separate instance so refresh is never caught by the 401 interceptor. */
const refreshClient = axios.create({
  baseURL: BASE_URL,
  timeout: 15000,
});

function shouldSkipRefresh(url = ''): boolean {
  return AUTH_SKIP_REFRESH.some((path) => url.includes(path));
}

function pickTokens(data: unknown): { accessToken: string; refreshToken?: string } {
  const root = data && typeof data === 'object' ? (data as Record<string, unknown>) : {};
  const accessToken =
    (typeof root.accessToken === 'string' && root.accessToken) ||
    (typeof root.access_token === 'string' && root.access_token) ||
    (typeof root.token === 'string' && root.token) ||
    '';
  const refreshToken =
    (typeof root.refreshToken === 'string' && root.refreshToken) ||
    (typeof root.refresh_token === 'string' && root.refresh_token) ||
    undefined;
  return { accessToken, refreshToken };
}

let refreshing = false;
let refreshQueue: Array<{
  resolve: (token: string) => void;
  reject: (err: unknown) => void;
}> = [];

function flushRefreshQueue(error: unknown, token: string | null) {
  refreshQueue.forEach(({ resolve, reject }) => {
    if (error || !token) reject(error);
    else resolve(token);
  });
  refreshQueue = [];
}

async function refreshAccessToken(): Promise<string> {
  const refreshToken = tokenStorage.getRefresh();
  if (!refreshToken) throw new Error('No refresh token');

  const res = await refreshClient.post('/admin/auth/refresh', { refreshToken });
  const { accessToken, refreshToken: nextRefresh } = pickTokens(unwrapData(res.data));
  if (!accessToken) throw new Error('Refresh response missing access token');

  tokenStorage.setTokens(accessToken, nextRefresh ?? refreshToken);
  return accessToken;
}

function redirectToLogin() {
  const path = window.location.pathname;
  if (path.startsWith('/login') || path.startsWith('/verify-otp')) return;
  window.location.replace('/login');
}

// Attach token to every request
httpClient.interceptors.request.use((config) => {
  const token = tokenStorage.getAccess();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  if (config.data) {
    config.headers['Content-Type'] = 'application/json';
  }
  return config;
});

httpClient.interceptors.response.use(
  (res) => res,
  async (error: AxiosError) => {
    const original = error.config as RetryConfig | undefined;
    const status = error.response?.status;
    const url = original?.url ?? '';

    if (status !== 401 || !original || shouldSkipRefresh(url)) {
      return Promise.reject(error);
    }

    if (original._retry) {
      tokenStorage.clearTokens();
      redirectToLogin();
      return Promise.reject(error);
    }

    if (refreshing) {
      return new Promise((resolve, reject) => {
        refreshQueue.push({
          resolve: (token) => {
            original._retry = true;
            original.headers.Authorization = `Bearer ${token}`;
            resolve(httpClient(original));
          },
          reject,
        });
      });
    }

    original._retry = true;
    refreshing = true;

    try {
      const token = await refreshAccessToken();
      flushRefreshQueue(null, token);
      original.headers.Authorization = `Bearer ${token}`;
      return httpClient(original);
    } catch (refreshError) {
      flushRefreshQueue(refreshError, null);
      tokenStorage.clearTokens();
      redirectToLogin();
      return Promise.reject(refreshError);
    } finally {
      refreshing = false;
    }
  }
);

export default httpClient;
