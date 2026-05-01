/* FeedbackButtons.jsx
   Renders the three feedback action buttons (Good, Neutral, Bad).
   Receives state counts and onVote callback from App. */

import React from 'react'
import Button from './Button.jsx'

export default function FeedbackButtons({ counts, onVote }) {
  const total = counts.good + counts.neutral + counts.bad
  const max = Math.max(counts.good, counts.neutral, counts.bad)

  const buttons = [
    { key: 'good', label: 'جيد · Good', icon: '👍', variant: 'good' },
    { key: 'neutral', label: 'محايد · Neutral', icon: '😐', variant: 'neutral' },
    { key: 'bad', label: 'سيئ · Bad', icon: '👎', variant: 'bad' },
  ]

  return (
    <div
      className="animate-fade-up-1"
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: '1rem',
        marginBottom: '2rem',
      }}
    >
      {buttons.map(b => (
        <Button
          key={b.key}
          label={b.label}
          icon={b.icon}
          variant={b.variant}
          count={counts[b.key]}
          highlighted={total > 0 && counts[b.key] === max}
          onClick={() => onVote(b.key)}
        />
      ))}
    </div>
  )
}