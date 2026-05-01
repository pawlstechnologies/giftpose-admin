import { useState } from 'react';

interface TopbarProps {
  onMenuClick: () => void;
  searchPlaceholder?: string;
}

export default function Topbar({ onMenuClick, searchPlaceholder = 'Search analytics...' }: TopbarProps) {
  const [query, setQuery] = useState('');

  return (
    <header className="topbar">
      {/* Hamburger — visible only on mobile via CSS */}
      <button className="hamburger" onClick={onMenuClick} aria-label="Open menu">
        <span className="ham-ln" />
        <span className="ham-ln" />
        <span className="ham-ln" />
      </button>

      {/* Search */}
      <div className="search-wrap">
        <svg
          className="search-ico"
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <circle cx="11" cy="11" r="8" />
          <path d="M21 21l-4.35-4.35" />
        </svg>
        <input
          className="search-inp"
          type="text"
          placeholder={searchPlaceholder}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>

      {/* Right icons */}
      <div className="tb-right">
        {/* Notifications */}
        <div className="tb-icon" title="Notifications">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9" />
            <path d="M13.73 21a2 2 0 01-3.46 0" />
          </svg>
        </div>

        {/* Settings */}
        <div className="tb-icon" title="Settings">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="12" r="3" />
            <path d="M19.07 4.93A10 10 0 115.93 19.07" />
            <line x1="12" y1="2" x2="12" y2="4" />
            <line x1="12" y1="20" x2="12" y2="22" />
            <line x1="2" y1="12" x2="4" y2="12" />
            <line x1="20" y1="12" x2="22" y2="12" />
          </svg>
        </div>
      </div>
    </header>
  );
}