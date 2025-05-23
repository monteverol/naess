"use client";

import Footer from '@/components/ui/Footer';
import React, { useState, useEffect } from 'react';
import Breadcrumbs from '@/components/ui/Breadcrumbs';
import Header from '@/components/pages/clients/sections/HeaderSection';
import FilterClients from '@/components/pages/clients/sections/FilterClientsSection';
import IndustryRecognition from '@/components/pages/clients/sections/IndustryRecognitionSection';
import ClientGallerySection from '@/components/pages/clients/sections/ClientGallerySection';
import TestimonialSection from '@/components/pages/clients/sections/TestimonialSection';
import CTASection from '@/components/pages/clients/sections/CTASection';
import PartnerBenefitsSection from '@/components/pages/clients/sections/PartnerBenefitsSection';
import { useClients } from '@/hooks/useClients';

const Clients = () => {
  const [activeCategory, setActiveCategory] = useState('All');
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
  
  const { clients } = useClients();
  
  const industries = ['All', ...new Set(clients.map(client => client.industry))];
  
  const filteredClients = activeCategory === 'All' 
    ? clients 
    : clients.filter(client => client.industry === activeCategory);
  
  return (
    <div className="min-h-screen">
      {/* Hero Section with Background */}
      <Header />
      
      <section className="section bg-gray-50 py-4 grid items-center justify-center">
        <Breadcrumbs />
      </section>

      {/* Client Filter Categories */}
      <FilterClients
        industries={industries}
        activeCategory={activeCategory}
        setActiveCategory={setActiveCategory}
      />
      
      {/* Client Logo Gallery */}
      <ClientGallerySection activeCategory={activeCategory} filteredClients={filteredClients} />
      
      {/* Testimonials Section - Carousel */}
      <TestimonialSection />
      
      {/* Call to Action */}
      <CTASection />
      
      {/* Partner Benefits */}
      <PartnerBenefitsSection partnershipBenefits={partnershipBenefits} />
      
      {/* Industry Recognition - Optional */}
      <IndustryRecognition />
      <Footer />
    </div>
  );
};

export default Clients;