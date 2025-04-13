"use client";
// import { useSession } from 'next-auth/react';
// import { useRouter } from 'next/navigation';
// import { useEffect, useState } from 'react';
// import ApplicationForm from './components/ApplicationForm';
// import ApplicationStatus from './components/ApplicationStatus';

// export async function generateMetadata({ params }) {
//   const job = await getJob(params.jobId); // You'll need to implement getJob
  
//   return {
//     title: `${job.title} | YourCompany Careers`,
//     description: job.description.substring(0, 160),
//     openGraph: {
//       title: `${job.title} | YourCompany Careers`,
//       description: job.description.substring(0, 160),
//       url: `https://yourcompany.com/careers/${params.jobId}`,
//       siteName: 'YourCompany',
//       images: [
//         {
//           url: 'https://yourcompany.com/images/og-careers.jpg',
//           width: 1200,
//           height: 630,
//         },
//       ],
//       locale: 'en_US',
//       type: 'website',
//     },
//     twitter: {
//       card: 'summary_large_image',
//       title: `${job.title} | YourCompany Careers`,
//       description: job.description.substring(0, 160),
//       images: ['https://yourcompany.com/images/og-careers.jpg'],
//     },
//   };
// }

// export default function JobPage({ params }) {
//   const { data: session, status } = useSession();
//   const router = useRouter();
//   const [job, setJob] = useState(null);
//   const [application, setApplication] = useState(null);
//   const [isLoading, setIsLoading] = useState(true);

//   useEffect(() => {
//     if (status === 'unauthenticated') {
//       router.push(`/login?callbackUrl=/careers/${params.jobId}`);
//       return;
//     }

//     if (status === 'authenticated') {
//       fetchJobAndApplication();
//     }
//   }, [status, params.jobId]);

//   const fetchJobAndApplication = async () => {
//     try {
//       setIsLoading(true);
//       const [jobRes, applicationRes] = await Promise.all([
//         fetch(`/api/careers/${params.jobId}`),
//         fetch(`/api/applications?jobId=${params.jobId}&userId=${session.user.id}`),
//       ]);

//       if (!jobRes.ok) throw new Error('Failed to fetch job');
//       if (!applicationRes.ok) throw new Error('Failed to fetch application');

//       const jobData = await jobRes.json();
//       const applicationData = await applicationRes.json();

//       setJob(jobData);
//       setApplication(applicationData.length > 0 ? applicationData[0] : null);
//     } catch (error) {
//       console.error(error);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const handleSubmitApplication = async (formData) => {
//     try {
//       const response = await fetch('/api/applications', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//           jobId: params.jobId,
//           userId: session.user.id,
//           answers: formData,
//         }),
//       });

//       if (!response.ok) throw new Error('Failed to submit application');

//       const data = await response.json();
//       setApplication(data);
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   const handleUpdateApplication = async (formData) => {
//     try {
//       const response = await fetch(`/api/applications/${application.id}`, {
//         method: 'PUT',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//           answers: formData,
//         }),
//       });

//       if (!response.ok) throw new Error('Failed to update application');

//       const data = await response.json();
//       setApplication(data);
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   if (isLoading) {
//     return (
//       <div className="min-h-screen flex items-center justify-center">
//         <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
//       </div>
//     );
//   }

//   if (!job) {
//     return (
//       <div className="min-h-screen flex items-center justify-center">
//         <p className="text-red-500">Job not found</p>
//       </div>
//     );
//   }

//   return (
//     <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
//       <div className="bg-white shadow overflow-hidden sm:rounded-lg">
//         <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
//           <h1 className="text-2xl font-bold text-gray-900">{job.title}</h1>
//           <p className="mt-1 text-sm text-gray-500">{job.location} • {job.type}</p>
//         </div>
//         <div className="px-4 py-5 sm:p-6">
//           <div className="prose max-w-none" dangerouslySetInnerHTML={{ __html: job.description }} />

//           <div className="mt-8 border-t border-gray-200 pt-8">
//             {application ? (
//               <ApplicationStatus 
//                 application={application} 
//                 onEdit={handleUpdateApplication} 
//                 job={job}
//               />
//             ) : (
//               <ApplicationForm 
//                 onSubmit={handleSubmitApplication} 
//                 jobCategory={job.category}
//               />
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

import { use, useEffect, useState } from "react";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import SeafarerForm from "../components/forms/Seafarer";

export default function JobPage({ params }) {
  const unwrappedParams = use(params)
  const { jobId } = unwrappedParams;

  const [jobItem, setJobItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [age, setAge] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [hasResume, setHasResume] = useState(false);

  const [userData, setUserData] = useState({
    rank: "",
    license: "",
    firstName: "",
    middleName: "",
    lastName: "",
    email: "",
    address: "",
    contactNumber: "",
    educationalAttainment: [],
    schoolFrom: "",
    schoolStart: "",
    schoolEnd: "",
    lastVesselExperience: "",
    lastSignOff: "",
    birthdate: "",
    availabilityDate: "",
  });

  const calculateAge = (birthdate) => {
    const birthDate = new Date(birthdate);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    setAge(age);
    setUserData(prev => ({ ...prev, birthdate }));
  };

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const response = await fetch('/api/careers/job_vacancy');
        if (!response.ok) throw new Error('Failed to fetch jobs');
        
        const jobs = await response.json();
        const foundJobItem = jobs.find((item) => item.id.toString() === jobId.toString());
        console.log(foundJobItem)
        if (foundJobItem) {
          setJobItem(foundJobItem);
          setUserData((prev) => ({ ...prev, jobTitle: foundJobItem.title }));
        } else {
          console.error("Job not found");
        }
      } catch (err) {
        console.error("Error fetching Job:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchJob();
  }, [jobId]);

  const handleResumeUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;
  
    const formData = new FormData();
    formData.append("resume", file);
    setUserData(prev => ({ ...prev, resumeFile: file }));
    setHasResume(true);
    
    // Here you would typically parse the resume and auto-fill fields
    // For now, we'll just set hasResume to true to demonstrate the UI change
  };

  const handleEducationalAttainmentChange = (e) => {
    const { value, checked } = e.target;
    setUserData(prev => {
      const newAttainment = checked
        ? [...prev.educationalAttainment, value]
        : prev.educationalAttainment.filter(item => item !== value);
      return { ...prev, educationalAttainment: newAttainment };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError("");
    
    try {
      const formData = new FormData();
      
      // Append all user data to formData
      Object.entries(userData).forEach(([key, value]) => {
        if (key === 'resumeFile') {
          formData.append(key, value);
        } else if (Array.isArray(value)) {
          formData.append(key, value.join(', '));
        } else {
          formData.append(key, value);
        }
      });
      
      // Append job information
      formData.append('jobTitle', jobItem.title);
      formData.append('jobType', jobItem.type);
      formData.append('jobCategory', jobItem.category);
      formData.append('jobDivision', jobItem.division);
      formData.append('jobClass', jobItem.class);
      formData.append('age', age);

      const response = await fetch('/api/careers/send-application', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Failed to submit application');
      }

      setSubmitSuccess(true);
    } catch (error) {
      console.error('Error submitting application:', error);
      setSubmitError(error.message || 'Failed to submit application. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) return <div className="flex justify-center items-center h-screen">Loading...</div>;

  if (!jobItem) return <div className="flex justify-center items-center h-screen text-red-500">Job not found</div>;

  if (submitSuccess) {
    return (
      <div className="mt-20 pt-8 pb-4 bg-blue-50 min-h-screen">
        <div className="mx-auto max-w-5xl p-10 bg-white rounded-2xl shadow-xl text-center">
          <svg className="mx-auto h-16 w-16 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
          <h1 className="text-3xl font-bold mt-4 text-gray-800">Application Submitted Successfully!</h1>
          <p className="mt-4 text-lg text-gray-600">
            Thank you for applying for the {jobItem.title} position. We've received your application and will review it shortly.
          </p>
          <p className="mt-2 text-gray-600">
            A confirmation email has been sent to {userData.email}.
          </p>
          <button
            onClick={() => window.location.href = '/careers'}
            className="mt-8 py-3 px-6 text-white bg-[#1A384F] hover:bg-blue-700 rounded-lg shadow-lg transition-all"
          >
            Back to Careers
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="mt-20 pt-8 pb-4 bg-blue-50">
      <div className="mx-auto max-w-5xl p-10 bg-white rounded-2xl shadow-xl relative">
        <h1 className="text-4xl font-bold mb-1 text-gray-800 text-center">{jobItem.title} Application Form</h1>
        <h4 className="text-xl font-bold mb-8 text-gray-800 text-center">{jobItem.division}</h4>
        <div className="mb-6 text-gray-600">
          <Breadcrumbs />
          <p className="text-lg"><strong>Type:</strong> {jobItem.type}</p>
          <p className="text-lg"><strong>Category:</strong> {jobItem.category}</p>
          <p className="text-lg"><strong>Available:</strong> {jobItem.vacancy}</p>
        </div>
        <div className="mb-6 text-gray-700">
          <h2 className="text-xl font-semibold mb-2">Job Description</h2>
          <p>{jobItem.description}</p>
        </div>
        <div className="mb-6 text-gray-700">
          <h2 className="text-xl font-semibold mb-2">Job Qualifications</h2>
          <ul className="list-disc ml-8 text-lg">
            {jobItem.qualifications.map((item, index) => (
              <li key={index} className="capitalize">{item}</li>
            ))}
          </ul>
        </div>
        
        {submitError && (
          <div className="mb-6 p-4 bg-red-100 border-l-4 border-red-500 text-red-700">
            <p>{submitError}</p>
          </div>
        )}

        <SeafarerForm
          handleSubmit={handleSubmit}
          userData={userData}
          setUserData={setUserData}
          age={age}
          calculateAge={calculateAge}
          handleEducationalAttainmentChange={handleEducationalAttainmentChange}
          handleResumeUpload={handleResumeUpload}
          isSubmitting={isSubmitting}
          hasResume={hasResume}
        />
      </div>
    </div>
  );
}