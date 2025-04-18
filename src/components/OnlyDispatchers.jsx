import React, {useEffect} from 'react';
import {Outlet, useNavigate} from "react-router";
import RequireAuth from "./RequireAuth.jsx";
import {getUserRole} from "../utils/auth.js";

function OnlyDispatchers() {
    const navigate = useNavigate();
    useEffect(() => {
        if (getUserRole() !== "dispatcher") {
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

export default OnlyDispatchers;