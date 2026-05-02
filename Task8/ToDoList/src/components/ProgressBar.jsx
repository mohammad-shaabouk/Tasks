function ProgressBar({ value, label }) {
  return (
    <div className="progress-wrap">
      <div className="progress-label">
        <span>{label || 'Completion'}</span>
        <strong>{value}%</strong>
      </div>
      <div className="progress-track" aria-label={`${value}% complete`}>
        <span style={{ width: `${value}%` }} />
      </div>
    </div>
  )
}

export default ProgressBar
