// import { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { adminLogin } from '../api/admin.api';

// const GiftposeLogo = () => (
//   <svg width="56" height="56" viewBox="0 0 56 56" fill="none">
//     <circle cx="28" cy="28" r="28" fill="#f0faf5" />
//     <path
//       d="M28 10C28 10 21 15 21 21C21 24.87 24.13 28 28 28C31.87 28 35 24.87 35 21C35 15 28 10 28 10Z"
//       fill="#27ae60"
//     />
//     <path
//       d="M28 10C28 10 31.5 14 31.5 18C31.5 20.5 30.1 22.6 28 23.8"
//       stroke="#1a7a42"
//       strokeWidth="1.4"
//       strokeLinecap="round"
//       fill="none"
//     />
//     <rect x="15" y="26" width="26" height="6" rx="3" fill="#27ae60" />
//     <rect x="18.5" y="32" width="19" height="13" rx="2.5" fill="#27ae60" opacity=".2" />
//     <rect x="18.5" y="32" width="19" height="13" rx="2.5" fill="#27ae60" opacity=".15" />
//     <rect x="26.2" y="26" width="3.6" height="19" fill="#1a7a42" opacity=".55" />
//   </svg>
// );

// const EyeIcon = ({ visible }: { visible: boolean }) =>
//   visible ? (
//     <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
//       <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
//       <circle cx="12" cy="12" r="3" />
//     </svg>
//   ) : (
//     <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
//       <path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94" />
//       <path d="M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19" />
//       <line x1="1" y1="1" x2="23" y2="23" />
//     </svg>
//   );

// const styles: Record<string, React.CSSProperties> = {
//   body: {
//     background: '#fff',
//     fontFamily: "'DM Sans', sans-serif",
//     minHeight: '100vh',
//     display: 'flex',
//     flexDirection: 'column',
//     alignItems: 'center',
//     justifyContent: 'center',
//     padding: '24px',
//   },
//   brand: {
//     display: 'flex',
//     flexDirection: 'column',
//     alignItems: 'center',
//     gap: '10px',
//     marginBottom: '28px',
//   },
//   brandName: {
//     fontSize: '15px',
//     fontWeight: 600,
//     letterSpacing: '1.5px',
//     color: '#111',
//     marginTop: '8px',
//     textAlign: 'center',
//   },
//   card: {
//     background: '#fff',
//     border: '1.5px solid #e8e8e8',
//     borderRadius: '16px',
//     padding: '36px 40px',
//     width: '100%',
//     maxWidth: '440px',
//     boxShadow: '0 2px 16px rgba(0,0,0,0.05)',
//   },
//   cardTitle: {
//     fontSize: '20px',
//     fontWeight: 700,
//     color: '#111',
//     marginBottom: '4px',
//   },
//   cardSub: {
//     fontSize: '13.5px',
//     color: '#8a8a8a',
//     marginBottom: '28px',
//   },
//   field: {
//     marginBottom: '18px',
//   },
//   label: {
//     fontSize: '13px',
//     fontWeight: 500,
//     color: '#333',
//     marginBottom: '7px',
//     display: 'block',
//   },
//   inputWrapper: {
//     position: 'relative',
//   },
//   input: {
//     width: '100%',
//     padding: '12px 16px',
//     background: '#f6f6f6',
//     border: '1.5px solid transparent',
//     borderRadius: '10px',
//     fontSize: '14px',
//     color: '#111',
//     outline: 'none',
//     fontFamily: "'DM Sans', sans-serif",
//     transition: 'border-color 0.2s, background 0.2s',
//     boxSizing: 'border-box',
//   },
//   inputWithIcon: {
//     width: '100%',
//     padding: '12px 44px 12px 16px',
//     background: '#f6f6f6',
//     border: '1.5px solid transparent',
//     borderRadius: '10px',
//     fontSize: '14px',
//     color: '#111',
//     outline: 'none',
//     fontFamily: "'DM Sans', sans-serif",
//     transition: 'border-color 0.2s, background 0.2s',
//     boxSizing: 'border-box',
//   },
//   eyeBtn: {
//     position: 'absolute',
//     right: '14px',
//     top: '50%',
//     transform: 'translateY(-50%)',
//     background: 'none',
//     border: 'none',
//     cursor: 'pointer',
//     color: '#aaa',
//     display: 'flex',
//     alignItems: 'center',
//     padding: 0,
//   },
//   btnLogin: {
//     width: '100%',
//     padding: '14px',
//     background: '#3ecf5c',
//     border: 'none',
//     borderRadius: '10px',
//     fontSize: '15px',
//     fontWeight: 600,
//     color: '#fff',
//     cursor: 'pointer',
//     marginTop: '8px',
//     fontFamily: "'DM Sans', sans-serif",
//     letterSpacing: '0.3px',
//     transition: 'background 0.2s, transform 0.1s, opacity 0.2s',
//   },
// };

// export default function Login() {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [showPassword, setShowPassword] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const [emailFocused, setEmailFocused] = useState(false);
//   const [passwordFocused, setPasswordFocused] = useState(false);
//   const navigate = useNavigate();

//   const handleLogin = async () => {
//     try {
//       setLoading(true);
//       const data = await adminLogin({ email, password });
//       navigate('/verify-otp', { state: { adminId: data.adminId } });
//     } catch (err: any) {
//       alert(err.response?.data?.message || 'Login failed');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleKeyDown = (e: React.KeyboardEvent) => {
//     if (e.key === 'Enter') handleLogin();
//   };

//   return (
//     <>
//       <link
//         href="https://fonts.googleapis.com/css2?family=DM+Sans:opsz,wght@9..40,400;9..40,500;9..40,600;9..40,700&display=swap"
//         rel="stylesheet"
//       />
//       <div style={styles.body}>
//         <div style={styles.brand}>
//           <GiftposeLogo />
//           <div style={styles.brandName}>Giftpose Admin Panel</div>
//         </div>

//         <div
//           style={{
//             ...styles.card,
//             ...(window.innerWidth <= 480 ? { padding: '28px 22px' } : {}),
//           }}
//         >
//           <div style={styles.cardTitle}>Admin Login</div>
//           <div style={styles.cardSub}>Enter your credentials to access the dashboard</div>

//           {/* Email Field */}
//           <div style={styles.field}>
//             <label style={styles.label}>Email Address</label>
//             <input
//               style={{
//                 ...styles.input,
//                 background: emailFocused ? '#fff' : '#f6f6f6',
//                 borderColor: emailFocused ? '#27ae60' : 'transparent',
//               }}
//               type="email"
//               placeholder="admin@example.com"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               onFocus={() => setEmailFocused(true)}
//               onBlur={() => setEmailFocused(false)}
//               onKeyDown={handleKeyDown}
//               autoComplete="email"
//             />
//           </div>

//           {/* Password Field */}
//           <div style={styles.field}>
//             <label style={styles.label}>Password</label>
//             <div style={styles.inputWrapper}>
//               <input
//                 style={{
//                   ...styles.inputWithIcon,
//                   background: passwordFocused ? '#fff' : '#f6f6f6',
//                   borderColor: passwordFocused ? '#27ae60' : 'transparent',
//                   letterSpacing: !showPassword ? '2px' : 'normal',
//                   fontSize: !showPassword ? '16px' : '14px',
//                 }}
//                 type={showPassword ? 'text' : 'password'}
//                 placeholder="••••••••"
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//                 onFocus={() => setPasswordFocused(true)}
//                 onBlur={() => setPasswordFocused(false)}
//                 onKeyDown={handleKeyDown}
//                 autoComplete="current-password"
//               />
//               <button
//                 style={styles.eyeBtn}
//                 onClick={() => setShowPassword((v) => !v)}
//                 tabIndex={-1}
//                 type="button"
//                 aria-label={showPassword ? 'Hide password' : 'Show password'}
//               >
//                 <EyeIcon visible={showPassword} />
//               </button>
//             </div>
//           </div>

//           <button
//             style={{
//               ...styles.btnLogin,
//               background: loading ? '#27ae60' : '#3ecf5c',
//               opacity: loading ? 0.8 : 1,
//               cursor: loading ? 'not-allowed' : 'pointer',
//             }}
//             onClick={handleLogin}
//             disabled={loading}
//             onMouseEnter={(e) => {
//               if (!loading) (e.currentTarget as HTMLButtonElement).style.background = '#27ae60';
//             }}
//             onMouseLeave={(e) => {
//               if (!loading) (e.currentTarget as HTMLButtonElement).style.background = '#3ecf5c';
//             }}
//             onMouseDown={(e) => {
//               (e.currentTarget as HTMLButtonElement).style.transform = 'scale(0.98)';
//             }}
//             onMouseUp={(e) => {
//               (e.currentTarget as HTMLButtonElement).style.transform = 'scale(1)';
//             }}
//           >
//             {loading ? 'Logging in…' : 'Login'}
//           </button>
//         </div>
//       </div>
//     </>
//   );
// }




// import { useState, useEffect } from 'react';
// import { useNavigate, useLocation } from 'react-router-dom';
// import { adminLogin } from '../api/admin.api';
// import { useAuth } from '../context/AuthContext';

// const GiftposeLogo = () => (
//   <svg width="56" height="56" viewBox="0 0 56 56" fill="none">
//     <circle cx="28" cy="28" r="28" fill="#f0faf5" />
//     <path
//       d="M28 10C28 10 21 15 21 21C21 24.87 24.13 28 28 28C31.87 28 35 24.87 35 21C35 15 28 10 28 10Z"
//       fill="#27ae60"
//     />
//     <path
//       d="M28 10C28 10 31.5 14 31.5 18C31.5 20.5 30.1 22.6 28 23.8"
//       stroke="#1a7a42"
//       strokeWidth="1.4"
//       strokeLinecap="round"
//       fill="none"
//     />
//     <rect x="15" y="26" width="26" height="6" rx="3" fill="#27ae60" />
//     <rect x="18.5" y="32" width="19" height="13" rx="2.5" fill="#27ae60" opacity=".2" />
//     <rect x="18.5" y="32" width="19" height="13" rx="2.5" fill="#27ae60" opacity=".15" />
//     <rect x="26.2" y="26" width="3.6" height="19" fill="#1a7a42" opacity=".55" />
//   </svg>
// );

// const EyeIcon = ({ visible }: { visible: boolean }) =>
//   visible ? (
//     <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
//       <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
//       <circle cx="12" cy="12" r="3" />
//     </svg>
//   ) : (
//     <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
//       <path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94" />
//       <path d="M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19" />
//       <line x1="1" y1="1" x2="23" y2="23" />
//     </svg>
//   );

// const styles: Record<string, React.CSSProperties> = {
//   body: {
//     background: '#fff',
//     fontFamily: "'DM Sans', sans-serif",
//     minHeight: '100vh',
//     display: 'flex',
//     flexDirection: 'column',
//     alignItems: 'center',
//     justifyContent: 'center',
//     padding: '24px',
//   },
//   brand: {
//     display: 'flex',
//     flexDirection: 'column',
//     alignItems: 'center',
//     gap: '10px',
//     marginBottom: '28px',
//   },
//   brandName: {
//     fontSize: '15px',
//     fontWeight: 600,
//     letterSpacing: '1.5px',
//     color: '#111',
//     marginTop: '8px',
//     textAlign: 'center',
//   },
//   card: {
//     background: '#fff',
//     border: '1.5px solid #e8e8e8',
//     borderRadius: '16px',
//     padding: '36px 40px',
//     width: '100%',
//     maxWidth: '440px',
//     boxShadow: '0 2px 16px rgba(0,0,0,0.05)',
//   },
//   cardTitle: {
//     fontSize: '20px',
//     fontWeight: 700,
//     color: '#111',
//     marginBottom: '4px',
//   },
//   cardSub: {
//     fontSize: '13.5px',
//     color: '#8a8a8a',
//     marginBottom: '28px',
//   },
//   field: {
//     marginBottom: '18px',
//   },
//   label: {
//     fontSize: '13px',
//     fontWeight: 500,
//     color: '#333',
//     marginBottom: '7px',
//     display: 'block',
//   },
//   inputWrapper: {
//     position: 'relative',
//   },
//   input: {
//     width: '100%',
//     padding: '12px 16px',
//     background: '#f6f6f6',
//     border: '1.5px solid transparent',
//     borderRadius: '10px',
//     fontSize: '14px',
//     color: '#111',
//     outline: 'none',
//     fontFamily: "'DM Sans', sans-serif",
//     transition: 'border-color 0.2s, background 0.2s',
//     boxSizing: 'border-box',
//   },
//   inputWithIcon: {
//     width: '100%',
//     padding: '12px 44px 12px 16px',
//     background: '#f6f6f6',
//     border: '1.5px solid transparent',
//     borderRadius: '10px',
//     fontSize: '14px',
//     color: '#111',
//     outline: 'none',
//     fontFamily: "'DM Sans', sans-serif",
//     transition: 'border-color 0.2s, background 0.2s',
//     boxSizing: 'border-box',
//   },
//   eyeBtn: {
//     position: 'absolute',
//     right: '14px',
//     top: '50%',
//     transform: 'translateY(-50%)',
//     background: 'none',
//     border: 'none',
//     cursor: 'pointer',
//     color: '#aaa',
//     display: 'flex',
//     alignItems: 'center',
//     padding: 0,
//   },
//   btnLogin: {
//     width: '100%',
//     padding: '14px',
//     background: '#3ecf5c',
//     border: 'none',
//     borderRadius: '10px',
//     fontSize: '15px',
//     fontWeight: 600,
//     color: '#fff',
//     cursor: 'pointer',
//     marginTop: '8px',
//     fontFamily: "'DM Sans', sans-serif",
//     letterSpacing: '0.3px',
//     transition: 'background 0.2s, transform 0.1s, opacity 0.2s',
//   },
// };

// export default function Login() {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [showPassword, setShowPassword] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState('');
//   const [emailFocused, setEmailFocused] = useState(false);
//   const [passwordFocused, setPasswordFocused] = useState(false);
//   const navigate   = useNavigate();
//   const location   = useLocation();
//   const { isAuthenticated, isLoading } = useAuth();

//   /* Redirect already-authenticated admins away from login */
//   useEffect(() => {
//     if (!isLoading && isAuthenticated) {
//       const from = (location.state as any)?.from?.pathname ?? '/dashboard';
//       navigate(from, { replace: true });
//     }
//   }, [isAuthenticated, isLoading, navigate, location]);

//   const handleLogin = async () => {
//     if (!email.trim() || !password.trim()) {
//       setError('Please enter your email and password.');
//       return;
//     }
//     setError('');
//     try {
//       setLoading(true);
//       const data = await adminLogin({ email, password });
//       // Pass the adminId from response.admin.id to OTP step
//       navigate('/verify-otp', { state: { adminId: data.admin.id } });
//     } catch (err: any) {
//       setError(err.response?.data?.message || 'Login failed. Please try again.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleKeyDown = (e: React.KeyboardEvent) => {
//     if (e.key === 'Enter') handleLogin();
//   };

//   return (
//     <>
//       <link
//         href="https://fonts.googleapis.com/css2?family=DM+Sans:opsz,wght@9..40,400;9..40,500;9..40,600;9..40,700&display=swap"
//         rel="stylesheet"
//       />
//       <div style={styles.body}>
//         <div style={styles.brand}>
//           <GiftposeLogo />
//           <div style={styles.brandName}>Giftpose Admin Panel</div>
//         </div>

//         <div
//           style={{
//             ...styles.card,
//             ...(window.innerWidth <= 480 ? { padding: '28px 22px' } : {}),
//           }}
//         >
//           <div style={styles.cardTitle}>Admin Login</div>
//           <div style={styles.cardSub}>Enter your credentials to access the dashboard</div>

//           {/* Email Field */}
//           <div style={styles.field}>
//             <label style={styles.label}>Email Address</label>
//             <input
//               style={{
//                 ...styles.input,
//                 background: emailFocused ? '#fff' : '#f6f6f6',
//                 borderColor: emailFocused ? '#27ae60' : 'transparent',
//               }}
//               type="email"
//               placeholder="admin@example.com"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               onFocus={() => setEmailFocused(true)}
//               onBlur={() => setEmailFocused(false)}
//               onKeyDown={handleKeyDown}
//               autoComplete="email"
//             />
//           </div>

//           {/* Password Field */}
//           <div style={styles.field}>
//             <label style={styles.label}>Password</label>
//             <div style={styles.inputWrapper}>
//               <input
//                 style={{
//                   ...styles.inputWithIcon,
//                   background: passwordFocused ? '#fff' : '#f6f6f6',
//                   borderColor: passwordFocused ? '#27ae60' : 'transparent',
//                   letterSpacing: !showPassword ? '2px' : 'normal',
//                   fontSize: !showPassword ? '16px' : '14px',
//                 }}
//                 type={showPassword ? 'text' : 'password'}
//                 placeholder="••••••••"
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//                 onFocus={() => setPasswordFocused(true)}
//                 onBlur={() => setPasswordFocused(false)}
//                 onKeyDown={handleKeyDown}
//                 autoComplete="current-password"
//               />
//               <button
//                 style={styles.eyeBtn}
//                 onClick={() => setShowPassword((v) => !v)}
//                 tabIndex={-1}
//                 type="button"
//                 aria-label={showPassword ? 'Hide password' : 'Show password'}
//               >
//                 <EyeIcon visible={showPassword} />
//               </button>
//             </div>
//           </div>

//           {/* Inline error */}
//           {error && (
//             <div style={{
//               background: '#fef2f2',
//               border: '1.5px solid #fecaca',
//               borderRadius: 9,
//               padding: '10px 14px',
//               fontSize: 13,
//               color: '#dc2626',
//               marginBottom: 4,
//               display: 'flex',
//               alignItems: 'center',
//               gap: 8,
//             }}>
//               <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
//                 <circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" />
//               </svg>
//               {error}
//             </div>
//           )}

//           <button
//             style={{
//               ...styles.btnLogin,
//               background: loading ? '#27ae60' : '#3ecf5c',
//               opacity: loading ? 0.8 : 1,
//               cursor: loading ? 'not-allowed' : 'pointer',
//             }}
//             onClick={handleLogin}
//             disabled={loading}
//             onMouseEnter={(e) => {
//               if (!loading) (e.currentTarget as HTMLButtonElement).style.background = '#27ae60';
//             }}
//             onMouseLeave={(e) => {
//               if (!loading) (e.currentTarget as HTMLButtonElement).style.background = '#3ecf5c';
//             }}
//             onMouseDown={(e) => {
//               (e.currentTarget as HTMLButtonElement).style.transform = 'scale(0.98)';
//             }}
//             onMouseUp={(e) => {
//               (e.currentTarget as HTMLButtonElement).style.transform = 'scale(1)';
//             }}
//           >
//             {loading ? 'Logging in…' : 'Login'}
//           </button>
//         </div>
//       </div>
//     </>
//   );
// }



import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { adminLogin } from '../api/admin.api';
import { useAuth } from '../context/AuthContext';

const GiftposeLogo = () => (
  <svg width="56" height="56" viewBox="0 0 56 56" fill="none">
    <circle cx="28" cy="28" r="28" fill="#f0faf5" />
    <path
      d="M28 10C28 10 21 15 21 21C21 24.87 24.13 28 28 28C31.87 28 35 24.87 35 21C35 15 28 10 28 10Z"
      fill="#27ae60"
    />
    <path
      d="M28 10C28 10 31.5 14 31.5 18C31.5 20.5 30.1 22.6 28 23.8"
      stroke="#1a7a42"
      strokeWidth="1.4"
      strokeLinecap="round"
      fill="none"
    />
    <rect x="15" y="26" width="26" height="6" rx="3" fill="#27ae60" />
    <rect x="18.5" y="32" width="19" height="13" rx="2.5" fill="#27ae60" opacity=".2" />
    <rect x="18.5" y="32" width="19" height="13" rx="2.5" fill="#27ae60" opacity=".15" />
    <rect x="26.2" y="26" width="3.6" height="19" fill="#1a7a42" opacity=".55" />
  </svg>
);

const EyeIcon = ({ visible }: { visible: boolean }) =>
  visible ? (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  ) : (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94" />
      <path d="M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19" />
      <line x1="1" y1="1" x2="23" y2="23" />
    </svg>
  );

const styles: Record<string, React.CSSProperties> = {
  body: {
    background: '#fff',
    fontFamily: "'DM Sans', sans-serif",
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '24px',
  },
  brand: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '10px',
    marginBottom: '28px',
  },
  brandName: {
    fontSize: '15px',
    fontWeight: 600,
    letterSpacing: '1.5px',
    color: '#111',
    marginTop: '8px',
    textAlign: 'center',
  },
  card: {
    background: '#fff',
    border: '1.5px solid #e8e8e8',
    borderRadius: '16px',
    padding: '36px 40px',
    width: '100%',
    maxWidth: '440px',
    boxShadow: '0 2px 16px rgba(0,0,0,0.05)',
  },
  cardTitle: {
    fontSize: '20px',
    fontWeight: 700,
    color: '#111',
    marginBottom: '4px',
  },
  cardSub: {
    fontSize: '13.5px',
    color: '#8a8a8a',
    marginBottom: '28px',
  },
  field: {
    marginBottom: '18px',
  },
  label: {
    fontSize: '13px',
    fontWeight: 500,
    color: '#333',
    marginBottom: '7px',
    display: 'block',
  },
  inputWrapper: {
    position: 'relative',
  },
  input: {
    width: '100%',
    padding: '12px 16px',
    background: '#f6f6f6',
    border: '1.5px solid transparent',
    borderRadius: '10px',
    fontSize: '14px',
    color: '#111',
    outline: 'none',
    fontFamily: "'DM Sans', sans-serif",
    transition: 'border-color 0.2s, background 0.2s',
    boxSizing: 'border-box',
  },
  inputWithIcon: {
    width: '100%',
    padding: '12px 44px 12px 16px',
    background: '#f6f6f6',
    border: '1.5px solid transparent',
    borderRadius: '10px',
    fontSize: '14px',
    color: '#111',
    outline: 'none',
    fontFamily: "'DM Sans', sans-serif",
    transition: 'border-color 0.2s, background 0.2s',
    boxSizing: 'border-box',
  },
  eyeBtn: {
    position: 'absolute',
    right: '14px',
    top: '50%',
    transform: 'translateY(-50%)',
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    color: '#aaa',
    display: 'flex',
    alignItems: 'center',
    padding: 0,
  },
  btnLogin: {
    width: '100%',
    padding: '14px',
    background: '#3ecf5c',
    border: 'none',
    borderRadius: '10px',
    fontSize: '15px',
    fontWeight: 600,
    color: '#fff',
    cursor: 'pointer',
    marginTop: '8px',
    fontFamily: "'DM Sans', sans-serif",
    letterSpacing: '0.3px',
    transition: 'background 0.2s, transform 0.1s, opacity 0.2s',
  },
};

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [emailFocused, setEmailFocused] = useState(false);
  const [passwordFocused, setPasswordFocused] = useState(false);
  const navigate   = useNavigate();
  const location   = useLocation();
  const { isAuthenticated, isLoading } = useAuth();

  /* Redirect already-authenticated admins away from login */
  useEffect(() => {
    if (!isLoading && isAuthenticated) {
      const from = (location.state as any)?.from?.pathname ?? '/dashboard';
      navigate(from, { replace: true });
    }
  }, [isAuthenticated, isLoading, navigate, location]);

  const handleLogin = async () => {
    if (!email.trim() || !password.trim()) {
      setError('Please enter your email and password.');
      return;
    }
    setError('');
    try {
      setLoading(true);
      const data = await adminLogin({ email, password });
      // Server sends OTP to email; pass adminId to the verify step
      navigate('/verify-otp', { state: { adminId: data.adminId } });
    } catch (err: any) {
      setError(err.response?.data?.message || 'Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') handleLogin();
  };

  return (
    <>
      <link
        href="https://fonts.googleapis.com/css2?family=DM+Sans:opsz,wght@9..40,400;9..40,500;9..40,600;9..40,700&display=swap"
        rel="stylesheet"
      />
      <div style={styles.body}>
        <div style={styles.brand}>
          <GiftposeLogo />
          <div style={styles.brandName}>Giftpose Admin Panel</div>
        </div>

        <div
          style={{
            ...styles.card,
            ...(window.innerWidth <= 480 ? { padding: '28px 22px' } : {}),
          }}
        >
          <div style={styles.cardTitle}>Admin Login</div>
          <div style={styles.cardSub}>Enter your credentials to access the dashboard</div>

          {/* Email Field */}
          <div style={styles.field}>
            <label style={styles.label}>Email Address</label>
            <input
              style={{
                ...styles.input,
                background: emailFocused ? '#fff' : '#f6f6f6',
                borderColor: emailFocused ? '#27ae60' : 'transparent',
              }}
              type="email"
              placeholder="admin@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onFocus={() => setEmailFocused(true)}
              onBlur={() => setEmailFocused(false)}
              onKeyDown={handleKeyDown}
              autoComplete="email"
            />
          </div>

          {/* Password Field */}
          <div style={styles.field}>
            <label style={styles.label}>Password</label>
            <div style={styles.inputWrapper}>
              <input
                style={{
                  ...styles.inputWithIcon,
                  background: passwordFocused ? '#fff' : '#f6f6f6',
                  borderColor: passwordFocused ? '#27ae60' : 'transparent',
                  letterSpacing: !showPassword ? '2px' : 'normal',
                  fontSize: !showPassword ? '16px' : '14px',
                }}
                type={showPassword ? 'text' : 'password'}
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onFocus={() => setPasswordFocused(true)}
                onBlur={() => setPasswordFocused(false)}
                onKeyDown={handleKeyDown}
                autoComplete="current-password"
              />
              <button
                style={styles.eyeBtn}
                onClick={() => setShowPassword((v) => !v)}
                tabIndex={-1}
                type="button"
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                <EyeIcon visible={showPassword} />
              </button>
            </div>
          </div>

          {/* Inline error */}
          {error && (
            <div style={{
              background: '#fef2f2',
              border: '1.5px solid #fecaca',
              borderRadius: 9,
              padding: '10px 14px',
              fontSize: 13,
              color: '#dc2626',
              marginBottom: 4,
              display: 'flex',
              alignItems: 'center',
              gap: 8,
            }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" />
              </svg>
              {error}
            </div>
          )}

          <button
            style={{
              ...styles.btnLogin,
              background: loading ? '#27ae60' : '#3ecf5c',
              opacity: loading ? 0.8 : 1,
              cursor: loading ? 'not-allowed' : 'pointer',
            }}
            onClick={handleLogin}
            disabled={loading}
            onMouseEnter={(e) => {
              if (!loading) (e.currentTarget as HTMLButtonElement).style.background = '#27ae60';
            }}
            onMouseLeave={(e) => {
              if (!loading) (e.currentTarget as HTMLButtonElement).style.background = '#3ecf5c';
            }}
            onMouseDown={(e) => {
              (e.currentTarget as HTMLButtonElement).style.transform = 'scale(0.98)';
            }}
            onMouseUp={(e) => {
              (e.currentTarget as HTMLButtonElement).style.transform = 'scale(1)';
            }}
          >
            {loading ? 'Logging in…' : 'Login'}
          </button>
        </div>
      </div>
    </>
  );
}


