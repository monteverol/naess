export default function CTA() {
  return(
    <section className="py-12 section bg-[#1A384F] text-white text-center lg:text-start">
      <div className="section-inner-width">
        <h2 className="text-3xl font-bold mb-4">Ready to Join Our Team?</h2>
        <p className="text-xl mb-8 max-w-lg mx-auto lg:mx-0">
          Discover your next career opportunity and help us build something amazing together.
        </p>
        <a
          href="#job-openings"
          className="inline-block bg-white text-[#1A384F] font-semibold px-6 py-3 rounded-lg hover:bg-blue-50 transition duration-300"
        >
          Browse Open Positions
        </a>
      </div>
    </section>
  );
}