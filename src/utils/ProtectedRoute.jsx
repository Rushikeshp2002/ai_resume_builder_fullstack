/* eslint-disable no-unused-vars */
import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useUser } from "../context/UserContext"; 

const ProtectedRoute = () => {
  const { user } = useUser(); 

  if (!user) {
    return <Navigate to="/register" replace />; 
  }

  return <Outlet />;
};

export default ProtectedRoute;
