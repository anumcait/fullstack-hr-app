import React from "react";
import "./ItemStockReport.css";
import Header from "../../Partials/Header";
import Footer from "../../Partials/Footer";
import ChatBotIcon from "../../ChatBot/ChatBotIcon";

const ItemStockReport = () => {
    return (
        <>
            <Header />
            <div className="isr-container">
                <div className="isr-title">
                    <div className="isr-header">ITEM STOCK REPORT</div>

                    <div className="isr-form-row">
                        <div className="isr-group">
                            <label>Company<span className="isr-required">*</span></label>
                            <select>
                                <option>THE DRIZZLE JV</option>
                            </select>
                        </div>

                        <div className="isr-group">
                            <label>Project</label>
                            <select>
                                <option>All</option>
                            </select>
                        </div>

                        <div className="isr-group">
                            <label>Category</label>
                            <select>
                                <option>All</option>
                            </select>
                        </div>

                        <div className="isr-group">
                            <label>Materials</label>
                            <select>
                                <option>All</option>
                            </select>
                        </div>

                        <div className="isr-group">
                            <label>Specification</label>
                            <select>
                                <option>All</option>
                            </select>
                        </div>
                    </div>

                    <div className="isr-form-row">
                        <div className="isr-group">
                            <label>Period<span className="isr-required">*</span></label>
                            <div className="isr-date-group">
                                <input type="date" />
                                <span className="isr-date-separator">-</span>
                                <input type="date" />
                            </div>
                        </div>

                        <div className="isr-group isr-go-group">
                            <label>&nbsp;</label>
                            <button className="isr-go-btn">GO</button>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
            <ChatBotIcon />
        </>
    );
};

export default ItemStockReport;
