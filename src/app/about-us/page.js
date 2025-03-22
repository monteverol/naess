"use client";

import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Menu, X, ArrowRight } from 'lucide-react';
import Footer from '@/components/Footer';

const AboutUsPage = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('company');
  const [expandedLeader, setExpandedLeader] = useState(null);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setActiveSection(id);
      setIsMenuOpen(false);
    }
  };

  const leaders = [
    {
      id: 1, 
      name: "Jane Doe", 
      title: "Chief Executive Officer",
      image: "/api/placeholder/150/150",
      bio: "Jane has over 20 years of experience in the industry and has led our company through significant growth since 2015."
    },
    {
      id: 2, 
      name: "John Smith", 
      title: "Chief Technology Officer",
      image: "/api/placeholder/150/150",
      bio: "John brings technical innovation to our company with his background in software architecture and AI development."
    },
    {
      id: 3, 
      name: "Sarah Johnson", 
      title: "Chief Marketing Officer",
      image: "/api/placeholder/150/150",
      bio: "Sarah's strategic vision has transformed our brand presence across global markets."
    }
  ];

  const partners = [
    { id: 1, name: "Kuwait Oil Tanker Company", logo: "/images/clients/kotc-logo.jpg" },
    { id: 2, name: "Reefership Marine Services, Ltd", logo: "/images/clients/rfs-logo.jpg" },
    { id: 3, name: "Sloman Neptun Schiffahrts AG.", logo: "/images/clients/sns-logo.png" },
    { id: 4, name: "AMOSUP", logo: "/images/clients/amosup-logo.png" }
  ];

  const milestones = [
    { year: 1980, title: "Company Founded" },
    { year: 1983, title: "Acquire and transfer to our own office at 2215 Leon Guinto St., Malate." },
    { year: 1991, title: "Reached 100 mark of enrolled vessels, and the property we had acquired and held office in since 1983 was reconstructed into the 4-storey building that presently stands on Leon Guinto today." },
  ];

  const missionValues = [
    { letter: "N", title: "No Delays Policy", description: "Non-conformities and unreasonable delays are avoided at all times." },
    { letter: "A", title: "Advancing Quality", description: "Adopt up-to-date methods and techniques; upgrade the quality of our service." },
    { letter: "E", title: "Excellence Through Education", description: "Excellent work output is achieved through skills training and continued education for employees and seafarers." },
    { letter: "S", title: "Seafarer Compliance", description: "Seafarer's compliance with applicable statutory and regulatory requirements is assured within the crewing process." },
    { letter: "S", title: "Structured Management", description: "Systematic approach to management is strictly implemented, regularly reviewed and continually improved." },
    { letter: "C", title: "Collaborative Efficiency", description: "Creating unity among our leaders to maintain the nvironment in which our people can become fully invovled in achieveing our objectives." },
    { letter: "A", title: "Accelerated Efficiency", description: "All processes are performed quickly and efficiently" },
    { letter: "R", title: "Respectful Service", description: "Rendering to every Principal and seafarer our prompt attention, personalized service, respect and consideration." },
    { letter: "E", title: "Ethical Commitment", description: "Each employee is clear with his purpose and commitment without compromising his integrity." },
    { letter: "S", title: "Supplier Partnership", description: "Suppliers are encouraged to better their service and products for our mutual advantage." }
  ];

  return (
    <div className="min-h-screen">
      {/* SEO Metadata */}
      <div className="hidden">
        <h1>About Our Company - History, Leadership, and Vision</h1>
        <p>Learn about our company's journey, mission, values, leadership team and strategic partnerships that have shaped our success story.</p>
      </div>

      <main>
        {/* Hero Section */}
        <header className="sticky top-16 -z-10 bg-[#1A384F] text-white">
          <div className="relative px-4 py-6 mt-16 lg:px-20 xl:px-40">
            <div className="mt-12 mb-16 text-center lg:text-start">
              <h1 className="text-4xl font-bold mb-4">About Us</h1>
              <p className="text-xl max-w-lg mx-auto lg:mx-0">
                Discover our story, our people, and our mission
              </p>
            </div>
          </div>
        </header>

        {/* Company Profile */}
        <section id="company" className="py-12 px-4 bg-white lg:px-20 xl:px-40">
          <div className="container mx-auto">
            <h2 className="text-2xl font-bold mb-6 text-[#1A384F]">Company Profile</h2>
            <div className="bg-white rounded-lg shadow-md p-6">
              <div 
                className="w-full h-48 mb-6 rounded-xl"
                style={{
                  background: "url('/images/about-us/aaaisabellemigs.jpeg')",
                  backgroundSize: 'contain',
                  backgroundPosition: 'center',
                  backgroundAttachment: 'fixed',
                  backgroundRepeat: 'no-repeat',
                }}
              ></div>
              {/* <img 
                src="/images/about-us/aaaisabellemigs.jpeg" 
                alt="Image of Board of Directors" 
                className="mb-6 w-full rounded-xl" 
              /> */}
              <p className="mb-4">
                NAESS SHIPPING PHILIPPINES, INC. was born on October 24, 1980 with the signing of the documents by Capt. Pablo Gutierrez and Mr. Arturo Piree at the Army Navy Club in Manila. Our first office had a staff of merely five employees at the mezzanine of the Pennville Building on Leon Guinto Street, Malate, Upon approval and registration with the Securities and Exchange Commission, in December of the same year, initial manning operations began with a modest number of 25 vessels. Within three years, we were able to acquire and transfer to our own office at 2215 Leon Guinto St., Malate.
              </p>
              <p>
                Barely a decade of operations found NAESS SHIPPING PHILIPPINES, INC.in the service of eight principals, reaching the 100-mark of enrolled vessels with the Philippine Overseas Employment Administration ( POEA )-a positive confirmation and sure sign of the Shipping Industry’s acceptance and approval of our manning services. With business at its peak, on the first week of October 1991, the property we had acquired and held office in since 1983 was reconstructed into the 4-storey building that presently stands on Leon Guinto today.
              </p>
            </div>
          </div>
        </section>

        {/* Mission and Vision */}
        <section id="mission" className="py-12 bg-gray-100 px-4 lg:px-20 xl:px-40">
          <div className="container mx-auto">
            <h2 className="text-2xl font-bold mb-6 text-[#1A384F]">Our Mission & Values</h2>
            
            {/* <div className="bg-white rounded-lg shadow-md p-6 mb-6">
              <h3 className="text-xl font-semibold mb-3 text-[#1A384F]">Our Vision</h3>
              <p className="mb-4">
                To be the global leader in transformative digital solutions, setting industry standards 
                and creating lasting positive impact for our clients, employees, and communities.
              </p>
              <h3 className="text-xl font-semibold mb-3 text-[#1A384F]">Our Mission</h3>
              <p>
                We aim to provide innovative solutions that empower businesses to thrive in an ever-evolving 
                digital landscape. Our mission is guided by our core values:
              </p>
            </div> */}
            
            <div className="flex flex-wrap gap-4">
              {missionValues.map((value, index) => (
                <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden h-auto w-[49%]">
                  <div className="h-full flex">
                    <div className="bg-[#1A384F] text-white font-bold text-2xl flex items-center justify-center h-full w-16 flex-shrink-0">
                      {value.letter}
                    </div>
                    <div className="p-4">
                      <h4 className="font-semibold text-lg text-[#1A384F]">{value.title}</h4>
                      <p className="text-gray-700">{value.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="bg-white rounded-lg shadow-md p-6 mt-6">
              <div className="flex items-center justify-center">
                <p className="text-center text-lg font-medium text-[#1A384F]">
                  Together, these values form the foundation of our approach: <span className="font-bold">Naess</span>
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* History */}
        <section id="history" className="py-12 px-4 bg-white lg:px-20 xl:px-40">
          <div className="container mx-auto">
            <h2 className="text-2xl font-bold mb-6 text-[#1A384F]">Our History</h2>
            
            <div className="space-y-8">
              {milestones.map((milestone, index) => (
                <div key={index} className="flex">
                  <div className="flex flex-col items-center mr-4">
                    <div className="w-10 h-10 rounded-full bg-[#1A384F] flex items-center justify-center text-white font-bold">
                      {index + 1}
                    </div>
                    {index < milestones.length - 1 && (
                      <div className="h-full w-0.5 bg-indigo-200 my-2"></div>
                    )}
                  </div>
                  <div className="bg-white rounded-lg shadow-md p-4 flex-1">
                    <div className="font-bold text-[#1A384F]">{milestone.year}</div>
                    <div>{milestone.title}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Leadership */}
        <section id="leadership" className="py-12 bg-gray-100 px-4 lg:px-20 xl:px-40">
          <div className="container mx-auto">
            <h2 className="text-2xl font-bold mb-6 text-[#1A384F]">Leadership Team</h2>
            
            <div className="space-y-4">
              {leaders.map((leader) => (
                <div key={leader.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                  <div 
                    className="p-4 flex items-center justify-between cursor-pointer"
                    onClick={() => setExpandedLeader(expandedLeader === leader.id ? null : leader.id)}
                  >
                    <div className="flex items-center">
                      <img 
                        src={leader.image} 
                        alt={leader.name} 
                        className="w-12 h-12 rounded-full object-cover mr-4" 
                      />
                      <div>
                        <h3 className="font-semibold text-lg">{leader.name}</h3>
                        <p className="text-gray-600 text-sm">{leader.title}</p>
                      </div>
                    </div>
                    {expandedLeader === leader.id ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                  </div>
                  
                  {expandedLeader === leader.id && (
                    <div className="px-4 pb-4">
                      <p className="text-gray-700">{leader.bio}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Partnerships */}
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
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default AboutUsPage;