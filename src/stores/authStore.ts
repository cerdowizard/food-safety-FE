import { create } from "zustand";
import {
  LoginPayloadI,
  RegisterPayloadI,
  UserI,
} from "../types/auth/user.type";
// import axios from "../services/api";
// import Cookies from "js-cookie";
import fakeAuthAPI from "../services/fakeAuthAPI";

export interface AuthStoreI {
  user: UserI | null;
  isCheckingAuthentication: boolean;
  isAuthenticated: boolean;
  signin: (payload: LoginPayloadI) => void;
  signup: (payload: RegisterPayloadI) => void;
  signout: () => void;
}

const authStore = create<AuthStoreI>(set => ({
  user: null,
  isCheckingAuthentication: false,
  isAuthenticated: false,

  // Sign in method
  signin: async (payload: LoginPayloadI) => {
    set({ isCheckingAuthentication: true });

    // Simulate an API call for signing in
    try {
      const response = (await fakeAuthAPI.signin(payload)) as { user: UserI }; // Replace with your actual API call
      //TODO: Uncomment the following line and remove the line after it
      /*const response = await axios.post("api/auth/signin", payload);
      set({ user: response?.data?.user, isAuthenticated: true });
      Cookies.set("token", response?.data?.token);*/
      set({ user: response.user, isAuthenticated: true });
    } catch (error) {
      console.error("Signin failed:", error);
      set({ user: null, isAuthenticated: false });
    } finally {
      set({ isCheckingAuthentication: false });
    }
  },

  // Sign up method
  signup: async (payload: RegisterPayloadI) => {
    set({ isCheckingAuthentication: true });

    // Simulate an API call for signing up
    try {
      const response = (await fakeAuthAPI.signup(payload)) as { user: UserI }; // Replace with your actual API call
      //TODO: Uncomment the following line and remove the line after it
      /*const response = await axios.post("api/auth/signup", payload); // Replace with your actual API call
      set({ user: response?.data?.user, isAuthenticated: true });
      Cookies.set("token", response?.data?.token);*/
      set({ user: response.user, isAuthenticated: true });
    } catch (error) {
      console.error("Signup failed:", error);
      set({ user: null, isAuthenticated: false });
    } finally {
      set({ isCheckingAuthentication: false });
    }
  },

  // Sign out method
  signout: () => {
    set({ user: null, isAuthenticated: false });
    // Cookies.remove("token");
  },

  //checkAuth
  /*checkAuth: async () => {
    set({ isCheckingAuthentication: true });

    try {
      const response = await axios.get("api/auth/check-auth"); // Replace with your actual API call
      set({ user: response?.data?.user, isAuthenticated: true });
    } catch (error) {
      console.error("Check auth failed:", error);
      set({ user: null, isAuthenticated: false });
    } finally {
      set({ isCheckingAuthentication: false });
    }
  },*/
}));

export default authStore;
