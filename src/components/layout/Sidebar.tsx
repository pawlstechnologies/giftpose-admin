// import { NavLink } from 'react-router-dom';

// interface NavItem {
//   label: string;
//   to: string;
//   icon: React.ReactNode;
// }

// interface SidebarProps {
//   isOpen: boolean;
//   onClose: () => void;
//   user?: { initials: string; name: string; role: string };
// }

// const NAV_ITEMS: NavItem[] = [
//   {
//     label: 'Dashboard',
//     to: '/dashboard',
//     icon: (
//       <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
//         <rect x="3" y="3" width="7" height="7" /><rect x="14" y="3" width="7" height="7" />
//         <rect x="3" y="14" width="7" height="7" /><rect x="14" y="14" width="7" height="7" />
//       </svg>
//     ),
//   },
//   {
//     label: 'Categories',
//     to: '/categories',
//     icon: (
//       <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
//         <path d="M4 6h16M4 12h8m-8 6h16" />
//       </svg>
//     ),
//   },
//   {
//     label: 'Push Notifications',
//     to: '/notifications',
//     icon: (
//       <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
//         <path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9" />
//         <path d="M13.73 21a2 2 0 01-3.46 0" />
//       </svg>
//     ),
//   },
//   {
//     label: 'Account Holders',
//     to: '/account-holders',
//     icon: (
//       <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
//         <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
//         <circle cx="9" cy="7" r="4" />
//         <path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" />
//       </svg>
//     ),
//   },
// ];

// export default function Sidebar({ isOpen, onClose, user }: SidebarProps) {
//   const u = user ?? { initials: 'AR', name: 'Alex Rivera', role: 'Admin Account' };

//   return (
//     <>
//       {/* Overlay for mobile */}
//       <div
//         className={`overlay${isOpen ? ' show' : ''}`}
//         onClick={onClose}
//         aria-hidden="true"
//       />

//       <aside className={`sidebar${isOpen ? ' open' : ''}`} id="sidebar">
//         <div className="sb-logo">Giftpose</div>

//         <nav className="nav">
//           {NAV_ITEMS.map((item) => (
//             <NavLink
//               key={item.to}
//               to={item.to}
//               className={({ isActive }) => `nav-item${isActive ? ' active' : ''}`}
//               onClick={onClose}
//             >
//               {item.icon}
//               {item.label}
//             </NavLink>
//           ))}
//         </nav>

//         <div className="sb-user">
//           <div className="avatar">{u.initials}</div>
//           <div>
//             <div className="u-name">{u.name}</div>
//             <div className="u-role">{u.role}</div>
//           </div>
//         </div>
//       </aside>
//     </>
//   );
// }





/**
 * Sidebar.tsx
 *
 * Reads the authenticated admin directly from AuthContext.
 * No props needed for user data — just isOpen + onClose for mobile toggle.
 *
 * File sits at:  src/components/layout/Sidebar.tsx
 * AuthContext at: src/context/AuthContext.tsx
 * Import path:   ../../context/AuthContext   ← two levels up
 */

import { NavLink } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const NAV_ITEMS = [
  {
    label: 'Dashboard',
    to: '/dashboard',
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="7" height="7" /><rect x="14" y="3" width="7" height="7" />
        <rect x="3" y="14" width="7" height="7" /><rect x="14" y="14" width="7" height="7" />
      </svg>
    ),
  },
  {
    label: 'Categories',
    to: '/categories',
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 6h16M4 12h8m-8 6h16" />
      </svg>
    ),
  },
  {
    label: 'Push Notifications',
    to: '/notifications',
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9" />
        <path d="M13.73 21a2 2 0 01-3.46 0" />
      </svg>
    ),
  },
  {
    label: 'Account Holders',
    to: '/account-holders',
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" />
      </svg>
    ),
  },
];

/** "Super Admin" → "SA",  "Alex Rivera" → "AR" */
function getInitials(name: string): string {
  return name
    .split(' ')
    .map((w) => w[0] ?? '')
    .join('')
    .toUpperCase()
    .slice(0, 2);
}

/** "super_admin" → "Super Admin" */
function formatRole(role: string): string {
  return role
    .split('_')
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ');
}

export default function Sidebar({ isOpen, onClose }: SidebarProps) {
  // ── Pull real admin data from global AuthContext ──────────────────
  const { admin, logout } = useAuth();

  const displayName     = admin?.name  ?? '—';
  const displayRole     = admin?.role  ? formatRole(admin.role) : 'Admin Account';
  const displayInitials = admin?.name  ? getInitials(admin.name) : '—';
  // ─────────────────────────────────────────────────────────────────

  return (
    <>
      {/* Mobile overlay — tap to close sidebar */}
      <div
        className={`overlay${isOpen ? ' show' : ''}`}
        onClick={onClose}
        aria-hidden="true"
      />

      <aside className={`sidebar${isOpen ? ' open' : ''}`} id="sidebar">

        {/* Logo */}
        <div className="sb-logo">Giftpose</div>

        {/* Nav links */}
        <nav className="nav">
          {NAV_ITEMS.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) => `nav-item${isActive ? ' active' : ''}`}
              onClick={onClose}
            >
              {item.icon}
              {item.label}
            </NavLink>
          ))}
        </nav>

        {/* User footer — name, role, logout */}
        <div className="sb-user">
          {/* Avatar initials */}
          <div className="avatar">{displayInitials}</div>

          {/* Name + role */}
          <div style={{ flex: 1, minWidth: 0 }}>
            <div
              className="u-name"
              style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}
              title={displayName}
            >
              {displayName}
            </div>
            <div className="u-role">{displayRole}</div>
          </div>

          {/* Logout button */}
          <button
            onClick={logout}
            title="Logout"
            aria-label="Logout"
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              color: '#bbb',
              display: 'flex',
              alignItems: 'center',
              padding: 4,
              borderRadius: 6,
              transition: 'color 0.18s',
              flexShrink: 0,
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = '#ef4444')}
            onMouseLeave={(e) => (e.currentTarget.style.color = '#bbb')}
          >
            <svg
              width="15" height="15" viewBox="0 0 24 24"
              fill="none" stroke="currentColor" strokeWidth="2"
              strokeLinecap="round" strokeLinejoin="round"
            >
              <path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4" />
              <polyline points="16 17 21 12 16 7" />
              <line x1="21" y1="12" x2="9" y2="12" />
            </svg>
          </button>
        </div>

      </aside>
    </>
  );
}


