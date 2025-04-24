const StatsSection = () => {
  return(
    <div className="section bg-[#264D6C] py-12 grid items-center justify-center">
      <section className="section-inner-width text-white">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Our Crew Management Expertise</h2>
          <div className="grid grid-cols-2 gap-16 md:flex md:flex-wrap md:gap-0 items-center justify-between text-center">
            {[
              { value: "500+", label: "Qualified Seafarers" },
              { value: `${new Date().getFullYear() - 1980}+`, label: "Years Experience" },
              { value: "100%", label: "STCW Compliance" },
              { value: "Global", label: "Services Network" }
            ].map((stat, index) => (
              <div key={index}>
                <div className="text-4xl font-bold mb-2">{stat.value}</div>
                <div className="text-blue-200/90">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

export default StatsSection;