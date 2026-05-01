/**
 * ProtectedRoute.tsx
 * ─────────────────────────────────────────────────────────────────
 * Wraps any route that requires authentication.
 *
 * - While session is being restored (isLoading) → full-screen spinner
 * - Not authenticated → redirect to /login (preserves intended URL)
 * - Authenticated → renders children
 */

import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, isLoading } = useAuth();
  const location = useLocation();

  /* Session restore in progress — avoid flash of login screen */
  if (isLoading) {
    return (
      <div style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: '#f4f5f7',
        fontFamily: "'DM Sans', sans-serif",
      }}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 14 }}>
          {/* Spinning ring */}
          <svg
            width="40" height="40" viewBox="0 0 40 40"
            style={{ animation: 'spin 0.8s linear infinite' }}
          >
            <style>{`@keyframes spin { to { transform: rotate(360deg) } }`}</style>
            <circle cx="20" cy="20" r="16" fill="none" stroke="#e8f7ef" strokeWidth="4" />
            <path d="M20 4 A16 16 0 0 1 36 20" fill="none" stroke="#27ae60" strokeWidth="4" strokeLinecap="round" />
          </svg>
          <span style={{ fontSize: 13, color: '#9ca3af', fontWeight: 500 }}>Loading…</span>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    // Pass current path so we can redirect back after login
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <>{children}</>;
}


