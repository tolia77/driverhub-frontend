import {Outlet, useNavigate} from "react-router";
import {auth} from "src/services/firebase.js";
import {useEffect} from "react";

function RequireAuth({children}) {
    const navigate = useNavigate();
    useEffect(() => {
        if (!auth.currentUser) {
            navigate("/login");
        }
    }, [])
    return (
        children
    )
}

export default RequireAuth;