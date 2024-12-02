import React from "react";
import { Outlet, Navigate } from "react-router-dom";
import Navbar from "./components/header/Navbar.jsx";

function Layout({ isAuthenticated, isUserAuthenticated }) {
  return (
    <>
      <Navbar/>
      <Outlet />
    </>
  );
}

export default Layout;
