import React from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import apiInstance from "../../utils/axios";

function ForgotPassword() {
    const [email, setEmail] = useState("");

    const navigate = useNavigate();

    const handleSubmit = async () => {
        try {
            await apiInstance
                .get(`/user/password-reset/${email}/`)
                .then((res) => {
                    alert("Password reset link sent to your email");
                    //navigate("/create-new-password");
                });
        } catch (error) {
            alert("Email not found");
            console.log(error);
        }
    };

    return (
        <div>
            <h1>Forgot Password</h1>
            <input
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                placeholder="Enter Email"
                name=""
                id=""
            />
            <br />
            <br />
            <button onClick={handleSubmit}>Reset Password</button>
        </div>
    );
}

export default ForgotPassword;
