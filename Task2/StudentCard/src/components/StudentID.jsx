function buildQrCells(value) {
  const size = 9
  const seed = value.split('').reduce((total, character) => {
    return total + character.charCodeAt(0)
  }, 0)

  // This creates a deterministic QR-style pattern from the student ID.
  return Array.from({ length: size * size }, (_, index) => {
    const row = Math.floor(index / size)
    const column = index % size
    const inCorner =
      (row < 3 && column < 3) ||
      (row < 3 && column > size - 4) ||
      (row > size - 4 && column < 3)

    if (inCorner) {
      return true
    }

    return (seed + row * 7 + column * 11 + row * column) % 4 !== 0
  })
}

function StudentID({ studentId }) {
  const cells = buildQrCells(studentId)

  return (
    <div className="student-id-block">
      <div>
        <span>Student ID</span>
        <strong>{studentId}</strong>
      </div>

      <div className="qr-code" role="img" aria-label={`QR code for ${studentId}`}>
        {cells.map((filled, index) => (
          <span className={filled ? 'filled' : ''} key={`${studentId}-${index}`} />
        ))}
      </div>
    </div>
  )
}

export default StudentID
