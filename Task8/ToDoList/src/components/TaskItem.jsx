import { useState } from 'react'

function formatDueDate(value) {
  if (!value) return 'No due date'
  return new Intl.DateTimeFormat('en', { month: 'short', day: 'numeric' }).format(
    new Date(`${value}T00:00:00`),
  )
}

function TaskItem({ task, onUpdateTask, onDeleteTask, onReorderTasks }) {
  const [editing, setEditing] = useState(false)
  const [draftTitle, setDraftTitle] = useState(task.title)

  function saveEdit() {
    if (!draftTitle.trim()) return
    onUpdateTask(task.id, { title: draftTitle.trim() })
    setEditing(false)
  }

  function handleDrop(event) {
    event.preventDefault()
    const sourceId = event.dataTransfer.getData('text/task-id')
    if (sourceId) onReorderTasks(sourceId, task.id)
  }

  return (
    <article
      className={`task-card ${task.completed ? 'completed' : ''} ${task.pinned ? 'pinned' : ''}`}
      draggable
      onDragStart={(event) => event.dataTransfer.setData('text/task-id', task.id)}
      onDragOver={(event) => event.preventDefault()}
      onDrop={handleDrop}
    >
      <div className="task-check">
        <input
          type="checkbox"
          checked={task.completed}
          onChange={(event) => onUpdateTask(task.id, { completed: event.target.checked })}
          aria-label={`Mark ${task.title} complete`}
        />
      </div>

      <div className="task-body">
        {editing ? (
          <input
            className="edit-input"
            value={draftTitle}
            onChange={(event) => setDraftTitle(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === 'Enter') saveEdit()
              if (event.key === 'Escape') setEditing(false)
            }}
            autoFocus
          />
        ) : (
          <h3>{task.title}</h3>
        )}
        <div className="task-meta">
          <span className={`priority-pill ${task.priority.toLowerCase()}`}>{task.priority}</span>
          <span>{task.category}</span>
          <span>{formatDueDate(task.dueDate)}</span>
        </div>
      </div>

      <div className="task-actions">
        <button
          className={`icon-button ${task.pinned ? 'active' : ''}`}
          type="button"
          onClick={() => onUpdateTask(task.id, { pinned: !task.pinned })}
          aria-label={task.pinned ? 'Unpin task' : 'Pin task'}
          title={task.pinned ? 'Unpin task' : 'Pin task'}
        >
          {task.pinned ? '★' : '☆'}
        </button>
        {editing ? (
          <button className="text-button" type="button" onClick={saveEdit}>
            Save
          </button>
        ) : (
          <button className="text-button" type="button" onClick={() => setEditing(true)}>
            Edit
          </button>
        )}
        <button
          className="icon-button danger"
          type="button"
          onClick={() => onDeleteTask(task.id)}
          aria-label="Delete task"
          title="Delete task"
        >
          ×
        </button>
      </div>
    </article>
  )
}

export default TaskItem
