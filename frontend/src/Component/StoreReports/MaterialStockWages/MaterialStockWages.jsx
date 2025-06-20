import React from "react";
import "./MaterialStockWages.css";
import Header from "../../Partials/Header";
import Footer from "../../Partials/Footer";
import ChatBotIcon from "../../ChatBot/ChatBotIcon";

const MaterialStockWages = () => {
    return (
        <>
            <Header />
            <div className="msw-container">
                <div className="msw-title">
                    <div className="msw-header">MATERIAL STOCK WAGES</div>

                    <div className="msw-form-row">
                        <div className="msw-group">
                            <label>Category<span className="msw-required">*</span></label>
                            <select>
                                <option>-Select-</option>
                            </select>
                        </div>

                        <div className="msw-group">
                            <label>Material<span className="msw-required">*</span></label>
                            <select>
                                <option>-Select-</option>
                            </select>
                        </div>

                        <div className="msw-group">
                            <label>Specification</label>
                            <select>
                                <option>-All-</option>
                            </select>
                        </div>

                        <div className="msw-group">
                            <label>Specification Code</label>
                            <input type="text" />
                        </div>

                        <div className="msw-group">
                            <label><span className="msw-required">*</span>Period:</label>
                            <div className="msw-date-group">
                                <input type="date" />
                                <span className="msw-date-separator">-</span>
                                <input type="date" />
                            </div>
                        </div>

                        <div className="msw-group msw-go-group">
                            <label>&nbsp;</label>
                            <button className="msw-go-btn">GO</button>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
            <ChatBotIcon />
        </>
    );
};

export default MaterialStockWages;
