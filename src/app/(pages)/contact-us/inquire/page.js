"use client";

import Footer from "@/components/Footer";
import Header from "../sections/Header";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import dynamic from 'next/dynamic';

// Dynamically import components
const ContactList = dynamic(() => import('../sections/ContactList'));
const InquireSection = dynamic(() => import('../sections/InquireSection'));
const BusinessHours = dynamic(() => import('../sections/BusinessHours'));

export default function ContactUs() {
  return(
    <div>
      <main className="flex flex-col">
        <Header />
        <section className="px-8 lg:px-20 xl:px-60 w-full bg-white py-4">
          <Breadcrumbs />
        </section>
        <ContactList />
        <InquireSection />
        <BusinessHours />
      </main>
      <Footer />
    </div>
  );
}
