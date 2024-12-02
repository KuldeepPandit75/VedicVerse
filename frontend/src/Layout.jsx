import React from "react";
import { Outlet, Navigate } from "react-router-dom";
import Navbar from "./components/header/Navbar.jsx";

function Layout({ isAuthenticated, isUserAuthenticated }) {
  return (
    <>
      <Outlet />
    </>
  );
}

export default Layout;
