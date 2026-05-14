function InfoIcon({ type }) {
  const icons = {
    user: (
      <path d="M12 12a4 4 0 1 0-4-4 4 4 0 0 0 4 4Zm0 2c-4.42 0-8 2.02-8 4.5A1.5 1.5 0 0 0 5.5 20h13a1.5 1.5 0 0 0 1.5-1.5C20 16.02 16.42 14 12 14Z" />
    ),
    book: (
      <path d="M5 4.5A2.5 2.5 0 0 1 7.5 2H20v17H7.5A2.5 2.5 0 0 0 5 21.5Zm0 0v17M8 6h8M8 10h7" />
    ),
    school: (
      <path d="m12 3 9 4.5-9 4.5-9-4.5Zm-6 7v4c0 1.7 2.7 4 6 4s6-2.3 6-4v-4M21 8v7" />
    ),
    mail: (
      <path d="M4 6h16v12H4Zm0 0 8 7 8-7" />
    ),
  }

  return (
    <svg className="info-icon" viewBox="0 0 24 24" aria-hidden="true">
      {icons[type]}
    </svg>
  )
}

function StudentInfo({ student, showDetails }) {
  return (
    <div className="student-info">
      <p className="eyebrow">Verified Student</p>
      <h2>{student.name}</h2>
      <p className="major-line">{student.major}</p>

      <div className={`detail-grid ${showDetails ? 'visible' : 'hidden'}`}>
        <p>
          <InfoIcon type="school" />
          <span>{student.university}</span>
        </p>
        <p>
          <InfoIcon type="book" />
          <span>{student.year}</span>
        </p>
        <p>
          <InfoIcon type="mail" />
          <span>{student.email}</span>
        </p>
        <p>
          <InfoIcon type="user" />
          <span>Full-time enrollment</span>
        </p>
      </div>
    </div>
  )
}

export default StudentInfo
