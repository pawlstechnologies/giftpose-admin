interface Tab {
  label: string;
  value: string;
}

interface TabBarProps {
  tabs: Tab[];
  active: string;
  onChange: (value: string) => void;
}

/**
 * TabBar — horizontal filter tabs with an active green underline.
 *
 * Usage:
 * <TabBar
 *   tabs={[{ label: 'All (14)', value: 'all' }, { label: 'Active (10)', value: 'active' }]}
 *   active="all"
 *   onChange={setTab}
 * />
 */
export default function TabBar({ tabs, active, onChange }: TabBarProps) {
  return (
    <div className="tab-bar">
      {tabs.map((t) => (
        <button
          key={t.value}
          className={`tab-item${active === t.value ? ' active' : ''}`}
          onClick={() => onChange(t.value)}
          type="button"
        >
          {t.label}
        </button>
      ))}
    </div>
  );
}