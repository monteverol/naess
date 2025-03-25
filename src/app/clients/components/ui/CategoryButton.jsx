const CategoryButton = ({ industry, activeCategory, setActiveCategory }) => {
  return(
    <button
      onClick={() => setActiveCategory(industry)}
      className={`px-4 py-2 text-sm font-medium rounded-full transition-colors ${
        activeCategory === industry 
          ? 'bg-blue-600 text-white' 
          : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-100'
      }`}
      aria-pressed={activeCategory === industry}
    >
      {industry}
    </button>
  );
}

export default CategoryButton;