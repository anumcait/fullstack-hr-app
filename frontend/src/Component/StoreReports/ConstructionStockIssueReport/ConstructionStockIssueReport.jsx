import React from "react";
import "./ConstructionStockIssueReport.css";
import Header from "../../Partials/Header";
import Footer from "../../Partials/Footer";
import ChatBotIcon from "../../ChatBot/ChatBotIcon";

const ConstructionStockIssueReport = () => {
  return (
    <>
    <Header/>
    <div className="csr-container">
        <div className="csr-title">
      <div className="csr-header">CONSTRUCTION & STOCK ISSUE REPORT</div>
      <div className="csr-form-row">
        <div className="csr-form-group">
          <label>Project<span className="csr-required">*</span></label>
          <select>
            <option>&lt;-Select-&gt;</option>
          </select>
        </div>

        <div className="csr-form-group">
          <label>Category</label>
          <select>
            <option>-All-</option>
          </select>
        </div>

        <div className="csr-form-group">
          <label>Sub Category</label>
          <select>
            <option>-All-</option>
          </select>
        </div>

        <div className="csr-form-group csr-go">
          <label>&nbsp;</label>
          <button className="csr-go-button">🔍 GO</button>
        </div>
      </div>
      </div>
    </div>
    <Footer/>
    <ChatBotIcon/>
    </>
  );
};

export default ConstructionStockIssueReport;
