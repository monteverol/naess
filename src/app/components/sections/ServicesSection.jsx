import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function ServicesSection() {
  const router = useRouter();

  const items = [
    { title: 'Recruitment', image: '/images/home/services/background/recruitment-bg.png', logo: '/images/home/services/icon/recruitment.png' },
    { title: 'Production', image: '/images/home/services/background/production-bg.webp', logo: '/images/home/services/icon/production.png' },
    { title: 'Installation', image: '/images/home/services/background/installation-bg.webp', logo: '/images/home/services/icon/installation.png' },
    { title: 'Onboard Procedures', image: '/images/home/services/background/onboarding-bg.webp', logo: '/images/home/services/icon/onboarding.png' },
    { title: 'SMAS Crewing System', image: '/images/home/services/background/crewingSystem-bg.jpg', logo: '/images/home/services/icon/smas.png' },
    { title: 'Post Contact Activities', image: '/images/home/services/background/activity-bg.jpg', logo: '/images/home/services/icon/activity.png' },
  ];

  const [bgImage, setBgImage] = useState(items[0].image);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768); // md breakpoint
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  return (
    <div className="h-auto section bg-white flex flex-col gap-[40px] justify-center border-t-[20px] border-[#346EA0]">
      <article className="flex flex-col gap-[40px]">
        <header className="flex flex-col gap-[16px]">
          <h1 className="section-heading mb-8">Our Services</h1>
          <p className="text-[18px] w-full md:w-[550px]">NAESS Shipping offers top-tier maritime recruitment, crewing, and management services to ensure efficient sea operations, handling everything from crew selection to post-contract support.</p>
        </header>

        {/* Mobile View: Carousel */}
        {isMobile ? (
          <div className="flex gap-4 overflow-x-auto pb-2 -mx-2 px-2 snap-mandatory snap-x">
            {items.map((item, index) => (
              <div
                key={index}
                className="snap-center flex-shrink-0 w-[400px] h-[400px] flex flex-col items-center justify-center gap-4 rounded-lg bg-cover bg-center drop-shadow-md text-white cursor-pointer"
                style={{ background: `linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.5)), url(${item.image})` }}
              >
                <img src={item.logo} alt={`${item.title} logo`} className="w-[60px] h-[60px]" />
                <span className="text-2xl font-bold w-[220px] text-center">{item.title}</span>
              </div>
            ))}
          </div>
        ) : (
          // Desktop View: Grid
          <div
            className="w-full md:h-[480px] rounded-lg p-2 grid md:grid-cols-2 lg:grid-cols-3 gap-2"
            style={{
              background: `
                linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.5)), url('${bgImage}')
                no-repeat center/cover
              `
            }}
          >
            {items.map((item, index) => (
              <div
                key={index}
                onMouseEnter={() => setBgImage(item.image)}
                className="flex flex-col items-center justify-center gap-4 rounded-lg cursor-pointer transition-all duration-200 bg-[rgba(0,0,0,0.2)] hover:bg-[rgba(0,0,0,0.5)] text-white"
              >
                <img src={item.logo} alt={`${item.title} logo`} className="w-[60px] h-[60px]" />
                <span className="text-2xl font-bold w-[220px] text-center">{item.title}</span>
              </div>
            ))}
          </div>
        )}
      </article>

      <button 
        onClick={() => router.push('/services')}
        className="w-[232px] h-[52px] rounded-[8px] font-semibold text-[20px] text-black border-2 border-[#101112] cursor-pointer transition duration-200 active:scale-95 after:content-['>'] after:ml-4" type="button" role="button"
      >
        See Services
      </button>
    </div>
  );
}
