const HeaderSection = () => {
  return(
    <header className="sticky top-16 -z-10 bg-[#1A384F] text-white">
      <div className="relative px-4 py-6 mt-16 lg:px-20 xl:px-40">
        <div className="mt-12 mb-16 text-center lg:text-start">
          <h1 className="text-6xl font-bold mb-4">About Us</h1>
          <p className="text-2xl max-w-lg mx-auto lg:mx-0">
            Discover our story, our people, and our mission
          </p>
        </div>
      </div>
    </header>
  );
}

export default HeaderSection;