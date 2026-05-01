import React from 'react';

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  actions?: React.ReactNode;
}

/**
 * PageHeader — top section of every admin page with title, subtitle,
 * and an optional actions slot (buttons, dropdowns, etc.).
 *
 * Usage:
 * <PageHeader
 *   title="Category Management"
 *   subtitle="Organise item donation categories"
 *   actions={<button className="btn-primary">Create Category</button>}
 * />
 */
export default function PageHeader({ title, subtitle, actions }: PageHeaderProps) {
  return (
    <div className="page-hdr-row">
      <div>
        <div className="page-title">{title}</div>
        {subtitle && <div className="page-subtitle">{subtitle}</div>}
      </div>
      {actions && <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}>{actions}</div>}
    </div>
  );
}