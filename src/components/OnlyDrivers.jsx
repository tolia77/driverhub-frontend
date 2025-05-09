import React from 'react';
import {Outlet} from "react-router";
import RequireAuth from "src/components/RequireAuth.jsx";
import {getUserRole} from "src/utils/auth.js";
import AccessDenied from "src/components/AccessDenied.jsx";

function OnlyDrivers() {
    const role = getUserRole();
    return (
        <RequireAuth>
            {role === "driver" ? <Outlet/> : <AccessDenied/>}
        </RequireAuth>
    );
}

export default OnlyDrivers;