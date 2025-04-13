"use client";

import Footer from '@/components/Footer';
import React, { useState, useEffect } from 'react';
import PartnerTile from './components/ui/PartnerTile';
import Header from './components/sections/HeaderSection';
import FilterClients from './components/sections/FilterClientsSection';
import Link from 'next/link';
import Breadcrumbs from '@/components/ui/Breadcrumbs';
import { useRouter } from 'next/navigation';
import IndustryRecognition from './components/sections/IndustryRecognitionSection';

const Clients = () => {
  const router = useRouter();
  const [activeCategory, setActiveCategory] = useState('All');
  const API_URL = process.env.NEXT_PUBLIC_API_URL;
  const partnershipBenefits = [
    {
      svg: <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>,
      title: "Reliability & Safety",
      description: "Industry-leading safety protocols and on-time delivery record"
    },
    {
      svg: <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>,
      title: "Global Network",
      description: "Strategic partnerships across major ports worldwide"
    },
    {
      svg: <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>,
      title: "Efficient Solutions",
      description: "Custom shipping solutions that optimize your supply chain"
    }
  ]
  
  // Sample client data - you would replace this with your actual client data
  const [clients, setClients] = useState([]);

  useEffect(() => {
    async function fetchClients() {
      try {
        const response = await fetch('api/clients');
        if (!response.ok) throw new Error("Failed to fetch news.");
        const data = await response.json();
        setClients(data);
      } catch (error) {
        console.error("Error fetching news:", error);
      }
    } 

    fetchClients();
  }, []);
  
  // Extract unique industries for filter categories
  const industries = ['All', ...new Set(clients.map(client => client.industry))];
  
  // Filter clients based on active category
  const filteredClients = activeCategory === 'All' 
    ? clients 
    : clients.filter(client => client.industry === activeCategory);
  
  const [showForm, setShowForm] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  
  const handleSubmit = (e) => {
    e.preventDefault();
    setFormSubmitted(true);
    // Here you would handle the actual form submission
  };
  
  return (
    <div className="min-h-screen">
      {/* Hero Section with Background */}
      <Header />
      
      <section className="section w-full bg-white py-4">
        <Breadcrumbs />
      </section>

      {/* Client Filter Categories */}
      <FilterClients
        industries={industries}
        activeCategory={activeCategory}
        setActiveCategory={setActiveCategory}
      />
      
      {/* Client Logo Gallery */}
      <section className="section bg-gray-50" aria-labelledby="client-gallery-heading">
        <div className="container mx-auto px-4 lg:px-0">
          <h2 id="client-gallery-heading" className="text-xl font-semibold mb-6 text-gray-800">
            {activeCategory === 'All' ? 'All Clients' : `${activeCategory} Partners`}
          </h2>
          
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {filteredClients.map(client => (
              <Link 
                href={`/clients/${client.id}`} 
                passHref
                key={client.id}
              >
                <div 
                  key={client.id} 
                  className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-all duration-300 hover:scale-105 flex flex-col items-center justify-center group"
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
      
      {/* Testimonials Section - Carousel */}
      <section className="section py-8 bg-gray-100">
        <div className="container mx-auto">
          <h2 className="text-xl font-semibold mb-6 text-gray-800 px-4 lg:px-0">What Our Clients Say</h2>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <blockquote className="italic text-gray-600 mb-4">
                "NAESS Shipping has been an invaluable partner for our maritime logistics needs. Their professionalism and reliability have helped us streamline our operations and grow our business."
              </blockquote>
              <div className="flex items-center">
                <div className="bg-gray-300 min-w-10 max-w-10 min-h-10 max-h-10 rounded-full mr-3"></div>
                <div>
                  <cite className="font-medium text-gray-800 not-italic">Maria Santos</cite>
                  <p className="text-sm text-gray-500">Operations Director, Global Maritime Transport</p>
                </div>
              </div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <blockquote className="italic text-gray-600 mb-4">
                "NAESS Shipping has been an invaluable partner for our maritime logistics needs. Their professionalism and reliability have helped us streamline our operations and grow our business."
              </blockquote>
              <div className="flex items-center">
                <div className="bg-gray-300 min-w-10 max-w-10 min-h-10 max-h-10 rounded-full mr-3"></div>
                <div>
                  <cite className="font-medium text-gray-800 not-italic">Maria Santos</cite>
                  <p className="text-sm text-gray-500">Operations Director, Global Maritime Transport</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Call to Action */}
      <section className="py-10 bg-[#1A384F] text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold mb-4">Join Our Esteemed Clientele</h2>
          <p className="mb-6 text-blue-100">
            Experience the premium shipping and logistics services that have earned us the trust of industry leaders across Asia.
          </p>
          
          <button 
            onClick={() => router.push('/contact-us/partnership')}
            className="bg-[#B3D2F4] text-[#1A384F] font-bold px-6 py-3 rounded-md hover:bg-[#9dc1e8] transition duration-200 active:scale-95 shadow-lg cursor-pointer"
          >
            Become a Client
          </button>
        </div>
      </section>
      
      {/* Partner Benefits */}
      <section className="bg-gray-50 w-full">
        <div className="section w-full">
          <h2 className="text-xl font-semibold mb-6 text-gray-800">Why Partner With Us?</h2>
          
          <div className="flex flex-wrap gap-4 justify-between w-full">
            {
              partnershipBenefits.map((item, index) => (
                <PartnerTile
                  key={index}
                  svg={item.svg}
                  title={item.title}
                  description={item.description}
                />
              ))
            }
          </div>
        </div>
      </section>
      
      {/* Industry Recognition - Optional */}
      <IndustryRecognition />
      <Footer />
    </div>
  );
};

export default Clients;