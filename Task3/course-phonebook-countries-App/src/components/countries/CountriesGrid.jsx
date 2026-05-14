import EmptyState from '../shared/EmptyState.jsx'
import CountryCard from './CountryCard.jsx'

const CountriesGrid = ({ countries, onSelect }) => {
  if (countries.length === 0) {
    return (
      <EmptyState
        message="Adjust the search text or switch to another region."
        title="No countries match"
      />
    )
  }

  return (
    <section className="countries-grid" aria-label="Countries">
      {countries.map((country) => (
        <CountryCard country={country} key={country.cca3} onSelect={onSelect} />
      ))}
    </section>
  )
}

export default CountriesGrid
