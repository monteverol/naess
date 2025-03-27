"use client";

import Footer from '@/components/Footer';
import React, { useState, useEffect } from 'react';
import PartnerTile from './components/ui/PartnerTile';
import Header from './components/sections/HeaderSection';
import FilterClients from './components/sections/FilterClientsSection';
import Link from 'next/link';

const Clients = () => {
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
        const response = await fetch(`${API_URL}/clients/api`);
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
      
      {/* Client Filter Categories */}
      <FilterClients
        industries={industries}
        activeCategory={activeCategory}
        setActiveCategory={setActiveCategory}
      />
      
      {/* Client Logo Gallery */}
      <section className="lg:px-20 xl:px-40 py-8 bg-gray-50" aria-labelledby="client-gallery-heading">
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
                  className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow flex flex-col items-center justify-center"
                >
                  <img 
                    src={client.logo} 
                    alt={`${client.name} logo`} 
                    className="mb-3"
                    width="120"
                    height="80"
                  />
                  <h3 className="text-center text-sm font-medium text-gray-700">{client.name}</h3>
                  <p className="text-xs text-gray-500">{client.industry}</p>
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
      <section className="lg:px-20 xl:px-40 py-8 bg-gray-100">
        <div className="container mx-auto">
          <h2 className="text-xl font-semibold mb-6 text-gray-800 px-4 lg:px-0">What Our Clients Say</h2>
          
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <blockquote className="italic text-gray-600 mb-4">
              "NAESS Shipping has been an invaluable partner for our maritime logistics needs. Their professionalism and reliability have helped us streamline our operations and grow our business."
            </blockquote>
            <div className="flex items-center">
              <div className="bg-gray-300 w-10 h-10 rounded-full mr-3"></div>
              <div>
                <cite className="font-medium text-gray-800 not-italic">Maria Santos</cite>
                <p className="text-sm text-gray-500">Operations Director, Global Maritime Transport</p>
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
          
          {!showForm && !formSubmitted ? (
            <button 
              onClick={() => setShowForm(true)}
              className="bg-[#B3D2F4] text-[#1A384F] font-bold px-6 py-3 rounded-md hover:bg-[#9dc1e8] transition duration-200 active:scale-95 shadow-lg"
            >
              Become a Client
            </button>
          ) : formSubmitted ? (
            <div className="bg-green-100 text-green-800 p-4 rounded-md">
              <p className="font-medium">Thank you for your interest!</p>
              <p className="text-sm">Our team will contact you shortly to discuss your shipping needs.</p>
            </div>
          ) : (
            <div className="bg-white rounded-lg p-6 max-w-md mx-auto shadow-lg">
              <h3 className="text-blue-800 font-semibold mb-4">Request Information</h3>
              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label htmlFor="name" className="block text-gray-700 text-sm font-medium mb-1">Company Name</label>
                  <input 
                    type="text"
                    id="name"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md text-gray-800"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="email" className="block text-gray-700 text-sm font-medium mb-1">Business Email</label>
                  <input 
                    type="email"
                    id="email"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md text-gray-800"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="service" className="block text-gray-700 text-sm font-medium mb-1">Service Interested In</label>
                  <select 
                    id="service"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md text-gray-800"
                    required
                  >
                    <option value="">Select a service</option>
                    <option value="cargo">Cargo Shipping</option>
                    <option value="logistics">Logistics Solutions</option>
                    <option value="freight">Freight Forwarding</option>
                    <option value="other">Other Services</option>
                  </select>
                </div>
                <div className="flex justify-between">
                  <button 
                    type="button" 
                    onClick={() => setShowForm(false)}
                    className="px-4 py-2 text-blue-600 hover:text-blue-800"
                  >
                    Cancel
                  </button>
                  <button 
                    type="submit"
                    className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
                  >
                    Submit Request
                  </button>
                </div>
              </form>
            </div>
          )}
        </div>
      </section>
      
      {/* Partner Benefits */}
      <section className="bg-gray-50 py-10 w-full">
        <div className="px-4 lg:px-20 xl:px-40 w-full">
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
      <section className="py-8 bg-gray-100 px-8 lg:px-20 xl:px-40">
        <div className="container mx-auto">
          <h2 className="text-xl font-semibold mb-6 text-gray-800">Industry Recognition</h2>
          
          <div className="flex justify-center space-x-6 overflow-x-auto py-4">
            <div className="flex-shrink-0 flex flex-col items-center">
              <div className="bg-gray-300 w-16 h-16 rounded-full mb-2"></div>
              <span className="text-xs text-gray-600">Safety Award 2023</span>
            </div>
            <div className="flex-shrink-0 flex flex-col items-center">
              <div className="bg-gray-300 w-16 h-16 rounded-full mb-2"></div>
              <span className="text-xs text-gray-600">Best Logistics Provider</span>
            </div>
            <div className="flex-shrink-0 flex flex-col items-center">
              <div className="bg-gray-300 w-16 h-16 rounded-full mb-2"></div>
              <span className="text-xs text-gray-600">Green Shipping Excellence</span>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default Clients;