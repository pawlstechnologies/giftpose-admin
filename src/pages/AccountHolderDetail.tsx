import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import Sidebar from '../components/layout/Sidebar';
import Topbar from '../components/layout/Topbar';
import {
  getAccountHolderDetail,
  toggleUserVerification,
  updateUserStatus,
  type AdminUserDetail,
} from '../api/admin.api';
import '../styles/dashboard.css';
import '../styles/account-holders.css';

export default function AccountHolderDetail() {
  const { userId } = useParams<{ userId: string }>();
  const navigate = useNavigate();

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [user, setUser] = useState<AdminUserDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [actionLoading, setActionLoading] = useState(false);
  const [copiedId, setCopiedId] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  const loadUserDetails = (uid: string) => {
    setLoading(true);
    setError('');
    getAccountHolderDetail(uid)
      .then((data) => {
        setUser(data);
      })
      .catch((err) => {
        console.error('Failed to load user details:', err);
        setError('Failed to load user profile. Please try again.');
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    if (!userId) return;
    loadUserDetails(userId);
  }, [userId]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage('');
    }, 3000);
  };

  const handleToggleVerification = async () => {
    if (!user || !userId) return;
    setActionLoading(true);
    try {
      const res = await toggleUserVerification(userId);
      setUser((prev) => (prev ? { ...prev, isVerified: res.isVerified } : null));
      showToast(`User ${res.isVerified ? 'verified' : 'unverified'} successfully`);
    } catch (err: any) {
      console.error('Error toggling verification:', err);
      showToast('Failed to update verification status');
    } finally {
      setActionLoading(false);
    }
  };

  const handleToggleStatus = async () => {
    if (!user || !userId) return;
    setActionLoading(true);
    const newStatus = (user as any).status === 'suspended' ? 'active' : 'suspended';
    try {
      await updateUserStatus(userId, newStatus);
      setUser((prev: any) => (prev ? { ...prev, status: newStatus } : null));
      showToast(`User marked as ${newStatus}`);
    } catch (err: any) {
      console.error('Error updating status:', err);
      showToast('Failed to update user status');
    } finally {
      setActionLoading(false);
    }
  };

  const copyToClipboard = (text: string, type: 'id' | 'email') => {
    navigator.clipboard.writeText(text);
    if (type === 'id') {
      setCopiedId(true);
      setTimeout(() => setCopiedId(false), 2000);
      showToast('User ID copied to clipboard');
    } else {
      setCopiedEmail(true);
      setTimeout(() => setCopiedEmail(false), 2000);
      showToast('Email address copied');
    }
  };

  const getUserInitials = (name: string) => {
    if (!name) return 'U';
    return name
      .trim()
      .split(' ')
      .map((w) => w[0] || '')
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <>
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <Topbar onMenuClick={() => setSidebarOpen(true)} searchPlaceholder="Search users, items, or devices..." />

      <main className="main" style={{ background: '#f8fafc', minHeight: '100vh', position: 'relative' }}>
        {/* Floating Toast Notification */}
        {toastMessage && (
          <div
            style={{
              position: 'fixed',
              top: 76,
              right: 32,
              background: '#0f172a',
              color: '#ffffff',
              padding: '10px 18px',
              borderRadius: 10,
              fontSize: 13,
              fontWeight: 600,
              boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)',
              zIndex: 9999,
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              animation: 'fadeIn 0.2s ease',
            }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="2.5">
              <polyline points="20 6 9 17 4 12" />
            </svg>
            {toastMessage}
          </div>
        )}

        <div className="ah-container">
          {/* Breadcrumbs & Header Actions */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: 20,
              flexWrap: 'wrap',
              gap: 12,
            }}
          >
            <div className="ah-breadcrumb" style={{ margin: 0 }}>
              <Link to="/account-holders" className="ah-bc-link">
                User Management
              </Link>
              <span className="ah-bc-sep">›</span>
              <span className="ah-bc-current">{user?.fullname || 'Account Details'}</span>
              {user && (
                <span
                  style={{
                    marginLeft: 6,
                    background: '#f1f5f9',
                    padding: '2px 8px',
                    borderRadius: 6,
                    fontSize: 11,
                    fontFamily: 'monospace',
                    color: '#64748b',
                  }}
                >
                  {user.id}
                </span>
              )}
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <button
                className="ah-btn-pagi"
                onClick={() => userId && loadUserDetails(userId)}
                title="Refresh user data"
                style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M23 4v6h-6" />
                  <path d="M1 20v-6h6" />
                  <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15" />
                </svg>
                Refresh
              </button>
              <button
                className="ah-btn-pagi"
                onClick={() => navigate('/account-holders')}
                style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="15 18 9 12 15 6" />
                </svg>
                Directory
              </button>
            </div>
          </div>

          {loading ? (
            <div className="ah-card">
              <div className="ah-loading-state" style={{ padding: '60px 0' }}>
                <svg
                  className="ah-spinner"
                  width="36"
                  height="36"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#16a34a"
                  strokeWidth="2.5"
                  style={{ animation: 'spin 0.8s linear infinite' }}
                >
                  <circle cx="12" cy="12" r="10" stroke="#e2e8f0" strokeWidth="2.5" />
                  <path d="M12 2a10 10 0 0 1 10 10" />
                </svg>
                <span style={{ marginTop: 12, fontSize: 14, fontWeight: 500, color: '#64748b' }}>
                  Loading comprehensive account details...
                </span>
              </div>
            </div>
          ) : error || !user ? (
            <div className="ah-card">
              <div className="ah-empty-state" style={{ padding: '60px 0' }}>
                <p style={{ color: '#ef4444', marginBottom: 16, fontSize: 15, fontWeight: 600 }}>
                  {error || 'User not found in system'}
                </p>
                <button className="ah-btn-pagi" onClick={() => navigate('/account-holders')}>
                  Back to Directory
                </button>
              </div>
            </div>
          ) : (
            <div className="ah-details-grid">
              {/* ── LEFT COLUMN ── */}
              <div className="ah-left-col">
                {/* 1. Identity Profile Card */}
                <div className="ah-identity-card">
                  {user.avatarUrl ? (
                    <img
                      className="ah-detail-avatar"
                      src={user.avatarUrl}
                      alt={user.fullname}
                      onError={(e) => {
                        (e.target as HTMLElement).style.display = 'none';
                      }}
                    />
                  ) : (
                    <div
                      className="ah-detail-avatar"
                      style={{
                        background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                        color: '#ffffff',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: 30,
                        fontWeight: 700,
                        letterSpacing: 1,
                      }}
                    >
                      {getUserInitials(user.fullname)}
                    </div>
                  )}

                  <div className="ah-identity-name" style={{ marginTop: 6 }}>
                    <span>{user.fullname}</span>
                    {user.isVerified && (
                      <span title="Verified Account">
                        <svg
                          className="ah-verified-check"
                          width="20"
                          height="20"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="#16a34a"
                          strokeWidth="2.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                          <polyline points="22 4 12 14.01 9 11.01" />
                        </svg>
                      </span>
                    )}
                  </div>

                  <div className="ah-identity-username">@{user.username || 'user'}</div>

                  <div
                    className="ah-identity-email"
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 6,
                      background: '#f8fafc',
                      padding: '4px 10px',
                      borderRadius: 8,
                      border: '1px solid #e2e8f0',
                      cursor: 'pointer',
                    }}
                    onClick={() => copyToClipboard(user.email, 'email')}
                    title="Click to copy email"
                  >
                    <span>{copiedEmail ? 'Copied Email!' : user.email}</span>
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#64748b" strokeWidth="2">
                      <rect x="9" y="9" width="13" height="13" rx="2" />
                      <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                    </svg>
                  </div>

                  {/* Device and Location Badge */}
                  <div
                    style={{
                      display: 'flex',
                      flexWrap: 'wrap',
                      gap: 6,
                      justifyContent: 'center',
                      marginTop: 14,
                    }}
                  >
                    <span
                      style={{
                        background: '#f1f5f9',
                        color: '#475569',
                        fontSize: 11.5,
                        fontWeight: 600,
                        padding: '3px 9px',
                        borderRadius: 6,
                      }}
                    >
                      Device: {user.deviceId || 'Primary Device'}
                    </span>
                    <span
                      style={{
                        background: '#e0f2fe',
                        color: '#0369a1',
                        fontSize: 11.5,
                        fontWeight: 600,
                        padding: '3px 9px',
                        borderRadius: 6,
                      }}
                    >
                      {user.location.city || 'United Kingdom'}
                    </span>
                  </div>

                  {/* Admin Quick Action Controls */}
                  <div
                    style={{
                      width: '100%',
                      marginTop: 20,
                      paddingTop: 16,
                      borderTop: '1px solid #f1f5f9',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: 8,
                    }}
                  >
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
                      <button
                        onClick={handleToggleVerification}
                        disabled={actionLoading}
                        style={{
                          padding: '7px 10px',
                          borderRadius: 8,
                          border: user.isVerified ? '1px solid #fecaca' : '1px solid #bbf7d0',
                          background: user.isVerified ? '#fef2f2' : '#f0fdf4',
                          color: user.isVerified ? '#dc2626' : '#16a34a',
                          fontSize: 12,
                          fontWeight: 700,
                          cursor: 'pointer',
                        }}
                      >
                        {user.isVerified ? 'Unverify User' : 'Verify User'}
                      </button>

                      <button
                        onClick={handleToggleStatus}
                        disabled={actionLoading}
                        style={{
                          padding: '7px 10px',
                          borderRadius: 8,
                          border: (user as any).status === 'suspended' ? '1px solid #bbf7d0' : '1px solid #fed7aa',
                          background: (user as any).status === 'suspended' ? '#f0fdf4' : '#fff7ed',
                          color: (user as any).status === 'suspended' ? '#16a34a' : '#c2410c',
                          fontSize: 12,
                          fontWeight: 700,
                          cursor: 'pointer',
                        }}
                      >
                        {(user as any).status === 'suspended' ? 'Activate User' : 'Suspend User'}
                      </button>
                    </div>

                    <button
                      onClick={() => copyToClipboard(user.id, 'id')}
                      style={{
                        padding: '7px 12px',
                        borderRadius: 8,
                        border: '1px solid #e2e8f0',
                        background: '#ffffff',
                        color: '#64748b',
                        fontSize: 12,
                        fontWeight: 600,
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: 6,
                      }}
                    >
                      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <rect x="9" y="9" width="13" height="13" rx="2" />
                        <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                      </svg>
                      {copiedId ? 'Copied ID!' : 'Copy User ID'}
                    </button>
                  </div>
                </div>

                {/* 2. Location & Coverage Card */}
                <div className="ah-sub-card">
                  <div className="ah-card-header">
                    <svg className="ah-card-header-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                      <circle cx="12" cy="10" r="3" />
                    </svg>
                    <span>Location & Range</span>
                  </div>

                  <div className="ah-sub-row">
                    <span className="ah-sub-label">City</span>
                    <span className="ah-sub-value">{user.location.city || 'Crewe'}</span>
                  </div>

                  <div className="ah-sub-row">
                    <span className="ah-sub-label">Postcode</span>
                    <span className="ah-sub-value">{user.location.postCode || 'CW1 3AZ'}</span>
                  </div>

                  {user.location.address && (
                    <div className="ah-sub-row">
                      <span className="ah-sub-label">Address</span>
                      <span className="ah-sub-value" style={{ textAlign: 'right', maxWidth: 170, fontSize: 12 }}>
                        {user.location.address}
                      </span>
                    </div>
                  )}

                  <div className="ah-sub-row">
                    <span className="ah-sub-label">Discovery Radius</span>
                    <span className="ah-sub-value">
                      <span style={{ background: '#ecfdf5', color: '#16a34a', padding: '2px 8px', borderRadius: 6, fontWeight: 700 }}>
                        {user.location.miles || 5} Miles
                      </span>
                    </span>
                  </div>
                </div>

                {/* 3. Subscription Info Card */}
                <div className="ah-sub-card">
                  <div className="ah-card-header">
                    <svg className="ah-card-header-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <circle cx="12" cy="8" r="7" />
                      <polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88" />
                    </svg>
                    <span>Subscription Info</span>
                  </div>

                  <div className="ah-sub-row">
                    <span className="ah-sub-label">Plan Type</span>
                    <span className="ah-sub-pill" style={{ background: user.subscription.planType === 'Free Tier' ? '#f1f5f9' : '#e8f7ef', color: user.subscription.planType === 'Free Tier' ? '#475569' : '#16a34a' }}>
                      {user.subscription.planType}
                    </span>
                  </div>

                  <div className="ah-sub-row">
                    <span className="ah-sub-label">Status</span>
                    <span className="ah-status-dot-wrap">
                      <span
                        className={
                          user.subscription.status === 'Active'
                            ? 'ah-dot-green'
                            : user.subscription.status === 'Past Due'
                            ? 'ah-dot-amber'
                            : 'ah-dot-grey'
                        }
                      />
                      <span className="ah-sub-value">{user.subscription.status}</span>
                    </span>
                  </div>

                  <div className="ah-sub-row">
                    <span className="ah-sub-label">Price</span>
                    <span className="ah-sub-value">{user.subscription.price}</span>
                  </div>

                  <div className="ah-sub-row">
                    <span className="ah-sub-label">Renewal Date</span>
                    <span className="ah-sub-value">{user.subscription.renewalDate || '—'}</span>
                  </div>
                </div>
              </div>

              {/* ── RIGHT COLUMN ── */}
              <div className="ah-right-col">
                {/* 1. Items of Interest & Catalog Highlights */}
                <div className="ah-section-card">
                  <div className="ah-section-header">
                    <div className="ah-section-title">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#16a34a" strokeWidth="2">
                        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                      </svg>
                      <span>Items of Interest & Matches ({user.itemsOfInterest.length})</span>
                    </div>
                    <span className="ah-view-all">Total Catalog: 1,141</span>
                  </div>

                  <div className="ah-items-list">
                    {user.itemsOfInterest.map((item) => (
                      <div key={item.id} className="ah-item-row">
                        <div className="ah-item-info">
                          {item.imageUrl ? (
                            <img
                              className="ah-item-thumb"
                              src={item.imageUrl}
                              alt={item.name}
                              onError={(e) => {
                                (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?w=120&h=120&fit=crop';
                              }}
                            />
                          ) : (
                            <div className="ah-item-thumb" style={{ background: '#e2e8f0', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="2">
                                <rect x="3" y="3" width="18" height="18" rx="2" />
                                <circle cx="8.5" cy="8.5" r="1.5" />
                                <polyline points="21 15 16 10 5 21" />
                              </svg>
                            </div>
                          )}
                          <div>
                            <div className="ah-item-name">{item.name}</div>
                            <div className="ah-item-meta" style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 4 }}>
                              <span style={{ background: '#f1f5f9', padding: '2px 8px', borderRadius: 4, fontSize: 11, fontWeight: 600, color: '#475569' }}>
                                {item.category}
                              </span>
                              <span>•</span>
                              <span style={{ color: '#64748b', fontSize: 12 }}>
                                {item.subcategory}
                              </span>
                            </div>
                          </div>
                        </div>

                        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                          <span
                            style={{
                              background: '#ecfdf5',
                              color: '#16a34a',
                              fontSize: 11,
                              fontWeight: 700,
                              padding: '2px 8px',
                              borderRadius: 6,
                              textTransform: 'uppercase',
                            }}
                          >
                            {item.type || 'Offer'}
                          </span>
                          <svg className="ah-chevron" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <polyline points="9 18 15 12 9 6" />
                          </svg>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* 2. Notification Preferences & Keyword Alerts */}
                <div className="ah-section-card">
                  <div className="ah-section-header" style={{ marginBottom: 12 }}>
                    <div className="ah-section-title">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#16a34a" strokeWidth="2">
                        <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
                        <path d="M13.73 21a2 2 0 0 1-3.46 0" />
                      </svg>
                      <span>Notification Preferences</span>
                    </div>
                    <span
                      style={{
                        background: '#e8f7ef',
                        color: '#16a34a',
                        padding: '3px 10px',
                        borderRadius: 12,
                        fontSize: 12,
                        fontWeight: 700,
                      }}
                    >
                      {user.notificationPreferences.activeKeywords.length} Active Keywords
                    </span>
                  </div>

                  <div className="ah-keywords-sublabel" style={{ marginBottom: 10, fontSize: 11, fontWeight: 700, letterSpacing: 0.5, color: '#64748b' }}>
                    MONITORED KEYWORDS
                  </div>
                  <div className="ah-keywords-wrap" style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                    {user.notificationPreferences.activeKeywords.map((kw, i) => (
                      <span
                        key={i}
                        className="ah-keyword-pill"
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: 6,
                          background: '#f0fdf4',
                          border: '1px solid #bbf7d0',
                          color: '#16a34a',
                          padding: '6px 14px',
                          borderRadius: 20,
                          fontSize: 13,
                          fontWeight: 600,
                        }}
                      >
                        <span style={{ opacity: 0.6 }}>#</span>
                        {kw}
                      </span>
                    ))}
                  </div>
                </div>

                {/* 3. Recent Activity Timeline */}
                <div className="ah-section-card">
                  <div className="ah-section-header">
                    <div className="ah-section-title">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#16a34a" strokeWidth="2">
                        <circle cx="12" cy="12" r="10" />
                        <polyline points="12 6 12 12 16 14" />
                      </svg>
                      <span>Recent Activity & Alerts ({user.recentActivity.length})</span>
                    </div>
                    <span className="ah-history-link" style={{ fontSize: 12, fontWeight: 600, color: '#16a34a' }}>
                      Audit Verified
                    </span>
                  </div>

                  <div className="ah-timeline">
                    {user.recentActivity.map((act, index) => (
                      <div key={act.id} className="ah-timeline-item">
                        <div
                          className={`ah-timeline-dot ${index === 0 ? 'active' : ''}`}
                          style={{
                            background:
                              act.type === 'notification'
                                ? '#3b82f6'
                                : act.type === 'location'
                                ? '#f59e0b'
                                : act.type === 'auth'
                                ? '#8b5cf6'
                                : '#16a34a',
                          }}
                        />
                        <div className="ah-timeline-header">
                          <span className="ah-timeline-title" style={{ fontWeight: 700, color: '#0f172a' }}>
                            {act.title}
                          </span>
                          <span className="ah-timeline-time" style={{ fontSize: 12, color: '#94a3b8' }}>
                            {act.timestamp}
                          </span>
                        </div>
                        <div className="ah-timeline-desc" style={{ color: '#475569', fontSize: 13, marginTop: 4 }}>
                          {act.description}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </>
  );
}
