import { useState, ReactNode } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import {
  LayoutDashboard,
  Settings,
  X,
  GraduationCap,
  UserCircle,
  LogOut,
  ListCheck,
} from "lucide-react";

interface SidebarProps {
  className?: string;
}

const Sidebar = ({ className }: SidebarProps) => {
  const [isOpen, setIsOpen] = useState(true);
  const navigate = useNavigate();
  const location = useLocation(); // Add this for tracking current route

  const handleSignOut = () => {
    localStorage.removeItem('access-token');
    navigate('/auth/login');
  };

  interface NavItem {
    title: string;
    icon: ReactNode;
    path: string;
    badge?: string;
    badgeColor?: string;
  }

  const navItems: NavItem[] = [
    {
      title: "Dashboard",
      icon: <LayoutDashboard className="w-5 h-5" />,
      path: "/dashboard",
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
    // {
    //   title: "Notifications",
    //   icon: <Bell className="w-5 h-5" />,
    //   path: "/notifications",
    //   badge: "3",
    //   badgeColor: "bg-red-500 text-white",
    // },
  ];

  const profileItems: NavItem[] = [
    {
      title: "Your Profile",
      icon: <UserCircle className="w-5 h-5" />,
      path: "/profile",
    },
    {
      title: "Sign Out",
      icon: <LogOut className="w-5 h-5" />,
      path: "/auth/login",
    },
  ];

  const isActiveRoute = (path: string) => {
    return location.pathname === path;
  };

  return (
    <>
      {/* Sidebar */}
      <div
        className={`fixed md:flex hidden left-0 top-0 right-0 border-slate-200  border-r z-40 h-screen transition-transform duration-300 transform
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
          ${className}`}
      >
        <div className="h-full w-full px-4 py-20 overflow-y-auto bg-white  border-gray-200">
          {/* Navigation Items */}
          <ul className="  space-y-3 ">
            {navItems.map((item, index) => (
              <li key={index}>
                <a
                  href={item.path}
                  onClick={e => {
                    e.preventDefault();
                    if (item.path === '/auth/login') {
                      handleSignOut();
                      return;
                    }
                    navigate(item.path);
                  }}
                  className={`flex items-center p-2 rounded-lg group transition-colors duration-200
                    ${
                      isActiveRoute(item.path)
                        ? "bg-green-500 text-white"
                        : "text-gray-900 hover:bg-green-50"
                    }`}
                >
                  <span
                    className={`transition-colors duration-200 ${
                      isActiveRoute(item.path)
                        ? "text-white-600"
                        : "text-gray-500 group-hover:text-gray-900"
                    }`}
                  >
                    {item.icon}
                  </span>
                  <span className="ml-3 flex-1">{item.title}</span>
                  {item.badge && (
                    <span
                      className={`inline-flex items-center justify-center px-2 py-0.5 text-xs font-medium rounded-full
                        ${
                          isActiveRoute(item.path)
                            ? "bg-red-500 text-white"
                            : item.badgeColor || "bg-gray-100 text-gray-800"
                        }`}
                    >
                      {item.badge}
                    </span>
                  )}
                </a>
              </li>
            ))}
          </ul>

          {/* Mobile Profile Items */}
          <div className="md:hidden mt-6 pt-6 border-t border-gray-200">
            <ul className="space-y-2">
              {profileItems.map((item, index) => (
                <li key={`profile-${index}`}>
                  <a
                    href={item.path}
                    onClick={e => {
                      e.preventDefault();
                      if (item.title === "Sign Out") {
                        handleSignOut();
                        return;
                      }
                      navigate(item.path);
                    }}
                    className="flex items-center p-2 rounded-lg group transition-colors duration-200
                      text-gray-900 hover:bg-green-50"
                  >
                    <span className="text-gray-500 group-hover:text-gray-900">
                      {item.icon}
                    </span>
                    <span className="ml-3 flex-1">{item.title}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/*settings and beta  */}
          <div className="fixed gap-4 bottom-6 left-4 right-4 flex flex-col">
            {/* Beta Alert */}
            <div className="p-4 rounded-lg bg-green-50" role="alert">
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

            {/* Settings and Sign out */}
            <div className="flex flex-col gap-2">
              <Link
                to="/settings"
                className={`flex items-center p-2 rounded-lg group transition-colors duration-200

                      bg-gray-50 text-gray-700 hover:bg-gray-100
                  `}
              >
                <Settings
                  className={`w-5 h-5 ${
                    location.pathname === "/settings"
                      ? "text-white"
                      : "text-gray-600 group-hover:text-gray-900"
                  }`}
                />
                <span className="ml-3 flex-1">Settings</span>
              </Link>

              <button
                onClick={handleSignOut}
                className="flex items-center w-full p-2 rounded-lg
                  bg-rose-50 text-rose-600 hover:bg-rose-100
                  transition-colors duration-200"
              >
                <LogOut className="h-5 w-5 mr-3" />
                <span>Sign out</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Backdrop for mobile */}
      {isOpen && (
        <div
          className="fixed  inset-0 bg-black/20 backdrop-blur-sm z-30 hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
};

export default Sidebar;
