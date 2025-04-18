"use client";

import { useState, useEffect } from "react";
import HeroHeaderSection from "./components/sections/HeroHeaderSection";
import ServicesSection from "./components/sections/ServicesSection";
import AboutSection from "./components/sections/AboutSection";
import HighlightSection from "./components/sections/HighlightSection";
import CareerSection from "./components/sections/CareerSection";
import CertificateSection from "./components/sections/CertificateSection";
import NewsSection from "./components/sections/NewsSection";
import CTASection from "./components/sections/CTASection";
import Footer from "@/components/Footer";

export default function Home() {
  const carouselItems = [
    { type: 'image', src: '/images/home/home-ship-image.jpg' },
    { type: 'image', src: '/images/omegagas-ship.png' },
    { type: 'image', src: '/images/home/carousel/DOLE.png' },
    { type: 'image', src: '/images/home/carousel/DJI_0808.JPG' },
    // { type: 'video', src: '/path/to/video1.mp4' },
  ];
  const [newsArticles, setNewsArticles] = useState([]);

  useEffect(() => {
    async function fetchNews() {
      try {
        const response = await fetch('/api/news');
        if (!response.ok) throw new Error("Failed to fetch news");
        const data = await response.json();
        setNewsArticles(data);
      } catch (error) {
        console.error("Error fetching news:", error);
      }
    }
    fetchNews();
  }, []);

  return (
    <div className="overflow-x-hidden">
      <main>
        <HeroHeaderSection carouselItems={carouselItems} />
        <ServicesSection />
        <AboutSection />
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