import React from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { getuser } from "../services/userServisces";

const ProtectedRoute = () => {
  const location = useLocation();

  return getuser() ? (
    <Outlet />
  ) : (
    <Navigate to="/login" state={{ from: location.pathname }} />
  );
};

export default ProtectedRoute;
