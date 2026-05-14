/* History.jsx
   Scrollable list of recent feedback actions with timestamp.
   Props: history (array of {type, time}), onClear (fn) */

import React from 'react'

const dotColor = { good: '#10b981', neutral: '#f59e0b', bad: '#ef4444' }
const arabicLabel = { good: 'جيد', neutral: 'محايد', bad: 'سيئ' }

export default function History({ history, onClear }) {
  return (
    <div
      className="animate-fade-up-4"
      style={{
        background: 'var(--surface)',
        border: '1px solid var(--border)',
        borderRadius: '20px',
        padding: '1.5rem',
      }}
    >
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
        <div style={{ fontFamily: 'var(--font-display)', fontSize: '0.95rem', fontWeight: 700, color: 'var(--muted)' }}>
          سجل الآراء · History
        </div>
        <button
          onClick={onClear}
          style={{
            background: 'rgba(239,68,68,0.1)',
            border: '1px solid rgba(239,68,68,0.2)',
            color: '#fca5a5',
            fontSize: '11px',
            padding: '4px 12px',
            borderRadius: '20px',
            cursor: 'pointer',
            transition: 'background 0.2s',
          }}
          onMouseEnter={e => e.currentTarget.style.background = 'rgba(239,68,68,0.2)'}
          onMouseLeave={e => e.currentTarget.style.background = 'rgba(239,68,68,0.1)'}
        >
          مسح الكل
        </button>
      </div>

      {/* List */}
      <div style={{ maxHeight: '220px', overflowY: 'auto', scrollbarWidth: 'thin' }}>
        {history.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '2rem', color: 'var(--muted)', fontSize: '0.9rem' }}>
            <span style={{ fontSize: '2rem', display: 'block', marginBottom: '0.5rem', opacity: 0.4 }}>📋</span>
            لم يتم جمع أي آراء بعد
          </div>
        ) : (
          history.map((item, i) => (
            <div
              key={i}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                padding: '10px 0',
                borderBottom: i < history.length - 1 ? '1px solid rgba(255,255,255,0.05)' : 'none',
                fontSize: '0.85rem',
                animation: 'slideIn 0.3s ease',
              }}
            >
              <span style={{
                width: '8px', height: '8px',
                borderRadius: '50%',
                background: dotColor[item.type],
                flexShrink: 0,
              }} />
              <span style={{ flex: 1 }}>
                قيّم المستخدم بـ <strong>{arabicLabel[item.type]}</strong>
              </span>
              <span style={{ fontSize: '11px', color: 'var(--muted)' }}>{item.time}</span>
            </div>
          ))
        )}
      </div>
    </div>
  )
}