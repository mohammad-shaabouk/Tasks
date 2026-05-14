import { useState } from 'react'
import Button from '../shared/Button.jsx'

const categories = ['Family', 'Work', 'Friends', 'Study']

const ContactForm = ({ onSubmit }) => {
  const [form, setForm] = useState({ category: 'Friends', name: '', number: '' })

  const updateField = (field, value) => {
    setForm((current) => ({ ...current, [field]: value }))
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    if (!form.name.trim() || !form.number.trim()) return

    onSubmit({
      ...form,
      favorite: false,
      name: form.name.trim(),
      number: form.number.trim(),
    })
    setForm({ category: 'Friends', name: '', number: '' })
  }

  return (
    <form className="contact-form" onSubmit={handleSubmit}>
      <label>
        <span>Name</span>
        <input onChange={(event) => updateField('name', event.target.value)} value={form.name} />
      </label>
      <label>
        <span>Number</span>
        <input onChange={(event) => updateField('number', event.target.value)} value={form.number} />
      </label>
      <label>
        <span>Group</span>
        <select onChange={(event) => updateField('category', event.target.value)} value={form.category}>
          {categories.map((category) => (
            <option key={category}>{category}</option>
          ))}
        </select>
      </label>
      <Button icon="+" type="submit">Add contact</Button>
    </form>
  )
}

export default ContactForm
