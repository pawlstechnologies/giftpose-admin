import axios from 'axios';

/**
 * Many GiftPose endpoints wrap payloads as `{ success, data: T }`.
 * Auth used to read the envelope as if it were T, so adminId/tokens
 * came through as undefined.
 */
export function unwrapData<T>(body: unknown): T {
  if (body && typeof body === 'object' && 'data' in body) {
    const inner = (body as { data: unknown }).data;
    if (inner !== undefined && inner !== null) {
      return inner as T;
    }
  }
  return body as T;
}

function firstString(value: unknown): string | undefined {
  if (typeof value === 'string' && value.trim()) return value;
  if (Array.isArray(value) && typeof value[0] === 'string' && value[0].trim()) {
    return value[0];
  }
  return undefined;
}

export function getApiErrorMessage(err: unknown, fallback: string): string {
  if (axios.isAxiosError(err)) {
    const data = err.response?.data as Record<string, unknown> | undefined;
    const fromBody =
      firstString(data?.message) ??
      firstString(data?.error) ??
      firstString((data?.data as Record<string, unknown> | undefined)?.message);
    if (fromBody) return fromBody;
  }
  if (err instanceof Error && err.message) return err.message;
  return fallback;
}
