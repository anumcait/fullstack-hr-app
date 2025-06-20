import React from 'react';
import './ContractorWastageReport.css';
import Header from '../../Partials/Header';
import Footer from '../../Partials/Footer';
import ChatBotIcon from '../../ChatBot/ChatBotIcon';

const ContractorWastageReport = () => {
  return (
    <>
    <Header/>
    <div className="cwr-container">
        <div className='cwr-main'>
      <div className="cwr-title">CONTRACTOR WISE WASTAGE REPORT</div>
      <div className="cwr-form-row">
        <div className="cwr-group">
          <label>Project<span className="cwr-required">*</span></label>
          <select>
            <option>-Select-</option>
          </select>
        </div>
        <div className="cwr-group">
          <label>Contractor<span className="cwr-required">*</span></label>
          <select>
            <option>-Select-</option>
          </select>
        </div>
        <div className="cwr-group">
          <label>Category</label>
          <select>
            <option>-All-</option>
          </select>
        </div>
        <div className="cwr-group">
          <label>Material</label>
          <select>
            <option>-All-</option>
          </select>
        </div>
        <div className="cwr-group">
          <label>Date<span className="cwr-required">*</span></label>
          <input type="date" />
        </div>
        <div className="cwr-group cwr-go-button">
          <button>
            🔍 GO
          </button>
        </div>
      </div>
      </div>
    </div>
    <Footer/>
    <ChatBotIcon/>
    </>
  );
};

export default ContractorWastageReport;
