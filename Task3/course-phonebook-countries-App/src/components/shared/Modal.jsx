import { useEffect } from 'react'

const Modal = ({ children, isOpen, onClose, title }) => {
  useEffect(() => {
    if (!isOpen) return undefined

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') onClose()
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, onClose])

  if (!isOpen) return null

  return (
    <div className="modal-backdrop" role="presentation" onMouseDown={onClose}>
      <section
        aria-modal="true"
        className="modal"
        onMouseDown={(event) => event.stopPropagation()}
        role="dialog"
      >
        <header className="modal__header">
          <h2>{title}</h2>
          <button aria-label="Close dialog" className="icon-button" onClick={onClose} type="button">
            x
          </button>
        </header>
        {children}
      </section>
    </div>
  )
}

export default Modal
