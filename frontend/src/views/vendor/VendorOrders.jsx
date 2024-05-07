import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import moment from "moment";

import apiInstance from "../../utils/axios";
import UserData from "../plugin/UserData";
import Sidebar from "./Sidebar";

function VendorOrdersDetail() {
    const [orders, setOrders] = useState(null);
    const axios = apiInstance;
    const userData = UserData();

    // Redirect to Vendor Registration Page if Vendor ID is 0(Not a Vendor)
    if (UserData()?.vendor_id === 0) {
        window.location.href = "/vendor/register/";
    }

    // Fetch Orders after Component Mount
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`vendor/orders-list/${userData?.vendor_id}/`);
                setOrders(response.data);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
        fetchData();
    }, []);

    // Filter Orders
    const handleFilterOrders = async (filter) => {
        try {
            const response = await axios.get(
                `vendor/orders-list-filter/${userData?.vendor_id}/?filter=${filter}`
            );

            setOrders(response.data);
        } catch (error) {
            console.error("Error fetching data", error);
        }
    };

    return (
        <div className="container-fluid" id="main">
            <div className="row row-offcanvas row-offcanvas-left h-100">
                <Sidebar />

                <div className="col-md-9 col-lg-10 main">
                    <div className="mb-3 mt-3" style={{ marginBottom: 300 }}>
                        <div>
                            <h4>
                                <i class="bi bi-cart-check-fill"></i> All Orders{" "}
                            </h4>

                            {/* Filter */}
                            <div class="dropdown mb-3">
                                <button
                                    class="btn btn-secondary dropdown-toggle"
                                    type="button"
                                    data-bs-toggle="dropdown"
                                    aria-expanded="false"
                                >
                                    Filter<i className="fas fa-sliders ms-2"></i>
                                </button>
                                <ul class="dropdown-menu">
                                    <li>
                                        <a
                                            class="dropdown-item"
                                            onClick={() => handleFilterOrders("paid")}
                                        >
                                            Payment Status: Paid
                                        </a>
                                    </li>
                                    <li>
                                        <a
                                            class="dropdown-item"
                                            onClick={() => handleFilterOrders("cancelled")}
                                        >
                                            Payment Status: Cancelled
                                        </a>
                                    </li>
                                    <li>
                                        <a
                                            class="dropdown-item"
                                            onClick={() => handleFilterOrders("pending")}
                                        >
                                            Payment Status: Pending
                                        </a>
                                    </li>
                                    <li>
                                        <a
                                            class="dropdown-item"
                                            onClick={() => handleFilterOrders("processing")}
                                        >
                                            Payment Status: Processing
                                        </a>
                                    </li>
                                    <hr />
                                    <li>
                                        <a
                                            class="dropdown-item"
                                            onClick={() => handleFilterOrders("latest")}
                                        >
                                            Date: Latest
                                        </a>
                                    </li>
                                    <li>
                                        <a
                                            class="dropdown-item"
                                            onClick={() => handleFilterOrders("oldest")}
                                        >
                                            Date: Oldest
                                        </a>
                                    </li>
                                    <hr />
                                    <li>
                                        <a
                                            class="dropdown-item"
                                            onClick={() => handleFilterOrders("Pending")}
                                        >
                                            Order Status: Pending
                                        </a>
                                    </li>
                                    <li>
                                        <a
                                            class="dropdown-item"
                                            onClick={() => handleFilterOrders("Fullfilled")}
                                        >
                                            Order Status: Fullfilled
                                        </a>
                                    </li>
                                    <li>
                                        <a
                                            class="dropdown-item"
                                            onClick={() => handleFilterOrders("Cancelled")}
                                        >
                                            Order Status: Cancelled
                                        </a>
                                    </li>
                                </ul>
                            </div>

                            <table className="table">
                                <thead className="table-dark">
                                    <tr>
                                        <th scope="col">#ID</th>
                                        <th scope="col">Total</th>
                                        <th scope="col">Name</th>
                                        <th scope="col">Date</th>
                                        <th scope="col">Payment Status</th>
                                        <th scope="col">Order Status</th>
                                        <th scope="col">Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {orders?.map((o, index) => (
                                        <tr key={index}>
                                            <th scope="row">#{o.oid}</th>
                                            <td>${o.total}</td>
                                            <td>{o.full_name}</td>
                                            <td>{moment(o.date).format("MM/DD/YYYY")}</td>
                                            <td>{o.payment_status.toUpperCase()}</td>
                                            <td>{o.order_status.toUpperCase()}</td>
                                            <td>
                                                <Link
                                                    to={`/vendor/orders/${o.oid}/`}
                                                    className="btn btn-primary mb-1"
                                                >
                                                    <i className="fas fa-eye" />
                                                </Link>
                                            </td>
                                        </tr>
                                    ))}

                                    {orders < 1 && <h5 className="mt-4 p-3">No orders yet</h5>}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default VendorOrdersDetail;
