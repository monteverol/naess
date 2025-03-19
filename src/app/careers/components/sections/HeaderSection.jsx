export default function Header() {
  return(
    <header className="bg-[#1A384F] text-white sticky top-16 -z-10">
      <div className="relative px-4 py-6 mt-16 lg:px-20 xl:px-40">
        <div className="mt-12 mb-16 text-center lg:text-start">
          <h1 className="text-4xl font-bold mb-4">Join Our Team</h1>
          <p className="text-xl max-w-lg mx-auto mb-8 lg:mx-0">
            We're looking for passionate individuals to help us build the future. Discover your next career opportunity.
          </p>
          <a href="#job-openings" className="inline-block bg-white text-[#1A384F] font-semibold px-6 py-3 rounded-lg hover:bg-blue-50 transition duration-300">
            View Open Positions
          </a>
        </div>
      </div>
    </header>
  );
}