const FILTERS = [
  { label: 'Todos',     value: ''       },
  { label: 'Películas', value: 'movie'  },
  { label: 'Series',    value: 'series' },
]
 
function FilterBar({ activeFilter, onFilterChange }) {
  return (
    <div className="filter-bar">
      {FILTERS.map((filter) => (
        <button
          key={filter.value}
          className={`filter-bar__btn ${activeFilter === filter.value ? 'filter-bar__btn--active' : ''}`}
          onClick={() => onFilterChange(filter.value)}
        >
          {filter.label}
        </button>
      ))}
    </div>
  )
}
 
export default FilterBar
 