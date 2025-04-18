import React from 'react';
import {Outlet} from "react-router";
import RequireAuth from "./RequireAuth.jsx";

function OnlyDispatchers() {
    return (
        <RequireAuth>
            <Outlet/>
        </RequireAuth>
    );
}

export default OnlyDispatchers;