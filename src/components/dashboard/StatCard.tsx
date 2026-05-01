import React from 'react';

type IconVariant = 'teal' | 'blue' | 'orange' | 'purple';
type BadgeVariant = 'pos' | 'neg';

interface StatCardProps {
  label: string;
  value: string;
  icon: React.ReactNode;
  iconVariant: IconVariant;
  badge: string;
  badgeVariant: BadgeVariant;
}

/**
 * StatCard — top-level KPI card used in the 4-column stat grid.
 *
 * Usage:
 * <StatCard
 *   label="Total Users"
 *   value="24,502"
 *   icon={<UsersIcon />}
 *   iconVariant="teal"
 *   badge="+12.5%"
 *   badgeVariant="pos"
 * />
 */
export default function StatCard({
  label,
  value,
  icon,
  iconVariant,
  badge,
  badgeVariant,
}: StatCardProps) {
  return (
    <div className="stat-card">
      <div className="sc-top">
        <div className={`sc-icon ${iconVariant}`}>{icon}</div>
        <span className={`badge ${badgeVariant}`}>{badge}</span>
      </div>
      <div className="sc-label">{label}</div>
      <div className="sc-value">{value}</div>
    </div>
  );
}