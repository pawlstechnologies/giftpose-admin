/**
 * AuthContext.tsx
 * ─────────────────────────────────────────────────────────────────
 * Global authentication state for the admin panel.
 *
 * Provides:
 *   - `admin`       → hydrated AdminProfile (or null while loading)
 *   - `isLoading`   → true during initial /me fetch
 *   - `isAuthenticated` → derived boolean
 *   - `login()`     → called after OTP verify; saves tokens + fetches profile
 *   - `logout()`    → clears tokens + resets state + redirects
 */

import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
} from 'react';

import type { ReactNode } from 'react';

import { useNavigate } from 'react-router-dom';
import { tokenStorage } from '../utils/tokenStorage';
import { getAdminMe, adminLogout } from '../api/admin.api';
import type { AdminProfile } from '../api/admin.api';

/* ─── Shape ──────────────────────────────────────────────────────── */

interface AuthContextValue {
  admin:            AdminProfile | null;
  isLoading:        boolean;
  isAuthenticated:  boolean;
  login:            (accessToken: string, refreshToken: string) => Promise<void>;
  logout:           () => Promise<void>;
  refreshProfile:   () => Promise<void>;
}

/* ─── Context ────────────────────────────────────────────────────── */

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

/* ─── Provider ───────────────────────────────────────────────────── */

export function AuthProvider({ children }: { children: ReactNode }) {
  const [admin,     setAdmin]     = useState<AdminProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate                  = useNavigate();

  /* Fetch /me and hydrate profile */
  const fetchProfile = useCallback(async () => {
    try {
      const profile = await getAdminMe();
      setAdmin(profile);
    } catch {
      // /me failed (token invalid / expired beyond refresh) → clean up
      tokenStorage.clearTokens();
      setAdmin(null);
    }
  }, []);

  /* On mount: if a valid token exists, silently restore session */
  useEffect(() => {
    const init = async () => {
      if (tokenStorage.hasValidToken()) {
        await fetchProfile();
      }
      setIsLoading(false);
    };
    init();
  }, [fetchProfile]);

  /* Called after OTP verification — tokens already verified by server */
  const login = useCallback(async (accessToken: string, refreshToken: string) => {
    tokenStorage.setTokens(accessToken, refreshToken);
    await fetchProfile();
  }, [fetchProfile]);

  /* Called from any logout button */
  const logout = useCallback(async () => {
    try {
      await adminLogout(); // tell server to invalidate refresh token
    } catch {
      // swallow — we're clearing client state regardless
    } finally {
      tokenStorage.clearTokens();
      setAdmin(null);
      navigate('/login', { replace: true });
    }
  }, [navigate]);

  const value: AuthContextValue = {
    admin,
    isLoading,
    isAuthenticated: Boolean(admin),
    login,
    logout,
    refreshProfile: fetchProfile,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

/* ─── Hook ───────────────────────────────────────────────────────── */

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used inside <AuthProvider>');
  return ctx;
}