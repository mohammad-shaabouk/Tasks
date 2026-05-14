import { useEffect, useMemo, useState } from 'react'
import ActionButtons from './components/ActionButtons'
import EditStudentForm from './components/EditStudentForm'
import StudentCard from './components/StudentCard'
import ThemeToggle from './components/ThemeToggle'
import { AppContext } from './context/AppContext'

const STORAGE_KEY = 'student-card-app-students-v2'
const THEME_KEY = 'student-card-app-theme'

function createAvatar(name, background, accent) {
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" width="400" height="500" viewBox="0 0 400 500">
      <rect width="400" height="500" fill="${background}"/>
      <circle cx="310" cy="80" r="110" fill="${accent}" opacity="0.35"/>
      <circle cx="92" cy="390" r="150" fill="#ffffff" opacity="0.16"/>
      <circle cx="200" cy="190" r="76" fill="#ffffff" opacity="0.9"/>
      <path d="M80 430c18-82 68-126 120-126s102 44 120 126" fill="#ffffff" opacity="0.9"/>
    </svg>
  `

  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`
}

const starterStudents = [
  {
    id: '2305015',
    name: 'Mohammad Shaabouk',
    major: 'IT Engineer',
    university: 'Al-Shamal Private University',
    year: 'Third Year',
    email: 'mo.shaabouk@gmail.com',
    image: createAvatar('Mohammad Shaabouk', '#7b1732', '#f3bfcb'),
  },
]

function getInitialStudents() {
  const savedStudents = localStorage.getItem(STORAGE_KEY)

  if (!savedStudents) {
    return starterStudents
  }

  try {
    const parsedStudents = JSON.parse(savedStudents)
    return Array.isArray(parsedStudents) ? parsedStudents : starterStudents
  } catch {
    return starterStudents
  }
}

function getInitialTheme() {
  return localStorage.getItem(THEME_KEY) || 'light'
}

function App() {
  const [students, setStudents] = useState(getInitialStudents)
  const [selectedId, setSelectedId] = useState(students[0]?.id || '')
  const [showDetails, setShowDetails] = useState(true)
  const [isEditing, setIsEditing] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [theme, setTheme] = useState(getInitialTheme)

  const selectedStudent =
    students.find((student) => student.id === selectedId) || students[0]

  const filteredStudents = useMemo(() => {
    const query = searchTerm.trim().toLowerCase()

    if (!query) {
      return students
    }

    return students.filter((student) =>
      [student.name, student.id, student.major, student.university].some(
        (value) => value.toLowerCase().includes(query),
      ),
    )
  }, [searchTerm, students])

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(students))
  }, [students])

  useEffect(() => {
    localStorage.setItem(THEME_KEY, theme)
    document.documentElement.dataset.theme = theme
  }, [theme])

  const appContextValue = useMemo(
    () => ({
      showDetails,
      theme,
      toggleDetails: () => setShowDetails((currentValue) => !currentValue),
      toggleTheme: () =>
        setTheme((currentTheme) => (currentTheme === 'light' ? 'dark' : 'light')),
    }),
    [showDetails, theme],
  )

  function handleSaveStudent(studentData, originalId) {
    const idUsedByAnotherStudent = students.some(
      (student) => student.id === studentData.id && student.id !== originalId,
    )

    if (idUsedByAnotherStudent) {
      window.alert('This student ID is already used by another card.')
      return
    }

    setStudents((currentStudents) => {
      const studentExists = currentStudents.some((student) => student.id === originalId)

      if (studentExists) {
        return currentStudents.map((student) =>
          student.id === originalId ? studentData : student,
        )
      }

      return [studentData, ...currentStudents]
    })

    setSelectedId(studentData.id)
    setIsEditing(false)
  }

  function handleDeleteStudent(studentId) {
    const remainingStudents = students.filter((student) => student.id !== studentId)

    setStudents(remainingStudents)
    setSelectedId(remainingStudents[0]?.id || '')
    setIsEditing(false)
  }

  function handleCreateStudent() {
    const nextNumber = String(Date.now()).slice(-4)
    const newStudent = {
      id: `STU-2026-${nextNumber}`,
      name: 'New Student',
      major: 'Computer Science',
      university: 'University Name',
      year: 'First Year',
      email: 'student@university.edu',
      image: createAvatar('New Student', '#7b1732', '#f3bfcb'),
    }

    setStudents((currentStudents) => [newStudent, ...currentStudents])
    setSelectedId(newStudent.id)
    setIsEditing(true)
  }

  return (
    <AppContext.Provider value={appContextValue}>
      <main className="app-shell">
        <section className="hero-panel" aria-labelledby="page-title">
          <div>
            <p className="eyebrow">Student Card App</p>
            <h1 id="page-title">Digital student ID workspace</h1>
            <p className="hero-copy">
              Manage polished student cards with instant editing, QR codes,
              local saving, search, and a refined burgundy glass interface.
            </p>
          </div>

          <ThemeToggle />
        </section>

        <section className="workspace-grid" aria-label="Student card workspace">
          <aside className="student-sidebar">
            <div className="panel-heading">
              <div>
                <p className="eyebrow">Directory</p>
                <h2>Students</h2>
              </div>
              <button className="icon-button" type="button" onClick={handleCreateStudent}>
                +
              </button>
            </div>

            <label className="search-field">
              <span>Search</span>
              <input
                type="search"
                value={searchTerm}
                onChange={(event) => setSearchTerm(event.target.value)}
                placeholder="Name, ID, major..."
              />
            </label>

            <div className="student-list">
              {filteredStudents.map((student) => (
                <button
                  className={`student-list-item ${student.id === selectedStudent?.id ? 'active' : ''
                    }`}
                  key={student.id}
                  type="button"
                  onClick={() => {
                    setSelectedId(student.id)
                    setIsEditing(false)
                  }}
                >
                  <img src={student.image} alt="" />
                  <span>
                    <strong>{student.name}</strong>
                    <small>{student.major}</small>
                  </span>
                </button>
              ))}

              {filteredStudents.length === 0 && (
                <p className="empty-state">No students match this search.</p>
              )}
            </div>
          </aside>

          <section className="card-stage">
            {selectedStudent ? (
              <>
                <StudentCard student={selectedStudent} />

                <ActionButtons
                  isEditing={isEditing}
                  onEdit={() => setIsEditing((currentValue) => !currentValue)}
                  onDelete={() => handleDeleteStudent(selectedStudent.id)}
                />

                {isEditing && (
                  <EditStudentForm
                    key={selectedStudent.id}
                    student={selectedStudent}
                    onCancel={() => setIsEditing(false)}
                    onSave={handleSaveStudent}
                  />
                )}
              </>
            ) : (
              <div className="empty-card">
                <h2>No student cards yet</h2>
                <p>Create a student to begin building the directory.</p>
                <button className="primary-button" type="button" onClick={handleCreateStudent}>
                  Create student
                </button>
              </div>
            )}
          </section>
        </section>

        <section className="guide-panel" aria-label="Project file guide">
          <h2>Project structure</h2>
          <div className="guide-grid">
            <p>
              <strong>src/App.jsx</strong>
              Main parent component, Context provider, student state, search,
              localStorage, selection, edit mode, and theme state.
            </p>
            <p>
              <strong>src/components/StudentCard.jsx</strong>
              Main card container that composes avatar, info, and ID sections.
            </p>
            <p>
              <strong>src/components/StudentAvatar.jsx</strong>
              Displays the student profile image and visual status badge.
            </p>
            <p>
              <strong>src/components/StudentInfo.jsx</strong>
              Renders name, major, university, year, and email details.
            </p>
            <p>
              <strong>src/components/StudentID.jsx</strong>
              Shows the ID number and generates a QR-style code from the ID.
            </p>
            <p>
              <strong>src/components/ActionButtons.jsx</strong>
              Provides show/hide, edit, and delete interactions.
            </p>
            <p>
              <strong>src/components/ThemeToggle.jsx</strong>
              Switches the app between light and dark burgundy themes.
            </p>
            <p>
              <strong>src/components/EditStudentForm.jsx</strong>
              Lets users update or create student data through controlled inputs.
            </p>
            <p>
              <strong>src/styles/global.css</strong>
              Contains the responsive layout, glassmorphism, shadows,
              transitions, and theme variables.
            </p>
          </div>
        </section>
      </main>
    </AppContext.Provider>
  )
}

export default App
