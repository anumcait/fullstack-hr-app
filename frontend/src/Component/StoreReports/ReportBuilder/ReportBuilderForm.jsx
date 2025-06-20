import React, { useState } from 'react';
import './ReportBuilderForm.css';
import Header from '../../Partials/Header';
import Footer from '../../Partials/Footer';
import ChatBotIcon from '../../ChatBot/ChatBotIcon';

const ReportBuilder = () => {
  const [brandOption, setBrandOption] = useState('WITH BRAND');
  const [taxOption, setTaxOption] = useState('WITH TAX');

  return (
    <>
    <Header/>
    <div className="report-container">
      <div className='report-main'>
      <div className="report-title">REPORT BUILDER</div>
      <div className="report-form">
        <div className="report-row">
          <div className="report-group">
            <label>Report Name<span className="required">*</span></label>
            <select><option>Stock Valuation In Hand</option></select>
          </div>
          <div className="report-group">
            <label>Project<span className="required">*</span></label>
            <select><option>-Select-</option></select>
          </div>
          <div className="report-group">
            <label>Category</label>
            <select><option>-All-</option></select>
          </div>
          <div className="report-group">
            <label>Material</label>
            <select><option>-All-</option></select>
          </div>
          <div className="report-group">
            <label>Specification</label>
            <select><option>-All-</option></select>
          </div>
        </div>

        <div className="report-row">
          <div className="report-group">
            <label>Specification Code</label>
            <input type="text" />
          </div>
          <div className="report-group">
            <label>Period<span className="required">*</span></label>
            <div className="report-daterange">
              <input type="date" />
              <span className="dash">-</span>
              <input type="date" />
            </div>
          </div>
          <div className="report-group wide-button-group">
            <label>&nbsp;</label>
            <div className="report-buttons">
              <button
                className={`option-btn ${brandOption === 'WITH BRAND' ? 'active' : ''}`}
                onClick={() => setBrandOption('WITH BRAND')}
              >WITH BRAND</button>
              <button
                className={`option-btn ${brandOption === 'WITHOUT BRAND' ? 'active' : ''}`}
                onClick={() => setBrandOption('WITHOUT BRAND')}
              >WITHOUT BRAND</button>
              <button
                className={`option-btn ${taxOption === 'WITH TAX' ? 'active' : ''}`}
                onClick={() => setTaxOption('WITH TAX')}
              >WITH TAX</button>
              <button
                className={`option-btn ${taxOption === 'WITHOUT TAX' ? 'active' : ''}`}
                onClick={() => setTaxOption('WITHOUT TAX')}
              >WITHOUT TAX</button>
            </div>
          </div>
        </div>

        <div className="report-actions">
          <button className="export-btn">EXPORT TO EXCEL</button>
          <button className="download-btn">DOWNLOAD EXCEL REPORT</button>
        </div>
      </div>
    </div>
    </div>
    <Footer/>
    <ChatBotIcon/>
    </>
  );
};

export default ReportBuilder;
