import CourseCard from './CourseCard.jsx'

const themeClasses = ['theme-blue', 'theme-indigo', 'theme-cyan', 'theme-violet']

const CourseGrid = ({ courses, onAddPart }) => (
  <div className="course-grid">
    {courses.map((course, index) => (
      <CourseCard
        course={course}
        key={course.id}
        onAddPart={onAddPart}
        themeClass={themeClasses[index % themeClasses.length]}
      />
    ))}
  </div>
)

export default CourseGrid
