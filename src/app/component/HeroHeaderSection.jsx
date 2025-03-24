import Carousel from "./Carousel";

export default function HeroHeaderSection({ carouselItems }) {
  return(
    <section 
      className="relative h-screen w-full flex flex-col"
    >
      <Carousel items={carouselItems} />
      <header className="absolute left-80 bottom-60  flex flex-col gap-[20px] h-40 w-full">
        <h2 className="text-[40px] text-white font-semibold uppercase w-[564px]">Navigating Excellence Since 1980</h2>
        <p className="text-[20px] text-white w-[527px]">Serving the global maritime industry with world-class crewing and management services.</p>
      </header>
    </section>
  );
}