import React from 'react';
import {Link} from "react-router";
import {getUserId} from "src/utils/auth.js";

function Index() {
    return (
        <section className="text-center mt-5">
            <h1 className="mb-4 fw-bold">Ласкаво просимо до <span className="text-primary">DriveTrack</span></h1>

            {!getUserId() ? <div className="d-flex justify-content-center gap-3">
                <Link to="/login" className="btn btn-primary px-4 py-2">
                    Увійти
                </Link>

                <Link to="/signup" className="btn btn-outline-primary px-4 py-2">
                    Зареєструватися
                </Link>
            </div> : <div className="d-flex justify-content-center gap-3">
                <Link to="/account" className="btn btn-lg btn-primary px-4 py-2">
                    Мій акаунт
                </Link>
            </div>}
        </section>
    );
}

export default Index;