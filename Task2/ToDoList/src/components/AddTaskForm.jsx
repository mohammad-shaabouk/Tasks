import { useState } from 'react'

const initialForm = {
  title: '',
  priority: 'Medium',
  category: 'Study',
  dueDate: '',
}

function AddTaskForm({ onAddTask }) {
  const [form, setForm] = useState(initialForm)

  function updateField(field, value) {
    setForm((current) => ({ ...current, [field]: value }))
  }

  function handleSubmit(event) {
    event.preventDefault()
    if (!form.title.trim()) return
    onAddTask(form)
    setForm(initialForm)
  }

  return (
    <form className="task-form panel" onSubmit={handleSubmit}>
      <div className="form-main">
        <label htmlFor="task-title">Task name</label>
        <input
          data-task-input
          id="task-title"
          type="text"
          value={form.title}
          onChange={(event) => updateField('title', event.target.value)}
          placeholder="Add a focused, actionable task"
        />
      </div>

      <div className="form-grid">
        <label>
          Priority
          <select
            value={form.priority}
            onChange={(event) => updateField('priority', event.target.value)}
          >
            <option>High</option>
            <option>Medium</option>
            <option>Low</option>
          </select>
        </label>

        <label>
          Category
          <select
            value={form.category}
            onChange={(event) => updateField('category', event.target.value)}
          >
            <option>Study</option>
            <option>Work</option>
            <option>Personal</option>
          </select>
        </label>

        <label>
          Due date
          <input
            type="date"
            value={form.dueDate}
            onChange={(event) => updateField('dueDate', event.target.value)}
          />
        </label>
      </div>

      <button className="primary-button" type="submit">
        Add Task
      </button>
    </form>
  )
}

export default AddTaskForm
