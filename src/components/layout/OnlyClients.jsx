import React, {useEffect} from 'react';
import {Outlet, useNavigate} from "react-router";
import RequireAuth from "src/components/RequireAuth.jsx";
import {getUserRole} from "src/utils/auth.js";

function OnlyClients() {
    const navigate = useNavigate();
    useEffect(() => {
        if (getUserRole() !== "client") {
            console.log(getUserRole());
            navigate("/login");
        }
    }, [])
    return (
        <RequireAuth>
            <Outlet/>
        </RequireAuth>
    );
}

export default OnlyClients;