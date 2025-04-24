import { Search } from 'lucide-react';
import JobTile from "../ui/JobTile";
import { useState, useMemo } from 'react';

export default function JobOpeningSection({ jobOpenings }) {
  const [activeJobCategory, setActiveJobCategory] = useState('All');
  const [activeDivision, setActiveDivision] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [visibleJobs, setVisibleJobs] = useState(6);

  // Get unique categories
  const jobCategories = ['All', ...new Set(jobOpenings.map(job => job.category))];

  // Get divisions based on selected category
  const jobDivisions = useMemo(() => {
    const divisions = ['All'];
    if (activeJobCategory === 'All') {
      return [...divisions, ...new Set(jobOpenings.map(job => job.division))];
    }
    const filteredDivisions = jobOpenings
      .filter(job => job.category === activeJobCategory)
      .map(job => job.division);
    return [...divisions, ...new Set(filteredDivisions)];
  }, [activeJobCategory, jobOpenings]);

  const handleCategoryChange = (category) => {
    setActiveJobCategory(category);
    setActiveDivision('All'); // Reset division filter when category changes
    setVisibleJobs(10); // Reset visible jobs when filters change
  };

  const handleDivisionChange = (division) => {
    setActiveDivision(division);
    setVisibleJobs(10); // Reset visible jobs when filters change
  };

  const filteredJobs = useMemo(() => {
    return jobOpenings
      .filter(job => activeJobCategory === 'All' || job.category === activeJobCategory)
      .filter(job => activeDivision === 'All' || job.division === activeDivision)
      .filter(job => job.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
             job.description.toLowerCase().includes(searchTerm.toLowerCase()));
  }, [jobOpenings, activeJobCategory, activeDivision, searchTerm]);

  const jobsToShow = filteredJobs.slice(0, visibleJobs);

  const handleLoadMore = () => {
    setVisibleJobs(prev => prev + 10);
  };

  return(
    <section id="job-openings" className="section bg-white">
      <div className="section-inner-width">
        <h1 className="text-3xl font-bold text-center mb-8">Open Positions</h1>

        {/* Search and Filter */}
        <div className="mb-8">
          <div className="relative mb-6">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search size={18} className="text-gray-400" />
            </div>
            <input
              type="text"
              className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              placeholder="Search positions..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setVisibleJobs(10); // Reset visible jobs when search changes
              }}
              aria-label="Search job positions"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            {/* Category Filter */}
            <div className="">
              <h2 className="text-sm font-medium text-gray-700 mb-2">Filter by Client</h2>
              <div className="overflow-x-auto">
                <div className="flex space-x-2 pb-2">
                  {jobCategories.map((category) => (
                    <button
                      key={category}
                      className={`px-4 py-2 rounded-full whitespace-nowrap ${
                        activeJobCategory === category
                          ? 'bg-[#1A384F] text-white'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                      onClick={() => handleCategoryChange(category)}
                      aria-label={`Filter by ${category} category`}
                    >
                      {category}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Division Filter */}
            <div className="">
              <h2 className="text-sm font-medium text-gray-700 mb-2">Filter by Category</h2>
              <div className="overflow-x-auto">
                <div className="flex space-x-2 pb-2">
                  {jobDivisions.map((division) => (
                    <button
                      key={division}
                      className={`px-4 py-2 rounded-full whitespace-nowrap ${
                        activeDivision === division
                          ? 'bg-[#1A384F] text-white'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                      onClick={() => handleDivisionChange(division)}
                      aria-label={`Filter by ${division} division`}
                    >
                      {division}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Job Listings */}
        {jobsToShow.length > 0 ? (
          <div className="flex flex-col">
            <div className="flex flex-wrap gap-4 justify-between mb-6">
              {jobsToShow.map((job) => (
                <JobTile 
                  key={job.id}
                  // job={job}
                  title={job.title}
                  description={job.description}
                  location={job.location}
                  category={job.category}
                  division={job.division}
                  date_posted={job.date_posted}
                  vacancy={job.vacancy}
                  type={job.type}
                  id={job.id}
                />
              ))}
            </div>
            {visibleJobs < filteredJobs.length && (
              <div className="text-center">
                <button
                  onClick={handleLoadMore}
                  className="px-6 py-3 bg-[#1A384F] text-white rounded-lg btn hover:bg-[#142a3a]"
                >
                  Load More
                </button>
              </div>
            )}
          </div>
        ) : (
          <div className="text-center py-12 bg-gray-50 rounded-lg">
            <p className="text-gray-500">No matching positions found. Please try a different search or filter.</p>
          </div>
        )}
      </div>
    </section>
  );
}