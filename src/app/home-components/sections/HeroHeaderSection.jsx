import Carousel from "../ui/Carousel";

export default function HeroHeaderSection({ carouselItems }) {
  return(
    <section 
      className="relative h-screen w-full flex flex-col"
    >
      <Carousel items={carouselItems} />
      <header className="absolute left-1/2 -translate-x-1/2 md:translate-x-0 md:left-40 lg:left-60 xl:left-80 bottom-80 md:bottom-60 flex flex-col gap-[20px] h-auto px-4 md:px-0 text-center md:text-start">
        <h2 className="text-[56px] text-white font-semibold uppercase w-full lg:w-[760px]">Navigating Excellence Since 1980</h2>
        <p className="text-[24px] text-white h-auto w-full md:w-[527px]">Serving the global maritime industry with world-class crewing and management services.</p>
      </header>
    </section>
  );
}