import React from "react";
import "../QualityApproval/QualityApprovalForm.css";
import Header from "../Partials/Header";
import Footer from "../Partials/Footer";
import ChatBotIcon from "../ChatBot/ChatBotIcon";
import "../../../src/Form.css";

const QualityApproval = () => {
  return (
    <>
      <Header />
      <div className="qa-container">
        {/* Section 1: Search/Form */}
        <div className="qa-section">
          <div className="qa-header">QUALITY APPROVAL</div>
          <div className="qa-form">
            <div className="form-group">
              <label>Project <span className="required">*</span></label>
              <select>
                <option>-Select-</option>
              </select>
            </div>
            <div className="form-group">
              <label>Indent Code</label>
              <input type="text" placeholder="Indent Code" />
            </div>
            <div className="form-group">
              <label>PO Code</label>
              <input type="text" placeholder="PO Code" />
            </div>
            <div className="form-group">
              <label>MRN Code</label>
              <input type="text" placeholder="MRN Code" />
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
          </div>
        </div>

        {/* Section 2: List */}
        <div className="qa-section">
          <div className="form-list-header">
            <span>LIST</span>
            <div className="icons">
              <button title="Print">🖨️</button>
              <button title="Download">⬇️</button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
      <ChatBotIcon />
    </>
  );
};

export default QualityApproval;
