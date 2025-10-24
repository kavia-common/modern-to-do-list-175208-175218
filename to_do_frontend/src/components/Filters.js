import React from 'react';
import '../styles/theme.css';

// PUBLIC_INTERFACE
export default function Filters({ filter, onChange }) {
  /** Filter chips: all, active, completed */
  const items = [
    { key: 'all', label: 'All' },
    { key: 'active', label: 'Active' },
    { key: 'completed', label: 'Completed' },
  ];
  return (
    <div className="filters">
      {items.map(i => (
        <button
          key={i.key}
          type="button"
          className={`filter-chip ${filter === i.key ? 'active' : ''}`}
          onClick={() => onChange(i.key)}
        >
          {i.label}
        </button>
      ))}
    </div>
  );
}
