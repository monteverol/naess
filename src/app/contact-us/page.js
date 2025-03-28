"use client";

import Footer from "@/components/Footer";
import Header from "./sections/Header";
import ContactList from "./sections/ContactList";
import InquireSection from "./sections/InquireSection";
import BusinessHours from "./sections/BusinessHours";
import Breadcrumbs from "@/components/ui/Breadcrumbs";

export default function ContactUs() {
  return(
    <div>
      <main className="flex flex-col">
        <Header />
        <section className="px-8 lg:px-20 xl:px-40 w-full bg-white py-4">
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