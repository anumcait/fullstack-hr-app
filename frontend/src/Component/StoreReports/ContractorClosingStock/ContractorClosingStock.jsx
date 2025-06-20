// File: components/ContractorClosingStock/ContractorClosingStock.jsx
import React from 'react';
import './ContractorClosingStock.css';
import { FaSearch } from 'react-icons/fa';
import Header from '../../Partials/Header';
import Footer from '../../Partials/Footer';
import ChatBotIcon from '../../ChatBot/ChatBotIcon';

const ContractorClosingStock = () => {
  return (
    <>
    <Header/>
    <div className="ccs-container">
        <div className='css-main'>
      <div className="ccs-title">CONTRACTOR CLOSING STOCK</div>
      <div className="ccs-form">
        <div className="ccs-row">
          <div className="ccs-group">
            <label>Project<span className="ccs-required">*</span></label>
            <select><option>-Select-</option></select>
          </div>
          <div className="ccs-group">
            <label>Contractor<span className="ccs-required">*</span></label>
            <select><option>-Select-</option></select>
          </div>
          <div className="ccs-group">
            <label>Category</label>
            <select><option>-All-</option></select>
          </div>
          <div className="ccs-group">
            <label>Material</label>
            <select><option>-All-</option></select>
          </div>
          <div className="ccs-group">
            <label>Specification</label>
            <select><option>-All-</option></select>
          </div>
          <div className="ccs-group">
            <label>Specification Code</label>
            <input type="text" />
          </div>
        </div>

        <div className="ccs-row second-row">
          <div className="ccs-group">
            <label>Date<span className="ccs-required">*</span></label>
            <input type="date" />
          </div>
          <div className="css-group css-go">
          <label>&nbsp;</label>
          <button className="css-go-btn"><FaSearch/>GO</button>
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

export default ContractorClosingStock;
