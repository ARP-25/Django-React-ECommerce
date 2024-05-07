import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import moment from "moment";
import apiInstance from "../../utils/axios";
import UserData from "../plugin/UserData";
import Sidebar from "./Sidebar";
import { Line, Bar } from "react-chartjs-2";
import { Chart } from "chart.js/auto";

function Earning() {
    const [earningsStats, setEarningsStats] = useState({});
    const [earningStatsTracker, setEarningStatsTracker] = useState([]);
    const [earningChart, setEarningChart] = useState([]);

    useEffect(() => {
        const fetchEarningStats = async () => {
            try {
                const response = await apiInstance.get(`vendor/earning/${UserData()?.vendor_id}/`);
                setEarningsStats(response.data[0]);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
        fetchEarningStats();

        const fetchEarningStatsTracker = async () => {
            try {
                const response = await apiInstance.get(
                    `vendor/monthly-earning/${UserData()?.vendor_id}/`
                );
                setEarningStatsTracker(response.data);
                setEarningChart(response.data.reverse());
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
        fetchEarningStatsTracker();
    }, []);

    console.log(earningsStats);
    console.log(earningStatsTracker);

    const months = earningChart?.map((item) => item.month);
    const sales_count = earningChart?.map((item) => item.sales_count);
    const total_earnings = earningChart?.map((item) => item.total_earnings);

    const revenue_data = {
        labels: months,
        datasets: [
            {
                label: "Total Sales Revenue",
                data: total_earnings,
                fill: true,
                backgroundColor: "rgba(75,192,192,0.2)",
                borderColor: "rgb(75, 192, 192)",
                tension: 0.1,
            },
        ],
    };

    return (
        <div className="container-fluid" id="main">
            <div className="row row-offcanvas row-offcanvas-left h-100">
                {/* Add Sidebar Here */}
                <Sidebar />
                <div className="col-md-9 col-lg-10 main mt-4">
                    <div className="row mb-3">
                        <div className="col-xl-6 col-lg-6 mb-2">
                            <div className="card card-inverse card-success">
                                <div className="card-block bg-success p-3">
                                    <div className="rotate">
                                        <i className="bi bi-currency-dollar fa-5x" />
                                    </div>
                                    <h6 className="text-uppercase">Total Sales</h6>
                                    <h1 className="display-1">${earningsStats.total_revenue}</h1>
                                </div>
                            </div>
                        </div>
                        <div className="col-xl-6 col-lg-6 mb-2">
                            <div className="card card-inverse card-danger">
                                <div className="card-block bg-danger p-3">
                                    <div className="rotate">
                                        <i className="bi bi-currency-dollar fa-5x" />
                                    </div>
                                    <h6 className="text-uppercase">Monthly Earning</h6>
                                    <h1 className="display-1">${earningsStats.monthly_revenue}</h1>
                                </div>
                            </div>
                        </div>
                    </div>
                    <hr />
                    <div className="row  container">
                        <div className="col-lg-12">
                            <h4 className="mt-3 mb-4">Revenue Tracker</h4>
                            <table className="table">
                                <thead className="table-dark">
                                    <tr>
                                        <th scope="col">Month</th>
                                        <th scope="col">Items Sold</th>
                                        <th scope="col">Revenue</th>
                                        <th scope="col">Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {earningStatsTracker.map((earning, index) => (
                                        <tr>
                                            {earning.month === 1 && <th scope="row">January</th>}
                                            {earning.month === 2 && <th scope="row">February</th>}
                                            {earning.month === 3 && <th scope="row">March</th>}
                                            {earning.month === 4 && <th scope="row">April</th>}
                                            {earning.month === 5 && <th scope="row">May</th>}
                                            {earning.month === 6 && <th scope="row">June</th>}
                                            {earning.month === 7 && <th scope="row">July</th>}
                                            {earning.month === 8 && <th scope="row">August</th>}
                                            {earning.month === 9 && <th scope="row">September</th>}
                                            {earning.month === 10 && <th scope="row">October</th>}
                                            {earning.month === 11 && <th scope="row">November</th>}
                                            {earning.month === 12 && <th scope="row">December</th>}

                                            <td>{earning.sales_count}</td>
                                            <td>${earning.total_earnings}</td>
                                            <td>
                                                <a href="" className="btn btn-primary mb-1">
                                                    <i className="fas fa-eye" />
                                                </a>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        <div className="container">
                            <div className="row ">
                                <div className="col">
                                    <h4 className="mt-4">Revenue Analytics</h4>
                                </div>
                            </div>
                            <div className="row my-2">
                                <div className="col-md-12 py-1">
                                    <div className="card">
                                        <div className="card-body">
                                            <Bar data={revenue_data} style={{ height: 300 }} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Earning;
