/* StatisticLine.jsx
   A simple reusable row for displaying a label-value pair.
   Used inside the Statistics panel or anywhere a quick metric is needed. */

import React from 'react'

export default function StatisticLine({ label, value, highlight = false }) {
  return (
    <div style={{
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '8px 0',
      borderBottom: '1px solid rgba(255,255,255,0.05)',
      fontSize: '0.875rem',
    }}>
      <span style={{ color: 'var(--muted)' }}>{label}</span>
      <span style={{
        fontWeight: 600,
        color: highlight ? '#a78bfa' : 'var(--text)',
        fontFamily: highlight ? 'var(--font-display)' : 'inherit',
      }}>
        {value}
      </span>
    </div>
  )
}