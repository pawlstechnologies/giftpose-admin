
// // import { useState, useRef } from 'react';
// // import type { KeyboardEvent, ClipboardEvent } from 'react';
// // import { useLocation, useNavigate } from 'react-router-dom';
// // import { verifyOTP, resendOTP } from '../api/admin.api';

// // const GiftposeLogo = () => (
// //   <svg width="56" height="56" viewBox="0 0 56 56" fill="none">
// //     <circle cx="28" cy="28" r="28" fill="#f0faf5" />
// //     <path
// //       d="M28 10C28 10 21 15 21 21C21 24.87 24.13 28 28 28C31.87 28 35 24.87 35 21C35 15 28 10 28 10Z"
// //       fill="#27ae60"
// //     />
// //     <path
// //       d="M28 10C28 10 31.5 14 31.5 18C31.5 20.5 30.1 22.6 28 23.8"
// //       stroke="#1a7a42"
// //       strokeWidth="1.4"
// //       strokeLinecap="round"
// //       fill="none"
// //     />
// //     <rect x="15" y="26" width="26" height="6" rx="3" fill="#27ae60" />
// //     <rect x="18.5" y="32" width="19" height="13" rx="2.5" fill="#27ae60" opacity=".2" />
// //     <rect x="26.2" y="26" width="3.6" height="19" fill="#1a7a42" opacity=".55" />
// //   </svg>
// // );

// // const OTP_LENGTH = 6;

// // const styles: Record<string, React.CSSProperties> = {
// //   body: {
// //     background: '#fff',
// //     fontFamily: "'DM Sans', sans-serif",
// //     minHeight: '100vh',
// //     display: 'flex',
// //     flexDirection: 'column',
// //     alignItems: 'center',
// //     justifyContent: 'center',
// //     padding: '24px',
// //   },
// //   brand: {
// //     display: 'flex',
// //     flexDirection: 'column',
// //     alignItems: 'center',
// //     gap: '10px',
// //     marginBottom: '28px',
// //   },
// //   brandName: {
// //     fontSize: '15px',
// //     fontWeight: 600,
// //     letterSpacing: '1.5px',
// //     color: '#111',
// //     textAlign: 'center',
// //   },
// //   card: {
// //     background: '#fff',
// //     border: '1.5px solid #e8e8e8',
// //     borderRadius: '16px',
// //     padding: '36px 40px',
// //     width: '100%',
// //     maxWidth: '440px',
// //     boxShadow: '0 2px 16px rgba(0,0,0,0.05)',
// //     textAlign: 'center',
// //   },
// //   cardTitle: {
// //     fontSize: '19px',
// //     fontWeight: 700,
// //     color: '#111',
// //     marginBottom: '10px',
// //   },
// //   cardSub: {
// //     fontSize: '13px',
// //     color: '#888',
// //     lineHeight: 1.65,
// //     maxWidth: '300px',
// //     margin: '0 auto 32px',
// //   },
// //   otpInputs: {
// //     display: 'flex',
// //     gap: '10px',
// //     justifyContent: 'center',
// //     marginBottom: '32px',
// //   },
// //   btnVerify: {
// //     width: '100%',
// //     padding: '14px',
// //     background: '#3ecf5c',
// //     border: 'none',
// //     borderRadius: '10px',
// //     fontSize: '15px',
// //     fontWeight: 600,
// //     color: '#fff',
// //     cursor: 'pointer',
// //     marginBottom: '16px',
// //     fontFamily: "'DM Sans', sans-serif",
// //     transition: 'background 0.2s, transform 0.1s, opacity 0.2s',
// //   },
// //   resend: {
// //     fontSize: '12px',
// //     fontWeight: 600,
// //     letterSpacing: '1.2px',
// //     textTransform: 'uppercase',
// //     color: '#888',
// //     cursor: 'pointer',
// //     background: 'none',
// //     border: 'none',
// //     fontFamily: "'DM Sans', sans-serif",
// //     transition: 'color 0.2s',
// //   },
// // };

// // export default function VerifyOTP() {
// //   const location = useLocation();
// //   const navigate = useNavigate();
// //   const adminId = location.state?.adminId;

// //   const [digits, setDigits] = useState<string[]>(Array(OTP_LENGTH).fill(''));
// //   const [focusedIndex, setFocusedIndex] = useState<number | null>(null);
// //   const [loading, setLoading] = useState(false);
// //   const [resendLoading, setResendLoading] = useState(false);
// //   const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

// //   const focusInput = (index: number) => {
// //     const clamped = Math.max(0, Math.min(OTP_LENGTH - 1, index));
// //     inputRefs.current[clamped]?.focus();
// //   };

// //   const handleChange = (index: number, value: string) => {
// //     const clean = value.replace(/\D/g, '').slice(-1);
// //     const next = [...digits];
// //     next[index] = clean;
// //     setDigits(next);
// //     if (clean && index < OTP_LENGTH - 1) {
// //       focusInput(index + 1);
// //     }
// //   };

// //   const handleKeyDown = (index: number, e: KeyboardEvent<HTMLInputElement>) => {
// //     if (e.key === 'Backspace') {
// //       if (digits[index]) {
// //         const next = [...digits];
// //         next[index] = '';
// //         setDigits(next);
// //       } else if (index > 0) {
// //         focusInput(index - 1);
// //         const next = [...digits];
// //         next[index - 1] = '';
// //         setDigits(next);
// //       }
// //       e.preventDefault();
// //     } else if (e.key === 'ArrowLeft' && index > 0) {
// //       focusInput(index - 1);
// //     } else if (e.key === 'ArrowRight' && index < OTP_LENGTH - 1) {
// //       focusInput(index + 1);
// //     } else if (e.key === 'Enter') {
// //       handleVerify();
// //     }
// //   };

// //   const handlePaste = (e: ClipboardEvent<HTMLInputElement>) => {
// //     e.preventDefault();
// //     const pasted = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, OTP_LENGTH);
// //     if (!pasted) return;
// //     const next = Array(OTP_LENGTH).fill('');
// //     pasted.split('').forEach((ch, i) => { next[i] = ch; });
// //     setDigits(next);
// //     focusInput(Math.min(pasted.length, OTP_LENGTH - 1));
// //   };

// //   const otp = digits.join('');

// //   const handleVerify = async () => {
// //     if (otp.length < OTP_LENGTH) return;
// //     try {
// //       setLoading(true);
// //       const res = await verifyOTP({ adminId, otp });
// //       localStorage.setItem('adminToken', res.accessToken);
// //       navigate('/dashboard');
// //     } catch (err: any) {
// //       alert(err.response?.data?.message || 'Invalid OTP');
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   const handleResendOTP = async () => {
// //     try {
// //       setResendLoading(true);
// //       await resendOTP({ adminId });
// //       setDigits(Array(OTP_LENGTH).fill(''));
// //       focusInput(0);
// //       alert('A new OTP has been sent to your email!');
// //     } catch (err: any) {
// //       alert(err.response?.data?.message || 'Failed to resend OTP');
// //     } finally {
// //       setResendLoading(false);
// //     }
// //   };

// //   const isComplete = otp.length === OTP_LENGTH;

// //   return (
// //     <>
// //       <link
// //         href="https://fonts.googleapis.com/css2?family=DM+Sans:opsz,wght@9..40,400;9..40,500;9..40,600;9..40,700&family=JetBrains+Mono:wght@600&display=swap"
// //         rel="stylesheet"
// //       />
// //       <style>{`
// //         .otp-digit {
// //           width: 52px;
// //           height: 56px;
// //           border-radius: 10px;
// //           background: #e8ede8;
// //           border: 2px solid transparent;
// //           font-family: 'JetBrains Mono', monospace;
// //           font-size: 18px;
// //           font-weight: 600;
// //           color: #1a1a1a;
// //           text-align: center;
// //           outline: none;
// //           transition: border-color 0.2s, background 0.2s, transform 0.15s;
// //           caret-color: #27ae60;
// //           cursor: pointer;
// //         }
// //         .otp-digit:focus {
// //           background: #fff;
// //           border-color: #27ae60;
// //           transform: scale(1.04);
// //         }
// //         .otp-digit.filled {
// //           background: #f0faf5;
// //           border-color: #b2dfcc;
// //           color: #27ae60;
// //         }
// //         .btn-verify:hover:not(:disabled) {
// //           background: #27ae60 !important;
// //         }
// //         .btn-verify:active:not(:disabled) {
// //           transform: scale(0.98) !important;
// //         }
// //         .btn-verify:disabled {
// //           opacity: 0.65;
// //           cursor: not-allowed;
// //         }
// //         .resend-btn:hover:not(:disabled) {
// //           color: #27ae60 !important;
// //         }
// //         .resend-btn:disabled {
// //           opacity: 0.5;
// //           cursor: not-allowed;
// //         }
// //         @media (max-width: 480px) {
// //           .gp-card { padding: 28px 18px !important; }
// //           .otp-digit { width: 42px !important; height: 48px !important; font-size: 16px !important; }
// //           .otp-inputs { gap: 7px !important; }
// //         }
// //       `}</style>

// //       <div style={styles.body}>
// //         <div style={styles.brand}>
// //           <GiftposeLogo />
// //           <div style={styles.brandName}>Giftpose Admin Panel</div>
// //         </div>

// //         <div className="gp-card" style={styles.card}>
// //           <div style={styles.cardTitle}>Verify Your Identity</div>
// //           <p style={styles.cardSub}>
// //             To maintain institutional-grade security, please enter the 6-digit code from your
// //             preferred authenticator app.
// //           </p>

// //           <div className="otp-inputs" style={styles.otpInputs}>
// //             {digits.map((digit, i) => (
// //               <input
// //                 key={i}
// //                 ref={(el) => { inputRefs.current[i] = el; }}
// //                 className={`otp-digit${digit ? ' filled' : ''}`}
// //                 type="text"
// //                 inputMode="numeric"
// //                 maxLength={1}
// //                 value={digit}
// //                 onChange={(e) => handleChange(i, e.target.value)}
// //                 onKeyDown={(e) => handleKeyDown(i, e)}
// //                 onFocus={() => setFocusedIndex(i)}
// //                 onBlur={() => setFocusedIndex(null)}
// //                 onPaste={handlePaste}
// //                 autoComplete={i === 0 ? 'one-time-code' : 'off'}
// //                 aria-label={`OTP digit ${i + 1}`}
// //               />
// //             ))}
// //           </div>

// //           <button
// //             className="btn-verify"
// //             style={{
// //               ...styles.btnVerify,
// //               background: isComplete && !loading ? '#3ecf5c' : '#27ae60',
// //               opacity: (!isComplete || loading) ? 0.65 : 1,
// //               cursor: (!isComplete || loading) ? 'not-allowed' : 'pointer',
// //             }}
// //             onClick={handleVerify}
// //             disabled={loading || !isComplete}
// //           >
// //             {loading ? 'Verifying…' : 'Verify and continue'}
// //           </button>

// //           <button
// //             className="resend-btn"
// //             style={styles.resend}
// //             onClick={handleResendOTP}
// //             disabled={resendLoading}
// //           >
// //             {resendLoading ? 'Resending…' : 'Resend Code'}
// //           </button>
// //         </div>
// //       </div>
// //     </>
// //   );
// // }



// // import { useState, useRef, useEffect, KeyboardEvent, ClipboardEvent } from 'react';
// import { useState, useRef, useEffect } from 'react';
// import type { KeyboardEvent, ClipboardEvent } from 'react';

// import { useLocation, useNavigate } from 'react-router-dom';
// import { verifyOTP, resendOTP } from '../api/admin.api';
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
//     <rect x="26.2" y="26" width="3.6" height="19" fill="#1a7a42" opacity=".55" />
//   </svg>
// );

// const OTP_LENGTH = 6;

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
//     textAlign: 'center',
//   },
//   cardTitle: {
//     fontSize: '19px',
//     fontWeight: 700,
//     color: '#111',
//     marginBottom: '10px',
//   },
//   cardSub: {
//     fontSize: '13px',
//     color: '#888',
//     lineHeight: 1.65,
//     maxWidth: '300px',
//     margin: '0 auto 32px',
//   },
//   otpInputs: {
//     display: 'flex',
//     gap: '10px',
//     justifyContent: 'center',
//     marginBottom: '32px',
//   },
//   btnVerify: {
//     width: '100%',
//     padding: '14px',
//     background: '#3ecf5c',
//     border: 'none',
//     borderRadius: '10px',
//     fontSize: '15px',
//     fontWeight: 600,
//     color: '#fff',
//     cursor: 'pointer',
//     marginBottom: '16px',
//     fontFamily: "'DM Sans', sans-serif",
//     transition: 'background 0.2s, transform 0.1s, opacity 0.2s',
//   },
//   resend: {
//     fontSize: '12px',
//     fontWeight: 600,
//     letterSpacing: '1.2px',
//     textTransform: 'uppercase',
//     color: '#888',
//     cursor: 'pointer',
//     background: 'none',
//     border: 'none',
//     fontFamily: "'DM Sans', sans-serif",
//     transition: 'color 0.2s',
//   },
// };

// export default function VerifyOTP() {
//   const location = useLocation();
//   const navigate = useNavigate();
//   const { login } = useAuth();
//   const adminId   = location.state?.adminId;

//   const [digits, setDigits]           = useState<string[]>(Array(OTP_LENGTH).fill(''));
//   const [focusedIndex, setFocusedIndex] = useState<number | null>(null);
//   const [loading, setLoading]         = useState(false);
//   const [resendLoading, setResendLoading] = useState(false);
//   const [error, setError]             = useState('');
//   const [resendMsg, setResendMsg]     = useState('');
//   const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

//   /* Guard: if someone navigates here directly without going through login */
//   useEffect(() => {
//     if (!adminId) navigate('/login', { replace: true });
//   }, [adminId, navigate]);

//   const focusInput = (index: number) => {
//     const clamped = Math.max(0, Math.min(OTP_LENGTH - 1, index));
//     inputRefs.current[clamped]?.focus();
//   };

//   const handleChange = (index: number, value: string) => {
//     const clean = value.replace(/\D/g, '').slice(-1);
//     const next = [...digits];
//     next[index] = clean;
//     setDigits(next);
//     if (clean && index < OTP_LENGTH - 1) {
//       focusInput(index + 1);
//     }
//   };

//   const handleKeyDown = (index: number, e: KeyboardEvent<HTMLInputElement>) => {
//     if (e.key === 'Backspace') {
//       if (digits[index]) {
//         const next = [...digits];
//         next[index] = '';
//         setDigits(next);
//       } else if (index > 0) {
//         focusInput(index - 1);
//         const next = [...digits];
//         next[index - 1] = '';
//         setDigits(next);
//       }
//       e.preventDefault();
//     } else if (e.key === 'ArrowLeft' && index > 0) {
//       focusInput(index - 1);
//     } else if (e.key === 'ArrowRight' && index < OTP_LENGTH - 1) {
//       focusInput(index + 1);
//     } else if (e.key === 'Enter') {
//       handleVerify();
//     }
//   };

//   const handlePaste = (e: ClipboardEvent<HTMLInputElement>) => {
//     e.preventDefault();
//     const pasted = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, OTP_LENGTH);
//     if (!pasted) return;
//     const next = Array(OTP_LENGTH).fill('');
//     pasted.split('').forEach((ch, i) => { next[i] = ch; });
//     setDigits(next);
//     focusInput(Math.min(pasted.length, OTP_LENGTH - 1));
//   };

//   const otp = digits.join('');

//   const handleVerify = async () => {
//     if (otp.length < OTP_LENGTH) return;
//     setError('');
//     try {
//       setLoading(true);
//       const res = await verifyOTP({ adminId, otp });
//       // Hand tokens to AuthContext — it fetches /me and sets global admin state
//       await login(res.accessToken, '');
//       navigate('/dashboard', { replace: true });
//     } catch (err: any) {
//       setError(err.response?.data?.message || 'Invalid OTP. Please try again.');
//       // Shake and clear digits on wrong OTP
//       setDigits(Array(OTP_LENGTH).fill(''));
//       setTimeout(() => focusInput(0), 50);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleResendOTP = async () => {
//     setError('');
//     setResendMsg('');
//     try {
//       setResendLoading(true);
//       await resendOTP({ adminId });
//       setDigits(Array(OTP_LENGTH).fill(''));
//       focusInput(0);
//       setResendMsg('A new code has been sent to your email.');
//     } catch (err: any) {
//       setError(err.response?.data?.message || 'Failed to resend code.');
//     } finally {
//       setResendLoading(false);
//     }
//   };

//   const isComplete = otp.length === OTP_LENGTH;

//   return (
//     <>
//       <link
//         href="https://fonts.googleapis.com/css2?family=DM+Sans:opsz,wght@9..40,400;9..40,500;9..40,600;9..40,700&family=JetBrains+Mono:wght@600&display=swap"
//         rel="stylesheet"
//       />
//       <style>{`
//         .otp-digit {
//           width: 52px;
//           height: 56px;
//           border-radius: 10px;
//           background: #e8ede8;
//           border: 2px solid transparent;
//           font-family: 'JetBrains Mono', monospace;
//           font-size: 18px;
//           font-weight: 600;
//           color: #1a1a1a;
//           text-align: center;
//           outline: none;
//           transition: border-color 0.2s, background 0.2s, transform 0.15s;
//           caret-color: #27ae60;
//           cursor: pointer;
//         }
//         .otp-digit:focus {
//           background: #fff;
//           border-color: #27ae60;
//           transform: scale(1.04);
//         }
//         .otp-digit.filled {
//           background: #f0faf5;
//           border-color: #b2dfcc;
//           color: #27ae60;
//         }
//         .btn-verify:hover:not(:disabled) {
//           background: #27ae60 !important;
//         }
//         .btn-verify:active:not(:disabled) {
//           transform: scale(0.98) !important;
//         }
//         .btn-verify:disabled {
//           opacity: 0.65;
//           cursor: not-allowed;
//         }
//         .resend-btn:hover:not(:disabled) {
//           color: #27ae60 !important;
//         }
//         .resend-btn:disabled {
//           opacity: 0.5;
//           cursor: not-allowed;
//         }
//         @media (max-width: 480px) {
//           .gp-card { padding: 28px 18px !important; }
//           .otp-digit { width: 42px !important; height: 48px !important; font-size: 16px !important; }
//           .otp-inputs { gap: 7px !important; }
//         }
//       `}</style>

//       <div style={styles.body}>
//         <div style={styles.brand}>
//           <GiftposeLogo />
//           <div style={styles.brandName}>Giftpose Admin Panel</div>
//         </div>

//         <div className="gp-card" style={styles.card}>
//           <div style={styles.cardTitle}>Verify Your Identity</div>
//           <p style={styles.cardSub}>
//             To maintain institutional-grade security, please enter the 6-digit code from your
//             preferred authenticator app.
//           </p>

//           <div className="otp-inputs" style={styles.otpInputs}>
//             {digits.map((digit, i) => (
//               <input
//                 key={i}
//                 ref={(el) => { inputRefs.current[i] = el; }}
//                 className={`otp-digit${digit ? ' filled' : ''}`}
//                 type="text"
//                 inputMode="numeric"
//                 maxLength={1}
//                 value={digit}
//                 onChange={(e) => handleChange(i, e.target.value)}
//                 onKeyDown={(e) => handleKeyDown(i, e)}
//                 onFocus={() => setFocusedIndex(i)}
//                 onBlur={() => setFocusedIndex(null)}
//                 onPaste={handlePaste}
//                 autoComplete={i === 0 ? 'one-time-code' : 'off'}
//                 aria-label={`OTP digit ${i + 1}`}
//               />
//             ))}
//           </div>

//           {/* Error message */}
//           {error && (
//             <div style={{ background:'#fef2f2', border:'1.5px solid #fecaca', borderRadius:9, padding:'9px 14px', fontSize:13, color:'#dc2626', marginBottom:14, display:'flex', alignItems:'center', gap:7, textAlign:'left' }}>
//               <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{flexShrink:0}}>
//                 <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
//               </svg>
//               {error}
//             </div>
//           )}

//           {/* Resend success message */}
//           {resendMsg && !error && (
//             <div style={{ background:'#e8f7ef', border:'1.5px solid #b2dfcc', borderRadius:9, padding:'9px 14px', fontSize:13, color:'#27ae60', marginBottom:14, display:'flex', alignItems:'center', gap:7, textAlign:'left' }}>
//               <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{flexShrink:0}}>
//                 <path d="M22 11.08V12a10 10 0 11-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/>
//               </svg>
//               {resendMsg}
//             </div>
//           )}

//           <button
//             className="btn-verify"
//             style={{
//               ...styles.btnVerify,
//               background: isComplete && !loading ? '#3ecf5c' : '#27ae60',
//               opacity: (!isComplete || loading) ? 0.65 : 1,
//               cursor: (!isComplete || loading) ? 'not-allowed' : 'pointer',
//             }}
//             onClick={handleVerify}
//             disabled={loading || !isComplete}
//           >
//             {loading ? 'Verifying…' : 'Verify and continue'}
//           </button>

//           <button
//             className="resend-btn"
//             style={styles.resend}
//             onClick={handleResendOTP}
//             disabled={resendLoading}
//           >
//             {resendLoading ? 'Resending…' : 'Resend Code'}
//           </button>
//         </div>
//       </div>
//     </>
//   );
// }



// import { useState, useRef, useEffect, KeyboardEvent, ClipboardEvent } from 'react';

// import { useState, useRef, useEffect } from 'react';
// import type { KeyboardEvent, ClipboardEvent } from 'react';
// import { useLocation, useNavigate } from 'react-router-dom';
// import { verifyOTP, resendOTP } from '../api/admin.api';
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
//     <rect x="26.2" y="26" width="3.6" height="19" fill="#1a7a42" opacity=".55" />
//   </svg>
// );

// const OTP_LENGTH = 6;

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
//     textAlign: 'center',
//   },
//   cardTitle: {
//     fontSize: '19px',
//     fontWeight: 700,
//     color: '#111',
//     marginBottom: '10px',
//   },
//   cardSub: {
//     fontSize: '13px',
//     color: '#888',
//     lineHeight: 1.65,
//     maxWidth: '300px',
//     margin: '0 auto 32px',
//   },
//   otpInputs: {
//     display: 'flex',
//     gap: '10px',
//     justifyContent: 'center',
//     marginBottom: '32px',
//   },
//   btnVerify: {
//     width: '100%',
//     padding: '14px',
//     background: '#3ecf5c',
//     border: 'none',
//     borderRadius: '10px',
//     fontSize: '15px',
//     fontWeight: 600,
//     color: '#fff',
//     cursor: 'pointer',
//     marginBottom: '16px',
//     fontFamily: "'DM Sans', sans-serif",
//     transition: 'background 0.2s, transform 0.1s, opacity 0.2s',
//   },
//   resend: {
//     fontSize: '12px',
//     fontWeight: 600,
//     letterSpacing: '1.2px',
//     textTransform: 'uppercase',
//     color: '#888',
//     cursor: 'pointer',
//     background: 'none',
//     border: 'none',
//     fontFamily: "'DM Sans', sans-serif",
//     transition: 'color 0.2s',
//   },
// };

// export default function VerifyOTP() {
//   const location = useLocation();
//   const navigate = useNavigate();
//   const { login } = useAuth();
//   const adminId   = location.state?.adminId;

//   const [digits, setDigits]           = useState<string[]>(Array(OTP_LENGTH).fill(''));
//   const [focusedIndex, setFocusedIndex] = useState<number | null>(null);
//   const [loading, setLoading]         = useState(false);
//   const [resendLoading, setResendLoading] = useState(false);
//   const [error, setError]             = useState('');
//   const [resendMsg, setResendMsg]     = useState('');
//   const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

//   /* Guard: if someone navigates here directly without going through login */
//   useEffect(() => {
//     if (!adminId) navigate('/login', { replace: true });
//   }, [adminId, navigate]);

//   const focusInput = (index: number) => {
//     const clamped = Math.max(0, Math.min(OTP_LENGTH - 1, index));
//     inputRefs.current[clamped]?.focus();
//   };

//   const handleChange = (index: number, value: string) => {
//     const clean = value.replace(/\D/g, '').slice(-1);
//     const next = [...digits];
//     next[index] = clean;
//     setDigits(next);
//     if (clean && index < OTP_LENGTH - 1) {
//       focusInput(index + 1);
//     }
//   };

//   const handleKeyDown = (index: number, e: KeyboardEvent<HTMLInputElement>) => {
//     if (e.key === 'Backspace') {
//       if (digits[index]) {
//         const next = [...digits];
//         next[index] = '';
//         setDigits(next);
//       } else if (index > 0) {
//         focusInput(index - 1);
//         const next = [...digits];
//         next[index - 1] = '';
//         setDigits(next);
//       }
//       e.preventDefault();
//     } else if (e.key === 'ArrowLeft' && index > 0) {
//       focusInput(index - 1);
//     } else if (e.key === 'ArrowRight' && index < OTP_LENGTH - 1) {
//       focusInput(index + 1);
//     } else if (e.key === 'Enter') {
//       handleVerify();
//     }
//   };

//   const handlePaste = (e: ClipboardEvent<HTMLInputElement>) => {
//     e.preventDefault();
//     const pasted = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, OTP_LENGTH);
//     if (!pasted) return;
//     const next = Array(OTP_LENGTH).fill('');
//     pasted.split('').forEach((ch, i) => { next[i] = ch; });
//     setDigits(next);
//     focusInput(Math.min(pasted.length, OTP_LENGTH - 1));
//   };

//   const otp = digits.join('');

//   const handleVerify = async () => {
//     if (otp.length < OTP_LENGTH) return;
//     setError('');
//     try {
//       setLoading(true);
//       const res = await verifyOTP({ adminId, otp });
//       // OTP response carries the full session tokens — hand them to AuthContext
//       await login(res.accessToken, res.refreshToken);
//       navigate('/dashboard', { replace: true });
//     } catch (err: any) {
//       setError(err.response?.data?.message || 'Invalid OTP. Please try again.');
//       // Shake and clear digits on wrong OTP
//       setDigits(Array(OTP_LENGTH).fill(''));
//       setTimeout(() => focusInput(0), 50);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleResendOTP = async () => {
//     setError('');
//     setResendMsg('');
//     try {
//       setResendLoading(true);
//       await resendOTP({ adminId });
//       setDigits(Array(OTP_LENGTH).fill(''));
//       focusInput(0);
//       setResendMsg('A new code has been sent to your email.');
//     } catch (err: any) {
//       setError(err.response?.data?.message || 'Failed to resend code.');
//     } finally {
//       setResendLoading(false);
//     }
//   };

//   const isComplete = otp.length === OTP_LENGTH;

//   return (
//     <>
//       <link
//         href="https://fonts.googleapis.com/css2?family=DM+Sans:opsz,wght@9..40,400;9..40,500;9..40,600;9..40,700&family=JetBrains+Mono:wght@600&display=swap"
//         rel="stylesheet"
//       />
//       <style>{`
//         .otp-digit {
//           width: 52px;
//           height: 56px;
//           border-radius: 10px;
//           background: #e8ede8;
//           border: 2px solid transparent;
//           font-family: 'JetBrains Mono', monospace;
//           font-size: 18px;
//           font-weight: 600;
//           color: #1a1a1a;
//           text-align: center;
//           outline: none;
//           transition: border-color 0.2s, background 0.2s, transform 0.15s;
//           caret-color: #27ae60;
//           cursor: pointer;
//         }
//         .otp-digit:focus {
//           background: #fff;
//           border-color: #27ae60;
//           transform: scale(1.04);
//         }
//         .otp-digit.filled {
//           background: #f0faf5;
//           border-color: #b2dfcc;
//           color: #27ae60;
//         }
//         .btn-verify:hover:not(:disabled) {
//           background: #27ae60 !important;
//         }
//         .btn-verify:active:not(:disabled) {
//           transform: scale(0.98) !important;
//         }
//         .btn-verify:disabled {
//           opacity: 0.65;
//           cursor: not-allowed;
//         }
//         .resend-btn:hover:not(:disabled) {
//           color: #27ae60 !important;
//         }
//         .resend-btn:disabled {
//           opacity: 0.5;
//           cursor: not-allowed;
//         }
//         @media (max-width: 480px) {
//           .gp-card { padding: 28px 18px !important; }
//           .otp-digit { width: 42px !important; height: 48px !important; font-size: 16px !important; }
//           .otp-inputs { gap: 7px !important; }
//         }
//       `}</style>

//       <div style={styles.body}>
//         <div style={styles.brand}>
//           <GiftposeLogo />
//           <div style={styles.brandName}>Giftpose Admin Panel</div>
//         </div>

//         <div className="gp-card" style={styles.card}>
//           <div style={styles.cardTitle}>Verify Your Identity</div>
//           <p style={styles.cardSub}>
//             To maintain institutional-grade security, please enter the 6-digit code from your
//             preferred authenticator app.
//           </p>

//           <div className="otp-inputs" style={styles.otpInputs}>
//             {digits.map((digit, i) => (
//               <input
//                 key={i}
//                 ref={(el) => { inputRefs.current[i] = el; }}
//                 className={`otp-digit${digit ? ' filled' : ''}`}
//                 type="text"
//                 inputMode="numeric"
//                 maxLength={1}
//                 value={digit}
//                 onChange={(e) => handleChange(i, e.target.value)}
//                 onKeyDown={(e) => handleKeyDown(i, e)}
//                 onFocus={() => setFocusedIndex(i)}
//                 onBlur={() => setFocusedIndex(null)}
//                 onPaste={handlePaste}
//                 autoComplete={i === 0 ? 'one-time-code' : 'off'}
//                 aria-label={`OTP digit ${i + 1}`}
//               />
//             ))}
//           </div>

//           {/* Error message */}
//           {error && (
//             <div style={{ background:'#fef2f2', border:'1.5px solid #fecaca', borderRadius:9, padding:'9px 14px', fontSize:13, color:'#dc2626', marginBottom:14, display:'flex', alignItems:'center', gap:7, textAlign:'left' }}>
//               <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{flexShrink:0}}>
//                 <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
//               </svg>
//               {error}
//             </div>
//           )}

//           {/* Resend success message */}
//           {resendMsg && !error && (
//             <div style={{ background:'#e8f7ef', border:'1.5px solid #b2dfcc', borderRadius:9, padding:'9px 14px', fontSize:13, color:'#27ae60', marginBottom:14, display:'flex', alignItems:'center', gap:7, textAlign:'left' }}>
//               <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{flexShrink:0}}>
//                 <path d="M22 11.08V12a10 10 0 11-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/>
//               </svg>
//               {resendMsg}
//             </div>
//           )}

//           <button
//             className="btn-verify"
//             style={{
//               ...styles.btnVerify,
//               background: isComplete && !loading ? '#3ecf5c' : '#27ae60',
//               opacity: (!isComplete || loading) ? 0.65 : 1,
//               cursor: (!isComplete || loading) ? 'not-allowed' : 'pointer',
//             }}
//             onClick={handleVerify}
//             disabled={loading || !isComplete}
//           >
//             {loading ? 'Verifying…' : 'Verify and continue'}
//           </button>

//           <button
//             className="resend-btn"
//             style={styles.resend}
//             onClick={handleResendOTP}
//             disabled={resendLoading}
//           >
//             {resendLoading ? 'Resending…' : 'Resend Code'}
//           </button>
//         </div>
//       </div>
//     </>
//   );
// }




// import { useState, useRef, useEffect, KeyboardEvent, ClipboardEvent } from 'react';
import { useState, useRef, useEffect } from 'react';
import type { KeyboardEvent, ClipboardEvent } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { verifyOTP, resendOTP } from '../api/admin.api';
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
    <rect x="26.2" y="26" width="3.6" height="19" fill="#1a7a42" opacity=".55" />
  </svg>
);

const OTP_LENGTH = 6;

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
    textAlign: 'center',
  },
  cardTitle: {
    fontSize: '19px',
    fontWeight: 700,
    color: '#111',
    marginBottom: '10px',
  },
  cardSub: {
    fontSize: '13px',
    color: '#888',
    lineHeight: 1.65,
    maxWidth: '300px',
    margin: '0 auto 32px',
  },
  otpInputs: {
    display: 'flex',
    gap: '10px',
    justifyContent: 'center',
    marginBottom: '32px',
  },
  btnVerify: {
    width: '100%',
    padding: '14px',
    background: '#3ecf5c',
    border: 'none',
    borderRadius: '10px',
    fontSize: '15px',
    fontWeight: 600,
    color: '#fff',
    cursor: 'pointer',
    marginBottom: '16px',
    fontFamily: "'DM Sans', sans-serif",
    transition: 'background 0.2s, transform 0.1s, opacity 0.2s',
  },
  resend: {
    fontSize: '12px',
    fontWeight: 600,
    letterSpacing: '1.2px',
    textTransform: 'uppercase',
    color: '#888',
    cursor: 'pointer',
    background: 'none',
    border: 'none',
    fontFamily: "'DM Sans', sans-serif",
    transition: 'color 0.2s',
  },
};

export default function VerifyOTP() {
  const location = useLocation();
  const navigate = useNavigate();
  const { login } = useAuth();
  const adminId   = location.state?.adminId;

  const [digits, setDigits]           = useState<string[]>(Array(OTP_LENGTH).fill(''));
  const [loading, setLoading]         = useState(false);
  const [resendLoading, setResendLoading] = useState(false);
  const [error, setError]             = useState('');
  const [resendMsg, setResendMsg]     = useState('');
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  /* Guard: if someone navigates here directly without going through login */
  useEffect(() => {
    if (!adminId) navigate('/login', { replace: true });
  }, [adminId, navigate]);

  const focusInput = (index: number) => {
    const clamped = Math.max(0, Math.min(OTP_LENGTH - 1, index));
    inputRefs.current[clamped]?.focus();
  };

  const handleChange = (index: number, value: string) => {
    const clean = value.replace(/\D/g, '').slice(-1);
    const next = [...digits];
    next[index] = clean;
    setDigits(next);
    if (clean && index < OTP_LENGTH - 1) {
      focusInput(index + 1);
    }
  };

  const handleKeyDown = (index: number, e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace') {
      if (digits[index]) {
        const next = [...digits];
        next[index] = '';
        setDigits(next);
      } else if (index > 0) {
        focusInput(index - 1);
        const next = [...digits];
        next[index - 1] = '';
        setDigits(next);
      }
      e.preventDefault();
    } else if (e.key === 'ArrowLeft' && index > 0) {
      focusInput(index - 1);
    } else if (e.key === 'ArrowRight' && index < OTP_LENGTH - 1) {
      focusInput(index + 1);
    } else if (e.key === 'Enter') {
      handleVerify();
    }
  };

  const handlePaste = (e: ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pasted = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, OTP_LENGTH);
    if (!pasted) return;
    const next = Array(OTP_LENGTH).fill('');
    pasted.split('').forEach((ch, i) => { next[i] = ch; });
    setDigits(next);
    focusInput(Math.min(pasted.length, OTP_LENGTH - 1));
  };

  const otp = digits.join('');

  const handleVerify = async () => {
    if (otp.length < OTP_LENGTH) return;
    setError('');
    try {
      setLoading(true);
      const res = await verifyOTP({ adminId, otp });
      // OTP response carries the full session tokens — hand them to AuthContext
      await login(res.accessToken, res.refreshToken);
      navigate('/dashboard', { replace: true });
    } catch (err: any) {
      setError(err.response?.data?.message || 'Invalid OTP. Please try again.');
      // Shake and clear digits on wrong OTP
      setDigits(Array(OTP_LENGTH).fill(''));
      setTimeout(() => focusInput(0), 50);
    } finally {
      setLoading(false);
    }
  };

  const handleResendOTP = async () => {
    setError('');
    setResendMsg('');
    try {
      setResendLoading(true);
      await resendOTP({ adminId });
      setDigits(Array(OTP_LENGTH).fill(''));
      focusInput(0);
      setResendMsg('A new code has been sent to your email.');
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to resend code.');
    } finally {
      setResendLoading(false);
    }
  };

  const isComplete = otp.length === OTP_LENGTH;

  return (
    <>
      <link
        href="https://fonts.googleapis.com/css2?family=DM+Sans:opsz,wght@9..40,400;9..40,500;9..40,600;9..40,700&family=JetBrains+Mono:wght@600&display=swap"
        rel="stylesheet"
      />
      <style>{`
        .otp-digit {
          width: 52px;
          height: 56px;
          border-radius: 10px;
          background: #e8ede8;
          border: 2px solid transparent;
          font-family: 'JetBrains Mono', monospace;
          font-size: 18px;
          font-weight: 600;
          color: #1a1a1a;
          text-align: center;
          outline: none;
          transition: border-color 0.2s, background 0.2s, transform 0.15s;
          caret-color: #27ae60;
          cursor: pointer;
        }
        .otp-digit:focus {
          background: #fff;
          border-color: #27ae60;
          transform: scale(1.04);
        }
        .otp-digit.filled {
          background: #f0faf5;
          border-color: #b2dfcc;
          color: #27ae60;
        }
        .btn-verify:hover:not(:disabled) {
          background: #27ae60 !important;
        }
        .btn-verify:active:not(:disabled) {
          transform: scale(0.98) !important;
        }
        .btn-verify:disabled {
          opacity: 0.65;
          cursor: not-allowed;
        }
        .resend-btn:hover:not(:disabled) {
          color: #27ae60 !important;
        }
        .resend-btn:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }
        @media (max-width: 480px) {
          .gp-card { padding: 28px 18px !important; }
          .otp-digit { width: 42px !important; height: 48px !important; font-size: 16px !important; }
          .otp-inputs { gap: 7px !important; }
        }
      `}</style>

      <div style={styles.body}>
        <div style={styles.brand}>
          <GiftposeLogo />
          <div style={styles.brandName}>Giftpose Admin Panel</div>
        </div>

        <div className="gp-card" style={styles.card}>
          <div style={styles.cardTitle}>Verify Your Identity</div>
          <p style={styles.cardSub}>
            To maintain institutional-grade security, please enter the 6-digit code from your
            preferred authenticator app.
          </p>

          <div className="otp-inputs" style={styles.otpInputs}>
            {digits.map((digit, i) => (
              <input
                key={i}
                ref={(el) => { inputRefs.current[i] = el; }}
                className={`otp-digit${digit ? ' filled' : ''}`}
                type="text"
                inputMode="numeric"
                maxLength={1}
                value={digit}
                onChange={(e) => handleChange(i, e.target.value)}
                onKeyDown={(e) => handleKeyDown(i, e)}
                onPaste={handlePaste}
                autoComplete={i === 0 ? 'one-time-code' : 'off'}
                aria-label={`OTP digit ${i + 1}`}
              />
            ))}
          </div>

          {/* Error message */}
          {error && (
            <div style={{ background:'#fef2f2', border:'1.5px solid #fecaca', borderRadius:9, padding:'9px 14px', fontSize:13, color:'#dc2626', marginBottom:14, display:'flex', alignItems:'center', gap:7, textAlign:'left' }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{flexShrink:0}}>
                <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
              </svg>
              {error}
            </div>
          )}

          {/* Resend success message */}
          {resendMsg && !error && (
            <div style={{ background:'#e8f7ef', border:'1.5px solid #b2dfcc', borderRadius:9, padding:'9px 14px', fontSize:13, color:'#27ae60', marginBottom:14, display:'flex', alignItems:'center', gap:7, textAlign:'left' }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{flexShrink:0}}>
                <path d="M22 11.08V12a10 10 0 11-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/>
              </svg>
              {resendMsg}
            </div>
          )}

          <button
            className="btn-verify"
            style={{
              ...styles.btnVerify,
              background: isComplete && !loading ? '#3ecf5c' : '#27ae60',
              opacity: (!isComplete || loading) ? 0.65 : 1,
              cursor: (!isComplete || loading) ? 'not-allowed' : 'pointer',
            }}
            onClick={handleVerify}
            disabled={loading || !isComplete}
          >
            {loading ? 'Verifying…' : 'Verify and continue'}
          </button>

          <button
            className="resend-btn"
            style={styles.resend}
            onClick={handleResendOTP}
            disabled={resendLoading}
          >
            {resendLoading ? 'Resending…' : 'Resend Code'}
          </button>
        </div>
      </div>
    </>
  );
}

