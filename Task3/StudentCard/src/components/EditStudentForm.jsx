import { useState } from 'react'

function EditStudentForm({ student, onCancel, onSave }) {
  const [formData, setFormData] = useState(student)

  function updateField(field, value) {
    setFormData((currentData) => ({
      ...currentData,
      [field]: value,
    }))
  }

  function handleSubmit(event) {
    event.preventDefault()
    onSave(formData, student.id)
  }

  function handleImageUpload(event) {
    const file = event.target.files?.[0]

    if (!file) {
      return
    }

    const reader = new FileReader()
    reader.onload = () => {
      updateField('image', reader.result)
    }
    reader.readAsDataURL(file)
  }

  return (
    <form className="edit-form" onSubmit={handleSubmit}>
      <div className="form-heading">
        <div>
          <p className="eyebrow">Editor</p>
          <h2>Student data</h2>
        </div>
        <button type="button" className="text-button" onClick={onCancel}>
          Cancel
        </button>
      </div>

      <div className="form-grid">
        <label>
          Full name
          <input
            required
            type="text"
            value={formData.name}
            onChange={(event) => updateField('name', event.target.value)}
          />
        </label>
        <label>
          Student ID
          <input
            required
            type="text"
            value={formData.id}
            onChange={(event) => updateField('id', event.target.value)}
          />
        </label>
        <label>
          Major
          <input
            required
            type="text"
            value={formData.major}
            onChange={(event) => updateField('major', event.target.value)}
          />
        </label>
        <label>
          University
          <input
            required
            type="text"
            value={formData.university}
            onChange={(event) => updateField('university', event.target.value)}
          />
        </label>
        <label>
          Year
          <input
            required
            type="text"
            value={formData.year}
            onChange={(event) => updateField('year', event.target.value)}
          />
        </label>
        <label>
          Email
          <input
            type="email"
            value={formData.email}
            onChange={(event) => updateField('email', event.target.value)}
          />
        </label>
        <label className="full-row">
          Profile image URL
          <input
            type="url"
            value={formData.image}
            onChange={(event) => updateField('image', event.target.value)}
          />
        </label>
        <label className="full-row">
          Upload image from computer
          <input type="file" accept="image/*" onChange={handleImageUpload} />
        </label>
      </div>

      <button className="primary-button" type="submit">
        Save student
      </button>
    </form>
  )
}

export default EditStudentForm
