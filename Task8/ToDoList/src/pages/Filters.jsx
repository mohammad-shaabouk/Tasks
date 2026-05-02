import { useMemo, useState } from 'react'
import FilterBar from '../components/FilterBar.jsx'
import TaskList from '../components/TaskList.jsx'

const statusOptions = [
  { label: 'All', value: 'all' },
  { label: 'Active', value: 'active' },
  { label: 'Completed', value: 'completed' },
]

const priorityOptions = [
  { label: 'Any priority', value: 'all' },
  { label: 'High', value: 'High' },
  { label: 'Medium', value: 'Medium' },
  { label: 'Low', value: 'Low' },
]

const categoryOptions = [
  { label: 'Any category', value: 'all' },
  { label: 'Study', value: 'Study' },
  { label: 'Work', value: 'Work' },
  { label: 'Personal', value: 'Personal' },
]

function Filters({ tasks, onUpdateTask, onDeleteTask, onReorderTasks }) {
  const [status, setStatus] = useState('all')
  const [priority, setPriority] = useState('all')
  const [category, setCategory] = useState('all')

  const filteredTasks = useMemo(
    () =>
      tasks.filter((task) => {
        const statusMatch =
          status === 'all' ||
          (status === 'active' && !task.completed) ||
          (status === 'completed' && task.completed)
        const priorityMatch = priority === 'all' || task.priority === priority
        const categoryMatch = category === 'all' || task.category === category
        return statusMatch && priorityMatch && categoryMatch
      }),
    [tasks, status, priority, category],
  )

  return (
    <div className="page-grid">
      <section className="section-header">
        <div>
          <p className="eyebrow">Filters</p>
          <h2>Find the exact slice of work you need.</h2>
        </div>
        <span className="result-count">{filteredTasks.length} shown</span>
      </section>

      <section className="filter-panel panel">
        <FilterBar value={status} onChange={setStatus} options={statusOptions} />
        <div className="filter-row">
          <FilterBar value={priority} onChange={setPriority} options={priorityOptions} />
          <FilterBar value={category} onChange={setCategory} options={categoryOptions} />
        </div>
      </section>

      <TaskList
        tasks={filteredTasks}
        onUpdateTask={onUpdateTask}
        onDeleteTask={onDeleteTask}
        onReorderTasks={onReorderTasks}
        emptyText="No tasks match this view yet."
      />
    </div>
  )
}

export default Filters
