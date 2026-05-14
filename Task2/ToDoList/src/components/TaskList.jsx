import TaskItem from './TaskItem.jsx'

function TaskList({ tasks, onUpdateTask, onDeleteTask, onReorderTasks, emptyText }) {
  if (!tasks.length) {
    return (
      <div className="empty-state panel">
        <h3>No tasks here yet</h3>
        <p>{emptyText || 'Add a task or adjust your filters to continue.'}</p>
      </div>
    )
  }

  return (
    <div className="task-list">
      {tasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          onUpdateTask={onUpdateTask}
          onDeleteTask={onDeleteTask}
          onReorderTasks={onReorderTasks}
        />
      ))}
    </div>
  )
}

export default TaskList
