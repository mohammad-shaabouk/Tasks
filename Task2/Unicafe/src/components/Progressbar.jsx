/* ProgressBar.jsx
   Animated visual bar showing the percentage for a single feedback type.
   Props: label, icon, percentage (0-100), colorClass (good | neutral | bad) */

import React from 'react'

const colorMap = {
  good: 'linear-gradient(90deg, #059669, #10b981)',
  neutral: 'linear-gradient(90deg, #d97706, #f59e0b)',
  bad: 'linear-gradient(90deg, #dc2626, #ef4444)',
}

export default function ProgressBar({ label, icon, percentage, colorClass }) {
  return (
    <div style={{ marginBottom: '1rem' }}>
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '6px',
      }}>
        <span style={{ fontSize: '0.85rem', fontWeight: 500, display: 'flex', alignItems: 'center', gap: '6px' }}>
          {icon} {label}
        </span>
        <span style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--muted)' }}>
          {percentage.toFixed(0)}%
        </span>
      </div>
      <div style={{
        height: '10px',
        background: 'rgba(255,255,255,0.06)',
        borderRadius: '20px',
        overflow: 'hidden',
      }}>
        <div style={{
          height: '100%',
          width: `${percentage}%`,
          background: colorMap[colorClass] || colorMap.good,
          borderRadius: '20px',
          transition: 'width 0.8s cubic-bezier(0.34,1.56,0.64,1)',
        }} />
      </div>
    </div>
  )
}