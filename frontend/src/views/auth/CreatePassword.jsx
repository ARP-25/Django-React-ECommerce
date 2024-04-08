import React from "react";
import { useState } from "react";
import apiInstance from "../../utils/axios";
import { useSearchParams, useNavigate } from "react-router-dom";

function CreatePassword() {
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [searchParams] = useSearchParams();
    const [isLoading, setIsLoading] = useState(false);
    const otp = searchParams.get("otp");
    const uidb64 = searchParams.get("uidb64");
    const navigate = useNavigate();

    const handlePasswordSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        if (password !== confirmPassword) {
            alert("Passwords do not match");
            setIsLoading(false);
            return;
        } else {
            setIsLoading(true);

            const formdata = new FormData();
            formdata.append("password", password);
            formdata.append("otp", otp);
            formdata.append("uidb64", uidb64);
            try {
                await apiInstance.post("/user/password-change/", formdata).then((res) => {
                    console.log(res.data);
                    alert("Password reset successful");
                    navigate("/login");
                });
            } catch (error) {
                alert("Password change failed");
                console.log(error);
            }
            setIsLoading(false);
        }
    };

    return (
        <section>
            <main className="" style={{ marginBottom: 100, marginTop: 50 }}>
                <div className="container">
                    <section className="">
                        <div className="row d-flex justify-content-center">
                            <div className="col-xl-5 col-md-8">
                                <div className="card rounded-5">
                                    <div className="card-body p-4">
                                        <h3 className="text-center">Create New Password</h3>
                                        <br />

                                        <div className="tab-content">
                                            <div
                                                className="tab-pane fade show active"
                                                id="pills-login"
                                                role="tabpanel"
                                                aria-labelledby="tab-login"
                                            >
                                                <form>
                                                    {/* Password input */}
                                                    <div className="form-outline mb-4">
                                                        <label
                                                            className="form-label"
                                                            htmlFor="Password"
                                                        >
                                                            Enter New Password
                                                        </label>
                                                        <input
                                                            type="password"
                                                            name="password"
                                                            value={password}
                                                            className="form-control"
                                                            onChange={(e) =>
                                                                setPassword(e.target.value)
                                                            }
                                                        />
                                                    </div>

                                                    <div className="form-outline mb-4">
                                                        <label
                                                            className="form-label"
                                                            htmlFor="Password"
                                                        >
                                                            Confirm New Password
                                                        </label>
                                                        <input
                                                            type="password"
                                                            name="confirmPassword"
                                                            value={confirmPassword}
                                                            className="form-control mb-4"
                                                            onChange={(e) =>
                                                                setConfirmPassword(e.target.value)
                                                            }
                                                        />
                                                        {isLoading === true ? (
                                                            <button
                                                                className="btn btn-primary w-100 "
                                                                type="button"
                                                                disabled={isLoading}
                                                            >
                                                                <span className="me-2">
                                                                    <span
                                                                        className="spinner-border spinner-border-sm"
                                                                        role="status"
                                                                        aria-hidden="true"
                                                                    ></span>
                                                                </span>
                                                                Loading...
                                                            </button>
                                                        ) : (
                                                            <button
                                                                className="btn btn-primary w-100 "
                                                                type="submit"
                                                                onClick={handlePasswordSubmit}
                                                            >
                                                                Create New Password{" "}
                                                                <i className="fas fa-check-circle ms-2" />
                                                            </button>
                                                        )}
                                                        {/* {error !== null &&
                                                            <>
                                                                {error === true

                                                                    ? <p className='text-danger fw-bold mt-2'>Password Does Not Match</p>
                                                                    : <p className='text-success fw-bold mt-2'>Password Matched</p>
                                                                }
                                                            </>
                                                        } */}
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
        </section>
    );
}

export default CreatePassword;
