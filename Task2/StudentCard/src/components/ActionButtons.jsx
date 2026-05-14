import { useContext } from 'react'
import { AppContext } from '../context/AppContext'

function ButtonIcon({ type }) {
  const icons = {
    eye: <path d="M2 12s3.5-6 10-6 10 6 10 6-3.5 6-10 6S2 12 2 12Zm10 3a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" />,
    edit: <path d="M4 20h4l10.5-10.5-4-4L4 16Zm11-15 1.5-1.5a2 2 0 0 1 3 3L18 8" />,
    trash: <path d="M5 7h14M10 11v6M14 11v6M8 7l1-3h6l1 3m-9 0 1 13h8l1-13" />,
  }

  return (
    <svg className="button-icon" viewBox="0 0 24 24" aria-hidden="true">
      {icons[type]}
    </svg>
  )
}

function ActionButtons({ isEditing, onEdit, onDelete }) {
  const { showDetails, toggleDetails } = useContext(AppContext)

  return (
    <div className="action-bar" aria-label="Student card actions">
      <button type="button" onClick={toggleDetails}>
        <ButtonIcon type="eye" />
        {showDetails ? 'Hide details' : 'Show details'}
      </button>
      <button type="button" onClick={onEdit}>
        <ButtonIcon type="edit" />
        {isEditing ? 'Close form' : 'Edit card'}
      </button>
      <button className="danger-button" type="button" onClick={onDelete}>
        <ButtonIcon type="trash" />
        Delete
      </button>
    </div>
  )
}

export default ActionButtons
