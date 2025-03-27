const StatsSection = () => {
  return(
    <section className="bg-[#264D6C] text-white py-16">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl font-bold text-center mb-12">Our Crew Management Expertise</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {[
            { value: "500+", label: "Qualified Seafarers" },
            { value: `${new Date().getFullYear() - 1980}+`, label: "Years Experience" },
            { value: "100%", label: "STCW Compliance" },
            { value: "16/6", label: "Support" }
          ].map((stat, index) => (
            <div key={index} className="p-4">
              <div className="text-4xl font-bold mb-2">{stat.value}</div>
              <div className="text-blue-200/90">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default StatsSection;