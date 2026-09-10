/** Reject open redirects; keep post-login navigation inside the app. */
export function safeInternalPath(path: unknown, fallback = '/dashboard'): string {
  if (typeof path !== 'string') return fallback;
  if (!path.startsWith('/') || path.startsWith('//')) return fallback;
  if (path.startsWith('/login') || path.startsWith('/verify-otp')) return fallback;
  return path;
}
