import React from 'react';
import {Link} from "react-router";
import {getUserId} from "src/utils/auth.js";

function Index() {
    return (
        <section className="container py-5">
            <h1 className="text-center mb-5 fw-bold">
                Ласкаво просимо до <span className="text-primary">DriveTrack</span>
            </h1>

            <div className="text-center mb-4">
                {!getUserId() ? (
                    <div className="d-flex justify-content-center gap-3">
                        <Link to="/login" className="btn btn-primary px-4 py-2">
                            Увійти
                        </Link>
                        <Link to="/signup" className="btn btn-outline-primary px-4 py-2">
                            Зареєструватися
                        </Link>
                    </div>
                ) : (
                    <div className="d-flex justify-content-center gap-3">
                        <Link to="/account" className="btn btn-lg btn-primary px-4 py-2">
                            Мій акаунт
                        </Link>
                    </div>
                )}
            </div>

            <div className="bg-light p-4 rounded shadow-sm mb-5">
                <h3 className="mb-3 text-primary">Що таке DriveTrack?</h3>
                <p className="mb-0">
                    <strong>DriveTrack</strong> — це сучасний вебдодаток для логістичних компаній, який дозволяє
                    диспетчерам, водіям і клієнтам ефективно взаємодіяти в режимі реального часу. Основна мета —
                    полегшити процеси доставки, покращити контроль та зміцнити взаємодію між усіма учасниками доставки.
                </p>
            </div>

            <div className="row text-center gy-4">
                <div className="col-md-4">
                    <div className="card h-100 shadow-sm border">
                        <div className="card-body">
                            <h5 className="card-title text-success mb-3">
                                <i className="bi bi-truck"></i> Просте керування доставками
                            </h5>
                            <p className="card-text">Створюйте, відстежуйте та керуйте доставками у кілька кліків.</p>
                        </div>
                    </div>
                </div>
                <div className="col-md-4">
                    <div className="card h-100 shadow-sm border">
                        <div className="card-body">
                            <h5 className="card-title text-danger mb-3">
                                <i className="bi bi-shield-lock"></i> Безпека та контроль
                            </h5>
                            <p className="card-text">Ваші дані захищені, а дії користувачів — під контролем.</p>
                        </div>
                    </div>
                </div>
                <div className="col-md-4">
                    <div className="card h-100 shadow-sm border">
                        <div className="card-body">
                            <h5 className="card-title text-info mb-3">
                                <i className="bi bi-person-badge"></i> Ролі користувачів
                            </h5>
                            <p className="card-text">Індивідуальні кабінети для клієнтів, водіїв та диспетчерів.</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Index;
