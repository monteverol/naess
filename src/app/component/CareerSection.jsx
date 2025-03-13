export default function CareerSection() {
  return(
    <div className="w-full h-[400px] flex items-center justify-center">
      <article className="w-[800px] h-[260px] flex flex-col bg-[#FAFAFA] drop-shadow-lg rounded-[8px] gap-[40px] p-8 transition duration-200 hover:scale-105 hover:drop-shadow-xl">
        <section className="flex flex-col gap-[4px]">
          <h1 className="text-[40px] font-bold text-center">Apply For Jobs</h1>
          <p className="text-[18px] text-center">Looking for your next opportunity at sea? Explore our job openings and apply today!</p>
        </section>
        <div className="flex flex-row gap-[40px] w-full items-center justify-center">
          <button type="button" role="button" className="bg-[#264D6C] w-[260px] h-[52px] rounded-[8px] font-bold text-white text-[20px] cursor-pointer transition duration-200 active:scale-95">
            View Job Openings
          </button>
          <button type="button" role="button" className="bg-white border-2 border-[#264D6C] w-[260px] h-[52px] rounded-[8px] font-bold text-[#264D6C] text-[20px] cursor-pointer transition duration-200 active:scale-95">
            Apply Now
          </button>
        </div>
      </article>
    </div>
  );
}