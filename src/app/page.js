"use client";

import HeroHeaderSection from "@/components/pages/home/sections/HeroHeaderSection";
import ServicesSection from "@/components/pages/home/sections/ServicesSection";
import AboutSection from "@/components/pages/home/sections/AboutSection";
import HighlightSection from "@/components/pages/home/sections/HighlightSection";
import CareerSection from "@/components/pages/home/sections/CareerSection";
import CertificateSection from "@/components/pages/home/sections/CertificateSection";
import NewsSection from "@/components/pages/home/sections/NewsSection";
import CTASection from "@/components/pages/home/sections/CTASection";
import Footer from "@/components/ui/Footer";
import ClientsSection from '@/components/pages/home/sections/ClientsSection';
import { useNews } from "@/hooks/useNews";
import { useClients } from "@/hooks/useClients";
import { useElements } from '@/hooks/useElements';

export default function Home() {
  const { homeCarouselItems } = useElements();
  const { newsArticles } = useNews();
  const { clients } = useClients();

  return (
    <div className="overflow-x-hidden">
      <main>
        <HeroHeaderSection carouselItems={homeCarouselItems} />
        <ServicesSection />
        <AboutSection />
        <ClientsSection clients={clients} />
        <HighlightSection />
        <CertificateSection />
        <CareerSection />
        <NewsSection newsArticles={newsArticles} />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
}