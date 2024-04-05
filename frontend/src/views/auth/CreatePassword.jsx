import React from "react";
import { useState } from "react";
import apiInstance from "../../utils/axios";
import { useSearchParams, useNavigate } from "react-router-dom";

function CreatePassword() {
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [searchParams] = useSearchParams();
    const otp = searchParams.get("otp");
    const uidb64 = searchParams.get("uidb64");
    const navigate = useNavigate();

    const handlePasswordSubmit = async (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            alert("Passwords do not match");
            return;
        } else {
            const formdata = new FormData();
            console.log("Sending request with data:", {
                password: password,
                otp: otp,
                uidb64: uidb64,
            });
            formdata.append("password", password);
            formdata.append("otp", otp);
            formdata.append("uidb64", uidb64);
            try {
                await apiInstance
                    .post("/user/password-change/", formdata)
                    .then((res) => {
                        console.log(res.data);
                        alert("Password reset successful");
                        navigate("/login");
                    });
            } catch (error) {
                alert("Password change failed");
                console.log(error);
            }
        }
    };

    return (
        <div>
            <h1>Create New Password</h1>
            <form onSubmit={handlePasswordSubmit}>
                <input
                    type="password"
                    placeholder="Enter New Password"
                    name=""
                    id=""
                    onChange={(e) => setPassword(e.target.value)}
                />
                <br />
                <br />
                <input
                    type="password"
                    placeholder="Confirm New Password"
                    name=""
                    id=""
                    onChange={(e) => setConfirmPassword(e.target.value)}
                />
                <br />
                <br />
                <button type="submit">Save New Password</button>
            </form>
        </div>
    );
}

export default CreatePassword;
