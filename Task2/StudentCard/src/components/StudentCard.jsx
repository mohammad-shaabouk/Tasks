import { useContext } from 'react'
import { AppContext } from '../context/AppContext'
import StudentAvatar from './StudentAvatar'
import StudentID from './StudentID'
import StudentInfo from './StudentInfo'

function StudentCard({ student }) {
  const { showDetails } = useContext(AppContext)

  return (
    <article className="student-card">
      <div className="card-glow" aria-hidden="true" />

      <div className="card-topline">
        <span>University ID</span>
        <span>2026</span>
      </div>

      <div className="card-main">
        <StudentAvatar image={student.image} name={student.name} />
        <StudentInfo student={student} showDetails={showDetails} />
      </div>

      <StudentID studentId={student.id} />
    </article>
  )
}

export default StudentCard
