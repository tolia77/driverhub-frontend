import React, {useEffect} from 'react';
import {Outlet, useNavigate} from "react-router";
import RequireAuth from "src/components/RequireAuth.jsx";
import {getUserRole} from "src/utils/auth.js";

function OnlyDrivers() {
    const navigate = useNavigate();
    useEffect(() => {
        if (getUserRole() !== "driver") {
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

export default OnlyDrivers;