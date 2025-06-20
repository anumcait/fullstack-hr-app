import React from "react";
import "./CompanyStock.css";
import Header from "../../Partials/Header";
import Footer from "../../Partials/Footer";
import ChatBotIcon from "../../ChatBot/ChatBotIcon";

const CompanyStock = () => {
    return (
        <>
            <Header />
            <div className="cs-container">
                <div className="cs-title">
                    <div className="cs-header">COMPANY STOCK</div>

                    <div className="cs-form-row">
                        <div className="cs-group">
                            <label>Project<span className="cs-required">*</span></label>
                            <select>
                                <option>-Select-</option>
                            </select>
                        </div>

                        <div className="cs-group">
                            <label>Category</label>
                            <select>
                                <option>-All-</option>
                            </select>
                        </div>

                        <div className="cs-group">
                            <label>Material</label>
                            <select>
                                <option>-All-</option>
                            </select>
                        </div>

                        <div className="cs-group">
                            <label>Specification</label>
                            <select>
                                <option>-All-</option>
                            </select>
                        </div>

                        <div className="cs-group">
                            <label>Specification Code</label>
                            <input type="text" />
                        </div>
                    </div>

                    <div className="cs-form-row">
                        <div className="cs-group">
                            <label>Period<span className="cs-required">*</span></label>
                            <div className="cs-date-group">
                                <input type="date" />
                                <span className="cs-date-separator">-</span>
                                <input type="date" />
                            </div>
                        </div>

                        <div className="cs-group cs-go-group">
                            <label>&nbsp;</label>
                            <button className="cs-go-btn">GO</button>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
            <ChatBotIcon />
        </>
    );
};

export default CompanyStock;
