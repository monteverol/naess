"use client";

import { use, useEffect, useState } from "react";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import SeafarerForm from "../components/forms/Seafarer";
import OfficeForm from "../components/forms/Office";
import toast from 'react-hot-toast';

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

    const formData = new FormData();

    Object.entries(userData).forEach(([key, value]) => {
      if (key === 'resumeFile') {
        formData.append(key, value);
      } else if (Array.isArray(value)) {
        formData.append(key, value.join(', '));
      } else {
        formData.append(key, value);
      }
    });

    formData.append('jobTitle', jobItem.title);
    formData.append('jobType', jobItem.type);
    formData.append('jobCategory', jobItem.category);
    formData.append('jobDivision', jobItem.division);
    formData.append('jobClass', jobItem.class);
    formData.append('age', age);

    await toast.promise(
      fetch('/api/careers/send-application', {
        method: 'POST',
        body: formData,
      }).then(async (res) => {
        if (!res.ok) throw new Error('Failed to submit application');
        return res;
      }),
      {
        loading: 'Submitting application...',
        success: 'Application submitted successfully!',
        error: 'Failed to submit application. Please try again.',
      }
    ).then(() => {
      setSubmitSuccess(true);
    }).catch((error) => {
      console.error('Toast promise error:', error);
      setSubmitError(error.message || 'Something went wrong');
    }).finally(() => {
      setIsSubmitting(false);
    });
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

        { jobItem.class == "Seafarer" ? 
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
          : <OfficeForm 
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
        }
      </div>
    </div>
  );
}