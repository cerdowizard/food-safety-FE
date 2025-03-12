import { LoginPayloadI, RegisterPayloadI } from "../../types/auth/user.type";

const fakeAuthAPI = {
  signin: async (payload: LoginPayloadI) => {
    // Simulate an API call
    return new Promise(resolve => {
      setTimeout(() => {
        resolve({
          user: {
            id: "123",
            first_name: "John",
            last_name: "Doe",
            email: payload.email,
            address: "123 Main St",
            city: "New York",
            state: "NY",
            role: "USER",
          },
        });
      }, 1000); // Simulate network delay
    });
  },

  signup: async (payload: RegisterPayloadI) => {
    // Simulate an API call
    return new Promise(resolve => {
      setTimeout(() => {
        resolve({
          user: {
            id: "456",
            first_name: payload.first_name,
            last_name: payload.last_name,
            email: payload.email,
            address: payload.address,
            city: payload.city,
            state: payload.state,
            role: "USER",
          },
        });
      }, 1000); // Simulate network delay
    });
  },
};

export default fakeAuthAPI;
