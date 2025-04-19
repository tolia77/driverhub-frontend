import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { getMe } from "src/services/backend/authRequests";

const Account = () => {
    const navigate = useNavigate();
    const [account, setAccount] = useState({
        username: "",
        email: "",
        status: "",
        license_number: null
    });

    useEffect(() => {
        const fetchAccountData = async () => {
            try {
                const response = await getMe(localStorage.getItem("accessToken"));
                setAccount({
                    username: response.data.data.display_name,
                    email: response.data.data.email,
                    status: response.data.data.additional_data.type,
                    license_number: response.data.data.additional_data.license_number,
                });
            } catch (error) {
                console.error("Error fetching account data:", error);
            }
        };

        fetchAccountData();
    }, []);

    const handleLogout = () => {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        localStorage.removeItem("accountType");
        localStorage.removeItem("userId");
        navigate("/auth/login");
    };

    return (
        <div className="container py-5">
            <div className="row justify-content-center">
                <div className="col-md-8 col-lg-6">
                    <div className="card shadow-sm">
                        <div className="card-body p-4">
                            <h1 className="card-title text-center mb-4">Account Details</h1>

                            <div className="mb-4">
                                <div className="d-flex justify-content-between py-2 border-bottom">
                                    <span className="fw-bold">Username:</span>
                                    <span>{account.username}</span>
                                </div>
                                <div className="d-flex justify-content-between py-2 border-bottom">
                                    <span className="fw-bold">Email:</span>
                                    <span>{account.email}</span>
                                </div>
                                <div className="d-flex justify-content-between py-2 border-bottom">
                                    <span className="fw-bold">Status:</span>
                                    <span className="text-capitalize">{account.status}</span>
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
    );
};

export default Account;