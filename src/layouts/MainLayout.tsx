import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import { useContext } from "react";
import UserDataContext from "../contexts/UserDataContext";
import { Navigate } from "react-router-dom";

const MainLayout = () => {
  const userData = useContext(UserDataContext);

  // Redirect to login if no user data
  if (!userData) {
    return <Navigate to="/auth/login" />;
  }

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <Sidebar className="w-64 sm:translate-x-0" />
      <main className="p-4 bg-white md:ml-64 pt-16">
        <Outlet />
      </main>
    </div>
  );
};

export default MainLayout;
