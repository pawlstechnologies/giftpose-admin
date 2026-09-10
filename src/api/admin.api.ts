
import httpClient from './httpClient';
import { unwrapData } from './unwrap';

// ─── Auth types ───────────────────────────────────────────────
export interface LoginPayload { email: string; password: string }
export interface LoginResponse { adminId: string }
export interface OtpPayload { adminId: string; otp: string }
export interface OtpResponse { accessToken: string; refreshToken: string; admin: { id: string; email: string; role: string } }
export interface AdminProfile { id: string; name: string; email: string; role: string; lastLogin: string }

// ─── Category types ───────────────────────────────────────────
export interface ApiCategory {
  _id: string; name: string; status: string;
  slug: string; created_at: string; updated_at: string;
}

export interface ApiTreeContent {
  _id: string; name: string; status: string; subcategoryId: string; slug: string;
}

export interface ApiTreeSubcategory {
  _id: string; name: string; status: string; categoryId: string; slug: string;
  contents: ApiTreeContent[];
}

export interface ApiTreeCategory {
  _id: string; name: string; status: string;
  subcategories: ApiTreeSubcategory[];
}


// ─── Activity log types ───────────────────────────────────────
export type DeviceType = 'desktop' | 'mobile' | 'tablet';
 
export interface ActivityLog {
  _id: string;
  adminId: string;
  adminEmail: string;
  /** e.g. "login" | "login_attempt" | "logout" | "update_category" | "create_category" */
  action: string;
  resource: string;
  resourceId: string;
  /** Human-readable description e.g. "Oluwatobi Solomon logged in successfully" */
  description: string;
  ipAddress: string;
  userAgent: string;
  /** e.g. "Chrome 149.0.0.0"  or "Unknown " */
  browser: string;
  /** e.g. "macOS 10.15.7"     or "Unknown " */
  os: string;
  deviceType: DeviceType;
  createdAt: string;
  updatedAt: string;
}
 
export interface ActivityLogsResponse {
  logs: ActivityLog[];
  total: number;
  page: number;
  pages: number;
}

type LooseRecord = Record<string, unknown>;

function asRecord(value: unknown): LooseRecord {
  return value && typeof value === 'object' ? (value as LooseRecord) : {};
}

function pickString(...values: unknown[]): string | undefined {
  for (const value of values) {
    if (typeof value === 'string' && value.trim()) return value;
  }
  return undefined;
}

function pickAdminId(data: unknown): string | undefined {
  const root = asRecord(data);
  const admin = asRecord(root.admin);
  return pickString(root.adminId, root.admin_id, admin.id, admin._id, root.id);
}

function pickTokens(data: unknown): { accessToken: string; refreshToken: string } {
  const root = asRecord(data);
  const accessToken = pickString(root.accessToken, root.access_token, root.token);
  const refreshToken = pickString(root.refreshToken, root.refresh_token) ?? '';
  if (!accessToken) {
    throw new Error('Auth response did not include an access token.');
  }
  return { accessToken, refreshToken };
}

function asAdminProfile(data: unknown): AdminProfile {
  const root = asRecord(data);
  const src = (!root.email && !root.name && root.admin) ? asRecord(root.admin) : root;
  return {
    id:        pickString(src.id, src._id) ?? '',
    name:      pickString(src.name, src.fullName, src.full_name) ?? '',
    email:     pickString(src.email) ?? '',
    role:      pickString(src.role) ?? '',
    lastLogin: pickString(src.lastLogin, src.last_login) ?? '',
  };
}

// ─── Auth ─────────────────────────────────────────────────────
export const adminLogin = (p: LoginPayload) =>
  httpClient.post('/admin/auth/login', p).then((r) => {
    const adminId = pickAdminId(unwrapData(r.data));
    if (!adminId) throw new Error('Login response did not include an admin id.');
    return { adminId } satisfies LoginResponse;
  });

export const verifyOTP = (p: OtpPayload) =>
  httpClient.post('/admin/auth/verify-otp', p).then((r) => {
    const data = unwrapData<LooseRecord>(r.data);
    const tokens = pickTokens(data);
    const admin = asRecord(data.admin);
    return {
      ...tokens,
      admin: {
        id:    pickString(admin.id, admin._id) ?? '',
        email: pickString(admin.email) ?? '',
        role:  pickString(admin.role) ?? '',
      },
    } satisfies OtpResponse;
  });

export const resendOTP = (p: { adminId: string }) =>
  httpClient.post('/admin/auth/resend-otp', p).then(() => undefined);

export const getAdminMe = () =>
  httpClient.get('/admin/auth/me').then((r) => asAdminProfile(unwrapData(r.data)));

export const adminLogout = (refreshToken?: string) =>
  httpClient.post('/admin/auth/logout', { refreshToken }).then(() => undefined);

// ─── Categories ───────────────────────────────────────────────
export const listCategories = () =>
  httpClient.get<{ success: boolean; data: ApiCategory[] }>('/categories').then(r => r.data);

export const getCategoryTree = (categoryId: string) =>
  httpClient.get<{ success: boolean; data: ApiTreeCategory }>(`/categories/tree?categoryId=${categoryId}`).then(r => r.data);

export const createCategory = (payload: { name: string; status: string }) =>
  httpClient.post<{ success: boolean; data: ApiCategory }>('/categories', payload).then(r => r.data);

// ─── Subcategories ────────────────────────────────────────────
export const createSubcategory = (payload: { name: string; categoryId: string; status: string }) =>
  httpClient.post<{ success: boolean; data: { _id: string; name: string } }>('/categories/subcategories', payload).then(r => r.data);

// ─── Content ──────────────────────────────────────────────────
export const createContent = (payload: { name: string; subcategoryId: string; status: string }) =>
  httpClient.post<{ success: boolean; data: { _id: string; name: string } }>('/categories/contents', payload).then(r => r.data);

export const getActivityLogs = (page = 1, limit = 10): Promise<ActivityLogsResponse> =>
  httpClient
    .get<ActivityLogsResponse>(`/admin/activity?page=${page}&limit=${limit}`)
    .then(r => r.data);
