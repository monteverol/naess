'use client';
// import Link from 'next/link';
// import { useSession } from 'next-auth/react';
// import { useEffect, useState } from 'react';

// export default function JobTile({ job }) {
//   const { data: session } = useSession();
//   const [hasApplied, setHasApplied] = useState(false);

//   useEffect(() => {
//     if (session) {
//       checkApplicationStatus();
//     }
//   }, [session]);

//   useEffect(() => {
//     console.log('🧩 JobTile received job:', job);
//   }, [job]);  

//   const checkApplicationStatus = async () => {
//     try {
//       const response = await fetch(`/api/applications?jobId=${job.id}&userId=${session.user.id}`);
//       if (!response.ok) throw new Error('Failed to fetch application status');
      
//       const data = await response.json();
//       setHasApplied(data.length > 0);
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   if (!job) {
//     return null; // or return a skeleton/loading fallback
//   }  

//   return (
//     <div className="bg-white overflow-hidden shadow rounded-lg">
//       <div className="px-4 py-5 sm:p-6">
//         <div className="flex items-center">
//           <div className="flex-shrink-0 bg-blue-500 rounded-md p-3">
//             <svg
//               className="h-6 w-6 text-white"
//               xmlns="http://www.w3.org/2000/svg"
//               fill="none"
//               viewBox="0 0 24 24"
//               stroke="currentColor"
//             >
//               <path
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 strokeWidth={2}
//                 d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
//               />
//             </svg>
//           </div>
//           <div className="ml-5 w-0 flex-1">
//             <h3 className="text-lg font-medium text-gray-900">{job.title}</h3>
//             <p className="mt-1 text-sm text-gray-500">
//               {job.location} • {job.type}
//             </p>
//           </div>
//         </div>
//         <div className="mt-4">
//           <div className="prose text-sm text-gray-500 line-clamp-3" dangerouslySetInnerHTML={{ __html: job.description }} />
//         </div>
//         <div className="mt-5">
//           <Link
//             href={`/careers/${job.id}`}
//             className="inline-flex items-center justify-center px-4 py-2 border border-transparent font-medium rounded-md text-blue-700 bg-blue-100 hover:bg-blue-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:text-sm"
//           >
//             {hasApplied ? 'View Application' : 'Apply Now'}
//           </Link>
//           {hasApplied && (
//             <span className="ml-3 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
//               Applied
//             </span>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }

import { Blocks, Clock, Briefcase, ChevronRight, SearchCheck, Calendar } from 'lucide-react';

const JobTile = ({ title, description, location, category, type, vacancy, division, date_posted, id }) => {
  const truncateDescription = (text, maxLength) => {
    if (text.length > maxLength) {
      return text.slice(0, maxLength) + "...";
    }
    return text;
  };

  return(
    <div
      className="lg:w-[49%] w-full border border-gray-200 rounded-lg hover:shadow-md transition-shadow duration-300 bg-white"
    >
      <div className="p-5">
        <h3 className="text-xl font-semibold text-gray-900">{title}</h3>
        <div className="w-full flex flex-row justify-between items-center my-2">
          <span className="inline-flex items-center text-sm text-gray-600 bg-gray-100 px-3 py-1 rounded-full">
            <Blocks size={14} className="mr-2" />
            {division}
          </span>
          <div className="flex items-center text-gray-500 text-sm">
            <Calendar size={14} className="mr-1" />
            {new Date(date_posted).toLocaleDateString('en-US', {
              month: 'short',
              day: 'numeric',
              year: 'numeric'
            })}
          </div>
        </div>
        <p className="text-gray-600 mt-2">{truncateDescription(description, 100)}</p>
        <div className="flex flex-wrap gap-2 mt-4">
          <span className="inline-flex items-center text-sm text-gray-600 bg-gray-100 px-3 py-1 rounded-full">
            <Briefcase size={14} className="mr-1" />
            {category}
          </span>
          <span className="inline-flex items-center text-sm text-gray-600 bg-gray-100 px-3 py-1 rounded-full">
            <Clock size={14} className="mr-1" />
            {type}
          </span>
          <span className="inline-flex items-center text-sm text-gray-600 bg-gray-100 px-3 py-1 rounded-full">
            <SearchCheck size={14} className="mr-1" />
            Available: {vacancy}
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