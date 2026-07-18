const FilterBar = ({ filters, activeFilter, onFilterChange, className = '' }) => {
  return (
    <div className={`flex flex-wrap items-center gap-2 ${className}`}>
      {filters.map(filter => (
        <button
          key={filter}
          onClick={() => onFilterChange(filter)}
          className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 border ${
            activeFilter === filter
              ? 'bg-primary text-white border-primary shadow-glow-primary'
              : 'bg-dark-card text-dark-muted border-dark-border hover:text-primary hover:border-primary'
          }`}
          aria-pressed={activeFilter === filter}
        >
          {filter}
        </button>
      ))}
    </div>
  );
};

export default FilterBar;
