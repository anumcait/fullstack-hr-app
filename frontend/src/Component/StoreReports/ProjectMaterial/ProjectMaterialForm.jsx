import React from "react";
import "./ProjectMaterialForm.css";
import Header from "../../Partials/Header";
import Footer from "../../Partials/Footer";
import ChatBotIcon from "../../ChatBot/ChatBotIcon";

const ProjectMaterialForm = () => {
  return (
    <>
    <Header/>
    <div className="pm-container">
        <div className="pm-title">
      <div className="pm-header">PROJECT MATERIAL DETAILS</div>
      <div className="pm-row">
        <div className="pm-group">
          <label>Project<span className="required">*</span></label>
          <select>
            <option>-Select-</option>
          </select>
        </div>
        <div className="pm-group">
          <label>Block</label>
          <select>
            <option>-All-</option>
          </select>
        </div>
        <div className="pm-group">
          <label>Floor</label>
          <select>
            <option>-All-</option>
          </select>
        </div>
        <div className="pm-group">
          <label>Unit</label>
          <select>
            <option>-All-</option>
          </select>
        </div>
        <div className="pm-group go-button-wrapper">
          <button className="go-btn">GO</button>
        </div>
      </div>
    </div>
    </div>
    <Footer/>
    <ChatBotIcon/>
    </>
  );
};

export default ProjectMaterialForm;
