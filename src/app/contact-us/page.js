"use client";

import Footer from "@/components/Footer";
import Header from "./sections/Header";
import ContactList from "./sections/ContactList";
import InquireSection from "./sections/InquireSection";
import BusinessHours from "./sections/BusinessHours";

export default function ContactUs() {
  return(
    <div>
      <main className="flex flex-col">
        <Header />
        <ContactList />
        <InquireSection />
        <BusinessHours />
      </main>
      <Footer />
    </div>
  );
}