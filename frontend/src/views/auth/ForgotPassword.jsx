import React from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import apiInstance from "../../utils/axios";

function ForgotPassword() {
    const [email, setEmail] = useState("");
    console.log(email);

    const handleSubmit = () => {
        try {
            apiInstance.get(`/user/password-reset/${email}/`).then((res) => {
                console.log(res.data);
            });
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div>
            <h1>Forgot Password</h1>
            <input
                onChange={(e) => setEmail(e.target.value)}
                type="text"
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
