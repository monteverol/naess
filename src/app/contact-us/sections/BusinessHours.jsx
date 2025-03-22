import React, { useState } from 'react';

const BusinessHours = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [selectedDay, setSelectedDay] = useState(null);
  
  const hoursData = [
    { day: 'Monday', hours: '6:00 AM - 7:00 PM' },
    { day: 'Tuesday', hours: '6:00 AM - 7:00 PM' },
    { day: 'Wednesday', hours: '6:00 AM - 7:00 PM' },
    { day: 'Thursday', hours: '6:00 AM - 7:00 PM' },
    { day: 'Friday', hours: '6:00 AM - 7:00 PM' }
  ];

  const toggleExpand = () => setIsExpanded(!isExpanded);
  
  const selectDay = (day) => {
    setSelectedDay(day === selectedDay ? null : day);
  };

  return (
    <div className="snap-start flex flex-col lg:items-center lg:flex-row gap-8 lg:px-20 xl:px-40 z-40 bg-[#1A384F] text-white p-8 rounded-t-3xl h-screen w-full drop-shadow-[0_-4px_8px_rgba(0,0,0,0.25)]">
      <div className="mt-16">
        <h1 className="text-4xl font-bold mb-2">We're Here for You,<br />Stop By Anytime</h1>
        <p className="text-lg lg:w-2/3">
          Have questions or need assistance? Our team is here to help you every step of the way.
        </p>
      </div>
      
      <div className="flex flex-col lg:mt-16 lg:w-1/2">
        <div className="mb-6">
          <div className="flex justify-between items-center mb-2">
            <h2 className="text-xl font-semibold">Business Hours</h2>
            <button 
              onClick={toggleExpand}
              className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded-full text-sm transition-colors"
            >
              {isExpanded ? 'Collapse' : 'Expand All'}
            </button>
          </div>
          
          <div className="space-y-2">
            {hoursData.map((item) => (
              <div 
                key={item.day}
                className={`border border-slate-600 rounded-lg overflow-hidden transition-all duration-300 ${
                  selectedDay === item.day || isExpanded ? 'bg-slate-700' : 'bg-slate-800'
                }`}
              >
                <div 
                  className="flex justify-between items-center p-3 cursor-pointer"
                  onClick={() => selectDay(item.day)}
                >
                  <span className="font-medium">{item.day}</span>
                  <div className="flex items-center">
                    {!(selectedDay === item.day || isExpanded) && (
                      <span className="text-sm text-slate-300 mr-2">{item.hours}</span>
                    )}
                    <svg 
                      className={`w-4 h-4 transition-transform duration-300 ${
                        selectedDay === item.day || isExpanded ? 'rotate-180' : ''
                      }`} 
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>
                
                {(selectedDay === item.day || isExpanded) && (
                  <div className="p-3 pt-0 bg-slate-700 text-slate-200">
                    <div className="flex justify-between border-t border-slate-600 pt-2">
                      <span>Hours:</span>
                      <span className="font-medium">{item.hours}</span>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
        
        <div className="bg-slate-700 p-4 rounded-lg mt-4 text-sm">
          <p className="text-slate-200">
            <span className="font-semibold">Note:</span> We may be unable to accommodate requests between 12:00 PM and 1:00 PM as this time is designated for the company's health break. Thank you for your understanding.
          </p>
        </div>
      </div>
    </div>
  );
};

export default BusinessHours;