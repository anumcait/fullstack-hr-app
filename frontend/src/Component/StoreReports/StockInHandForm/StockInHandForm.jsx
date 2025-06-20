import React from "react";
import "./StockInHandForm.css";
import { FaSearch } from "react-icons/fa";
import Header from "../../Partials/Header";
import Footer from "../../Partials/Footer";
import ChatBotIcon from "../../ChatBot/ChatBotIcon";

const StockInHandForm = () => {
  return (
    <>
    <Header/>
    <div className="stockinhand-container">
      <div className="stockinhand-header">
        <div className="stockinhand-title">STOCK IN HAND</div>
      
      <div className="stockinhand-form">
        <div className="stockinhand-row">
          <div className="stockinhand-field">
            <label>Project<span className="required">*</span></label>
            <select>
              <option>-Select-</option>
            </select>
          </div>
          <div className="stockinhand-field">
            <label>Category</label>
            <select>
              <option>-All-</option>
            </select>
          </div>
          <div className="stockinhand-field">
            <label>Material</label>
            <select>
              <option>-All-</option>
            </select>
          </div>
          <div className="stockinhand-field">
            <label>Specification</label>
            <select>
              <option>-All-</option>
            </select>
          </div>
          <div className="stockinhand-field">
            <label>Specification Code</label>
            <input type="text" />
          </div>
        </div>

        <div className="stockinhand-row">
          <div className="stockinhand-field stockinhand-period">
            <label>Period</label>
            <div className="stockinhand-period-inputs">
              <input type="date" defaultValue="2025-06-01" />
              <span>-</span>
              <input type="date" defaultValue="2025-06-11" />
            </div>
          </div>

          <div className="stockinhand-button-group">
            <button className="active">With Brand</button>
            <button>Without Brand</button>
          </div>

          <div className="stockinhand-go-button">
            <button>
              <FaSearch /> GO
            </button>
          </div>
        </div>
      </div>
      </div>
    </div>
    <Footer/>
    <ChatBotIcon/>
    </>
  );
};

export default StockInHandForm;
