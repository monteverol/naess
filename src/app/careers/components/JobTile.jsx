import { MapPin, Clock, Briefcase, ChevronRight } from 'lucide-react';

const JobTile = ({ title, description, location, category, type, id }) => {
  return(
    <div
      className="lg:w-[49%] w-full border border-gray-200 rounded-lg hover:shadow-md transition-shadow duration-300 bg-white"
    >
      <div className="p-5">
        <h3 className="text-xl font-semibold text-gray-900">{title}</h3>
        <p className="text-gray-600 mt-2">{description}</p>
        <div className="flex flex-wrap gap-2 mt-4">
          <span className="inline-flex items-center text-sm text-gray-600 bg-gray-100 px-3 py-1 rounded-full">
            <MapPin size={14} className="mr-1" />
            {location}
          </span>
          <span className="inline-flex items-center text-sm text-gray-600 bg-gray-100 px-3 py-1 rounded-full">
            <Briefcase size={14} className="mr-1" />
            {category}
          </span>
          <span className="inline-flex items-center text-sm text-gray-600 bg-gray-100 px-3 py-1 rounded-full">
            <Clock size={14} className="mr-1" />
            {type}
          </span>
        </div>
        <div className="mt-5">
          <a 
            href={`/careers/${id}`} 
            className="anchor inline-flex items-center text-[#1A384F] font-medium"
          >
            View Details
            <ChevronRight size={16} className="ml-1" />
          </a>
        </div>
      </div>
    </div>
  );
}

export default JobTile;