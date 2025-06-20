import React from "react";
import "./PendingItemStock.css";
import Header from "../../Partials/Header";
import Footer from "../../Partials/Footer";
import ChatBotIcon from "../../ChatBot/ChatBotIcon";

const PendingItemStock = () => {
    return (
        <>
            <Header />
            <div className="pis-container">
                <div className="pis-title">
                    <div className="pis-header">PENDING ITEM STOCK</div>

                    <div className="pis-form-row">
                        <div className="pis-group">
                            <label>Project<span className="pis-required">*</span></label>
                            <select>
                                <option>-Select-</option>
                            </select>
                        </div>

                        <div className="pis-group">
                            <label>Category</label>
                            <select>
                                <option>-All-</option>
                            </select>
                        </div>

                        <div className="pis-group">
                            <label>Material</label>
                            <select>
                                <option>-All-</option>
                            </select>
                        </div>

                        <div className="pis-group">
                            <label>Specification</label>
                            <select>
                                <option>-All-</option>
                            </select>
                        </div>

                        <div className="pis-group">
                            <label>Specification Code</label>
                            <input type="text" />
                        </div>

                        <div className="pis-group pis-go-group">
                            <label>&nbsp;</label>
                            <button className="pis-go-btn">GO</button>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
            <ChatBotIcon />
        </>
    );
};

export default PendingItemStock;
