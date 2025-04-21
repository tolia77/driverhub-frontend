import {Link} from "react-router";
import {getUserRole} from "src/utils/auth.js";

export default function Header() {
    const userRole = getUserRole();

    return (
        <header className="navbar navbar-expand-lg navbar-dark bg-dark shadow-sm">
            <div className="container-fluid">
                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarContent"
                    aria-controls="navbarContent"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarContent">
                    <ul className="navbar-nav mx-auto">
                        {userRole === 'dispatcher' && (
                            <>
                                <li className="nav-item mx-2">
                                    <Link to="/dispatcher/deliveries" className="nav-link px-3 py-2">Deliveries</Link>
                                </li>
                                <li className="nav-item mx-2">
                                    <Link to="/dispatcher/drivers" className="nav-link px-3 py-2">Drivers</Link>
                                </li>
                                <li className="nav-item mx-2">
                                    <Link to="/dispatcher/vehicles" className="nav-link px-3 py-2">Vehicles</Link>
                                </li>
                                <li className="nav-item mx-2">
                                    <Link to="/dispatcher/log-breaks" className="nav-link px-3 py-2">Breaks</Link>
                                </li>
                                <li className="nav-item mx-2">
                                    <Link to="/dispatcher/chat" className="nav-link px-3 py-2">Chat</Link>
                                </li>
                                <li className="nav-item mx-2">
                                    <Link to="/account" className="nav-link px-3 py-2">Account</Link>
                                </li>
                            </>
                        )}

                        {userRole === 'driver' && (
                            <>
                                <li className="nav-item mx-2">
                                    <Link to="/driver/deliveries" className="nav-link px-3 py-2">Deliveries</Link>
                                </li>
                                <li className="nav-item mx-2">
                                    <Link to="/driver/log-breaks" className="nav-link px-3 py-2">Breaks</Link>
                                </li>
                                <li className="nav-item mx-2">
                                    <Link to="/driver/chat" className="nav-link px-3 py-2">Chat</Link>
                                </li>
                                <li className="nav-item mx-2">
                                    <Link to="/account" className="nav-link px-3 py-2">Account</Link>
                                </li>
                            </>
                        )}
                        {userRole === 'client' && (
                            <>
                                <li className="nav-item mx-2">
                                    <Link to="/client/deliveries" className="nav-link px-3 py-2">Deliveries</Link>
                                </li>
                                <li className="nav-item mx-2">
                                    <Link to="/account" className="nav-link px-3 py-2">Account</Link>
                                </li>
                            </>
                        )}
                        {!userRole && (
                            <>
                                <li className="nav-item mx-2">
                                    <Link to="/login" className="nav-link px-3 py-2">Log in</Link>
                                </li>
                                <li className="nav-item mx-2">
                                    <Link to="/signup" className="nav-link px-3 py-2">Sign up</Link>
                                </li>
                            </>
                        )}
                    </ul>
                </div>
            </div>
        </header>
    );
}