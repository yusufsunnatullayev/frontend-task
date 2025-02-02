import { Navigate, Outlet } from "react-router-dom";
import useLoggedIn from "../hooks/useLoggedIn";

const ProtectedRoutes = () => {
  const loggedIn = useLoggedIn((state) => state.loggedIn);

  return loggedIn ? <Outlet /> : <Navigate to={"/login"} />;
};

export default ProtectedRoutes;
