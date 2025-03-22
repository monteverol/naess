const NewsLetter = () => {
  return(
    <section className="bg-[#E9F2FC] py-12 px-4">
      <div className="max-w-screen-xl mx-auto text-center">
        <h2 className="text-3xl font-bold mb-4">Stay Updated</h2>
        <p className="text-gray-600 mb-6 max-w-lg mx-auto">
          Subscribe to our newsletter to receive the latest news and event updates directly in your inbox.
        </p>
        <form className="max-w-md mx-auto">
          <div className="flex flex-col sm:flex-row gap-2">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-grow px-4 py-3 bg-white rounded-md border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              required
            />
            <button 
              type="submit" 
              className="bg-[#1A384F] text-white px-6 py-3 rounded-md hover:bg-[#0d141a] transition-colors btn"
            >
              Subscribe
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}

export default NewsLetter;