// components/AnnouncementSection.jsx
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Calendar, ChevronLeft, ChevronRight } from 'lucide-react';

const AnnouncementSection = ({ announcements }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [autoplay, setAutoplay] = useState(true);
  const [pauseTimeout, setPauseTimeout] = useState(null);

  // Autoplay functionality
  useEffect(() => {
    if (!autoplay) return;

    const interval = setInterval(() => {
      setActiveIndex((current) => (current + 1) % announcements.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [autoplay, activeIndex, announcements.length]);


  const handlePrevious = () => {
    setAutoplay(false);
    setActiveIndex((current) => (current - 1 + announcements.length) % announcements.length);
    resetAutoplay();
  };

  const handleNext = () => {
    setAutoplay(false);
    setActiveIndex((current) => (current + 1) % announcements.length);
    resetAutoplay();
  };

  const resetAutoplay = () => {
    if (pauseTimeout) clearTimeout(pauseTimeout);

    const timeoutId = setTimeout(() => {
      setAutoplay(true);
    }, 5000);

    setPauseTimeout(timeoutId);
  };

  return (
    <section className="bg-white mb-8">
      <div className="container mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-6xl font-bold text-gray-800 flex items-center header">
            Important Announcements
          </h2>
          <div className="hidden md:flex space-x-2">
            <button 
              onClick={handlePrevious}
              className="p-2 rounded-full bg-white shadow-md hover:bg-blue-50 transition-colors btn"
              aria-label="Previous announcement"
            >
              <ChevronLeft className="w-5 h-5 text-blue-600" />
            </button>
            <button 
              onClick={handleNext}
              className="p-2 rounded-full bg-white shadow-md hover:bg-blue-50 transition-colors btn"
              aria-label="Next announcement"
            >
              <ChevronRight className="w-5 h-5 text-blue-600" />
            </button>
          </div>
        </div>

        <div className="relative overflow-hidden rounded-xl shadow-xl bg-white">
          {/* Announcement Carousel */}
          <div 
            className="flex transition-transform duration-500 ease-in-out"
            style={{ transform: `translateX(-${activeIndex * 100}%)` }}
          >
            {announcements.map((announcement) => (
              <div key={announcement.id} className="w-full flex-shrink-0">
                <div className="flex flex-col md:flex-row h-full">
                  {/* Image Side */}
                  <div className="relative h-56 md:h-full md:w-1/2">
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-900/70 to-slate-800/70 mix-blend-multiply z-10" />
                    <div className="absolute inset-0 flex items-center justify-center z-20">
                      <div className="text-center text-white px-4">
                        <span className="inline-block px-3 py-1 bg-white/20 rounded-full text-sm backdrop-blur-sm mb-3">
                          {announcement.type}
                        </span>
                        <h3 className="text-2xl md:text-3xl font-bold mb-2">{announcement.title}</h3>
                        <div className="flex items-center justify-center text-white/90">
                          <Calendar className="w-4 h-4 mr-1" />
                          <span>{announcement.date}</span>
                        </div>
                      </div>
                    </div>
                    <div className="h-full w-full relative">
                      {/* Replace this div with your Image component once you have actual images */}
                      <div className="absolute inset-0 bg-blue-300"></div>
                    </div>
                  </div>
                  
                  {/* Content Side */}
                  <div className="p-6 md:p-8 md:w-1/2 flex flex-col justify-between">
                    <div>
                      <p className="text-gray-700 text-lg mb-6">
                        {announcement.description}
                      </p>
                      <div className="space-y-4">
                        <div className="flex items-center">
                          <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-600">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                            </svg>
                          </div>
                          <span className="ml-3 text-gray-600">Don't miss this important update</span>
                        </div>
                        
                        <div className="flex items-center">
                          <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-600">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 0 0 2.625.372 9.337 9.337 0 0 0 4.121-.952 4.125 4.125 0 0 0-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 0 1 8.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0 1 11.964-3.07M12 6.375a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0Zm8.25 2.25a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0Z" />
                            </svg>
                          </div>
                          <span className="ml-3 text-gray-600">Relevant for all team members</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="mt-8">
                      <Link href={`/announcements/${announcement.id}`} passHref>
                        <span className="inline-block bg-slate-600 hover:bg-slate-700 text-white font-medium py-3 px-6 rounded-lg transition-colors shadow-md">
                          Learn More
                        </span>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {/* Mobile Navigation Controls */}
          <div className="absolute bottom-4 left-0 right-0 flex justify-center md:hidden">
            <div className="flex space-x-2">
              {announcements.map((_, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setAutoplay(false);
                    setActiveIndex(index);
                    resetAutoplay();
                  }}
                  className={`w-2.5 h-2.5 rounded-full ${
                    activeIndex === index ? 'bg-blue-600' : 'bg-gray-300'
                  }`}
                  aria-label={`Go to announcement ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Announcement List - Visible only on larger screens */}
        <div className="hidden lg:grid grid-cols-3 gap-6 mt-8">
          {announcements.map((announcement, index) => (
            <div 
              key={announcement.id} 
              className={`bg-white p-5 rounded-lg shadow-md cursor-pointer transition-all ${
                activeIndex === index ? 'border-2 border-slate-500 transform -translate-y-1' : 'border border-gray-100'
              }`}
              onClick={() => {
                setAutoplay(false);
                setActiveIndex(index);
                resetAutoplay();
              }}
            >
              <div className="flex justify-between items-start mb-3">
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                  activeIndex === index ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-600'
                }`}>
                  {announcement.type}
                </span>
                <span className="text-sm text-gray-500 flex items-center">
                  <Calendar className="w-3 h-3 mr-1" />
                  {announcement.date}
                </span>
              </div>
              <h4 className="font-semibold text-gray-800 line-clamp-1">{announcement.title}</h4>
              <p className="text-sm text-gray-600 mt-1 line-clamp-2">{announcement.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AnnouncementSection;