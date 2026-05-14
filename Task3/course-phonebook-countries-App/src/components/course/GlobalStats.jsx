const GlobalStats = ({ courses }) => {
  const courseCount = courses.length
  const partCount = courses.reduce((sum, course) => sum + course.parts.length, 0)
  const exerciseCount = courses.reduce(
    (sum, course) => sum + course.parts.reduce((partSum, part) => partSum + part.exercises, 0),
    0,
  )

  return (
    <section className="global-stats" aria-label="Course statistics">
      <div>
        <span>Courses</span>
        <strong>{courseCount}</strong>
      </div>
      <div>
        <span>Parts</span>
        <strong>{partCount}</strong>
      </div>
      <div>
        <span>Exercises</span>
        <strong>{exerciseCount}</strong>
      </div>
    </section>
  )
}

export default GlobalStats
