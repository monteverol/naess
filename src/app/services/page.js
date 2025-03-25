"use client";

import Head from 'next/head';
import { useState } from 'react';
import Footer from '@/components/Footer';

export default function Services() {
  const [activeService, setActiveService] = useState(null);

  const toggleService = (id) => {
    setActiveService(activeService === id ? null : id);
  };

  const services = [
    {
      id: 1,
      title: "Recruitment",
      description: "Comprehensive crew recruitment solutions",
      details: [
        "Manning Agreement establishment",
        "Principal Accreditation",
        "Vessel Enrollment",
        "Seafarer's Pool management"
      ],
      icon: "👥",
      bgColor: "bg-blue-50"
    },
    {
      id: 2,
      title: "Production",
      description: "Efficient crew selection and preparation",
      details: [
        "Selection & Nomination process",
        "Candidate Acceptance procedures",
        "Medical examinations coordination",
        "Specialized training programs"
      ],
      icon: "🏗️",
      bgColor: "bg-green-50"
    },
    {
      id: 3,
      title: "Installation",
      description: "Seamless crew deployment services",
      details: [
        "Documentation processing",
        "Liaison with authorities",
        "Travel arrangements",
        "Dispatch coordination"
      ],
      icon: "✈️",
      bgColor: "bg-purple-50"
    },
    {
      id: 4,
      title: "Onboard Procedures",
      description: "Crew management during contracts",
      details: [
        "On-signing procedures",
        "Allotment management",
        "Off-signing coordination",
        "Repatriation arrangements"
      ],
      icon: "⚓",
      bgColor: "bg-yellow-50"
    },
    {
      id: 5,
      title: "SMAS Crewing System",
      description: "Proprietary crew management platform",
      details: [
        "Centralized crew database",
        "Automated documentation tracking",
        "Compliance management",
        "Real-time reporting"
      ],
      icon: "💻",
      bgColor: "bg-red-50"
    },
    {
      id: 6,
      title: "Post Contract Activities",
      description: "Post-deployment support services",
      details: [
        "Comprehensive de-briefing",
        "Post-medical examinations",
        "Claim settlement",
        "Performance evaluation"
      ],
      icon: "📋",
      bgColor: "bg-indigo-50"
    }
  ];

  return (
    <>
      <Head>
        <title>Crew Management Services | NAESS Shipping Solutions</title>
        <meta name="description" content="Professional maritime crew management services including recruitment, training, deployment, and post-contract support for your vessels." />
        <meta name="keywords" content="maritime crew, seafarer recruitment, crew management, shipping manpower, vessel staffing, maritime training" />
        <meta property="og:title" content="Crew Management Services | NAESS Shipping Solutions" />
        <meta property="og:description" content="Complete crew management solutions for your maritime operations. Recruitment, training, deployment, and post-contract support." />
        <link rel="canonical" href="https://naess-shipping.com/services" />
      </Head>

      <main className="min-h-screen">
        {/* Hero Section */}
        <section className="relative bg-[#264D6C] text-white py-20 md:py-32">
          <div className="container mx-auto px-6 text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Crew Management Services
            </h1>
            <p className="text-xl md:text-2xl max-w-3xl mx-auto mb-8">
              Comprehensive solutions for your maritime manpower needs
            </p>
            <div className="flex justify-center space-x-4">
              <button 
                onClick={() => window.scrollTo({ top: document.getElementById('services-section').offsetTop - 100, behavior: 'smooth' })}
                className="bg-white text-[#264D6C] px-8 py-3 rounded-lg font-semibold hover:bg-blue-100 transition duration-300"
              >
                Our Services
              </button>
              <button className="border-2 border-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-[#264D6C] transition duration-300">
                Contact Us
              </button>
            </div>
          </div>
          <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-blue-50 to-transparent"></div>
        </section>

        {/* Services Grid */}
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
                  hover:shadow-lg hover:-translate-y-1
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
                          // Add your navigation or modal trigger here
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

        {/* Stats Section */}
        <section className="bg-[#264D6C] text-white py-16">
          <div className="container mx-auto px-6">
            <h2 className="text-3xl font-bold text-center mb-12">Our Crew Management Expertise</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
              {[
                { value: "500+", label: "Qualified Seafarers" },
                { value: "25+", label: "Years Experience" },
                { value: "100%", label: "STCW Compliance" },
                { value: "24/7", label: "Support" }
              ].map((stat, index) => (
                <div key={index} className="p-4">
                  <div className="text-4xl font-bold mb-2">{stat.value}</div>
                  <div className="text-blue-200/90">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Process Diagram Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-6">
            <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">Our Crew Management Process</h2>
            <div className="relative">
              <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-1 bg-gray-200 -translate-y-1/2"></div>
              <div className="grid grid-cols-1 lg:grid-cols-6 gap-8">
                {[
                  { icon: "📝", title: "Recruitment", desc: "Manning agreements & selection" },
                  { icon: "🏥", title: "Medical", desc: "Exams & certification" },
                  { icon: "🎓", title: "Training", desc: "STCW & company specific" },
                  { icon: "✈️", title: "Deployment", desc: "Travel & documentation" },
                  { icon: "⚓", title: "Onboard", desc: "Support & management" },
                  { icon: "📊", title: "Post-Contract", desc: "Debrief & evaluation" }
                ].map((step, index) => (
                  <div key={index} className="relative z-10">
                    <div className="w-full h-full bg-blue-50 rounded-lg p-6 text-center shadow-sm hover:shadow-md transition-shadow">
                      <div className="text-3xl mb-3">{step.icon}</div>
                      <h3 className="font-bold text-lg text-[#264D6C] mb-1">{step.title}</h3>
                      <p className="text-gray-600 text-sm">{step.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-6 text-center">
            <h2 className="text-3xl font-bold text-gray-800 mb-6">Ready to Optimize Your Crew Operations?</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-8">
              Partner with NAESS for reliable, compliant, and efficient crew management solutions.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <button className="bg-[#264D6C] text-white px-8 py-4 rounded-lg font-semibold hover:bg-[#1a3a52] transition-colors duration-300">
                Request Proposal
              </button>
              <button className="border-2 border-[#264D6C] text-[#264D6C] px-8 py-4 rounded-lg font-semibold hover:bg-blue-50 transition-colors duration-300">
                Speak to Our Team
              </button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}