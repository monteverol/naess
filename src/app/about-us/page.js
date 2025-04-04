"use client";

import React, { useState, useEffect } from 'react';
import Footer from '@/components/Footer';
import Breadcrumbs from '@/components/ui/Breadcrumbs';
import Header from './components/section/HeaderSection';
import CompanyProfileSection from './components/section/CompanyProfileSection';
import NaessCaresSection from './components/section/NaessCaresSection';
import HistorySection from './components/section/HistorySection';
import BODSection from './components/section/BODSection';
import PartnerhipsSection from './components/section/PartnershipsSection';

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

  const milestones = [
    {
      year: "1980",
      title: "NAESS SHIPPING PHILIPPINES, INC. Founded",
      description: "Established on October 24, 1980, by Capt. Pablo Gutierrez and Mr. Arturo Piree at the Army Navy Club in Manila. Initial operations began with 25 vessels."
    },
    {
      year: "1983",
      title: "Acquired New Office",
      description: "Transferred to a new office located at 2215 Leon Guinto St., Malate, after successfully expanding the business within three years."
    },
    {
      year: "1984",
      title: "Computerization Program Implemented",
      description: "Started implementing the computerization program to enhance efficiency and keep up with technological advancements."
    },
    {
      year: "1991",
      title: "Reconstruction of the Office",
      description: "The property at 2215 Leon Guinto St. was reconstructed into a 4-storey building to accommodate business growth and provide better services."
    },
    {
      year: "1993",
      title: "Achieved 100 Enrolled Vessels",
      description: "Surpassed the 100-mark of enrolled vessels with the Philippine Overseas Employment Administration (POEA), confirming the company’s acceptance and credibility in the shipping industry."
    },
    {
      year: "2000",
      title: "ISO 9001-2000 Certification Achieved",
      description: "Certified by Det Norske Veritas in the ISO 9001-2000 Series Quality Standard, ensuring quality and excellence in services."
    },
    {
      year: "2000s",
      title: "Integration of Database with Website",
      description: "Integrated the company’s database with the official website, allowing principals to access and download important documents and certificates online anytime."
    },
    {
      year: "Present",
      title: "Training Vessel Management",
      description: "Led by the young and gregarious Mr. Pedro Miguel F. Oca as President, NSP enjoys the trust and confidence of its foreign and domestic principals, equipping ships with the best trained, skilled and able-bodied seamen in the business. Among these companies are the Reefership Marine Services, Limited., Kuwait Oil Tanker Co. SAK, Sloman Neptun Schiffahrts-Aktiengesellschaft."
    }
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

  const leftColumn = missionValues.slice(0, Math.ceil(missionValues.length / 2));
  const rightColumn = missionValues.slice(Math.ceil(missionValues.length / 2));

  return (
    <div className="min-h-screen">
      {/* SEO Metadata */}
      <div className="hidden">
        <h1>About Our Company - History, Leadership, and Vision</h1>
        <p>Learn about our company's journey, mission, values, leadership team and strategic partnerships that have shaped our success story.</p>
      </div>

      <main>
        {/* Hero Section */}
        <Header />

        <section className="px-8 lg:px-20 xl:px-40 w-full bg-blue-50 py-4">
          <Breadcrumbs />
        </section>

        {/* Company Profile */}
        <CompanyProfileSection />

        {/* NAESS CARES */}
        <NaessCaresSection leftColumn={leftColumn} rightColumn={rightColumn} />

        {/* History */}
        <HistorySection milestones={milestones} />

        {/* Leadership */}
        {/* <BODSection leaders={leaders} expandedLeader={expandedLeader} setExpandedLeader={setExpandedLeader} /> */}

        {/* Partnerships */}
        <PartnerhipsSection partners={clients} />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default AboutUsPage;