import { Search } from 'lucide-react';
import JobTile from "../ui/JobTile";
import { useState } from 'react';
import Breadcrumbs from '@/components/ui/Breadcrumbs';

export default function JobOpeningSection({ jobOpenings }) {
  const [activeJobCategory, setActiveJobCategory] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');

  const jobCategories = ['All', ...new Set(jobOpenings.map(job => job.category))];

  const filteredJobs = jobOpenings
    .filter(job => activeJobCategory === 'All' || job.category === activeJobCategory)
    .filter(job => job.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                  job.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                  job.location.toLowerCase().includes(searchTerm.toLowerCase()));
  
  return(
    <section id="job-openings" className="py-12 px-4 lg:px-20 xl:px-40 bg-white">
      <div className="max-w-screen-xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-8">Open Positions</h2>

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
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

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
                  onClick={() => setActiveJobCategory(category)}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Job Listings */}
        {filteredJobs.length > 0 ? (
          <div className="flex flex-wrap gap-4 justify-between">
            {filteredJobs.map((job) => (
              <JobTile 
                key={job.id}
                title={job.title}
                description={job.description}
                location={job.location}
                category={job.category}
                type={job.type}
                id={job.id}
              />
            ))}
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