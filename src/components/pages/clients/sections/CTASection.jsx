const CTASection = () => {
  return(
    <section className="py-10 bg-[#1A384F] text-white">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-2xl font-bold mb-4">Join Our Esteemed Clientele</h2>
        <p className="mb-6 text-blue-100">
          Experience the premium shipping and logistics services that have earned us the trust of industry leaders across Asia.
        </p>
        
        <button 
          onClick={() => router.push('/contact-us/partnership')}
          className="bg-[#B3D2F4] text-[#1A384F] font-bold px-6 py-3 rounded-md hover:bg-[#9dc1e8] transition duration-200 active:scale-95 shadow-lg cursor-pointer"
        >
          Become a Client
        </button>
      </div>
    </section>
  );
}

export default CTASection;