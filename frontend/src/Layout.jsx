import React, { useEffect, useState } from "react";
import { Outlet, Navigate } from "react-router-dom";
import Cloud from "./components/Cloud.jsx";
import { Provider } from "react-redux";
import store from "./App/store.js";
import { useSelector } from "react-redux";
import { setGameLoading } from "./features/vedicSlice.js";

function Layout() {

  const [loadingState,setLoadingState]=useState(false);

  const gameState=useSelector(state=>state.gameLoading);

  useEffect(()=>{
    setLoadingState(gameState)
  },[gameState])

  return (
      <>
        {/* <Cloud setGameLoading={setGameLoading} loadingState={loadingState}/> */}
        <Outlet />
      </>
  );
}

export default Layout;
