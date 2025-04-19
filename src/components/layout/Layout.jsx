import React from 'react';
import {Outlet} from "react-router";
import Header from "src/components/layout/Header.jsx";

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