"use client";

import Footer from "@/components/Footer";
import Header from "./component/Header";
import ContactList from "./component/ContactList";
import InquireSection from "./component/InquireSection";
import BusinessHours from "./component/BusinessHours";

export default function ContactUs() {
  return(
    <div>
      <main className="flex flex-col gap-8">
        <Header />
        <ContactList />
        <InquireSection />
        <BusinessHours />
      </main>
      <Footer />
    </div>
  );
}