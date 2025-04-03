const IndustryRecognition = () => {
  return(
    <section className="py-8 bg-gray-100 px-8 lg:px-20 xl:px-40">
      <div className="container mx-auto">
        <h2 className="text-xl font-semibold mb-6 text-gray-800">Industry Recognition</h2>
        
        <div className="flex justify-center space-x-6 overflow-x-auto py-4">
          <div className="flex-shrink-0 flex flex-col items-center">
            <div className="bg-gray-300 w-16 h-16 rounded-full mb-2"></div>
            <span className="text-xs text-gray-600">Safety Award 2023</span>
          </div>
          <div className="flex-shrink-0 flex flex-col items-center">
            <div className="bg-gray-300 w-16 h-16 rounded-full mb-2"></div>
            <span className="text-xs text-gray-600">Best Logistics Provider</span>
          </div>
          <div className="flex-shrink-0 flex flex-col items-center">
            <div className="bg-gray-300 w-16 h-16 rounded-full mb-2"></div>
            <span className="text-xs text-gray-600">Green Shipping Excellence</span>
          </div>
        </div>
      </div>
    </section>
  );
}

export default IndustryRecognition;