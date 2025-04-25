import {Outlet, useNavigate} from "react-router";
import {auth} from "src/services/firebase.js";
import {useEffect} from "react";
import {getUserRole} from "src/utils/auth.js";

function RequireAuth() {
    const navigate = useNavigate();
    useEffect(() => {
        if (!auth.currentUser) {
            navigate("/login");
        }
    }, [])
    return (
        <Outlet/>
    )
}

export default RequireAuth;