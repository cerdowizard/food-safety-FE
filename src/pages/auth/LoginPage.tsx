import { useState, useEffect } from "react";
import {useNavigate } from "react-router-dom";
import { Mail, Lock, Eye, EyeOff } from "lucide-react";
import display5 from "../../assets/display5.jpg";
import display6 from "../../assets/display6.jpg";
import display8 from "../../assets/display8.jpg";
import display9 from "../../assets/display9.jpg";
import { contentDataLogin } from "../../constants";
import axiosInstance from "../../services/real/api.ts";
import {toast} from "react-toastify";
import {AxiosError} from "axios";
import { useUserData } from "../../contexts/UserDataContext";

interface LoginPayload {
  email : string,
  password: string
}

interface ErrorResponse {
  message: string
}

const LoginPage = () => {
  const navigate = useNavigate();
  const { setUser} = useUserData();
  const [showPassword, setShowPassword] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const images = [display5, display6, display8, display9];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex(prev => (prev + 1) % images.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const textInterval = setInterval(() => {
      setCurrentTextIndex(prev => (prev + 1) % contentDataLogin.length);
    }, 3000);
    return () => clearInterval(textInterval);
  }, []);

  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      const userData = JSON.parse(savedUser);
      setUser(userData);
    }
  }, []);

  const [payload, setPayload] = useState<LoginPayload>({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPayload({
      ...payload,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axiosInstance.post('/api/v1/login', payload);
      // console.log('Login response:', response.data); // Debug response

      if (response.data.is_success) {
        const userData = response.data.payload;

        // Update localStorage first
        localStorage.setItem('user', JSON.stringify(userData));

        // Update context state
        setUser(userData);

        // Show success message
        toast.success(response.data.message);

        // Navigate to dashboard
        navigate("/dashboard", { replace: true });
      } else {
        toast.error(response.data.message);
        setError(response.data.message);
      }
    } catch (error) {
      const err = error as AxiosError<ErrorResponse>;
      const errorMessage = err.response?.data?.message || err.message;
      console.error('Login error:', error); // Debug error
      toast.error(errorMessage);
      setError(errorMessage);
    }
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-green-50 to-green-100 flex">
      {/* Image Section - Only visible on lg screens */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden">
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
            {contentDataLogin.map((content, index) => (
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
                  {contentDataLogin.map((_, dotIndex) => (
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

        <div className="sm:mx-auto sm:w-full sm:max-w-xl">
          {" "}
          {/* Changed from sm:max-w-md */}
          <h2 className="text-center text-4xl font-extrabold text-gray-900 tracking-tight">
            Login to your account
          </h2>
          <p className="mt-2 text-center text-xl text-gray-600">
            Welcome back to Food Safety
          </p>
        </div>

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-xl">
          {" "}
          {/* Changed from sm:max-w-md */}
          <div className="bg-white py-8 px-4 shadow-2xl sm:rounded-2xl sm:px-10 backdrop-blur-lg bg-opacity-80 relative">
            {/* Add decorative elements for mobile */}
            <div className="lg:hidden absolute -top-4 -right-4 w-24 h-24 bg-green-500/10 rounded-full blur-2xl"></div>
            <div className="lg:hidden absolute -bottom-4 -left-4 w-32 h-32 bg-green-500/10 rounded-full blur-2xl"></div>

            <form onSubmit={handleSubmit} className="space-y-6 relative">
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

              <div className="flex items-center justify-between">
                <div className="text-base">
                  <a
                    href="#"
                    className="font-medium text-green-600 hover:text-green-500"
                  >
                    Forgot your password?
                  </a>
                </div>
                {error && (
                  <div className="text-red-500 text-sm font-medium">
                    {error}
                  </div>
                )}
              </div>

              <div>
                <button
                  type="submit"
                  className="w-full flex justify-center py-4 sm:py-3.5 px-4 border border-transparent rounded-xl shadow-sm text-xl font-bold text-white bg-green-500 hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-all duration-150 ease-in-out transform hover:scale-[1.02] active:scale-95"
                >
                  Login
                </button>
              </div>
            </form>

            <div className="mt-6 flex justify-center items-center gap-2">
              <span className="text-base text-gray-500">
                Don't have an account?
              </span>
              <button
                onClick={() => navigate("/auth/sign-up")}
                className="text-base font-bold text-green-500 hover:text-green-600"
              >
                Sign up
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

export default LoginPage;
