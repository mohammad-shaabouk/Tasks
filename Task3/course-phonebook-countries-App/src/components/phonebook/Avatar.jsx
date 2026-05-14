const getInitials = (name) =>
  name
    .split(' ')
    .filter(Boolean)
    .map((part) => part[0])
    .join('')
    .slice(0, 2)
    .toUpperCase()

const Avatar = ({ name }) => (
  <span className="contact-avatar" aria-hidden="true">
    {getInitials(name) || '?'}
  </span>
)

export default Avatar
