import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { register, login } from "../../utils/auth";
import { useAuthStore } from "../../store/auths";

function Register() {
    const [fullname, setFullname] = useState("");
    const [email, setEmail] = useState("");
    const [mobile, setMobile] = useState("");
    const [password, setPassword] = useState("");
    const [password2, setPassword2] = useState("");

    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    const isLoggedIn = useAuthStore((state) => state.isLoggedIn());

    useEffect(() => {
        if (isLoggedIn) {
            navigate("/");
        }
    }, [isLoading]); // Adding isLoggedIn as a dependency

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            const registerResponse = await register(
                fullname,
                email,
                mobile,
                password,
                password2
            );
            if (registerResponse.error) {
                console.error("Registration error:", registerResponse.error);
                alert(JSON.stringify(registerResponse.error));
            } else {
                const loginResponse = await login(email, password);
                if (loginResponse.error) {
                    console.error("Login error:", loginResponse.error);
                    alert(
                        "Registration successful, but automatic login failed. Please log in manually."
                    );
                    navigate("/login");
                } else {
                    navigate("/");
                }
            }
        } catch (error) {
            console.error("An exception occurred during registration:", error);
            alert("An error occurred during registration.");
        }
        setIsLoading(false); // Ensure this is called in all cases
    };

    return (
        <>
            <main
                className=""
                style={{ marginBottom: 100, marginTop: 50 }}
            >
                <div className="container">
                    {/* Section: Login form */}
                    <section className="">
                        <div className="row d-flex justify-content-center">
                            <div className="col-xl-5 col-md-8">
                                <div className="card rounded-5">
                                    <div className="card-body p-4">
                                        <h3 className="text-center">
                                            Register Account
                                        </h3>
                                        <br />

                                        <div className="tab-content">
                                            <div
                                                className="tab-pane fade show active"
                                                id="pills-login"
                                                role="tabpanel"
                                                aria-labelledby="tab-login"
                                            >
                                                <form onSubmit={handleSubmit}>
                                                    <div className="form-outline mb-4">
                                                        <label
                                                            className="form-label"
                                                            htmlFor="Full Name"
                                                        >
                                                            Full Name
                                                        </label>
                                                        <input
                                                            type="text"
                                                            id="username"
                                                            placeholder="Full Name"
                                                            required
                                                            className="form-control"
                                                            onChange={(e) =>
                                                                setFullname(
                                                                    e.target
                                                                        .value
                                                                )
                                                            }
                                                        />
                                                    </div>
                                                    <div className="form-outline mb-4">
                                                        <label
                                                            className="form-label"
                                                            htmlFor="loginName"
                                                        >
                                                            Email
                                                        </label>
                                                        <input
                                                            type="email"
                                                            id="email"
                                                            placeholder="Email Address"
                                                            required
                                                            className="form-control"
                                                            onChange={(e) =>
                                                                setEmail(
                                                                    e.target
                                                                        .value
                                                                )
                                                            }
                                                        />
                                                    </div>

                                                    <div className="form-outline mb-4">
                                                        <label
                                                            className="form-label"
                                                            htmlFor="loginName"
                                                        >
                                                            Mobile Number
                                                        </label>
                                                        <input
                                                            type="text"
                                                            id="phone"
                                                            placeholder="Mobile Number"
                                                            required
                                                            className="form-control"
                                                            onChange={(e) =>
                                                                setMobile(
                                                                    e.target
                                                                        .value
                                                                )
                                                            }
                                                        />
                                                    </div>
                                                    <div className="form-outline mb-4">
                                                        <label
                                                            className="form-label"
                                                            htmlFor="loginPassword"
                                                        >
                                                            Password
                                                        </label>
                                                        <input
                                                            type="password"
                                                            id="password"
                                                            placeholder="Password"
                                                            className="form-control"
                                                            onChange={(e) =>
                                                                setPassword(
                                                                    e.target
                                                                        .value
                                                                )
                                                            }
                                                        />
                                                    </div>
                                                    {/* Password input */}
                                                    <div className="form-outline mb-4">
                                                        <label
                                                            className="form-label"
                                                            htmlFor="loginPassword"
                                                        >
                                                            Confirm Password
                                                        </label>
                                                        <input
                                                            type="password"
                                                            id="confirm-password"
                                                            placeholder="Confirm Password"
                                                            required
                                                            className="form-control"
                                                            onChange={(e) =>
                                                                setPassword2(
                                                                    e.target
                                                                        .value
                                                                )
                                                            }
                                                        />
                                                    </div>
                                                    {/* Password Check */}
                                                    {/* <p className='fw-bold text-danger'>
                                                    {password2 !== password ? 'Passwords do not match' : ''}
                                                </p> */}

                                                    {/* Sign Up Button */}
                                                    {isLoading === true ? (
                                                        <button
                                                            className="btn btn-primary w-100"
                                                            type="submit"
                                                            disabled={isLoading}
                                                        >
                                                            <span className="me-2">
                                                                Processing
                                                            </span>
                                                            <i className="fas fa-spinner fa-spin" />
                                                        </button>
                                                    ) : (
                                                        <button
                                                            className="btn btn-primary w-100"
                                                            type="submit"
                                                            disabled={isLoading}
                                                        >
                                                            <span className="me-2">
                                                                Sign Up
                                                            </span>
                                                            <i className="fas fa-user-plus" />
                                                        </button>
                                                    )}

                                                    {/* Sign Up Button End */}

                                                    <div className="text-center">
                                                        <p className="mt-4">
                                                            Already have an
                                                            account?{" "}
                                                            <Link to="/login/">
                                                                Login
                                                            </Link>
                                                        </p>
                                                    </div>
                                                </form>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
            </main>
        </>
    );
}

export default Register;
