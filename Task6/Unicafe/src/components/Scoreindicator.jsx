/* ScoreIndicator.jsx
   Displays an emoji-based overall rating (Excellent / Average / Poor)
   plus the comparison insight string. Driven by average score prop. */

import React from 'react'

function getScore(average, total) {
  if (total === 0) return { emoji: '💤', label: 'في انتظار آرائك', desc: 'لم يتم جمع أي آراء بعد' }
  if (average > 0.3) return { emoji: '😊', label: 'ممتاز', desc: 'نتائج رائعة!' }
  if (average > -0.1) return { emoji: '😐', label: 'متوسط', desc: 'نتائج مقبولة' }
  return { emoji: '😡', label: 'يحتاج تحسين', desc: 'مراجعة مطلوبة' }
}

export default function ScoreIndicator({ average, total, good, bad, comparison }) {
  const { emoji, label, desc } = getScore(average, total)

  return (
    <div
      className="animate-fade-up-2"
      style={{
        background: 'var(--surface)',
        border: '1px solid var(--border)',
        borderRadius: '20px',
        padding: '1.5rem',
        marginBottom: '1.5rem',
        textAlign: 'center',
      }}
    >
      <span style={{
        fontSize: '3rem',
        display: 'block',
        marginBottom: '0.5rem',
        animation: 'bounce 2s infinite',
      }}>
        {emoji}
      </span>
      <div style={{
        fontFamily: 'var(--font-display)',
        fontSize: '1.2rem',
        fontWeight: 700,
        marginBottom: '0.25rem',
      }}>
        {label}
      </div>
      <div style={{ fontSize: '0.8rem', color: 'var(--muted)' }}>{desc}</div>

      {comparison && (
        <div style={{
          marginTop: '0.75rem',
          fontSize: '0.82rem',
          color: 'var(--muted)',
          background: 'var(--surface2)',
          borderRadius: '10px',
          padding: '0.5rem 1rem',
          display: 'inline-block',
        }}>
          {comparison}
        </div>
      )}
    </div>
  )
}