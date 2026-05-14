/* StatCard.jsx
   A modern glassmorphic card for displaying a single statistic.
   Props: label (string), value (string|number), gradient (css string), accent (color) */

import React from 'react'

export default function StatCard({ label, value, gradient, sub, accent }) {
  return (
    <div
      style={{
        background: 'var(--surface)',
        border: '1px solid var(--border)',
        borderRadius: '18px',
        padding: '1.25rem',
        position: 'relative',
        overflow: 'hidden',
        transition: 'transform 0.2s, border-color 0.2s',
        cursor: 'default',
      }}
      onMouseEnter={e => {
        e.currentTarget.style.transform = 'translateY(-3px)'
        e.currentTarget.style.borderColor = 'rgba(255,255,255,0.2)'
      }}
      onMouseLeave={e => {
        e.currentTarget.style.transform = 'translateY(0)'
        e.currentTarget.style.borderColor = 'var(--border)'
      }}
    >
      {/* Top accent stripe */}
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0,
        height: '2px', background: gradient,
        borderRadius: '2px 2px 0 0',
      }} />

      <div style={{
        fontSize: '11px', color: 'var(--muted)',
        textTransform: 'uppercase', letterSpacing: '0.08em',
        marginBottom: '8px', fontWeight: 500,
      }}>
        {label}
      </div>

      <div style={{
        fontFamily: 'var(--font-display)',
        fontSize: '2rem', fontWeight: 800, lineHeight: 1,
        background: gradient,
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
      }}>
        {value}
      </div>

      {sub && (
        <div style={{ fontSize: '0.75rem', color: 'var(--muted)', marginTop: '4px' }}>
          {sub}
        </div>
      )}
    </div>
  )
}