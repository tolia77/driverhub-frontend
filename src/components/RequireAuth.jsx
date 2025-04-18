import {Outlet, useNavigate} from "react-router";
import {auth} from "../services/firebase.js";

function RequireAuth() {
    const navigate = useNavigate();
    if (!auth.currentUser) {
        navigate("/login");
    }
    return (
        <Outlet/>
    )
}

export default RequireAuth;