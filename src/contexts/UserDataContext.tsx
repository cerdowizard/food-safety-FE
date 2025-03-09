import { createContext } from "react";
import { UserI } from "../types/auth/user.type";

const UserDataContext = createContext<UserI | null>(null);

export default UserDataContext;
