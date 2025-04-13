export default function CertificateSection() {
  return(
    <section className="h-auto w-full bg-white section flex flex-col justify-center gap-[54px]">
      <article className="flex flex-col gap-[60px]">
        {/* <h1 className="text-[24px] font-bold home-heading">Accreditation and Certificates</h1> */}
        <h1 className="section-heading">Our Recognitions</h1>
        <p className="text-[18px] w-[534px]">Recognized for excellence, certified for quality—our accreditations speak for our commitment to global standards.</p>
      </article>
      <ul className="flex flex-col md:flex-row gap-8 md:gap-[80px]">
        <li className="border-black border-2 p-4 rounded-lg grid items-center justify-center">
          <img src="/images/dmw.png" alt="Department of Migrant Workers Logo" />
        </li>
        <li className="border-black border-2 p-4 rounded-lg grid items-center justify-center">
          <img src="/images/iso9001.png" alt="ISO 9001 Quality System Certification Logo" />
        </li>
        <li className="border-black border-2 p-4 rounded-lg grid items-center justify-center">
          <img src="/images/marina.png" alt="Republic of the Philippines Maritime Industry Authority MARINA Logo" />
        </li>
      </ul>
    </section>
  );
}