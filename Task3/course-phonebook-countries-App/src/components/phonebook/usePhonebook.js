import { useCallback, useEffect, useMemo, useState } from 'react'
import {
  createContact,
  deleteContact,
  getContacts,
  updateContact,
} from '../../services/phonebookService.js'

const normalizeContact = (contact) => ({
  category: 'Friends',
  favorite: false,
  ...contact,
})

const usePhonebook = () => {
  const [contacts, setContacts] = useState([])
  const [editingContact, setEditingContact] = useState(null)
  const [error, setError] = useState('')
  const [filter, setFilter] = useState('')
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    getContacts()
      .then((data) => setContacts(data.map(normalizeContact)))
      .catch(() => setError('Start json-server on port 3001 to load saved contacts.'))
      .finally(() => setIsLoading(false))
  }, [])

  const filteredContacts = useMemo(() => {
    const query = filter.trim().toLowerCase()
    if (!query) return contacts
    return contacts.filter((contact) => contact.name.toLowerCase().includes(query))
  }, [contacts, filter])

  const favoriteContacts = contacts.filter((contact) => contact.favorite)

  const addContact = async (contact) => {
    if (contacts.some((item) => item.name.toLowerCase() === contact.name.toLowerCase())) {
      setError(`${contact.name} already exists in the phonebook.`)
      return
    }

    try {
      const created = await createContact(contact)
      setContacts((current) => [...current, normalizeContact(created)])
      setError('')
    } catch {
      setError('Could not save the contact. Is json-server running?')
    }
  }

  const removeContact = async (contact) => {
    if (!confirm(`Delete ${contact.name}?`)) return

    try {
      await deleteContact(contact.id)
      setContacts((current) => current.filter((item) => item.id !== contact.id))
    } catch {
      setError('Could not delete the contact from the server.')
    }
  }

  const saveContact = useCallback(async (contact) => {
    try {
      const updated = await updateContact(contact.id, contact)
      setContacts((current) =>
        current.map((item) => (item.id === contact.id ? normalizeContact(updated) : item)),
      )
      setEditingContact(null)
      setError('')
    } catch {
      setError('Could not update the contact.')
    }
  }, [])

  const toggleFavorite = (contact) => {
    saveContact({ ...contact, favorite: !contact.favorite })
  }

  return {
    addContact,
    contacts,
    editingContact,
    error,
    favoriteContacts,
    filter,
    filteredContacts,
    isLoading,
    removeContact,
    saveContact,
    setEditingContact,
    setFilter,
    toggleFavorite,
  }
}

export default usePhonebook
