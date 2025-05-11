import {useState} from 'react';
import {Link, useNavigate} from 'react-router';
import {registerClientRequest, signInRequest} from "src/services/backend/authRequests.js";

function SignUp() {
    const [first_name, setfirst_name] = useState("");
    const [last_name, setlast_name] = useState("");
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
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
            first_name: first_name,
            last_name: last_name,
            email: email,
            phone_number: phone,
            password: password,
        };

        registerClientRequest(requestData).then(() => {
            signInRequest(email, password).then((result) => {
                localStorage.setItem('accessToken', `Bearer ${result.data.access_token}`);
                localStorage.setItem('accountType', 'client');
                navigate("/client/deliveries");
            });
        });
    };

    return (
        <div className="min-vh-100 d-flex justify-content-center align-items-center">
            <div className="card shadow-sm p-4 my-4" style={{width: '380px'}}>
                <div className="card-body">
                    <h2 className="text-center mb-4">Create an Account</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label htmlFor="first_name" className="form-label">Ім'я</label>
                            <input
                                type="text"
                                className="form-control"
                                id="first_name"
                                value={first_name}
                                onChange={(e) => setfirst_name(e.target.value)}
                                placeholder="Enter your first name"
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="last_name" className="form-label">Прізвище</label>
                            <input
                                type="text"
                                className="form-control"
                                id="last_name"
                                value={last_name}
                                onChange={(e) => setlast_name(e.target.value)}
                                placeholder="Enter your last name"
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
                            <label htmlFor="phone" className="form-label">Номер телефону</label>
                            <input
                                className="form-control"
                                id="phone"
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                                placeholder="Enter your номер телефону"
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