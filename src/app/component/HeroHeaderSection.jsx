
export default function HeroHeaderSection() {
  return(
    <section 
      className="relative h-screen w-full flex flex-col"
      style={{
        backgroundImage: "url(/images/omegagas-ship.png)",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundAttachment: "fixed",
      }}
    >
      <div className="w-full flex-1 bg-transparent"></div>
      <header className="bg-white flex flex-col gap-[20px] h-40 w-full">
        <h2 className="text-[20px] text-black font-semibold uppercase">Navigating Excellence Since 1980</h2>
        <p className="text-[16px] text-black">Serving the global maritime industry with world-class crewing and management services.</p>
      </header>
    </section>
  );
}