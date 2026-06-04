import { useCallback, useEffect, useMemo, useState } from 'react'
import personService from './services/persons'
import './App.css'

const getInitials = (name = '') =>
  name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map(part => part[0])
    .join('')
    .toUpperCase()

const Notification = ({ message, type }) => {
  if (!message) return null

  return (
    <div className={`notification notification--${type}`} role="status" aria-live="polite">
      <span className="notification__dot" aria-hidden="true" />
      <p>{message}</p>
    </div>
  )
}

const Filter = ({ value, onChange, resultCount, totalCount }) => (
  <section className="toolbar" aria-labelledby="search-title">
    <div>
      <p className="eyebrow">بحث سريع</p>
      <h2 id="search-title">اعثر على جهة اتصال</h2>
    </div>
    <label className="search-field">
      <span className="search-field__icon" aria-hidden="true">
        &#128269;
      </span>
      <span className="sr-only">ابحث بالاسم</span>
      <input
        value={value}
        onChange={onChange}
        placeholder="اكتب اسمًا للبحث..."
        autoComplete="off"
      />
    </label>
    <p className="toolbar__meta">
      عرض {resultCount} من {totalCount} جهة اتصال
    </p>
  </section>
)

const PersonForm = ({ onSubmit, name, number, onNameChange, onNumberChange }) => (
  <form className="contact-form" onSubmit={onSubmit}>
    <div className="section-heading">
      <p className="eyebrow">إضافة وتحديث</p>
      <h2>جهة اتصال جديدة</h2>
    </div>

    <div className="form-grid">
      <label className="field">
        <span>الاسم</span>
        <input
          value={name}
          onChange={onNameChange}
          placeholder="مثال: أحمد علي"
          autoComplete="name"
        />
      </label>

      <label className="field">
        <span>رقم الهاتف</span>
        <input
          value={number}
          onChange={onNumberChange}
          placeholder="مثال: 0501234567"
          autoComplete="tel"
          inputMode="tel"
        />
      </label>
    </div>

    <button className="button button--primary" type="submit">
      <span aria-hidden="true">+</span>
      إضافة جهة اتصال
    </button>
  </form>
)

const Person = ({ person, onDelete }) => (
  <li className="contact-card">
    <div className="avatar" aria-hidden="true">
      {getInitials(person.name)}
    </div>
    <div className="contact-card__content">
      <h3>{person.name}</h3>
      <a href={`tel:${person.number}`} className="contact-card__number">
        {person.number}
      </a>
    </div>
    <button
      className="button button--ghost"
      type="button"
      onClick={() => onDelete(person.id, person.name)}
      aria-label={`حذف ${person.name}`}
    >
      حذف
    </button>
  </li>
)

const ContactSkeleton = () => (
  <li className="contact-card contact-card--loading" aria-hidden="true">
    <div className="avatar skeleton" />
    <div className="contact-card__content">
      <span className="skeleton skeleton--title" />
      <span className="skeleton skeleton--line" />
    </div>
    <span className="skeleton skeleton--button" />
  </li>
)

const EmptyState = ({ hasFilter }) => (
  <div className="empty-state">
    <div className="empty-state__mark" aria-hidden="true">
      {hasFilter ? '?' : '+'}
    </div>
    <h3>{hasFilter ? 'لا توجد نتائج مطابقة' : 'لا توجد جهات اتصال بعد'}</h3>
    <p>
      {hasFilter
        ? 'جرّب تعديل عبارة البحث أو امسحها لعرض كل الأسماء.'
        : 'ابدأ بإضافة الاسم ورقم الهاتف ليظهر السجل هنا بشكل مرتب.'}
    </p>
  </div>
)

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')
  const [message, setMessage] = useState(null)
  const [messageType, setMessageType] = useState('success')
  const [isLoading, setIsLoading] = useState(true)

  const showNotification = useCallback((text, type = 'success') => {
    setMessage(text)
    setMessageType(type)
    setTimeout(() => setMessage(null), 5000)
  }, [])

  useEffect(() => {
    personService
      .getAll()
      .then(data => setPersons(data))
      .catch(() => {
        showNotification('تعذر تحميل جهات الاتصال. تأكد من تشغيل الخادم.', 'error')
      })
      .finally(() => setIsLoading(false))
  }, [showNotification])

  const addPerson = event => {
    event.preventDefault()
    const existing = persons.find(p => p.name === newName)

    if (existing) {
      if (window.confirm(`${newName} موجود مسبقًا. هل تريد تحديث رقم الهاتف؟`)) {
        const updated = { ...existing, number: newNumber }
        personService.update(existing.id, updated)
          .then(returnedPerson => {
            setPersons(persons.map(p => p.id !== existing.id ? p : returnedPerson))
            showNotification(`تم تحديث رقم ${newName}`)
            setNewName('')
            setNewNumber('')
          })
          .catch(() => {
            showNotification(`${newName} حُذف مسبقًا من الخادم`, 'error')
            setPersons(persons.filter(p => p.id !== existing.id))
          })
      }
      return
    }

    const personObject = { name: newName, number: newNumber }
    personService.create(personObject)
      .then(returnedPerson => {
        setPersons(persons.concat(returnedPerson))
        showNotification(`تمت إضافة ${newName}`)
        setNewName('')
        setNewNumber('')
      })
  }

  const deletePerson = (id, name) => {
    if (window.confirm(`هل تريد حذف ${name}؟`)) {
      personService.remove(id).then(() => {
        setPersons(persons.filter(p => p.id !== id))
        showNotification(`تم حذف ${name}`)
      })
    }
  }

  const filtered = useMemo(() => {
    if (!filter) return persons

    return persons.filter(p =>
      p.name.toLowerCase().includes(filter.toLowerCase()))
  }, [filter, persons])

  const totalContacts = persons.length
  const visibleContacts = filtered.length

  return (
    <main className="app-shell" dir="rtl">
      <section className="hero-panel">
        <nav className="topbar" aria-label="التنقل الرئيسي">
          <a className="brand" href="#top" aria-label="دفتر الهاتف">
            <span className="brand__mark" aria-hidden="true">P</span>
            <span>دفتر الهاتف</span>
          </a>
          <a className="topbar__action" href="#contacts">جهات الاتصال</a>
        </nav>

        <div className="hero-panel__content" id="top">
          <div>
            <p className="eyebrow">إدارة جهات الاتصال</p>
            <h1>دفتر هاتف بسيط، أنيق، وسريع الاستخدام.</h1>
            <p className="hero-panel__lead">
              أضف الأسماء، حدّث الأرقام، وابحث في القائمة من واجهة هادئة وواضحة.
            </p>
          </div>

          <div className="stats-card" aria-label="ملخص جهات الاتصال">
            <span className="stats-card__value">{totalContacts}</span>
            <span className="stats-card__label">جهة اتصال محفوظة</span>
          </div>
        </div>
      </section>

      <Notification message={message} type={messageType} />

      <div className="app-grid">
        <aside className="side-panel">
          <PersonForm
            onSubmit={addPerson}
            name={newName}
            number={newNumber}
            onNameChange={e => setNewName(e.target.value)}
            onNumberChange={e => setNewNumber(e.target.value)}
          />
        </aside>

        <section className="contacts-panel" id="contacts" aria-labelledby="contacts-title">
          <Filter
            value={filter}
            onChange={e => setFilter(e.target.value)}
            resultCount={visibleContacts}
            totalCount={totalContacts}
          />

          <div className="contacts-header">
            <div>
              <p className="eyebrow">القائمة</p>
              <h2 id="contacts-title">الأرقام المحفوظة</h2>
            </div>
          </div>

          {isLoading ? (
            <ul className="contacts-list" aria-label="جار تحميل جهات الاتصال">
              <ContactSkeleton />
              <ContactSkeleton />
              <ContactSkeleton />
            </ul>
          ) : visibleContacts > 0 ? (
            <ul className="contacts-list">
              {filtered.map(p => (
                <Person key={p.id} person={p} onDelete={deletePerson} />
              ))}
            </ul>
          ) : (
            <EmptyState hasFilter={Boolean(filter)} />
          )}
        </section>
      </div>
    </main>
  )
}

export default App
