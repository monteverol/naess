import Image from "next/image";

export default function HighlightSection() {
  return(
    <div 
      className="h-auto px-8 lg:px-20 xl:px-40 py-8 flex flex-col items-center justify-center"
      style={{
        backgroundImage: "linear-gradient(rgba(52, 110, 160, 0.8), rgba(52, 110, 160, 0.8)), url(/images/highlight-img.png)",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundAttachment: "fixed",
      }}
    >
      <article className="w-full flex flex-col gap-[60px]">
        <header className="flex flex-col gap-[8px]">
          <h2 className="text-[40px] font-bold text-white">Facts about NAESS</h2>
          <p className="text-[18px] text-white">Great facts that define Naess' excellence in maritime service.</p>
        </header>
        <section className="flex flex-col items-center md:flex-row justify-between md:items-start gap-8">
          <article className="w-[240px] flex flex-col gap-[8px] items-center">
            <Image src="/images/home/facts/badge.png" alt="Badge Icon" width={100} height={100} />
            <h3 className="text-[24px] font-bold text-white text-center">40+ Years of Excellence</h3>
          </article>
          <article className="w-[240px] flex flex-col gap-[8px] items-center">
            <Image src="/images/home/facts/crew.png" alt="Badge Icon" width={100} height={100} />
            <h3 className="text-[24px] font-bold text-white text-center w-[75%]">95% Crew Retention Rate</h3>
          </article>
          <article className="w-[240px] flex flex-col gap-[8px] items-center">
            <Image src="/images/home/facts/contract.png" alt="Badge Icon" width={100} height={100} />
            <h3 className="text-[24px] font-bold text-white text-center">99% Completed Crew Contract</h3>
          </article>
          <article className="w-[240px] flex flex-col gap-[8px] items-center">
            <Image src="/images/home/facts/verified.png" alt="Badge Icon" width={100} height={100} />
            <h3 className="text-[24px] font-bold text-white text-center">ISO 9001-2000 Certified</h3>
          </article>
        </section>
      </article>
    </div>
  );
}