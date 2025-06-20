// StockValuationForm.jsx
import React from 'react';
import './StockValuationForm.css';
import Header from '../../Partials/Header';
import Footer from '../../Partials/Footer';
import ChatBotIcon from '../../ChatBot/ChatBotIcon';

const StockValuationForm = () => {
  return (
    <>
    <Header/>
    <div className="valuation-container">
        <div className='valuation-main-container'>
      <div className="valuation-header">STOCK VALUATION IN HAND</div>
      <div className="valuation-row">
        <select className="form-select">
          <label>Project<span className="st-required">*</span></label>
          <option>-Select-</option>
        </select>
        <select className="form-select">
          <option>-All-</option>
        </select>
        <select className="form-select">
          <option>-All-</option>
        </select>
        <select className="form-select">
          <option>-All-</option>
        </select>
        <input type="text" className="form-input" placeholder="Specification Code" />
      </div>
      <div className="valuation-row">
        <label className="period-label">Period*</label>
        <input type="date" className="date-input" />
        <input type="date" className="date-input" />
        <div className="button-group">
          <button className="btn active">WITH BRAND</button>
          <button className="btn">WITHOUT BRAND</button>
          <button className="btn active">WITH TAX</button>
          <button className="btn">WITHOUT TAX</button>
        </div>
        <button className="go-button">GO</button>
      </div>
      </div>
    </div>
    <Footer/>
    <ChatBotIcon/>
    </>
  );
};

export default StockValuationForm;
