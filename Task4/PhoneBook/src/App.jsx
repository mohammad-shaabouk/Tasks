import { useState, useEffect } from 'react'
import personService from './services/persons'
const Notification = ({ message, type }) => {
  if (!message) return null
  const style = {
    color: type === 'error' ? 'red' : 'green',
    background: '#f0f0f0', fontSize: '18px',
    border: `2px solid ${type === 'error' ? 'red' : 'green'}`,
    borderRadius: '5px', padding: '10px', marginBottom: '15px'
  }
  return <div style={style}>{message}</div>
}
const Filter = ({ value, onChange }) => (
  <div>اﻟﺒﺤﺚ: <input value={value} onChange={onChange} /></div>
)
const PersonForm = ({ onSubmit, name, number, onNameChange, onNumberChange
}) => (
  <form onSubmit={onSubmit}>
    <div>اﻻﺳﻢ: <input value={name} onChange={onNameChange} /></div>
    <div>اﻟﺮﻗﻢ: <input value={number} onChange={onNumberChange} /></div>
    <button type="submit">إﺿﺎﻓﺔ</button>
  </form>
)
const Person = ({ person, onDelete }) => (
  <li>
    {person.name}: {person.number}
    <button onClick={() => onDelete(person.id, person.name)}>ﺣﺬف</button>
  </li>
)
const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')
  const [message, setMessage] = useState(null)
  const [messageType, setMessageType] = useState('success')
  useEffect(() => {
    personService.getAll().then(data => setPersons(data))
  }, [])
  const showNotification = (text, type = 'success') => {
    setMessage(text)
    setMessageType(type)
    setTimeout(() => setMessage(null), 5000)
  }
  const addPerson = (event) => {
    event.preventDefault()
    const existing = persons.find(p => p.name === newName)
    if (existing) {
      if (window.confirm(`${newName} ﻣﻮﺟﻮد ﻣﺴﺒﻘﺎً. ھﻞ ﺗﺮﯾﺪ ﺗﺤﺪﯾﺚ اﻟﺮﻗﻢ؟`)) {
        const updated = { ...existing, number: newNumber }
        personService.update(existing.id, updated)
          .then(returnedPerson => {
            setPersons(persons.map(p => p.id !== existing.id ? p :
              returnedPerson))
            showNotification(`ﺗﻢ ﺗﺤﺪﯾﺚ رﻗﻢ ${newName}`)
            setNewName('')
            setNewNumber('')
          })
          .catch(() => {
            showNotification(`${newName} ﺣُﺬف ﻣﺴﺒﻘﺎً ﻣﻦ اﻟﺨﺎدم`, 'error')
            setPersons(persons.filter(p => p.id !== existing.id))
          })
      }
      return
    }
    const personObject = { name: newName, number: newNumber }
    personService.create(personObject)
      .then(returnedPerson => {
        setPersons(persons.concat(returnedPerson))
        showNotification(`ﺗﻤﺖ إﺿﺎﻓﺔ ${newName}`)
        setNewName('')
        setNewNumber('')
      })
  }
  const deletePerson = (id, name) => {
    if (window.confirm(`ھﻞ ﺗﺮﯾﺪ ﺣﺬف ${name}؟`)) {
      personService.remove(id).then(() => {
        setPersons(persons.filter(p => p.id !== id))
        showNotification(`ﺗﻢ ﺣﺬف ${name}`)
      })
    }
  }
  const filtered = filter
    ? persons.filter(p =>
      p.name.toLowerCase().includes(filter.toLowerCase()))
    : persons
  return (
    <div>
      <h1>دﻟﯿﻞ اﻟﮭﺎﺗﻒ</h1>
      <Notification message={message} type={messageType} />
      <Filter value={filter} onChange={(e) => setFilter(e.target.value)} />
      <h2>إﺿﺎﻓﺔ ﺟﺪﯾﺪة</h2>
      <PersonForm
        onSubmit={addPerson}
        name={newName} number={newNumber}
        onNameChange={(e) => setNewName(e.target.value)}
        onNumberChange={(e) => setNewNumber(e.target.value)}
      />
      <h2>اﻷرﻗﺎم</h2>
      <ul>
        {filtered.map(p => <Person key={p.id} person={p} onDelete=
          {deletePerson} />)}
      </ul>
    </div>
  )
}
export default App