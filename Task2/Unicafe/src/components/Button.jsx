/* Button.jsx
   Reusable base button component.
   Accepts: label, onClick, variant (good | neutral | bad), count, highlighted */

import React, { useState } from 'react'

const variantMap = {
  good: { color: '#10b981', glow: 'rgba(16,185,129,0.3)', bg: 'rgba(16,185,129,0.1)' },
  neutral: { color: '#f59e0b', glow: 'rgba(245,158,11,0.3)', bg: 'rgba(245,158,11,0.1)' },
  bad: { color: '#ef4444', glow: 'rgba(239,68,68,0.3)', bg: 'rgba(239,68,68,0.1)' },
}

export default function Button({ label, onClick, variant = 'good', count = 0, highlighted = false, icon }) {
  const [pressed, setPressed] = useState(false)
  const v = variantMap[variant]

  const base = {
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '10px',
    padding: '1.5rem 1rem',
    borderRadius: '20px',
    border: `1px solid ${highlighted ? v.color : 'var(--border)'}`,
    background: highlighted ? v.bg : 'var(--surface)',
    cursor: 'pointer',
    transition: 'all 0.3s cubic-bezier(0.34,1.56,0.64,1)',
    transform: pressed ? 'scale(0.96)' : 'translateY(0) scale(1)',
    boxShadow: highlighted ? `0 0 30px ${v.glow}, 0 20px 40px rgba(0,0,0,0.3)` : 'none',
    overflow: 'hidden',
    width: '100%',
  }

  return (
    <button
      style={base}
      onClick={() => { onClick(); }}
      onMouseDown={() => setPressed(true)}
      onMouseUp={() => setPressed(false)}
      onMouseLeave={() => setPressed(false)}
      onMouseEnter={e => {
        e.currentTarget.style.transform = 'translateY(-6px) scale(1.02)'
        e.currentTarget.style.borderColor = v.color
        e.currentTarget.style.boxShadow = `0 0 30px ${v.glow}, 0 20px 40px rgba(0,0,0,0.3)`
      }}
      onMouseOut={e => {
        e.currentTarget.style.transform = 'translateY(0) scale(1)'
        if (!highlighted) {
          e.currentTarget.style.borderColor = 'var(--border)'
          e.currentTarget.style.boxShadow = 'none'
        }
      }}
    >
      {highlighted && (
        <span style={{
          position: 'absolute', top: '10px', right: '10px',
          background: v.color, color: '#fff',
          fontSize: '10px', fontWeight: 600,
          padding: '2px 8px', borderRadius: '20px',
        }}>
          الأعلى
        </span>
      )}
      <span style={{ fontSize: '2rem', transition: 'transform 0.3s' }}>{icon}</span>
      <span style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '1rem', letterSpacing: '0.02em' }}>
        {label}
      </span>
      <span style={{ fontSize: '0.75rem', color: 'var(--muted)' }}>{count} آراء</span>
    </button>
  )
}