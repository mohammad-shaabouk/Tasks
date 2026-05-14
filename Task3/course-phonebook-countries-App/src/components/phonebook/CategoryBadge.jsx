const CategoryBadge = ({ category = 'Friends' }) => (
  <span className={`category-badge category-badge--${category.toLowerCase()}`}>
    {category}
  </span>
)

export default CategoryBadge
