import CountryCard from './CountryCard.jsx'
import { popularNames } from './popularCountriesData.js'

const PopularCountries = ({ countries, onSelect }) => {
  const popularCountries = popularNames
    .map((name) => countries.find((country) => country.name.common === name))
    .filter(Boolean)

  if (popularCountries.length === 0) return null

  return (
    <section className="popular-countries" aria-label="Popular countries">
      <div className="section-heading">
        <p className="eyebrow">Featured</p>
        <h2>Popular countries</h2>
      </div>
      <div className="popular-countries__row">
        {popularCountries.map((country) => (
          <CountryCard country={country} key={country.cca3} onSelect={onSelect} />
        ))}
      </div>
    </section>
  )
}

export default PopularCountries
