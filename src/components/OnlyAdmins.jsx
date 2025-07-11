import React from 'react';
import {Outlet} from "react-router";
import RequireAuth from "src/components/RequireAuth.jsx";
import {getUserRole} from "src/utils/auth.js";
import AccessDenied from "src/components/AccessDenied.jsx";

function OnlyAdmins() {
    const role = getUserRole();
    return (
        <RequireAuth>
            {role === "admin" ? <Outlet/> : <AccessDenied/>}
        </RequireAuth>
    );
}

export default OnlyAdmins;