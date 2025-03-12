import React, { useEffect, useState } from "react";
import { Outlet, Navigate } from "react-router-dom";
import Cloud from "./components/Cloud.jsx";
import { Provider } from "react-redux";
import store from "./App/store.js";
import { useSelector } from "react-redux";

function Layout() {


  return (
      <>
        <Outlet />
      </>
  );
}

export default Layout;
