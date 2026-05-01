// // import { useState } from 'react'
// import { BrowserRouter, Routes, Route } from 'react-router-dom'
// import Login from './pages/Login'
// import VerifyOTP from './pages/VerifyOTP'
// import './App.css'
// import Dashboard from './pages/Dashboard'
// import Categories from './pages/Categories'

// function App() {
//     return (
//         <BrowserRouter>
//             <Routes>
//                 <Route path="/" element={<Login />} />
//                 <Route path="/verify-otp" element={<VerifyOTP />} />
//                 <Route path="/dashboard" element={<div><Dashboard /></div>} />
//                 <Route path="/categories" element={<div><Categories /></div>} />
//                 <Route path="/setup-mfa" element={<SetupMFA />} />
//             </Routes>
//         </BrowserRouter>
//     );
// }

// export default App



/**
 * App.tsx
 * ─────────────────────────────────────────────────────────────────
 * Root component. Wraps everything in AuthProvider and BrowserRouter,
 * then declares all routes.
 *
 * Route structure:
 *   /login          → Login           (public — redirects if already authed)
 *   /verify-otp     → VerifyOTP       (public — guarded internally by adminId state)
 *   /dashboard      → Dashboard       (protected)
 *   /categories     → Categories      (protected)
 *   /               → redirect → /dashboard
 *   *               → redirect → /dashboard
 */

import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/auth/ProtectedRoute';
import Login from './pages/Login';
import VerifyOTP from './pages/VerifyOTP';
import Dashboard from './pages/Dashboard';
import Categories from './pages/Categories';

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          {/* ── Public ── */}
          <Route path="/login"      element={<Login />} />
          <Route path="/verify-otp" element={<VerifyOTP />} />

          {/* ── Protected ── */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/categories"
            element={
              <ProtectedRoute>
                <Categories />
              </ProtectedRoute>
            }
          />
          {/* <Route
            path="/create-category"
            element={
              <ProtectedRoute>
                <CategoriesBrowser />
              </ProtectedRoute>
            }
          /> */}

          {/* ── Fallbacks ── */}
          <Route path="/"  element={<Navigate to="/dashboard" replace />} />
          <Route path="*"  element={<Navigate to="/dashboard" replace />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}



