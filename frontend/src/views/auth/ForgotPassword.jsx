import React from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import apiInstance from "../../utils/axios";

function ForgotPassword() {
    const [email, setEmail] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const navigate = useNavigate();

    const handleSubmit = async () => {
        setIsLoading(true);
        try {
            await apiInstance.get(`/user/password-reset/${email}/`).then((res) => {
                alert("Password reset link sent to your email");
                setIsLoading(false);
                //navigate("/create-new-password");
            });
        } catch (error) {
            alert("Email not found");
            setIsLoading(false);

            console.log(error);
        }
    };

    return (
        <section>
            <main className="" style={{ marginBottom: 100, marginTop: 50 }}>
                <div className="container">
                    {/* Section: Login form */}
                    <section className="">
                        <div className="row d-flex justify-content-center">
                            <div className="col-xl-5 col-md-8">
                                <div className="card rounded-5">
                                    <div className="card-body p-4">
                                        <h3 className="text-center">Forgot Password</h3>
                                        <br />

                                        <div className="tab-content">
                                            <div
                                                className="tab-pane fade show active"
                                                id="pills-login"
                                                role="tabpanel"
                                                aria-labelledby="tab-login"
                                            >
                                                <div>
                                                    {/* Email input */}
                                                    <div className="form-outline mb-4">
                                                        <label
                                                            className="form-label"
                                                            htmlFor="Full Name"
                                                        >
                                                            Email Address
                                                        </label>
                                                        <input
                                                            type="text"
                                                            id="email"
                                                            name="email"
                                                            value={email}
                                                            onChange={(e) =>
                                                                setEmail(e.target.value)
                                                            }
                                                            className="form-control"
                                                        />
                                                    </div>

                                                    <div className="text-center">
                                                        {isLoading === true ? (
                                                            <button
                                                                className="btn btn-primary w-100"
                                                                type="button"
                                                                disabled={isLoading}
                                                            >
                                                                <span className="me-2">
                                                                    Processing
                                                                </span>
                                                                <i className="fas fa-spinner fa-spin" />
                                                            </button>
                                                        ) : (
                                                            <button
                                                                onClick={handleSubmit}
                                                                className="btn btn-primary w-100"
                                                                type="button"
                                                            >
                                                                Reset Password{" "}
                                                                <i className="fas fa-key ms-2" />
                                                            </button>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
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

export default ForgotPassword;
