import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { getMe } from "src/services/backend/authRequests";
import RequireAuth from "src/components/RequireAuth.jsx";

const Account = () => {
    const navigate = useNavigate();
    const [account, setAccount] = useState({
        first_name: "",
        last_name: "",
        email: "",
        status: "",
        license_number: null
    });

    useEffect(() => {
        const fetchAccountData = async () => {
            try {
                const response = await getMe(localStorage.getItem("accessToken"));
                setAccount({
                    first_name: response.data.first_name,
                    last_name: response.data.last_name,
                    email: response.data.email,
                    role: response.data.type,
                    license_number: response.data.license_number,
                });
            } catch (error) {
                console.error("Error fetching account data:", error);
            }
        };

        fetchAccountData();
    }, []);

    const handleLogout = () => {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("accountType");
        localStorage.removeItem("userId");
        navigate("/login");
    };

    return (
        <RequireAuth>
            <div className="container py-5">
                <div className="row justify-content-center">
                    <div className="col-md-8 col-lg-6">
                        <div className="card shadow-sm">
                            <div className="card-body p-4">
                                <h1 className="card-title text-center mb-4">Account Details</h1>

                                <div className="mb-4">
                                    <div className="d-flex justify-content-between py-2 border-bottom">
                                        <span className="fw-bold">First name:</span>
                                        <span>{account.first_name}</span>
                                    </div>
                                    <div className="d-flex justify-content-between py-2 border-bottom">
                                        <span className="fw-bold">Last name:</span>
                                        <span>{account.last_name}</span>
                                    </div>
                                    <div className="d-flex justify-content-between py-2 border-bottom">
                                        <span className="fw-bold">Email:</span>
                                        <span>{account.email}</span>
                                    </div>
                                    <div className="d-flex justify-content-between py-2 border-bottom">
                                        <span className="fw-bold">Role:</span>
                                        <span className="text-capitalize">{account.role}</span>
                                    </div>
                                    {account.license_number && (
                                        <div className="d-flex justify-content-between py-2 border-bottom">
                                            <span className="fw-bold">License number:</span>
                                            <span>{account.license_number}</span>
                                        </div>
                                    )}
                                </div>

                                <div className="text-center mt-4">
                                    <button
                                        className="btn btn-danger px-4"
                                        onClick={handleLogout}
                                    >
                                        Logout
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </RequireAuth>
    );
};

export default Account;