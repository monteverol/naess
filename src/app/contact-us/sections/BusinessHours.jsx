import React, { useEffect, useState } from 'react';

const BusinessHours = () => {
  const hoursData = [
    { day: 'Monday', hours: '6:00 AM - 7:00 PM' },
    { day: 'Tuesday', hours: '6:00 AM - 7:00 PM' },
    { day: 'Wednesday', hours: '6:00 AM - 7:00 PM' },
    { day: 'Thursday', hours: '6:00 AM - 7:00 PM' },
    { day: 'Friday', hours: '6:00 AM - 7:00 PM' }
  ];

  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    // This ensures the map is only rendered on the client-side
    setIsClient(true);
  }, []);

  return (
    <div className="flex flex-col-reverse lg:items-center lg:flex-row gap-8 lg:px-20 xl:px-40 bg-[#1A384F] text-white p-8 h-screen w-full drop-shadow-[0_-4px_8px_rgba(0,0,0,0.25)]">
      {/* Render Google Map only on the client */}
      {isClient && (
        <div className="w-full lg:w-1/2 h-[500px] rounded-lg overflow-hidden shadow-lg">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3857.7422374209686!2d120.99226391535817!3d14.566609081058088!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3397ca1dcb9fa8f5%3A0x7d62df0a45f6a0cf!2s2215%20Leon%20Guinto%20St%2C%20Malate%2C%20Manila%2C%201004%20Metro%20Manila%2C%20Philippines!5e0!3m2!1sen!2sph!4v1616407368804!5m2!1sen!2sph"
            width="100%"
            height="100%"
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      )}
      
      <div className="flex flex-col lg:mt-16 lg:w-1/2">
        <div className="mb-6">
          <div className="mb-8">
            <h1 className="text-5xl font-bold mb-2">We're Here for You, Stop By Anytime</h1>
            <p className="text-lg">
              Have questions or need assistance? Our team is here to help you every step of the way.
            </p>
          </div>
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
