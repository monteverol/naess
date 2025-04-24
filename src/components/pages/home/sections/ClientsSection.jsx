import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';

const ClientsSection = ({ clients }) => {
  const [selectedClient, setSelectedClient] = useState(null);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  const handleClientSelection = (client) => {
    setSelectedClient(selectedClient?.id === client.id ? null : client);
  };

  // Truncate description for preview
  const truncateDescription = (text, maxLength = 150) => {
    if (text.length <= maxLength) return text;
    return text.substr(0, maxLength).trim() + '...';
  };

  return (
    <section 
      ref={sectionRef}
      id="clients" 
      className="bg-gradient-to-b from-white to-blue-50 py-8"
      aria-labelledby="clients-heading"
    >
      <div className="section mx-auto px-4">
        {/* SEO-friendly heading structure */}
        <header className={`text-center mb-12 transition-all duration-700 ${isVisible ? 'opacity-100 transform-none' : 'opacity-0 translate-y-8'}`}>
          <h2 id="clients-heading" className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Our Trusted Clients</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            We're proud to partner with leading organizations across the maritime industry, providing exceptional services and solutions.
          </p>
        </header>

        <div className="section-inner-width relative">
          {/* Initial row layout when no client is selected */}
          {!selectedClient && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {clients.map((client, index) => (
                <button
                  key={client.id}
                  onClick={() => handleClientSelection(client)}
                  className={`bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden border-2 border-transparent hover:border-blue-500 focus:outline-none focus:border-blue-500 h-full btn transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
                  style={{ transitionDelay: `${index * 100}ms` }}
                  aria-label={`View ${client.name} details`}
                >
                  <div className="p-6 flex flex-col h-full">
                    <div className="flex justify-center items-center h-24 mb-4">
                      <Image 
                        src={client.logo} 
                        alt={`${client.name} logo`}
                        width={160}
                        height={80}
                        className="object-contain max-h-20"
                        loading="lazy"
                      />
                    </div>
                    <h3 className="font-semibold text-lg text-center text-gray-800 mb-2">{client.name}</h3>
                    <p className="text-sm text-gray-600 text-center">{client.industry}</p>
                  </div>
                </button>
              ))}
            </div>
          )}

          {/* Column layout with selected client details */}
          {selectedClient && (
            <div className="flex flex-col lg:flex-row gap-8 animate-fadeIn">
              {/* Left column with client list */}
              <div className="w-full lg:w-1/3 space-y-3">
                {clients.map((client) => (
                  <button
                    key={client.id}
                    onClick={() => handleClientSelection(client)}
                    className={`w-full text-left p-4 rounded-lg btn transition-all duration-300 flex items-center ${selectedClient.id === client.id ? 'bg-slate-100 border-l-4 border-slate-500 rounded-l-none' : 'bg-white hover:bg-gray-50 border-l-4 border-transparent'}`}
                    aria-pressed={selectedClient.id === client.id}
                    aria-label={`Select ${client.name}`}
                  >
                    <div className="w-12 h-12 mr-4 flex-shrink-0 relative">
                      <Image 
                        src={client.logo} 
                        alt="" 
                        layout="fill" 
                        objectFit="contain"
                        aria-hidden="true"
                      />
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-800">{client.name}</h3>
                      <p className="text-sm text-gray-600">{client.industry}</p>
                    </div>
                  </button>
                ))}
                <button 
                  onClick={() => setSelectedClient(null)}
                  className="w-full p-3 mt-4 text-center bg-slate-200 hover:bg-slate-300 rounded-lg text-gray-700 transition-colors btn"
                  aria-label="Show all clients"
                >
                  View All Clients
                </button>
              </div>

              {/* Right column with client details */}
              <div className="w-full lg:w-2/3">
                <article className="bg-white rounded-xl shadow-lg p-6 md:p-8">
                  <header className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 pb-6 border-b border-gray-100">
                    <div className="flex-1">
                      <h3 className="text-2xl font-bold text-gray-800 mb-2">{selectedClient.name}</h3>
                      <p className="text-blue-600 font-medium">{selectedClient.industry}</p>
                    </div>
                    <div className="mt-4 sm:mt-0 h-16 w-32 relative">
                      <Image 
                        src={selectedClient.logo} 
                        alt={`${selectedClient.name} logo`} 
                        layout="fill"
                        objectFit="contain"
                        objectPosition="right"
                      />
                    </div>
                  </header>
                  
                  <div className="prose max-w-none">
                    <p className="text-gray-700 mb-6 leading-relaxed">{truncateDescription(selectedClient.description)}</p>
                  </div>

                  {/* Display vessel images if available */}
                  {selectedClient.vessels && selectedClient.vessels.length > 0 && (
                    <div className="mt-8">
                      <h4 className="font-semibold text-lg mb-4 text-gray-800">Fleet</h4>
                      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                        {selectedClient.vessels.slice(0, 4).map((vessel, index) => (
                          <div key={index} className="bg-gray-50 rounded-lg p-2 aspect-w-16 aspect-h-9 relative h-32">
                            <Image 
                              src={vessel} 
                              alt={`${selectedClient.name} vessel`}
                              layout="fill"
                              objectFit="contain"
                              className="rounded"
                              loading="lazy"
                            />
                          </div>
                        ))}
                      </div>
                      {selectedClient.vessels.length > 4 && (
                        <p className="text-sm text-center mt-4 text-blue-600">
                          + {selectedClient.vessels.length - 4} more vessels
                        </p>
                      )}
                    </div>
                  )}
                  
                  <div className="mt-8">
                    <Link 
                      href={`/clients/${selectedClient.slug}`}
                      className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium"
                    >
                      Learn more about {selectedClient.name}
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                      </svg>
                    </Link>
                  </div>
                </article>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default ClientsSection;