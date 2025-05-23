import Link from "next/link";

const PartnerhipsSection = ({ partners }) => {
  return(
    <div className="bg-white section grid items-center justify-center">
      <section id="partnerships" className="section-inner-width">
        <div className="container mx-auto">
          <h2 className="text-2xl font-bold mb-6 text-[#1A384F]">Our Partners</h2>
          
          <div className="grid grid-cols-2 gap-4">
            {partners.map((partner) => (
              <Link 
                href={`/clients/${partner.id}`} 
                passHref
                key={partner.id}
              >
                <div className="bg-white rounded-lg shadow-md p-4 flex flex-col items-center">
                  <img 
                    src={partner.logo} 
                    alt={`${partner.name} logo`} 
                    className="h-16 object-contain mb-3" 
                  />
                  <p className="text-center font-medium">{partner.name}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

export default PartnerhipsSection;