import { useEffect, useMemo, useState } from 'react'
import CountriesGrid from '../components/countries/CountriesGrid.jsx'
import CountriesSearch from '../components/countries/CountriesSearch.jsx'
import CountryDetailModal from '../components/countries/CountryDetailModal.jsx'
import CountrySkeleton from '../components/countries/CountrySkeleton.jsx'
import PopularCountries from '../components/countries/PopularCountries.jsx'
import { popularNames } from '../components/countries/popularCountriesData.js'
import RegionFilter from '../components/countries/RegionFilter.jsx'
import useDebouncedValue from '../components/countries/useDebouncedValue.js'
import { getCountries } from '../services/countriesService.js'
import { fallbackCountries } from '../services/fallbackCountries.js'

const CountriesPage = () => {
  const [activeRegion, setActiveRegion] = useState('All')
  const [countries, setCountries] = useState([])
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(true)
  const [query, setQuery] = useState('')
  const [selectedCountry, setSelectedCountry] = useState(null)
  const debouncedQuery = useDebouncedValue(query)

  useEffect(() => {
    getCountries()
      .then(setCountries)
      .catch(() => {
        setCountries(fallbackCountries)
        setError('REST Countries is unavailable, so sample countries are shown.')
      })
      .finally(() => setIsLoading(false))
  }, [])

  const filteredCountries = useMemo(() => {
    const normalizedQuery = debouncedQuery.trim().toLowerCase()

    return countries
      .filter((country) => activeRegion === 'All' || country.region === activeRegion)
      .filter((country) => country.name.common.toLowerCase().includes(normalizedQuery))
      .slice(0, 60)
  }, [activeRegion, countries, debouncedQuery])

  const showPopularCountries = !debouncedQuery && activeRegion === 'All'
  const countriesToShow = showPopularCountries
    ? filteredCountries.filter((country) => !popularNames.includes(country.name.common))
    : filteredCountries

  return (
    <section className="page page--countries">
      <div className="page-hero">
        <p className="eyebrow">World Explorer</p>
        <h1>Search the planet without losing the map.</h1>
        <p>
          The original country search now adds debounced input, region tabs,
          responsive cards, and detailed views.
        </p>
      </div>

      <CountriesSearch onChange={setQuery} value={query} />
      <RegionFilter activeRegion={activeRegion} onChange={setActiveRegion} />
      {error && <p className="notice">{error}</p>}

      {isLoading ? (
        <CountrySkeleton />
      ) : (
        <>
          {showPopularCountries && (
            <PopularCountries countries={countries} onSelect={setSelectedCountry} />
          )}
          <CountriesGrid countries={countriesToShow} onSelect={setSelectedCountry} />
        </>
      )}

      <CountryDetailModal country={selectedCountry} onClose={() => setSelectedCountry(null)} />
    </section>
  )
}

export default CountriesPage
