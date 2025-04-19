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
  "name": string,
  "address": string,
  "phone": string,
  "email": string,
  "user_email": string,
  "password": string,
  "first_name": string,
  "last_name": string
  confirmPassword? : string
}

export interface RegisterUserPayloadI{
  "org_id": string,
  "email": string,
  "password": string,
  "first_name": string,
  "last_name": string,
  "phone": string,
  "address": string,
  "city": string,
  "state": string,
  "zip_code": string,
  "country": string
  confirmPassword? : string
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
