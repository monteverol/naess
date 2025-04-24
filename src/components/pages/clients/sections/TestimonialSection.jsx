const TestimonialSection = () => {
  return(
    <div className="section bg-gray-100 py-8 grid items-center justify-center">
      <section className="section-inner-width">
        <div className="container mx-auto">
          <h2 className="text-xl font-semibold mb-6 text-gray-800 px-4 lg:px-0">What Our Clients Say</h2>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <blockquote className="italic text-gray-600 mb-4">
                "NAESS Shipping has been an invaluable partner for our maritime logistics needs. Their professionalism and reliability have helped us streamline our operations and grow our business."
              </blockquote>
              <div className="flex items-center">
                <div className="bg-gray-300 min-w-10 max-w-10 min-h-10 max-h-10 rounded-full mr-3"></div>
                <div>
                  <cite className="font-medium text-gray-800 not-italic">Maria Santos</cite>
                  <p className="text-sm text-gray-500">Operations Director, Global Maritime Transport</p>
                </div>
              </div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <blockquote className="italic text-gray-600 mb-4">
                "NAESS Shipping has been an invaluable partner for our maritime logistics needs. Their professionalism and reliability have helped us streamline our operations and grow our business."
              </blockquote>
              <div className="flex items-center">
                <div className="bg-gray-300 min-w-10 max-w-10 min-h-10 max-h-10 rounded-full mr-3"></div>
                <div>
                  <cite className="font-medium text-gray-800 not-italic">Maria Santos</cite>
                  <p className="text-sm text-gray-500">Operations Director, Global Maritime Transport</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default TestimonialSection;