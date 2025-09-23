import {type Location, Navigate, Outlet, useLocation} from "react-router-dom";

export default function ProtectedRoute() {
  const token:string | null = sessionStorage.getItem("accessToken");
  const location:Location = useLocation();

  if (!token) {
    return <Navigate to="/signin" replace state={{ from: location }} />;
  }

  return <Outlet />;
}
