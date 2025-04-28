import { useState } from 'react';
import { Link, useNavigate } from 'react-router';
import {registerDispatcher, signIn} from "src/services/backend/authRequests.js";

function SignUp() {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            alert("Passwords do not match!");
            return;
        }
        const requestData = {
            name: username,
            email: email,
            password: password,
        }

        registerDispatcher(requestData).then(() => {
            signIn(email, password).then((result) => {
                localStorage.setItem('accessToken', `Bearer ${result.accessToken}`);
                localStorage.setItem('accountType', 'dispatcher');
                navigate("/dispatcher/deliveries");
            })
        })
    };

    return (
        <div className="min-vh-100 d-flex justify-content-center align-items-center bg-light">
            <div className="card shadow-sm p-4" style={{ width: '380px' }}>
                <div className="card-body">
                    <h2 className="text-center mb-4">Create an Account</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label htmlFor="username" className="form-label">Username</label>
                            <input
                                type="text"
                                className="form-control"
                                id="username"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                placeholder="Enter your Username"
                                required
                            />
                        </div>
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
                        <div className="mb-3">
                            <label htmlFor="confirmPassword" className="form-label">Confirm Password</label>
                            <input
                                type="password"
                                className="form-control"
                                id="confirmPassword"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                placeholder="Confirm your password"
                                required
                            />
                        </div>
                        <button type="submit" className="btn btn-primary w-100 py-2 mb-3">Sign Up</button>
                        <p className="text-center text-muted mb-0">
                            Already have an account? <Link to="/login" className="text-decoration-none">Log In</Link>
                        </p>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default SignUp;