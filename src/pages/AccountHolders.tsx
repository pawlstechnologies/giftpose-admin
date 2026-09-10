import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../components/layout/Sidebar';
import Topbar from '../components/layout/Topbar';
import {
  getAccountHolders,
  type AdminUserListItem,
  type AdminUserListResponse,
} from '../api/admin.api';
import '../styles/dashboard.css';
import '../styles/account-holders.css';

/* ── Fallback avatars with diverse stock portraits ── */
const DEFAULT_AVATARS = [
  'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=120&h=120&fit=crop',
  'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=120&h=120&fit=crop',
  'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=120&h=120&fit=crop',
  'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=120&h=120&fit=crop',
];

export default function AccountHolders() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [users, setUsers] = useState<AdminUserListItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [pagination, setPagination] = useState({
    total: 0,
    page: 1,
    limit: 10,
    totalPages: 1,
  });

  const navigate = useNavigate();

  const fetchUsers = useCallback(async (targetPage: number, searchTerm: string) => {
    setLoading(true);
    setError('');
    try {
      const res: AdminUserListResponse = await getAccountHolders({
        page: targetPage,
        limit: 10,
        search: searchTerm,
      });
      setUsers(res.users);
      setPagination(res.pagination);
    } catch (err: any) {
      console.error('Failed to load account holders:', err);
      setError('Failed to load account holders. Please try again.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchUsers(page, search);
    }, 250);
    return () => clearTimeout(timer);
  }, [page, search, fetchUsers]);

  const handleRowClick = (userId: string) => {
    navigate(`/account-holders/${userId}`);
  };

  /* Render Device Icon */
  const renderDeviceIcon = (device: string) => {
    if (device.includes('iOS') || device.includes('iPhone')) {
      return (
        <span className="ah-device-cell">
          <svg className="ah-device-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <rect x="5" y="2" width="14" height="20" rx="2" ry="2" />
            <line x1="12" y1="18" x2="12.01" y2="18" />
          </svg>
          Mobile (iOS)
        </span>
      );
    }
    if (device.includes('Android')) {
      return (
        <span className="ah-device-cell">
          <svg className="ah-device-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <rect x="5" y="2" width="14" height="20" rx="2" ry="2" />
            <line x1="12" y1="18" x2="12.01" y2="18" />
          </svg>
          Mobile (Android)
        </span>
      );
    }
    if (device.includes('Tablet')) {
      return (
        <span className="ah-device-cell">
          <svg className="ah-device-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <rect x="4" y="2" width="16" height="20" rx="2" ry="2" />
            <line x1="12" y1="18" x2="12.01" y2="18" />
          </svg>
          Tablet
        </span>
      );
    }
    return (
      <span className="ah-device-cell">
        <svg className="ah-device-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
          <line x1="8" y1="21" x2="16" y2="21" />
          <line x1="12" y1="17" x2="12" y2="21" />
        </svg>
        Desktop
      </span>
    );
  };

  return (
    <>
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <Topbar
        onMenuClick={() => setSidebarOpen(true)}
        searchPlaceholder="Search users by name, email..."
        searchValue={search}
        onSearchChange={(val) => {
          setSearch(val);
          setPage(1);
        }}
      />

      <main className="main" style={{ background: '#f8fafc', minHeight: '100vh' }}>
        <div className="ah-container">
          {/* Page Title & Subtitle */}
          <div className="ah-header">
            <h1 className="ah-title">Account Holders</h1>
            <p className="ah-subtitle">
              Comprehensive directory of registered users across the platform
            </p>
          </div>

          {/* Main Card Container */}
          <div className="ah-card">
            <div className="ah-table-wrap">
              <table className="ah-table">
                <thead>
                  <tr>
                    <th>User Profile</th>
                    <th>Email Address</th>
                    <th>Post Code</th>
                    <th>Location</th>
                    <th>Primary Device</th>
                    <th>Plan</th>
                    <th style={{ textAlign: 'right' }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {loading ? (
                    <tr>
                      <td colSpan={7}>
                        <div className="ah-loading-state">
                          <svg className="ah-spinner" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#16a34a" strokeWidth="2.5">
                            <circle cx="12" cy="12" r="10" stroke="#e2e8f0" strokeWidth="2.5" />
                            <path d="M12 2a10 10 0 0 1 10 10" />
                          </svg>
                          <span>Loading account holders...</span>
                        </div>
                      </td>
                    </tr>
                  ) : error ? (
                    <tr>
                      <td colSpan={7}>
                        <div className="ah-empty-state">
                          <p style={{ color: '#ef4444', marginBottom: 12 }}>{error}</p>
                          <button
                            className="ah-btn-pagi"
                            onClick={() => fetchUsers(page, search)}
                          >
                            Retry
                          </button>
                        </div>
                      </td>
                    </tr>
                  ) : users.length === 0 ? (
                    <tr>
                      <td colSpan={7}>
                        <div className="ah-empty-state">
                          <p>No registered users found.</p>
                        </div>
                      </td>
                    </tr>
                  ) : (
                    users.map((user, idx) => {
                      const fallbackAvatar = DEFAULT_AVATARS[idx % DEFAULT_AVATARS.length];
                      return (
                        <tr
                          key={user.id}
                          style={{ cursor: 'pointer' }}
                          onClick={() => handleRowClick(user.id)}
                        >
                          {/* User Profile */}
                          <td>
                            <div className="ah-user-cell">
                              <img
                                className="ah-avatar"
                                src={user.avatarUrl || fallbackAvatar}
                                alt={user.fullname}
                                onError={(e) => {
                                  // Fallback to initials if image fails
                                  (e.target as HTMLElement).style.display = 'none';
                                }}
                              />
                              <span className="ah-user-name">{user.fullname}</span>
                            </div>
                          </td>

                          {/* Email Address + Verified Check */}
                          <td>
                            <div className="ah-email-cell">
                              <span>{user.email}</span>
                              {user.isVerified ? (
                                <svg
                                  className="ah-verified-check"
                                  width="15"
                                  height="15"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                  stroke="currentColor"
                                  strokeWidth="2.5"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                >
                                  <title>Verified user</title>
                                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                                  <polyline points="22 4 12 14.01 9 11.01" />
                                </svg>
                              ) : (
                                <svg
                                  className="ah-unverified-icon"
                                  width="14"
                                  height="14"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                  stroke="currentColor"
                                  strokeWidth="2"
                                >
                                  <title>Unverified email</title>
                                  <circle cx="12" cy="12" r="10" />
                                  <line x1="12" y1="8" x2="12" y2="12" />
                                  <line x1="12" y1="16" x2="12.01" y2="16" />
                                </svg>
                              )}
                            </div>
                          </td>

                          {/* Post Code */}
                          <td style={{ color: '#475569', fontWeight: 500 }}>
                            {user.postCode}
                          </td>

                          {/* Location */}
                          <td style={{ color: '#475569' }}>
                            {user.location}
                          </td>

                          {/* Primary Device */}
                          <td>
                            {renderDeviceIcon(user.primaryDevice)}
                          </td>

                          {/* Plan */}
                          <td>
                            <span
                              className={`ah-badge ${
                                user.plan === 'PAID' ? 'ah-badge-paid' : 'ah-badge-unpaid'
                              }`}
                            >
                              {user.plan}
                            </span>
                          </td>

                          {/* Actions (View Eye) */}
                          <td style={{ textAlign: 'right' }}>
                            <button
                              className="ah-action-btn"
                              title="View user details"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleRowClick(user.id);
                              }}
                            >
                              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                                <circle cx="12" cy="12" r="3" />
                              </svg>
                            </button>
                          </td>
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </table>
            </div>

            {/* Pagination Footer */}
            <div className="ah-footer">
              <div className="ah-footer-text">
                Showing <strong>{users.length}</strong> of{' '}
                <strong>{pagination.total.toLocaleString()}</strong> users
              </div>
              <div className="ah-pagination-btns">
                <button
                  className="ah-btn-pagi"
                  disabled={page <= 1 || loading}
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                >
                  Previous
                </button>
                <button
                  className="ah-btn-pagi"
                  disabled={page >= pagination.totalPages || loading}
                  onClick={() => setPage((p) => p + 1)}
                >
                  Next
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
