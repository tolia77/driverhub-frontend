import React, {useEffect} from 'react';
import {Outlet, useNavigate} from "react-router";
import RequireAuth from "src/components/RequireAuth.jsx";
import {getUserRole} from "src/utils/auth.js";

function OnlyAdmins() {
    const navigate = useNavigate();
    useEffect(() => {
        if (getUserRole() !== "admin") {
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

export default OnlyAdmins;