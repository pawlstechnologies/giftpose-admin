import { useState } from 'react';
import Sidebar from '../components/layout/Sidebar';
import Topbar from '../components/layout/Topbar';
import StatCard from '../components/dashboard/StatCard';
import TrafficChart from '../components/dashboard/TrafficChart';
import AsideStatCard from '../components/dashboard/AsideStatCard';
// import MetricSection, { MetricItem } from '../components/dashboard/MetricSection';
import MetricSection from '../components/dashboard/MetricSection';
import type { MetricItem } from '../components/dashboard/MetricSection';
import '../styles/dashboard.css';

/* ─── Dummy data ─────────────────────────────────────────────────── */

const STAT_CARDS = [
  {
    label: 'Total Users',
    value: '24,502',
    iconVariant: 'teal' as const,
    badge: '+12.5%',
    badgeVariant: 'pos' as const,
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#27ae60" strokeWidth="2">
        <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" />
      </svg>
    ),
  },
  {
    label: 'Total Devices',
    value: '24,502',
    iconVariant: 'blue' as const,
    badge: '+5.2%',
    badgeVariant: 'pos' as const,
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#3b82f6" strokeWidth="2">
        <rect x="5" y="2" width="14" height="20" rx="2" />
        <line x1="12" y1="18" x2="12.01" y2="18" />
      </svg>
    ),
  },
  {
    label: 'Active Items',
    value: '3,105',
    iconVariant: 'orange' as const,
    badge: '-2.1%',
    badgeVariant: 'neg' as const,
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#f97316" strokeWidth="2">
        <rect x="3" y="3" width="18" height="18" rx="2" />
        <path d="M9 9h6M9 12h6M9 15h4" />
      </svg>
    ),
  },
  {
    label: 'Paid vs Unpaid',
    value: '85:15',
    iconVariant: 'purple' as const,
    badge: '+1.4%',
    badgeVariant: 'pos' as const,
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#8b5cf6" strokeWidth="2">
        <rect x="2" y="5" width="20" height="14" rx="2" />
        <line x1="2" y1="10" x2="22" y2="10" />
      </svg>
    ),
  },
];

const ASIDE_STATS = [
  {
    label: 'Total Hits',
    value: '2.4M',
    valColor: 'green' as const,
    iconBg: '#e8f7ef',
    iconColor: '#27ae60',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#27ae60" strokeWidth="2">
        <circle cx="12" cy="12" r="10" />
        <path d="M12 8v4l3 3" />
      </svg>
    ),
  },
  {
    label: 'Drop-off Rate',
    value: '12.4%',
    valColor: 'red' as const,
    iconBg: '#fef2f2',
    iconColor: '#ef4444',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#ef4444" strokeWidth="2">
        <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
        <polyline points="17 6 23 6 23 12" />
      </svg>
    ),
  },
  {
    label: 'Returning Traffic',
    value: '64%',
    valColor: 'blue' as const,
    iconBg: '#eff6ff',
    iconColor: '#3b82f6',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#3b82f6" strokeWidth="2">
        <path d="M23 4v6h-6" />
        <path d="M1 20v-6h6" />
        <path d="M3.51 9a9 9 0 0114.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0020.49 15" />
      </svg>
    ),
  },
  {
    label: 'Avg Time Spent',
    value: '08:42',
    valColor: 'green' as const,
    iconBg: '#f4f5f7',
    iconColor: '#888',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#888" strokeWidth="2">
        <circle cx="12" cy="12" r="10" />
        <polyline points="12 6 12 12 16 14" />
      </svg>
    ),
  },
];

const DONATION_METRICS: MetricItem[] = [
  { label: 'Items Posted',     value: '12,490', accent: true },
  { label: 'Avg Rating',       value: '4.8',    suffix: '/ 5.0' },
  { label: 'Response Rate',    value: '94.2%' },
  { label: 'Avg Completion',   value: '2.4',    suffix: 'Days' },
  { label: 'Stagnant Posts',   value: '128',    red: true },
  { label: 'Archived Items',   value: '8,401' },
];

const REQUEST_METRICS: MetricItem[] = [
  { label: 'Requested Items',  value: '8,211',  accent: true },
  { label: 'Avg Offers',       value: '3.1',    suffix: 'per req' },
  { label: 'No Offers',        value: '42',     red: true },
  { label: 'Completion Time',  value: '4.1',    suffix: 'Days' },
  { label: 'Requester Rating', value: '4.9' },
  { label: 'Archived Requests',value: '12,050' },
];

/* ─── Component ──────────────────────────────────────────────────── */

export default function Dashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <>
      <Sidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        // user={{ initials: 'AR', name: 'Alex Rivera', role: 'Admin Account' }}
      />

      <Topbar onMenuClick={() => setSidebarOpen(true)} />

      <main className="main">
        {/* ── Page Header ── */}
        <div className="page-hdr">
          <div className="ph-left">
            <div className="ph-title">Platform Overview</div>
            <div className="ph-sub">Real-time statistics for donation activity</div>
          </div>
          <div className="ph-actions">
            <button className="btn-date">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="3" y="4" width="18" height="18" rx="2" />
                <line x1="16" y1="2" x2="16" y2="6" />
                <line x1="8" y1="2" x2="8" y2="6" />
                <line x1="3" y1="10" x2="21" y2="10" />
              </svg>
              Last 30 Days
            </button>
            <button className="btn-export">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" />
                <polyline points="7 10 12 15 17 10" />
                <line x1="12" y1="15" x2="12" y2="3" />
              </svg>
              Export Report
            </button>
          </div>
        </div>

        {/* ── Stat Grid ── */}
        <div className="stat-grid">
          {STAT_CARDS.map((card) => (
            <StatCard key={card.label} {...card} />
          ))}
        </div>

        {/* ── Mid Row: Chart + Aside ── */}
        <div className="mid-row">
          <TrafficChart />
          <div className="stats-aside">
            {ASIDE_STATS.map((s) => (
              <AsideStatCard key={s.label} {...s} />
            ))}
          </div>
        </div>

        {/* ── Bottom Row: Donation + Request ── */}
        <div className="bottom-row">
          <MetricSection
            title="Donation"
            iconVariant="green-bg"
            metrics={DONATION_METRICS}
            icon={
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2">
                <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" />
              </svg>
            }
          />
          <MetricSection
            title="Request"
            iconVariant="dark-bg"
            metrics={REQUEST_METRICS}
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