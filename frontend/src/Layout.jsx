import React from "react";
import { Outlet, Navigate } from "react-router-dom";
import Navbar from "./components/header/Navbar.jsx";

function Layout({ isAuthenticated, isUserAuthenticated }) {
  return isAuthenticated ? (
    <>
      <Navbar />
      <Outlet />
    </>
  ) : (
    <Navigate replace to="/login" />
  );
}

export default Layout;
