import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const CompanyProfileSection = () => {
  const sectionRef = useRef(null);
  const isHeroVisible = useInView(sectionRef, { amount: 0.3 });
  const isFeatureVisible = useInView(sectionRef, { amount: 0.385 });

  return (
    <section 
      id="company" 
      className="section bg-gradient-to-b from-blue-50 to-gray-50 grid items-center justify-center"
      ref={sectionRef}
    >
      <div className="section-inner-width w-full">
        <div className="flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-0 justify-between mb-4 md:mb-12">
          <h2 className="section-heading">Company Profile</h2>
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
              src="/images/about-us/BOD.jpeg" 
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
                  Like everyone in the industry, we had our share of uphill struggles when we awoke one morning and found the Philippine economy in utter chaos. Affected by the currency crisis and other factors, adjustments had to be made. Thanks to the confidence of the international shipping industry in our integrity and quality service, recovery was just a matter of time. Despite temporary setbacks, NSPI continued to enjoy its world-class distinction as one of the best manning agencies in the country.
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
            
            {/* Highlight Box */}
            <div className="mt-8 bg-blue-50 border-l-4 border-blue-500 p-6 rounded-r-lg">
              <h4 className="text-lg font-semibold text-[#1A384F] mb-2">Excellence in Training</h4>
              <p className="text-gray-700">
                NSPI is likewise engaged in Shipping Agent Services and Ship Management. It presently manages the AMOSUP/ITF training vessel, the Kapitan Felix Oca, wherein NSPI seamen and other trainees engage in "hands-on" training programs.
              </p>
            </div>

            {/* Stats and Achievements */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12">
              <div className="text-center p-4">
                <p className="text-3xl font-bold text-blue-600">40+</p>
                <p className="text-gray-600 text-sm">Years of Experience</p>
              </div>
              <div className="text-center p-4">
                <p className="text-3xl font-bold text-blue-600">100+</p>
                <p className="text-gray-600 text-sm">Vessels Managed</p>
              </div>
              <div className="text-center p-4">
                <p className="text-3xl font-bold text-blue-600">ISO</p>
                <p className="text-gray-600 text-sm">9001-2015 Certified</p>
              </div>
              <div className="text-center p-4">
                <p className="text-3xl font-bold text-blue-600">Global</p>
                <p className="text-gray-600 text-sm">Service Network</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default CompanyProfileSection;
