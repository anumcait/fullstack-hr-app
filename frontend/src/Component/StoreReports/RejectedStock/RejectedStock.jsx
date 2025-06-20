import React from "react";
import "./RejectedStock.css";
import Header from "../../Partials/Header";
import Footer from "../../Partials/Footer";
import ChatBotIcon from "../../ChatBot/ChatBotIcon";

const RejectedStock = () => {
  return (
    <>
    <Header/>
    <div className="rs-container">
        <div className="rs-title">
      <div className="rs-header">REJECTED STOCK</div>

      <div className="rs-form-row">
        <div className="rs-group">
          <label>Project<span className="rs-required">*</span></label>
          <select>
            <option>-Select-</option>
          </select>
        </div>

        <div className="rs-group">
          <label>Category</label>
          <select>
            <option>-All-</option>
          </select>
        </div>

        <div className="rs-group">
          <label>Material</label>
          <select>
            <option>-All-</option>
          </select>
        </div>

        <div className="rs-group">
          <label>Specification</label>
          <select>
            <option>-All-</option>
          </select>
        </div>

        <div className="rs-group">
          <label>Specification Code</label>
          <input type="text" />
        </div>
      </div>

      <div className="rs-form-row rs-bottom-row">
        <div className="rs-group">
          <label><span className="rs-required">*</span>Period:</label>
          <div className="rs-date-range">
            <input type="date" />
            <span className="rs-separator">-</span>
            <input type="date" />
          </div>
        </div>

        <div className="rs-group rs-go-group">
          <label>&nbsp;</label>
          <button className="rs-go-btn">GO</button>
        </div>
      </div>
    </div>
    </div>
    <Footer/>
    <ChatBotIcon/>
    </>
  );
};

export default RejectedStock;
