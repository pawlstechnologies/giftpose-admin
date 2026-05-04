// /**
//  * httpClient.ts
//  * ─────────────────────────────────────────────────────────────────
//  * Configured axios instance used by every API module.
//  *
//  * Request interceptor  → attaches Bearer token to every outgoing request.
//  * Response interceptor → on 401, attempts a silent token refresh once,
//  *                        then replays the original request.
//  *                        If refresh fails → clears tokens and redirects to /login.
//  */

// // import axios, { AxiosRequestConfig, InternalAxiosRequestConfig } from 'axios';
// import axios from 'axios';
// import type { AxiosRequestConfig, InternalAxiosRequestConfig } from 'axios';
// import { tokenStorage } from '../utils/tokenStorage';

// const BASE_URL = import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:4000/api';

// export const httpClient = axios.create({
//   baseURL: BASE_URL,
//   timeout: 15_000,
//   headers: { 'Content-Type': 'application/json' },
// });

// /* ── Request: attach access token ─────────────────────────────── */
// httpClient.interceptors.request.use(
//   (config: InternalAxiosRequestConfig) => {
//     const token = tokenStorage.getAccess();
//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`;
//     }
//     return config;
//   },
//   (error) => Promise.reject(error),
// );

// /* ── Response: silent refresh on 401 ─────────────────────────── */
// let isRefreshing  = false;
// let failedQueue:  { resolve: (v: unknown) => void; reject: (e: unknown) => void }[] = [];

// const processQueue = (error: unknown, token: string | null) => {
//   failedQueue.forEach((p) => (error ? p.reject(error) : p.resolve(token)));
//   failedQueue = [];
// };

// httpClient.interceptors.response.use(
//   (response) => response,
//   async (error) => {
//     const original = error.config as AxiosRequestConfig & { _retry?: boolean };

//     // Only handle 401 and avoid infinite loops on the refresh endpoint itself
//     if (error.response?.status === 401 && !original._retry && !original.url?.includes('/auth/refresh')) {
//       if (isRefreshing) {
//         // Queue subsequent requests while refresh is in flight
//         return new Promise((resolve, reject) => {
//           failedQueue.push({ resolve, reject });
//         }).then((token) => {
//           original.headers = { ...(original.headers ?? {}), Authorization: `Bearer ${token}` };
//           return httpClient(original);
//         });
//       }

//       original._retry  = true;
//       isRefreshing     = true;

//       const refreshToken = tokenStorage.getRefresh();

//       if (!refreshToken) {
//         isRefreshing = false;
//         tokenStorage.clearTokens();
//         window.location.replace('/login');
//         return Promise.reject(error);
//       }

//       try {
//         const { data } = await axios.post(`${BASE_URL}/admin/auth/refresh`, { refreshToken });
//         tokenStorage.setTokens(data.accessToken, data.refreshToken ?? refreshToken);
//         processQueue(null, data.accessToken);
//         original.headers = { ...(original.headers ?? {}), Authorization: `Bearer ${data.accessToken}` };
//         return httpClient(original);
//       } catch (refreshError) {
//         processQueue(refreshError, null);
//         tokenStorage.clearTokens();
//         window.location.replace('/login');
//         return Promise.reject(refreshError);
//       } finally {
//         isRefreshing = false;
//       }
//     }

//     return Promise.reject(error);
//   },
// );

// export default httpClient;


/**
 * httpClient.ts
 * ─────────────────────────────────────────────────────────────────
 * Configured axios instance used by every API module.
 *
 * Request interceptor  → attaches Bearer token to every outgoing request.
 * Response interceptor → on 401, attempts a silent token refresh once,
 *                        then replays the original request.
 *                        If refresh fails → clears tokens and redirects to /login.
 */

// import axios from 'axios';
// import type { AxiosRequestConfig, InternalAxiosRequestConfig } from 'axios';
// import { tokenStorage } from '../utils/tokenStorage';

// const BASE_URL = import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:4000/api';

// export const httpClient = axios.create({
//   baseURL: BASE_URL,
//   timeout: 15_000,
//   headers: { 'Content-Type': 'application/json' },
// });

// /* ── Request: attach access token ─────────────────────────────── */
// httpClient.interceptors.request.use(
//   (config: InternalAxiosRequestConfig) => {
//     const token = tokenStorage.getAccess();
//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`;
//     }
//     return config;
//   },
//   (error) => Promise.reject(error),
// );

// /* ── Response: silent refresh on 401 ─────────────────────────── */
// let isRefreshing  = false;
// let failedQueue:  { resolve: (v: unknown) => void; reject: (e: unknown) => void }[] = [];

// const processQueue = (error: unknown, token: string | null) => {
//   failedQueue.forEach((p) => (error ? p.reject(error) : p.resolve(token)));
//   failedQueue = [];
// };

// /** Auth endpoints that should NEVER trigger the refresh interceptor */
// const AUTH_PATHS = ['/auth/login', '/auth/verify-otp', '/auth/resend-otp', '/auth/refresh'];

// httpClient.interceptors.response.use(
//   (response) => response,
//   async (error) => {
//     const original = error.config as AxiosRequestConfig & { _retry?: boolean };
//     const url      = original.url ?? '';

//     // Skip the interceptor entirely for auth endpoints — let errors bubble as-is
//     const isAuthEndpoint = AUTH_PATHS.some((p) => url.includes(p));
//     if (isAuthEndpoint) return Promise.reject(error);

//     // Only attempt refresh on 401 from protected endpoints
//     if (error.response?.status === 401 && !original._retry) {
//       if (isRefreshing) {
//         return new Promise((resolve, reject) => {
//           failedQueue.push({ resolve, reject });
//         }).then((token) => {
//           original.headers = { ...(original.headers ?? {}), Authorization: `Bearer ${token}` };
//           return httpClient(original);
//         });
//       }

//       original._retry  = true;
//       isRefreshing     = true;

//       const refreshToken = tokenStorage.getRefresh();

//       if (!refreshToken) {
//         isRefreshing = false;
//         tokenStorage.clearTokens();
//         window.location.replace('/login');
//         return Promise.reject(error);
//       }

//       try {
//         const { data } = await axios.post(`${BASE_URL}/admin/auth/refresh`, { refreshToken });
//         tokenStorage.setTokens(data.accessToken, data.refreshToken ?? refreshToken);
//         processQueue(null, data.accessToken);
//         original.headers = { ...(original.headers ?? {}), Authorization: `Bearer ${data.accessToken}` };
//         return httpClient(original);
//       } catch (refreshError) {
//         processQueue(refreshError, null);
//         tokenStorage.clearTokens();
//         window.location.replace('/login');
//         return Promise.reject(refreshError);
//       } finally {
//         isRefreshing = false;
//       }
//     }

//     return Promise.reject(error);
//   },
// );

// export default httpClient;


/**
 * httpClient.ts
 * ─────────────────────────────────────────────────────────────────
 * Configured axios instance used by every API module.
 *
 * Request interceptor  → attaches Bearer token to every outgoing request.
 * Response interceptor → on 401, attempts a silent token refresh once,
 *                        then replays the original request.
 *                        If refresh fails → clears tokens and redirects to /login.
 */

// import axios, { AxiosRequestConfig, InternalAxiosRequestConfig } from 'axios';

// import axios from 'axios';
// import type { AxiosRequestConfig, InternalAxiosRequestConfig } from 'axios';
// import { tokenStorage } from '../utils/tokenStorage';

// const BASE_URL     = import.meta.env.VITE_API_BASE_URL     ?? 'http://localhost:4000/api';
// const PLATFORM_URL = import.meta.env.VITE_PLATFORM_API_URL ?? 'https://api.giftpose.com/api';

// /* ── Shared request interceptor factory ──────────────────────────── */
// function attachAuthInterceptor(instance: ReturnType<typeof axios.create>) {
//   instance.interceptors.request.use(
//     (config: InternalAxiosRequestConfig) => {
//       const token = tokenStorage.getAccess();
//       if (token) config.headers.Authorization = `Bearer ${token}`;
//       return config;
//     },
//     (error) => Promise.reject(error),
//   );
// }

// export const httpClient = axios.create({
//   baseURL: BASE_URL,
//   timeout: 15_000,
//   headers: { 'Content-Type': 'application/json' },
// });

// /** Second client for the Giftpose platform API (categories, subcategories, content) */
// export const platformClient = axios.create({
//   baseURL: PLATFORM_URL,
//   timeout: 15_000,
//   headers: { 'Content-Type': 'application/json' },
// });

// attachAuthInterceptor(httpClient);
// attachAuthInterceptor(platformClient);

// /* ── Response: silent refresh on 401 ─────────────────────────── */
// let isRefreshing  = false;
// let failedQueue:  { resolve: (v: unknown) => void; reject: (e: unknown) => void }[] = [];

// const processQueue = (error: unknown, token: string | null) => {
//   failedQueue.forEach((p) => (error ? p.reject(error) : p.resolve(token)));
//   failedQueue = [];
// };

// /** Auth endpoints that should NEVER trigger the refresh interceptor */
// const AUTH_PATHS = ['/auth/login', '/auth/verify-otp', '/auth/resend-otp', '/auth/refresh'];

// httpClient.interceptors.response.use(
//   (response) => response,
//   async (error) => {
//     const original = error.config as AxiosRequestConfig & { _retry?: boolean };
//     const url      = original.url ?? '';

//     // Skip the interceptor entirely for auth endpoints — let errors bubble as-is
//     const isAuthEndpoint = AUTH_PATHS.some((p) => url.includes(p));
//     if (isAuthEndpoint) return Promise.reject(error);

//     // Only attempt refresh on 401 from protected endpoints
//     if (error.response?.status === 401 && !original._retry) {
//       if (isRefreshing) {
//         return new Promise((resolve, reject) => {
//           failedQueue.push({ resolve, reject });
//         }).then((token) => {
//           original.headers = { ...(original.headers ?? {}), Authorization: `Bearer ${token}` };
//           return httpClient(original);
//         });
//       }

//       original._retry  = true;
//       isRefreshing     = true;

//       const refreshToken = tokenStorage.getRefresh();

//       if (!refreshToken) {
//         isRefreshing = false;
//         tokenStorage.clearTokens();
//         window.location.replace('/login');
//         return Promise.reject(error);
//       }

//       try {
//         const { data } = await axios.post(`${BASE_URL}/admin/auth/refresh`, { refreshToken });
//         tokenStorage.setTokens(data.accessToken, data.refreshToken ?? refreshToken);
//         processQueue(null, data.accessToken);
//         original.headers = { ...(original.headers ?? {}), Authorization: `Bearer ${data.accessToken}` };
//         return httpClient(original);
//       } catch (refreshError) {
//         processQueue(refreshError, null);
//         tokenStorage.clearTokens();
//         window.location.replace('/login');
//         return Promise.reject(refreshError);
//       } finally {
//         isRefreshing = false;
//       }
//     }

//     return Promise.reject(error);
//   },
// );

// /* Apply the same 401 → refresh logic to the platform client */
// platformClient.interceptors.response.use(
//   (response) => response,
//   async (error) => {
//     const original = error.config as AxiosRequestConfig & { _retry?: boolean };
//     const url      = original.url ?? '';
//     if (AUTH_PATHS.some(p => url.includes(p))) return Promise.reject(error);
//     if (error.response?.status === 401 && !original._retry) {
//       original._retry = true;
//       const refreshToken = tokenStorage.getRefresh();
//       if (!refreshToken) {
//         tokenStorage.clearTokens();
//         window.location.replace('/login');
//         return Promise.reject(error);
//       }
//       try {
//         const { data } = await axios.post(`${BASE_URL}/admin/auth/refresh`, { refreshToken });
//         tokenStorage.setTokens(data.accessToken, data.refreshToken ?? refreshToken);
//         original.headers = { ...(original.headers ?? {}), Authorization: `Bearer ${data.accessToken}` };
//         return platformClient(original);
//       } catch {
//         tokenStorage.clearTokens();
//         window.location.replace('/login');
//         return Promise.reject(error);
//       }
//     }
//     return Promise.reject(error);
//   },
// );

// export default httpClient;





/**
 * httpClient.ts
 * ─────────────────────────────────────────────────────────────────
 * Single axios instance for ALL API calls.
 *
 * Dev  → http://localhost:4000/api  (local server)
 * Prod → VITE_API_BASE_URL env var  (swap to live URL at deploy time)
 *
 * To deploy: set VITE_API_BASE_URL=https://api.giftpose.com/api
 *            in your hosting provider's environment variables.
 */

// import axios from 'axios';
// import type { AxiosRequestConfig, InternalAxiosRequestConfig } from 'axios';
// import { tokenStorage } from '../utils/tokenStorage';

// const BASE_URL = import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:4000/api';

// export const httpClient = axios.create({
//   baseURL: BASE_URL,
//   timeout: 15_000,
//   headers: { 'Content-Type': 'application/json' },
// });

// /* ── Request: attach Bearer token to every request ────────────── */
// httpClient.interceptors.request.use(
//   (config: InternalAxiosRequestConfig) => {
//     const token = tokenStorage.getAccess();
//     if (token) config.headers.Authorization = `Bearer ${token}`;
//     return config;
//   },
//   (error) => Promise.reject(error),
// );

// /* ── Response: silent token refresh on 401 ────────────────────── */
// let isRefreshing = false;
// let failedQueue: { resolve: (v: unknown) => void; reject: (e: unknown) => void }[] = [];

// const processQueue = (error: unknown, token: string | null) => {
//   failedQueue.forEach((p) => (error ? p.reject(error) : p.resolve(token)));
//   failedQueue = [];
// };

// /** Auth endpoints — never trigger the refresh loop */
// const AUTH_PATHS = ['/auth/login', '/auth/verify-otp', '/auth/resend-otp', '/auth/refresh'];

// httpClient.interceptors.response.use(
//   (response) => response,
//   async (error) => {
//     const original = error.config as AxiosRequestConfig & { _retry?: boolean };
//     const url      = original.url ?? '';

//     // Let auth errors bubble straight to the UI
//     if (AUTH_PATHS.some((p) => url.includes(p))) return Promise.reject(error);

//     // Attempt silent refresh once on 401
//     if (error.response?.status === 401 && !original._retry) {
//       if (isRefreshing) {
//         return new Promise((resolve, reject) => {
//           failedQueue.push({ resolve, reject });
//         }).then((token) => {
//           original.headers = { ...(original.headers ?? {}), Authorization: `Bearer ${token}` };
//           return httpClient(original);
//         });
//       }

//       original._retry = true;
//       isRefreshing    = true;

//       const refreshToken = tokenStorage.getRefresh();

//       if (!refreshToken) {
//         isRefreshing = false;
//         tokenStorage.clearTokens();
//         window.location.replace('/login');
//         return Promise.reject(error);
//       }

//       try {
//         const { data } = await axios.post(`${BASE_URL}/admin/auth/refresh`, { refreshToken });
//         tokenStorage.setTokens(data.accessToken, data.refreshToken ?? refreshToken);
//         processQueue(null, data.accessToken);
//         original.headers = { ...(original.headers ?? {}), Authorization: `Bearer ${data.accessToken}` };
//         return httpClient(original);
//       } catch (refreshError) {
//         processQueue(refreshError, null);
//         tokenStorage.clearTokens();
//         window.location.replace('/login');
//         return Promise.reject(refreshError);
//       } finally {
//         isRefreshing = false;
//       }
//     }

//     return Promise.reject(error);
//   },
// );

// export default httpClient;






// const BASE_URL = import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:4000/api';

// export const httpClient = axios.create({
//   baseURL: BASE_URL,
//   timeout: 15_000,
//   headers: { 'Content-Type': 'application/json' },
// });

// /* ── Request: attach Bearer token to every request ────────────── */
// httpClient.interceptors.request.use(
//   (config: InternalAxiosRequestConfig) => {
//     const token = tokenStorage.getAccess();
//     if (token) config.headers.Authorization = `Bearer ${token}`;
//     return config;
//   },
//   (error) => Promise.reject(error),
// );

// /* ── Response: silent token refresh on 401 ────────────────────── */
// let isRefreshing = false;
// let failedQueue: { resolve: (v: unknown) => void; reject: (e: unknown) => void }[] = [];

// const processQueue = (error: unknown, token: string | null) => {
//   failedQueue.forEach((p) => (error ? p.reject(error) : p.resolve(token)));
//   failedQueue = [];
// };

// /** Auth endpoints — never trigger the refresh loop */
// const AUTH_PATHS = ['/auth/login', '/auth/verify-otp', '/auth/resend-otp', '/auth/refresh'];

// httpClient.interceptors.response.use(
//   (response) => response,
//   async (error) => {
//     const original = error.config as AxiosRequestConfig & { _retry?: boolean };
//     const url      = original.url ?? '';

//     // Let auth errors bubble straight to the UI
//     if (AUTH_PATHS.some((p) => url.includes(p))) return Promise.reject(error);

//     // Attempt silent refresh once on 401
//     if (error.response?.status === 401 && !original._retry) {
//       if (isRefreshing) {
//         return new Promise((resolve, reject) => {
//           failedQueue.push({ resolve, reject });
//         }).then((token) => {
//           original.headers = { ...(original.headers ?? {}), Authorization: `Bearer ${token}` };
//           return httpClient(original);
//         });
//       }

//       original._retry = true;
//       isRefreshing    = true;

//       const refreshToken = tokenStorage.getRefresh();

//       if (!refreshToken) {
//         isRefreshing = false;
//         tokenStorage.clearTokens();
//         window.location.replace('/login');
//         return Promise.reject(error);
//       }

//       try {
//         const { data } = await axios.post(`${BASE_URL}/admin/auth/refresh`, { refreshToken });
//         tokenStorage.setTokens(data.accessToken, data.refreshToken ?? refreshToken);
//         processQueue(null, data.accessToken);
//         original.headers = { ...(original.headers ?? {}), Authorization: `Bearer ${data.accessToken}` };
//         return httpClient(original);
//       } catch (refreshError) {
//         processQueue(refreshError, null);
//         tokenStorage.clearTokens();
//         window.location.replace('/login');
//         return Promise.reject(refreshError);
//       } finally {
//         isRefreshing = false;
//       }
//     }

//     return Promise.reject(error);
//   },
// );

// export default httpClient;



// import axios from 'axios';
// import { tokenStorage } from '../utils/tokenStorage';

// // Dev:  /api  → Vite proxies to http://localhost:4000/api (no CORS)
// // Prod: set VITE_API_BASE_URL=https://api.giftpose.com/api in your host env vars
// const BASE_URL = import.meta.env.VITE_API_BASE_URL ?? '/api';

// const httpClient = axios.create({
//   baseURL: BASE_URL,
//   timeout: 15000,
// });

// // Attach token to every request
// httpClient.interceptors.request.use((config) => {
//   const token = tokenStorage.getAccess();
//   if (token) {
//     config.headers.Authorization = `Bearer ${token}`;
//   }
//   // Only set Content-Type on requests that have a body
//   if (config.data) {
//     config.headers['Content-Type'] = 'application/json';
//   }
//   return config;
// });

// // On 401 — clear session and redirect to login
// httpClient.interceptors.response.use(
//   (res) => res,
//   (error) => {
//     const isAuthRoute = error.config?.url?.includes('/auth/');
//     if (error.response?.status === 401 && !isAuthRoute) {
//       tokenStorage.clearTokens();
//       window.location.replace('/login');
//     }
//     return Promise.reject(error);
//   }
// );

// export default httpClient;

// --------------------------------------
// Simplified version without the refresh token logic, since the backend will now invalidate the access token immediately on logout.
// If we do want to add refresh logic back in later, we can just reintroduce the isRefreshing + failedQueue pattern from the previous version.
// --------------------------------------


import axios from 'axios';
import { tokenStorage } from '../utils/tokenStorage';

// Dev:  /api  → Vite proxies to http://localhost:4000/api (no CORS)
// Prod: /api  → reverse proxy on your host rewrites to api.giftpose.com (no CORS)
// Override: set VITE_API_BASE_URL if you want to hit the API directly
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


