"use client";

import Navigation from "@/components/Navigation";
import HeroHeaderSection from "./component/HeroHeaderSection";
import ServicesSection from "./component/ServicesSection";
import AboutSection from "./component/AboutSection";
import HighlightSection from "./component/HighlightSection";
import CareerSection from "./component/CareerSection";
import CertificateSection from "./component/CertificateSection";
import NewsSection from "./component/NewsSection";
import CTASection from "./component/CTASection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div>
      <Navigation />
      <main>
        <HeroHeaderSection />
        <ServicesSection />
        <AboutSection />
        <HighlightSection />
        <CareerSection />
        <CertificateSection />
        <NewsSection />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
}