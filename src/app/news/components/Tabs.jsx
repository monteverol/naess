const Tabs = ({ activeTab, setActiveTab }) => {
  return(
    <div className="flex space-x-1 mb-4 md:mb-0">
      <button 
        className={`px-4 py-2 btn rounded-md ${activeTab === 'all' ? 'bg-[#1A384F] text-white' : 'bg-gray-100 hover:bg-gray-200'}`}
        onClick={() => setActiveTab('all')}
      >
        All
      </button>
      <button 
        className={`px-4 py-2 btn rounded-md ${activeTab === 'news' ? 'bg-[#1A384F] text-white' : 'bg-gray-100 hover:bg-gray-200'}`}
        onClick={() => setActiveTab('news')}
      >
        News
      </button>
      <button 
        className={`px-4 py-2 btn rounded-md ${activeTab === 'event' ? 'bg-[#1A384F] text-white' : 'bg-gray-100 hover:bg-gray-200'}`}
        onClick={() => setActiveTab('event')}
      >
        Events
      </button>
    </div>
  );
}

export default Tabs;