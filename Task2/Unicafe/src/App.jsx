/* App.jsx
   Main state manager for the Smart Feedback Analytics Dashboard.
   - Holds all feedback counts and history in useState
   - Computes derived stats (average, positivePercent, comparison)
   - Handles keyboard shortcuts (G / N / B)
   - Renders all sub-components in layout order */

import React, { useState, useEffect, useCallback } from 'react'

import Header from './components/Header.jsx'
import FeedbackButtons from './components/FeedbackButtons.jsx'
import Statistics from './components/Statistics.jsx'
import ScoreIndicator from './components/ScoreIndicator.jsx'
import ProgressBar from './components/ProgressBar.jsx'
import History from './components/History.jsx'
import ThemeToggle from './components/ThemeToggle.jsx'

// ── helpers ───────────────────────────────────────────────────
function getTime() {
  const n = new Date()
  return [n.getHours(), n.getMinutes(), n.getSeconds()]
    .map(v => String(v).padStart(2, '0'))
    .join(':')
}

function getSmartMessage(positivePercent, total) {
  if (total === 0) return null
  if (positivePercent >= 60) return { text: 'تقييمات ممتازة 👏', cls: 'positive' }
  if (positivePercent >= 30) return { text: 'نتائج متوسطة 😐', cls: 'neutral-msg' }
  return { text: 'يحتاج إلى تحسين 😅', cls: 'negative' }
}

function getComparison(good, bad) {
  if (good > 0 && bad > 0) return `الجيد أعلى بـ ${(good / bad).toFixed(1)}x من السيئ`
  if (good > 0 && bad === 0) return 'لا توجد آراء سيئة 🎉'
  if (bad > 0 && good === 0) return 'لا توجد آراء جيدة بعد'
  return null
}

// ── styles ────────────────────────────────────────────────────
const smartMsgStyles = {
  positive: { background: 'rgba(16,185,129,0.1)', border: '1px solid rgba(16,185,129,0.3)', color: '#6ee7b7' },
  'neutral-msg': { background: 'rgba(245,158,11,0.1)', border: '1px solid rgba(245,158,11,0.3)', color: '#fde68a' },
  negative: { background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.3)', color: '#fca5a5' },
}

// ── component ─────────────────────────────────────────────────
export default function App() {
  const [counts, setCounts] = useState({ good: 0, neutral: 0, bad: 0 })
  const [history, setHistory] = useState([])
  const [alerted, setAlerted] = useState(false)
  const [showAlert, setShowAlert] = useState(false)

  const total = counts.good + counts.neutral + counts.bad
  const average = total > 0 ? (counts.good - counts.bad) / total : 0
  const positivePercent = total > 0 ? (counts.good / total) * 100 : 0
  const pcts = {
    good: total > 0 ? (counts.good / total) * 100 : 0,
    neutral: total > 0 ? (counts.neutral / total) * 100 : 0,
    bad: total > 0 ? (counts.bad / total) * 100 : 0,
  }

  const addVote = useCallback((type) => {
    setCounts(prev => ({ ...prev, [type]: prev[type] + 1 }))
    setHistory(prev => [{ type, time: getTime() }, ...prev].slice(0, 50))
  }, [])

  // Alert at 10 total feedbacks
  useEffect(() => {
    if (total >= 10 && !alerted) {
      setAlerted(true)
      setShowAlert(true)
      setTimeout(() => setShowAlert(false), 5000)
    }
  }, [total, alerted])

  // Keyboard shortcuts: G = good, N = neutral, B = bad
  useEffect(() => {
    const handler = (e) => {
      if (e.target.tagName === 'INPUT') return
      const k = e.key.toLowerCase()
      if (k === 'g') addVote('good')
      else if (k === 'n') addVote('neutral')
      else if (k === 'b') addVote('bad')
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [addVote])

  const smartMsg = getSmartMessage(positivePercent, total)
  const comparison = total > 0 ? getComparison(counts.good, counts.bad) : null

  return (
    <>
      {/* Background decoration */}
      <div className="bg-orb bg-orb-1" />
      <div className="bg-orb bg-orb-2" />
      <div className="bg-orb bg-orb-3" />

      <ThemeToggle />

      <main className="app">
        {/* 1. Header + keyboard hints */}
        <Header />

        {/* 2. Three feedback buttons */}
        <FeedbackButtons counts={counts} onVote={addVote} />

        {/* 3. Smart message banner */}
        {smartMsg && (
          <div style={{
            ...smartMsgStyles[smartMsg.cls],
            textAlign: 'center',
            padding: '0.75rem 1.5rem',
            borderRadius: '14px',
            fontSize: '0.9rem',
            fontWeight: 500,
            marginBottom: '1.5rem',
            animation: 'fadeUp 0.4s ease both',
          }}>
            {smartMsg.text}
          </div>
        )}

        {/* 4. 10-feedback milestone alert */}
        {showAlert && (
          <div style={{
            background: 'rgba(167,139,250,0.15)',
            border: '1px solid rgba(167,139,250,0.4)',
            borderRadius: '14px',
            padding: '0.75rem 1.5rem',
            textAlign: 'center',
            color: '#c4b5fd',
            fontSize: '0.875rem',
            marginBottom: '1.5rem',
            animation: 'pulse 2s infinite',
          }}>
            🎉 وصلت إلى 10 آراء! استمر في جمع البيانات.
          </div>
        )}

        {/* 5. Stat cards (total / average / positive%) */}
        <Statistics
          total={total}
          average={average}
          positivePercent={positivePercent}
        />

        {/* 6. Score indicator + comparison */}
        <ScoreIndicator
          average={average}
          total={total}
          good={counts.good}
          bad={counts.bad}
          comparison={comparison}
        />

        {/* 7. Animated progress bars */}
        <div
          className="animate-fade-up-3"
          style={{
            background: 'var(--surface)',
            border: '1px solid var(--border)',
            borderRadius: '20px',
            padding: '1.5rem',
            marginBottom: '1.5rem',
          }}
        >
          <div style={{
            fontFamily: 'var(--font-display)',
            fontSize: '0.95rem', fontWeight: 700,
            color: 'var(--muted)', marginBottom: '1rem',
          }}>
            توزيع الآراء · Distribution
          </div>
          <ProgressBar label="جيد" icon="👍" percentage={pcts.good} colorClass="good" />
          <ProgressBar label="محايد" icon="😐" percentage={pcts.neutral} colorClass="neutral" />
          <ProgressBar label="سيئ" icon="👎" percentage={pcts.bad} colorClass="bad" />
        </div>

        {/* 8. Feedback history log */}
        <History
          history={history}
          onClear={() => { setHistory([]); setAlerted(false); }}
        />
      </main>
    </>
  )
}