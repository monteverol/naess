export default function CTASection() {
  return(
    <section className="bg-[#264D6C] w-full h-[416px] px-[160px] flex flex-row justify-between items-center">
      <article className="flex flex-col gap-[40px] w-[532px]">
        <h1 className="text-[48px] font-bold text-white">Get in Touch with Us</h1>
        <p className="text-[20px] text-white">Reach out today to learn more about our services and how we can assist you.</p>
        <section className="flex flex-row gap-[36px]">
          <button type="button" role="button" className="bg-[#B3D2F4] text-[#1A384F] text-[20px] w-[140px] h-[60px] rounded-[4px] transition duration-200 active:scale-95 cursor-pointer">Inquire</button>
          <button type="button" role="button" className="bg-transparent border-2 border-[#B3D2F4] text-[#B3D2F4] text-[20px] w-[140px] h-[60px] rounded-[4px] transition duration-200 active:scale-95 cursor-pointer">Contact</button>
        </section>
      </article>
      <figure className="w-[400px] h-[280px] bg-[#B3D2F4] rounded-[20px]">

      </figure>
    </section>
  );
}