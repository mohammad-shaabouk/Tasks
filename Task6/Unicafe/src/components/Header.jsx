/* Header.jsx
   Displays the dashboard title, subtitle, and keyboard shortcut hints.
   Pure presentational — no state or props needed. */

import React from 'react'

const styles = {
  wrapper: {
    textAlign: 'center',
    marginBottom: '2.5rem',
  },
  badge: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '6px',
    background: 'rgba(167,139,250,0.15)',
    border: '1px solid rgba(167,139,250,0.3)',
    color: '#a78bfa',
    fontSize: '12px',
    fontWeight: 500,
    padding: '4px 14px',
    borderRadius: '20px',
    marginBottom: '1rem',
    letterSpacing: '0.05em',
  },
  h1: {
    fontFamily: 'var(--font-display)',
    fontSize: 'clamp(1.8rem, 5vw, 2.8rem)',
    fontWeight: 800,
    background: 'linear-gradient(135deg, #f0f0f5 0%, #a78bfa 50%, #38bdf8 100%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    lineHeight: 1.1,
    marginBottom: '0.5rem',
  },
  subtitle: {
    color: 'var(--muted)',
    fontSize: '0.95rem',
    fontWeight: 300,
  },
  kbHint: {
    display: 'flex',
    justifyContent: 'center',
    gap: '12px',
    marginTop: '1rem',
    flexWrap: 'wrap',
  },
  kbKey: {
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    fontSize: '12px',
    color: 'var(--muted)',
  },
  kbd: {
    background: 'var(--surface2)',
    border: '1px solid var(--border)',
    borderRadius: '6px',
    padding: '2px 8px',
    fontFamily: 'var(--font-body)',
    fontSize: '11px',
    color: 'var(--text)',
  },
}

export default function Header() {
  return (
    <div style={styles.wrapper} className="animate-fade-up">
      <div style={styles.badge}>✦ لوحة تحليلات</div>
      <h1 style={styles.h1}>Smart Feedback Analytics</h1>
      <p style={styles.subtitle}>
        تحليل آراء المستخدمين في الوقت الفعلي · Real-time sentiment intelligence
      </p>
      <div style={styles.kbHint}>
        <span style={styles.kbKey}><kbd style={styles.kbd}>G</kbd> جيد</span>
        <span style={styles.kbKey}><kbd style={styles.kbd}>N</kbd> محايد</span>
        <span style={styles.kbKey}><kbd style={styles.kbd}>B</kbd> سيئ</span>
      </div>
    </div>
  )
}