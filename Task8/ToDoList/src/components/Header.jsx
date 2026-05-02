function Header({ stats }) {
  const today = new Intl.DateTimeFormat('en', {
    weekday: 'long',
    month: 'short',
    day: 'numeric',
  }).format(new Date())

  return (
    <header className="top-header">
      <div>
        <p className="eyebrow">{today}</p>
        <h1>TaskFlow Manager</h1>
      </div>
      <div className="command-hint">
        <span>Ctrl</span>
        <span>K</span>
        <small>Add task</small>
      </div>
      <div className="completion-ring" style={{ '--value': `${stats.percentage}%` }}>
        <span>{stats.percentage}%</span>
      </div>
    </header>
  )
}

export default Header
