import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import Header from "../components/Header";

const AuthWrapper = () => {
  const token = useSelector((state) => state.auth?.token);

  if (!token) {
    // TODO:
    // Add prev location to navigate after login

    return <Navigate to='/login' />;
  }

  return (
    <>
      <Header />
      <Outlet />
    </>
  );
};

export default AuthWrapper;
