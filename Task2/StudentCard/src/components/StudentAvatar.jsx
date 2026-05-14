function StudentAvatar({ image, name }) {
  const initials = name
    .split(' ')
    .map((part) => part[0])
    .join('')
    .slice(0, 2)
    .toUpperCase()

  return (
    <div className="avatar-wrap">
      <img className="student-avatar" src={image} alt={`${name} profile`} />
      <span className="avatar-fallback" aria-hidden="true">
        {initials}
      </span>
      <span className="avatar-initials" aria-hidden="true">
        {initials}
      </span>
      <span className="status-pill">Active</span>
    </div>
  )
}

export default StudentAvatar
