import { useState } from 'react'
import { NavLink } from 'react-router-dom'

const navItems = [
  { icon: 'C', label: 'Courses', to: '/courses' },
  { icon: 'P', label: 'Phonebook', to: '/phonebook' },
  { icon: 'W', label: 'World', to: '/countries' },
]

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <header className="nav-bar">
        <NavLink className="nav-brand" to="/">
          <span className="nav-brand__mark">3</span>
          <span>Portfolio Lab</span>
        </NavLink>
        <button
          aria-expanded={isOpen}
          aria-label="Toggle navigation"
          className={`nav-toggle ${isOpen ? 'is-open' : ''}`}
          onClick={() => setIsOpen((open) => !open)}
          type="button"
        >
          <span />
          <span />
          <span />
        </button>
      </header>

      <div
        aria-hidden={!isOpen}
        className={`nav-overlay ${isOpen ? 'is-open' : ''}`}
        onClick={() => setIsOpen(false)}
      />

      <nav aria-label="Primary" className={`side-menu ${isOpen ? 'is-open' : ''}`}>
        <NavLink className="side-menu__home" onClick={() => setIsOpen(false)} to="/">
          <span className="nav-brand__mark">3</span>
          <span>Portfolio Lab</span>
        </NavLink>
        <div className="side-menu__links">
          {navItems.map((item) => (
            <NavLink
              className="side-menu__link"
              key={item.to}
              onClick={() => setIsOpen(false)}
              to={item.to}
            >
              <span className="side-menu__icon">{item.icon}</span>
              <span>{item.label}</span>
            </NavLink>
          ))}
        </div>
      </nav>
    </>
  )
}

export default NavBar
