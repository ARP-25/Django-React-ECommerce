import React from "react";
import apiInstance from "../../utils/axios";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";

function PaymentSuccess() {
    const [order, setOrder] = useState([]);
    const [status, setStatus] = useState("Verifying Payment...");

    const param = useParams();
    const urlParam = new URLSearchParams(window.location.search);
    const sessionID = urlParam.get("session_id");
    const paypal_order_id = urlParam.get("paypal_order_id");

    console.log("Paypal Order ID:", paypal_order_id);
    useEffect(() => {
        apiInstance.get(`checkout/${param?.order_oid}`).then((res) => {
            setOrder(res.data);
        });
    }, [param]);

    useEffect(() => {
        if (order?.oid) {
            const formData = new FormData();
            formData.append("order_oid", param?.order_oid);
            formData.append("session_id", sessionID);
            formData.append("paypal_order_id", paypal_order_id);

            console.log("Sending request with Order OID:", order.oid, "and Session ID:", sessionID);
            setStatus("Verifying Payment...");

            apiInstance
                .post(`payment-success/${param?.order_oid}/`, formData)
                .then((res) => {
                    console.log("API response received:", res.data.message);
                    switch (res.data.message) {
                        case "Payment Successfull!":
                            setStatus("Payment successfull");
                            break;
                        case "Already paid!":
                            setStatus("Already paid");
                            break;
                        case "Payment Cancelled!":
                            setStatus("Payment cancelled");
                            break;
                        case "Payment Unpaid!":
                            setStatus("Payment unpaid");
                            break;
                        default:
                            console.error("Unhandled payment status:", res.data.message);
                            setStatus("Unhandled payment status");
                    }
                })
                .catch((error) => {
                    if (error.response && error.response.data.message === "Already paid!") {
                        setStatus("Already paid");
                        console.log("Already paid!", status);
                    } else {
                        console.error("Error in processing payment:", error);
                        setStatus("Error in processing payment: " + error.message);
                    }
                });
        } else {
            console.log("Order OID not available, unable to send API request.");
        }
    }, [order?.oid, sessionID]); // Ensuring effect runs when order.oid or sessionID changes

    useEffect(() => {
        console.log("Current status:", status);
    }, [status]);

    return (
        <div>
            <main className="mb-4 mt-4 h-100">
                <div className="container">
                    {/* Section: Checkout form */}
                    <section className="">
                        <div className="gx-lg-5">
                            <div className="row pb50">
                                <div className="col-lg-12">
                                    <div className="dashboard_title_area">
                                        {/* <p class="para">Lorem ipsum dolor sit amet, consectetur.</p> */}
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-xl-12">
                                    <div className="application_statics">
                                        <div className="account_user_deails dashboard_page">
                                            <div className="d-flex justify-content-center align-items-center">
                                                {status === "Verifying Payment..." && (
                                                    <div className="col-lg-12">
                                                        <div className="border border-3 border-warning" />
                                                        <div className="card bg-white shadow p-5">
                                                            <div className="mb-4 text-center">
                                                                <i
                                                                    className="fas fa-sync-alt fa-spin text-warning"
                                                                    style={{
                                                                        fontSize: 100,
                                                                        color: "green",
                                                                    }}
                                                                />
                                                            </div>
                                                            <div className="text-center">
                                                                <h1>Payment verifying </h1>
                                                                <p>
                                                                    <b>
                                                                        Please hold on while we
                                                                        verify your Payment
                                                                    </b>
                                                                    <br />
                                                                    <b className="text-warning">
                                                                        Do not reload or leave the
                                                                        page
                                                                    </b>
                                                                </p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                )}
                                                {status === "Payment unpaid" && (
                                                    <div className="col-lg-12">
                                                        <div className="border border-3 border-warning" />
                                                        <div className="card bg-white shadow p-5">
                                                            <div className="mb-4 text-center">
                                                                <i
                                                                    className="fas fa-ban text-danger"
                                                                    style={{
                                                                        fontSize: 100,
                                                                        color: "green",
                                                                    }}
                                                                />
                                                            </div>
                                                            <div className="text-center">
                                                                <h1>Unpaid Invoice</h1>
                                                                <p>
                                                                    <b>
                                                                        Please try making the
                                                                        payment again
                                                                    </b>
                                                                    <br />
                                                                </p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                )}
                                                {status === "Payment cancelled" && (
                                                    <div className="col-lg-12">
                                                        <div className="border border-3 border-warning" />
                                                        <div className="card bg-white shadow p-5">
                                                            <div className="mb-4 text-center">
                                                                <i
                                                                    className="fas fa-times-circle text-warning"
                                                                    style={{
                                                                        fontSize: 100,
                                                                        color: "green",
                                                                    }}
                                                                />
                                                            </div>
                                                            <div className="text-center">
                                                                <h1>Payment cancelled</h1>
                                                                <p>
                                                                    <b>
                                                                        Please hold on while we
                                                                        verify your Payment
                                                                    </b>
                                                                    <br />
                                                                    <b className="text-warning">
                                                                        Do not reload or leave the
                                                                        page
                                                                    </b>
                                                                </p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                )}
                                                {status === "Already paid" && (
                                                    <div className="col-lg-12">
                                                        <div className="border border-3 border-success" />
                                                        <div className="card bg-white shadow p-5">
                                                            <div className="mb-4 text-center">
                                                                <i
                                                                    className="fas fa-check-circle text-success"
                                                                    style={{
                                                                        fontSize: 100,
                                                                        color: "green",
                                                                    }}
                                                                />
                                                            </div>
                                                            <div className="text-center">
                                                                <h1>Already paid!</h1>
                                                                <p>
                                                                    Your checkout was successfull,
                                                                    we have sent the order detail{" "}
                                                                    <strong></strong>
                                                                    <strong>
                                                                        (Order ID: {order.oid}){" "}
                                                                    </strong>{" "}
                                                                    to your email{" "}
                                                                    <strong>
                                                                        (Email: {order.email})
                                                                    </strong>
                                                                </p>
                                                                <button
                                                                    className="btn btn-success mt-3"
                                                                    data-bs-toggle="modal"
                                                                    data-bs-target="#exampleModal"
                                                                >
                                                                    View Order{" "}
                                                                    <i className="fas fa-eye" />{" "}
                                                                </button>
                                                                <a
                                                                    href="/"
                                                                    className="btn btn-primary mt-3 ms-2"
                                                                >
                                                                    Download Invoice{" "}
                                                                    <i className="fas fa-file-invoice" />{" "}
                                                                </a>
                                                                <a className="btn btn-secondary mt-3 ms-2">
                                                                    Go Home{" "}
                                                                    <i className="fas fa-fa-arrow-left" />{" "}
                                                                </a>
                                                            </div>
                                                        </div>
                                                    </div>
                                                )}
                                                {status === "Payment successfull" && (
                                                    <div className="col-lg-12">
                                                        <div className="border border-3 border-success" />
                                                        <div className="card bg-white shadow p-5">
                                                            <div className="mb-4 text-center">
                                                                <i
                                                                    className="fas fa-check-circle text-success"
                                                                    style={{
                                                                        fontSize: 100,
                                                                        color: "green",
                                                                    }}
                                                                />
                                                            </div>
                                                            <div className="text-center">
                                                                <h1>Thank You !</h1>
                                                                <p>
                                                                    Your checkout was successfull,
                                                                    we have sent the order detail{" "}
                                                                    <strong></strong>
                                                                    <strong>
                                                                        (Order ID: {order.oid}){" "}
                                                                    </strong>{" "}
                                                                    to your email{" "}
                                                                    <strong>
                                                                        (Email: {order.email})
                                                                    </strong>
                                                                </p>
                                                                <button
                                                                    className="btn btn-success mt-3"
                                                                    data-bs-toggle="modal"
                                                                    data-bs-target="#exampleModal"
                                                                >
                                                                    View Order{" "}
                                                                    <i className="fas fa-eye" />{" "}
                                                                </button>
                                                                <a
                                                                    href="/"
                                                                    className="btn btn-primary mt-3 ms-2"
                                                                >
                                                                    Download Invoice{" "}
                                                                    <i className="fas fa-file-invoice" />{" "}
                                                                </a>
                                                                <a className="btn btn-secondary mt-3 ms-2">
                                                                    Go Home{" "}
                                                                    <i className="fas fa-fa-arrow-left" />{" "}
                                                                </a>
                                                            </div>
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
            </main>

            {/* Modal - Payment Summary*/}
            <div
                className="modal fade"
                id="exampleModal"
                tabIndex={-1}
                aria-labelledby="exampleModalLabel"
                aria-hidden="true"
            >
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">
                                Order Summary
                            </h5>
                            <button
                                type="button"
                                className="btn-close"
                                data-bs-dismiss="modal"
                                aria-label="Close"
                            />
                        </div>
                        <div className="modal-body">
                            <div className="modal-body text-start text-black p-4">
                                <h5 className="modal-title text-uppercase " id="exampleModalLabel">
                                    {order.full_name}
                                </h5>
                                <h6>{order.email}</h6>
                                <h6>{order.mobile}</h6>
                                <h6 className="mb-5">
                                    {order.address} - {order.city} <br /> {order.country} -{" "}
                                    {order.state}
                                </h6>
                                <p className="mb-0 fw-bold" style={{ color: "#35558a" }}>
                                    Payment Summary
                                </p>
                                {order.items?.map((item, index) => {
                                    return (
                                        <div key={index} className="order-item">
                                            <div className="d-flex justify-content-between shadow p-2 rounded">
                                                <div>
                                                    <p className="product-title mb-0">
                                                        {item.product?.title}
                                                    </p>
                                                    <p className="quantity small mb-0">
                                                        Quantity: {item.qty}
                                                    </p>
                                                </div>
                                                <p className="price small mb-0">${item.price}</p>
                                            </div>
                                        </div>
                                    );
                                })}
                                <hr
                                    className="mt-2 mb-4"
                                    style={{
                                        height: 0,
                                        backgroundColor: "transparent",
                                        opacity: ".75",
                                        borderTop: "2px dashed #9e9e9e",
                                    }}
                                />
                                <div className="d-flex justify-content-between">
                                    <p className="fw-bold mb-0">Subtotal</p>
                                    <p className="text-muted mb-0">${order.sub_total}</p>
                                </div>
                                <div className="d-flex justify-content-between">
                                    <p className="small mb-0">Shipping Fee</p>
                                    <p className="small mb-0">${order.shipping_amount}</p>
                                </div>
                                <div className="d-flex justify-content-between">
                                    <p className="small mb-0">Service Fee</p>
                                    <p className="small mb-0">${order.service_fee}</p>
                                </div>
                                <div className="d-flex justify-content-between">
                                    <p className="small mb-0">Tax</p>
                                    <p className="small mb-0">${order.tax_fee}</p>
                                </div>
                                {order.saved !== "0.00" && (
                                    <div className="d-flex justify-content-between">
                                        <p className="small mb-0">Discount</p>
                                        <p className="small mb-0">-${order.saved}</p>
                                    </div>
                                )}

                                <div className="d-flex justify-content-between mt-4">
                                    <p className="fw-bold">Total</p>
                                    <p className="fw-bold" style={{ color: "#35558a" }}>
                                        ${order.total}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default PaymentSuccess;
