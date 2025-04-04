const ServicesSection = ({ services, toggleService, activeService }) => {
  return(
    <section id="services-section" className="container mx-auto px-6 py-12">
      <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 text-gray-800">
        Our Comprehensive Crew Solutions
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {services.map((service) => (
          <div 
            key={service.id}
            className={`
              rounded-xl shadow-md overflow-hidden 
              transition-all duration-300 ease-in-out 
              hover:shadow-lg hover:-translate-y-1 hover:bg-blue-50
              ${activeService === service.id ? 'ring-2 ring-[#264D6C] scale-[1.02]' : 'border border-gray-200'}
              ${service.bgColor}
            `}
          >
            <div 
              className="p-6 cursor-pointer h-full" 
              onClick={() => toggleService(service.id)}
            >
              <div className="flex items-start">
                <span className="text-4xl mr-4">{service.icon}</span>
                <div>
                  <h3 className="text-xl font-bold text-gray-800 mb-2">{service.title}</h3>
                  <p className="text-gray-600">{service.description}</p>
                </div>
              </div>
            </div>
            {activeService === service.id && (
              <div className="px-6 pb-6 animate-fade-in">
                <div className="border-t border-gray-200/50 pt-4 mt-2">
                  <ul className="space-y-2 mb-4">
                    {service.details.map((detail, index) => (
                      <li key={index} className="flex items-start">
                        <span className="text-[#264D6C] mr-2">•</span>
                        <span className="text-gray-700">{detail}</span>
                      </li>
                    ))}
                  </ul>
                  <button 
                    className="w-full bg-[#264D6C] text-white px-4 py-2 rounded-lg hover:bg-[#1a3a52] transition-colors duration-300"
                    onClick={(e) => {
                      e.stopPropagation();
                      // navigation modal here
                    }}
                  >
                    Learn More
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}

export default ServicesSection;