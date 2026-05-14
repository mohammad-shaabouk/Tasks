const PartItem = ({ part }) => (
  <li className="part-item">
    <span>{part.name}</span>
    <strong>{part.exercises}</strong>
  </li>
)

export default PartItem
