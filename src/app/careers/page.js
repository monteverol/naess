"use client";

import Footer from '@/components/Footer';
import Header from './components/sections/HeaderSection';
import FAQ from './components/sections/FAQSection';
import CTA from './components/sections/CTASection';
import Testimonial from './components/sections/TestimonialSection';
import BenefitsSection from './components/sections/BenefitsSection';
import JobOpeningSection from './components/sections/JobOpeningSection';

const CareersPage = () => {
  const jobOpenings = [
    {
      id: 1,
      title: '3rd Engineer',
      location: 'Malate, Manila',
      type: 'Full-time',
      category: 'RMS',
      description: 'We\'re looking for a skilled React developer to join our engineering team and help build amazing web experiences.'
    },
    {
      id: 2,
      title: '2AE',
      location: 'Malate, Manila',
      type: 'Full-time',
      category: 'RMS',
      description: 'Create stunning user experiences that delight our customers and help us stand out in the market.'
    },
    {
      id: 3,
      title: '5th Engineer',
      location: 'Malate, Manila',
      type: 'Full-time',
      category: 'KOTC',
      description: 'Lead our marketing initiatives and help grow our brand presence across multiple platforms.'
    },
    {
      id: 4,
      title: 'Gas Engineer',
      location: 'Malate, Manila',
      type: 'Contract',
      category: 'SNS',
      description: 'Ensure smooth day-to-day operations and help optimize internal workflows.'
    },
    {
      id: 5,
      title: '3rd Officer',
      location: 'Malate, Manila',
      type: 'Full-time',
      category: 'AMOSUP',
      description: 'Drive new business opportunities and nurture client relationships to boost company growth.'
    },
    {
      id: 6,
      title: 'HR',
      location: 'Malate, Manila',
      type: 'Full-time',
      category: 'Office',
      description: 'We\'re looking for a skilled React developer to join our engineering team and help build amazing web experiences.'
    },
  ];

  const benefits = [
    {
      icon: "🏥",
      title: "Health Insurance",
      description: "Comprehensive medical, dental, and vision coverage for you and your dependents."
    },
    {
      icon: "🏝️",
      title: "Unlimited PTO",
      description: "Take the time you need to rest, recharge, and come back at your best."
    },
    {
      icon: "💻",
      title: "Remote Work",
      description: "Work from anywhere with flexible hours to maintain your work-life balance."
    },
    {
      icon: "🎓",
      title: "Learning Budget",
      description: "$2,000 annual budget for courses, books, and conferences to help you grow."
    },
    {
      icon: "💰",
      title: "Competitive Salary",
      description: "We offer top market rates and equity options for all full-time employees."
    },
    {
      icon: "🏋️",
      title: "Wellness Program",
      description: "Monthly stipend for gym memberships or other wellness activities."
    }
  ];

  const testimonials = [
    {
      id: 1,
      name: "John Doe",
      position: "LPG Gas Specialist",
      image: "/api/placeholder/100/100",
      text: "Joining this company was one of the best decisions of my career. The collaborative environment and growth opportunities are unmatched!"
    },
    {
      id: 2,
      name: "Jane Doe",
      position: "Marine",
      image: "/api/placeholder/100/100",
      text: "I've never worked anywhere that values creativity and innovation as much as this company. Every day brings new challenges and opportunities to learn."
    },
    {
      id: 3,
      name: "John Weck",
      position: "Cadet",
      image: "/api/placeholder/100/100",
      text: "The supportive culture here has helped me develop both professionally and personally. I feel valued and empowered to contribute my best work."
    }
  ];

  const faqs = [
    {
      question: "What is the hiring process like?",
      answer: "Our hiring process typically involves an initial screening call, followed by a technical or role-specific assessment, and then 2-3 interviews with team members and leadership. The entire process usually takes 2-3 weeks."
    },
    {
      question: "Do you offer relocation assistance?",
      answer: "Yes, we offer relocation packages for certain roles. The specifics depend on the position and location, but our HR team will discuss details with qualified candidates."
    },
    {
      question: "Can I work remotely?",
      answer: "Many of our positions offer remote work options. Each job posting specifies whether the role is remote, hybrid, or on-site. We're committed to flexible work arrangements where possible."
    },
    {
      question: "What growth opportunities are available?",
      answer: "We believe in promoting from within and offer clear career progression paths. We provide regular feedback, mentorship programs, and learning budgets to support your professional development."
    },
    {
      question: "How often do you hire new team members?",
      answer: "We're constantly growing and hire year-round as needs arise. Even if you don't see a perfect match for your skills right now, we encourage you to submit your resume for future opportunities."
    }
  ];

  return (
    <div className="font-sans">
      <Header />

      {/* Job Openings Section */}
      <JobOpeningSection 
        jobOpenings={jobOpenings}
      />

      {/* Benefits Section */}
      <BenefitsSection
        benefits={benefits}
      />

      {/* Testimonials Section */}
      <Testimonial 
        testimonials={testimonials}
      />

      {/* FAQ Section */}
      <FAQ
        faqs={faqs}
      />

      {/* CTA Section */}
      <CTA />

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default CareersPage;