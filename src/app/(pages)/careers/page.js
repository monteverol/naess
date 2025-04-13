"use client";

import Footer from '@/components/Footer';
import Header from './components/sections/HeaderSection';
import Breadcrumbs from '@/components/ui/Breadcrumbs';
import { useRouter } from 'next/navigation';

const CareersPage = () => {
  const router = useRouter();

  return (
    <div className="font-sans">
      <Header />

      <div className="px-8 md:px-20 lg:px-40 py-4 w-full bg-blue-50">
        <Breadcrumbs />
      </div>

      <div className="px-8 py-4 md:px-20 lg:px-40 bg-blue-50 grid grid-cols-1 md:grid-cols-2 gap-4">
        <article className="p-8 bg-white rounded-lg drop-shadow-sm hover:drop-shadow-xl">
          <h2 className="text-4xl font-bold header mb-8">Onshore Careers</h2>
          <p className="font-medium mb-4">At NAESS Shipping Philippines, Inc., we are more than just a company—we are a thriving community where innovation meets dedication. Whether you aspire to excel onshore or seek adventure as a seafarer, we offer unparalleled opportunities to grow, achieve, and make a difference. Join a team of passionate professionals committed to excellence and integrity. Your skills, ambition, and drive can propel you toward a fulfilling career with us. Dive into a world of possibilities—apply now and become a vital part of our journey to build the future of maritime and logistics.</p>
          <div className="flex flex-row gap-4 items-center">
            <button 
              className="bg-[#1A384F] px-4 py-2 font-bold hover:bg-slate-800 rounded-md text-white whitespace-nowrap btn"
              onClick={() => router.push('/careers/onshores')}
            >
              Apply Now
            </button>
            <p className="font-semibold">Join a Legacy of Excellence – Build Your Future with NAESS Shipping Philippines, Inc.</p>
          </div>
        </article>
        <article className="p-8 bg-white rounded-lg drop-shadow-sm hover:drop-shadow-xl">
          <h2 className="text-4xl font-bold header mb-8">Seafarer Careers</h2>
          <p className="font-medium mb-4">At NAESS Shipping Philippines, Inc., we are more than just a company—we are a thriving community where innovation meets dedication. Whether you aspire to excel onshore or seek adventure as a seafarer, we offer unparalleled opportunities to grow, achieve, and make a difference. Join a team of passionate professionals committed to excellence and integrity. Your skills, ambition, and drive can propel you toward a fulfilling career with us. Dive into a world of possibilities—apply now and become a vital part of our journey to build the future of maritime and logistics.</p>
          <div className="flex flex-row gap-4 items-center">
            <button 
              className="bg-[#1A384F] px-4 py-2 font-bold hover:bg-slate-800 rounded-md text-white whitespace-nowrap btn"
              onClick={() => router.push('/careers/seafarers')}
            >
              Apply Now
            </button>
            <p className="font-semibold">Join a Legacy of Excellence – Build Your Future with NAESS Shipping Philippines, Inc.</p>
          </div>
        </article>
      </div>
      <Footer />
    </div>
  );
};

export default CareersPage;
