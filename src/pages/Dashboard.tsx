import { useState, useEffect } from 'react';
import Sidebar from '../components/layout/Sidebar';
import Topbar from '../components/layout/Topbar';
import StatCard from '../components/dashboard/StatCard';
import TrafficChart from '../components/dashboard/TrafficChart';
import AsideStatCard from '../components/dashboard/AsideStatCard';
import MetricSection from '../components/dashboard/MetricSection';
import { getDashboardData, type DashboardData, type DashboardPeriod } from '../api/admin.api';
import '../styles/dashboard.css';

const DEFAULT_CHART_BARS = [
  { day: 'MON', val: 52, color: '#b7e8cc' },
  { day: 'TUE', val: 72, color: '#7dd4a4' },
  { day: 'WED', val: 48, color: '#b7e8cc' },
  { day: 'THU', val: 82, color: '#5cbf85' },
  { day: 'FRI', val: 60, color: '#b7e8cc' },
  { day: 'SAT', val: 100, color: '#27ae60' },
  { day: 'SUN', val: 88, color: '#229954' },
];

export default function Dashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [period, setPeriod] = useState<DashboardPeriod>('30');
  const [customStart, setCustomStart] = useState('');
  const [customEnd, setCustomEnd] = useState('');
  const [filterDropdownOpen, setFilterDropdownOpen] = useState(false);
  const [showCustomModal, setShowCustomModal] = useState(false);

  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<DashboardData | null>(null);

  const fetchDashboard = (
    p: DashboardPeriod,
    sDate?: string,
    eDate?: string
  ) => {
    setLoading(true);
    getDashboardData({
      period: p,
      startDate: sDate,
      endDate: eDate,
    })
      .then((res) => {
        setData(res);
      })
      .catch((err) => {
        console.error('Failed to load live dashboard data:', err);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchDashboard(period);
  }, [period]);

  const handlePeriodChange = (newPeriod: DashboardPeriod) => {
    setFilterDropdownOpen(false);
    if (newPeriod === 'custom') {
      setShowCustomModal(true);
    } else {
      setPeriod(newPeriod);
    }
  };

  const applyCustomRange = () => {
    if (!customStart) return;
    setShowCustomModal(false);
    setPeriod('custom');
    fetchDashboard('custom', customStart, customEnd || undefined);
  };

  const getPeriodLabel = () => {
    switch (period) {
      case 'today':
        return 'Today';
      case '7':
        return 'Last 7 Days';
      case '30':
        return 'Last 30 Days';
      case '60':
        return 'Last 60 Days';
      case 'custom':
        return customStart ? `${customStart} - ${customEnd || 'Now'}` : 'Custom Range';
      default:
        return 'Last 30 Days';
    }
  };

  const exportReport = () => {
    if (!data) return;
    const rows = [
      ['Metric', 'Value', 'Change / Detail'],
      ...data.statCards.map((c) => [c.label, c.value, c.badge || '']),
      ...data.asideStats.map((a) => [a.label, a.value, a.subtext || '']),
      ...data.donationMetrics.map((d) => [`Donation: ${d.label}`, `${d.value} ${d.suffix || ''}`, '']),
      ...data.requestMetrics.map((r) => [`Request: ${r.label}`, `${r.value} ${r.suffix || ''}`, '']),
    ];

    const csvContent = 'data:text/csv;charset=utf-8,' + rows.map((e) => e.join(',')).join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `giftpose_dashboard_${period}_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Icons for Stat Cards
  const statCardIcons = [
    <svg key="1" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#27ae60" strokeWidth="2">
      <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" />
    </svg>,
    <svg key="2" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#3b82f6" strokeWidth="2">
      <rect x="5" y="2" width="14" height="20" rx="2" />
      <line x1="12" y1="18" x2="12.01" y2="18" />
    </svg>,
    <svg key="3" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#f97316" strokeWidth="2">
      <rect x="3" y="3" width="18" height="18" rx="2" />
      <path d="M9 9h6M9 12h6M9 15h4" />
    </svg>,
    <svg key="4" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#8b5cf6" strokeWidth="2">
      <rect x="2" y="5" width="20" height="14" rx="2" />
      <line x1="2" y1="10" x2="22" y2="10" />
    </svg>,
  ];

  const iconVariants: Array<'teal' | 'blue' | 'orange' | 'purple'> = ['teal', 'blue', 'orange', 'purple'];

  // Icons for Aside Stats
  const asideIcons = [
    {
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#27ae60" strokeWidth="2">
          <circle cx="12" cy="12" r="10" />
          <path d="M12 8v4l3 3" />
        </svg>
      ),
      bg: '#e8f7ef',
      color: '#27ae60',
    },
    {
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#ef4444" strokeWidth="2">
          <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
          <polyline points="17 6 23 6 23 12" />
        </svg>
      ),
      bg: '#fef2f2',
      color: '#ef4444',
    },
    {
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#3b82f6" strokeWidth="2">
          <path d="M23 4v6h-6" />
          <path d="M1 20v-6h6" />
          <path d="M3.51 9a9 9 0 0114.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0020.49 15" />
        </svg>
      ),
      bg: '#eff6ff',
      color: '#3b82f6',
    },
    {
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#888" strokeWidth="2">
          <circle cx="12" cy="12" r="10" />
          <polyline points="12 6 12 12 16 14" />
        </svg>
      ),
      bg: '#f4f5f7',
      color: '#888',
    },
  ];

  return (
    <>
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <Topbar onMenuClick={() => setSidebarOpen(true)} />

      <main className="main" style={{ position: 'relative' }}>
        {/* ── Page Header with Live Filter Dropdown ── */}
        <div className="page-hdr">
          <div className="ph-left">
            <div className="ph-title" style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              Platform Overview
              {loading && (
                <span style={{ fontSize: 12, fontWeight: 500, color: '#16a34a', display: 'inline-flex', alignItems: 'center', gap: 4 }}>
                  <svg style={{ animation: 'spin 1s linear infinite' }} width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#16a34a" strokeWidth="2.5">
                    <circle cx="12" cy="12" r="10" stroke="#dcfce7" strokeWidth="2.5" />
                    <path d="M12 2a10 10 0 0 1 10 10" />
                  </svg>
                  Updating...
                </span>
              )}
            </div>
            <div className="ph-sub">Live real-time statistics and metrics across the GiftPose platform</div>
          </div>

          <div className="ph-actions" style={{ position: 'relative' }}>
            {/* Filter Button */}
            <div style={{ position: 'relative' }}>
              <button
                className="btn-date"
                onClick={() => setFilterDropdownOpen(!filterDropdownOpen)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 8,
                  borderColor: filterDropdownOpen ? '#27ae60' : undefined,
                  boxShadow: filterDropdownOpen ? '0 0 0 2px rgba(39, 174, 96, 0.15)' : undefined,
                }}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#27ae60" strokeWidth="2">
                  <rect x="3" y="4" width="18" height="18" rx="2" />
                  <line x1="16" y1="2" x2="16" y2="6" />
                  <line x1="8" y1="2" x2="8" y2="6" />
                  <line x1="3" y1="10" x2="21" y2="10" />
                </svg>
                <span style={{ fontWeight: 600, color: '#0f172a' }}>{getPeriodLabel()}</span>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="6 9 12 15 18 9" />
                </svg>
              </button>

              {/* Filter Options Menu */}
              {filterDropdownOpen && (
                <div
                  style={{
                    position: 'absolute',
                    top: 'calc(100% + 6px)',
                    right: 0,
                    width: 190,
                    background: '#ffffff',
                    border: '1px solid #e2e8f0',
                    borderRadius: 12,
                    boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.05)',
                    padding: '6px',
                    zIndex: 200,
                  }}
                >
                  {[
                    { id: 'today', label: 'Today' },
                    { id: '7', label: 'Last 7 Days' },
                    { id: '30', label: 'Last 30 Days' },
                    { id: '60', label: 'Last 60 Days' },
                    { id: 'custom', label: 'Custom Range...' },
                  ].map((opt) => (
                    <button
                      key={opt.id}
                      onClick={() => handlePeriodChange(opt.id as DashboardPeriod)}
                      style={{
                        width: '100%',
                        textAlign: 'left',
                        padding: '8px 12px',
                        borderRadius: 8,
                        border: 'none',
                        background: period === opt.id ? '#e8f7ef' : 'transparent',
                        color: period === opt.id ? '#16a34a' : '#334155',
                        fontWeight: period === opt.id ? 700 : 500,
                        fontSize: 13,
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                      }}
                    >
                      <span>{opt.label}</span>
                      {period === opt.id && (
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#16a34a" strokeWidth="2.5">
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                      )}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Export Report Button */}
            <button className="btn-export" onClick={exportReport} title="Export CSV Report">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" />
                <polyline points="7 10 12 15 17 10" />
                <line x1="12" y1="15" x2="12" y2="3" />
              </svg>
              Export Report
            </button>
          </div>
        </div>

        {/* ── Custom Range Modal ── */}
        {showCustomModal && (
          <div
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: 'rgba(0,0,0,0.4)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              zIndex: 300,
            }}
          >
            <div
              style={{
                background: '#fff',
                borderRadius: 16,
                padding: 24,
                width: 380,
                maxWidth: '90%',
                boxShadow: '0 20px 25px -5px rgba(0,0,0,0.1)',
              }}
            >
              <h3 style={{ fontSize: 17, fontWeight: 700, marginBottom: 14, color: '#0f172a' }}>
                Select Custom Date Range
              </h3>
              <div style={{ marginBottom: 12 }}>
                <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: '#64748b', marginBottom: 4 }}>
                  Start Date
                </label>
                <input
                  type="date"
                  value={customStart}
                  onChange={(e) => setCustomStart(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '8px 12px',
                    borderRadius: 8,
                    border: '1px solid #cbd5e1',
                    fontSize: 14,
                  }}
                />
              </div>
              <div style={{ marginBottom: 20 }}>
                <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: '#64748b', marginBottom: 4 }}>
                  End Date
                </label>
                <input
                  type="date"
                  value={customEnd}
                  onChange={(e) => setCustomEnd(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '8px 12px',
                    borderRadius: 8,
                    border: '1px solid #cbd5e1',
                    fontSize: 14,
                  }}
                />
              </div>
              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 10 }}>
                <button
                  onClick={() => setShowCustomModal(false)}
                  style={{
                    padding: '8px 16px',
                    borderRadius: 8,
                    border: '1px solid #e2e8f0',
                    background: '#fff',
                    color: '#64748b',
                    fontSize: 13,
                    fontWeight: 600,
                    cursor: 'pointer',
                  }}
                >
                  Cancel
                </button>
                <button
                  onClick={applyCustomRange}
                  disabled={!customStart}
                  style={{
                    padding: '8px 18px',
                    borderRadius: 8,
                    border: 'none',
                    background: '#16a34a',
                    color: '#fff',
                    fontSize: 13,
                    fontWeight: 600,
                    cursor: customStart ? 'pointer' : 'not-allowed',
                    opacity: customStart ? 1 : 0.6,
                  }}
                >
                  Apply Filter
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ── Stat Grid ── */}
        <div className="stat-grid">
          {data ? (
            data.statCards.map((card, i) => (
              <StatCard
                key={card.label}
                label={card.label}
                value={card.value}
                icon={statCardIcons[i % statCardIcons.length]}
                iconVariant={iconVariants[i % iconVariants.length]}
                badge={card.badge}
                badgeVariant={card.badgeVariant}
              />
            ))
          ) : (
            [...Array(4)].map((_, i) => (
              <div key={i} className="stat-card" style={{ opacity: 0.6 }}>
                <div className="sc-top">
                  <div className="sc-icon teal" />
                  <span className="badge pos">...</span>
                </div>
                <div className="sc-label">Loading...</div>
                <div className="sc-value">—</div>
              </div>
            ))
          )}
        </div>

        {/* ── Mid Row: Chart + Aside ── */}
        <div className="mid-row">
          <TrafficChart
            data={data?.trafficChart.data || DEFAULT_CHART_BARS}
            title={data?.trafficChart.title || 'Traffic Trends'}
            subtitle={data?.trafficChart.subtitle || 'Volume analysis for the selected period'}
          />
          <div className="stats-aside">
            {data ? (
              data.asideStats.map((s, i) => (
                <AsideStatCard
                  key={s.label}
                  label={s.label}
                  value={s.value}
                  valColor={s.valColor}
                  icon={asideIcons[i % asideIcons.length].icon}
                  iconBg={asideIcons[i % asideIcons.length].bg}
                  iconColor={asideIcons[i % asideIcons.length].color}
                />
              ))
            ) : (
              [...Array(4)].map((_, i) => (
                <div key={i} className="aside-card" style={{ opacity: 0.6 }}>
                  <div>
                    <div className="ac-label">Loading...</div>
                    <div className="ac-val green">—</div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* ── Bottom Row: Donation + Request ── */}
        <div className="bottom-row">
          <MetricSection
            title="Donation Metrics"
            iconVariant="green-bg"
            metrics={data?.donationMetrics || [
              { label: 'Items Posted', value: '...', accent: true },
              { label: 'Avg Rating', value: '4.8', suffix: '/ 5.0' },
              { label: 'Response Rate', value: '94.2%' },
              { label: 'Avg Completion', value: '2.4', suffix: 'Days' },
              { label: 'Stagnant Posts', value: '0' },
              { label: 'Archived Items', value: '0' },
            ]}
            icon={
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2">
                <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" />
              </svg>
            }
          />
          <MetricSection
            title="Request Metrics"
            iconVariant="dark-bg"
            metrics={data?.requestMetrics || [
              { label: 'Requested Items', value: '0', accent: true },
              { label: 'Avg Offers', value: '3.1', suffix: 'per req' },
              { label: 'No Offers', value: '0' },
              { label: 'Completion Time', value: '4.1', suffix: 'Days' },
              { label: 'Requester Rating', value: '4.9' },
              { label: 'Archived Requests', value: '0' },
            ]}
            icon={
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2">
                <circle cx="9" cy="21" r="1" />
                <circle cx="20" cy="21" r="1" />
                <path d="M1 1h4l2.68 13.39a2 2 0 002 1.61h9.72a2 2 0 001.96-1.61L23 6H6" />
              </svg>
            }
          />
        </div>
      </main>
    </>
  );
}
