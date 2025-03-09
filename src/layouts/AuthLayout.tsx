// src/layouts/AuthLayout.tsx
import { Outlet } from "react-router-dom";

const AuthLayout = () => {
  return (
    <div className=" w-full" >
      <Outlet /> {/* Renders the nested route component */}
    </div>
  );
};

export default AuthLayout;
