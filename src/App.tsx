import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import ProtectedRoutes from "./routes/ProtectedRoutes";
import Login from "./pages/Login";
import Register from "./pages/Register";
import CompanyDetail from "./pages/CompanyDetail";
import useLoggedIn from "./hooks/useLoggedIn";
import { useEffect } from "react";

const App = () => {
  const loggedIn = useLoggedIn((state) => state.loggedIn);

  useEffect(() => {
    localStorage.setItem("loggedIn", JSON.stringify(loggedIn));
  }, [loggedIn]);

  return (
    <>
      <Routes>
        <Route element={<ProtectedRoutes />}>
          <Route path="/" element={<Home />} />
          <Route path="/companies/:id" element={<CompanyDetail />} />
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </>
  );
};

export default App;
