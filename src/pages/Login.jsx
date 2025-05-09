import {useState} from 'react';
import {Link, useNavigate} from 'react-router';
import {getMeRequest, signInRequest} from "src/services/backend/authRequests.js";
import {getUserRole} from "src/utils/auth.js";

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        signInRequest(email, password).then(result => {
            localStorage.setItem('accessToken', `Bearer ${result.data.access_token}`);
            getMeRequest(`Bearer ${result.data.access_token}`).then(result => {
                localStorage.setItem('accountType', result.data.type);
                localStorage.setItem('userId', result.data.id)
                if (getUserRole() === "driver") {
                    navigate("/driver/deliveries");
                } else if (getUserRole() === "dispatcher") {
                    navigate("/dispatcher/deliveries");
                } else if (getUserRole() === "client") {
                    navigate("/client/deliveries");
                }else if (getUserRole() === "admin") {
                    navigate("/admin/deliveries");
                }
            })
        }).catch(error => {
            console.log(error);
            alert("Error signing in!")
        });
    };

    return (
        <div className="min-vh-100 d-flex justify-content-center align-items-center">
            <div className="card shadow-sm p-4" style={{width: '380px'}}>
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