import React, { useState } from 'react';
import { AiFillTikTok, AiFillFacebook, AiFillInstagram, AiFillLinkedin } from "react-icons/ai";
import { FaLocationDot, FaPhone, FaRegEnvelope } from "react-icons/fa6";
import Link from 'next/link';

const Footer = () => {
  const [expandedSection, setExpandedSection] = useState(null);

  const toggleSection = (section) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white border-t border-gray-200 pt-8 pb-4 lg:px-20 xl:px-40" aria-label="Site footer">
      <div className="container mx-auto px-4">
        {/* LAPTOP - DESKTOP */}
        <div className="hidden lg:block">
          <section className="flex-1 flex flex-row justify-between mb-8 gap-[min(8vw,10rem)]">
            {/* FIRST COLUMN */}
            <section className="flex-1 flex flex-col gap-8">
              <figure>
                <img src="/images/naess-logo-black.png" alt="Naess Shipping Philippines Logo" />
                <figcaption className="hidden">Naess Shipping Philippines Inc. Icon</figcaption>
              </figure>
              <header>
                <h2 className="italic text-[20px]">"Navigation through new direction"</h2>
              </header>
            </section>
            {/* SECOND COLUMN */}
            <section className="flex flex-col gap-20">
              <article className="flex flex-col gap-4">
                <h1 className="font-bold text-[16px] uppercase">Social Media</h1>
                <ul className="flex flex-row gap-4 items-center">
                  <li>
                    <Link href="https://www.tiktok.com/@naessshipping" target="_blank" rel="noopener noreferrer" className="cursor-pointer">
                      <AiFillTikTok size={30} />                  
                    </Link>
                  </li>
                  <li>
                    <Link href="https://www.facebook.com/NSPI2215" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 transition-colors">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M22.675 0h-21.35c-.732 0-1.325.593-1.325 1.325v21.351c0 .731.593 1.324 1.325 1.324h11.495v-9.294h-3.128v-3.622h3.128v-2.671c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12v9.293h6.116c.73 0 1.323-.593 1.323-1.325v-21.35c0-.732-.593-1.325-1.325-1.325z"/>
                      </svg>
                    </Link>
                  </li>
                  <li>
                    <Link href="https://www.instagram.com/naessshipping/" target="_blank" rel="noopener noreferrer" className="text-pink-600 hover:text-pink-800 transition-colors">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                      </svg>
                    </Link>
                  </li>
                  <li>
                    <Link href="https://www.linkedin.com/company/naess-shipping-philippines-inc/posts/?feedView=all" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:text-blue-700 transition-colors">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                      </svg>
                    </Link>
                  </li>
                </ul>
              </article>
              <button type="button" role="button" className="uppercase w-[200px] h-[40px] bg-transparent border-2 border-black rounded-sm font-bold cursor-pointer transition duration-200 hover:bg-[#1A384F] hover:text-white hover:border-[#1A384F] active:scale-95">principals log-in</button>
            </section>
            {/* THIRD COLUMN */}
            <section className="flex flex-col gap-8">
              <h2 className="uppercase font-bold text-[16px]">Contacts</h2>
              <article className="relative">
                <h3 className="hidden">Address</h3>
                <FaLocationDot color="#1A384F" size={20} className="absolute -left-8 top-1" />
                <p className="text-[16px]">2215 Leon Guinto St,<br />Malate, Manila<br />1004 Metro Manila</p>
              </article>
              <article className="relative">
                <h3 className="hidden">Phone Numbers</h3>
                <FaPhone color="#1A384F" size={20} className="absolute -left-8 top-1" />
                <p className="text-[16px]">+63 961-876-3109</p>
                <p className="text-[16px]">(632) 8521-3361</p>
              </article>
              <article className="relative">
                <h3 className="hidden">Email Address</h3>
                <FaRegEnvelope color="#1A384F" size={20} className="absolute -left-8 top-1" />
                <p className="text-[16px]">recruitment@naess.com.ph</p>
                <p className="text-[16px]">mail@naess.com.ph</p>
              </article>
            </section>
            {/* FOURTH COLUMN */}
            <section className="flex flex-col gap-8">
              <h3 className="uppercase font-bold text-[16px]">Navigations</h3>
              <ul className="flex flex-col gap-4 items-start">
                <li>
                  <a href="#" className="underline cursor-pointer">Home</a>
                </li>
                <li>
                  <a href="#" className="underline cursor-pointer">Careers</a>
                </li>
                <li>
                  <a href="#" className="underline cursor-pointer">About Us</a>
                </li>
                <li>
                  <a href="#" className="underline cursor-pointer">Services</a>
                </li>
                <li>
                  <a href="#" className="underline cursor-pointer">Our Clients</a>
                </li>
                <li>
                  <a href="#" className="underline cursor-pointer">News</a>
                </li>
                <li>
                  <a href="#" className="underline cursor-pointer">Contact Us</a>
                </li>
              </ul>
            </section>
          </section>
        </div>

        {/* MOBILE */}
        <div className="block lg:hidden">
          {/* Logo and Tagline */}
          <div className="flex flex-col items-center mb-6">
            <div className="flex items-center mb-2">
              <img 
                src="/images/naess-logo-black.png" 
                alt="NAESS Shipping Philippines, Inc. Logo" 
                className="h-12 w-auto"
              />
            </div>
            <p className="text-gray-600 italic text-sm text-center">
              "Navigating through new direction"
            </p>
          </div>

          {/* Collapsible Sections */}
          <div className="space-y-2 mb-6">
            {/* Explore Section */}
            <div className="border border-gray-200 rounded-md overflow-hidden">
              <button 
                onClick={() => toggleSection('explore')}
                className="w-full px-4 py-3 flex justify-between items-center bg-gray-50 hover:bg-gray-100"
                aria-expanded={expandedSection === 'explore'}
              >
                <h2 className="font-semibold text-left">EXPLORE</h2>
                <svg className={`w-5 h-5 transition-transform ${expandedSection === 'explore' ? 'rotate-180' : ''}`} 
                  fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              <div className={`${expandedSection === 'explore' ? 'max-h-64' : 'max-h-0'} transition-all duration-300 overflow-hidden`}>
                <nav className="px-4 py-2 space-y-2" aria-label="Explore links">
                  <a href="/vessels" className="block text-blue-600 hover:underline">Vessels</a>
                  <a href="/services" className="block text-blue-600 hover:underline">Services</a>
                  <a href="/about-us" className="block text-blue-600 hover:underline">About Us</a>
                  <a href="/news" className="block text-blue-600 hover:underline">News</a>
                  <a href="/clients" className="block text-blue-600 hover:underline">Clients</a>
                </nav>
              </div>
            </div>

            {/* Contact Section */}
            <div className="border border-gray-200 rounded-md overflow-hidden">
              <button 
                onClick={() => toggleSection('contact')}
                className="w-full px-4 py-3 flex justify-between items-center bg-gray-50 hover:bg-gray-100"
                aria-expanded={expandedSection === 'contact'}
              >
                <h2 className="font-semibold text-left">CONTACTS</h2>
                <svg className={`w-5 h-5 transition-transform ${expandedSection === 'contact' ? 'rotate-180' : ''}`} 
                  fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              <div className={`${expandedSection === 'contact' ? 'max-h-64' : 'max-h-0'} transition-all duration-300 overflow-hidden`}>
                <div className="px-4 py-2 space-y-2">
                  <address className="not-italic text-gray-700">
                    <p>2215 Leon Guinto St,</p>
                    <p>Malate, Manila</p>
                    <p>1004 Metro Manila</p>
                  </address>
                  <div className="space-y-1">
                    <a href="tel:+639618763109" className="block text-blue-600 hover:underline">+63 961-876-3109</a>
                    <a href="tel:+6328521361" className="block text-blue-600 hover:underline">(632) 8521-3361</a>
                  </div>
                  <div className="space-y-1">
                    <a href="mailto:recruitment@naess.com.ph" className="block text-blue-600 hover:underline">recruitment@naess.com.ph</a>
                    <a href="mailto:mail@naess.com.ph" className="block text-blue-600 hover:underline">mail@naess.com.ph</a>
                  </div>
                </div>
              </div>
            </div>

            {/* Navigation Section */}
            <div className="border border-gray-200 rounded-md overflow-hidden">
              <button 
                onClick={() => toggleSection('navigation')}
                className="w-full px-4 py-3 flex justify-between items-center bg-gray-50 hover:bg-gray-100"
                aria-expanded={expandedSection === 'navigation'}
              >
                <h2 className="font-semibold text-left">NAVIGATIONS</h2>
                <svg className={`w-5 h-5 transition-transform ${expandedSection === 'navigation' ? 'rotate-180' : ''}`} 
                  fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              <div className={`${expandedSection === 'navigation' ? 'max-h-64' : 'max-h-0'} transition-all duration-300 overflow-hidden`}>
                <nav className="px-4 py-2 space-y-2" aria-label="Main navigation">
                  <a href="/" className="block text-blue-600 hover:underline">Home</a>
                  <a href="/careers" className="block text-blue-600 hover:underline">Careers</a>
                  <a href="/about-us" className="block text-blue-600 hover:underline">About Us</a>
                  <a href="/services" className="block text-blue-600 hover:underline">Services</a>
                  <a href="/our-clients" className="block text-blue-600 hover:underline">Our Clients</a>
                  <a href="/news" className="block text-blue-600 hover:underline">News</a>
                  <a href="/contact-us" className="block text-blue-600 hover:underline">Contact Us</a>
                </nav>
              </div>
            </div>
          </div>

          {/* Login Button */}
          <div className="flex justify-center mb-8">
            <a 
              href="/login" 
              className="btn border border-gray-800 text-white font-bold uppercase px-8 py-2 rounded bg-[#1A384F]"
              aria-label="Principals login"
            >
              Principals Login
            </a>
          </div>

          {/* Social Media */}
          <div className="mb-8">
            <h2 className="text-center font-semibold mb-4">SOCIAL MEDIA</h2>
            <div className="flex justify-center space-x-4">
              <a href="https://facebook.com/naessshipping" aria-label="Follow us on Facebook" className="text-blue-600 hover:text-blue-800">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18.77 7.46H14.5v-1.9c0-.9.6-1.1 1-1.1h3V.5h-4.33C10.24.5 9.5 3.44 9.5 5.32v2.15h-3v4h3v12h5v-12h3.85l.42-4z"/>
                </svg>
              </a>
              <a href="https://instagram.com/naessshipping" aria-label="Follow us on Instagram" className="text-pink-600 hover:text-pink-800">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.332.014 7.052.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
                </svg>
              </a>
              <a href="https://linkedin.com/company/naessshipping" aria-label="Follow us on LinkedIn" className="text-blue-800 hover:text-blue-900">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M4.98 3.5C4.98 4.881 3.87 6 2.5 6S.02 4.881.02 3.5C.02 2.12 1.13 1 2.5 1s2.48 1.12 2.48 2.5zM5 8H0v16h5V8zm7.982 0H8.014v16h4.969v-8.399c0-4.67 6.029-5.052 6.029 0V24H24V13.869c0-7.88-8.922-7.593-11.018-3.714V8z"/>
                </svg>
              </a>
              <a href="https://tiktok.com/@naessshipping" aria-label="Follow us on TikTok" className="text-gray-800 hover:text-gray-900">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12.53.02C13.84 0 15.14.01 16.44 0c.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/>
                </svg>
              </a>
            </div>
          </div>
        </div>

        {/* Copyright and Legal */}
        <div className="border-t border-black pt-4 lg:flex justify-between items-center">
          <p className="text-gray-600 text-sm text-center mb-4">
            © {currentYear} NAESS SHIPPING PHILIPPINES, INC. All rights reserved.
          </p>
          <div className="flex flex-wrap justify-center gap-4 text-sm">
            <a href="/privacy-policy" className="text-gray-600 hover:text-gray-900">Privacy Policy</a>
            <a href="/terms-of-service" className="text-gray-600 hover:text-gray-900">Terms of Service</a>
            <button 
              type="button" 
              className="text-gray-600 hover:text-gray-900"
              onClick={() => alert('Cookie settings opened')}
            >
              Cookies Settings
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

// import { AiFillTikTok, AiFillFacebook, AiFillInstagram, AiFillLinkedin } from "react-icons/ai";
// import { FaLocationDot, FaPhone, FaRegEnvelope } from "react-icons/fa6";

// export default function Footer() {
//   return(
//     <footer className="w-full h-[512px] bg-white p-[40px] flex flex-col ">
      // <section className="px-[40px] flex-1 flex flex-row justify-between gap-40">
      //   {/* FIRST COLUMN */}
      //   <section className="flex-1 flex flex-col gap-8">
      //     <figure>
      //       <img src="/images/naess-logo-black.png" alt="Naess Shipping Philippines Logo" />
      //       <figcaption className="hidden">Naess Shipping Philippines Inc. Icon</figcaption>
      //     </figure>
      //     <header>
      //       <h2 className="italic text-[20px]">"Navigation through new direction"</h2>
      //     </header>
      //   </section>
      //   {/* SECOND COLUMN */}
      //   <section className="flex flex-col gap-20">
      //     <article className="flex flex-col gap-4">
      //       <h1 className="font-bold text-[16px] uppercase">Social Media</h1>
      //       <ul className="flex flex-row gap-4">
      //         <li>
      //           <AiFillTikTok size={32} className="cursor-pointer transition duration-200 active:scale-95" />
      //         </li>
      //         <li>
      //           <AiFillFacebook size={32} className="cursor-pointer transition duration-200 active:scale-95" />
      //         </li>
      //         <li>
      //           <AiFillInstagram size={32} className="cursor-pointer transition duration-200 active:scale-95" />
      //         </li>
      //         <li>
      //           <AiFillLinkedin size={32} className="cursor-pointer transition duration-200 active:scale-95" />
      //         </li>
      //       </ul>
      //     </article>
      //     <button type="button" role="button" className="uppercase w-[200px] h-[40px] bg-transparent border-2 border-black rounded-sm font-bold cursor-pointer transition duration-200 hover:bg-[#1A384F] hover:text-white hover:border-[#1A384F] active:scale-95">principals log-in</button>
      //   </section>
      //   {/* THIRD COLUMN */}
      //   <section className="flex flex-col gap-8">
      //     <h2 className="uppercase font-bold text-[16px]">Contacts</h2>
      //     <article className="relative">
      //       <h3 className="hidden">Address</h3>
      //       <FaLocationDot color="#1A384F" size={20} className="absolute -left-8 top-1" />
      //       <p className="text-[16px]">2215 Leon Guinto St,<br />Malate, Manila<br />1004 Metro Manila</p>
      //     </article>
      //     <article className="relative">
      //       <h3 className="hidden">Phone Numbers</h3>
      //       <FaPhone color="#1A384F" size={20} className="absolute -left-8 top-1" />
      //       <p className="text-[16px]">+63 961-876-3109</p>
      //       <p className="text-[16px]">(632) 8521-3361</p>
      //     </article>
      //     <article className="relative">
      //       <h3 className="hidden">Email Address</h3>
      //       <FaAt color="#1A384F" size={20} className="absolute -left-8 top-1" />
      //       <p className="text-[16px]">recruitment@naess.com.ph</p>
      //       <p className="text-[16px]">main@naess.com.ph</p>
      //     </article>
      //   </section>
      //   {/* FOURTH COLUMN */}
      //   <section className="flex flex-col gap-8">
      //     <h3 className="uppercase font-bold text-[16px]">Navigations</h3>
      //     <ul className="flex flex-col gap-4 items-start">
      //       <li>
      //         <a href="#" className="underline cursor-pointer">Home</a>
      //       </li>
      //       <li>
      //         <a href="#" className="underline cursor-pointer">Careers</a>
      //       </li>
      //       <li>
      //         <a href="#" className="underline cursor-pointer">About Us</a>
      //       </li>
      //       <li>
      //         <a href="#" className="underline cursor-pointer">Services</a>
      //       </li>
      //       <li>
      //         <a href="#" className="underline cursor-pointer">Our Clients</a>
      //       </li>
      //       <li>
      //         <a href="#" className="underline cursor-pointer">News</a>
      //       </li>
      //       <li>
      //         <a href="#" className="underline cursor-pointer">Contact Us</a>
      //       </li>
      //     </ul>
      //   </section>
      // </section>
//       {/* BOTTOM LINE */}
//       <section className="h-[40px] w-full flex flex-row justify-between items-center border-t-2 border-black">
//         <p className="text-[14px]">© 2025 NAESS SHIPPING PHILIPPINES, INC. All rights reserved.</p>
//         <ul className="flex flex-row gap-4">
//           <li>
//             <a href="#" className="text-black text-[14px] underline">Privacy Policy</a>
//           </li>
//           <li>
//             <a href="#" className="text-black text-[14px] underline">Terms of Service</a>
//           </li>
//           <li>
//             <a href="#" className="text-black text-[14px] underline">Cookies Settings</a>
//           </li>
//         </ul>
//       </section>
//     </footer>
//   );
// }