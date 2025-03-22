import { Filter, Search } from 'lucide-react';

const SearchAndFilter = ({ searchTerm, setSearchTerm, setFilterMenuOpen, filterMenuOpen, activeFilters }) => {
  return(
    <div className="flex space-x-2 w-full md:w-auto">
      <div className="relative flex-grow">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Search size={18} className="text-gray-400" />
        </div>
        <input
          type="text"
          className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
          placeholder="Search..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <button 
        className="flex items-center space-x-1 bg-gray-100 px-3 py-2 rounded-md hover:bg-gray-200"
        onClick={() => setFilterMenuOpen(!filterMenuOpen)}
      >
        <Filter size={18} />
        <span className="hidden md:inline">Filter</span>
        {activeFilters.length > 0 && (
          <span className="bg-[#1A384F] text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
            {activeFilters.length}
          </span>
        )}
      </button>
    </div>
  );
}

export default SearchAndFilter;