/**
 * Profile.tsx  — with icons added throughout
 *
 * Requires Bootstrap Icons in index.html:
 *   <link rel="stylesheet"
 *     href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css">
 */

import { useState, useEffect, useCallback } from 'react';
import Sidebar from '../components/layout/Sidebar';
import Topbar  from '../components/layout/Topbar';
import {
  getAdminMe,
  getActivityLogs,
  type AdminProfile,
  type ActivityLog,
} from '../api/admin.api';
import '../styles/dashboard.css';
import '../styles/profile.css';

/* ═══════════════ Helpers ═══════════════════════════════════════ */

function timeAgo(iso: string): string {
  const secs = Math.floor((Date.now() - new Date(iso).getTime()) / 1000);
  if (secs < 60)    return `${secs}s ago`;
  if (secs < 3600)  return `${Math.floor(secs / 60)} min${Math.floor(secs / 60) !== 1 ? 's' : ''} ago`;
  if (secs < 86400) return `${Math.floor(secs / 3600)} hr${Math.floor(secs / 3600) !== 1 ? 's' : ''} ago`;
  return `${Math.floor(secs / 86400)} day${Math.floor(secs / 86400) !== 1 ? 's' : ''} ago`;
}

function parseAction(action: string, description: string): { prefix: string; bold: string; suffix: string } {
  const desc = description?.toLowerCase() ?? '';
  if (desc.includes('logged in successfully'))  return { prefix: '', bold: 'Logged in',             suffix: ' successfully' };
  if (desc.includes('attempted to login'))       return { prefix: '', bold: 'Login attempted',       suffix: '' };
  if (desc.includes('logged out'))              return { prefix: '', bold: 'Logged out',             suffix: '' };
  if (desc.includes('updated categor'))         return { prefix: 'Updated ', bold: 'categories',     suffix: '' };
  if (desc.includes('updated profile'))         return { prefix: 'Updated ', bold: 'Profile Information', suffix: '' };
  if (desc.includes('created'))                 return { prefix: 'Created ',  bold: 'new record',    suffix: '' };
  const map: Record<string, { prefix: string; bold: string; suffix: string }> = {
    login:              { prefix: '', bold: 'Logged in',              suffix: ' successfully' },
    login_attempt:      { prefix: '', bold: 'Login attempted',        suffix: '' },
    logout:             { prefix: '', bold: 'Logged out',             suffix: '' },
    update_profile:     { prefix: 'Updated ', bold: 'Profile Information', suffix: '' },
    update_category:    { prefix: 'Updated ', bold: 'categories',    suffix: '' },
    create_category:    { prefix: 'Created a ', bold: 'category',    suffix: '' },
    create_subcategory: { prefix: 'Created a ', bold: 'subcategory', suffix: '' },
    create_content:     { prefix: 'Created ', bold: 'content',       suffix: '' },
  };
  return map[action] ?? { prefix: '', bold: action.replace(/_/g, ' '), suffix: '' };
}

function avatarColor(action: string): 'green' | 'amber' | 'blue' | 'purple' | 'red' {
  if (action === 'login')         return 'green';
  if (action === 'login_attempt') return 'amber';
  if (action === 'logout')        return 'red';
  if (action.includes('category') || action.includes('content')) return 'blue';
  return 'purple';
}

/** Bootstrap icon class for each action type */
function actionIcon(action: string): string {
  if (action === 'login')             return 'bi-box-arrow-in-right';
  if (action === 'login_attempt')     return 'bi-exclamation-triangle';
  if (action === 'logout')            return 'bi-box-arrow-left';
  if (action.includes('update_profile')) return 'bi-person-gear';
  if (action.includes('category'))    return 'bi-tag';
  if (action.includes('content'))     return 'bi-file-text';
  if (action.includes('create'))      return 'bi-plus-circle';
  return 'bi-activity';
}

/** Matching colour for the action icon */
function actionIconColor(action: string): string {
  if (action === 'login')         return '#16a34a';
  if (action === 'login_attempt') return '#d97706';
  if (action === 'logout')        return '#dc2626';
  if (action.includes('category') || action.includes('content')) return '#2563eb';
  return '#7c3aed';
}

/* ═══════════════ Mock sessions ════════════════════════════════ */

interface Session {
  id: string; device: string; detail: string;
  icon: string; location: string;
  isCurrent: boolean; lastActive: string | null;
}
const INITIAL_SESSIONS: Session[] = [
  { id: '1', device: 'MacBook Pro 16"', detail: 'Chrome • macOS', icon: 'bi-laptop',  location: 'San Francisco, CA', isCurrent: true,  lastActive: null },
  { id: '2', device: 'iPhone 14 Pro',   detail: 'App • iOS',      icon: 'bi-phone',   location: 'San Francisco, CA', isCurrent: false, lastActive: '2 hours ago' },
];

type Tab = 'security' | 'sessions' | 'activity';

/* ═══════════════ Component ════════════════════════════════════ */

export default function Profile() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeTab,   setActiveTab]   = useState<Tab>('sessions');

  const [profile, setProfile]               = useState<AdminProfile | null>(null);
  const [profileLoading, setProfileLoading] = useState(true);
  const [sessions, setSessions]             = useState<Session[]>(INITIAL_SESSIONS);

  const [logs,        setLogs]        = useState<ActivityLog[]>([]);
  const [logsLoading, setLogsLoading] = useState(false);
  const [logsError,   setLogsError]   = useState('');
  const [page,        setPage]        = useState(1);
  const [totalPages,  setTotalPages]  = useState(1);
  const [totalLogs,   setTotalLogs]   = useState(0);

  const [pw, setPw]           = useState({ current: '', next: '', confirm: '' });
  const [pwError, setPwError] = useState('');
  const [pwOk,    setPwOk]    = useState('');

  useEffect(() => {
    setProfileLoading(true);
    getAdminMe()
      .then(setProfile)
      .catch(() => {})
      .finally(() => setProfileLoading(false));
  }, []);

  const fetchLogs = useCallback(async (p: number) => {
    setLogsLoading(true); setLogsError('');
    try {
      const res = await getActivityLogs(p, 10);
      setLogs(res.logs ?? []);
      setTotalPages(res.pages ?? 1);
      setTotalLogs(res.total  ?? 0);
    } catch (e: any) {
      setLogsError(e?.response?.data?.message ?? e?.message ?? 'Failed to load activity logs.');
    } finally {
      setLogsLoading(false);
    }
  }, []);

  useEffect(() => {
    if (activeTab === 'activity') fetchLogs(page);
  }, [activeTab, page, fetchLogs]);

  const initials = profile?.name
    ? profile.name.split(' ').map(w => w[0]).join('').toUpperCase().slice(0, 2)
    : 'AR';

  function handleSignOut(id: string) { setSessions(prev => prev.filter(s => s.id !== id)); }
  function handleSignOutAll()        { setSessions(prev => prev.filter(s => s.isCurrent)); }
  function handlePasswordSave() {
    setPwError(''); setPwOk('');
    if (!pw.current)           { setPwError('Current password is required.'); return; }
    if (pw.next.length < 8)    { setPwError('New password must be at least 8 characters.'); return; }
    if (pw.next !== pw.confirm) { setPwError('Passwords do not match.'); return; }
    setPwOk('Password updated successfully!');
    setPw({ current: '', next: '', confirm: '' });
    setTimeout(() => setPwOk(''), 4000);
  }

  return (
    <div className="app">
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      {sidebarOpen && (
        <div
          className="sidebar-overlay open"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <div className="main">
        <Topbar onMenuClick={() => setSidebarOpen(true)} searchPlaceholder="Search administrator" />

        <div className="content pf-content">

          {/* ── Page header ── */}
          <div className="pf-page-hdr">
            <div>
              <h1 className="page-title">
                <i className="bi bi-person-gear pf-page-icon" />
                Profile Settings
              </h1>
              <p className="page-sub">
                Create a new editorial account with full administrative privileges
                and status for the Giftpose platform.
              </p>
            </div>
          </div>

          {/* ══ Profile card ══════════════════════════════════════ */}
          <div className="profile-card">
            <div className="profile-avatar-wrap">
              <div className="profile-avatar pf-avatar-initials">
                {profileLoading ? '…' : initials}
              </div>
              <label className="avatar-edit" title="Change photo">
                <i className="bi bi-pencil-fill" />
                <input type="file" accept="image/*" style={{ display: 'none' }} />
              </label>
            </div>

            <div className="profile-info">
              <div className="profile-name">
                {profileLoading ? 'Loading…' : (profile?.name ?? 'Admin User')}
              </div>
              <div className="badge-role">
                <i className="bi bi-shield-fill-check" style={{ fontSize: '.7rem' }} />
                &nbsp;{profile?.role ?? 'Admin'}
              </div>
              <div className="profile-meta">
                {profile?.email && (
                  <div className="meta-item">
                    <i className="bi bi-envelope-fill" />
                    {profile.email}
                  </div>
                )}
                <div className="meta-item">
                  <i className="bi bi-geo-alt-fill" />
                  San Francisco, CA HQ
                </div>
                {profile?.lastLogin && (
                  <div className="meta-item">
                    <i className="bi bi-clock" />
                    Last login: {new Date(profile.lastLogin).toLocaleDateString()}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* ══ Tab bar ═══════════════════════════════════════════ */}
          <div className="tab-bar">
            <button
              className={`tab-btn${activeTab === 'security' ? ' active' : ''}`}
              onClick={() => setActiveTab('security')}
            >
              <i className="bi bi-shield-lock" />
              Security
            </button>
            <button
              className={`tab-btn${activeTab === 'sessions' ? ' active' : ''}`}
              onClick={() => setActiveTab('sessions')}
            >
              <i className="bi bi-display" />
              My Active Sessions
            </button>
            <button
              className={`tab-btn${activeTab === 'activity' ? ' active' : ''}`}
              onClick={() => { setActiveTab('activity'); setPage(1); }}
            >
              <i className="bi bi-clock-history" />
              My Activity Records
            </button>
          </div>

          {/* ══════════════════════════════════════════════════════
              SECURITY TAB
          ══════════════════════════════════════════════════════ */}
          {activeTab === 'security' && (
            <div className="pf-tab-panel">

              {/* Change password */}
              <div className="security-card">
                <h3 className="pf-card-hdr">
                  <span className="pf-card-hdr-icon pf-icon-key">
                    <i className="bi bi-key-fill" />
                  </span>
                  Change Password
                </h3>
                <p>Update your account password to keep your account secure.</p>

                {pwError && (
                  <div className="pf-alert pf-alert-error">
                    <i className="bi bi-exclamation-circle-fill" /> {pwError}
                  </div>
                )}
                {pwOk && (
                  <div className="pf-alert pf-alert-success">
                    <i className="bi bi-check-circle-fill" /> {pwOk}
                  </div>
                )}

                <div className="form-row">
                  <div className="form-group">
                    <label className="form-label">
                      <i className="bi bi-lock pf-label-icon" /> Current Password
                    </label>
                    <input
                      className="form-input"
                      type="password"
                      placeholder="••••••••"
                      value={pw.current}
                      onChange={e => setPw(p => ({ ...p, current: e.target.value }))}
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">
                      <i className="bi bi-lock-fill pf-label-icon" /> New Password
                    </label>
                    <input
                      className="form-input"
                      type="password"
                      placeholder="Min. 8 characters"
                      value={pw.next}
                      onChange={e => setPw(p => ({ ...p, next: e.target.value }))}
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">
                      <i className="bi bi-lock-fill pf-label-icon" /> Confirm New Password
                    </label>
                    <input
                      className="form-input"
                      type="password"
                      placeholder="••••••••"
                      value={pw.confirm}
                      onChange={e => setPw(p => ({ ...p, confirm: e.target.value }))}
                    />
                  </div>
                </div>

                <button className="btn-save" style={{ marginTop: 16 }} onClick={handlePasswordSave}>
                  <i className="bi bi-check-lg" /> Update Password
                </button>
              </div>

              {/* 2FA */}
              <div className="security-card">
                <h3 className="pf-card-hdr">
                  <span className="pf-card-hdr-icon pf-icon-shield">
                    <i className="bi bi-shield-check" />
                  </span>
                  Two-Factor Authentication
                </h3>
                <p>
                  Add an extra layer of security to your account by requiring
                  a verification code in addition to your password.
                </p>
                <div className="pf-2fa-row">
                  <div className="pf-2fa-status">
                    <i className="bi bi-x-circle pf-2fa-off" />
                    <span>2FA is currently <strong>disabled</strong></span>
                  </div>
                  <button className="btn-save pf-btn-inline">
                    <i className="bi bi-shield-plus" /> Enable 2FA
                  </button>
                </div>
              </div>

            </div>
          )}

          {/* ══════════════════════════════════════════════════════
              ACTIVE SESSIONS TAB
          ══════════════════════════════════════════════════════ */}
          {activeTab === 'sessions' && (
            <div className="pf-tab-panel">
              <div className="sessions-card">

                <div className="sessions-header">
                  <div>
                    <div className="sessions-title-row">
                      <i className="bi bi-display sessions-icon" />
                      <span className="sessions-title">Active Sessions</span>
                    </div>
                    <div className="sessions-sub">
                      Review and manage devices currently logged into your account.
                    </div>
                  </div>
                  {sessions.some(s => !s.isCurrent) && (
                    <button className="btn-signout-all" onClick={handleSignOutAll}>
                      <i className="bi bi-power" /> Sign Out All Sessions
                    </button>
                  )}
                </div>

                <table className="sessions-table">
                  <thead>
                    <tr>
                      <th><i className="bi bi-cpu pf-th-icon" /> Device</th>
                      <th><i className="bi bi-geo-alt pf-th-icon" /> Location</th>
                      <th><i className="bi bi-activity pf-th-icon" /> Status</th>
                      <th><i className="bi bi-gear pf-th-icon" /> Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {sessions.map(s => (
                      <tr key={s.id}>
                        <td>
                          <div className="device-cell">
                            <i className={`bi ${s.icon} device-icon`} />
                            <div>
                              <div className="device-name">{s.device}</div>
                              <div className="device-detail">{s.detail}</div>
                            </div>
                          </div>
                        </td>
                        <td>
                          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                            <i className="bi bi-geo-alt" style={{ color: '#9ca3af', fontSize: '.85rem' }} />
                            {s.location}
                          </div>
                        </td>
                        <td>
                          {s.isCurrent
                            ? (
                              <span className="badge-current">
                                <i className="bi bi-circle-fill pf-pulse-dot" />
                                &nbsp;Current Session
                              </span>
                            )
                            : (
                              <span className="last-active">
                                <i className="bi bi-clock" style={{ marginRight: 4 }} />
                                Last active: {s.lastActive}
                              </span>
                            )
                          }
                        </td>
                        <td>
                          {s.isCurrent
                            ? <span className="dash-line">—</span>
                            : (
                              <button className="btn-signout-row" onClick={() => handleSignOut(s.id)}>
                                <i className="bi bi-box-arrow-right" /> Sign Out
                              </button>
                            )
                          }
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>

              </div>
            </div>
          )}

          {/* ══════════════════════════════════════════════════════
              MY ACTIVITY RECORDS TAB
          ══════════════════════════════════════════════════════ */}
          {activeTab === 'activity' && (
            <div className="pf-tab-panel">
              <div className="activity-card">

                {/* Loading */}
                {logsLoading && (
                  <div className="pf-state-center">
                    <span className="pf-spinner" />
                    Loading activity records…
                  </div>
                )}

                {/* Error */}
                {!logsLoading && logsError && (
                  <div className="pf-state-center" style={{ flexDirection: 'column', gap: 12 }}>
                    <div className="pf-alert pf-alert-error" style={{ margin: 0 }}>
                      <i className="bi bi-exclamation-circle-fill" /> {logsError}
                    </div>
                    <button className="btn-save" style={{ width: 'auto', padding: '7px 20px' }} onClick={() => fetchLogs(page)}>
                      <i className="bi bi-arrow-clockwise" /> Retry
                    </button>
                  </div>
                )}

                {/* Empty */}
                {!logsLoading && !logsError && logs.length === 0 && (
                  <div className="pf-state-center" style={{ flexDirection: 'column', gap: 8 }}>
                    <i className="bi bi-clock-history" style={{ fontSize: 32, color: '#d1d5db' }} />
                    <span>No activity records found.</span>
                  </div>
                )}

                {/* Log list */}
                {!logsLoading && !logsError && logs.length > 0 && (
                  <>
                    <div className="activity-list">
                      {logs.map(log => {
                        const { prefix, bold, suffix } = parseAction(log.action, log.description);
                        const color      = avatarColor(log.action);
                        const aIcon      = actionIcon(log.action);
                        const aIconColor = actionIconColor(log.action);
                        const hasBrowser = log.browser?.trim() && log.browser.trim() !== 'Unknown';
                        const hasOs      = log.os?.trim()      && log.os.trim()      !== 'Unknown';

                        return (
                          <div className="activity-item" key={log._id}>
                            {/* Avatar chip */}
                            <div className={`act-avatar ${color}`}>
                              {initials[0]}
                            </div>

                            {/* Action icon + description */}
                            <div className="act-text">
                              <i
                                className={`bi ${aIcon} pf-act-icon`}
                                style={{ color: aIconColor }}
                              />
                              {prefix}<b>{bold}</b>{suffix}
                              {(hasBrowser || hasOs) && (
                                <span className="pf-log-meta">
                                  &nbsp;·&nbsp;
                                  {hasBrowser && log.browser.trim()}
                                  {hasBrowser && hasOs && ' · '}
                                  {hasOs && log.os.trim()}
                                </span>
                              )}
                              {log.ipAddress && log.ipAddress !== '::1' && (
                                <span className="pf-log-meta"> · {log.ipAddress}</span>
                              )}
                            </div>

                            {/* Time */}
                            <div className="act-time">
                              <span className="act-dot" />
                              {timeAgo(log.createdAt)}
                            </div>
                          </div>
                        );
                      })}
                    </div>

                    {/* Pagination */}
                    {totalPages > 1 && (
                      <div className="pf-pagination">
                        <span className="pf-pagination-total">
                          <i className="bi bi-list-ul" style={{ marginRight: 5 }} />
                          {totalLogs} total record{totalLogs !== 1 ? 's' : ''}
                        </span>
                        <div className="pf-pagination-controls">
                          <button className="pf-page-btn" disabled={page === 1} onClick={() => setPage(p => p - 1)}>
                            <i className="bi bi-chevron-left" /> Prev
                          </button>
                          <span className="pf-page-info">{page} / {totalPages}</span>
                          <button className="pf-page-btn" disabled={page === totalPages} onClick={() => setPage(p => p + 1)}>
                            Next <i className="bi bi-chevron-right" />
                          </button>
                        </div>
                      </div>
                    )}
                  </>
                )}

              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}