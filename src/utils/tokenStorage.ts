/**
 * tokenStorage.ts
 * ─────────────────────────────────────────────────────────────────
 * Single source of truth for persisting auth tokens.
 * Using localStorage keeps the session alive across tabs/refreshes.
 * Never store tokens in React state — they'd be lost on refresh.
 */

const ACCESS_KEY  = 'gp_access_token';
const REFRESH_KEY = 'gp_refresh_token';

const OTP_ADMIN_KEY = 'gp_otp_admin_id';
const OTP_FROM_KEY  = 'gp_otp_from';
const OTP_EMAIL_KEY = 'gp_otp_email';

export const tokenStorage = {
  getAccess:  () => localStorage.getItem(ACCESS_KEY),
  getRefresh: () => localStorage.getItem(REFRESH_KEY),

  setTokens: (access: string, refresh: string) => {
    localStorage.setItem(ACCESS_KEY, access);
    localStorage.setItem(REFRESH_KEY, refresh);
  },

  clearTokens: () => {
    localStorage.removeItem(ACCESS_KEY);
    localStorage.removeItem(REFRESH_KEY);
  },

  hasSession: (): boolean =>
    Boolean(localStorage.getItem(ACCESS_KEY) || localStorage.getItem(REFRESH_KEY)),
};

/** Survives a refresh on /verify-otp (React Router location.state does not). */
export const otpStorage = {
  set: (adminId: string, from?: string, email?: string) => {
    sessionStorage.setItem(OTP_ADMIN_KEY, adminId);
    if (from) sessionStorage.setItem(OTP_FROM_KEY, from);
    else sessionStorage.removeItem(OTP_FROM_KEY);
    if (email) sessionStorage.setItem(OTP_EMAIL_KEY, email);
    else sessionStorage.removeItem(OTP_EMAIL_KEY);
  },

  getAdminId: () => sessionStorage.getItem(OTP_ADMIN_KEY),
  getFrom:    () => sessionStorage.getItem(OTP_FROM_KEY),
  getEmail:   () => sessionStorage.getItem(OTP_EMAIL_KEY),

  clear: () => {
    sessionStorage.removeItem(OTP_ADMIN_KEY);
    sessionStorage.removeItem(OTP_FROM_KEY);
    sessionStorage.removeItem(OTP_EMAIL_KEY);
  },
};
