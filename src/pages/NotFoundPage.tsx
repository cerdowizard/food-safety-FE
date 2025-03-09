import { useNavigate } from "react-router-dom";
import { Home } from "lucide-react";

const NotFoundPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100 flex items-center justify-center px-6 py-12">
      <div className="text-center">
        {/* 404 Animation */}
        <div className="relative">
          <h1 className="text-9xl font-black text-green-500 animate-bounce">
            404
          </h1>
          <div className="absolute -bottom-10 w-full">
            <div className="h-1 w-full bg-gradient-to-r from-transparent via-green-500 to-transparent animate-pulse" />
          </div>
        </div>

        {/* Error Message */}
        <div className="mt-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Page Not Found
          </h2>
          <p className="text-lg text-gray-600 mb-8 max-w-md mx-auto">
            Oops! The page you're looking for doesn't exist or has been moved.
          </p>
        </div>

        {/* Action Button */}
        <button
          onClick={() => navigate("/")}
          className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-xl text-white bg-green-500 hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-all duration-150 ease-in-out transform hover:scale-105 gap-2"
        >
          <Home className="w-5 h-5" />
          Back to Home
        </button>

        {/* Additional Information */}
        <p className="mt-8 text-sm text-gray-500">
          If you believe this is a mistake, please contact support.
        </p>
      </div>
    </div>
  );
};

export default NotFoundPage;
