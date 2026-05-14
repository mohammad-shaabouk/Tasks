import ContactForm from '../components/phonebook/ContactForm.jsx'
import ContactsGrid from '../components/phonebook/ContactsGrid.jsx'
import EditContactModal from '../components/phonebook/EditContactModal.jsx'
import FavoritesSection from '../components/phonebook/FavoritesSection.jsx'
import SearchBar from '../components/phonebook/SearchBar.jsx'
import StatsBar from '../components/phonebook/StatsBar.jsx'
import usePhonebook from '../components/phonebook/usePhonebook.js'
import Loader from '../components/shared/Loader.jsx'

const PhonebookPage = () => {
  const phonebook = usePhonebook()

  return (
    <section className="page page--phonebook">
      <div className="page-hero">
        <p className="eyebrow">Smart Contacts Hub</p>
        <h1>Search fast, keep the right people close.</h1>
        <p>
          The original phonebook flow now has categories, favorites, editing,
          confirmation, and server-backed CRUD.
        </p>
      </div>

      <StatsBar contacts={phonebook.contacts} />
      {phonebook.error && <p className="notice">{phonebook.error}</p>}
      <SearchBar onChange={phonebook.setFilter} value={phonebook.filter} />
      <ContactForm onSubmit={phonebook.addContact} />

      {phonebook.isLoading ? (
        <Loader label="Loading contacts" />
      ) : (
        <>
          <FavoritesSection
            favorites={phonebook.favoriteContacts}
            onDelete={phonebook.removeContact}
            onEdit={phonebook.setEditingContact}
            onToggleFavorite={phonebook.toggleFavorite}
          />
          <ContactsGrid
            contacts={phonebook.filteredContacts}
            onDelete={phonebook.removeContact}
            onEdit={phonebook.setEditingContact}
            onToggleFavorite={phonebook.toggleFavorite}
          />
        </>
      )}

      <EditContactModal
        contact={phonebook.editingContact}
        key={phonebook.editingContact?.id || 'empty-contact'}
        onClose={() => phonebook.setEditingContact(null)}
        onSave={phonebook.saveContact}
      />
    </section>
  )
}

export default PhonebookPage
