import { useState } from 'react';

interface BarData {
  day: string;
  val: number;
  color: string;
}

const DEFAULT_DATA: BarData[] = [
  { day: 'MON', val: 52,  color: '#b7e8cc' },
  { day: 'TUE', val: 72,  color: '#7dd4a4' },
  { day: 'WED', val: 48,  color: '#b7e8cc' },
  { day: 'THU', val: 82,  color: '#5cbf85' },
  { day: 'FRI', val: 60,  color: '#b7e8cc' },
  { day: 'SAT', val: 100, color: '#27ae60' },
  { day: 'SUN', val: 88,  color: '#229954' },
];

interface TrafficChartProps {
  data?: BarData[];
  title?: string;
  subtitle?: string;
}

/**
 * TrafficChart — 7-day bar chart used in the mid-row.
 * Accepts optional `data` override; falls back to dummy data.
 */
export default function TrafficChart({
  data = DEFAULT_DATA,
  title = 'Traffic Trends',
  subtitle = 'Volume analysis for the past 7 days',
}: TrafficChartProps) {
  const [hovered, setHovered] = useState<number | null>(null);
  const max = Math.max(...data.map((d) => d.val));

  return (
    <div className="chart-card">
      <div className="cc-hdr">
        <div>
          <div className="cc-title">{title}</div>
          <div className="cc-sub">{subtitle}</div>
        </div>
        <button className="btn-date" style={{ fontSize: '12px', padding: '7px 13px' }}>
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <rect x="3" y="4" width="18" height="18" rx="2" />
            <line x1="16" y1="2" x2="16" y2="6" />
            <line x1="8" y1="2" x2="8" y2="6" />
            <line x1="3" y1="10" x2="21" y2="10" />
          </svg>
          Last 30 Days
        </button>
      </div>

      <div className="chart-area">
        {data.map((d, i) => (
          <div
            key={d.day}
            className="bar-wrap"
            onMouseEnter={() => setHovered(i)}
            onMouseLeave={() => setHovered(null)}
            title={`${d.day}: ${d.val}`}
          >
            <div
              className="bar"
              style={{
                height: `${(d.val / max) * 100}%`,
                background: d.color,
                opacity: hovered !== null && hovered !== i ? 0.6 : 1,
                transition: 'opacity 0.2s, height 0.4s ease',
              }}
            />
            <div className="bar-lbl">{d.day}</div>
          </div>
        ))}
      </div>
    </div>
  );
}