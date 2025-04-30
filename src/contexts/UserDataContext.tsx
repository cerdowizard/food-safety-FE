import { createContext, useState, useContext, ReactNode} from "react";
import { UserI } from "../types/auth/user.type";

export interface UserDataContextType {
  user: UserI | null;
  setUser: (user: UserI | null) => void;
  logout: () => void;
}

const UserDataContext = createContext<UserDataContextType>({
  user: null,
  setUser: () => {},
  logout: () => {},
});

export const UserDataProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<UserI | null>(() => {
    const savedUser = localStorage.getItem('user');
    return savedUser ? JSON.parse(savedUser) : null;
  });


  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  return (
    <UserDataContext.Provider value={{ user, setUser, logout }}>
      {children}
    </UserDataContext.Provider>
  );
};

export const useUserData = () => useContext(UserDataContext);

export default UserDataContext;
