import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import Header from './components/header/Header.jsx';

function Layout({isAuthenticated}) {

    return isAuthenticated ?
        <>
            {/* <Header  isUserAuthenticated={isUserAuthenticated}/> */}
            <Outlet />
        </>
        :
        <Navigate replace to="/login"/>
}

export default Layout;
