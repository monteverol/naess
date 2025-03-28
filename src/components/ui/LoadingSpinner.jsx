const LoadingSpinner = () => {
  return (
    <div className="flex items-center justify-center h-full w-full">
      <div className="relative w-16 h-16">
        {/* Spinner Ring */}
        <div className="absolute inset-0 border-8 border-blue-200 border-t-[#264D6C] rounded-full animate-spin" />
        
        {/* Center "helm" dot */}
        <div className="absolute top-1/2 left-1/2 w-4 h-4 bg-[#264D6C] rounded-full -translate-x-1/2 -translate-y-1/2 shadow-md" />
      </div>
      <span className="ml-4 text-[#264D6C] font-semibold animate-pulse">Navigating the seas...</span>
    </div>
  );
};

export default LoadingSpinner;