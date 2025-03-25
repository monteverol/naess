import { useState } from "react";

export default function ServicesSection() {
  const items = [
    { title: 'Recruitment', image: '/images/home/services/recruitment-bg.png', logo: '/images/home/services/icon/recruitment.png' },
    { title: 'Production', image: '/images/home/services/production-bg.webp', logo: '/images/home/services/icon/production.png' },
    { title: 'Installation', image: '/images/home/services/installation-bg.webp', logo: '/images/home/services/icon/installation.png' },
    { title: 'Onboard Procedures', image: '/images/home/services/onboarding-bg.webp', logo: '/images/home/services/icon/onboarding.png' },
    { title: 'SMAS Crewing System', image: '/images/home/services/crewingSystem-bg.jpg', logo: '/images/home/services/icon/smas.png' },
    { title: 'Post Contact Activities', image: '/images/home/services/activity-bg.jpeg', logo: '/images/home/services/icon/activity.png' },
  ];
  const [bgImage, setBgImage] = useState(items[0].image);

  return(
    <div className="h-[896px] bg-white flex flex-col px-[168px] gap-[40px] justify-center border-t-[20px] border-[#346EA0]">
      <article className="flex flex-col gap-[40px]">
        <header className="flex flex-col gap-[16px]">
          <h1 className="text-[36px] font-bold font-montserrat home-heading mb-8">Our Services</h1>
          <p className="text-[18px] w-[550px]">NAESS Shipping offers top-tier maritime recruitment, crewing, and management services to ensure efficient sea operations, handling everything from crew selection to post-contract support.</p>
        </header>
        <div 
          className="w-full h-[480px] rounded-lg p-2 grid grid-cols-3 gap-2"
          style={{
            background: `
              linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.5)), url('${bgImage}')
              no-repeat
              center/cover
            `
          }}
        >
          {
            items.map((item, index) => (
              <div 
                key={index}
                onMouseEnter={() => setBgImage(item.image)}
                className="flex flex-col items-center justify-center gap-4 rounded-lg bg-[rgba(0,0,0,0.2)] cursor-pointer transition-all duration-200 hover:bg-[rgba(0,0,0,0.5)]"
              >
                <img src={item.logo} alt={`${item.title} logo`} className="w-[60px] h-[60px]" />
                <span className="text-white text-2xl font-bold w-[220px] text-center">{item.title}</span>
              </div>
            ))
          }
        </div>
      </article>
      <button className="w-[232px] h-[52px] rounded-[8px] font-semibold text-[20px] text-black border-2 border-[#101112] cursor-pointer transition duration-200 active:scale-95 after:content-['>'] after:ml-4" type="button" role="button">
        See Services
      </button>
    </div>
  );
}