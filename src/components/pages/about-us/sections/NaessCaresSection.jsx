const NaessCaresSection = ({ leftColumn, rightColumn }) => {
  return(
    <div className="bg-gray-100 section grid items-center justify-center">
      <section id="naess-cares" className="section-inner-width">
        <div className="container mx-auto">
          <h2 className="mb-12 text-[#1A384F] section-heading">Our Mission & Values</h2>

          {/* Column-wise fixed order */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[leftColumn, rightColumn].map((column, colIndex) => (
              <div key={colIndex} className="flex flex-col gap-4">
                {column.map((value, index) => (
                  <div key={index} className="bg-white rounded-lg shadow-md h-full flex overflow-hidden cursor-pointer group transition-all duration-300 hover:drop-shadow-lg">
                    <div className="bg-[#1A384F] text-white font-bold text-2xl flex items-center justify-center w-16 flex-shrink-0 transition-all duration-300 group-hover:w-28 group-hover:text-4xl">
                      {value.letter}
                    </div>
                    <div className="p-4 pr-8 flex flex-col justify-between flex-1">
                      <h4 className="font-semibold text-lg text-[#1A384F] mb-2">{value.title}</h4>
                      <p className="text-gray-700">{value.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>

          <div className="bg-white rounded-lg shadow-md p-6 mt-6">
            <div className="flex items-center justify-center">
              <p className="text-center text-lg font-medium text-[#1A384F]">
                Together, these values form the foundation of our approach: <span className="font-bold italic">Naess Cares</span>
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default NaessCaresSection;