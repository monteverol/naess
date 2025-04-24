import CategoryButton from "../ui/CategoryButton";

const FilterClients = ({ industries, activeCategory, setActiveCategory }) => {
  return(
    <div className="section w-full bg-gray-50 grid items-center justify-center">
      <section className="section-inner-width">
        <div className="container mx-auto px-4 lg:px-0">
          <h2 className="sr-only">Filter Clients by Industry</h2>
          <div className="overflow-x-auto pb-2">
            <div className="flex space-x-2 min-w-max">
              {industries.map(industry => (
                <CategoryButton
                  key={industry}
                  industry={industry}
                  activeCategory={activeCategory}
                  setActiveCategory={setActiveCategory}
                />
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default FilterClients;