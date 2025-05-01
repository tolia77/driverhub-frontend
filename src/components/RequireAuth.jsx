import {useNavigate} from "react-router";
import {useEffect} from "react";
import {getAccessToken} from "src/utils/auth.js";

function RequireAuth({children}) {
    const navigate = useNavigate();
    useEffect(() => {
        if (!getAccessToken()) {
            navigate("/login");
        }
    }, [])
    return (
        children
    )
}

export default RequireAuth;