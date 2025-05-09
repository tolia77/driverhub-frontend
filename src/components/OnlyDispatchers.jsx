import React from 'react';
import {Outlet} from "react-router";
import RequireAuth from "src/components/RequireAuth.jsx";
import {getUserRole} from "src/utils/auth.js";
import AccessDenied from "src/components/AccessDenied.jsx";

function OnlyDispatchers() {
    const role = getUserRole();
    return (
        <RequireAuth>
            {role === "dispatcher" ? <Outlet/> : <AccessDenied/>}
        </RequireAuth>
    );
}

export default OnlyDispatchers;