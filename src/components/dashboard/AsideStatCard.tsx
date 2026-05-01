import React from 'react';

type ValColor = 'green' | 'red' | 'blue';

interface AsideStatCardProps {
  label: string;
  value: string;
  valColor?: ValColor;
  icon: React.ReactNode;
  iconBg?: string;
  iconColor?: string;
}

/**
 * AsideStatCard — compact stat card displayed in the right column
 * alongside the traffic chart.
 *
 * Usage:
 * <AsideStatCard
 *   label="Total Hits"
 *   value="2.4M"
 *   valColor="green"
 *   icon={<ClockIcon />}
 *   iconBg="#e8f7ef"
 *   iconColor="#27ae60"
 * />
 */
export default function AsideStatCard({
  label,
  value,
  valColor = 'green',
  icon,
  iconBg = '#f4f5f7',
  iconColor = '#888',
}: AsideStatCardProps) {
  return (
    <div className="aside-card">
      <div>
        <div className="ac-label">{label}</div>
        <div className={`ac-val ${valColor}`}>{value}</div>
      </div>
      <div className="ac-icon" style={{ background: iconBg, color: iconColor }}>
        {icon}
      </div>
    </div>
  );
}