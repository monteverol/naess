import React, { useEffect, useRef, useState } from 'react';

const HistorySection = ({ milestones }) => {
  const sectionRef = useRef(null);
  const [visibleItems, setVisibleItems] = useState(3);
  const [isLoading, setIsLoading] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;
      
      const elements = sectionRef.current.querySelectorAll('.milestone-card');
      const timelineElements = sectionRef.current.querySelectorAll('.timeline-dot');
      
      elements.forEach((el, index) => {
        const rect = el.getBoundingClientRect();
        const isVisible = rect.top < window.innerHeight * 0.85 && rect.bottom > 0;
        
        if (isVisible) {
          el.classList.add('opacity-100', 'translate-y-0');
          el.classList.remove('opacity-0', 'translate-y-8');
          
          if (timelineElements[index]) {
            timelineElements[index].classList.add('scale-110', 'bg-[#1A384F]', 'shadow-lg');
            timelineElements[index].classList.remove('bg-white');
          }
        }
      });
    };
    
    window.addEventListener('scroll', handleScroll);
    // Trigger once on load
    setTimeout(handleScroll, 100);
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, [visibleItems]); // Add visibleItems to dependency array to trigger effect when items change
  
  const loadMore = () => {
    setIsLoading(true);
    // Simulate loading delay
    setTimeout(() => {
      setVisibleItems(prev => Math.min(prev + 5, milestones.length));
      setIsLoading(false);
    }, 500);
  };
  
  const visibleMilestones = milestones.slice(0, visibleItems);
  
  return (
    <section 
      id="history" 
      ref={sectionRef}
      className="py-16 px-4 lg:px-20 xl:px-40 relative bg-gradient-to-b from-white to-blue-50"
    >
      {/* SEO-friendly semantic structure */}
      <div className="container mx-auto" itemScope itemType="https://schema.org/Organization">
        <meta itemProp="name" content="Maritime Shipping and Manpower Agency" />
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-3 text-[#1A384F]" itemProp="description">Our Maritime Journey</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Navigating through decades of excellence in maritime shipping and manpower services.
          </p>
        </div>
        
        {/* Decorative elements */}
        <div className="absolute inset-0 overflow-hidden opacity-10 pointer-events-none">
          <div className="absolute -right-24 top-1/4 w-96 h-96 rounded-full bg-blue-200"></div>
          <div className="absolute -left-24 top-3/4 w-64 h-64 rounded-full bg-blue-200"></div>
        </div>
        
        {/* Timeline content */}
        <div className="relative z-10 max-w-4xl mx-auto" itemProp="foundingDate">
          {visibleMilestones.map((milestone, index) => (
            <div key={index} className="flex mb-16 last:mb-0">
              <div className="flex flex-col items-center mr-6">
                <div className={`timeline-dot w-20 h-12 rounded-full bg-white flex items-center justify-center 
                  text-white font-bold transition-all duration-700 transform`}>
                  {milestone.year}
                </div>
                {index < visibleMilestones.length - 1 && (
                  <div className="h-full w-0.5 bg-gradient-to-b from-[#1A384F] to-blue-200 my-2"></div>
                )}
              </div>
              
              <div 
                className={`milestone-card bg-white rounded-lg shadow-lg p-6 flex-1 transition-all
                  duration-300 transform opacity-0 translate-y-8 hover:shadow-xl
                  border-l-4 border-[#1A384F] hover:border-l-12 hover:rounded-l-none`}
              >
                <div className="font-bold text-xl text-[#1A384F] mb-2">{milestone.title}</div>
                {milestone.description && (
                  <div className="text-gray-700">{milestone.description}</div>
                )}
              </div>
            </div>
          ))}
        </div>
        
        {/* Load More button */}
        {visibleItems < milestones.length && (
          <div className="text-center mt-8">
            <button 
              onClick={loadMore}
              disabled={isLoading}
              className={`px-6 py-3 bg-[#1A384F] text-white rounded-lg shadow-md hover:bg-[#2C5777] transition-colors btn
                ${isLoading ? 'opacity-70 cursor-not-allowed' : ''}`}
            >
              {isLoading ? 'Loading...' : 'Load More'}
            </button>
          </div>
        )}
        
        {/* Call to action */}
        <div className="text-center mt-12">
          <p className="text-gray-600 italic">Charting the course for maritime excellence since our inception</p>
        </div>
      </div>
    </section>
  );
};

export default HistorySection;