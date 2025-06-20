import React from "react";
import "./ItemStockGroup.css";
import Header from "../../Partials/Header";
import Footer from "../../Partials/Footer";
import ChatBotIcon from "../../ChatBot/ChatBotIcon";

const ItemStockGroup = () => {
  return (
    <>
    <Header/>
    <div className="isg-container">
        <div className="isg-title">
      <div className="isg-header">ITEM STOCK IN HAND BY GROUP</div>

      <div className="isg-row">
        <div className="isg-group">
          <label>Project<span className="isg-required">*</span></label>
          <select>
            <option>-Select-</option>
          </select>
        </div>

        <div className="isg-group">
          <label>Category</label>
          <select>
            <option>-All-</option>
          </select>
        </div>

        <div className="isg-group">
          <label>Material</label>
          <select>
            <option>-All-</option>
          </select>
        </div>

        <div className="isg-group">
          <label>Specification</label>
          <select>
            <option>-All-</option>
          </select>
        </div>

        <div className="isg-group">
          <label>Specification Code</label>
          <input type="text" />
        </div>
      </div>

      <div className="isg-row">
        <div className="isg-group isg-date-group">
          <label>Period<span className="isg-required">*</span></label>
          <div className="isg-period">
            <input type="date" />
            <span className="isg-to-text"> - </span>
            <input type="date" />
          </div>
        </div>

        <div className="isg-group isg-go-group">
          <label>&nbsp;</label>
          <button className="isg-go-btn">GO</button>
        </div>
      </div>
      </div>
    </div>
    <Footer/>
    <ChatBotIcon/>
    </>
  );
};

export default ItemStockGroup;
