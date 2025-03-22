const Header = () => {
  return(
    <header className="sticky top-16 -z-10 bg-[#1A384F] text-white">
      <div className="relative px-4 py-6 mt-16 lg:px-20 xl:px-40">
        <div className="mt-12 mb-16 text-center lg:text-start">
          <h1 className="text-4xl font-bold mb-4">News & Events</h1>
          <p className="text-xl max-w-lg mx-auto lg:mx-0">
            Stay up-to-date with our latest company news, product updates, and upcoming events.
          </p>
        </div>
      </div>
    </header>
  );
}

export default Header;