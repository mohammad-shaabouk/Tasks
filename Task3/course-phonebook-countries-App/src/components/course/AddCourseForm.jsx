import { useState } from 'react'
import Button from '../shared/Button.jsx'

const AddCourseForm = ({ onAddCourse }) => {
  const [name, setName] = useState('')

  const handleSubmit = (event) => {
    event.preventDefault()
    const trimmedName = name.trim()
    if (!trimmedName) return

    onAddCourse(trimmedName)
    setName('')
  }

  return (
    <form className="course-form" onSubmit={handleSubmit}>
      <label>
        <span>Course name</span>
        <input
          onChange={(event) => setName(event.target.value)}
          placeholder="Advanced React Patterns"
          value={name}
        />
      </label>
      <Button icon="+" type="submit">Add course</Button>
    </form>
  )
}

export default AddCourseForm
