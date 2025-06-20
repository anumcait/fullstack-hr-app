import React from "react";
import "./MRNListForm.css";
import Header from "../Partials/Header";
import Footer from "../Partials/Footer";
import ChatBotIcon from "../ChatBot/ChatBotIcon";
const MRNListForm = () => {
  return (
    <>
    <Header/>
    <div className="mrn-container">
      <div className="mrn-section">
        <div className="mrn-header">
          <div className="mrn-title">PO FOR MRN</div>
        </div>

        <form className="mrn-form">
          <div className="form-group">
            <label>
              Project <span className="required">*</span>
            </label>
            <select>
              <option>-Select-</option>
            </select>
          </div>

          <div className="form-group">
            <label>Vendor</label>
            <select>
              <option>-All-</option>
            </select>
          </div>

          <div className="form-group">
            <label>Dispatch Type</label>
            <select>
              <option>-All-</option>
            </select>
          </div>

          <div className="form-group">
            <label>PO Code</label>
            <input type="text" placeholder="Enter PO Code" />
          </div>

          <div className="form-group">
            <label>From</label>
            <input type="date" />
          </div>

          <div className="form-group">
            <label>To</label>
            <input type="date" />
          </div>

          <div className="btn-wrap">
            <button className="go-btn" type="submit">GO</button>
          </div>
        </form>
      </div>

    </div>
    <Footer/>
    <ChatBotIcon/>
    </>
  );

};

export default MRNListForm;
