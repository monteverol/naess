import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const CompanyProfileSection = () => {
  const sectionRef = useRef(null);
  const isHeroVisible = useInView(sectionRef, { amount: 0.35 });
  const isFeatureVisible = useInView(sectionRef, { amount: 0.445 });

  return (
    <section 
      id="company" 
      className="py-16 px-4 bg-gradient-to-b from-gray-50 to-white lg:px-20 xl:px-40"
      ref={sectionRef}
    >
      <div className="container mx-auto max-w-6xl">
        <div className="flex flex-col md:flex-row items-center justify-between mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-[#1A384F] relative">
            Company Profile
            <span className="absolute -bottom-3 left-0 w-20 h-1 bg-blue-500"></span>
          </h2>
          <p className="text-gray-500 mt-4 md:mt-0 md:w-1/2 text-right italic">
            Excellence in maritime services since 1980
          </p>
        </div>
        
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          {/* Hero Image Section */}
          <motion.div 
            initial={{ height: 400 }}
            animate={isHeroVisible ? { height: 700 } : { height: 400 }}
            transition={{ duration: 0.7 }}
            className="hero-image relative overflow-hidden group"
          >
            <img 
              src="/images/about-us/BOD.jpg" 
              alt="NAESS Shipping Board of Directors" 
              className="w-full h-full object-cover object-[50%_25%] transform hover:scale-105 transition-all duration-700" 
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
              <div className="p-8 text-white">
                <h3 className={`font-bold mb-2 transition-all duration-700 ${isHeroVisible ? 'text-6xl w-2/3' : 'text-2xl'}`}>Four Decades of Maritime Excellence</h3>
                <p className={`text-gray-200 transition-all duration-700 ${isHeroVisible ? 'text-xl' : 'text-sm'}`}>Providing world-class shipping services since 1980</p>
              </div>
            </div>
          </motion.div>
          
          {/* Content Section */}
          <div className="p-8 md:p-12">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
              <div>
                <h4 className="text-xl font-semibold text-[#1A384F] mb-4 flex items-center">
                  <span className="w-2 h-6 bg-blue-500 mr-3 rounded-sm"></span>
                  Our Beginning
                </h4>
                <p className="text-gray-700 leading-relaxed">
                  NAESS SHIPPING PHILIPPINES, INC. was born on October 24, 1980 with the signing of the documents by Capt. Pablo Gutierrez and Mr. Arturo Piree at the Army Navy Club in Manila. Our first office had a staff of merely five employees at the mezzanine of the Pennville Building on Leon Guinto Street, Malate, Upon approval and registration with the Securities and Exchange Commission, in December of the same year, initial manning operations began with a modest number of 25 vessels. Within three years, we were able to acquire and transfer to our own office at 2215 Leon Guinto St., Malate.
                </p>
              </div>
              <div>
                <h4 className="text-xl font-semibold text-[#1A384F] mb-4 flex items-center">
                  <span className="w-2 h-6 bg-blue-500 mr-3 rounded-sm"></span>
                  Growth & Development
                </h4>
                <p className="text-gray-700 leading-relaxed">
                  Barely a decade of operations found NAESS SHIPPING PHILIPPINES, INC. in the service of eight principals, reaching the 100-mark of enrolled vessels with the Philippine Overseas Employment Administration (POEA)—a positive confirmation and sure sign of the Shipping Industry's acceptance and approval of our manning services. With business at its peak, on the first week of October 1991, the property we had acquired and held office in since 1983 was reconstructed into the 4-storey building that presently stands on Leon Guinto today.
                </p>
              </div>
            </div>
            
            {/* Featured Image */}
            <motion.div 
              initial={{ height: 320 }}
              animate={isFeatureVisible ? { height: 400 } : { height: 320 }}
              transition={{ duration: 0.7 }}
              className="my-8 rounded-lg overflow-hidden shadow-md feature-image"
            >
              <img 
                src="/images/about-us/aaaisabellemigs.jpeg" 
                alt="NAESS Shipping Operations" 
                className="w-full h-full object-cover object-[50%_20%] transition-all duration-700" 
                loading="lazy"
              />
            </motion.div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h4 className="text-xl font-semibold text-[#1A384F] mb-4 flex items-center">
                  <span className="w-2 h-6 bg-blue-500 mr-3 rounded-sm"></span>
                  Overcoming Challenges
                </h4>
                <p className="text-gray-700 leading-relaxed">
                  Like everyone in the industry, we had our share of uphill struggles when we awoke one morning and found the Philippine economy in utter chaos. Affected by the currency crisis and other factors, adjustments had to be made. Thanks to the confidence of the international shipping industry in our integrity and quality service, recovery was just a matter of time. Despite temporary setbacks, NSP continued to enjoy its world-class distinction as one of the best manning agencies in the country.
                </p>
              </div>
              <div>
                <h4 className="text-xl font-semibold text-[#1A384F] mb-4 flex items-center">
                  <span className="w-2 h-6 bg-blue-500 mr-3 rounded-sm"></span>
                  Innovation & Certification
                </h4>
                <p className="text-gray-700 leading-relaxed">
                  In keeping with the rapid changes in technology, we implemented our computerization program as far back as 1984. Now, we have integrated our database with our web site to enable our principals to view on-line and download anytime all important documents and certificates relevant to our seafarers on board their vessels. We also boast of being certified by Det Norske Veritas in the ISO 9001-2000 Series Quality Standard with the Quality System Certificate and the Crew Manning Certificate.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default CompanyProfileSection;
