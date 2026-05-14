const CourseHeader = ({ course }) => (
  <header className="course-card__header">
    <span className="course-card__stripe" />
    <div>
      <p className="eyebrow">Course</p>
      <h2>{course.name}</h2>
    </div>
  </header>
)

export default CourseHeader
