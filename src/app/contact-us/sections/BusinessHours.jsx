import React from 'react';

const BusinessHours = () => {
  const hoursData = [
    { day: 'Monday', hours: '6:00 AM - 7:00 PM' },
    { day: 'Tuesday', hours: '6:00 AM - 7:00 PM' },
    { day: 'Wednesday', hours: '6:00 AM - 7:00 PM' },
    { day: 'Thursday', hours: '6:00 AM - 7:00 PM' },
    { day: 'Friday', hours: '6:00 AM - 7:00 PM' }
  ];

  return (
    <div className="flex flex-col lg:items-center lg:flex-row gap-8 lg:px-20 xl:px-40 bg-[#1A384F] text-white p-8 h-screen w-full drop-shadow-[0_-4px_8px_rgba(0,0,0,0.25)]">
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
          </div>
          
          <div className="space-y-2">
            {hoursData.map((item) => (
              <div 
                key={item.day}
                className={`border border-slate-600 bg-slate-800 rounded-lg overflow-hidden`}
              >
                <div className="flex justify-between items-center p-3 cursor-pointer">
                  <span className="font-medium">{item.day}</span>
                  <div className="flex items-center">
                    <span className="text-sm text-slate-300 mr-2">{item.hours}</span>
                  </div>
                </div>
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