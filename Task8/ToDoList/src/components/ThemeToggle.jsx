function ThemeToggle({ theme, onThemeChange }) {
  return (
    <div className="theme-toggle" aria-label="Theme selector">
      <button
        className={theme === 'light' ? 'active' : ''}
        type="button"
        onClick={() => onThemeChange('light')}
      >
        Light
      </button>
      <button
        className={theme === 'dark' ? 'active' : ''}
        type="button"
        onClick={() => onThemeChange('dark')}
      >
        Dark
      </button>
    </div>
  )
}

export default ThemeToggle
