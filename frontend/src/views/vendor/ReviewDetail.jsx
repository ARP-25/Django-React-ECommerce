import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import moment from "moment";
import apiInstance from "../../utils/axios";
import UserData from "../plugin/UserData";
import Sidebar from "./Sidebar";
import { useParams } from "react-router-dom";
function ReviewDetail() {
    const [review, setReview] = useState([]);
    const [updateReview, setUpdateReview] = useState({ reply: "" });
    const param = useParams();

    const fetchData = async () => {
        try {
            const response = await apiInstance.get(
                `vendor/reviews-detail/${UserData()?.vendor_id}/${param.review_id}`
            );
            setReview(response.data);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleReplyChange = (e) => {
        setUpdateReview({ ...updateReview, reply: e.target.value });
    };

    const handleReplySubmit = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("reply", updateReview.reply);
        apiInstance
            .patch(`vendor/reviews-detail/${UserData()?.vendor_id}/${param.review_id}/`, formData)
            .then((res) => {
                console.log(res.data);
            })
            .catch((error) => {
                console.error("Error adding reply:", error);
            });
        fetchData();
    };

    return (
        <div className="container-fluid" id="main">
            <div className="row row-offcanvas row-offcanvas-left h-100">
                <Sidebar />
                <div className="col-md-9 col-lg-10 main mt-4">
                    <h4>
                        <i className="fas fa-star" /> Reviews and Rating
                    </h4>

                    <section
                        className="p-4 p-md-5 text-center text-lg-start shadow-1-strong rounded"
                        style={{
                            backgroundImage:
                                "url(https://mdbcdn.b-cdn.net/img/Photos/Others/background2.webp)",
                        }}
                    >
                        <div className="row d-flex justify-content-center align-items-center">
                            <div className="col-md-10">
                                <div className="card mt-3 mb-3">
                                    <div key={review.id} className="card-body m-3">
                                        <div className="row">
                                            <div className="col-lg-4 d-flex justify-content-center align-items-center mb-4 mb-lg-0">
                                                <img
                                                    src={review.profile?.image}
                                                    className="rounded-circle img-fluid shadow-1"
                                                    alt={review.profile?.full_name}
                                                    style={{
                                                        width: 200,
                                                        height: 200,
                                                        objectFit: "cover",
                                                        borderRadius: "50%",
                                                    }}
                                                />
                                            </div>
                                            <div className="col-lg-8">
                                                <p className="text-dark fw-bold mb-4">
                                                    Review: <i>{review.review}</i>
                                                </p>
                                                <p className="text-dark fw-bold mb-4">
                                                    Reply:{" "}
                                                    <i>
                                                        {review.reply === "" ? (
                                                            <span>You didn't reply yet.</span>
                                                        ) : (
                                                            <span>{review.reply}</span>
                                                        )}
                                                    </i>
                                                </p>
                                                <p className="fw-bold text-dark mb-2">
                                                    <strong>
                                                        Name: {review.profile?.full_name}
                                                    </strong>
                                                </p>
                                                <p className="fw-bold text-muted mb-0">
                                                    Product: {review.product?.title}
                                                </p>
                                                <p className="fw-bold text-muted mb-0">
                                                    Rating: {review.rating}{" "}
                                                    {Array.from({ length: review.rating }).map(
                                                        (_, index) => (
                                                            <i
                                                                className="fas fa-star"
                                                                key={index}
                                                            />
                                                        )
                                                    )}
                                                </p>
                                                <div className="d-flex mt-3">
                                                    <form
                                                        action=""
                                                        className="d-flex"
                                                        style={{ width: "80%" }}
                                                        onSubmit={handleReplySubmit}
                                                    >
                                                        <input
                                                            className="form-control"
                                                            placeholder="Reply to this review..."
                                                            type="text"
                                                            name="reply"
                                                            value={updateReview.reply}
                                                            onChange={handleReplyChange}
                                                        />
                                                        <button
                                                            className=" btn btn-success ms-2"
                                                            type="submit"
                                                        >
                                                            <i className="fas fa-paper-plane"></i>
                                                        </button>
                                                    </form>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        </div>
    );
}

export default ReviewDetail;
