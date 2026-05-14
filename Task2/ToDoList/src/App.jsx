import { useEffect, useMemo, useState } from 'react'
import Navbar from './components/Navbar.jsx'
import Header from './components/Header.jsx'
import Home from './pages/Home.jsx'
import Tasks from './pages/Tasks.jsx'
import Filters from './pages/Filters.jsx'
import Statistics from './pages/Statistics.jsx'
import Settings from './pages/Settings.jsx'
import './styles/global.css'

const STORAGE_KEY = 'taskflow-manager-tasks'
const THEME_KEY = 'taskflow-manager-theme'

const starterTasks = [
  {
    id: 'tf-1',
    title: 'Review advanced programming notes',
    priority: 'High',
    category: 'Study',
    dueDate: '2026-05-05',
    completed: false,
    pinned: true,
    createdAt: Date.now() - 80000,
  },
  {
    id: 'tf-2',
    title: 'Prepare weekly project update',
    priority: 'Medium',
    category: 'Work',
    dueDate: '2026-05-08',
    completed: true,
    pinned: false,
    createdAt: Date.now() - 60000,
  },
  {
    id: 'tf-3',
    title: 'Plan a focused evening routine',
    priority: 'Low',
    category: 'Personal',
    dueDate: '',
    completed: false,
    pinned: true,
    createdAt: Date.now() - 40000,
  },
]

const routes = {
  '/': Home,
  '/tasks': Tasks,
  '/filters': Filters,
  '/statistics': Statistics,
  '/settings': Settings,
}

function readRoute() {
  return window.location.hash.replace('#', '') || '/'
}

function App() {
  const [route, setRoute] = useState(readRoute)
  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEY)
    return saved ? JSON.parse(saved) : starterTasks
  })
  const [theme, setTheme] = useState(() => localStorage.getItem(THEME_KEY) || 'light')
  const [compactMode, setCompactMode] = useState(false)
  const [notifications, setNotifications] = useState([])

  useEffect(() => {
    const onHashChange = () => setRoute(readRoute())
    window.addEventListener('hashchange', onHashChange)
    return () => window.removeEventListener('hashchange', onHashChange)
  }, [])

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks))
  }, [tasks])

  useEffect(() => {
    localStorage.setItem(THEME_KEY, theme)
    document.documentElement.dataset.theme = theme
  }, [theme])

  useEffect(() => {
    const onKeyDown = (event) => {
      if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 'k') {
        event.preventDefault()
        window.location.hash = '/tasks'
        setTimeout(() => document.querySelector('[data-task-input]')?.focus(), 40)
      }
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [])

  const stats = useMemo(() => {
    const total = tasks.length
    const completed = tasks.filter((task) => task.completed).length
    const remaining = total - completed
    const percentage = total ? Math.round((completed / total) * 100) : 0
    const highPriority = tasks.filter((task) => task.priority === 'High').length
    const pinned = tasks.filter((task) => task.pinned)

    return { total, completed, remaining, percentage, highPriority, pinned }
  }, [tasks])

  function notify(message) {
    const id = crypto.randomUUID()
    setNotifications((items) => [...items, { id, message }])
    setTimeout(() => {
      setNotifications((items) => items.filter((item) => item.id !== id))
    }, 2600)
  }

  function addTask(payload) {
    const task = {
      id: crypto.randomUUID(),
      title: payload.title.trim(),
      priority: payload.priority,
      category: payload.category,
      dueDate: payload.dueDate,
      completed: false,
      pinned: false,
      createdAt: Date.now(),
    }
    setTasks((items) => [task, ...items])
    notify('Task added to your flow')
  }

  function updateTask(id, updates) {
    setTasks((items) =>
      items.map((task) => (task.id === id ? { ...task, ...updates } : task)),
    )
  }

  function deleteTask(id) {
    setTasks((items) => items.filter((task) => task.id !== id))
    notify('Task removed')
  }

  function reorderTasks(sourceId, targetId) {
    setTasks((items) => {
      const sourceIndex = items.findIndex((task) => task.id === sourceId)
      const targetIndex = items.findIndex((task) => task.id === targetId)
      if (sourceIndex < 0 || targetIndex < 0 || sourceIndex === targetIndex) return items
      const next = [...items]
      const [moved] = next.splice(sourceIndex, 1)
      next.splice(targetIndex, 0, moved)
      return next
    })
  }

  function resetTasks() {
    setTasks([])
    notify('Workspace reset')
  }

  const Page = routes[route] || Home

  return (
    <div className={`app-shell ${compactMode ? 'compact' : ''}`}>
      <Navbar currentRoute={route} />
      <main className="main-content">
        <Header stats={stats} />
        <Page
          tasks={tasks}
          stats={stats}
          onAddTask={addTask}
          onUpdateTask={updateTask}
          onDeleteTask={deleteTask}
          onReorderTasks={reorderTasks}
          theme={theme}
          onThemeChange={setTheme}
          compactMode={compactMode}
          onCompactModeChange={setCompactMode}
          onResetTasks={resetTasks}
        />
      </main>
      <div className="toast-stack" aria-live="polite">
        {notifications.map((item) => (
          <div className="toast" key={item.id}>
            {item.message}
          </div>
        ))}
      </div>
    </div>
  )
}

export default App
