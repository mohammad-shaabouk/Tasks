import Avatar from './Avatar.jsx'
import CategoryBadge from './CategoryBadge.jsx'

const ContactCard = ({ contact, isCompact = false, onDelete, onEdit, onToggleFavorite }) => (
  <article className={`contact-card ${isCompact ? 'contact-card--compact' : ''}`}>
    <Avatar name={contact.name} />
    <div className="contact-card__body">
      <div>
        <h3>{contact.name}</h3>
        <p>{contact.number}</p>
      </div>
      <CategoryBadge category={contact.category} />
    </div>
    <div className="contact-card__actions">
      <button
        aria-label={contact.favorite ? 'Remove favorite' : 'Add favorite'}
        className={`icon-button ${contact.favorite ? 'is-active' : ''}`}
        onClick={() => onToggleFavorite(contact)}
        type="button"
      >
        {contact.favorite ? '*' : '+'}
      </button>
      {!isCompact && (
        <>
          <button className="icon-button" onClick={() => onEdit(contact)} type="button">
            Edit
          </button>
          <button className="icon-button icon-button--danger" onClick={() => onDelete(contact)} type="button">
            Delete
          </button>
        </>
      )}
    </div>
  </article>
)

export default ContactCard
