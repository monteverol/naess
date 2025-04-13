import { useRouter } from "next/navigation";

export default function CareerSection() {
  const router = useRouter();

  return(
    <div className="bg-[#F0F3F5] w-full h-auto section flex items-center justify-center">
      <article className="w-full h-auto md:h-[260px] flex flex-col bg-[#FAFAFA] md:border-2 md:border-black drop-shadow-lg rounded-[8px] gap-[40px] p-8 transition-all duration-200 hover:drop-shadow-xl">
        <section className="flex flex-col gap-[4px]">
          <h1 className="text-2xl lg:text-[40px] font-bold text-center">Apply Now at NAESS</h1>
          <p className="text-[18px] text-center">Looking for your next opportunity at sea? Explore our job openings and apply today!</p>
        </section>
        <div className="flex flex-col md:flex-row gap-4 md:gap-[40px] w-full items-center justify-center">
          <button 
            type="button" 
            role="button" 
            onClick={() => router.push('/careers')}
            className="bg-[#264D6C] w-[260px] h-[52px] rounded-[8px] font-bold text-white text-[20px] cursor-pointer transition duration-200 active:scale-95"
          >
            See Available Jobs
          </button>
          <button 
            type="button" 
            role="button" 
            onClick={() => router.push('/careers#job-openings')}
            className="bg-white border-2 border-[#264D6C] w-[260px] h-[52px] rounded-[8px] font-bold text-[#264D6C] text-[20px] cursor-pointer transition duration-200 active:scale-95"
          >
            Apply Now
          </button>
        </div>
      </article>
    </div>
  );
}