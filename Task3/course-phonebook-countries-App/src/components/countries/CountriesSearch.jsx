const CountriesSearch = ({ onChange, value }) => (
  <label className="world-search">
    <span>Search countries</span>
    <input
      onChange={(event) => onChange(event.target.value)}
      placeholder="Finland, Japan, Brazil..."
      value={value}
    />
  </label>
)

export default CountriesSearch
