function StatsPanel({ stats }) {
  const statItems = [
    { label: 'Max value', value: stats.max.toLocaleString(), tone: 'success' },
    { label: 'Min value', value: stats.min.toLocaleString(), tone: 'danger' },
    { label: 'Total clicks', value: stats.totalClicks.toLocaleString() },
    { label: 'Increments', value: stats.increments, tone: 'success' },
    { label: 'Decrements', value: stats.decrements, tone: 'danger' }
  ];

  return (
    <section className="card stats-card">
      <div className="section-heading">
        <p className="eyebrow">Analytics</p>
        <h2>Statistics</h2>
      </div>
      <div className="stats-grid">
        {statItems.map(item => (
          <div className="stat-item" key={item.label}>
            <span>{item.label}</span>
            <strong className={item.tone ? `tone-${item.tone}` : ''}>
              {item.value}
            </strong>
          </div>
        ))}
      </div>
    </section>
  );
}

export default StatsPanel;
