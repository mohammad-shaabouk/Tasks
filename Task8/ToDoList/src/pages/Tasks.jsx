import AddTaskForm from '../components/AddTaskForm.jsx'
import TaskList from '../components/TaskList.jsx'

function Tasks({ tasks, onAddTask, onUpdateTask, onDeleteTask, onReorderTasks }) {
  return (
    <div className="page-grid">
      <section className="section-header">
        <div>
          <p className="eyebrow">Tasks</p>
          <h2>Capture, edit, complete, and reorder your work.</h2>
        </div>
      </section>

      <AddTaskForm onAddTask={onAddTask} />

      <TaskList
        tasks={tasks}
        onUpdateTask={onUpdateTask}
        onDeleteTask={onDeleteTask}
        onReorderTasks={onReorderTasks}
      />
    </div>
  )
}

export default Tasks
