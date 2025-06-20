import React from "react";
import "./StockTransitRegister.css";
import Header from "../../Partials/Header";
import Footer from "../../Partials/Footer";
import ChatBotIcon from "../../ChatBot/ChatBotIcon";

const StockTransitRegister = () => {
  return (
    <>
    <Header/>
    <div className="st-container">
        <div className="st-title">
      <div className="st-header">STOCK TRANSIT REGISTER</div>

      <div className="st-row">
        <div className="st-group">
          <label>Project<span className="st-required">*</span></label>
          <select>
            <option>-Select-</option>
          </select>
        </div>

        <div className="st-group">
          <label>Category</label>
          <select>
            <option>-All-</option>
          </select>
        </div>

        <div className="st-group">
          <label>Material</label>
          <select>
            <option>-All-</option>
          </select>
        </div>

        <div className="st-group">
          <label>Specification</label>
          <select>
            <option>-All-</option>
          </select>
        </div>

        <div className="st-group">
          <label>Specification Code</label>
          <input type="text" />
        </div>
      </div>

      <div className="st-row">
        <div className="st-group">
          <label>Period<span className="st-required">*</span></label>
          <div className="st-period">
            <input type="date" />
            <span className="st-to-text"> - </span>
            <input type="date" />
          </div>
        </div>

        <div className="st-group st-go-group">
          <label>&nbsp;</label>
          <button className="st-go-btn">GO</button>
        </div>
      </div>
      </div>
    </div>
    <Footer/>
    <ChatBotIcon/>
    </>
  );
};

export default StockTransitRegister;
