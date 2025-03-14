"use client";

import Footer from "@/components/Footer";
import Header from "./component/Header";
import ContactList from "./component/ContactList";

export default function ContactUs() {
  return(
    <div>
      <main className="flex flex-col gap-8">
        <Header />
        <ContactList />
      </main>
      {/* <Footer /> */}
    </div>
  );
}