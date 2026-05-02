import ThemeToggle from '../components/ThemeToggle.jsx'

function Settings({
  theme,
  onThemeChange,
  compactMode,
  onCompactModeChange,
  onResetTasks,
}) {
  return (
    <div className="page-grid">
      <section className="section-header">
        <div>
          <p className="eyebrow">Settings</p>
          <h2>Shape the workspace around how you like to move.</h2>
        </div>
      </section>

      <section className="settings-grid">
        <div className="panel setting-card">
          <div>
            <h3>Theme</h3>
            <p>Switch between a bright cream workspace and a deep evening mode.</p>
          </div>
          <ThemeToggle theme={theme} onThemeChange={onThemeChange} />
        </div>

        <div className="panel setting-card">
          <div>
            <h3>Compact task cards</h3>
            <p>Reduce vertical spacing for dense planning sessions.</p>
          </div>
          <label className="switch">
            <input
              type="checkbox"
              checked={compactMode}
              onChange={(event) => onCompactModeChange(event.target.checked)}
            />
            <span />
          </label>
        </div>

        <div className="panel setting-card danger-zone">
          <div>
            <h3>Reset workspace</h3>
            <p>Clear all tasks and start with a fresh board.</p>
          </div>
          <button className="danger-button" type="button" onClick={onResetTasks}>
            Reset Tasks
          </button>
        </div>
      </section>
    </div>
  )
}

export default Settings
