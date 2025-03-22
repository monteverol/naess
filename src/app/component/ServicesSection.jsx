import ServiceItem from "./ServiceItem";

export default function ServicesSection() {
  return(
    <div className="h-[768px] bg-white flex flex-col px-[168px] gap-[60px] justify-center border-t-[20px] border-[#346EA0]">
      <article className="flex flex-col gap-[40px]">
        <header className="flex flex-col gap-[16px]">
          <h1 className="text-[36px] font-bold font-montserrat">Our Services</h1>
          <p className="text-[18px] w-[550px]">NAESS Shipping provides top-tier maritime recruitment, crewing, and management services to ensure efficient operations at sea. </p>
        </header>
        <ul className="flex flex-row gap-[28px]">
          <ServiceItem 
            title="On-Board Procedures" 
            description="Managing seamless onboarding, crew assignments, and operational support for maritime professionals."
          />
          <ServiceItem 
            title="On-Board Procedures" 
            description="Managing seamless onboarding, crew assignments, and operational support for maritime professionals."
          />
          <ServiceItem 
            title="SMAS Crewing System" 
            description="A cutting-edge digital platform for tracking, managing, and optimizing crewing operations in real time."
          />
        </ul>
      </article>
      <button className="w-[260px] h-[56px] bg-[#264D6C] rounded-[8px] font-semibold text-[20px] text-white cursor-pointer transition duration-200 active:scale-95" type="button" role="button">
        View All Services
      </button>
    </div>
  );
}