import { useState } from 'react'
import AddCourseForm from '../components/course/AddCourseForm.jsx'
import CourseGrid from '../components/course/CourseGrid.jsx'
import GlobalStats from '../components/course/GlobalStats.jsx'

const initialCourses = [
  {
    id: 'course-1',
    name: 'Half Stack Application Development',
    parts: [
      { id: 'part-1-1', name: 'Fundamentals of React', exercises: 10 },
      { id: 'part-1-2', name: 'Using props to pass data', exercises: 7 },
      { id: 'part-1-3', name: 'State of a component', exercises: 14 },
      { id: 'part-1-4', name: 'Debugging React applications', exercises: 11 },
    ],
  },
  {
    id: 'course-2',
    name: 'Node.js',
    parts: [
      { id: 'part-2-1', name: 'Routing', exercises: 3 },
      { id: 'part-2-2', name: 'Middlewares', exercises: 7 },
    ],
  },
]

const createId = (prefix) => `${prefix}-${crypto.randomUUID()}`

const CoursePage = () => {
  const [courses, setCourses] = useState(initialCourses)

  const addCourse = (name) => {
    setCourses((currentCourses) => [
      ...currentCourses,
      {
        id: createId('course'),
        name,
        parts: [],
      },
    ])
  }

  const addPart = (courseId, part) => {
    setCourses((currentCourses) =>
      currentCourses.map((course) =>
        course.id === courseId
          ? {
              ...course,
              parts: [...course.parts, { ...part, id: createId('part') }],
            }
          : course,
      ),
    )
  }

  return (
    <section className="page page--course">
      <div className="page-hero">
        <p className="eyebrow">Web Curriculum Manager</p>
        <h1>Plan the syllabus, watch the workload.</h1>
        <p>
          Course parts keep their original exercise totals, now with live
          additions and global statistics.
        </p>
      </div>

      <GlobalStats courses={courses} />
      <AddCourseForm onAddCourse={addCourse} />
      <CourseGrid courses={courses} onAddPart={addPart} />
    </section>
  )
}

export default CoursePage
