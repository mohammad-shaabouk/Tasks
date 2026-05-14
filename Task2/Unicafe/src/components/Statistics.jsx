/* Statistics.jsx
   Main analytics container — renders 3 StatCards (total, average, positive%).
   Receives computed stats as props from App. */

import React from 'react'
import StatCard from './StatCard.jsx'

export default function Statistics({ total, average, positivePercent }) {
  const noData = total === 0

  return (
    <div
      className="animate-fade-up-2"
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
        gap: '1rem',
        marginBottom: '1.5rem',
      }}
    >
      <StatCard
        label="إجمالي الآراء · Total"
        value={total}
        gradient="linear-gradient(135deg, #a78bfa, #38bdf8)"
        sub="تم التسجيل"
      />
      <StatCard
        label="المتوسط · Average"
        value={noData ? '—' : average.toFixed(2)}
        gradient="linear-gradient(135deg, #10b981, #06b6d4)"
        sub="(جيد − سيئ) / الكل"
      />
      <StatCard
        label="إيجابية · Positive %"
        value={noData ? '—' : positivePercent.toFixed(1) + '%'}
        gradient="linear-gradient(135deg, #f59e0b, #10b981)"
        sub="نسبة التقييمات الجيدة"
      />
    </div>
  )
}