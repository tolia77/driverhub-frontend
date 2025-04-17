import React from 'react';
import {Outlet} from "react-router";
import Header from "./Header.jsx";

function Layout() {
    return (
        <>
            <Header/>
            <main>
                <Outlet/>
            </main>
        </>
    );
}

export default Layout;