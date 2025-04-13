import { useState, useEffect } from "react";
import {useNavigate} from "react-router-dom";
import { User, Mail, Lock, Eye, EyeOff, MapPin } from "lucide-react";
import display1 from "../../assets/display1.jpg";
import display2 from "../../assets/display2.jpg";
import display3 from "../../assets/display3.jpg";
import display4 from "../../assets/display4.jpg";
import { contentData } from "../../constants";
import {RegisterPayloadI} from "../../types/auth/user.type.ts";
import axiosInstance from '../../services/real/api.ts'
import {AxiosError} from 'axios'
import {toast} from "react-toastify";

interface ErrorResponse {
  message: string;
}

const SignUpPage = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const images = [display1, display2, display3, display4];
  const [error, setError] = useState<string|undefined>('')
  const [msg, setMsg] = useState<string>('')

  // Image rotation logic
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex(prev => (prev + 1) % images.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const textInterval = setInterval(() => {
      setCurrentTextIndex(prev => (prev + 1) % contentData.length);
    }, 3000);
    return () => clearInterval(textInterval);
  }, []);

  const [payload, setPayload] = useState<RegisterPayloadI>({
    name: "",
    address: "",
    phone: "",
    email: "",
    user_email: "",
    password: "",
    first_name: "",
    last_name: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPayload({
      ...payload,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (payload.password !== payload.confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    try {
      // Destructure only the fields the backend expects
      const {
        name,
        address,
        phone,
        email,
        user_email,
        password,
        first_name,
        last_name
        // Exclude confirmPassword here
      } = payload;

      // Create a new object with only the necessary fields
      const payloadToSend = {
        name,
        address,
        phone,
        email,
        user_email,
        password,
        first_name,
        last_name
      };

      const response = await axiosInstance.post('/api/v1/org_create', payloadToSend);

      setMsg(response?.data.message);
      // Reset original payload state
      setPayload({
        name: "",
        address: "",
        phone: "",
        email: "",
        user_email: "",
        password: "",
        confirmPassword: "",
        first_name: "",
        last_name: "",
      });
      toast.success(msg)
      setError(undefined); // Clear error on success

    } catch (error) {
      const err = error as AxiosError<ErrorResponse>;
      setError(err.response?.data.message);
      console.log(err.response?.data.message);
    }
  };
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100 flex">
      {/* Image Section - Only visible on lg screens */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden">
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/50 to-transparent z-10" />

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

          <div className="max-w-xl">
            {contentData.map((content, index) => (
              <div
                key={index}
                className={` absolute ${
                  currentTextIndex === index
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 -translate-y-4"
                }`}
              >
                <div
                  className={`transition-all duration-700  ${
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
                </div>
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
        {/* Mobile Header - Only visible on small screens */}
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

        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <div className="flex justify-center">
            {/* <div className="w-20 h-20 rounded-full bg-green-500 flex items-center justify-center">
              <User className="text-white w-8 h-8" />
            </div> */}
          </div>
          <h2 className="text-center text-4xl font-extrabold text-gray-900 tracking-tight">
            Create your account
          </h2>
          <p className="mt-2 text-center text-base text-gray-600">
            Join us today and get started
          </p>
        </div>

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-xl">
          <div className="bg-white py-8 px-4 shadow-2xl rounded-2xl sm:px-10 backdrop-blur-lg bg-opacity-80">
            {/* Add decorative elements for mobile */}
            <div className="lg:hidden absolute -top-4 -right-4 w-24 h-24 bg-green-500/10 rounded-full blur-2xl"></div>
            <div className="lg:hidden absolute -bottom-4 -left-4 w-32 h-32 bg-green-500/10 rounded-full blur-2xl"></div>

            {/* Update form spacing for mobile */}
            <form
              className="space-y-4 sm:space-y-6 relative"

            >
              {/* Name Input */}
              <div>
                <label
                    htmlFor="email"
                    className="block text-base font-medium text-gray-700"
                >
                  Name
                </label>
                <div className="mt-1 relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail className="text-gray-400 w-5 h-5" />
                  </div>
                  <input
                      id="name"
                      name="name"
                      type="text"
                      required
                      className="appearance-none block w-full pl-10 px-3 py-3.5 sm:py-3 border border-gray-300 rounded-xl shadow-sm placeholder-gray-400 focus:outline-none focus:ring-green-500 focus:border-green-500 transition duration-150 ease-in-out text-base"
                      value={payload.name}
                      onChange={handleChange}
                      placeholder="name"
                  />
                </div>
              </div>

              {/* Name Fields - Side by Side */}
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
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
                      className="appearance-none block w-full pl-10 px-3 py-3.5 sm:py-3 border border-gray-300 rounded-xl shadow-sm placeholder-gray-400 focus:outline-none focus:ring-green-500 focus:border-green-500 transition duration-150 ease-in-out text-base"
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
                      className="appearance-none block w-full pl-10 px-3 py-3.5 sm:py-3 border border-gray-300 rounded-xl shadow-sm placeholder-gray-400 focus:outline-none focus:ring-green-500 focus:border-green-500 transition duration-150 ease-in-out text-base"
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
                    className="appearance-none block w-full pl-10 px-3 py-3.5 sm:py-3 border border-gray-300 rounded-xl shadow-sm placeholder-gray-400 focus:outline-none focus:ring-green-500 focus:border-green-500 transition duration-150 ease-in-out text-base"
                    value={payload.email}
                    onChange={handleChange}
                    placeholder="you@example.com"
                  />
                </div>
              </div>

              {/* User Email Input */}
              <div>
                <label
                    htmlFor="email"
                    className="block text-base font-medium text-gray-700"
                >
                  User email address
                </label>
                <div className="mt-1 relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail className="text-gray-400 w-5 h-5" />
                  </div>
                  <input
                      id="user_email"
                      name="user_email"
                      type="email"
                      required
                      className="appearance-none block w-full pl-10 px-3 py-3.5 sm:py-3 border border-gray-300 rounded-xl shadow-sm placeholder-gray-400 focus:outline-none focus:ring-green-500 focus:border-green-500 transition duration-150 ease-in-out text-base"
                      value={payload.user_email}
                      onChange={handleChange}
                      placeholder="you@example.com"
                  />
                </div>
              </div>

              {/* Address Input */}
              <div>
                <label
                  htmlFor="address"
                  className="block text-base font-medium text-gray-700"
                >
                  Address
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
                    className="appearance-none block w-full pl-10 px-3 py-3.5 sm:py-3 border border-gray-300 rounded-xl shadow-sm placeholder-gray-400 focus:outline-none focus:ring-green-500 focus:border-green-500 transition duration-150 ease-in-out text-base"
                    value={payload.address}
                    onChange={handleChange}
                    placeholder="123 Main St"
                  />
                </div>
              </div>

              {/* Phone Number Input */}
              <div>
                <label
                    htmlFor="address"
                    className="block text-base font-medium text-gray-700"
                >
                  Phone Number
                </label>
                <div className="mt-1 relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <MapPin className="text-gray-400 w-5 h-5" />
                  </div>
                  <input
                      id="phone"
                      name="phone"
                      type="text"
                      required
                      className="appearance-none block w-full pl-10 px-3 py-3.5 sm:py-3 border border-gray-300 rounded-xl shadow-sm placeholder-gray-400 focus:outline-none focus:ring-green-500 focus:border-green-500 transition duration-150 ease-in-out text-base"
                      value={payload.phone}
                      onChange={handleChange}
                      placeholder="123 456 789"
                  />
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
                    className="appearance-none block w-full pl-10 pr-10 px-3 py-3.5 sm:py-3 border border-gray-300 rounded-xl shadow-sm placeholder-gray-400 focus:outline-none focus:ring-green-500 focus:border-green-500 transition duration-150 ease-in-out text-base"
                    value={payload.password}
                    onChange={handleChange}
                    placeholder="••••••••"
                  />
                  <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="text-gray-400 hover:text-gray-500 focus:outline-none"
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
                    className="appearance-none block w-full pl-10 pr-10 px-3 py-3.5 sm:py-3 border border-gray-300 rounded-xl shadow-sm placeholder-gray-400 focus:outline-none focus:ring-green-500 focus:border-green-500 transition duration-150 ease-in-out text-base"
                    value={payload.confirmPassword}
                    onChange={handleChange}
                    placeholder="••••••••"
                  />
                  <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                    <button
                      type="button"
                      onClick={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
                      className="text-gray-400 hover:text-gray-500 focus:outline-none"
                    >
                      {showConfirmPassword ? (
                        <EyeOff className="w-5 h-5" />
                      ) : (
                        <Eye className="w-5 h-5" />
                      )}
                    </button>
                  </div>
                </div>
                {error && <div className=" text-red-500 text-x">{error}</div>}
              </div>

              <div>
                <button
                  type="submit"
                  onClick={handleSubmit}
                  className="w-full flex justify-center py-4 sm:py-3.5 px-4 border border-transparent rounded-xl shadow-sm text-xl font-bold text-white bg-green-500 hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-all duration-150 ease-in-out transform hover:scale-[1.02] active:scale-95"
                >
                  Create Account
                </button>
              </div>
            </form>

            <div className="mt-6 flex justify-center items-center gap-2">
              <span className="text-base text-gray-500">
                Already have an account?
              </span>
              <button
                onClick={() => navigate("/auth/login")}
                className="text-base font-medium text-green-500 hover:text-green-600"
              >
                Login
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Add floating decorative elements */}
      <div className="lg:hidden fixed top-0 right-0 w-64 h-64 bg-green-500/5 rounded-full blur-3xl"></div>
      <div className="lg:hidden fixed bottom-0 left-0 w-64 h-64 bg-green-500/5 rounded-full blur-3xl"></div>
    </div>
  );
};

export default SignUpPage;
