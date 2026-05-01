import { useContext } from 'react'
import { AppContext } from '../context/AppContext'

function ThemeToggle() {
  const { theme, toggleTheme } = useContext(AppContext)
  const isDark = theme === 'dark'

  return (
    <button
      className="theme-toggle"
      type="button"
      onClick={toggleTheme}
      aria-pressed={isDark}
      aria-label="Toggle theme"
    >
      <span className="toggle-track">
        <span className="toggle-thumb" />
      </span>
      <span>{isDark ? 'Dark mode' : 'Light mode'}</span>
    </button>
  )
}

export default ThemeToggle
