import React from "react";
import "./OpeningAddForm.css";
import Header from "../Partials/Header";

const OpeningAddForm = () => {
  return (
    <>
    <Header />
    <div className="opening-container">
      <div className="opening-section">
        <div className="opening-header">
          <div className="opening-title">OPENING</div>
          <div className="opening-buttons">
            <button className="btn new-btn">NEW</button>
            <button className="btn view-btn">VIEW</button>
          </div>
        </div>

        <form className="opening-form">
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
            <input type="text" placeholder="Enter Specification Code" />
          </div>

          <div className="form-group">
            <label>Date</label>
            <input type="date" />
          </div>

          <div className="btn-wrap">
            <button className="go-btn" type="submit">
              🔍 GO
            </button>
          </div>
        </form>
      </div>
    </div>
    </>
  );
};

export default OpeningAddForm;
