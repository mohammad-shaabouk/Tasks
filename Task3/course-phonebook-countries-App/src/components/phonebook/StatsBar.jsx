const StatsBar = ({ contacts }) => {
  const favorites = contacts.filter((contact) => contact.favorite).length

  return (
    <section className="stats-bar" aria-label="Contact statistics">
      <div>
        <span>Total contacts</span>
        <strong>{contacts.length}</strong>
      </div>
      <div>
        <span>Favorites</span>
        <strong>{favorites}</strong>
      </div>
      <div>
        <span>Groups</span>
        <strong>{new Set(contacts.map((contact) => contact.category || 'Friends')).size}</strong>
      </div>
    </section>
  )
}

export default StatsBar
