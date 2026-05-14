const formatNumber = (value) => value?.toLocaleString() || 'Unknown'

const CountryCard = ({ country, onSelect }) => (
  <article className="country-card">
    <img alt={country.flags.alt || `${country.name.common} flag`} src={country.flags.png} />
    <div className="country-card__body">
      <h3>{country.name.common}</h3>
      <dl>
        <div>
          <dt>Capital</dt>
          <dd>{country.capital?.[0] || 'Unknown'}</dd>
        </div>
        <div>
          <dt>Population</dt>
          <dd>{formatNumber(country.population)}</dd>
        </div>
        <div>
          <dt>Region</dt>
          <dd>{country.region}</dd>
        </div>
      </dl>
      <button onClick={() => onSelect(country)} type="button">
        View details
      </button>
    </div>
  </article>
)

export default CountryCard
