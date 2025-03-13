export default function CertificateSection() {
  return(
    <section className="h-[400px] w-full bg-white px-[168px] flex flex-col justify-center gap-[24px]">
      <article className="flex flex-col">
        <h1 className="text-[24px] font-bold">Accreditation and Certificates</h1>
        <p className="text-[18px]">Recognized for Excellence - Our Accreditations & Certifications</p>
      </article>
      <ul className="flex flex-row gap-[120px]">
        <li>
          <img src="/images/dmw.png" alt="Department of Migrant Workers Logo" />
        </li>
        <li>
          <img src="/images/iso9001.png" alt="ISO 9001 Quality System Certification Logo" />
        </li>
        <li>
          <img src="/images/marina.png" alt="Republic of the Philippines Maritime Industry Authority MARINA Logo" />
        </li>
      </ul>
    </section>
  );
}