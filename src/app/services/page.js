"use client";

import { useState } from 'react';
import Footer from '@/components/Footer';
import HeaderSection from './sections/HeaderSection';
import ServicesSection from './sections/ServicesSection';
import StatsSection from './sections/StatsSection';
import ProcessDiagramSection from './sections/ProcessDiagramSection';
import CTASection from './sections/CTASection';
import Breadcrumbs from '@/components/ui/Breadcrumbs';

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
      <main className="min-h-screen">
        {/* Hero Section */}
        <HeaderSection />

        <section className="px-8 lg:px-20 xl:px-40 w-full bg-white py-4">
          <Breadcrumbs />
        </section>

        {/* Services Grid */}
        <ServicesSection
          services={services}
          toggleService={toggleService}
          activeService={activeService}
        />

        {/* Stats Section */}
        <StatsSection />

        {/* Process Diagram Section */}
        <ProcessDiagramSection />

        {/* CTA Section */}
        <CTASection />
      </main>
      <Footer />
    </>
  );
}