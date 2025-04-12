const OfficeForm = ({ 
  handleSubmit, 
  userData, 
  setUserData, 
  age, 
  calculateAge, 
  handleEducationalAttainmentChange, 
  handleResumeUpload, 
  isSubmitting 
}) => {
  return(
    <form className="space-y-8" onSubmit={handleSubmit}>
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
  );
}

export default OfficeForm;