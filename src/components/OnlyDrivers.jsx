import React, {useEffect} from 'react';
import {Outlet, useNavigate} from "react-router";
import RequireAuth from "./RequireAuth.jsx";
import {getUserRole} from "../utils/auth.js";

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