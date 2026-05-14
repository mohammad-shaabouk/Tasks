import ContactCard from './ContactCard.jsx'

const FavoritesSection = ({ favorites, onDelete, onEdit, onToggleFavorite }) => (
  <section className="favorites-section" aria-label="Favorite contacts">
    <div className="section-heading">
      <p className="eyebrow">Pinned</p>
      <h2>Favorite contacts</h2>
    </div>
    {favorites.length > 0 ? (
      <div className="favorites-row">
        {favorites.map((contact) => (
          <ContactCard
            contact={contact}
            isCompact
            key={contact.id}
            onDelete={onDelete}
            onEdit={onEdit}
            onToggleFavorite={onToggleFavorite}
          />
        ))}
      </div>
    ) : (
      <p className="muted">Tap + on any contact to pin it here.</p>
    )}
  </section>
)

export default FavoritesSection
