import Tabs from "../ui/Tabs";
import SearchAndFilter from "../ui/SearchAndFilter";
import FilterMenu from "../ui/FilterMenu";

const TabAndSearch = ({ 
  filterMenuOpen, 
  activeFilters, 
  filteredArticles, 
  activeTab, 
  setActiveTab, 
  searchTerm, 
  setSearchTerm, 
  setFilterMenuOpen,
  clearFilters,
  allTags,
  toggleFilter,
  visibleItems
}) => {
  return(
    <div className="mb-8">
      <div className="flex flex-wrap justify-between items-center mb-4">
        {/* Tabs */}
        <Tabs
          activeTab={activeTab}
          setActiveTab={setActiveTab}
        />

        {/* Search and Filter */}
        <SearchAndFilter 
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          setFilterMenuOpen={setFilterMenuOpen}
          filterMenuOpen={filterMenuOpen}
          activeFilters={activeFilters}
        />
      </div>

      {/* Filter Menu */}
      {filterMenuOpen && (
        <FilterMenu
          activeFilters={activeFilters}
          clearFilters={clearFilters}
          allTags={allTags}
          toggleFilter={toggleFilter}
        />
      )}

      {/* Results info */}
      <div className="text-sm text-gray-500">
        Showing {Math.min(visibleItems, filteredArticles.length)} of {filteredArticles.length} results
        {activeFilters.length > 0 && (
          <span> with {activeFilters.length} filter{activeFilters.length > 1 ? 's' : ''}</span>
        )}
      </div>
    </div>
  );
}

export default TabAndSearch