import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import Sidebar from '../components/layout/Sidebar';
import Topbar from '../components/layout/Topbar';
import {
  getAccountHolderDetail,
  type AdminUserDetail,
} from '../api/admin.api';
import '../styles/dashboard.css';
import '../styles/account-holders.css';

const DEFAULT_PORTRAIT = 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&fit=crop';

export default function AccountHolderDetail() {
  const { userId } = useParams<{ userId: string }>();
  const navigate = useNavigate();

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [user, setUser] = useState<AdminUserDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!userId) return;

    let isMounted = true;
    setLoading(true);
    setError('');

    getAccountHolderDetail(userId)
      .then((data) => {
        if (isMounted) setUser(data);
      })
      .catch((err) => {
        console.error('Failed to load user details:', err);
        if (isMounted) setError('Failed to load user profile. Please try again.');
      })
      .finally(() => {
        if (isMounted) setLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, [userId]);

  return (
    <>
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <Topbar onMenuClick={() => setSidebarOpen(true)} searchPlaceholder="Search..." />

      <main className="main" style={{ background: '#f8fafc', minHeight: '100vh' }}>
        <div className="ah-container">
          {/* Breadcrumbs: User Management > [User Name] */}
          <div className="ah-breadcrumb">
            <Link to="/account-holders" className="ah-bc-link">
              User Management
            </Link>
            <span className="ah-bc-sep">›</span>
            <span className="ah-bc-current">
              {user?.fullname || 'User Profile'}
            </span>
          </div>

          {loading ? (
            <div className="ah-card">
              <div className="ah-loading-state">
                <svg className="ah-spinner" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#16a34a" strokeWidth="2.5">
                  <circle cx="12" cy="12" r="10" stroke="#e2e8f0" strokeWidth="2.5" />
                  <path d="M12 2a10 10 0 0 1 10 10" />
                </svg>
                <span>Loading user details...</span>
              </div>
            </div>
          ) : error || !user ? (
            <div className="ah-card">
              <div className="ah-empty-state">
                <p style={{ color: '#ef4444', marginBottom: 16 }}>{error || 'User not found'}</p>
                <button
                  className="ah-btn-pagi"
                  onClick={() => navigate('/account-holders')}
                >
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
                  <img
                    className="ah-detail-avatar"
                    src={user.avatarUrl || DEFAULT_PORTRAIT}
                    alt={user.fullname}
                    onError={(e) => {
                      (e.target as HTMLElement).style.display = 'none';
                    }}
                  />
                  <div className="ah-identity-name">
                    <span>{user.fullname}</span>
                    {user.isVerified && (
                      <svg
                        className="ah-verified-check"
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <title>Verified Account</title>
                        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                        <polyline points="22 4 12 14.01 9 11.01" />
                      </svg>
                    )}
                  </div>
                  <div className="ah-identity-username">@{user.username}</div>
                  <div className="ah-identity-email">{user.email}</div>
                </div>

                {/* 2. Subscription Info Card */}
                <div className="ah-sub-card">
                  <div className="ah-card-header">
                    <svg className="ah-card-header-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="8" r="7" />
                      <polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88" />
                    </svg>
                    <span>Subscription Info</span>
                  </div>

                  <div className="ah-sub-row">
                    <span className="ah-sub-label">Plan Type</span>
                    <span className="ah-sub-pill">{user.subscription.planType}</span>
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
                {/* 1. Items of Interest Card */}
                <div className="ah-section-card">
                  <div className="ah-section-header">
                    <div className="ah-section-title">
                      <span>Items of Interest ({user.itemsOfInterest.length})</span>
                    </div>
                    <span className="ah-view-all">View All</span>
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
                            />
                          ) : (
                            <div className="ah-item-thumb" style={{ background: '#e2e8f0' }} />
                          )}
                          <div>
                            <div className="ah-item-name">{item.name}</div>
                            <div className="ah-item-meta">
                              Category: {item.category} • Subcategory: {item.subcategory}
                            </div>
                          </div>
                        </div>
                        <svg className="ah-chevron" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="9 18 15 12 9 6" />
                        </svg>
                      </div>
                    ))}
                  </div>
                </div>

                {/* 2. Notification Preferences Card */}
                <div className="ah-section-card">
                  <div className="ah-section-header" style={{ marginBottom: 14 }}>
                    <div className="ah-section-title">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
                        <path d="M13.73 21a2 2 0 0 1-3.46 0" />
                      </svg>
                      <span>Notification Preferences</span>
                    </div>
                  </div>

                  <div className="ah-keywords-sublabel">ACTIVE KEYWORD ALERTS</div>
                  <div className="ah-keywords-wrap">
                    {user.notificationPreferences.activeKeywords.map((kw, i) => (
                      <span key={i} className="ah-keyword-pill">
                        {kw}
                      </span>
                    ))}
                  </div>
                </div>

                {/* 3. Recent Activity Card */}
                <div className="ah-section-card">
                  <div className="ah-section-header">
                    <div className="ah-section-title">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="12" cy="12" r="10" />
                        <polyline points="12 6 12 12 16 14" />
                      </svg>
                      <span>Recent Activity</span>
                    </div>
                  </div>

                  <div className="ah-timeline">
                    {user.recentActivity.map((act, index) => (
                      <div key={act.id} className="ah-timeline-item">
                        <div className={`ah-timeline-dot ${index === 0 ? 'active' : ''}`} />
                        <div className="ah-timeline-header">
                          <span className="ah-timeline-title">{act.title}</span>
                          <span className="ah-timeline-time">{act.timestamp}</span>
                        </div>
                        <div className="ah-timeline-desc">{act.description}</div>
                      </div>
                    ))}
                  </div>

                  <div className="ah-timeline-footer">
                    <span className="ah-history-link">View Full History</span>
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
