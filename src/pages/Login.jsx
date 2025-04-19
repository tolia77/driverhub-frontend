import { useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { firebaseLogin } from "src/services/firebaseLogin.js";
import { getMe } from "src/services/backend/authRequests.js";

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        firebaseLogin(email, password).then(result => {
            localStorage.setItem('accessToken', `Bearer ${result.accessToken}`);
            localStorage.setItem('refreshToken', `Bearer ${result.refreshToken}`);
            getMe(`Bearer ${result.accessToken}`).then(result => {
                localStorage.setItem('accountType', result.data.data.additional_data.type);
                localStorage.setItem('userId', result.data.data.uid)
                if(localStorage.getItem('accountType') === "driver"){
                    navigate("/driver/deliveries");
                }
                else if(localStorage.getItem('accountType') === "dispatcher") {
                    navigate("/dispatcher/deliveries");
                }
            })
        }).catch(error => {
            console.log(error);
            alert("Error signing in!")
        });
    };

    return (
        <div className="min-vh-100 d-flex justify-content-center align-items-center bg-light">
            <div className="card shadow-sm p-4" style={{ width: '380px' }}>
                <div className="card-body">
                    <h2 className="text-center mb-4">Welcome Back</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label htmlFor="email" className="form-label">Email</label>
                            <input
                                type="email"
                                className="form-control"
                                id="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Enter your email"
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="password" className="form-label">Password</label>
                            <input
                                type="password"
                                className="form-control"
                                id="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Enter your password"
                                required
                            />
                        </div>
                        <button type="submit" className="btn btn-primary w-100 py-2 mb-3">Log In</button>
                        <p className="text-center text-muted mb-0">
                            Don't have an account? <Link to="/signup" className="text-decoration-none">Sign up</Link>
                        </p>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Login;