export default function AboutSection() {
  return(
    <div className="h-[576px] bg-white flex items-center justify-center">
      <article className="px-[168px] flex flex-row w-full gap-[200px]">
        <article className="flex flex-col gap-[60px]">
          <section className="flex flex-col gap-[16px]">
            <h1 className="font-bold text-[40px]">About NAESS</h1>
            <p className="text-[18px] w-[550px]">
              Established in 1980, NAESS Shipping Philippines, Inc. is a 100% Filipino-owned ship manning and management agency. With a legacy of excellence and integrity, we provide world-class maritime crewing solutions, ensuring the success of both seafarers and global shipping partners.
            </p>
          </section>
          <button type="button" role="button" className="w-[260px] h-[52px] bg-[#264D6C] text-white font-semibold rounded-[8px] cursor-pointer transition duration-200 active:scale-95">
            Learn More
          </button>
        </article> 
        <figure className="relative">
          <div className="bg-[#D9D9D9] drop-shadow-lg w-[360px] h-[320px] rounded-[8px]"></div>
          <div className="z-10 bg-[#D9D9D9] drop-shadow-lg w-[220px] h-[160px] absolute left-full -translate-x-1/2 -translate-y-1/2 rounded-[8px]"></div>
        </figure>
      </article>
    </div>
  );
}