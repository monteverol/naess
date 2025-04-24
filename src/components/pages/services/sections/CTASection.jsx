const CTASection = () => {
  return(
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-6 text-center">
        <h2 className="text-3xl font-bold text-gray-800 mb-6">Ready to Optimize Your Crew Operations?</h2>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-8">
          Partner with NAESS for reliable, compliant, and efficient crew management solutions.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <button className="bg-[#264D6C] text-white px-8 py-4 rounded-lg font-semibold hover:bg-[#1a3a52] transition-colors duration-300">
            Request Proposal
          </button>
          <button className="border-2 border-[#264D6C] text-[#264D6C] px-8 py-4 rounded-lg font-semibold hover:bg-blue-50 transition-colors duration-300">
            Speak to Our Team
          </button>
        </div>
      </div>
    </section>
  );
}

export default CTASection;