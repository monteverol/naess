
export default function HighlightSection() {
  return(
    <div 
      className="px-[168px] flex flex-col items-center justify-center"
      style={{
        backgroundImage: "linear-gradient(rgba(38, 77, 108, 0.7), rgba(38, 77, 108, 0.6)), url(/images/highlight-img.png)",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundAttachment: "fixed",
        height: "400px",
      }}
    >
      <article className="w-full flex flex-col gap-[60px]">
        <header className="flex flex-col gap-[8px]">
          <h1 className="text-[40px] font-bold text-white">Facts about NAESS</h1>
          <p className="text-[18px] text-white">This is NAESS – built on excellence, trust, and quality service.</p>
        </header>
        <section className="flex flex-row justify-between items-start">
          <article className="w-[240px] flex flex-col gap-[8px] items-center">
            <h1 className="text-[24px] font-bold text-white text-center">40+ Years of Maritime Excellence</h1>
            <p className="text-[18px] text-white text-center">Delivering world-class crewing services since 1980.</p>
          </article>
          <article className="w-[240px] flex flex-col gap-[8px] items-center">
            <h1 className="text-[24px] font-bold text-white text-center">95% Crew Retention Rate</h1>
            <p className="text-[18px] text-white text-center">Ensuring long-term success for seafarers and clients.</p>
          </article>
          <article className="w-[240px] flex flex-col gap-[8px] items-center">
            <h1 className="text-[24px] font-bold text-white text-center">Global Network of Principals</h1>
            <p className="text-[18px] text-white text-center">Trusted by leading international shipping companies.</p>
          </article>
          <article className="w-[240px] flex flex-col gap-[8px] items-center">
            <h1 className="text-[24px] font-bold text-white text-center">ISO 9001-2000 Certified</h1>
            <p className="text-[18px] text-white text-center">Committed to the highest standards of quality management.</p>
          </article>
        </section>
      </article>
    </div>
  );
}