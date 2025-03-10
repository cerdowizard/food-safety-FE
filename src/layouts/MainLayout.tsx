import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import UserDataContext from "../contexts/UserDataContext";
import authStore from "../stores/authStore";
import { UserI } from "../types/auth/user.type";

const MainLayout = () => {
  const { user } = authStore();
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
    <UserDataContext.Provider value={user || (mockUser as UserI | null)}>
      <div className="min-h-screen ">
        <Header />
        <Sidebar className="w-64 sm:translate-x-0" />
        <main className="p-4 md:ml-64 pt-16">
          <Outlet />
        </main>
      </div>
    </UserDataContext.Provider>
  );
};

export default MainLayout;
