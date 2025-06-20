import React from "react";
import "./OpeningQuantityForm.css";
import Header from "../Partials/Header";
import Footer from "../Partials/Footer";
import ChatBotIcon from "../ChatBot/ChatBotIcon";

const OpeningQuantityForm = () => {
  return (
    <>
    <Header />
    <div className="oq-container">
      <div className="oq-header">
        <div className="oq-title">OPENING QUANTITY</div>
        <div className="oq-buttons">
          <button className="action-btn">VIEW</button>
          <button className="action-btn">CLOSE</button>
        </div>
      </div>

      <form className="oq-form">
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
            <option>-All-</option>
          </select>
        </div>

        <div className="form-group">
          <label>Material</label>
          <select>
            <option>-All-</option>
          </select>
        </div>

        <div className="form-group">
          <label>Specification</label>
          <select>
            <option>-All-</option>
          </select>
        </div>

        <div className="form-group">
          <label>Specification Code</label>
          <input type="text" placeholder="Enter Code" />
        </div>

        <div className="btn-wrap">
          <button className="go-btn" type="submit">
            🔍 GO
          </button>
        </div>
      </form>
    </div>
    <Footer/>
    <ChatBotIcon/>
    </>
  );
};

export default OpeningQuantityForm;
