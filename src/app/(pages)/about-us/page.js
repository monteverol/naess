"use client";

import React from 'react';
import Footer from '@/components/ui/Footer';
import Breadcrumbs from '@/components/ui/Breadcrumbs';
import Header from '@/components/pages/about-us/sections/HeaderSection';
import CompanyProfileSection from '@/components/pages/about-us/sections/CompanyProfileSection';
import NaessCaresSection from '@/components/pages/about-us/sections/NaessCaresSection';
import HistorySection from '@/components/pages/about-us/sections/HistorySection';
import PartnerhipsSection from '@/components/pages/about-us/sections/PartnershipsSection';
import { useClients } from '@/hooks/useClients';
import { useElements } from '@/hooks/useElements';

const AboutUsPage = () => {
  const { clients } = useClients();
  const { milestones, naesscares } = useElements();

  const leftColumn = naesscares.slice(0, Math.ceil(naesscares.length / 2));
  const rightColumn = naesscares.slice(Math.ceil(naesscares.length / 2));

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

        <section className="section w-full bg-blue-50 py-4">
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