import React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import apiInstance from "../../utils/axios";
import UserData from "../plugin/UserData";

function Sidebar() {
    const [profile, setProfile] = useState({});
    const userData = UserData();

    useEffect(() => {
        if (userData) {
            apiInstance
                .get(`/user/profile/${userData.user_id}/`)
                .then((res) => {
                    setProfile(res.data);
                    console.log(res.data);
                })
                .catch((error) => {
                    console.error("Failed to fetch user data:", error);
                });
        }
    }, []);

    return (
        <div className="col-lg-3">
            <div className="d-flex justify-content-center align-items-center flex-column mb-4 shadow rounded-3">
                <img src={profile.image} style={{ width: 120, borderRadius: 60 }} alt="" />
                <div className="text-center">
                    <h3 className="mb-0">{profile.full_name}</h3>
                    <p className="mt-0">
                        <a href="">Edit Account</a>
                    </p>
                </div>
            </div>
            <ol className="list-group">
                <li className="list-group-item d-flex justify-content-between align-items-start">
                    <div className="ms-2 me-auto">
                        <div className="fw-bold">
                            <Link className="text-dark" to={`/customer/account/`}>
                                Account
                            </Link>
                        </div>
                    </div>
                </li>
                <li className="list-group-item d-flex justify-content-between align-items-start">
                    <div className="ms-2 me-auto">
                        <div className="fw-bold">
                            <Link className="text-dark" to={`/customer/orders/`}>
                                Orders
                            </Link>
                        </div>
                    </div>
                    <span className="badge bg-primary rounded-pill">14</span>
                </li>
                <li className="list-group-item d-flex justify-content-between align-items-start">
                    <div className="ms-2 me-auto">
                        <div className="fw-bold">
                            <Link className="text-dark" to={`/customer/wishlist/`}>
                                Wishlist
                            </Link>
                        </div>
                    </div>
                </li>
                <li className="list-group-item d-flex justify-content-between align-items-start">
                    <div className="ms-2 me-auto">
                        <div className="fw-bold">
                            <Link className="text-dark">Notification</Link>
                        </div>
                    </div>
                    <span className="badge bg-primary rounded-pill">14</span>
                </li>
                <li className="list-group-item d-flex justify-content-between align-items-start">
                    <div className="ms-2 me-auto">
                        <div className="fw-bold">
                            <Link className="text-dark">Setting</Link>
                        </div>
                    </div>
                </li>
            </ol>
        </div>
    );
}

export default Sidebar;
