import { CircleDashed } from "lucide-react";

const LoadingSpinner = () => {
  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center min-h-screen bg-white">
      {/* Loading Animation Container */}
      <div className="relative flex flex-col items-center">
        {/* Primary Spinner */}
        <CircleDashed className="w-12 h-12 text-green-500 animate-spin" />

        {/* Loading Text */}
        <div className="mt-4 text-center">
          <h2 className="text-xl font-semibold text-gray-700">Loading</h2>
          <p className="mt-1 text-sm text-gray-500">Please wait a moment...</p>
        </div>

        {/* Brand Element (optional) */}
        <div className="absolute -z-10 w-24 h-24 bg-green-200 rounded-full blur-xl opacity-50" />
      </div>
    </div>
  );
};

export default LoadingSpinner;
