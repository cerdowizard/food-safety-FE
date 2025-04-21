import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import UserDataContext from "../contexts/UserDataContext";
import { UserI } from "../types/auth/user.type";

const MainLayout = () => {
  // Mock user data for development/testing
  const mockUser: UserI = {
    id: "123",
    email: "test@example.com",
    first_name: "Muiz",
    last_name: "Oyetola",
    role: "USER",
    address: "123 Main St",
    city: "New York",
    state: "NY",
  };
  return (
    <UserDataContext.Provider value={(mockUser as UserI | null)}>
      <div className="min-h-screen bg-white  ">
        <Header />
        <Sidebar className="w-64 sm:translate-x-0" />
        <main className="p-4 bg-white md:ml-64 pt-16">
          <Outlet />
        </main>
      </div>
    </UserDataContext.Provider>
  );
};

export default MainLayout;
