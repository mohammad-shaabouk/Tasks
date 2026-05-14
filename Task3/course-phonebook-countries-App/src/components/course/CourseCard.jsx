import AddPartForm from './AddPartForm.jsx'
import CourseHeader from './CourseHeader.jsx'
import CourseStats from './CourseStats.jsx'
import PartsList from './PartsList.jsx'

const CourseCard = ({ course, onAddPart, themeClass }) => (
  <article className={`course-card ${themeClass}`}>
    <CourseHeader course={course} />
    <PartsList parts={course.parts} />
    <CourseStats parts={course.parts} />
    <AddPartForm courseId={course.id} onAddPart={onAddPart} />
  </article>
)

export default CourseCard
