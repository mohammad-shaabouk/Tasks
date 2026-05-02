function FilterBar({ value, onChange, options }) {
  return (
    <div className="segmented-control" role="tablist" aria-label="Task filters">
      {options.map((option) => (
        <button
          key={option.value}
          className={value === option.value ? 'active' : ''}
          type="button"
          onClick={() => onChange(option.value)}
        >
          {option.label}
        </button>
      ))}
    </div>
  )
}

export default FilterBar
