const FilterMenu = ({ activeFilters, clearFilters, allTags, toggleFilter }) => {
  return(
    <div className="bg-white p-4 rounded-md shadow-lg mb-4 border border-gray-200">
      <div className="flex justify-between items-center mb-2">
        <h3 className="font-semibold">Filter by Tags</h3>
        {activeFilters.length > 0 && (
          <button 
            className="text-sm text-[#1A384F] hover:text-indigo-800"
            onClick={clearFilters}
          >
            Clear all
          </button>
        )}
      </div>
      <div className="flex flex-wrap gap-2">
        {allTags.map(tag => (
          <button
            key={tag}
            className={`px-3 py-1 rounded-full text-sm ${
              activeFilters.includes(tag)
                ? 'bg-[#1A384F] text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
            onClick={() => toggleFilter(tag)}
          >
            {tag}
          </button>
        ))}
      </div>
    </div>
  );
}

export default FilterMenu;