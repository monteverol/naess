// File: src/app/careers/onshore/page.js

"use client";

import { useEffect, useState } from 'react';
import Footer from '@/components/ui/Footer';
import Header from '../components/sections/HeaderSection';
import FAQ from '../components/sections/FAQSection';
import CTA from '../components/sections/CTASection';
import Testimonial from '../components/sections/TestimonialSection';
import BenefitsSection from '../components/sections/BenefitsSection';
import JobOpeningSection from '../components/sections/JobOpeningSection';
import Breadcrumbs from '@/components/ui/Breadcrumbs';

const OnshorePage = () => {
  const [jobOpenings, setJobOpenings] = useState([]);
  const [benefits, setBenefits] = useState([]);
  const [testimonials, setTestimonials] = useState([]);
  const [faqs, setFaqs] = useState([]);

  const fetchData = async (endpoint, setter, query = '') => {
    try {
      const res = await fetch(`/api/careers/${endpoint}${query}`);
      if (!res.ok) throw new Error(`Failed to fetch ${endpoint}`);
      const data = await res.json();
      setter(data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchData('job_vacancy', setJobOpenings, '?class=Onshore');
    fetchData('benefits', setBenefits);
    fetchData('testimonials', setTestimonials);
    fetchData('faqs', setFaqs);
  }, []);

  return (
    <div className="font-sans">
      <Header />

      <div className="section w-full bg-white">
        <Breadcrumbs />
      </div>

      <JobOpeningSection jobOpenings={jobOpenings} />
      <BenefitsSection benefits={benefits} />
      <Testimonial testimonials={testimonials} />
      <FAQ faqs={faqs} />
      <CTA />
      <Footer />
    </div>
  );
};

export default OnshorePage;
