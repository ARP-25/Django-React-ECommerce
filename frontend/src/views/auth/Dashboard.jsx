import React from "react";
import { useAuthStore } from "../../store/auths";
import { Link } from "react-router-dom";

function Dashboard() {
    const [isLoggedIn, setIsLoggedIn] = useAuthStore((state) => [
        state.isLoggedIn,
        state.user,
    ]);

    return (
        <>
            {isLoggedIn() ? (
                <div>
                    <h1> Dashboard </h1>
                    <Link to="/logout">Logout</Link>
                </div>
            ) : (
                <div>
                    <h1>Home Page </h1>
                    <div className="d-flex">
                        <Link
                            className="btn btn-primary"
                            to="/login"
                        >
                            Login
                        </Link>
                        <br />
                        <Link
                            className="btn btn-primary ms-4"
                            to="/register"
                        >
                            Register
                        </Link>
                    </div>
                </div>
            )}
        </>
    );
}

export default Dashboard;
