import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
// Added Building icon
import {
  User,
  Mail,
  Lock,
  Eye,
  EyeOff,
  MapPin,
  Phone,
  Building,
} from "lucide-react";
import display1 from "../../assets/display1.jpg";
import display2 from "../../assets/display2.jpg";
import display3 from "../../assets/display3.jpg";
import display4 from "../../assets/display4.jpg";
import { contentData } from "../../constants";
import { RegisterUserPayloadI } from "../../types/auth/user.type.ts";
import axiosInstance from "../../services/real/api.ts";
import { AxiosError } from "axios";
import { toast } from "react-toastify";

interface ErrorResponse {
  message: string;
}

const SignUpUser = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const images = [display1, display2, display3, display4];
  const [error, setError] = useState<string | undefined>("");
  const [msg, setMsg] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false); // Loading state

  // Initialize state with all required fields
  const [payload, setPayload] = useState<RegisterUserPayloadI>({
    org_id: "",
    email: "",
    password: "",
    first_name: "",
    last_name: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    zip_code: "",
    country: "",
    confirmPassword: "", // Only used for frontend validation
  });

  // Image rotation logic
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex(prev => (prev + 1) % images.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [images.length]); // Added dependency

  // Text rotation logic
  useEffect(() => {
    const textInterval = setInterval(() => {
      setCurrentTextIndex(prev => (prev + 1) % contentData.length);
    }, 3000);
    return () => clearInterval(textInterval);
  }, [contentData.length]); // Added dependency

  // Generic handler for input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (error) setError(""); // Clear error on new input
    setPayload({
      ...payload,
      [e.target.name]: e.target.value,
    });
  };

  // Form submission handler
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); // Prevent default form submission
    setError(""); // Clear previous errors
    setMsg(""); // Clear previous success messages

    // Password confirmation check
    if (payload.password !== payload.confirmPassword) {
      setError("Passwords do not match");
      toast.error("Passwords do not match");
      return;
    }

    setIsLoading(true); // Start loading indicator

    try {
      // Destructure only the fields the backend expects
      const {
        org_id,
        email,
        password,
        first_name,
        last_name,
        phone,
        address,
        city,
        state,
        zip_code,
        country,
        // Exclude confirmPassword here
      } = payload;

      // Create a new object with only the necessary fields
      const payloadToSend = {
        org_id: org_id || undefined, // Send undefined if empty, adjust if backend expects null or empty string
        email,
        password,
        first_name,
        last_name,
        phone,
        address,
        city,
        state,
        zip_code,
        country,
      };

      console.log("Sending payload:", payloadToSend); // Log payload being sent

      // Make API call
      const response = await axiosInstance.post(
        "/api/v1/signup",
        payloadToSend
      );

      setMsg(response?.data.message || "Signup successful!");
      // Set success message state
      toast.success(msg); // Show success toast

      // Reset form fields after successful submission
      setPayload({
        org_id: "",
        email: "",
        password: "",
        first_name: "",
        last_name: "",
        phone: "",
        address: "",
        city: "",
        state: "",
        zip_code: "",
        country: "",
        confirmPassword: "",
      });
      setError(undefined); // Clear any previous error state

      // Optional: Navigate after successful signup
      // setTimeout(() => navigate('/auth/login'), 1500); // Example delay
    } catch (error) {
      const err = error as AxiosError<ErrorResponse>;
      const errorMsg =
        err.response?.data?.message || "An error occurred during signup.";
      setError(errorMsg); // Set error message state
      toast.error(errorMsg); // Show error toast
      console.error("Signup Error:", err.response?.data || err.message); // Log detailed error
    } finally {
      setIsLoading(false); // Stop loading indicator regardless of outcome
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100 flex">
      {/* Image Section - Only visible on lg screens */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden">
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/50 to-transparent z-10" />

        {/* Rotating Background Images */}
        {images.map((img, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              currentImageIndex === index ? "opacity-100" : "opacity-0"
            }`}
          >
            <img
              src={img}
              alt={`Display ${index + 1}`}
              loading="lazy"
              className="object-cover w-full h-full brightness-75"
            />
          </div>
        ))}

        {/* Content Overlay */}
        <div className="absolute inset-0 flex flex-col justify-center px-12 z-20">
          {/* Logo and Title */}
          <div className="flex items-center ">
            <img
              src="/src/assets/food-safety.svg"
              alt="FoodSafety.io Logo"
              loading="lazy"
              className=" md:flex hidden h-[200px] w-[250px] -ml-15 mb-12 "
            />
            <h1 className=" md:flex hidden text-6xl -ml-12 md:text-5xl font-bold text-white mb-6 leading-tight">
              <div className="flex gap-1 items-center">
                <span> Food </span>{" "}
                <span className="text-green-500 "> Safety </span>
              </div>
            </h1>
          </div>

          {/* Rotating Text Content */}
          <div className="max-w-xl">
            {contentData.map((content, index) => (
              <div
                key={index}
                className={` absolute transition-all duration-700 ${
                  currentTextIndex === index
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 -translate-y-4"
                }`}
              >
                <h1 className="text-6xl md:text-7xl font-bold text-white mb-6 leading-tight">
                  {content.title}
                </h1>
                <p className="text-xl md:text-2xl text-white/90 leading-relaxed">
                  {content.description}
                </p>
                {/* Dots Indicator */}
                <div className="mt-8 flex space-x-3">
                  {contentData.map((_, dotIndex) => (
                    <div
                      key={dotIndex}
                      className={`h-2 w-2 rounded-full transition-all duration-300 ${
                        currentTextIndex === dotIndex
                          ? "bg-white w-8"
                          : "bg-white/50"
                      }`}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Form Section */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8">
        {/* Mobile Header */}
        <div className="lg:hidden flex flex-col items-center mb-2">
          <div className="flex items-center justify-center mb-6">
            <img
              src="/src/assets/food-safety.svg"
              alt="FoodSafety.io Logo"
              className="h-16 w-20"
            />
            <h1 className="text-3xl font-bold -ml-2">
              <span className="text-gray-900">Food</span>{" "}
              <span className="text-green-500">Safety</span>
            </h1>
          </div>
        </div>

        {/* Form Header */}
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <h2 className="text-center text-4xl font-extrabold text-gray-900 tracking-tight">
            Create your account
          </h2>
          <p className="mt-2 text-center text-base text-gray-600">
            Join us today and get started
          </p>
        </div>

        {/* Form Container */}
        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-xl">
          <div className="bg-white py-8 px-4 shadow-2xl rounded-2xl sm:px-10 backdrop-blur-lg bg-opacity-80 relative">
            {/* Decorative elements for mobile */}
            <div className="lg:hidden absolute -top-4 -right-4 w-24 h-24 bg-green-500/10 rounded-full blur-2xl"></div>
            <div className="lg:hidden absolute -bottom-4 -left-4 w-32 h-32 bg-green-500/10 rounded-full blur-2xl"></div>

            {/* Form Element */}
            <form
              className="space-y-4 sm:space-y-6 relative"
              onSubmit={handleSubmit} // Use form's onSubmit
            >
              {/* Organization ID Input */}
              <div>
                <label
                  htmlFor="org_id"
                  className="block text-base font-medium text-gray-700"
                >
                  Organization ID (Optional)
                </label>
                <div className="mt-1 relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Building className="text-gray-400 w-5 h-5" />
                  </div>
                  <input
                    id="org_id"
                    name="org_id"
                    type="text"
                    disabled={isLoading}
                    className="appearance-none block w-full pl-10 px-3 py-3.5 sm:py-3 border border-gray-300 rounded-xl shadow-sm placeholder-gray-400 focus:outline-none focus:ring-green-500 focus:border-green-500 transition duration-150 ease-in-out text-base disabled:bg-gray-100"
                    value={payload.org_id}
                    onChange={handleChange}
                    placeholder="Your Organization ID"
                  />
                </div>
              </div>

              {/* Name Fields - Side by Side */}
              <div className="grid grid-cols-1 gap-4 sm:gap-6 sm:grid-cols-2">
                {/* First Name Input */}
                <div>
                  <label
                    htmlFor="first_name"
                    className="block text-base font-medium text-gray-700"
                  >
                    First Name
                  </label>
                  <div className="mt-1 relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <User className="text-gray-400 w-5 h-5" />
                    </div>
                    <input
                      id="first_name"
                      name="first_name"
                      type="text"
                      required
                      disabled={isLoading}
                      className="appearance-none block w-full pl-10 px-3 py-3.5 sm:py-3 border border-gray-300 rounded-xl shadow-sm placeholder-gray-400 focus:outline-none focus:ring-green-500 focus:border-green-500 transition duration-150 ease-in-out text-base disabled:bg-gray-100"
                      value={payload.first_name}
                      onChange={handleChange}
                      placeholder="John"
                    />
                  </div>
                </div>

                {/* Last Name Input */}
                <div>
                  <label
                    htmlFor="last_name"
                    className="block text-base font-medium text-gray-700"
                  >
                    Last Name
                  </label>
                  <div className="mt-1 relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <User className="text-gray-400 w-5 h-5" />
                    </div>
                    <input
                      id="last_name"
                      name="last_name"
                      type="text"
                      required
                      disabled={isLoading}
                      className="appearance-none block w-full pl-10 px-3 py-3.5 sm:py-3 border border-gray-300 rounded-xl shadow-sm placeholder-gray-400 focus:outline-none focus:ring-green-500 focus:border-green-500 transition duration-150 ease-in-out text-base disabled:bg-gray-100"
                      value={payload.last_name}
                      onChange={handleChange}
                      placeholder="Doe"
                    />
                  </div>
                </div>
              </div>

              {/* Email Input */}
              <div>
                <label
                  htmlFor="email"
                  className="block text-base font-medium text-gray-700"
                >
                  Email address
                </label>
                <div className="mt-1 relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail className="text-gray-400 w-5 h-5" />
                  </div>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    disabled={isLoading}
                    className="appearance-none block w-full pl-10 px-3 py-3.5 sm:py-3 border border-gray-300 rounded-xl shadow-sm placeholder-gray-400 focus:outline-none focus:ring-green-500 focus:border-green-500 transition duration-150 ease-in-out text-base disabled:bg-gray-100"
                    value={payload.email}
                    onChange={handleChange}
                    placeholder="you@example.com"
                  />
                </div>
              </div>

              {/* Phone Number Input */}
              <div>
                <label
                  htmlFor="phone"
                  className="block text-base font-medium text-gray-700"
                >
                  Phone Number
                </label>
                <div className="mt-1 relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Phone className="text-gray-400 w-5 h-5" />
                  </div>
                  <input
                    id="phone"
                    name="phone"
                    type="tel" // Use type="tel" for phone numbers
                    required
                    disabled={isLoading}
                    className="appearance-none block w-full pl-10 px-3 py-3.5 sm:py-3 border border-gray-300 rounded-xl shadow-sm placeholder-gray-400 focus:outline-none focus:ring-green-500 focus:border-green-500 transition duration-150 ease-in-out text-base disabled:bg-gray-100"
                    value={payload.phone}
                    onChange={handleChange}
                    placeholder="+1 234 567 890"
                  />
                </div>
              </div>

              {/* Address Input */}
              <div>
                <label
                  htmlFor="address"
                  className="block text-base font-medium text-gray-700"
                >
                  Street Address
                </label>
                <div className="mt-1 relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <MapPin className="text-gray-400 w-5 h-5" />
                  </div>
                  <input
                    id="address"
                    name="address"
                    type="text"
                    required
                    disabled={isLoading}
                    className="appearance-none block w-full pl-10 px-3 py-3.5 sm:py-3 border border-gray-300 rounded-xl shadow-sm placeholder-gray-400 focus:outline-none focus:ring-green-500 focus:border-green-500 transition duration-150 ease-in-out text-base disabled:bg-gray-100"
                    value={payload.address}
                    onChange={handleChange}
                    placeholder="123 Main St"
                  />
                </div>
              </div>

              {/* City / State Fields */}
              <div className="grid grid-cols-1 gap-4 sm:gap-6 sm:grid-cols-2">
                {/* City Input */}
                <div>
                  <label
                    htmlFor="city"
                    className="block text-base font-medium text-gray-700"
                  >
                    City
                  </label>
                  <div className="mt-1 relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <MapPin className="text-gray-400 w-5 h-5" />
                    </div>
                    <input
                      id="city"
                      name="city"
                      type="text"
                      required
                      disabled={isLoading}
                      className="appearance-none block w-full pl-10 px-3 py-3.5 sm:py-3 border border-gray-300 rounded-xl shadow-sm placeholder-gray-400 focus:outline-none focus:ring-green-500 focus:border-green-500 transition duration-150 ease-in-out text-base disabled:bg-gray-100"
                      value={payload.city}
                      onChange={handleChange}
                      placeholder="Anytown"
                    />
                  </div>
                </div>

                {/* State Input */}
                <div>
                  <label
                    htmlFor="state"
                    className="block text-base font-medium text-gray-700"
                  >
                    State / Province
                  </label>
                  <div className="mt-1 relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <MapPin className="text-gray-400 w-5 h-5" />
                    </div>
                    <input
                      id="state"
                      name="state"
                      type="text"
                      required
                      disabled={isLoading}
                      className="appearance-none block w-full pl-10 px-3 py-3.5 sm:py-3 border border-gray-300 rounded-xl shadow-sm placeholder-gray-400 focus:outline-none focus:ring-green-500 focus:border-green-500 transition duration-150 ease-in-out text-base disabled:bg-gray-100"
                      value={payload.state}
                      onChange={handleChange}
                      placeholder="CA / Ontario"
                    />
                  </div>
                </div>
              </div>

              {/* Zip Code / Country Fields */}
              <div className="grid grid-cols-1 gap-4 sm:gap-6 sm:grid-cols-2">
                {/* Zip Code Input */}
                <div>
                  <label
                    htmlFor="zip_code"
                    className="block text-base font-medium text-gray-700"
                  >
                    Zip / Postal Code
                  </label>
                  <div className="mt-1 relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <MapPin className="text-gray-400 w-5 h-5" />
                    </div>
                    <input
                      id="zip_code"
                      name="zip_code"
                      type="text"
                      required
                      disabled={isLoading}
                      className="appearance-none block w-full pl-10 px-3 py-3.5 sm:py-3 border border-gray-300 rounded-xl shadow-sm placeholder-gray-400 focus:outline-none focus:ring-green-500 focus:border-green-500 transition duration-150 ease-in-out text-base disabled:bg-gray-100"
                      value={payload.zip_code}
                      onChange={handleChange}
                      placeholder="90210"
                    />
                  </div>
                </div>

                {/* Country Input */}
                <div>
                  <label
                    htmlFor="country"
                    className="block text-base font-medium text-gray-700"
                  >
                    Country
                  </label>
                  <div className="mt-1 relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <MapPin className="text-gray-400 w-5 h-5" />
                    </div>
                    <input
                      id="country"
                      name="country"
                      type="text"
                      required
                      disabled={isLoading}
                      className="appearance-none block w-full pl-10 px-3 py-3.5 sm:py-3 border border-gray-300 rounded-xl shadow-sm placeholder-gray-400 focus:outline-none focus:ring-green-500 focus:border-green-500 transition duration-150 ease-in-out text-base disabled:bg-gray-100"
                      value={payload.country}
                      onChange={handleChange}
                      placeholder="United States"
                    />
                  </div>
                </div>
              </div>

              {/* Password Input */}
              <div>
                <label
                  htmlFor="password"
                  className="block text-base font-medium text-gray-700"
                >
                  Password
                </label>
                <div className="mt-1 relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="text-gray-400 w-5 h-5" />
                  </div>
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    required
                    disabled={isLoading}
                    className="appearance-none block w-full pl-10 pr-10 px-3 py-3.5 sm:py-3 border border-gray-300 rounded-xl shadow-sm placeholder-gray-400 focus:outline-none focus:ring-green-500 focus:border-green-500 transition duration-150 ease-in-out text-base disabled:bg-gray-100"
                    value={payload.password}
                    onChange={handleChange}
                    placeholder="••••••••"
                  />
                  <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                    <button
                      type="button" // Important: type="button" to prevent form submission
                      onClick={() => setShowPassword(!showPassword)}
                      className="text-gray-400 hover:text-gray-500 focus:outline-none"
                      disabled={isLoading}
                    >
                      {showPassword ? (
                        <EyeOff className="w-5 h-5" />
                      ) : (
                        <Eye className="w-5 h-5" />
                      )}
                    </button>
                  </div>
                </div>
              </div>

              {/* Confirm Password Input */}
              <div>
                <label
                  htmlFor="confirmPassword"
                  className="block text-base font-medium text-gray-700"
                >
                  Confirm Password
                </label>
                <div className="mt-1 relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="text-gray-400 w-5 h-5" />
                  </div>
                  <input
                    id="confirmPassword"
                    name="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    required
                    disabled={isLoading}
                    className="appearance-none block w-full pl-10 pr-10 px-3 py-3.5 sm:py-3 border border-gray-300 rounded-xl shadow-sm placeholder-gray-400 focus:outline-none focus:ring-green-500 focus:border-green-500 transition duration-150 ease-in-out text-base disabled:bg-gray-100"
                    value={payload.confirmPassword}
                    onChange={handleChange}
                    placeholder="••••••••"
                  />
                  <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                    <button
                      type="button" // Important: type="button"
                      onClick={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
                      className="text-gray-400 hover:text-gray-500 focus:outline-none"
                      disabled={isLoading}
                    >
                      {showConfirmPassword ? (
                        <EyeOff className="w-5 h-5" />
                      ) : (
                        <Eye className="w-5 h-5" />
                      )}
                    </button>
                  </div>
                </div>
                {/* Display inline error message */}
                {error && (
                  <div className="mt-1 text-red-500 text-sm">{error}</div>
                )}
              </div>

              {/* Submit Button */}
              <div>
                <button
                  type="submit" // Use type="submit" for the form's primary action
                  disabled={isLoading} // Disable button when loading
                  className="w-full flex justify-center items-center py-4 sm:py-3.5 px-4 border border-transparent rounded-xl shadow-sm text-xl font-bold text-white bg-green-500 hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-all duration-150 ease-in-out transform hover:scale-[1.02] active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed disabled:scale-100"
                >
                  {isLoading ? (
                    // Simple loading indicator
                    <>
                      <svg
                        className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      Processing...
                    </>
                  ) : (
                    "Create Account" // Default button text
                  )}
                </button>
              </div>
            </form>

            {/* Login Link */}
            <div className="mt-6 flex justify-center items-center gap-2">
              <span className="text-base text-gray-500">
                Already have an account?
              </span>
              <button
                onClick={() => navigate("/auth/login")}
                className={`text-base font-medium text-green-500 hover:text-green-600 ${
                  isLoading ? "opacity-50 pointer-events-none" : ""
                }`} // Disable link when loading
                disabled={isLoading}
              >
                Login
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Floating decorative elements for mobile */}
      <div className="lg:hidden fixed top-0 right-0 w-64 h-64 bg-green-500/5 rounded-full blur-3xl"></div>
      <div className="lg:hidden fixed bottom-0 left-0 w-64 h-64 bg-green-500/5 rounded-full blur-3xl"></div>
    </div>
  );
};

export default SignUpUser;
