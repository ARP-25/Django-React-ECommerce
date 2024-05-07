import React from "react";
import Sidebar from "../vendor/Sidebar";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import apiInstance from "../../utils/axios";
import UserData from "../plugin/UserData";

function Products() {
    const [products, setProducts] = useState([]);

    // Fetching Products
    const fetchProductList = async () => {
        const product_response = await apiInstance.get(
            `vendor/products-list/${UserData()?.vendor_id}/`
        );
        setProducts(product_response.data);
    };
    useEffect(() => {
        fetchProductList();
    }, []);
    console.log("Product List ===== ", products);

    return (
        <div className="container-fluid" id="main">
            <div className="row row-offcanvas row-offcanvas-left h-100">
                <Sidebar />
                <div className="col-md-9 col-lg-10 main mt-4">
                    <div className="row mb-3 container">
                        <div className="col-lg-12" style={{ marginBottom: 100 }}>
                            {/* Nav tabs */}
                            <ul className="nav nav-tabs" role="tablist">
                                <li className="nav-item">
                                    <a
                                        className="nav-link active"
                                        href="#home1"
                                        role="tab"
                                        data-toggle="tab"
                                    >
                                        Products
                                    </a>
                                </li>
                                <li className="nav-item">
                                    <a
                                        className="nav-link"
                                        href="#profile1"
                                        role="tab"
                                        data-toggle="tab"
                                    >
                                        Orders
                                    </a>
                                </li>
                            </ul>
                            {/* Products List */}
                            <div className="tab-content">
                                <br />
                                <div role="tabpanel" className="tab-pane active" id="home1">
                                    <h4 className="mb-3">
                                        <i class="fa-solid fa-table me-1"></i>Products
                                    </h4>
                                    <table className="table">
                                        <thead className="table-dark">
                                            <tr>
                                                <th scope="col">#ID</th>
                                                <th scope="col">#Image</th>
                                                <th scope="col">Name</th>
                                                <th scope="col">Price</th>
                                                <th scope="col">Quantity</th>
                                                <th scope="col">Orders</th>
                                                <th scope="col">Status</th>
                                                <th scope="col">Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {products?.map((p, index) => (
                                                <tr key={p.id}>
                                                    <th scope="row">#{p.id}</th>

                                                    <td>
                                                        <img
                                                            src={p.image}
                                                            alt={p.title}
                                                            style={{
                                                                height: 70,
                                                                width: 100,
                                                                objectFit: "cover",
                                                                borderRadius: "10px",
                                                            }}
                                                        ></img>
                                                    </td>
                                                    <td>{p.title}</td>
                                                    <td>${p.price}</td>
                                                    <td>{p.stock_qty}</td>
                                                    <td>{p.orders}</td>
                                                    <td>{p.status.toUpperCase()}</td>
                                                    <td>
                                                        <Link
                                                            href=""
                                                            className="btn btn-primary mb-1 me-2"
                                                        >
                                                            <i className="fas fa-eye" />
                                                        </Link>
                                                        <Link
                                                            href=""
                                                            className="btn btn-success mb-1 me-2"
                                                        >
                                                            <i className="fas fa-edit" />
                                                        </Link>
                                                        <Link
                                                            href=""
                                                            className="btn btn-danger mb-1 me-2"
                                                        >
                                                            <i className="fas fa-trash" />
                                                        </Link>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                                <div role="tabpanel" className="tab-pane" id="profile1">
                                    <h4>Orders</h4>
                                    <table className="table">
                                        <thead className="table-dark">
                                            <tr>
                                                <th scope="col">#Order ID</th>
                                                <th scope="col">Total</th>
                                                <th scope="col">Payment Status</th>
                                                <th scope="col">Delivery Status</th>
                                                <th scope="col">Date</th>
                                                <th scope="col">Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <th scope="row">#trytrr</th>
                                                <td>$100.90</td>
                                                <td>Paid</td>
                                                <td>Shipped</td>
                                                <td>20th June, 2023</td>
                                                <td>
                                                    <a href="" className="btn btn-primary mb-1">
                                                        <i className="fas fa-eye" />
                                                    </a>
                                                </td>
                                            </tr>
                                            <tr>
                                                <th scope="row">#hjkjhkhk</th>
                                                <td>$210.90</td>
                                                <td>Pending</td>
                                                <td>Not Shipped</td>
                                                <td>21th June, 2023</td>
                                                <td>
                                                    <a href="" className="btn btn-primary mb-1">
                                                        <i className="fas fa-eye" />
                                                    </a>
                                                </td>
                                            </tr>
                                            <tr>
                                                <th scope="row">#retrey</th>
                                                <td>$260.90</td>
                                                <td>Failed</td>
                                                <td>Not Shipped</td>
                                                <td>25th June, 2023</td>
                                                <td>
                                                    <a href="" className="btn btn-primary mb-1">
                                                        <i className="fas fa-eye" />
                                                    </a>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Products;
