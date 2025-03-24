"use client";

import { useState, useEffect } from "react";
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
  const carouselItems = [
    { type: 'image', src: '/images/home/home-ship-image.jpg' },
    { type: 'image', src: '/images/omegagas-ship.png' },
    { type: 'image', src: '/images/home/gif-ship.png' }
    // { type: 'video', src: '/path/to/video1.mp4' },
  ];
  const [newsArticles, setNewsArticles] = useState([]);
  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  useEffect(() => {
    async function fetchNews() {
      try {
        const response = await fetch(`${API_URL}/news/api`);
        if (!response.ok) throw new Error("Failed to fetch news");
        const data = await response.json();
        setNewsArticles(data); // Update state with fetched data
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