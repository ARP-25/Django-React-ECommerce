import React, { useEffect } from "react";
import { logout } from "../../utils/auth";
import { Link } from "react-router-dom";

function Logout() {
    useEffect(() => {
        logout();
    }, []);

    return (
        <section>
            <main className="" style={{ marginBottom: 100, marginTop: 80 }}>
                <div className="container">
                    {/* Section: Login form */}
                    <section className="">
                        <div className="row d-flex justify-content-center">
                            <div className="col-xl-5 col-md-8">
                                <div className="card rounded-5">
                                    <div className="card-body p-4 text-center">
                                        <h3>You have been logged out</h3>
                                        <Link to="/login" className="btn btn-primary mt-4 ">
                                            Login <i className="fas fa-sign-in-alt ms-2" />
                                        </Link>
                                        <Link to="/register" className="btn btn-primary ms-2 mt-4">
                                            Register <i className="fas fa-user-plus ms-2" />
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
            </main>
        </section>
    );
}

export default Logout;
