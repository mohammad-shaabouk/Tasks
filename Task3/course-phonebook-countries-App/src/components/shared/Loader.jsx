const Loader = ({ label = 'Loading' }) => (
  <div className="loader" role="status">
    <span className="loader__dot" />
    <span className="loader__dot" />
    <span className="loader__dot" />
    <span className="sr-only">{label}</span>
  </div>
)

export default Loader
