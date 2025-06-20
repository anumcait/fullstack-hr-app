import React from "react";
import "./StockTransferRegister.css";
import Header from "../../Partials/Header";
import Footer from "../../Partials/Footer";
import ChatBotIcon from "../../ChatBot/ChatBotIcon";

const StockTransferRegister = () => {
  return (
    <>
    <Header/>
    <div className="str-container">
        <div className="str-title">
      <div className="str-header">STOCK TRANSFER REGISTER</div>

      <div className="str-row">
        <div className="str-group">
          <label>Project</label>
          <select>
            <option>-All-</option>
          </select>
        </div>

        <div className="str-group">
          <label>Category</label>
          <select>
            <option>-All-</option>
          </select>
        </div>

        <div className="str-group">
          <label>Material</label>
          <select>
            <option>-All-</option>
          </select>
        </div>

        <div className="str-group">
          <label>Specification</label>
          <select>
            <option>-All-</option>
          </select>
        </div>

        <div className="str-group">
          <label>Specification Code</label>
          <input type="text" />
        </div>
      </div>

      <div className="str-row">
        <div className="str-group">
          <label>
            From:<span className="str-required">*</span>
          </label>
          <input type="date" />
        </div>

        <div className="str-group">
          <label>To</label>
          <input type="date" />
        </div>

        <div className="str-group str-go">
          <label>&nbsp;</label>
          <button className="str-go-btn">GO</button>
        </div>
      </div>
      </div>
    </div>
    <Footer/>
    <ChatBotIcon/>
    </>
  );
};

export default StockTransferRegister;
