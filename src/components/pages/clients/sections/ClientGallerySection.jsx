import Link from 'next/link';

const ClientGallerySection = ({ activeCategory, filteredClients }) => {
  return(
    <div className="section w-full grid items-center justify-center bg-gray-50">
      <section className="section-inner-width" aria-labelledby="client-gallery-heading">
        <div className="container mx-auto px-4 lg:px-0">
          <h2 id="client-gallery-heading" className="text-xl font-semibold mb-6 text-gray-800">
            {activeCategory === 'All' ? 'All Clients' : `${activeCategory} Partners`} <span className='italic font-normal'>(click to Learn More)</span>
          </h2>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 lg:gap-8">
            {filteredClients.map(client => (
              <Link 
                href={`/clients/${client.slug}`} 
                passHref
                key={client.id}
              >
                <div 
                  key={client.id} 
                  className="bg-white p-4 relative rounded-xl shadow-sm hover:shadow-md transition-all duration-300 hover:border-slate-500 hover:border-2 flex flex-col items-center justify-center group"
                >
                  <img 
                    src={client.logo} 
                    alt={`${client.name} logo`} 
                    className="mb-3"
                    width="120"
                    height="80"
                  />
                  <h3 className="text-center text-sm font-medium text-gray-700 group-hover:text-lg transition-all duration-300 w-[80%]">{client.name}</h3>
                  <p className="text-xs text-gray-500 group-hover:text-md transition-all duration-300">{client.industry}</p>
                </div>
              </Link>
            ))}
          </div>
          
          {filteredClients.length === 0 && (
            <p className="text-center py-8 text-gray-500">
              No clients found in this category. Please check back later.
            </p>
          )}
        </div>
      </section>
    </div>
  );
}

export default ClientGallerySection;