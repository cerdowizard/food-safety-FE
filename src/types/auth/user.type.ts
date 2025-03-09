export interface UserI {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  address: string;
  city: string;
  state: string;
  role: "ADMIN" | "USER";
}

// Login payload interface
export interface LoginPayloadI {
  email: string;
  password: string;
}

// Registration payload interface
export interface RegisterPayloadI {
  first_name: string;
  last_name: string;
  email: string;
  address: string;
  city: string;
  state: string;
  password: string;
  confirmPassword: string;
}

// Auth store interface
export interface AuthStoreI {
  signin: (payload: LoginPayloadI) => Promise<void>;
  signup: (payload: RegisterPayloadI) => Promise<void>;
  signout: () => void;
  isCheckingAuthentication: boolean;
  isAuthenticated: boolean;
  user: UserI | null | undefined;
}
