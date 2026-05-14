const links = [
  { path: '/', label: 'Home', icon: '⌂' },
  { path: '/tasks', label: 'Tasks', icon: '+' },
  { path: '/filters', label: 'Filters', icon: '◌' },
  { path: '/statistics', label: 'Stats', icon: '▥' },
  { path: '/settings', label: 'Settings', icon: '⚙' },
]

function Navbar({ currentRoute }) {
  return (
    <aside className="navbar" aria-label="Primary navigation">
      <a className="brand" href="#/">
        <span className="brand-mark">TF</span>
        <span>
          <strong>TaskFlow</strong>
          <small>Manager</small>
        </span>
      </a>

      <nav className="nav-links">
        {links.map((link) => (
          <a
            className={`nav-link ${currentRoute === link.path ? 'active' : ''}`}
            href={`#${link.path}`}
            key={link.path}
          >
            <span className="nav-icon" aria-hidden="true">
              {link.icon}
            </span>
            {link.label}
          </a>
        ))}
      </nav>
    </aside>
  )
}

export default Navbar
