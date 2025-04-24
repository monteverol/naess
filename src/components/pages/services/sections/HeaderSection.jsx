import { useRouter } from 'next/navigation';

const HeaderSection = () => {
  const router = useRouter();

  return(
    <section className="relative bg-[#264D6C] text-white py-20 md:py-32">
      <div className="container mx-auto px-6 text-center">
        <h1 className="text-4xl md:text-6xl font-bold mb-6">
          Crew Management Services
        </h1>
        <p className="text-xl md:text-2xl max-w-3xl mx-auto mb-8">
          Comprehensive solutions for your maritime manpower needs
        </p>
        <div className="flex justify-center space-x-4">
          <button 
            onClick={() => window.scrollTo({ top: document.getElementById('services-section').offsetTop - 100, behavior: 'smooth' })}
            className="bg-white text-[#264D6C] px-8 py-3 rounded-lg font-semibold cursor-pointer hover:bg-blue-100 transition duration-300"
          >
            Our Services
          </button>
          <button 
            onClick={() => router.push('/contact-us')}
            className="border-2 border-white px-8 py-3 rounded-lg font-semibold cursor-pointer hover:bg-white hover:text-[#264D6C] transition duration-300"
          >
            Contact Us
          </button>
        </div>
      </div>
    </section>
  );
}

export default HeaderSection;