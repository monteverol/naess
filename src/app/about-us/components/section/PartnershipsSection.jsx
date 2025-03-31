const PartnerhipsSection = ({ partners }) => {
  return(
    <section id="partnerships" className="py-12 px-4 bg-white lg:px-20 xl:px-40">
      <div className="container mx-auto">
        <h2 className="text-2xl font-bold mb-6 text-[#1A384F]">Our Partners</h2>
        
        <div className="grid grid-cols-2 gap-4">
          {partners.map((partner) => (
            <div key={partner.id} className="bg-white rounded-lg shadow-md p-4 flex flex-col items-center">
              <img 
                src={partner.logo} 
                alt={`${partner.name} logo`} 
                className="h-16 object-contain mb-3" 
              />
              <p className="text-center font-medium">{partner.name}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default PartnerhipsSection;