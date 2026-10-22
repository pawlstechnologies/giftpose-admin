
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

// ─── Account Holders / Users ──────────────────────────────────
export type PlanStatus = 'PAID' | 'UNPAID';
export type DeviceTypeDisplay = 'Mobile (iOS)' | 'Mobile (Android)' | 'Desktop' | 'Tablet';

export interface AdminUserListItem {
  id: string;
  fullname: string;
  username: string;
  email: string;
  isVerified: boolean;
  avatarUrl?: string;
  postCode: string;
  location: string;
  primaryDevice: DeviceTypeDisplay;
  plan: PlanStatus;
  subscriptionStatus?: string;
  createdAt: string;
}

export interface AdminUserListResponse {
  users: AdminUserListItem[];
  pagination: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

export interface UserSubscriptionDetail {
  planType: string;
  status: string;
  price: string;
  renewalDate: string | null;
  cancelAtPeriodEnd?: boolean;
}

export interface UserItemInterest {
  id: string;
  name: string;
  category: string;
  subcategory: string;
  imageUrl?: string;
  type?: string;
}

export interface UserActivityItem {
  id: string;
  title: string;
  description: string;
  timestamp: string;
  type: 'view' | 'update' | 'auth' | 'subscription' | 'notification' | 'location' | 'other';
}

export interface AdminUserDetail {
  id: string;
  fullname: string;
  username: string;
  email: string;
  isVerified: boolean;
  avatarUrl?: string;
  deviceId?: string;
  createdAt?: string;
  location: {
    city: string;
    address?: string;
    postCode: string;
    miles?: number;
  };
  subscription: UserSubscriptionDetail;
  notificationPreferences: {
    activeKeywords: string[];
  };
  itemsOfInterest: UserItemInterest[];
  recentActivity: UserActivityItem[];
}

export type DashboardPeriod = 'today' | '7' | '30' | '60' | 'custom';

export interface DashboardStatCardData {
  label: string;
  value: string;
  badge: string;
  badgeVariant: 'pos' | 'neg';
  subtext?: string;
}

export interface DashboardChartBar {
  day: string;
  val: number;
  color: string;
}

export interface DashboardAsideStat {
  label: string;
  value: string;
  valColor: 'green' | 'red' | 'blue';
  subtext?: string;
}

export interface DashboardMetricItem {
  label: string;
  value: string;
  suffix?: string;
  accent?: boolean;
  red?: boolean;
}

export interface DashboardData {
  period: string;
  dateRange: {
    start: string;
    end: string;
  };
  statCards: DashboardStatCardData[];
  trafficChart: {
    title: string;
    subtitle: string;
    data: DashboardChartBar[];
  };
  asideStats: DashboardAsideStat[];
  donationMetrics: DashboardMetricItem[];
  requestMetrics: DashboardMetricItem[];
}

export const getDashboardData = (params?: {
  period?: DashboardPeriod | string;
  startDate?: string;
  endDate?: string;
}): Promise<DashboardData> => {
  const query = new URLSearchParams();
  if (params?.period) query.set('period', params.period);
  if (params?.startDate) query.set('startDate', params.startDate);
  if (params?.endDate) query.set('endDate', params.endDate);

  const qs = query.toString();
  return httpClient
    .get<{ success: boolean; data: DashboardData }>(`/admin/auth/dashboard${qs ? `?${qs}` : ''}`)
    .then(r => r.data.data);
};

export const getAccountHolders = (params?: {
  page?: number;
  limit?: number;
  search?: string;
  plan?: string;
}): Promise<AdminUserListResponse> => {
  const query = new URLSearchParams();
  if (params?.page) query.set('page', String(params.page));
  if (params?.limit) query.set('limit', String(params.limit));
  if (params?.search) query.set('search', params.search);
  if (params?.plan) query.set('plan', params.plan);

  const qs = query.toString();
  return httpClient
    .get<{ success: boolean; data: AdminUserListResponse }>(`/admin/users${qs ? `?${qs}` : ''}`)
    .then(r => r.data.data);
};

export const getAccountHolderDetail = (userId: string): Promise<AdminUserDetail> =>
  httpClient
    .get<{ success: boolean; data: AdminUserDetail }>(`/admin/users/${userId}`)
    .then(r => r.data.data);

export const toggleUserVerification = (userId: string): Promise<{ id: string; isVerified: boolean }> =>
  httpClient
    .patch<{ success: boolean; data: { id: string; isVerified: boolean } }>(`/admin/users/${userId}/verify`)
    .then(r => r.data.data);

export const updateUserStatus = (userId: string, status: string): Promise<{ id: string; status: string }> =>
  httpClient
    .patch<{ success: boolean; data: { id: string; status: string } }>(`/admin/users/${userId}/status`, { status })
    .then(r => r.data.data);


