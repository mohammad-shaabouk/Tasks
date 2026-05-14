import ProgressBar from '../components/ProgressBar.jsx'
import StatCard from '../components/StatCard.jsx'

function getMostCommon(tasks, field) {
  if (!tasks.length) return 'None'
  const counts = tasks.reduce((acc, task) => {
    acc[task[field]] = (acc[task[field]] || 0) + 1
    return acc
  }, {})
  return Object.entries(counts).sort((a, b) => b[1] - a[1])[0][0]
}

function Statistics({ tasks, stats }) {
  const mostPriority = getMostCommon(tasks, 'priority')
  const categoryCounts = ['Study', 'Work', 'Personal'].map((category) => ({
    category,
    count: tasks.filter((task) => task.category === category).length,
  }))
  const priorityCounts = ['High', 'Medium', 'Low'].map((priority) => ({
    priority,
    count: tasks.filter((task) => task.priority === priority).length,
  }))
  const maxCategory = Math.max(...categoryCounts.map((item) => item.count), 1)
  const maxPriority = Math.max(...priorityCounts.map((item) => item.count), 1)

  return (
    <div className="page-grid">
      <section className="section-header">
        <div>
          <p className="eyebrow">Statistics</p>
          <h2>Progress, patterns, and useful signals.</h2>
        </div>
      </section>

      <section className="stats-grid">
        <StatCard label="Total tasks" value={stats.total} />
        <StatCard label="Completed" value={stats.completed} tone="success" />
        <StatCard label="Remaining" value={stats.remaining} tone="warning" />
        <StatCard label="Completion" value={`${stats.percentage}%`} tone="violet" />
      </section>

      <section className="panel analytics-panel">
        <ProgressBar value={stats.percentage} label="Completion percentage" />
        <div className="donut" style={{ '--value': `${stats.percentage}%` }}>
          <span>{stats.percentage}%</span>
        </div>
      </section>

      <section className="chart-grid">
        <div className="panel">
          <h3>By category</h3>
          {categoryCounts.map((item) => (
            <div className="bar-row" key={item.category}>
              <span>{item.category}</span>
              <div>
                <i style={{ width: `${(item.count / maxCategory) * 100}%` }} />
              </div>
              <strong>{item.count}</strong>
            </div>
          ))}
        </div>

        <div className="panel">
          <h3>By priority</h3>
          {priorityCounts.map((item) => (
            <div className="bar-row" key={item.priority}>
              <span>{item.priority}</span>
              <div>
                <i className={item.priority.toLowerCase()} style={{ width: `${(item.count / maxPriority) * 100}%` }} />
              </div>
              <strong>{item.count}</strong>
            </div>
          ))}
        </div>
      </section>

      <section className="insight panel">
        <h3>Insights</h3>
        <p>You completed {stats.percentage}% of tasks.</p>
        <p>Most tasks are {mostPriority} priority.</p>
      </section>
    </div>
  )
}

export default Statistics
