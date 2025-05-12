import {Link} from "react-router";
import {getUserRole} from "src/utils/auth.js";
import logo from "src/assets/img/logo-light-no-bg.png";

export default function Header() {
    const userRole = getUserRole();

    return (
        <header className="navbar navbar-expand-lg navbar-dark bg-dark shadow-sm">
            <div className="container-fluid">
                <Link to="/" className="navbar-brand d-flex align-items-center me-4">
                    <img src={logo} alt="Logo" height="50" className="me-2"/>
                    <span className="fw-bold">DriveTrack</span>
                </Link>
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
                    <ul className="navbar-nav me-auto">
                        {userRole === 'dispatcher' && (
                            <>
                                <li className="nav-item">
                                    <Link to="/dispatcher/deliveries" className="nav-link px-2">Доставки</Link>
                                </li>
                                <li className="nav-item">
                                    <Link to="/dispatcher/drivers" className="nav-link px-2">Водії</Link>
                                </li>
                                <li className="nav-item">
                                    <Link to="/dispatcher/vehicles" className="nav-link px-2">Транспортні засоби</Link>
                                </li>
                                <li className="nav-item">
                                    <Link to="/dispatcher/log-breaks" className="nav-link px-2">Перерви</Link>
                                </li>
                                <li className="nav-item">
                                    <Link to="/dispatcher/chat" className="nav-link px-2">Чат</Link>
                                </li>
                            </>
                        )}
                        {userRole === 'admin' && (
                            <>
                                <>
                                    <li className="nav-item">
                                        <Link to="/admin/drivers" className="nav-link px-2">Водії</Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link to="/admin/dispatchers" className="nav-link px-2">Диспетчери</Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link to="/admin/clients" className="nav-link px-2">Клієнти</Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link to="/admin/deliveries" className="nav-link px-2">Доставки</Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link to="/admin/vehicles" className="nav-link px-2">Транспортні засоби</Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link to="/admin/log-breaks" className="nav-link px-2">Перерви</Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link to="/admin/reviews" className="nav-link px-2">Відгуки</Link>
                                    </li>
                                </>
                            </>
                        )}
                        {userRole === 'driver' && (
                            <>
                                <li className="nav-item">
                                    <Link to="/driver/deliveries" className="nav-link px-2">Доставки</Link>
                                </li>
                                <li className="nav-item">
                                    <Link to="/driver/log-breaks" className="nav-link px-2">Перерви</Link>
                                </li>
                                <li className="nav-item">
                                    <Link to="/driver/chat" className="nav-link px-2">Чат</Link>
                                </li>
                            </>
                        )}

                        {userRole === 'client' && (
                            <>
                                <li className="nav-item">
                                    <Link to="/client/deliveries" className="nav-link px-2">Доставки</Link>
                                </li>
                                <li className="nav-item">
                                    <Link to="/client/reviews" className="nav-link px-2">Мої відгуки</Link>
                                </li>
                            </>
                        )}
                    </ul>

                    <ul className="navbar-nav">
                        {userRole ? (
                            <li className="nav-item">
                                <Link to="/account" className="nav-link px-2">Мій акаунт</Link>
                            </li>
                        ) : (
                            <>
                                <li className="nav-item">
                                    <Link to="/login" className="nav-link px-2">Увійти</Link>
                                </li>
                                <li className="nav-item">
                                    <Link to="/signup" className="nav-link px-2">Зареєструватись</Link>
                                </li>
                            </>
                        )}
                    </ul>
                </div>
            </div>
        </header>
    );
}