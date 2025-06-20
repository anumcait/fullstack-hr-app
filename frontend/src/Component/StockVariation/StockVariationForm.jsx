import React from "react";
import "../StockVariation/StockVariationForm.css";
import Header from "../Partials/Header";
import Footer from "../Partials/Footer";
import ChatBotIcon from "../ChatBot/ChatBotIcon";
import "../../../src/Form.css";


const StockVariationForm = () => {
  return (
    <>
    <Header />
    <div className="sv-container">
      <div className="sv-section">
        <div className="sv-header">
          <div className="sv-title">ITEM STOCK VARIATION</div>
          <div className="sv-buttons">
            <button className="btn-secondary">New</button>
            <button className="btn-secondary">View</button>
          </div>
        </div>

        <form className="sv-form">
          <div className="form-group">
            <label>
              Project <span className="required">*</span>
            </label>
            <select>
              <option>-Select-</option>
            </select>
          </div>

          <div className="form-group">
            <label>Category</label>
            <select>
              <option>All</option>
            </select>
          </div>

          <div className="form-group">
            <label>Material</label>
            <select>
              <option>All</option>
            </select>
          </div>

          <div className="form-group">
            <label>Specification</label>
            <select>
              <option>All</option>
            </select>
          </div>

          <div className="form-group">
            <label>Specification Code</label>
            <input type="text" placeholder="Code" />
          </div>

          <div className="form-group">
            <label>From Date</label>
            <input type="date" />
          </div>

          <div className="form-group">
            <label>To Date</label>
            <input type="date" />
          </div>

          <div className="btn-wrap">
            <button className="go-btn">GO</button>
          </div>
        </form>
      </div>
    </div>
    <Footer/>
    <ChatBotIcon/>
    </>
  );
};

export default StockVariationForm;  