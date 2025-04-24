const IndustryRecognition = () => {
  return(
    <section className="bg-gray-100 section grid items-center justify-center">
      <div className="section-inner-width">
        <h2 className="text-xl font-semibold mb-6 text-gray-800">Industry Recognition</h2>
        
        <div className="flex justify-center space-x-8 overflow-x-auto py-4">
          <div className="flex-shrink-0 flex flex-col items-center w-40 text-center">
            <div className="w-16 h-16 rounded-full mb-2 overflow-hidden drop-shadow-md">
              <img src="/images/clients/icons/safety.png" alt="Safest Agency Icon" className="w-full h-full" />
            </div>
            <span className="text-sm text-gray-600">Safety Award 2023</span>
          </div>
          <div className="flex-shrink-0 flex flex-col items-center w-40 text-center">
            <div className="w-16 h-16 rounded-full mb-2 overflow-hidden drop-shadow-md">
              <img src="/images/clients/icons/manning.png" alt="Best Manning Agency Icon" className="w-full h-full" />
            </div>
            <span className="text-sm text-gray-600">Best Manning Agency</span>
          </div>
          <div className="flex-shrink-0 flex flex-col items-center w-40 text-center">
            <div className="w-16 h-16 rounded-full mb-2 overflow-hidden drop-shadow-md">
              <img src="/images/clients/icons/green.png" alt="Green Shipping Excellence Icon" className="w-full h-full" />
            </div>
            <span className="text-sm text-gray-600">Green Shipping Excellence</span>
          </div>
        </div>
      </div>
    </section>
  );
}

export default IndustryRecognition;