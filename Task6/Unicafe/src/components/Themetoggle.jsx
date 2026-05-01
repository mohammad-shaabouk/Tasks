/* ThemeToggle.jsx
   Optional light/dark theme switch.
   Currently the dashboard uses a dark-only theme.
   This component is a placeholder for future light-mode support. */

import React, { useState } from 'react'

export default function ThemeToggle() {
  const [dark, setDark] = useState(true)

  return (
    <button
      onClick={() => setDark(d => !d)}
      title={dark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
      style={{
        position: 'fixed',
        top: '1.5rem',
        left: '1.5rem',
        background: 'var(--surface2)',
        border: '1px solid var(--border)',
        borderRadius: '50%',
        width: '40px',
        height: '40px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '1.1rem',
        cursor: 'pointer',
        transition: 'all 0.2s',
        zIndex: 100,
      }}
      onMouseEnter={e => e.currentTarget.style.borderColor = 'rgba(255,255,255,0.3)'}
      onMouseLeave={e => e.currentTarget.style.borderColor = 'var(--border)'}
    >
      {dark ? '☀️' : '🌙'}
    </button>
  )
}