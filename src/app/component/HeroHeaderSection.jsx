
export default function HeroHeaderSection() {
  return(
    <div 
      className="relative h-screen w-screen"
      style={{
        backgroundImage: "linear-gradient(rgba(0, 0, 0, 0.9), rgba(0, 0, 0, 0.3)), url(/images/omegagas-ship.png)",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundAttachment: "fixed",
      }}
    >
      <header className="absolute left-[168px] bottom-[268px] flex flex-col gap-[20px] w-[620px]">
        <h2 className="text-[48px] text-white font-semibold uppercase">Navigating Excellence Since 1980</h2>
        <p className="text-[20px] text-white">Serving the global maritime industry with world-class crewing and management services.</p>
      </header>
    </div>
  );
}