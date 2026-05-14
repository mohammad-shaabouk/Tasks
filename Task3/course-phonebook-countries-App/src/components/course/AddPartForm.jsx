import { useState } from 'react'
import Button from '../shared/Button.jsx'

const AddPartForm = ({ courseId, onAddPart }) => {
  const [name, setName] = useState('')
  const [exercises, setExercises] = useState('')

  const handleSubmit = (event) => {
    event.preventDefault()
    const exerciseCount = Number(exercises)

    if (!name.trim() || !Number.isFinite(exerciseCount) || exerciseCount < 0) return

    onAddPart(courseId, {
      exercises: exerciseCount,
      name: name.trim(),
    })
    setName('')
    setExercises('')
  }

  return (
    <form className="part-form" onSubmit={handleSubmit}>
      <input
        aria-label="Part name"
        onChange={(event) => setName(event.target.value)}
        placeholder="State management"
        value={name}
      />
      <input
        aria-label="Exercise count"
        min="0"
        onChange={(event) => setExercises(event.target.value)}
        placeholder="8"
        type="number"
        value={exercises}
      />
      <Button icon="+" type="submit" variant="ghost">Part</Button>
    </form>
  )
}

export default AddPartForm
