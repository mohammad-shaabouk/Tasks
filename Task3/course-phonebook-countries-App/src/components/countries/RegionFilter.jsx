const regions = ['All', 'Africa', 'Americas', 'Asia', 'Europe', 'Oceania']

const RegionFilter = ({ activeRegion, onChange }) => (
  <div className="region-tabs" role="tablist" aria-label="Filter by region">
    {regions.map((region) => (
      <button
        aria-selected={activeRegion === region}
        className={activeRegion === region ? 'is-active' : ''}
        key={region}
        onClick={() => onChange(region)}
        role="tab"
        type="button"
      >
        {region}
      </button>
    ))}
  </div>
)

export default RegionFilter
