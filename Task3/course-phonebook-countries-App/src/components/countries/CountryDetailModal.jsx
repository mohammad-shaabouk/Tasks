import Modal from '../shared/Modal.jsx'

const formatList = (items) => (items.length > 0 ? items.join(', ') : 'Unknown')

const CountryDetailModal = ({ country, onClose }) => {
  if (!country) return null

  const languages = Object.values(country.languages || {})
  const currencies = Object.values(country.currencies || {}).map((currency) => currency.name)
  const borders = country.borders || []

  return (
    <Modal isOpen={Boolean(country)} onClose={onClose} title={country.name.common}>
      <div className="country-detail">
        <img alt={country.flags.alt || `${country.name.common} flag`} src={country.flags.svg} />
        <dl className="detail-stats">
          <div>
            <dt>Capital</dt>
            <dd>{country.capital?.[0] || 'Unknown'}</dd>
          </div>
          <div>
            <dt>Population</dt>
            <dd>{country.population?.toLocaleString()}</dd>
          </div>
          <div>
            <dt>Area</dt>
            <dd>{country.area?.toLocaleString()} km2</dd>
          </div>
        </dl>
        <p><strong>Languages:</strong> {formatList(languages)}</p>
        <p><strong>Currencies:</strong> {formatList(currencies)}</p>
        <p><strong>Borders:</strong> {formatList(borders)}</p>
      </div>
    </Modal>
  )
}

export default CountryDetailModal
