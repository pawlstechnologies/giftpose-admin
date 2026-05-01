// // // import axios from 'axios';
// // // import httpClient from './httpClient';



// // // const API = axios.create({
// // //     baseURL: import.meta.env.VITE_API_URL,
// // //     withCredentials: true
// // // });

// // // export const adminLogin = async (data: {
// // //     email: string;
// // //     password: string;
// // // }) => {
// // //     const res = await API.post('/auth/login', data);
// // //     return res.data;
// // // };


// // // export const verifyOTP = async (data: {
// // //     adminId: string;
// // //     otp: string;
// // // }) => {
// // //     const res = await API.post('/auth/verify-otp', data);
// // //     return res.data;
// // // };

// // // export const resendOTP = async (data: { 
// // //     adminId: string 
// // //     }) => {
// // //     const res = await API.post('/resend-otp', data);
// // //     return res.data;
// // // };

// // // export const adminProfile = async (data: {
// // //     adminId: string
// // // }) => {
// // //     const res = await API.post('/auth/me', data);
// // //     return res.data;
// // // };

// // // export default API;

// // /**
// //  * admin.api.ts
// //  * ─────────────────────────────────────────────────────────────────
// //  * All API calls for the admin panel.
// //  * Uses the shared httpClient (which handles auth headers + refresh).
// //  */

// // // import httpClient from './httpClient';

// // // /* ─── Types ──────────────────────────────────────────────────────── */

// // // export interface LoginPayload   { email: string; password: string }
// // // export interface LoginResponse  {
// // //   accessToken:  string;
// // //   refreshToken: string;
// // //   admin: { id: string; email: string; role: string };
// // // }

// // // export interface OtpPayload     { adminId: string; otp: string }
// // // export interface OtpResponse    { accessToken: string }

// // // export interface ResendOtpPayload { adminId: string }

// // // export interface AdminProfile {
// // //   id:        string;
// // //   name:      string;
// // //   email:     string;
// // //   role:      string;
// // //   lastLogin: string;
// // // }

// // // /* ─── Auth ───────────────────────────────────────────────────────── */

// // // /** Step 1 — submit email + password, receive adminId to pass to OTP step */
// // // export const adminLogin = (payload: LoginPayload): Promise<LoginResponse> =>
// // //   httpClient.post<LoginResponse>('/admin/auth/login', payload).then((r) => r.data);

// // // /** Step 2 — submit 6-digit OTP, receive final access token */
// // // export const verifyOTP = (payload: OtpPayload): Promise<OtpResponse> =>
// // //   httpClient.post<OtpResponse>('/admin/auth/verify-otp', payload).then((r) => r.data);

// // // /** Resend OTP to the admin's email */
// // // export const resendOTP = (payload: ResendOtpPayload): Promise<void> =>
// // //   httpClient.post('/admin/auth/resend-otp', payload).then(() => undefined);

// // // /** Fetch the current authenticated admin's profile */
// // // export const getAdminMe = (): Promise<AdminProfile> =>
// // //   httpClient.get<AdminProfile>('/admin/auth/me').then((r) => r.data);

// // // /** Logout — clears server-side session (fire and forget) */
// // // export const adminLogout = (): Promise<void> =>
// // //   httpClient.post('/admin/auth/logout').then(() => undefined);


// // /**
// //  * admin.api.ts
// //  * ─────────────────────────────────────────────────────────────────
// //  * All API calls for the admin panel.
// //  * Uses the shared httpClient (which handles auth headers + refresh).
// //  */
// // /**
// //  * admin.api.ts
// //  * ─────────────────────────────────────────────────────────────────
// //  * All API calls for the admin panel.
// //  * Uses the shared httpClient (which handles auth headers + refresh).
// //  */

// // // import httpClient, { platformClient } from './httpClient';

// // // /* ─── Types ──────────────────────────────────────────────────────── */

// // // export interface LoginPayload  { email: string; password: string }

// // // /**
// // //  * Login step only triggers OTP dispatch — no tokens yet.
// // //  * The server returns the adminId needed to submit the OTP.
// // //  * Tokens are issued only after OTP verification.
// // //  */
// // // export interface LoginResponse { adminId: string }

// // // export interface OtpPayload    { adminId: string; otp: string }

// // // /**
// // //  * After OTP verification the server issues the real session tokens
// // //  * plus a full admin object.
// // //  */
// // // export interface OtpResponse {
// // //   accessToken:  string;
// // //   refreshToken: string;
// // //   admin: { id: string; email: string; role: string };
// // // }

// // // export interface ResendOtpPayload { adminId: string }

// // // export interface AdminProfile {
// // //   id:        string;
// // //   name:      string;
// // //   email:     string;
// // //   role:      string;
// // //   lastLogin: string;
// // // }

// // // /* ─── Auth ───────────────────────────────────────────────────────── */

// // // /** Step 1 — submit credentials, server sends OTP to email, returns adminId */
// // // export const adminLogin = (payload: LoginPayload): Promise<LoginResponse> =>
// // //   httpClient.post<LoginResponse>('/admin/auth/login', payload).then((r) => r.data);

// // // /** Step 2 — submit 6-digit OTP; server issues full session tokens */
// // // export const verifyOTP = (payload: OtpPayload): Promise<OtpResponse> =>
// // //   httpClient.post<OtpResponse>('/admin/auth/verify-otp', payload).then((r) => r.data);

// // // /** Resend OTP to the admin's email */
// // // export const resendOTP = (payload: ResendOtpPayload): Promise<void> =>
// // //   httpClient.post('/admin/auth/resend-otp', payload).then(() => undefined);

// // // /** Fetch the current authenticated admin's profile */
// // // export const getAdminMe = (): Promise<AdminProfile> =>
// // //   httpClient.get<AdminProfile>('/admin/auth/me').then((r) => r.data);

// // // /** Logout — clears server-side session (fire and forget) */
// // // export const adminLogout = (): Promise<void> =>
// // //   httpClient.post('/admin/auth/logout').then(() => undefined);

// // // /* ═══════════════════════════════════════════════════════════
// // //    CATEGORY API
// // //    Base: https://api.giftpose.com/api/categories
// // //    ═══════════════════════════════════════════════════════════ */

// // // /* ─── Response shapes (exactly as the server returns) ─────── */

// // // export interface ApiCategory {
// // //   _id:        string;
// // //   name:       string;
// // //   status:     'Active' | 'Inactive';
// // //   slug:       string;
// // //   created_at: string;
// // //   updated_at: string;
// // // }

// // // export interface ApiSubcategory {
// // //   _id:        string;
// // //   name:       string;
// // //   categoryId: string;
// // //   status:     'Active' | 'Inactive';
// // //   slug:       string;
// // //   created_at: string;
// // //   updated_at: string;
// // // }

// // // export interface ApiContent {
// // //   _id:           string;
// // //   name:          string;
// // //   subcategoryId: string;
// // //   status:        'Active' | 'Inactive';
// // //   slug:          string;
// // //   createdAt:     string;
// // //   updatedAt:     string;
// // // }

// // // export interface ListCategoriesResponse {
// // //   success:     boolean;
// // //   data:        ApiCategory[];
// // //   total:       number;
// // //   page:        number;
// // //   totalPages:  number;
// // // }

// // // export interface CreateCategoryResponse    { success: boolean; data: ApiCategory }
// // // export interface CreateSubcategoryResponse { success: boolean; data: ApiSubcategory }
// // // export interface CreateContentResponse     { success: boolean; data: ApiContent }

// // // /* ─── Tree response ──────────────────────────────────────── */

// // // export interface ApiTreeContent {
// // //   _id:          string;
// // //   name:         string;
// // //   status:       'Active' | 'Inactive';
// // //   subcategoryId:string;
// // //   slug:         string;
// // //   createdAt:    string;
// // //   updatedAt:    string;
// // // }

// // // export interface ApiTreeSubcategory {
// // //   _id:        string;
// // //   name:       string;
// // //   categoryId: string;
// // //   status:     'Active' | 'Inactive';
// // //   slug:       string;
// // //   created_at: string;
// // //   updated_at: string;
// // //   contents:   ApiTreeContent[];
// // // }

// // // export interface ApiTreeCategory {
// // //   _id:           string;
// // //   name:          string;
// // //   status:        'Active' | 'Inactive';
// // //   subcategories: ApiTreeSubcategory[];
// // // }

// // // export interface GetCategoryTreeResponse {
// // //   success: boolean;
// // //   message: string;
// // //   data:    ApiTreeCategory;
// // // }

// // // /* ─── Payloads ───────────────────────────────────────────── */

// // // export interface CreateCategoryPayload {
// // //   name:   string;
// // //   status: 'Active' | 'Inactive';
// // // }

// // // export interface CreateSubcategoryPayload {
// // //   name:       string;
// // //   categoryId: string;
// // //   status:     'Active' | 'Inactive';
// // // }

// // // export interface CreateContentPayload {
// // //   name:          string;
// // //   subcategoryId: string;
// // //   status:        'Active' | 'Inactive';
// // // }

// // // /* ─── Category calls ─────────────────────────────────────── */

// // // /** GET /api/categories — list all categories */
// // // export const listCategories = (): Promise<ListCategoriesResponse> =>
// // //     platformClient.get<ListCategoriesResponse>('/categories').then(r => r.data);
// // //   // platformClient.get<ListCategoriesResponse>('/categories').then(r => r.data);

// // // /** GET /api/categories/tree?categoryId=:id — fetch full subcategory+content tree for one category */
// // // export const getCategoryTree = (categoryId: string): Promise<GetCategoryTreeResponse> =>
// // //   platformClient.get<GetCategoryTreeResponse>(`/categories/tree?categoryId=${categoryId}`).then(r => r.data);

// // // /** POST /api/categories — create a new category */
// // // export const createCategory = (payload: CreateCategoryPayload): Promise<CreateCategoryResponse> =>
// // //   platformClient.post<CreateCategoryResponse>('/categories', payload).then(r => r.data);

// // // /* ─── Subcategory calls ──────────────────────────────────── */

// // // /** POST /api/categories/subcategories — create a subcategory under a category */
// // // export const createSubcategory = (payload: CreateSubcategoryPayload): Promise<CreateSubcategoryResponse> =>
// // //   platformClient.post<CreateSubcategoryResponse>('/categories/subcategories', payload).then(r => r.data);

// // // /* ─── Content calls ──────────────────────────────────────── */

// // // /** POST /api/categories/contents — create a content item under a subcategory */
// // // export const createContent = (payload: CreateContentPayload): Promise<CreateContentResponse> =>
// // //   platformClient.post<CreateContentResponse>('/categories/contents', payload).then(r => r.data);




// // /**
// //  * admin.api.ts
// //  * ─────────────────────────────────────────────────────────────────
// //  * All API calls for the admin panel.
// //  * Uses the shared httpClient (which handles auth headers + refresh).
// //  */

// // import httpClient from './httpClient';

// // /* ─── Types ──────────────────────────────────────────────────────── */

// // export interface LoginPayload  { email: string; password: string }

// // /**
// //  * Login step only triggers OTP dispatch — no tokens yet.
// //  * The server returns the adminId needed to submit the OTP.
// //  * Tokens are issued only after OTP verification.
// //  */
// // export interface LoginResponse { adminId: string }

// // export interface OtpPayload    { adminId: string; otp: string }

// // /**
// //  * After OTP verification the server issues the real session tokens
// //  * plus a full admin object.
// //  */
// // export interface OtpResponse {
// //   accessToken:  string;
// //   refreshToken: string;
// //   admin: { id: string; email: string; role: string };
// // }

// // export interface ResendOtpPayload { adminId: string }

// // export interface AdminProfile {
// //   id:        string;
// //   name:      string;
// //   email:     string;
// //   role:      string;
// //   lastLogin: string;
// // }

// // /* ─── Auth ───────────────────────────────────────────────────────── */

// // /** Step 1 — submit credentials, server sends OTP to email, returns adminId */
// // export const adminLogin = (payload: LoginPayload): Promise<LoginResponse> =>
// //   httpClient.post<LoginResponse>('/admin/auth/login', payload).then((r) => r.data);

// // /** Step 2 — submit 6-digit OTP; server issues full session tokens */
// // export const verifyOTP = (payload: OtpPayload): Promise<OtpResponse> =>
// //   httpClient.post<OtpResponse>('/admin/auth/verify-otp', payload).then((r) => r.data);

// // /** Resend OTP to the admin's email */
// // export const resendOTP = (payload: ResendOtpPayload): Promise<void> =>
// //   httpClient.post('/admin/auth/resend-otp', payload).then(() => undefined);

// // /** Fetch the current authenticated admin's profile */
// // export const getAdminMe = (): Promise<AdminProfile> =>
// //   httpClient.get<AdminProfile>('/admin/auth/me').then((r) => r.data);

// // /** Logout — clears server-side session (fire and forget) */
// // export const adminLogout = (): Promise<void> =>
// //   httpClient.post('/admin/auth/logout').then(() => undefined);

// // /* ═══════════════════════════════════════════════════════════
// //    CATEGORY API
// //    Base: https://api.giftpose.com/api/categories
// //    ═══════════════════════════════════════════════════════════ */

// // /* ─── Response shapes (exactly as the server returns) ─────── */

// // export interface ApiCategory {
// //   _id:        string;
// //   name:       string;
// //   status:     'Active' | 'Inactive';
// //   slug:       string;
// //   created_at: string;
// //   updated_at: string;
// // }

// // export interface ApiSubcategory {
// //   _id:        string;
// //   name:       string;
// //   categoryId: string;
// //   status:     'Active' | 'Inactive';
// //   slug:       string;
// //   created_at: string;
// //   updated_at: string;
// // }

// // export interface ApiContent {
// //   _id:           string;
// //   name:          string;
// //   subcategoryId: string;
// //   status:        'Active' | 'Inactive';
// //   slug:          string;
// //   createdAt:     string;
// //   updatedAt:     string;
// // }

// // export interface ListCategoriesResponse {
// //   success:     boolean;
// //   data:        ApiCategory[];
// //   total:       number;
// //   page:        number;
// //   totalPages:  number;
// // }

// // export interface CreateCategoryResponse    { success: boolean; data: ApiCategory }
// // export interface CreateSubcategoryResponse { success: boolean; data: ApiSubcategory }
// // export interface CreateContentResponse     { success: boolean; data: ApiContent }

// // /* ─── Tree response ──────────────────────────────────────── */

// // export interface ApiTreeContent {
// //   _id:          string;
// //   name:         string;
// //   status:       'Active' | 'Inactive';
// //   subcategoryId:string;
// //   slug:         string;
// //   createdAt:    string;
// //   updatedAt:    string;
// // }

// // export interface ApiTreeSubcategory {
// //   _id:        string;
// //   name:       string;
// //   categoryId: string;
// //   status:     'Active' | 'Inactive';
// //   slug:       string;
// //   created_at: string;
// //   updated_at: string;
// //   contents:   ApiTreeContent[];
// // }

// // export interface ApiTreeCategory {
// //   _id:           string;
// //   name:          string;
// //   status:        'Active' | 'Inactive';
// //   subcategories: ApiTreeSubcategory[];
// // }

// // export interface GetCategoryTreeResponse {
// //   success: boolean;
// //   message: string;
// //   data:    ApiTreeCategory;
// // }

// // /* ─── Payloads ───────────────────────────────────────────── */

// // export interface CreateCategoryPayload {
// //   name:   string;
// //   status: 'Active' | 'Inactive';
// // }

// // export interface CreateSubcategoryPayload {
// //   name:       string;
// //   categoryId: string;
// //   status:     'Active' | 'Inactive';
// // }

// // export interface CreateContentPayload {
// //   name:          string;
// //   subcategoryId: string;
// //   status:        'Active' | 'Inactive';
// // }

// // /* ─── Category calls ─────────────────────────────────────── */

// // /** GET /api/categories — list all categories */
// // export const listCategories = (): Promise<ListCategoriesResponse> =>
// //   httpClient.get<ListCategoriesResponse>('/categories').then(r => {
// //     const body = r.data;
// //     // Ensure data is always an array regardless of unexpected server shapes
// //     if (body && !Array.isArray(body.data)) {
// //       body.data = [];
// //     }
// //     return body;
// //   });

// // /** GET /api/categories/tree?categoryId=:id — fetch full subcategory+content tree for one category */
// // export const getCategoryTree = (categoryId: string): Promise<GetCategoryTreeResponse> =>
// //   httpClient.get<GetCategoryTreeResponse>(`/categories/tree?categoryId=${categoryId}`).then(r => r.data);

// // /** POST /api/categories — create a new category */
// // export const createCategory = (payload: CreateCategoryPayload): Promise<CreateCategoryResponse> =>
// //   httpClient.post<CreateCategoryResponse>('/categories', payload).then(r => r.data);

// // /* ─── Subcategory calls ──────────────────────────────────── */

// // /** POST /api/categories/subcategories — create a subcategory under a category */
// // export const createSubcategory = (payload: CreateSubcategoryPayload): Promise<CreateSubcategoryResponse> =>
// //   httpClient.post<CreateSubcategoryResponse>('/categories/subcategories', payload).then(r => r.data);

// // /* ─── Content calls ──────────────────────────────────────── */

// // /** POST /api/categories/contents — create a content item under a subcategory */
// // export const createContent = (payload: CreateContentPayload): Promise<CreateContentResponse> =>
// //   httpClient.post<CreateContentResponse>('/categories/contents', payload).then(r => r.data);



// /**
//  * admin.api.ts
//  * ─────────────────────────────────────────────────────────────────
//  * All API calls for the admin panel.
//  * Uses the shared httpClient (which handles auth headers + refresh).
//  */



// // import httpClient from './httpClient';

// // /* ─── Types ──────────────────────────────────────────────────────── */

// // export interface LoginPayload  { email: string; password: string }

// // /**
// //  * Login step only triggers OTP dispatch — no tokens yet.
// //  * The server returns the adminId needed to submit the OTP.
// //  * Tokens are issued only after OTP verification.
// //  */
// // export interface LoginResponse { adminId: string }

// // export interface OtpPayload    { adminId: string; otp: string }

// // /**
// //  * After OTP verification the server issues the real session tokens
// //  * plus a full admin object.
// //  */
// // export interface OtpResponse {
// //   accessToken:  string;
// //   refreshToken: string;
// //   admin: { id: string; email: string; role: string };
// // }

// // export interface ResendOtpPayload { adminId: string }

// // export interface AdminProfile {
// //   id:        string;
// //   name:      string;
// //   email:     string;
// //   role:      string;
// //   lastLogin: string;
// // }

// // /* ─── Auth ───────────────────────────────────────────────────────── */

// // /** Step 1 — submit credentials, server sends OTP to email, returns adminId */
// // export const adminLogin = (payload: LoginPayload): Promise<LoginResponse> =>
// //   httpClient.post<LoginResponse>('/admin/auth/login', payload).then((r) => r.data);

// // /** Step 2 — submit 6-digit OTP; server issues full session tokens */
// // export const verifyOTP = (payload: OtpPayload): Promise<OtpResponse> =>
// //   httpClient.post<OtpResponse>('/admin/auth/verify-otp', payload).then((r) => r.data);

// // /** Resend OTP to the admin's email */
// // export const resendOTP = (payload: ResendOtpPayload): Promise<void> =>
// //   httpClient.post('/admin/auth/resend-otp', payload).then(() => undefined);

// // /** Fetch the current authenticated admin's profile */
// // export const getAdminMe = (): Promise<AdminProfile> =>
// //   httpClient.get<AdminProfile>('/admin/auth/me').then((r) => r.data);

// // /** Logout — clears server-side session (fire and forget) */
// // export const adminLogout = (): Promise<void> =>
// //   httpClient.post('/admin/auth/logout').then(() => undefined);

// // /* ═══════════════════════════════════════════════════════════
// //    CATEGORY API
// //    Base: https://api.giftpose.com/api/categories
// //    ═══════════════════════════════════════════════════════════ */

// // /* ─── Response shapes (exactly as the server returns) ─────── */

// // export interface ApiCategory {
// //   _id:        string;
// //   name:       string;
// //   status:     'Active' | 'Inactive';
// //   slug:       string;
// //   created_at: string;
// //   updated_at: string;
// // }

// // export interface ApiSubcategory {
// //   _id:        string;
// //   name:       string;
// //   categoryId: string;
// //   status:     'Active' | 'Inactive';
// //   slug:       string;
// //   created_at: string;
// //   updated_at: string;
// // }

// // export interface ApiContent {
// //   _id:           string;
// //   name:          string;
// //   subcategoryId: string;
// //   status:        'Active' | 'Inactive';
// //   slug:          string;
// //   createdAt:     string;
// //   updatedAt:     string;
// // }

// // export interface ListCategoriesResponse {
// //   success:     boolean;
// //   data:        ApiCategory[];
// //   total:       number;
// //   page:        number;
// //   totalPages:  number;
// // }

// // export interface CreateCategoryResponse    { success: boolean; data: ApiCategory }
// // export interface CreateSubcategoryResponse { success: boolean; data: ApiSubcategory }
// // export interface CreateContentResponse     { success: boolean; data: ApiContent }

// // /* ─── Tree response ──────────────────────────────────────── */

// // export interface ApiTreeContent {
// //   _id:          string;
// //   name:         string;
// //   status:       'Active' | 'Inactive';
// //   subcategoryId:string;
// //   slug:         string;
// //   createdAt:    string;
// //   updatedAt:    string;
// // }

// // export interface ApiTreeSubcategory {
// //   _id:        string;
// //   name:       string;
// //   categoryId: string;
// //   status:     'Active' | 'Inactive';
// //   slug:       string;
// //   created_at: string;
// //   updated_at: string;
// //   contents:   ApiTreeContent[];
// // }

// // export interface ApiTreeCategory {
// //   _id:           string;
// //   name:          string;
// //   status:        'Active' | 'Inactive';
// //   subcategories: ApiTreeSubcategory[];
// // }

// // export interface GetCategoryTreeResponse {
// //   success: boolean;
// //   message: string;
// //   data:    ApiTreeCategory;
// // }

// // /* ─── Payloads ───────────────────────────────────────────── */

// // export interface CreateCategoryPayload {
// //   name:   string;
// //   status: 'Active' | 'Inactive';
// // }

// // export interface CreateSubcategoryPayload {
// //   name:       string;
// //   categoryId: string;
// //   status:     'Active' | 'Inactive';
// // }

// // export interface CreateContentPayload {
// //   name:          string;
// //   subcategoryId: string;
// //   status:        'Active' | 'Inactive';
// // }

// // /* ─── Category calls ─────────────────────────────────────── */

// // /**
// //  * GET /api/categories (with empty body — mirrors curl --data '')
// //  * Sending an explicit empty object prevents 304 cache hits and
// //  * ensures the server returns a fresh response body.
// //  */
// // export const listCategories = (): Promise<ListCategoriesResponse> =>
// //   httpClient.request<ListCategoriesResponse>({
// //     method: 'GET',
// //     url: '/categories',
// //     data: {},                          // mirrors curl --data ''
// //     headers: { 'Cache-Control': 'no-cache', 'Pragma': 'no-cache' },
// //   }).then(r => {
// //     const body = r.data;
// //     if (body && !Array.isArray(body.data)) body.data = [];
// //     return body;
// //   });

// // /**
// //  * GET /api/categories/tree?categoryId=:id
// //  * categoryId sent both as query param and body — mirrors the curl exactly.
// //  */
// // export const getCategoryTree = (categoryId: string): Promise<GetCategoryTreeResponse> =>
// //   httpClient.request<GetCategoryTreeResponse>({
// //     method: 'GET',
// //     url: `/categories/tree`,
// //     params: { categoryId },            // query string: ?categoryId=...
// //     data: {},                          // mirrors curl --data ''
// //     headers: { 'Cache-Control': 'no-cache', 'Pragma': 'no-cache' },
// //   }).then(r => {
// //     const body = r.data;
// //     if (body?.data && !Array.isArray(body.data.subcategories)) {
// //       body.data.subcategories = [];
// //     }
// //     return body;
// //   });

// // /** POST /api/categories — create a new category */
// // export const createCategory = (payload: CreateCategoryPayload): Promise<CreateCategoryResponse> =>
// //   httpClient.post<CreateCategoryResponse>('/categories', payload).then(r => r.data);

// // /* ─── Subcategory calls ──────────────────────────────────── */

// // /** POST /api/categories/subcategories — create a subcategory under a category */
// // export const createSubcategory = (payload: CreateSubcategoryPayload): Promise<CreateSubcategoryResponse> =>
// //   httpClient.post<CreateSubcategoryResponse>('/categories/subcategories', payload).then(r => r.data);

// // /* ─── Content calls ──────────────────────────────────────── */

// // /** POST /api/categories/contents — create a content item under a subcategory */
// // export const createContent = (payload: CreateContentPayload): Promise<CreateContentResponse> =>
// //   httpClient.post<CreateContentResponse>('/categories/contents', payload).then(r => r.data);


// /**
//  * admin.api.ts
//  * ─────────────────────────────────────────────────────────────────
//  * All API calls for the admin panel.
//  * Uses the shared httpClient (which handles auth headers + refresh).
//  */

// import httpClient from './httpClient';

// /* ─── Types ──────────────────────────────────────────────────────── */

// export interface LoginPayload  { email: string; password: string }

// /**
//  * Login step only triggers OTP dispatch — no tokens yet.
//  * The server returns the adminId needed to submit the OTP.
//  * Tokens are issued only after OTP verification.
//  */
// export interface LoginResponse { adminId: string }

// export interface OtpPayload    { adminId: string; otp: string }

// /**
//  * After OTP verification the server issues the real session tokens
//  * plus a full admin object.
//  */
// export interface OtpResponse {
//   accessToken:  string;
//   refreshToken: string;
//   admin: { id: string; email: string; role: string };
// }

// export interface ResendOtpPayload { adminId: string }

// export interface AdminProfile {
//   id:        string;
//   name:      string;
//   email:     string;
//   role:      string;
//   lastLogin: string;
// }

// /* ─── Auth ───────────────────────────────────────────────────────── */

// /** Step 1 — submit credentials, server sends OTP to email, returns adminId */
// export const adminLogin = (payload: LoginPayload): Promise<LoginResponse> =>
//   httpClient.post<LoginResponse>('/admin/auth/login', payload).then((r) => r.data);

// /** Step 2 — submit 6-digit OTP; server issues full session tokens */
// export const verifyOTP = (payload: OtpPayload): Promise<OtpResponse> =>
//   httpClient.post<OtpResponse>('/admin/auth/verify-otp', payload).then((r) => r.data);

// /** Resend OTP to the admin's email */
// export const resendOTP = (payload: ResendOtpPayload): Promise<void> =>
//   httpClient.post('/admin/auth/resend-otp', payload).then(() => undefined);

// /** Fetch the current authenticated admin's profile */
// export const getAdminMe = (): Promise<AdminProfile> =>
//   httpClient.get<AdminProfile>('/admin/auth/me').then((r) => r.data);

// /** Logout — clears server-side session (fire and forget) */
// export const adminLogout = (): Promise<void> =>
//   httpClient.post('/admin/auth/logout').then(() => undefined);

// /* ═══════════════════════════════════════════════════════════
//    CATEGORY API
//    Base: https://api.giftpose.com/api/categories
//    ═══════════════════════════════════════════════════════════ */

// /* ─── Response shapes (exactly as the server returns) ─────── */

// export interface ApiCategory {
//   _id:        string;
//   name:       string;
//   status:     'Active' | 'Inactive';
//   slug:       string;
//   created_at: string;
//   updated_at: string;
// }

// export interface ApiSubcategory {
//   _id:        string;
//   name:       string;
//   categoryId: string;
//   status:     'Active' | 'Inactive';
//   slug:       string;
//   created_at: string;
//   updated_at: string;
// }

// export interface ApiContent {
//   _id:           string;
//   name:          string;
//   subcategoryId: string;
//   status:        'Active' | 'Inactive';
//   slug:          string;
//   createdAt:     string;
//   updatedAt:     string;
// }

// export interface ListCategoriesResponse {
//   success:     boolean;
//   data:        ApiCategory[];
//   total:       number;
//   page:        number;
//   totalPages:  number;
// }

// export interface CreateCategoryResponse    { success: boolean; data: ApiCategory }
// export interface CreateSubcategoryResponse { success: boolean; data: ApiSubcategory }
// export interface CreateContentResponse     { success: boolean; data: ApiContent }

// /* ─── Tree response ──────────────────────────────────────── */

// export interface ApiTreeContent {
//   _id:          string;
//   name:         string;
//   status:       'Active' | 'Inactive';
//   subcategoryId:string;
//   slug:         string;
//   createdAt:    string;
//   updatedAt:    string;
// }

// export interface ApiTreeSubcategory {
//   _id:        string;
//   name:       string;
//   categoryId: string;
//   status:     'Active' | 'Inactive';
//   slug:       string;
//   created_at: string;
//   updated_at: string;
//   contents:   ApiTreeContent[];
// }

// export interface ApiTreeCategory {
//   _id:           string;
//   name:          string;
//   status:        'Active' | 'Inactive';
//   subcategories: ApiTreeSubcategory[];
// }

// export interface GetCategoryTreeResponse {
//   success: boolean;
//   message: string;
//   data:    ApiTreeCategory;
// }

// /* ─── Payloads ───────────────────────────────────────────── */

// export interface CreateCategoryPayload {
//   name:   string;
//   status: 'Active' | 'Inactive';
// }

// export interface CreateSubcategoryPayload {
//   name:       string;
//   categoryId: string;
//   status:     'Active' | 'Inactive';
// }

// export interface CreateContentPayload {
//   name:          string;
//   subcategoryId: string;
//   status:        'Active' | 'Inactive';
// }

// /* ─── Category calls ─────────────────────────────────────── */

// /**
//  * GET /api/categories
//  * Uses a timestamp param to bust browser cache — avoids 304 responses
//  * without needing Cache-Control headers (which CORS may block).
//  */
// export const listCategories = (): Promise<ListCategoriesResponse> =>
//   httpClient.get<ListCategoriesResponse>('/categories', {
//     params: { _t: Date.now() },        // cache-buster — ensures fresh 200 every time
//   }).then(r => {
//     const body = r.data;
//     if (body && !Array.isArray(body.data)) body.data = [];
//     return body;
//   });

// /**
//  * GET /api/categories/tree?categoryId=:id
//  * Timestamp cache-buster applied here too.
//  */
// export const getCategoryTree = (categoryId: string): Promise<GetCategoryTreeResponse> =>
//   httpClient.get<GetCategoryTreeResponse>('/categories/tree', {
//     params: { categoryId, _t: Date.now() },
//   }).then(r => {
//     const body = r.data;
//     if (body?.data && !Array.isArray(body.data.subcategories)) {
//       body.data.subcategories = [];
//     }
//     return body;
//   });

// /** POST /api/categories — create a new category */
// export const createCategory = (payload: CreateCategoryPayload): Promise<CreateCategoryResponse> =>
//   httpClient.post<CreateCategoryResponse>('/categories', payload).then(r => r.data);

// /* ─── Subcategory calls ──────────────────────────────────── */

// /** POST /api/categories/subcategories — create a subcategory under a category */
// export const createSubcategory = (payload: CreateSubcategoryPayload): Promise<CreateSubcategoryResponse> =>
//   httpClient.post<CreateSubcategoryResponse>('/categories/subcategories', payload).then(r => r.data);

// /* ─── Content calls ──────────────────────────────────────── */

// /** POST /api/categories/contents — create a content item under a subcategory */
// export const createContent = (payload: CreateContentPayload): Promise<CreateContentResponse> =>
//   httpClient.post<CreateContentResponse>('/categories/contents', payload).then(r => r.data);





import httpClient from './httpClient';

// ─── Auth types ───────────────────────────────────────────────
export interface LoginPayload   { email: string; password: string }
export interface LoginResponse  { adminId: string }
export interface OtpPayload     { adminId: string; otp: string }
export interface OtpResponse    { accessToken: string; refreshToken: string; admin: { id: string; email: string; role: string } }
export interface AdminProfile   { id: string; name: string; email: string; role: string; lastLogin: string }

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

// ─── Auth ─────────────────────────────────────────────────────
export const adminLogin   = (p: LoginPayload)         => httpClient.post<LoginResponse>('/admin/auth/login', p).then(r => r.data);
export const verifyOTP    = (p: OtpPayload)           => httpClient.post<OtpResponse>('/admin/auth/verify-otp', p).then(r => r.data);
export const resendOTP    = (p: { adminId: string })  => httpClient.post('/admin/auth/resend-otp', p).then(() => undefined);
export const getAdminMe   = ()                        => httpClient.get<AdminProfile>('/admin/auth/me').then(r => r.data);
export const adminLogout  = ()                        => httpClient.post('/admin/auth/logout').then(() => undefined);

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


