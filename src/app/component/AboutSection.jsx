import Image from "next/image";

export default function AboutSection() {
  return(
    <div className="h-[576px] bg-white flex items-center justify-center">
      <article className="px-[168px] flex flex-row w-full justify-between">
        <article className="flex flex-col gap-[60px]">
          <section className="flex flex-col gap-[16px]">
            <h1 className="font-bold text-[40px] home-heading mb-8">About NAESS</h1>
            <p className="text-[18px] w-[550px]">
              Established in 1980, NAESS Shipping Philippines, Inc. is a 100% Filipino-owned ship manning and management agency. With a legacy of excellence and integrity, we provide world-class maritime crewing solutions, ensuring the success of both seafarers and global shipping partners.
            </p>
          </section>
          <button type="button" role="button" className="w-[260px] h-[52px] bg-[#346EA0] text-white font-semibold rounded-[8px] cursor-pointer transition duration-200 active:scale-95">
            Learn More
          </button>
        </article> 
        <figure className="relative">
          <Image
            src="/images/home/home-ship-image.jpg"
            width={500}
            height={320}
            className="rounded-xl drop-shadow-md"
            alt="Ship image"
            loading="lazy"
          />
        </figure>
      </article>
    </div>
  );
}