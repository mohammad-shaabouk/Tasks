const EmptyState = ({ message, title }) => (
  <div className="empty-state">
    <p className="eyebrow">{title}</p>
    <p>{message}</p>
  </div>
)

export default EmptyState
