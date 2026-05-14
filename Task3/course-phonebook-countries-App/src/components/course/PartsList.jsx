import PartItem from './PartItem.jsx'

const PartsList = ({ parts }) => (
  <ul className="parts-list">
    {parts.map((part) => (
      <PartItem key={part.id} part={part} />
    ))}
  </ul>
)

export default PartsList
