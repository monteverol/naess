"use client";

import { use, useEffect, useState } from "react";
import Breadcrumbs from "@/components/ui/Breadcrumbs";

export default function JobPage({ params }) {
  const unwrappedParams = use(params)
  const { jobId } = unwrappedParams;

  const [jobItem, setJobItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [age, setAge] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState("");

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
    // You might want to store this in state
    setUserData(prev => ({ ...prev, resumeFile: file }));
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
      formData.append('jobLocation', jobItem.location);
      formData.append('jobType', jobItem.type);
      formData.append('jobCategory', jobItem.category);
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
        <div className="absolute top-4 right-4">
          <div className="w-4 h-4 bg-red-500 rounded-full cursor-pointer hover:bg-red-700"></div>
        </div>
        <h1 className="text-4xl font-bold mb-8 text-gray-800 text-center">{jobItem.title} Application Form</h1>
        <div className="mb-6 text-gray-600">
          <Breadcrumbs />
          <p className="text-lg"><strong>Location:</strong> {jobItem.location}</p>
          <p className="text-lg"><strong>Type:</strong> {jobItem.type}</p>
          <p className="text-lg"><strong>Category:</strong> {jobItem.category}</p>
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

        <form className="space-y-8" onSubmit={handleSubmit}>
          {/* Personal Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-gray-700 mb-2 font-bold after:content-['*'] after:text-red-500 after:text-xl after:ml-1">Rank</label>
              <input 
                type="text" 
                name="rank" 
                value={userData.rank} 
                onChange={e => setUserData({ ...userData, rank: e.target.value })} 
                className="custom-job-input" 
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-2 font-bold after:content-['*'] after:text-red-500 after:text-xl after:ml-1">License</label>
              <input 
                type="text" 
                name="license" 
                value={userData.license} 
                onChange={e => setUserData({ ...userData, license: e.target.value })} 
                className="custom-job-input" 
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="block text-gray-700 mb-2 font-bold after:content-['*'] after:text-red-500 after:text-xl after:ml-1">First Name</label>
              <input 
                type="text" 
                name="firstName" 
                value={userData.firstName} 
                onChange={e => setUserData({ ...userData, firstName: e.target.value })} 
                className="custom-job-input" 
                required
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-2 font-bold after:content-['*'] after:text-red-500 after:text-xl after:ml-1">Middle Name</label>
              <input 
                type="text" 
                name="middleName" 
                value={userData.middleName} 
                onChange={e => setUserData({ ...userData, middleName: e.target.value })} 
                className="custom-job-input" 
                required
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-2 font-bold after:content-['*'] after:text-red-500 after:text-xl after:ml-1">Last Name</label>
              <input 
                type="text" 
                name="lastName" 
                value={userData.lastName} 
                onChange={e => setUserData({ ...userData, lastName: e.target.value })} 
                className="custom-job-input" 
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-gray-700 mb-2 font-bold after:content-['*'] after:text-red-500 after:text-xl after:ml-1">Birthdate</label>
              <input 
                type="date" 
                name="birthdate" 
                onChange={(e) => calculateAge(e.target.value)} 
                className="custom-job-input" 
                required
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-2 font-bold after:content-['*'] after:text-red-500 after:text-xl after:ml-1">Age</label>
              <input 
                type="text" 
                value={age} 
                readOnly 
                className="custom-job-input bg-violet-200" 
                required
              />
            </div>
          </div>

          {/* Contact Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-gray-700 mb-2 font-bold after:content-['*'] after:text-red-500 after:text-xl after:ml-1">Contact Number</label>
              <input 
                type="text" 
                name="contactNumber" 
                value={userData.contactNumber} 
                onChange={e => setUserData({ ...userData, contactNumber: e.target.value })}
                className="custom-job-input" 
                required
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-2 font-bold after:content-['*'] after:text-red-500 after:text-xl after:ml-1">Email Address</label>
              <input 
                type="email" 
                name="email" 
                value={userData.email} 
                onChange={e => setUserData({ ...userData, email: e.target.value })}
                className="custom-job-input" 
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-gray-700 mb-2 font-bold after:content-['*'] after:text-red-500 after:text-xl after:ml-1">Address</label>
            <input 
              type="text" 
              name="address" 
              value={userData.address}
              onChange={e => setUserData({ ...userData, address: e.target.value })}
              className="custom-job-input w-full" 
              required
            />
          </div>

          {/* Educational Background */}
          <div>
            <label className="block text-gray-700 mb-2 font-bold after:content-['*'] after:text-red-500 after:text-xl after:ml-1">Educational Attainment</label>
            <div className="space-y-2 flex flex-col text-lg">
              <label>
                <input 
                  type="checkbox" 
                  name="educationalAttainment" 
                  value="High School" 
                  className="mr-2"
                  onChange={handleEducationalAttainmentChange}
                /> High School
              </label>
              <label>
                <input 
                  type="checkbox" 
                  name="educationalAttainment" 
                  value="College Graduate" 
                  className="mr-2"
                  onChange={handleEducationalAttainmentChange}
                /> College Graduate
              </label>
              <label>
                <input 
                  type="checkbox" 
                  name="educationalAttainment" 
                  value="Vocational Course" 
                  className="mr-2"
                  onChange={handleEducationalAttainmentChange}
                /> Vocational Course
              </label>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="col-span-2">
              <label className="block text-gray-700 mb-2 font-bold after:content-['*'] after:text-red-500 after:text-xl after:ml-1">School Graduated</label>
              <input 
                type="text" 
                name="schoolFrom" 
                value={userData.schoolFrom} 
                onChange={e => setUserData({ ...userData, schoolFrom: e.target.value })}
                className="custom-job-input" 
                required
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-2 font-bold after:content-['*'] after:text-red-500 after:text-xl after:ml-1">From</label>
              <input 
                type="date" 
                name="schoolStart" 
                value={userData.schoolStart}
                onChange={e => setUserData({ ...userData, schoolStart: e.target.value })}
                className="custom-job-input" 
                required
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-2 font-bold after:content-['*'] after:text-red-500 after:text-xl after:ml-1">To</label>
              <input 
                type="date" 
                name="schoolEnd" 
                value={userData.schoolEnd}
                onChange={e => setUserData({ ...userData, schoolEnd: e.target.value })}
                className="custom-job-input" 
                required
              />
            </div>
          </div>

          {/* Vessel Experience */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-gray-700 mb-2 font-bold">Last Vessel Experience (if any)</label>
              <input 
                type="text" 
                name="lastVesselExperience" 
                value={userData.lastVesselExperience}
                onChange={e => setUserData({ ...userData, lastVesselExperience: e.target.value })}
                className="custom-job-input"
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-2 font-bold">Last Sign Off (if any)</label>
              <input 
                type="date" 
                name="lastSignOff" 
                value={userData.lastSignOff}
                onChange={e => setUserData({ ...userData, lastSignOff: e.target.value })}
                className="custom-job-input"
              />
            </div>
          </div>
          
          {/* Resume Upload */}
          <div className="mt-8">
            <label className="block text-gray-700 mb-2 font-bold after:content-['*'] after:text-red-500 after:text-xl after:ml-1">Upload Resume</label>
            <div className="flex items-center space-x-4">
              <input
                type="file"
                name="resume"
                accept=".pdf,.doc,.docx"
                onChange={handleResumeUpload}
                className="file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:bg-[#1A384F] file:text-white file:cursor-pointer file:hover:bg-blue-700 transition-all custom-job-input"
                required
              />
              <p className="text-sm text-gray-500">Accepted file types: PDF, DOC, DOCX</p>
            </div>
          </div>

          {/* Submit Button */}
          <div className="text-center">
            <button 
              type="submit" 
              className="mt-8 w-full py-3 px-6 text-white bg-[#1A384F] hover:bg-blue-700 rounded-lg shadow-lg transition-all flex justify-center items-center"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Processing...
                </>
              ) : (
                "Submit Application"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}