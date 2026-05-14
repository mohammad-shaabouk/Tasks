const CountrySkeleton = () => (
  <div className="countries-grid" aria-hidden="true">
    {['a', 'b', 'c', 'd', 'e', 'f'].map((id) => (
      <div className="country-card skeleton-card" key={id}>
        <span className="skeleton skeleton--flag" />
        <span className="skeleton skeleton--line" />
        <span className="skeleton skeleton--line short" />
        <span className="skeleton skeleton--line" />
      </div>
    ))}
  </div>
)

export default CountrySkeleton
