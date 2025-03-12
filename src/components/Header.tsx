/**
 * Header Component
 *
 * A responsive header component that includes:
 * - Logo and branding
 * - Search functionality (desktop and mobile)
 * - Notifications
 * - User profile dropdown
 * - Mobile menu with slide animation
 *
 * Features:
 * - Glassmorphism effect on scroll
 * - Responsive design
 * - Animated transitions
 * - Mobile-first approach
 */

import { useState, useEffect, useRef, useContext } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  Bell,
  ChevronDown,
  LogOut,
  Settings,
  User,
  Search,
  Menu,
  X,
  LayoutDashboard,
  FileText,
  GraduationCap,
  ListCheck,
} from "lucide-react";
import UserDataContext from "../contexts/UserDataContext";
import { UserI } from "../types/auth/user.type";
import authStore from "../stores/authStore";

// Remove Sidebar import as we're integrating it

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const user = useContext<UserI | null>(UserDataContext);

  // State management
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Refs for click outside detection
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Auth store integration
  const { signout } = authStore();
  const onLogout = () => {
    signout();
    navigate("/auth/login");
  };

  // Add navigation items
  const navItems = [
    {
      title: "Dashboard",
      icon: <LayoutDashboard className="w-5 h-5" />,
      path: "/dashboard",
    },
    {
      title: "Reports",
      icon: <FileText className="w-5 h-5" />,
      path: "/reports",
      badge: "4",
      badgeColor: "bg-red-500 text-white",
    },
    {
      title: "Checklist",
      icon: <ListCheck className="w-5 h-5" />,
      path: "/checklist",
      badgeColor: "bg-red-500 text-white",
    },
    {
      title: "Training",
      icon: <GraduationCap className="w-5 h-5" />,
      path: "/training",
      badge: "New",
      badgeColor: "bg-blue-500 text-white",
    },
    {
      title: "Notifications",
      icon: <Bell className="w-5 h-5" />,
      path: "/notifications",
      badge: "3",
      badgeColor: "bg-red-500 text-white",
    },
    {
      title: "Settings",
      icon: <Settings className="w-5 h-5" />,
      path: "/settings",
    },
  ];

  // Add isActiveRoute helper
  const isActiveRoute = (path: string) => {
    return location.pathname === path;
  };

  useEffect(() => {
    // Handle scroll events for header transparency
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    // Handle clicks outside of dropdown menu
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    };

    // Event listeners
    document.addEventListener("mousedown", handleClickOutside);

    // Cleanup event listeners
    return () => {
      window.removeEventListener("scroll", handleScroll);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <header>
      {/* Header container with glassmorphism effect */}
      <div
        className={`fixed w-full top-0 border border-slate-200  z-[1000] transition-all duration-300 ${
          scrolled ? "bg-white/80 backdrop-blur-lg shadow-md" : "bg-white"
        }`}
      >
        {/* Main header content */}
        <div className="mx-auto px-4 sm:px-6 lg:px-4">
          <div className="flex justify-between items-center h-16">
            {/* Logo Section */}
            <div className="flex items-center ">
              <div className="flex items-center space-x-3">
                <img
                  src="/src/assets/food-safety.svg"
                  alt="Food Safety Logo"
                  className="h-10 w-auto"
                />
                <span className="hidden lg:inline-block -ml-3  text-xl font-semibold text-gray-900">
                  Food Safety
                </span>
              </div>
            </div>

            {/* Search - Only show on desktop */}
            <div className="hidden md:flex items-center">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search..."
                  className="lg:w-96 w-64 pl-10 pr-4 py-2 rounded-xl border border-gray-200 focus:outline-none focus:border-green-500 transition-all"
                />
                <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
              </div>
            </div>

            {/* Right Section */}
            <div className="flex items-center space-x-6">
              {/* Show notifications and profile on desktop only */}
              <div className="hidden md:flex items-center space-x-6">
                <button className="relative p-2 rounded-xl hover:bg-gray-100 transition-colors">
                  <Bell className="h-6 w-6 text-gray-600" />
                  <span className="absolute top-2 right-2 h-2 w-2 bg-red-500 rounded-full ring-2 ring-white" />
                </button>

                {/* User Profile Dropdown */}
                <div ref={dropdownRef} className="relative">
                  <button
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    className="flex items-center space-x-3 p-2 rounded-xl hover:bg-gray-100 transition-all"
                  >
                    <div className="h-10 w-10 rounded-full bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center shadow-lg">
                      <span className="text-white text-lg font-semibold">
                        {user?.first_name?.[0]}
                        {user?.last_name?.[0]}
                      </span>
                    </div>
                    <div className="hidden md:block text-left">
                      <p className="text-sm font-semibold text-gray-900">
                        {user?.first_name} {user?.last_name}
                      </p>
                      <p className="text-xs text-gray-500">{user?.email}</p>
                    </div>
                    <ChevronDown
                      className={`h-4 w-4 text-gray-600 transition-transform duration-200 ${
                        isDropdownOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>

                  {/* Dropdown Menu */}
                  {isDropdownOpen && (
                    <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-lg py-2 border border-gray-100 transform transition-all">
                      <div className="px-4 py-2 border-b border-gray-100">
                        <p className="text-sm font-medium text-gray-900">
                          Signed in as
                        </p>
                        <p className="text-sm text-gray-500 truncate">
                          {user?.email}
                        </p>
                      </div>
                      <button
                        onClick={() => navigate("/profile")}
                        className="flex items-center w-full px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                      >
                        <User className="h-4 w-4 mr-3" />
                        Your Profile
                      </button>

                      <div className="border-t border-gray-100 my-1"></div>
                    </div>
                  )}
                </div>
              </div>

              {/* Mobile Search */}
              <div className="px-2 py-3 relative  flex justify-center w-full md:hidden">
                <div className="relative w-full max-w-md">
                  <input
                    type="text"
                    placeholder="Search..."
                    className="w-full pl-10 pr-4 py-1 rounded-xl border border-gray-200 focus:outline-none focus:border-green-500 transition-all"
                  />
                  <Search className="absolute left-3 top-1.5 h-5 w-5 text-gray-400" />
                </div>
              </div>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="md:hidden p-2 rounded-xl hover:bg-gray-100 transition-colors"
              >
                {isMobileMenuOpen ? (
                  <X className="h-6 w-6 text-gray-600" />
                ) : (
                  <Menu className="h-6 w-6 text-gray-600" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile slide-out menu with animation */}
        <div
          className={`md:hidden fixed px-4 h-[100vh] w-[70%] z-[1000] bg-white top-16
            shadow-lg transition-all duration-300 ease-in-out transform ${
              isMobileMenuOpen ? "right-0" : "-right-full"
            }`}
        >
          {/* Mobile User Profile */}
          <div className="px-4 py-3 border-b border-gray-200">
            <div className="flex items-center space-x-3">
              <div className="h-10 w-10 rounded-full bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center">
                <span className="text-white text-lg font-semibold">
                  {user?.first_name?.[0]}
                  {user?.last_name?.[0]}
                </span>
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-900">
                  {user?.first_name} {user?.last_name}
                </p>
                <p className="text-xs text-gray-500">{user?.email}</p>
              </div>
            </div>
          </div>

          {/* Navigation Items */}
          <nav className="px-2 py-4">
            {navItems.map((item, index) => (
              <a
                key={index}
                href={item.path}
                onClick={e => {
                  e.preventDefault();
                  navigate(item.path);
                  setIsMobileMenuOpen(false);
                }}
                className={`flex items-center px-4 py-2.5 rounded-lg mb-1 transition-colors ${
                  isActiveRoute(item.path)
                    ? "bg-green-500 text-white"
                    : "text-gray-600 hover:bg-green-50 hover:text-gray-900"
                }`}
              >
                {item.icon}
                <span className="ml-3">{item.title}</span>
                {item.badge && (
                  <span
                    className={`ml-auto px-2 py-0.5 text-xs font-medium rounded-full ${
                      isActiveRoute(item.path)
                        ? "bg-white text-green-600"
                        : item.badgeColor
                    }`}
                  >
                    {item.badge}
                  </span>
                )}
              </a>
            ))}
          </nav>

          {/* Profile Actions */}
          <div className="border-t border-gray-200 mt-2">
            <nav className="px-2 py-4">
              <a
                href="/profile"
                onClick={e => {
                  e.preventDefault();
                  navigate("/profile");
                  setIsMobileMenuOpen(false);
                }}
                className="flex items-center px-4 py-2.5 text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-colors"
              >
                <User className="h-5 w-5" />
                <span className="ml-3">Your Profile</span>
              </a>
              <button
                onClick={() => {
                  onLogout();
                  setIsMobileMenuOpen(false);
                }}
                className="w-full flex items-center px-4 py-2.5 text-red-600 hover:bg-gray-50 rounded-lg transition-colors"
              >
                <LogOut className="h-5 w-5" />
                <span className="ml-3">Sign out</span>
              </button>
            </nav>

            {/* Beta Alert */}
            <div className="mt-6 p-4 rounded-lg bg-green-50" role="alert">
              <div className="flex items-center mb-3">
                <span className="bg-orange-100 text-orange-800 text-sm font-semibold px-2.5 py-0.5 rounded-sm">
                  Beta
                </span>
                <button
                  onClick={() => {
                    /* Add close functionality */
                  }}
                  className="ml-auto text-green-900 hover:bg-blue-200 rounded-lg p-1.5"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
              <p className="text-sm text-green-800">
                Preview the new Food Safety dashboard navigation! You can turn
                it off in your profile.
              </p>
              <a
                href="#"
                className="mt-2 inline-block text-sm text-green-800 underline hover:text-blue-900"
              >
                Turn new navigation off
              </a>
            </div>
          </div>
        </div>

        {/* Backdrop overlay for mobile menu */}
        {isMobileMenuOpen && (
          <div
            className="md:hidden fixed inset-0 bg-black/20 backdrop-blur-sm top-16"
            onClick={() => setIsMobileMenuOpen(false)}
          />
        )}
      </div>
    </header>
  );
};

export default Header;
