const SearchBar = ({ onChange, value }) => (
  <label className="search-bar">
    <span>Search contacts</span>
    <input
      onChange={(event) => onChange(event.target.value)}
      placeholder="Type a name..."
      value={value}
    />
  </label>
)

export default SearchBar
