import EmptyState from '../shared/EmptyState.jsx'
import ContactCard from './ContactCard.jsx'

const ContactsGrid = ({ contacts, onDelete, onEdit, onToggleFavorite }) => {
  if (contacts.length === 0) {
    return (
      <EmptyState
        message="Try a different search or add a new contact."
        title="No contacts found"
      />
    )
  }

  return (
    <section className="contacts-grid" aria-label="Contacts">
      {contacts.map((contact) => (
        <ContactCard
          contact={contact}
          key={contact.id}
          onDelete={onDelete}
          onEdit={onEdit}
          onToggleFavorite={onToggleFavorite}
        />
      ))}
    </section>
  )
}

export default ContactsGrid
