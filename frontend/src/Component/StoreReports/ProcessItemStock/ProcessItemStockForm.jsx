import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";
import "./ProcessItemStockForm.css";
import Header from "../../Partials/Header";
import Footer from "../../Partials/Footer";
import ChatBotIcon from "../../ChatBot/ChatBotIcon";

const ProcessItemStockForm = () => {
    const [brand, setBrand] = useState("with");

    return (
        <>
            <Header />
            <div className="pis-container">
                <div className="pis-title">
                    <div className="pis-header">PROCESS ITEM STOCK IN HAND</div>

                    <div className="pis-row">
                        <div className="pis-group">
                            <label>Project<span className="required">*</span></label>
                            <select><option>-Select-</option></select>
                        </div>

                        <div className="pis-group">
                            <label>Category</label>
                            <select><option>-All-</option></select>
                        </div>

                        <div className="pis-group">
                            <label>Material</label>
                            <select><option>-All-</option></select>
                        </div>

                        <div className="pis-group">
                            <label>Specification</label>
                            <select><option>-All-</option></select>
                        </div>

                        <div className="pis-group">
                            <label>Specification Code</label>
                            <input type="text" />
                        </div>
                    </div>

                    <div className="pis-row">
                        <div className="pis-group">
                            <label><span className="required">*</span>Period:</label>
                            <div className="pis-date">
                                <input type="date" />
                                <span>-</span>
                                <input type="date" />
                            </div>
                        </div>

                        <div className="pis-group">
                            <label>Type</label>
                            <select>
                                <option>All</option>
                                <option>Type A</option>
                                <option>Type B</option>
                            </select>
                        </div>

                        <div className="pis-group pis-buttons">
                            <label>&nbsp;</label>
                            <div className="brand-toggle">
                                <button
                                    className={brand === "with" ? "active" : ""}
                                    onClick={() => setBrand("with")}
                                >
                                    With Brand
                                </button>
                                <button
                                    className={brand === "without" ? "active" : ""}
                                    onClick={() => setBrand("without")}
                                >
                                    Without Brand
                                </button>
                            </div>
                        </div>

                        <div className="pis-group pis-go">
                            <label>&nbsp;</label>
                            <button className="go-btn"><FaSearch style={{ marginRight: "6px" }} /> GO</button>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
            <ChatBotIcon />
        </>
    );
};

export default ProcessItemStockForm;
