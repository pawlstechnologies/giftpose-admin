import React from 'react';

export interface MetricItem {
  label: string;
  value: string;
  suffix?: string;
  accent?: boolean;   // left green border
  red?: boolean;      // red value colour
}

interface MetricSectionProps {
  title: string;
  icon: React.ReactNode;
  iconVariant?: 'green-bg' | 'dark-bg';
  metrics: MetricItem[];
}

/**
 * MetricSection — bottom-row card with a header icon + title
 * and a 2-column metric grid inside.
 *
 * Usage:
 * <MetricSection
 *   title="Donation"
 *   icon={<HeartIcon />}
 *   iconVariant="green-bg"
 *   metrics={[
 *     { label: 'Items Posted', value: '12,490', accent: true },
 *     { label: 'Avg Rating',   value: '4.8', suffix: '/ 5.0' },
 *   ]}
 * />
 */
export default function MetricSection({
  title,
  icon,
  iconVariant = 'green-bg',
  metrics,
}: MetricSectionProps) {
  return (
    <div className="section-card">
      <div className="sec-hdr">
        <div className={`sec-icon ${iconVariant}`}>{icon}</div>
        <div className="sec-title">{title}</div>
      </div>

      <div className="metric-grid">
        {metrics.map((m, i) => (
          <div
            key={i}
            className={`metric-card${m.accent ? ' accent' : ''}`}
          >
            <div className="m-label">{m.label}</div>
            <div className={`m-val${m.red ? ' red' : ''}`}>
              {m.value}
              {m.suffix && <span className="m-suffix"> {m.suffix}</span>}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}