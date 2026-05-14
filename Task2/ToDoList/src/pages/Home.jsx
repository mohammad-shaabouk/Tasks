import ProgressBar from '../components/ProgressBar.jsx'
import StatCard from '../components/StatCard.jsx'
import TaskList from '../components/TaskList.jsx'

function Home({ tasks, stats, onUpdateTask, onDeleteTask, onReorderTasks }) {
  const smartMessage =
    stats.percentage >= 60 || stats.remaining <= stats.completed
      ? 'Great job 👏'
      : "Let's get to work 💪"

  return (
    <div className="page-grid">
      <section className="hero-panel">
        <div>
          <p className="eyebrow">Dashboard</p>
          <h2>Welcome back. Your priorities are ready.</h2>
          <p>
            Keep your day visible, protect your focus, and move the important
            work forward one clean step at a time.
          </p>
        </div>
        <div className="smart-message">{smartMessage}</div>
      </section>

      <section className="stats-grid">
        <StatCard label="Total tasks" value={stats.total} detail="All tracked work" />
        <StatCard label="Completed" value={stats.completed} detail="Momentum banked" tone="success" />
        <StatCard label="Remaining" value={stats.remaining} detail="Still in motion" tone="warning" />
      </section>

      <section className="panel wide-panel">
        <ProgressBar value={stats.percentage} label="Overall progress" />
      </section>

      <section className="section-header">
        <div>
          <p className="eyebrow">Pinned</p>
          <h2>Priority lane</h2>
        </div>
        <a className="text-link" href="#/tasks">
          Manage all tasks
        </a>
      </section>

      <TaskList
        tasks={stats.pinned}
        onUpdateTask={onUpdateTask}
        onDeleteTask={onDeleteTask}
        onReorderTasks={onReorderTasks}
        emptyText="Pin important tasks from the Tasks page to keep them close."
      />

      <section className="timeline panel">
        <h2>Today at a glance</h2>
        {tasks.slice(0, 4).map((task) => (
          <div className="timeline-row" key={task.id}>
            <span className={`timeline-dot ${task.priority.toLowerCase()}`} />
            <div>
              <strong>{task.title}</strong>
              <p>{task.completed ? 'Completed' : `${task.priority} priority`}</p>
            </div>
          </div>
        ))}
      </section>
    </div>
  )
}

export default Home
