import React from "react";
import Sidebar from "./Sidebar";
import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import apiInstance from "../../utils/axios";
import UserData from "../plugin/UserData";
import moment from "moment";

function Invoice() {
    const [order, setOrder] = useState({});
    const [orderItems, setOrderItems] = useState([]);
    const userData = UserData();
    const param = useParams();

    useEffect(() => {
        apiInstance
            .get(`customer/order/${userData?.user_id}/${param.order_oid}`)
            .then((res) => {
                setOrder(res.data);
                setOrderItems(res.data.items);
            })
            .catch((error) => {
                console.error("Failed to fetch user data:", error);
            });
    }, []);

    return (
        <div>
            <div className="row d-flex justify-content-center p-2">
                <div className="receipt-main col-xs-10 col-sm-10 col-md-6 col-xs-offset-1 col-sm-offset-1 col-md-offset-3">
                    {/* Header */}
                    <div className="row">
                        {/* VendorVerse */}
                        <div className="col-12 col-md-6 d-flex align-items-center">
                            <div className="receipt-left">
                                <img
                                    className="img-responsive"
                                    alt="iamgurdeeposahan"
                                    src="https://img.freepik.com/free-vector/bird-colorful-logo-gradient-vector_343694-1365.jpg"
                                    style={{ width: 71, borderRadius: 43 }}
                                />
                                <div className="receipt-right">
                                    <h5 className="margin-top-10">
                                        VendorVerse<span className="text-warning">.</span>
                                    </h5>
                                    <p>
                                        <i className="fa fa-phone" /> +49 3649-6589
                                    </p>
                                    <p>
                                        <i className="fa fa-envelope" /> support@vendorverse.com
                                    </p>
                                    <p>
                                        <i className="fa fa-location-arrow" /> Max Planck Straße 42,
                                        77777 Heidelberg
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Customer */}
                        <div className="col-12 col-md-6 mt-3 mt-md-0 ">
                            <div className="receipt-right h-100 d-flex flex-column justify-content-end ps-md-5">
                                <h5>Customer Details</h5>
                                <p className="">
                                    <b>
                                        <i className="fa fa-user" />
                                    </b>
                                    {order.full_name}
                                </p>
                                <p>
                                    <b>
                                        <i className="fa fa-envelope" />
                                    </b>
                                    {order.email}
                                </p>
                                <p>
                                    <b>
                                        <i className="fa fa-phone" />
                                    </b>
                                    {order.mobile}
                                </p>
                            </div>
                        </div>

                        {/* Invoice ID */}
                        <div className="row">
                            <h6 className="mt-4">INVOICE ID #{order.oid}</h6>
                        </div>
                    </div>
                    <hr />
                    {/* Body */}
                    <div>
                        {/* Table */}
                        <table className="table table-bordered">
                            <thead>
                                <tr>
                                    <th>Product</th>
                                    <th>Price</th>
                                    <th>Qty</th>
                                    <th>Sub Total</th>
                                    <th>Discount</th>
                                </tr>
                            </thead>
                            <tbody>
                                {orderItems.map((item, index) => (
                                    <tr key={item.id}>
                                        <td className="col-md-5">{item.product?.title}</td>
                                        <td className="col-md-2">${item.price}</td>
                                        <td className="col-md-2">{item.qty}</td>
                                        <td className="col-md-2">${item.sub_total}</td>
                                        <td className="col-md-2">${item.saved}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>

                        {/* Summary */}
                        <div className="row">
                            <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6 d-flex justify-content-start"></div>
                            <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6 d-flex justify-content-end">
                                <div className="receipt-right">
                                    <h5>Summary</h5>
                                    <p className="mb-2 d-flex justify-content-between">
                                        <b>Sub Total: </b>${order.sub_total}
                                    </p>
                                    <p className="mb-2 d-flex justify-content-between">
                                        <b>Shipping: </b>${order.shipping_amount}
                                    </p>
                                    <p className="mb-2 d-flex justify-content-between">
                                        <b>Tax: </b>${order.tax_fee}
                                    </p>
                                    <p className="mb-2 d-flex justify-content-between">
                                        <b>Service Fee: </b>${order.service_fee}
                                    </p>
                                    <br />
                                    <p className="mb-2 d-flex justify-content-between">
                                        <b>Total: </b>${order.total}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <hr />
                    <div className="d-flex justify-content-center align-items-center">
                        <button id="printButton" className="btn btn-dark">
                            Print <i className="fas fa-print" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Invoice;
