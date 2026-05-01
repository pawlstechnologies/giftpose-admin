/**
 * tokenStorage.ts
 * ─────────────────────────────────────────────────────────────────
 * Single source of truth for persisting auth tokens.
 * Using localStorage keeps the session alive across tabs/refreshes.
 * Never store tokens in React state — they'd be lost on refresh.
 */

const ACCESS_KEY  = 'gp_access_token';
const REFRESH_KEY = 'gp_refresh_token';

export const tokenStorage = {
  getAccess:     ()           => localStorage.getItem(ACCESS_KEY),
  getRefresh:    ()           => localStorage.getItem(REFRESH_KEY),

  setTokens: (access: string, refresh: string) => {
    localStorage.setItem(ACCESS_KEY,  access);
    localStorage.setItem(REFRESH_KEY, refresh);
  },

  clearTokens: () => {
    localStorage.removeItem(ACCESS_KEY);
    localStorage.removeItem(REFRESH_KEY);
  },

  hasValidToken: (): boolean => {
    const token = localStorage.getItem(ACCESS_KEY);
    if (!token) return false;
    try {
      // Decode JWT payload (no verification — server does that)
      const payload = JSON.parse(atob(token.split('.')[1]));
      // exp is in seconds; Date.now() is in ms
      return payload.exp * 1000 > Date.now();
    } catch {
      return false;
    }
  },
};

