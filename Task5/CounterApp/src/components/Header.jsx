import ThemeToggle from './ThemeToggle';

function Header() {
  return (
    <header className="app-header">
      <div>
        <p className="eyebrow">Counter Studio</p>
        <h1>Advanced Counter</h1>
        <p className="header-copy">
          A focused dashboard for counting, limits, automation, stats, and quick history.
        </p>
      </div>
      <ThemeToggle />
    </header>
  );
}

export default Header;
