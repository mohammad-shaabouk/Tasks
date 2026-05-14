import { useState } from 'react'
import Button from '../shared/Button.jsx'
import Modal from '../shared/Modal.jsx'

const categories = ['Family', 'Work', 'Friends', 'Study']

const EditContactModal = ({ contact, onClose, onSave }) => {
  const [form, setForm] = useState({
    category: contact?.category || 'Friends',
    name: contact?.name || '',
    number: contact?.number || '',
  })

  const handleSubmit = (event) => {
    event.preventDefault()
    onSave({
      ...contact,
      ...form,
      name: form.name.trim(),
      number: form.number.trim(),
    })
  }

  return (
    <Modal isOpen={Boolean(contact)} onClose={onClose} title="Edit contact">
      <form className="modal-form" onSubmit={handleSubmit}>
        <label>
          <span>Name</span>
          <input onChange={(event) => setForm({ ...form, name: event.target.value })} value={form.name} />
        </label>
        <label>
          <span>Number</span>
          <input onChange={(event) => setForm({ ...form, number: event.target.value })} value={form.number} />
        </label>
        <label>
          <span>Group</span>
          <select onChange={(event) => setForm({ ...form, category: event.target.value })} value={form.category}>
            {categories.map((category) => (
              <option key={category}>{category}</option>
            ))}
          </select>
        </label>
        <Button icon="+" type="submit">Save changes</Button>
      </form>
    </Modal>
  )
}

export default EditContactModal
