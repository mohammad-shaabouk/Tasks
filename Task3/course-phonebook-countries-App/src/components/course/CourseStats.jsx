const CourseStats = ({ parts }) => {
  const total = parts.reduce((sum, part) => sum + part.exercises, 0)

  return (
    <div className="course-stats">
      <span>Total exercises</span>
      <strong>{total}</strong>
    </div>
  )
}

export default CourseStats
