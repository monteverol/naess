const ProcessDiagramSection = () => {
  return(
    <section className="py-16 bg-white">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">Our Crew Management Process</h2>
        <div className="relative">
          <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-1 bg-gray-200 -translate-y-1/2"></div>
          <div className="grid grid-cols-1 lg:grid-cols-6 gap-8">
            {[
              { icon: "📝", title: "Recruitment", desc: "Manning agreements & selection" },
              { icon: "🏥", title: "Medical", desc: "Exams & certification" },
              { icon: "🎓", title: "Training", desc: "STCW & company specific" },
              { icon: "✈️", title: "Deployment", desc: "Travel & documentation" },
              { icon: "⚓", title: "Onboard", desc: "Support & management" },
              { icon: "📊", title: "Post-Contract", desc: "Debrief & evaluation" }
            ].map((step, index) => (
              <div key={index} className="relative z-10">
                <div className="w-full h-full bg-blue-50 rounded-lg p-6 text-center shadow-sm hover:shadow-md transition-shadow">
                  <div className="text-3xl mb-3">{step.icon}</div>
                  <h3 className="font-bold text-lg text-[#264D6C] mb-1">{step.title}</h3>
                  <p className="text-gray-600 text-sm">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default ProcessDiagramSection;