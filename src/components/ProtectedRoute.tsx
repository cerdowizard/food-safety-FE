import { Outlet, useNavigate} from "react-router-dom";
import { useEffect } from "react";
import { useUserData } from "../contexts/UserDataContext";

const ProtectedRoute = () => {
  const { user } = useUserData();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/auth/login", { replace: true });
    }
  }, [user, navigate]);

  // Don't render anything while checking authentication
  if (!user) {
    return null;
  }

  return <Outlet/>;
};

export default ProtectedRoute;
